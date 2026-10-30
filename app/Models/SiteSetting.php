<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

class SiteSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'value',
    ];

    public static function all($columns = ['*'])
    {
        if (!Schema::hasTable((new static)->getTable())) {
            return collect();
        }

        return parent::all($columns);
    }

    public static function get(string $key, $default = null)
    {
        if (!Schema::hasTable((new static)->getTable())) {
            return $default;
        }

        $setting = static::where('key', $key)->first();
        if (!$setting) {
            return $default;
        }

        $json = json_decode($setting->value, true);
        return (json_last_error() === JSON_ERROR_NONE) ? $json : $setting->value;
    }

    public static function set(string $key, $value): static
    {
        if (!Schema::hasTable((new static)->getTable())) {
            return new static;
        }

        $val = is_array($value) ? json_encode($value) : $value;
        return static::updateOrCreate(['key' => $key], ['value' => $val]);
    }

    public static function publicSettings(): array
    {
        if (!Schema::hasTable((new static)->getTable())) {
            return [];
        }

        $settings = static::all()->keyBy('key');

        return $settings
            ->reject(fn ($setting, $key) => preg_match('/(api[_-]?key|secret|token|password|private[_-]?key)/i', (string) $key))
            ->mapWithKeys(function ($setting, $key) {
                $value = json_decode((string) $setting->value, true);
                return [$key => (json_last_error() === JSON_ERROR_NONE) ? $value : $setting->value];
            })
            ->all();
    }
}
