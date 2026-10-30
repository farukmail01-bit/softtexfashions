<?php

use Illuminate\Database\Migrations\Migration;
use App\Models\Page;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Page::updateOrCreate(['slug' => 'terms'], [
            'title' => 'Terms & Conditions',
            'subtitle' => 'Commercial Guidelines & Trade Commitments',
            'hero_title' => 'Terms & Conditions',
            'content' => 'Clear, transparent commercial principles governing apparel manufacturing, minimum order quantities, payment structures, quality control, and export logistics at Softtex Fashions Wear Limited.',
            'sections_data' => [
                'page_title' => 'Terms & Conditions',
                'page_eyebrow' => 'Commercial Governance & Trade Guidelines',
                'highlights' => [
                    ['title' => 'Payment Structure', 'description' => '50% advance deposit by T/T or Irrevocable L/C to start production; 50% balance before bill of lading and shipment dispatch.'],
                    ['title' => 'Standard Production MOQ', 'description' => '300 pieces per style / colorway (100 pcs per size). Small boutique runs (50-100 pcs) accepted on customized pricing.'],
                    ['title' => 'Sample Approvals & Tech Pack', 'description' => 'Tech Pack required. Samples provided at cost + courier, 100% refunded with bulk order. Subsequent samples free for ongoing buyers.'],
                    ['title' => 'Lead Times & Tracking', 'description' => '20-45 business days ex-factory bulk delivery. Dedicated daily Time & Action (T&A) milestones and inspection reporting.'],
                ],
            ],
            'meta_title' => 'Terms & Conditions | SOFTTEX FASHIONS WEAR LIMITED',
            'meta_description' => 'Commercial terms, payment methods, minimum order quantities (MOQ), sample approvals, delivery schedules, and export trade guidelines of Softtex Fashions Wear Ltd.',
            'meta_keywords' => 'softtex terms conditions, apparel export payment terms, garment moq bangladesh',
            'status' => 'published',
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Page::where('slug', 'terms')->delete();
    }
};
