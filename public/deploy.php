<?php
/**
 * SOFTTEX FASHIONS WEAR LIMITED
 * Automated GitHub Deployment Webhook (Dual-Environment: Localhost & cPanel)
 *
 * Webhook URL: https://yourdomain.com/deploy.php
 * Content type: application/json
 * Secret: Configured in .env (DEPLOY_SECRET)
 * Events: Just the push event
 */

declare(strict_types=1);

// Prevent timeout for deployments
@set_time_limit(300);
@ini_set('max_execution_time', '300');

$baseDir = dirname(__DIR__); // Points to project root

// Load deployment configuration from .env
$envFile = $baseDir . '/.env';
$deploySecret = '';
$deployBranch = 'main';

if (file_exists($envFile)) {
    $envLines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($envLines !== false) {
        foreach ($envLines as $line) {
            $line = trim($line);
            if ($line === '' || str_starts_with($line, '#')) {
                continue;
            }
            if (str_starts_with($line, 'DEPLOY_SECRET=')) {
                $deploySecret = trim(substr($line, 14), "\"' \t\n\r\0\x0B");
            }
            if (str_starts_with($line, 'DEPLOY_BRANCH=')) {
                $deployBranch = trim(substr($line, 14), "\"' \t\n\r\0\x0B");
            }
        }
    }
}

// Fallback secret if not yet defined in .env
if (empty($deploySecret)) {
    $deploySecret = 'softtex_auto_deploy_key_2026';
}

$logFile = $baseDir . '/storage/logs/deploy.log';
if (!is_dir(dirname($logFile))) {
    @mkdir(dirname($logFile), 0775, true);
}

// Logging helper
$log = function (string $message) use ($logFile): void {
    $date = date('Y-m-d H:i:s T');
    @file_put_contents($logFile, "[{$date}] {$message}\n", FILE_APPEND | LOCK_EX);
};

