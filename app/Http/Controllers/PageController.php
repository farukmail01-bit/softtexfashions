<?php

namespace App\Http\Controllers;

use App\Services\SeoService;
use Illuminate\Http\Request;

class PageController extends Controller
{
    /**
     * Home Page (Softtex Architecture + SEO Engine)
     */
    public function home()
    {
        $meta = SeoService::getMeta([
            'title' => 'SOFTTEX FASHIONS WEAR LIMITED | Garments Manufacturer & Buying House Bangladesh',
            'description' => 'SOFTTEX FASHIONS WEAR LIMITED is a 100% export-oriented garments manufacturer and buying house in Dhaka, Bangladesh, supporting apparel sourcing, production and quality assurance.',
            'keywords' => 'garments buying house bangladesh, apparel sourcing agency dhaka, clothing manufacturer bangladesh, knitwear exporter, denim manufacturer, woven apparel, softtex fashions',
        ]);

        $schemaJsonLd = SeoService::getSchemaJsonLd('home');

        return view('pages.home', compact('meta', 'schemaJsonLd'));
    }

    /**
     * Company Profile
     */
    public function companyProfile()
    {
        $meta = SeoService::getMeta([
            'title' => 'Company Profile | SOFTTEX FASHIONS WEAR LIMITED',
            'description' => 'Read the corporate profile, manufacturing capacity, export statistics, and management integrity of Softtex Fashions Wear Ltd.',
            'keywords' => 'company profile softtex fashions, bangladesh buying house profile, garments export capacity, dhaka apparel trader',
        ]);

        $crumbs = ['Home' => url('/'), 'About' => '#', 'Company Profile' => url('/about/company-profile')];
        $schemaJsonLd = SeoService::getSchemaJsonLd('company-profile', [SeoService::getBreadcrumbSchema($crumbs)]);

        return view('pages.company-profile', compact('meta', 'schemaJsonLd'));
    }

    /**
     * Vision & Mission
     */
    public function vision()
    {
        $meta = SeoService::getMeta([
            'title' => 'Our Vision & Mission | SOFTTEX FASHIONS WEAR LIMITED',
            'description' => 'Our corporate mission is to provide global apparel buyers with transparent sourcing, sustainable manufacturing, and zero-defect quality.',
            'keywords' => 'garments buying house vision, sustainable apparel sourcing, fair trade ethical garments bangladesh',
        ]);

        $crumbs = ['Home' => url('/'), 'About' => '#', 'Vision' => url('/about/vision')];
        $schemaJsonLd = SeoService::getSchemaJsonLd('vision', [SeoService::getBreadcrumbSchema($crumbs)]);

        return view('pages.vision', compact('meta', 'schemaJsonLd'));
    }

    /**
     * Leadership & Management
     */
    public function management()
    {
        $meta = SeoService::getMeta([
            'title' => 'Executive Management | SOFTTEX FASHIONS WEAR LIMITED',
            'description' => 'Meet our executive leadership, master merchandisers, and technical QA inspectors bridging international apparel buyers and Bangladeshi factories.',
            'keywords' => 'softtex fashions management, garments buying house directors, apparel sourcing team dhaka',
        ]);

        $crumbs = ['Home' => url('/'), 'About' => '#', 'Management' => url('/about/management')];
        $schemaJsonLd = SeoService::getSchemaJsonLd('management', [SeoService::getBreadcrumbSchema($crumbs)]);

        return view('pages.management', compact('meta', 'schemaJsonLd'));
    }

    /**
     * Sourcing & Production Services
     */
    public function services()
    {
        $meta = SeoService::getMeta([
            'title' => 'Our Services | Sourcing, Development & QA | SOFTTEX FASHIONS',
            'description' => 'End-to-end garments buying services: product development, factory audits, critical path merchandising, in-line QA inspection, and export logistics.',
            'keywords' => 'garments buying services, apparel merchandising bangladesh, fabric development, garment quality assurance',
        ]);

        $crumbs = ['Home' => url('/'), 'Services' => url('/services')];
        $schemaJsonLd = SeoService::getSchemaJsonLd('services', [SeoService::getBreadcrumbSchema($crumbs)]);

        return view('pages.services', compact('meta', 'schemaJsonLd'));
    }

    /**
     * Start-Up Services (Low-MOQ Apparel Sourcing & Prototyping)
     */
    public function startupServices()
    {
        $meta = SeoService::getMeta([
            'title' => 'Start-Up Services | Low-MOQ Sourcing & Prototyping | SOFTTEX FASHIONS',
            'description' => 'Dedicated apparel sourcing and manufacturing services for fashion startups and emerging brands in Bangladesh. Low MOQs, rapid 5-7 day prototyping, AQL 1.5 QA, and export logistics.',
            'keywords' => 'startup apparel manufacturer, low moq clothing factory bangladesh, small batch garment production, emerging fashion brand sourcing, softtex fashions startup services',
        ]);

        $crumbs = ['Home' => url('/'), 'Services' => url('/services'), 'Start-Up Services' => url('/startup-services')];
        $schemaJsonLd = SeoService::getSchemaJsonLd('services', [SeoService::getBreadcrumbSchema($crumbs)]);

        return view('pages.startup-services', compact('meta', 'schemaJsonLd'));
    }

