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
        Schema::table('rfq_inquiries', function (Blueprint $table) {
            if (!Schema::hasColumn('rfq_inquiries', 'rfq_code')) {
                $table->string('rfq_code')->nullable()->index()->after('id');
            }
            if (!Schema::hasColumn('rfq_inquiries', 'techpack_path')) {
                $table->string('techpack_path')->nullable()->after('specifications');
            }
            if (!Schema::hasColumn('rfq_inquiries', 'techpack_name')) {
                $table->string('techpack_name')->nullable()->after('techpack_path');
            }
            if (!Schema::hasColumn('rfq_inquiries', 'status_stage')) {
                $table->string('status_stage')->default('received')->after('status');
            }
        });

        Schema::table('galleries', function (Blueprint $table) {
            if (!Schema::hasColumn('galleries', 'gsm')) {
                $table->string('gsm')->nullable()->after('category');
            }
            if (!Schema::hasColumn('galleries', 'moq')) {
                $table->string('moq')->nullable()->after('gsm');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('rfq_inquiries', function (Blueprint $table) {
            $table->dropColumn(['rfq_code', 'techpack_path', 'techpack_name', 'status_stage']);
        });

        Schema::table('galleries', function (Blueprint $table) {
            $table->dropColumn(['gsm', 'moq']);
        });
    }
};