// -------------------------------------------------------------
// GET Request: Browser status check & diagnostic inspection
// URL: https://yourdomain.com/deploy.php?secret=YOUR_DEPLOY_SECRET
// -------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $secretParam = $_GET['secret'] ?? '';
    if ($secretParam !== $deploySecret) {
        http_response_code(403);
        header('Content-Type: application/json');
        echo json_encode([
            'status' => 'error',
            'message' => 'Forbidden: Invalid secret parameter. Usage: ?secret=YOUR_DEPLOY_SECRET',
        ], JSON_PRETTY_PRINT);
        exit;
    }

    header('Content-Type: text/plain; charset=utf-8');
    echo "=========================================================\n";
    echo " SOFTTEX FASHIONS - AUTOMATED DEPLOYMENT WEBHOOK STATUS\n";
    echo "=========================================================\n";
    echo "Time: " . date('r') . "\n";
    echo "Project Directory: {$baseDir}\n";
    echo "Target Branch: {$deployBranch}\n";
    echo "PHP Version: " . PHP_VERSION . " (" . PHP_OS_FAMILY . ")\n\n";

    echo "--- Git Remote & Branch Status ---\n";
    $gitOutput = @shell_exec("cd " . escapeshellarg($baseDir) . " && git status 2>&1");
    echo $gitOutput ?: "(git status unavailable or shell_exec disabled)\n";

    echo "\n--- Recent Deployment Logs (Last 50 entries) ---\n";
    if (file_exists($logFile)) {
        $lines = file($logFile);
        $recent = array_slice($lines, -50);
        echo implode('', $recent);
    } else {
        echo "No deployment logs yet.\n";
    }

    echo "\n--- System Health & Environment Diagnostics ---\n";
    $hasVendor = file_exists($baseDir . '/vendor/autoload.php');
    echo "vendor/autoload.php: " . ($hasVendor ? "PRESENT (OK)" : "MISSING! (Run composer install or upload vendor directory)") . "\n";

    $hasEnv = file_exists($baseDir . '/.env');
    echo ".env file: " . ($hasEnv ? "PRESENT (OK)" : "MISSING! (Create .env from .env.cpanel.example)") . "\n";

    if ($hasEnv) {
        $envContent = (string) @file_get_contents($baseDir . '/.env');
        $hasKey = str_contains($envContent, 'APP_KEY=base64:');
        echo "APP_KEY: " . ($hasKey ? "CONFIGURED (OK)" : "MISSING OR EMPTY! (Must set APP_KEY in .env)") . "\n";
        preg_match('/DB_DATABASE=([^\r\n]+)/', $envContent, $mDb);
        echo "DB_DATABASE: " . ($mDb[1] ?? 'NOT SET') . "\n";
    }

    $dirsToCheck = [
        'storage' => $baseDir . '/storage',
        'storage/logs' => $baseDir . '/storage/logs',
        'storage/framework/views' => $baseDir . '/storage/framework/views',
        'storage/framework/sessions' => $baseDir . '/storage/framework/sessions',
        'storage/framework/cache' => $baseDir . '/storage/framework/cache',
        'bootstrap/cache' => $baseDir . '/bootstrap/cache',
    ];
    echo "\n--- Directory Permissions ---\n";
    foreach ($dirsToCheck as $name => $path) {
        $exists = is_dir($path);
        $writable = is_writable($path);
        $perms = $exists ? substr(sprintf('%o', fileperms($path)), -4) : 'N/A';
        echo sprintf("%-28s: %s | perms: %s\n", $name, ($writable ? "WRITABLE (OK)" : ($exists ? "NOT WRITABLE!" : "DIRECTORY MISSING!")), $perms);
    }

    echo "\n--- Web Server Error Logs (public/error_log) ---\n";
    $publicErrorLog = $baseDir . '/public/error_log';
    if (file_exists($publicErrorLog)) {
        $lines = file($publicErrorLog);
        $recent = array_slice($lines, -25);
        echo implode('', $recent);
    } else {
        echo "No public/error_log found.\n";
    }

    echo "\n--- Root Error Logs (error_log) ---\n";
    $rootErrorLog = $baseDir . '/error_log';
    if (file_exists($rootErrorLog)) {
        $lines = file($rootErrorLog);
        $recent = array_slice($lines, -25);
        echo implode('', $recent);
    } else {
        echo "No root error_log found.\n";
    }

    echo "\n--- Laravel Framework Log (storage/logs/laravel.log) ---\n";
    $laravelLog = $baseDir . '/storage/logs/laravel.log';
    if (file_exists($laravelLog)) {
        $lines = file($laravelLog);
        $recent = array_slice($lines, -25);
        echo implode('', $recent);
    } else {
        echo "No storage/logs/laravel.log found.\n";
    }

    if ($hasVendor && $hasEnv) {
        echo "\n--- Laravel Framework Bootstrap Test ---\n";
        try {
            require_once $baseDir . '/vendor/autoload.php';
            $app = require_once $baseDir . '/bootstrap/app.php';
            echo "Bootstrap: SUCCESS (Laravel 12 initialized without fatal errors)\n";
        } catch (\Throwable $t) {
            echo "BOOTSTRAP FATAL ERROR: " . $t->getMessage() . "\n";
            echo "File: " . $t->getFile() . ":" . $t->getLine() . "\n";
        }
    }
    exit;
}

// -------------------------------------------------------------
// POST Request: GitHub Webhook Handler
// -------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed. POST required.']);
    exit;
}

$rawPayload = (string) file_get_contents('php://input');
$githubSignature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';
$githubEvent = $_SERVER['HTTP_X_GITHUB_EVENT'] ?? 'unknown';

// Verify HMAC-SHA256 signature
$computedSignature = 'sha256=' . hash_hmac('sha256', $rawPayload, $deploySecret);
if (!hash_equals($computedSignature, $githubSignature)) {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $log("SECURITY ALERT: Invalid webhook signature attempt from IP: {$ip}");
    http_response_code(403);
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => 'Forbidden: Signature verification failed.']);
    exit;
}

// GitHub Ping Event
if ($githubEvent === 'ping') {
    $log("GITHUB PING: Webhook successfully registered and validated.");
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'success',
        'event' => 'ping',
        'message' => 'GitHub Webhook authenticated successfully with Softtex server.',
    ]);
    exit;
}

// Parse Payload
$data = json_decode($rawPayload, true);
if (!is_array($data)) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON body.']);
    exit;
}

