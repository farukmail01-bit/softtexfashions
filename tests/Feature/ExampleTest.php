<?php

namespace Tests\Feature;

use App\Models\Page;
use App\Models\SiteSetting;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_response(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_product_categories_render_their_gallery_and_pdf_catalogue_option(): void
    {
        foreach ([
            'womens' => ['count' => 100, 'last_image' => 'images/womens/100.jpg', 'first_title' => '"Chase the Sun" Royal Blue Cap-Sleeve Graphic Tee'],
            'mens' => ['count' => 120, 'last_image' => 'images/mens/120.jpg', 'first_title' => 'Solid Navy Crewneck Cotton T-Shirt'],
            'kids' => ['count' => 78, 'last_image' => 'images/kids/78.png', 'first_title' => 'Boys Turquoise N-Y-C Sports Team Pique Polo Shirt (#3 Sleeve)'],
        ] as $slug => $catalogue) {
            $response = $this->get("/products/{$slug}")
                ->assertOk()
                ->assertViewIs('pages.product-catalogue')
                ->assertSee('Download PDF Catalogue')
                ->assertSee("images/{$slug}/1.jpg")
                ->assertSee($catalogue['first_title'])
                ->assertSee($catalogue['last_image']);

            $this->assertSame(
                $catalogue['count'],
                substr_count($response->getContent(), 'softtex-product-gallery-card')
            );

            $this->getJson("/api/galleries/{$slug}")
                ->assertOk()
                ->assertJsonCount($catalogue['count'], 'items')
                ->assertJsonPath('items.0.title', $catalogue['first_title']);
        }

        $this->get('/products/misc')
            ->assertOk()
            ->assertViewIs('pages.product-catalogue')
            ->assertSee('Specialist Apparel Catalogue');
    }

    public function test_contact_page_shows_order_terms_without_a_contact_form(): void
    {
        $this->get('/contact')
            ->assertOk()
            ->assertSee('Terms &amp; Conditions', false)
            ->assertSee('UK MARKETING OFFICE')
            ->assertSee('Yusuf')
            ->assertDontSee('<form');
    }

    public function test_draft_cms_pages_are_not_publicly_accessible(): void
    {
        Page::create([
            'slug' => 'internal-draft',
            'title' => 'Internal draft',
            'status' => 'draft',
        ]);

        $this->getJson('/api/cms/pages/internal-draft')->assertNotFound();
    }

    public function test_public_settings_redact_sensitive_values(): void
    {
        SiteSetting::set('ai_api_key', 'private-test-key');
        SiteSetting::set('company_name', 'Softtex Fashions');

        $this->getJson('/api/cms/settings')
            ->assertOk()
            ->assertJsonPath('settings.company_name', 'Softtex Fashions')
            ->assertDontSee('ai_api_key')
            ->assertDontSee('private-test-key');
    }

    public function test_admin_management_endpoints_require_authentication(): void
    {
        $this->getJson('/api/admin/stats')->assertUnauthorized();
    }

    public function test_homepage_hides_direct_email_and_phone_contact_details(): void
    {
        $this->get('/')
            ->assertOk()
            ->assertDontSee('info@softtexfashions.com')
            ->assertDontSee('tel:+8801904464294');
    }

    public function test_catalogue_misc_redirects_permanently_to_womens(): void
    {
        $this->get('/catalogue/misc')
            ->assertRedirect('/catalogue/womens')
            ->assertStatus(301);
    }

    public function test_homepage_renders_continuous_scrolling_certification_marquee(): void
    {
        $this->get('/')
            ->assertOk()
            ->assertSee('softtex-editorial-cert-marquee-wrap')
            ->assertSee('softtex-editorial-cert-marquee-track')
            ->assertSee('softtex-editorial-cert-big-card')
            ->assertSee('accord-logo.png')
            ->assertSee('bsci-logo.png');
    }

    public function test_homepage_renders_all_twelve_buyer_logos(): void
    {
        $response = $this->get('/')->assertOk();

        $expectedBuyerLogos = [
            'images/buyer/guess.png',
            'images/buyer/eddies-bauer.png',
            'images/buyer/forever-21.jpg',
            'images/buyer/us-polo.jpg',
            'images/buyer/hard-rock.png',
            'images/buyer/head.png',
            'images/buyer/emart.png',
            'images/buyer/home-plus.jpg',
            'images/buyer/joy-rich.jpg',
            'images/buyer/keith-haring.jpg',
            'images/buyer/rich-cotton.jpg',
            'images/buyer/skechers.jpg',
        ];

        foreach ($expectedBuyerLogos as $logo) {
            $response->assertSee($logo);
        }
    }
}
