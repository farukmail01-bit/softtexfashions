<?php

namespace App\Services;

class SeoService
{
    /**
     * Generate metadata array for any page
     */
    public static function getMeta(array $custom = []): array
    {
        $baseUrl = config('app.url', 'http://localhost');
        $currentUrl = url()->current();

        $default = [
            'title' => 'SOFTTEX FASHIONS WEAR LIMITED | Garments Manufacturer & Buying House Bangladesh',
            'description' => 'SOFTTEX FASHIONS WEAR LIMITED is a 100% export-oriented garments manufacturer and buying house in Dhaka, Bangladesh, supporting apparel sourcing, production and quality assurance.',
            'keywords' => 'garments buying house bangladesh, apparel sourcing agency dhaka, clothing manufacturer bangladesh, knitwear exporter, denim manufacturer, woven apparel, softtex fashions, buying house in nikunja khilkhet',
            'canonical' => $currentUrl,
            'image' => asset('images/softtex-logo.png'),
            'type' => 'website',
            'author' => 'Softtex Fashions Wear Ltd.',
            'robots' => 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        ];

        return array_merge($default, $custom);
    }

    /**
     * Generate Schema.org JSON-LD Structured Data
     */
    public static function getSchemaJsonLd(string $page = 'home', array $extra = []): string
    {
        $orgSchema = [
            '@context' => 'https://schema.org',
            '@type' => 'Corporation',
            'name' => 'SOFTTEX FASHIONS WEAR LIMITED',
            'alternateName' => 'Softtex Fashions',
            'url' => url('/'),
            'logo' => asset('images/softtex-logo.png'),
            'description' => '100% Export-Oriented Garments Manufacturer & Buying House in Dhaka, Bangladesh. Quality Our Commitment.',
            'telephone' => '+880 1904 464294, +880 1612 844020',
            'email' => 'info@softtexfashions.com',
            'address' => [
                '@type' => 'PostalAddress',
                'streetAddress' => 'House # 53/55(3A floor), Road # 20, Nikunja-2, Khilkhet',
                'addressLocality' => 'Dhaka',
                'postalCode' => '1229',
                'addressCountry' => 'BD'
            ],
            'geo' => [
                '@type' => 'GeoCoordinates',
                'latitude' => 23.8293,
                'longitude' => 90.4197
            ],
            'areaServed' => [
                'United States', 'United Kingdom', 'European Union', 'Canada', 'Australia', 'Japan', 'South Korea'
            ],
            'knowsAbout' => [
                'Apparel Manufacturing', 'Garments Buying Agency', 'Knitwear Sourcing', 'Woven Products', 'Denim Manufacturing', 'Textile Quality Assurance'
            ],
            'contactPoint' => [
                [
                    '@type' => 'ContactPoint',
                    'telephone' => '+880 1904 464294',
                    'contactType' => 'customer service',
                    'areaServed' => 'Worldwide',
                    'availableLanguage' => ['English', 'Bengali']
                ],
                [
                    '@type' => 'ContactPoint',
                    'telephone' => '+880 1904 464294',
                    'contactType' => 'sales',
                    'email' => 'sourcing@softtexfashions.com',
                    'areaServed' => 'Worldwide'
                ]
            ]
        ];

        if ($page === 'home') {
            unset($orgSchema['telephone'], $orgSchema['email'], $orgSchema['contactPoint']);
        }

        $faqSchema = [
            '@context' => 'https://schema.org',
            '@type' => 'FAQPage',
            'mainEntity' => [
                [
                    '@type' => 'Question',
                    'name' => 'What is the MOQ (Minimum Order Quantity) for garments sourcing?',
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => 'Our flexible MOQ starts from 500 to 1,000 pieces per style/colourway for knitwear, woven, and denim apparel, accommodating both emerging brands and global retailers.'
                    ]
                ],
                [
                    '@type' => 'Question',
                    'name' => 'What are the sampling and production lead times?',
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => 'Prototype and fit samples are dispatched within 5 to 7 days. Bulk production lead time is typically 45 to 65 days bulk FOB depending on style complexity and fabric availability.'
                    ]
                ],
                [
                    '@type' => 'Question',
                    'name' => 'Which international compliance standards are followed?',
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => 'Our assigned manufacturing factories are strictly audited and certified by ACCORD on Fire & Building Safety, BSCI, SEDEX SMETA 4-Pillar, OEKO-TEX Standard 100, and GOTS Organic Textile Standard.'
                    ]
                ],
                [
                    '@type' => 'Question',
                    'name' => 'What quality control standards does Softtex Fashions maintain?',
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => 'Our in-house QC inspectors follow international AQL 1.5 / 2.5 Major/Minor standards with four-point fabric inspection, inline audits, and final AQL random inspection before container dispatch.'
                    ]
                ]
            ]
        ];

        $schemas = [$orgSchema, $faqSchema];

        if (!empty($extra)) {
            $schemas = array_merge($schemas, $extra);
        }

        return json_encode($schemas, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }

    /**
     * Generate Breadcrumbs Schema
     */
    public static function getBreadcrumbSchema(array $crumbs): array
    {
        $itemList = [];
        $position = 1;
        foreach ($crumbs as $name => $url) {
            $itemList[] = [
                '@type' => 'ListItem',
                'position' => $position++,
                'name' => $name,
                'item' => $url
            ];
        }

        return [
            '@context' => 'https://schema.org',
            '@type' => 'BreadcrumbList',
            'itemListElement' => $itemList
        ];
    }
}