// Filter for target branch
$targetRef = "refs/heads/{$deployBranch}";
$ref = $data['ref'] ?? '';
if ($ref !== $targetRef) {
    $log("IGNORED: Push to ref '{$ref}' (configured branch is '{$targetRef}').");
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'ignored',
        'message' => "Push was for {$ref}, deploy only runs for {$targetRef}.",
    ]);
    exit;
}

$commitHash = substr($data['after'] ?? ($data['head_commit']['id'] ?? 'unknown'), 0, 8);
$commitMsg = $data['head_commit']['message'] ?? 'No message provided';
$pusher = $data['pusher']['name'] ?? ($data['sender']['login'] ?? 'unknown');

$log("=========================================================");
$log("DEPLOYMENT TRIGGERED: Commit [{$commitHash}] by @{$pusher}");
$log("Message: {$commitMsg}");

// Resolve PHP Binary
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

// Build Deployment Execution Chain
$commands = [
    'Git Fetch' => 'git fetch origin ' . escapeshellarg($deployBranch) . ' 2>&1',
    'Git Reset' => 'git reset --hard origin/' . escapeshellarg($deployBranch) . ' 2>&1',
];

// Check if composer.phar or composer is available
$composerPhar = $baseDir . '/composer.phar';
if (file_exists($composerPhar)) {
    $commands['Composer Install'] = escapeshellcmd($phpBinary) . ' ' . escapeshellarg($composerPhar) . ' install --no-dev --optimize-autoloader --no-interaction 2>&1';
}

// Laravel Artisan Commands
$artisanPath = $baseDir . '/artisan';
if (file_exists($artisanPath)) {
    $commands['Storage Link'] = escapeshellcmd($phpBinary) . ' ' . escapeshellarg($artisanPath) . ' storage:link --quiet 2>&1';
    $commands['Migrate DB'] = escapeshellcmd($phpBinary) . ' ' . escapeshellarg($artisanPath) . ' migrate --force --no-interaction 2>&1';
    $commands['Clear Cache'] = escapeshellcmd($phpBinary) . ' ' . escapeshellarg($artisanPath) . ' optimize:clear 2>&1';
    $commands['Cache Config'] = escapeshellcmd($phpBinary) . ' ' . escapeshellarg($artisanPath) . ' config:cache 2>&1';
    $commands['Cache Routes'] = escapeshellcmd($phpBinary) . ' ' . escapeshellarg($artisanPath) . ' route:cache 2>&1';
    $commands['Cache Views'] = escapeshellcmd($phpBinary) . ' ' . escapeshellarg($artisanPath) . ' view:cache 2>&1';
}

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

    $log("[{$step}] (Exit {$exitCode}): " . ($text !== '' ? $text : 'OK'));

    if ($exitCode !== 0 && in_array($step, ['Git Reset', 'Migrate DB'], true)) {
        $hasErrors = true;
    }
}

// Ensure write permissions on storage and bootstrap/cache
$writableDirs = [
    $baseDir . '/storage',
    $baseDir . '/storage/app',
    $baseDir . '/storage/app/public',
    $baseDir . '/storage/framework',
    $baseDir . '/storage/framework/cache',
    $baseDir . '/storage/framework/cache/data',
    $baseDir . '/storage/framework/sessions',
    $baseDir . '/storage/framework/views',
    $baseDir . '/storage/logs',
    $baseDir . '/bootstrap/cache',
];

foreach ($writableDirs as $dir) {
    if (!is_dir($dir)) {
        @mkdir($dir, 0775, true);
    }
    if (PHP_OS_FAMILY !== 'Windows') {
        @chmod($dir, 0775);
    }
}

chdir($originalDir);

$statusText = $hasErrors ? 'COMPLETED WITH WARNINGS' : 'SUCCESS';
$log("DEPLOYMENT RESULT: {$statusText} for Commit [{$commitHash}]");
$log("=========================================================\n");

header('Content-Type: application/json');
http_response_code($hasErrors ? 500 : 200);
echo json_encode([
    'status' => $hasErrors ? 'warning' : 'success',
    'timestamp' => date('c'),
    'commit' => $commitHash,
    'branch' => $deployBranch,
    'pusher' => $pusher,
    'steps' => $outputReport,
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
