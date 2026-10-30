<?php

namespace Tests\Feature;

use Tests\TestCase;

class DeploymentWebhookTest extends TestCase
{
    protected string $secret = 'softtex_auto_deploy_key_2026';

    public function test_status_endpoint_rejects_unauthorized_request(): void
    {
        $response = $this->get('/api/deploy-webhook/status?secret=wrong_secret');
        $response->assertStatus(403);
    }

    public function test_status_endpoint_accepts_authorized_request(): void
    {
        $response = $this->get('/api/deploy-webhook/status?secret=' . $this->secret);
        $response->assertStatus(200);
        $response->assertSee('DEPLOYMENT WEBHOOK STATUS');
    }

    public function test_webhook_rejects_invalid_hmac_signature(): void
    {
        $payload = json_encode(['zen' => 'security test']);
        $response = $this->withHeaders([
            'X-GitHub-Event' => 'ping',
            'X-Hub-Signature-256' => 'sha256=invalid_hash',
        ])->postJson('/api/deploy-webhook', ['zen' => 'security test']);

        $response->assertStatus(403);
    }

    public function test_webhook_handles_ping_event_with_valid_signature(): void
    {
        $data = ['zen' => 'responsive design', 'hook_id' => 12345];
        $payload = json_encode($data);
        $sig = 'sha256=' . hash_hmac('sha256', $payload, $this->secret);

        $response = $this->call(
            'POST',
            '/api/deploy-webhook',
            [],
            [],
            [],
            [
                'CONTENT_TYPE' => 'application/json',
                'HTTP_X_GITHUB_EVENT' => 'ping',
                'HTTP_X_HUB_SIGNATURE_256' => $sig,
            ],
            $payload
        );

        $response->assertStatus(200);
        $response->assertJson([
            'status' => 'success',
            'event' => 'ping',
        ]);
    }

    public function test_webhook_ignores_non_main_branch_push(): void
    {
        $data = [
            'ref' => 'refs/heads/feature-branch',
            'after' => 'abcdef123456',
            'pusher' => ['name' => 'developer'],
        ];
        $payload = json_encode($data);
        $sig = 'sha256=' . hash_hmac('sha256', $payload, $this->secret);

        $response = $this->call(
            'POST',
            '/api/deploy-webhook',
            [],
            [],
            [],
            [
                'CONTENT_TYPE' => 'application/json',
                'HTTP_X_GITHUB_EVENT' => 'push',
                'HTTP_X_HUB_SIGNATURE_256' => $sig,
            ],
            $payload
        );

        $response->assertStatus(200);
        $response->assertJson([
            'status' => 'ignored',
        ]);
    }
}
