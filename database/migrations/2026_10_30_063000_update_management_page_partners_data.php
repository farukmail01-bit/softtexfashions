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
        $managementPartners = [
            [
                'name' => 'Josna',
                'role' => 'Chairman (Founder)',
                'department' => 'Founding Board',
                'avatar' => 'JS',
                'badge' => 'Founder & Board',
                'bio' => 'Strategic guidance, corporate ethics, and long-term organizational governance ensuring Softtex adheres to world-class manufacturing standards.',
                'highlight' => 'Corporate Governance & Ethical Compliance',
            ],
            [
                'name' => 'Rakib',
                'role' => 'Managing Director (Founder)',
                'department' => 'Executive Leadership',
                'avatar' => 'RK',
                'badge' => 'Founder & Executive',
                'bio' => 'Overall corporate execution, factory partnership network across Bangladesh, supply chain excellence, and high-volume apparel manufacturing.',
                'highlight' => 'Factory Operations & Global Supply Chain',
            ],
            [
                'name' => 'Rana',
                'role' => 'Marketing Director (Head of Marketing)',
                'department' => 'Commercial Leadership',
                'avatar' => 'RN',
                'badge' => 'Head of Marketing',
                'bio' => 'Leading international brand acquisitions, FOB price competitiveness, buyer relationship management across Europe and North America.',
                'highlight' => 'Global Brand Acquisition & Buyer Relations',
            ],
            [
                'name' => 'Jannatul Ferdous Happy',
                'role' => 'Co-Marketing Director',
                'department' => 'Marketing & Merchandising',
                'avatar' => 'JH',
                'badge' => 'Marketing Leadership',
                'bio' => 'Overseeing merchandising coordination, rapid sample approval cycles, buyer communication, and trend-focused apparel lines.',
                'highlight' => 'Merchandising Operations & Fast Sampling',
            ],
            [
                'name' => 'Yusuf',
                'role' => 'Business Development Executive',
                'department' => 'Business Growth',
                'avatar' => 'YS',
                'badge' => 'Business Development',
                'bio' => 'Market intelligence, tech-pack costing analysis, new buyer onboarding, and cultivating long-term relationships with global apparel retailers.',
                'highlight' => 'Strategic Sourcing & New Market Growth',
            ],
        ];

        $page = Page::where('slug', 'management')->first();
        if ($page) {
            $page->title = 'Our Partners & Management';
            $page->subtitle = 'Visionary Apparel Leadership & Sourcing Excellence';
            $page->content = 'Our founding board and senior leadership team bring decades of proven technical expertise in apparel manufacturing, merchandising, and ethical compliance.';
            $page->sections_data = [
                'page_title' => 'Our Partners & Management',
                'page_eyebrow' => 'Leadership & Governance',
                'page_lead' => 'The visionary founders and dedicated leadership team steering Softtex Fashions Wear Limited toward sustainable manufacturing and global apparel excellence.',
                'partners' => $managementPartners,
            ];
            $page->save();
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No-op
    }
};
