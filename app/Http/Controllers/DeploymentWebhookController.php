<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class DeploymentWebhookController extends Controller
{
    /**
     * Handle incoming GitHub Push Webhook
     */
    public function handle(Request $request): JsonResponse
    {
        $deploySecret = config('app.deploy_secret', env('DEPLOY_SECRET', 'softtex_auto_deploy_key_2026'));
        $deployBranch = config('app.deploy_branch', env('DEPLOY_BRANCH', 'main'));

        $signature = $request->header('X-Hub-Signature-256', '');
        $event = $request->header('X-GitHub-Event', 'unknown');
        $rawPayload = $request->getContent();

        // 1. Verify HMAC Signature
        $expectedSignature = 'sha256=' . hash_hmac('sha256', $rawPayload, $deploySecret);
        if (!hash_equals($expectedSignature, $signature)) {
            Log::warning('Deployment webhook: Invalid HMAC signature.', [
                'ip' => $request->ip(),
                'received_signature' => $signature,
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Forbidden: Invalid signature.',
            ], 403);
        }

        // 2. Ping Event
        if ($event === 'ping') {
            Log::info('Deployment webhook: GitHub ping verified successfully.');
            return response()->json([
                'status' => 'success',
                'event' => 'ping',
                'message' => 'GitHub Webhook authenticated successfully with Softtex server.',
            ]);
        }

        // 3. Filter for target branch
        $targetRef = "refs/heads/{$deployBranch}";
        $payload = $request->json()->all();
        $ref = $payload['ref'] ?? '';

        if ($ref !== $targetRef) {
            Log::info("Deployment webhook: Push to {$ref} ignored. Configured branch is {$targetRef}.");
            return response()->json([
                'status' => 'ignored',
                'message' => "Push was for {$ref}, deploy only runs for {$targetRef}.",
            ]);
        }

        $commitHash = substr($payload['after'] ?? ($payload['head_commit']['id'] ?? 'unknown'), 0, 8);
        $commitMsg = $payload['head_commit']['message'] ?? 'No message';
        $pusher = $payload['pusher']['name'] ?? ($payload['sender']['login'] ?? 'unknown');

        Log::info("Deployment webhook: Starting deploy for commit {$commitHash} by @{$pusher} - '{$commitMsg}'");

        // 4. Delegate to public/deploy.php or execute pipeline
        $baseDir = base_path();
        $logFile = storage_path('logs/deploy.log');

        $phpBinary = 'php';
        if (PHP_OS_FAMILY === 'Windows') {
            if (file_exists('D:\\xampp\\php\\php.exe')) {
                $phpBinary = 'D:\\xampp\\php\\php.exe';
            } elseif (file_exists('C:\\xampp\\php\\php.exe')) {
                $phpBinary = 'C:\\xampp\\php\\php.exe';
            }
        } else {
            $candidates = [
                PHP_BINARY,
                '/usr/local/bin/ea-php82',
                '/usr/local/bin/ea-php83',
                '/usr/local/bin/ea-php81',
                '/usr/local/bin/php',
                '/usr/bin/php',
                'php',
            ];
            foreach ($candidates as $cand) {
                if (!empty($cand) && @is_executable($cand)) {
                    $phpBinary = $cand;
                    break;
                }
            }
        }

        $commands = [
            'Git Fetch' => 'git fetch origin ' . escapeshellarg($deployBranch) . ' 2>&1',
            'Git Reset' => 'git reset --hard origin/' . escapeshellarg($deployBranch) . ' 2>&1',
            'Migrate DB' => escapeshellcmd($phpBinary) . ' ' . escapeshellarg($baseDir . '/artisan') . ' migrate --force --no-interaction 2>&1',
            'Clear Cache' => escapeshellcmd($phpBinary) . ' ' . escapeshellarg($baseDir . '/artisan') . ' optimize:clear 2>&1',
            'Optimize Cache' => escapeshellcmd($phpBinary) . ' ' . escapeshellarg($baseDir . '/artisan') . ' optimize 2>&1',
        ];

        $outputReport = [];
        $hasErrors = false;

        $originalDir = getcwd();
        chdir($baseDir);

        foreach ($commands as $step => $cmd) {
            $lines = [];
            $exitCode = 0;
            @exec($cmd, $lines, $exitCode);
            $text = trim(implode("\n", $lines));

            $outputReport[$step] = [
                'exitCode' => $exitCode,
                'output' => $text,
            ];

            $logEntry = "[{$step}] (Exit {$exitCode}): " . ($text !== '' ? $text : 'OK');
            @file_put_contents($logFile, "[" . date('Y-m-d H:i:s T') . "] {$logEntry}\n", FILE_APPEND | LOCK_EX);

            if ($exitCode !== 0 && in_array($step, ['Git Reset', 'Migrate DB'], true)) {
                $hasErrors = true;
            }
        }

        chdir($originalDir);

        Log::info("Deployment webhook finished. Result: " . ($hasErrors ? 'Warning' : 'Success'));

        return response()->json([
            'status' => $hasErrors ? 'warning' : 'success',
            'timestamp' => now()->toIso8601String(),
            'commit' => $commitHash,
            'branch' => $deployBranch,
            'pusher' => $pusher,
            'steps' => $outputReport,
        ], $hasErrors ? 500 : 200);
    }

    /**
     * Check deployment status and view recent deployment logs
     */
    public function status(Request $request)
    {
        $deploySecret = config('app.deploy_secret', env('DEPLOY_SECRET', 'softtex_auto_deploy_key_2026'));
        $secretParam = $request->query('secret', '');

        if ($secretParam !== $deploySecret) {
            return response()->json([
                'status' => 'error',
                'message' => 'Forbidden: Invalid secret parameter. Usage: ?secret=YOUR_DEPLOY_SECRET',
            ], 403);
        }

        $logFile = storage_path('logs/deploy.log');
        $recentLogs = [];
        if (file_exists($logFile)) {
            $lines = file($logFile);
            $recentLogs = array_slice($lines, -50);
        }

        return response(
            "=========================================================\n" .
            " SOFTTEX FASHIONS - DEPLOYMENT WEBHOOK STATUS\n" .
            "=========================================================\n" .
            "Time: " . date('r') . "\n" .
            "Environment: " . app()->environment() . "\n" .
            "Target Branch: " . env('DEPLOY_BRANCH', 'main') . "\n\n" .
            "--- Recent Deployment Logs (Last 50 entries) ---\n" .
            (empty($recentLogs) ? "No logs recorded yet.\n" : implode('', $recentLogs)),
            200,
            ['Content-Type' => 'text/plain; charset=utf-8']
        );
    }
}
