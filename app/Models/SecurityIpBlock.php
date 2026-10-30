<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class SecurityIpBlock extends Model
{
    use HasFactory;

    protected $table = 'security_ip_blocks';

    protected $fillable = [
        'ip_address',
        'attempt_count',
        'is_blocked',
        'blocked_until',
        'block_reason',
        'last_attempt_at',
        'last_attempted_email',
        'user_agent',
        'is_permanent',
        'notes',
    ];

    protected $casts = [
        'is_blocked' => 'boolean',
        'is_permanent' => 'boolean',
        'blocked_until' => 'datetime',
        'last_attempt_at' => 'datetime',
    ];

    /**
     * Check if a specific IP address is currently blocked
     */
    public static function isIpBlocked(string $ip): array
    {
        $record = static::where('ip_address', $ip)->first();
        if (!$record || !$record->is_blocked) {
            return ['blocked' => false];
        }

        if ($record->is_permanent) {
            return [
                'blocked' => true,
                'permanent' => true,
                'reason' => $record->block_reason ?: 'IP permanently banned by administrator.',
                'remaining_seconds' => null,
            ];
        }

        if ($record->blocked_until && Carbon::now()->lt($record->blocked_until)) {
            $remaining = Carbon::now()->diffInSeconds($record->blocked_until);
            return [
                'blocked' => true,
                'permanent' => false,
                'reason' => $record->block_reason ?: 'Temporarily blocked due to repeated failed logins.',
                'remaining_seconds' => $remaining,
                'remaining_minutes' => ceil($remaining / 60),
                'blocked_until' => $record->blocked_until->toIso8601String(),
            ];
        }

        // Lockout expired: auto-unblock
        $record->update([
            'is_blocked' => false,
            'blocked_until' => null,
            'attempt_count' => 0,
        ]);

        return ['blocked' => false];
    }

    /**
     * Record a failed login attempt
     */
    public static function recordFailedAttempt(
        string $ip,
        ?string $email = null,
        ?string $userAgent = null,
        int $maxAttempts = 5,
        int $lockoutMinutes = 30
    ): array {
        $record = static::firstOrNew(['ip_address' => $ip]);

        $record->attempt_count = ($record->attempt_count ?? 0) + 1;
        $record->last_attempt_at = Carbon::now();
        $record->last_attempted_email = $email;
        $record->user_agent = $userAgent;

        $isNowBlocked = false;
        if ($record->attempt_count >= $maxAttempts) {
            $record->is_blocked = true;
            $record->blocked_until = Carbon::now()->addMinutes($lockoutMinutes);
            $record->block_reason = "Exceeded maximum allowed login attempts ({$maxAttempts} failed attempts).";
            $isNowBlocked = true;
        }

        $record->save();

        return [
            'attempts' => $record->attempt_count,
            'max_attempts' => $maxAttempts,
            'remaining_attempts' => max(0, $maxAttempts - $record->attempt_count),
            'is_blocked' => $isNowBlocked,
            'blocked_until' => $record->blocked_until ? $record->blocked_until->toIso8601String() : null,
            'lockout_minutes' => $lockoutMinutes,
        ];
    }

    /**
     * Clear / reset failed attempts upon successful login
     */
    public static function clearAttempts(string $ip): void
    {
        $record = static::where('ip_address', $ip)->first();
        if ($record && !$record->is_permanent) {
            $record->update([
                'attempt_count' => 0,
                'is_blocked' => false,
                'blocked_until' => null,
            ]);
        }
    }

    /**
     * Manually ban an IP
     */
    public static function manuallyBlock(
        string $ip,
        string $reason = 'Manual administrative ban',
        ?int $durationMinutes = null
    ): self {
        $record = static::firstOrNew(['ip_address' => $ip]);
        $record->is_blocked = true;
        $record->block_reason = $reason;
        $record->is_permanent = is_null($durationMinutes) || $durationMinutes <= 0;
        $record->blocked_until = $record->is_permanent ? null : Carbon::now()->addMinutes($durationMinutes);
        $record->last_attempt_at = Carbon::now();
        $record->save();

        return $record;
    }

    /**
     * Manually unblock an IP
     */
    public static function unblock(string $ip): bool
    {
        $record = static::where('ip_address', $ip)->first();
        if ($record) {
            return $record->update([
                'is_blocked' => false,
                'is_permanent' => false,
                'blocked_until' => null,
                'attempt_count' => 0,
            ]);
        }
        return false;
    }
}
