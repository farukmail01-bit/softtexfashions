<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Update site_settings
        DB::table('site_settings')
            ->where('key', 'contact_tel')
            ->update(['value' => '+880 1612 844020', 'updated_at' => now()]);

        DB::table('site_settings')
            ->where('key', 'company_phone')
            ->where('value', '01612 844020')
            ->update(['value' => '+880 1612 844020', 'updated_at' => now()]);

        // 2. Update contact page
        $contactPage = DB::table('pages')->where('slug', 'contact')->first();
        if ($contactPage) {
            $content = str_replace('01612 844020', '+880 1612 844020', $contactPage->content ?? '');
            $metaDesc = str_replace('01612 844020', '+880 1612 844020', $contactPage->meta_description ?? '');
            
            $sectionsData = $contactPage->sections_data;
            if (is_string($sectionsData)) {
                $sectionsData = str_replace('01612 844020', '+880 1612 844020', $sectionsData);
            }

            DB::table('pages')
                ->where('slug', 'contact')
                ->update([
                    'content' => $content,
                    'meta_description' => $metaDesc,
                    'sections_data' => $sectionsData,
                    'updated_at' => now(),
                ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('site_settings')
            ->where('key', 'contact_tel')
            ->update(['value' => '01612 844020', 'updated_at' => now()]);

        DB::table('site_settings')
            ->where('key', 'company_phone')
            ->where('value', '+880 1612 844020')
            ->update(['value' => '01612 844020', 'updated_at' => now()]);

        $contactPage = DB::table('pages')->where('slug', 'contact')->first();
        if ($contactPage) {
            $content = str_replace('+880 1612 844020', '01612 844020', $contactPage->content ?? '');
            $metaDesc = str_replace('+880 1612 844020', '01612 844020', $contactPage->meta_description ?? '');

            $sectionsData = $contactPage->sections_data;
            if (is_string($sectionsData)) {
                $sectionsData = str_replace('+880 1612 844020', '01612 844020', $sectionsData);
            }

            DB::table('pages')
                ->where('slug', 'contact')
                ->update([
                    'content' => $content,
                    'meta_description' => $metaDesc,
                    'sections_data' => $sectionsData,
                    'updated_at' => now(),
                ]);
        }
    }
};