    /**
     * Quality Assurance
     */
    public function quality()
    {
        $meta = SeoService::getMeta([
            'title' => 'Quality Assurance & AQL Standards | SOFTTEX FASHIONS',
            'description' => 'Zero-defect quality commitment: 4-point fabric inspection, inline quality audits, and AQL 1.5 / 2.5 final random inspections.',
            'keywords' => 'garments quality assurance, aql 1.5 inspection bangladesh, textile lab testing, pre shipment inspection',
        ]);

        $crumbs = ['Home' => url('/'), 'Quality' => url('/quality')];
        $schemaJsonLd = SeoService::getSchemaJsonLd('quality', [SeoService::getBreadcrumbSchema($crumbs)]);

        return view('pages.quality', compact('meta', 'schemaJsonLd'));
    }

    /**
     * Social & Technical Compliance
     */
    public function compliance()
    {
        $meta = SeoService::getMeta([
            'title' => 'Global Compliance & Factory Standards | SOFTTEX FASHIONS',
            'description' => 'Our partner factories are certified by ACCORD, BSCI, SEDEX, OEKO-TEX, GOTS, WRAP, and CTPAT. Ethical manufacturing guaranteed.',
            'keywords' => 'bsci certified garments bangladesh, accord audited factories, oeko tex certified buying house, sedex smeta apparel',
        ]);

        $crumbs = ['Home' => url('/'), 'Compliance' => url('/compliance')];
        $schemaJsonLd = SeoService::getSchemaJsonLd('compliance', [SeoService::getBreadcrumbSchema($crumbs)]);

        return view('pages.compliance', compact('meta', 'schemaJsonLd'));
    }

    /**
     * Contact & Inquiry
     */
    public function contact()
    {
        $meta = SeoService::getMeta([
            'title' => 'Contact Us | SOFTTEX FASHIONS WEAR LIMITED | Dhaka, Bangladesh',
            'description' => 'Get in touch with Softtex Fashions Wear Ltd. Head office: House # 53/55(3A floor), Road # 20, Nikunja-2, Khilkhet, Dhaka -1229. Phone: +880 1904 464294, Tel: +880 1612 844020. Email: info@softtexfashions.com',
            'keywords' => 'contact softtex fashions, garments buying house phone number, nikunja khilkhet buying house address, request garment quotation',
        ]);

        $crumbs = ['Home' => url('/'), 'Contact' => url('/contact')];
        $schemaJsonLd = SeoService::getSchemaJsonLd('contact', [SeoService::getBreadcrumbSchema($crumbs)]);

        return view('pages.contact', compact('meta', 'schemaJsonLd'));
    }

    /**
     * Commercial Terms & Conditions
     */
    public function terms()
    {
        $meta = SeoService::getMeta([
            'title' => 'Terms & Conditions | SOFTTEX FASHIONS WEAR LIMITED',
            'description' => 'Commercial terms, payment methods, minimum order quantities (MOQ), sample approvals, delivery schedules, and export trade guidelines of Softtex Fashions Wear Ltd.',
            'keywords' => 'softtex terms conditions, apparel export payment terms, garment moq bangladesh, garment buying house terms dhaka',
        ]);

        $crumbs = ['Home' => url('/'), 'Terms & Conditions' => url('/terms-conditions')];
        $schemaJsonLd = SeoService::getSchemaJsonLd('terms', [SeoService::getBreadcrumbSchema($crumbs)]);

        return view('pages.terms', compact('meta', 'schemaJsonLd'));
    }

    /**
     * Dynamic Product & Client Gallery Pages
     */
    public function productClient(string $slug)
    {
        $validPages = [
            'mens' => 'Men Apparel Catalogue',
            'womens' => 'Women Apparel Catalogue',
            'kids' => 'Children Apparel Catalogue',
            'misc' => 'Specialist Apparel Catalogue',
            'us-polo' => 'U.S. Polo Assn. Production Portfolio',
            'rich-cotton' => 'Rich Cotton Production Portfolio',
            'emart' => 'Emart Production Portfolio',
            'head' => 'Head Sportswear Production Portfolio',
            'tesco' => 'Tesco F&F Production Portfolio',
            'eddiebauer' => 'Eddie Bauer Outerwear Portfolio',
            'forever' => 'Forever 21 Fast Fashion Portfolio',
            'skechers' => 'Skechers Athleisure Portfolio',
            'keithhering' => 'Keith Haring Graphic Artwear Portfolio',
        ];

        if (!array_key_exists($slug, $validPages)) {
            abort(404);
        }

        $title = $validPages[$slug];
        $galleryItems = in_array($slug, ['mens', 'womens', 'kids'], true)
            ? \App\Services\CatalogDataService::getCategoryGallery($slug)
            : [];

        $meta = SeoService::getMeta([
            'title' => "{$title} | SOFTTEX FASHIONS WEAR LIMITED",
            'description' => "Explore {$title} manufactured and exported from Bangladesh by Softtex Fashions Wear Ltd. Premium quality, ethical sourcing.",
            'keywords' => "{$slug} apparel, garments production bangladesh, {$title}, oem clothing exporter",
        ]);

        $crumbs = [
            'Home' => url('/'),
            'Catalogue' => url('/catalogue/womens'),
            $title => url("/catalogue/{$slug}")
        ];
        $schemaJsonLd = SeoService::getSchemaJsonLd($slug, [SeoService::getBreadcrumbSchema($crumbs)]);

        return view('pages.product-catalogue', compact('meta', 'schemaJsonLd', 'title', 'slug', 'galleryItems'));
    }
}
