<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class SeoController extends Controller
{
    /**
     * Generate dynamic sitemap.xml
     */
    public function sitemap(): Response
    {
        $pages = [
            ['url' => url('/'), 'priority' => '1.0', 'changefreq' => 'weekly'],
            ['url' => url('/about/company-profile'), 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => url('/about/vision'), 'priority' => '0.7', 'changefreq' => 'monthly'],
            ['url' => url('/about/management'), 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => url('/services'), 'priority' => '0.9', 'changefreq' => 'weekly'],
            ['url' => url('/quality'), 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => url('/compliance'), 'priority' => '0.9', 'changefreq' => 'monthly'],
            ['url' => url('/contact'), 'priority' => '0.9', 'changefreq' => 'monthly'],
            ['url' => url('/catalogue/mens'), 'priority' => '0.9', 'changefreq' => 'weekly'],
            ['url' => url('/catalogue/womens'), 'priority' => '0.9', 'changefreq' => 'weekly'],
            ['url' => url('/catalogue/kids'), 'priority' => '0.9', 'changefreq' => 'weekly'],
            ['url' => url('/catalogue/misc'), 'priority' => '0.7', 'changefreq' => 'monthly'],
            ['url' => url('/catalogue/us-polo'), 'priority' => '0.7', 'changefreq' => 'monthly'],
            ['url' => url('/catalogue/rich-cotton'), 'priority' => '0.7', 'changefreq' => 'monthly'],
            ['url' => url('/catalogue/emart'), 'priority' => '0.7', 'changefreq' => 'monthly'],
            ['url' => url('/catalogue/head'), 'priority' => '0.7', 'changefreq' => 'monthly'],
            ['url' => url('/catalogue/tesco'), 'priority' => '0.7', 'changefreq' => 'monthly'],
            ['url' => url('/catalogue/eddiebauer'), 'priority' => '0.7', 'changefreq' => 'monthly'],
            ['url' => url('/catalogue/forever'), 'priority' => '0.7', 'changefreq' => 'monthly'],
            ['url' => url('/catalogue/skechers'), 'priority' => '0.7', 'changefreq' => 'monthly'],
            ['url' => url('/catalogue/keithhering'), 'priority' => '0.7', 'changefreq' => 'monthly'],
        ];

        $now = date('Y-m-d');
        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        foreach ($pages as $page) {
            $xml .= '  <url>' . "\n";
            $xml .= '    <loc>' . htmlspecialchars($page['url']) . '</loc>' . "\n";
            $xml .= '    <lastmod>' . $now . '</lastmod>' . "\n";
            $xml .= '    <changefreq>' . $page['changefreq'] . '</changefreq>' . "\n";
            $xml .= '    <priority>' . $page['priority'] . '</priority>' . "\n";
            $xml .= '  </url>' . "\n";
        }

        $xml .= '</urlset>';

        return response($xml, 200, [
            'Content-Type' => 'application/xml; charset=UTF-8',
            'X-Robots-Tag' => 'noindex'
        ]);
    }

    /**
     * Generate dynamic robots.txt
     */
    public function robots(): Response
    {
        $content = "User-agent: *\n";
        $content .= "Allow: /\n";
        $content .= "Disallow: /api/\n";
        $content .= "Disallow: /storage/logs/\n";
        $content .= "\n";
        $content .= "Sitemap: " . url('/sitemap.xml') . "\n";

        return response($content, 200, [
            'Content-Type' => 'text/plain; charset=UTF-8'
        ]);
    }
}
