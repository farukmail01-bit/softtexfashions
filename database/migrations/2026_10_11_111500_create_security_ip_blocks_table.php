<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('security_ip_blocks', function (Blueprint $table) {
            $table->id();
            $table->string('ip_address', 45)->unique();
            $table->integer('attempt_count')->default(0);
            $table->boolean('is_blocked')->default(false)->index();
            $table->timestamp('blocked_until')->nullable()->index();
            $table->string('block_reason')->nullable();
            $table->timestamp('last_attempt_at')->nullable();
            $table->string('last_attempted_email')->nullable();
            $table->text('user_agent')->nullable();
            $table->boolean('is_permanent')->default(false);
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['is_blocked', 'blocked_until']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('security_ip_blocks');
    }
};
