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
        Schema::create('seo_keywords', function (Blueprint $table) {
            $table->id();
            $table->string('keyword')->unique();
            $table->string('category')->default('Apparel Sourcing');
            $table->string('search_intent')->default('Commercial Sourcing');
            $table->string('priority')->default('high'); // high, medium, low
            $table->integer('usage_count')->default(0);
            $table->timestamps();
        });

        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('primary_keyword')->index();
            $table->string('category')->default('Apparel Insights');
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('meta_keywords')->nullable();
            $table->text('excerpt')->nullable();
            $table->longText('content');
            $table->string('featured_image')->nullable();
            $table->integer('read_time_minutes')->default(5);
            $table->string('author')->default('Softtex Technical Merchandising Desk');
            $table->string('status')->default('published'); // published, draft
            $table->integer('views_count')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
        Schema::dropIfExists('seo_keywords');
    }
};
