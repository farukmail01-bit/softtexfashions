<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ApiController extends Controller
{
    /**
     * Get Company Information & Profile
     */
    public function companyInfo()
    {
        return response()->json([
            'status' => 'success',
            'data' => [
                'name' => 'SOFTTEX FASHIONS WEAR LTD.',
                'tagline' => '100% Export-Oriented Garments Manufacturer & Buying House - Quality Our Commitment',
                'headquarters' => 'House # 53/55(3A floor), Road # 20, Nikunja-2, Khilkhet, Dhaka -1229, Bangladesh',
                'hotline' => '+880 1904 464294 / +880 1612 844020',
                'mobile' => '+880 1904 464294',
                'tel' => '+880 1612 844020',
                'email' => 'info@softtexfashions.com',
                'sales_email' => 'sourcing@softtexfashions.com',
                'established' => 2012,
                'monthly_capacity' => '1,800,000 Pcs / Month',
                'affiliated_factories' => 14,
                'countries_exported' => 28,
                'aql_standard' => 'AQL 1.5 / 2.5 Major / Minor',
                'turnaround_lead_time' => '45 - 65 Days Bulk FOB',
                'proto_sample_lead_time' => '5 - 7 Days',
                'certifications' => [
                    ['name' => 'Accord on Fire & Building Safety', 'badge' => '/images/certificatelogos/accord-logo.png', 'desc' => 'Structural, Electrical & Fire Safety Certified.'],
                    ['name' => 'BSCI (Business Social Compliance)', 'badge' => '/images/certificatelogos/bsci-logo.png', 'desc' => 'Ethical Fair Wages, Worker Safety & Social Rights.'],
                    ['name' => 'OEKO-TEX Standard 100', 'badge' => '/images/certificatelogos/cit-logo.png', 'desc' => 'Tested for Harmful Substances (Class I & II).'],
                    ['name' => 'SEDEX SMETA 4-Pillar', 'badge' => '/images/certificatelogos/sedex-logo.png', 'desc' => 'Labor Standards, Health & Safety, Environment, Business Ethics.'],
                    ['name' => 'GOTS Organic Cotton', 'badge' => '/images/certificatelogos/gots-log.png', 'desc' => 'Global Organic Textile Standard Certified Supply Chain.'],
                    ['name' => 'WRAP Gold Certified', 'badge' => '/images/certificatelogos/wrap-logo.png', 'desc' => 'Worldwide Responsible Accredited Production.'],
                    ['name' => 'C-TPAT Supply Chain Security', 'badge' => '/images/certificatelogos/ctpat.jpg', 'desc' => 'US Customs-Trade Partnership Against Terrorism.'],
                    ['name' => 'SGS Quality Inspected', 'badge' => '/images/certificatelogos/sgs-logo.png', 'desc' => 'International Third-Party Inspection & Lab Testing.'],
                ],
                'buyers' => [
                    ['name' => 'Guess', 'logo' => '/images/buyer/guess.png', 'country' => 'USA / Europe', 'segment' => 'Denim & Trendwear'],
                    ['name' => 'Eddie Bauer', 'logo' => '/images/buyer/eddies-bauer.png', 'country' => 'USA', 'segment' => 'Outerwear & Performance'],
                    ['name' => 'Forever 21', 'logo' => '/images/buyer/forever-21.jpg', 'country' => 'USA', 'segment' => 'Fast Fashion Ladieswear'],
                    ['name' => 'U.S. Polo Assn.', 'logo' => '/images/buyer/us-polo.jpg', 'country' => 'USA', 'segment' => 'Heritage Polos & Knits'],
                    ['name' => 'Hard Rock', 'logo' => '/images/buyer/hard-rock.png', 'country' => 'USA', 'segment' => 'Premium Merchandise'],
                    ['name' => 'Head Sportswear', 'logo' => '/images/buyer/head.png', 'country' => 'Austria / Global', 'segment' => 'Tennis & Performance Tops'],
                    ['name' => 'E-Mart', 'logo' => '/images/buyer/emart.png', 'country' => 'South Korea', 'segment' => 'Apparel & Basics'],
                    ['name' => 'Home Plus', 'logo' => '/images/buyer/home-plus.jpg', 'country' => 'South Korea', 'segment' => 'Hypermarket Apparel Lines'],
                    ['name' => 'Joy Rich', 'logo' => '/images/buyer/joy-rich.jpg', 'country' => 'USA / Japan', 'segment' => 'Creative Streetwear & Knits'],
                    ['name' => 'Keith Haring Artwear', 'logo' => '/images/buyer/keith-haring.jpg', 'country' => 'Japan / USA', 'segment' => 'Graphic Printed Streetwear'],
                    ['name' => 'Rich Cotton', 'logo' => '/images/buyer/rich-cotton.jpg', 'country' => 'Europe', 'segment' => 'Sustainable Knits'],
                    ['name' => 'Skechers', 'logo' => '/images/buyer/skechers.jpg', 'country' => 'USA', 'segment' => 'Athleisure & Sportswear'],
                ]
            ]
        ]);
    }

    /**
     * Get Digital Showroom Catalog with authentic product images
     */
    public function catalog(Request $request)
    {
        $category = $request->query('category', 'all');

        $products = [
            // Knitwear Collection
            [
                'id' => 1,
                'title' => 'Vintage Washed French Terry Hoodie',
                'category' => 'knitwear',
                'image' => '/images/mens/1.jpg',
                'gsm' => '320 - 360 GSM',
                'yarn' => '100% Combed BCI Cotton, 20/1 + 10/1 Loopback',
                'gauge' => '24 GG Circular Knit',
                'wash' => 'Enzyme Silicon & Garment Mineral Dye',
                'moq' => '1,000 Pcs per color',
                'lead_time' => '45 Days',
                'description' => 'Heavyweight premium loopback French Terry hoodie with double-layer hood, kangaroo pocket, ribbed side gussets, and pre-shrunk anti-pill finish.',
            ],
            [
                'id' => 2,
                'title' => 'Classic Mercerized Pique Polo Shirt',
                'category' => 'knitwear',
                'image' => '/images/uspolo/1.jpg',
                'gsm' => '210 - 230 GSM',
                'yarn' => '95% Compact Cotton / 5% Elastane',
                'gauge' => '28 GG Double Pique',
                'wash' => 'Bio-Polished & Peach Soft Touch',
                'moq' => '1,500 Pcs per color',
                'lead_time' => '40 Days',
                'description' => 'Engineered flat knit rib collar, mother-of-pearl 3-button placket, reinforced herringbone neck tape, and twin-needle hem.',
            ],
            [
                'id' => 3,
                'title' => 'Graphic Heritage Heavyweight T-Shirt',
                'category' => 'knitwear',
                'image' => '/images/keithhering/1.jpg',
                'gsm' => '220 - 240 GSM',
                'yarn' => '100% Ring-Spun Organic Cotton (GOTS)',
                'gauge' => '20/1 Single Jersey',
                'wash' => 'High-Density Discharge / Water-Based Screen Print',
                'moq' => '1,000 Pcs',
                'lead_time' => '35 Days',
                'description' => 'Oversized boxy streetwear silhouette with 1.2-inch 1x1 rib collar, drop shoulders, and soft hand-feel eco-friendly print.',
            ],
            [
                'id' => 4,
                'title' => 'Quick-Dry Ergonomic Training Tee',
                'category' => 'activewear',
                'image' => '/images/skechers/1.jpg',
                'gsm' => '160 - 180 GSM',
                'yarn' => '88% Recycled Polyester (RPET) / 12% Spandex',
                'gauge' => '32 GG Micro Interlock Hex Weave',
                'wash' => 'Moisture-Wicking & Anti-Bacterial Silver-Ion Finish',
                'moq' => '2,000 Pcs',
                'lead_time' => '45 Days',
                'description' => 'Laser-cut ventilation eyelets, 4-way mechanical stretch, flatlock anti-chafing seams, and reflective 3M heat transfers.',
            ],

            // Woven & Denim Collection
            [
                'id' => 5,
                'title' => 'Vintage Selvedge Indigo Denim Jeans',
                'category' => 'woven',
                'image' => '/images/mens/10.jpg',
                'gsm' => '12.5 - 13.5 Oz',
                'yarn' => '99% Organic Cotton / 1% ROICA Recycled Elastane',
                'gauge' => '3/1 Right-Hand Twill Weave',
                'wash' => 'Waterless Laser Whisker + Eco-Ozone Stone Wash',
                'moq' => '1,200 Pcs',
                'lead_time' => '60 Days',
                'description' => 'Authentic rope-dyed indigo ring denim, YKK copper anti-rust rivets, lined back pockets, and heavy-duty 5-pocket construction.',
            ],
            [
                'id' => 6,
                'title' => 'All-Weather Utility Field Parka Jacket',
                'category' => 'woven',
                'image' => '/images/eddiebauer/1.jpg',
                'gsm' => '240 GSM Poly-Cotton Twill (65/35)',
                'yarn' => 'High-Tenacity Filament Twill',
                'gauge' => 'Woven Micro-Canvas',
                'wash' => 'DWR C0 PFC-Free Water Repellent Coating',
                'moq' => '800 Pcs',
                'lead_time' => '65 Days',
                'description' => 'Waterproof taped critical seams, storm flap over two-way VISLON zipper, articulated sleeves, and fleece-lined handwarmer pockets.',
            ],
            [
                'id' => 7,
                'title' => 'Custom Fit Poplin Check Casual Shirt',
                'category' => 'woven',
                'image' => '/images/richcotton/1.jpg',
                'gsm' => '120 - 135 GSM',
                'yarn' => '50s / 1 Compact Cotton Yarn-Dyed Check',
                'gauge' => 'Plain Woven Poplin',
                'wash' => 'Silicone Garment Wash & Easy-Iron Finish',
                'moq' => '1,500 Pcs',
                'lead_time' => '50 Days',
                'description' => 'Button-down spread collar, curved shirttail hem, pearlized engraved buttons, and clean french seam armholes.',
            ],

            // Ladies & Contemporary
            [
                'id' => 8,
                'title' => '"Chase the Sun" Cap-Sleeve Graphic Tee',
                'category' => 'womens',
                'image' => '/images/womens/1.jpg',
                'gsm' => '160 GSM Single Jersey',
                'yarn' => '100% Combed BCI Cotton',
                'gauge' => '24 GG Circular Knit',
                'wash' => 'Soft Bio-Polish & Eco Discharge Print',
                'moq' => '1,200 Pcs',
                'lead_time' => '35 Days',
                'description' => 'Royal blue cap-sleeve tee with vintage palm tree graphic print, self-fabric neckline tape, and pre-shrunk finish.',
            ],
            [
                'id' => 9,
                'title' => '"Beach Days" Racerback Ribbed Tank Top',
                'category' => 'womens',
                'image' => '/images/womens/2.jpg',
                'gsm' => '180 GSM 2x2 Rib',
                'yarn' => '95% Compact Cotton / 5% Elastane',
                'gauge' => '28 GG Rib Knit',
                'wash' => 'Silicon Softener & Plastisol Floral Print',
                'moq' => '1,500 Pcs',
                'lead_time' => '35 Days',
                'description' => 'Magenta racerback athletic-cut tank top with floral typography print, bound armholes, and curved hem.',
            ],
            [
                'id' => 13,
                'title' => 'Lace-Trimmed Henley Tank & Shorts Lounge Set',
                'category' => 'womens',
                'image' => '/images/womens/10.jpg',
                'gsm' => '180 GSM Micro-Rib',
                'yarn' => '60% Cotton / 35% Modal / 5% Spandex',
                'gauge' => '30 GG Fine Rib',
                'wash' => 'Garment Aero-Wash Soft Touch',
                'moq' => '1,500 Pcs',
                'lead_time' => '40 Days',
                'description' => 'Ribbed loungewear two-piece set with delicate lace scalloped neckline, functional button placket, and elasticated shorts.',
            ],
            [
                'id' => 14,
                'title' => 'Official Looney Tunes™ Oversized Graphic Tee',
                'category' => 'womens',
                'image' => '/images/womens/18.jpg',
                'gsm' => '180 GSM Heavy Jersey',
                'yarn' => '100% Ring-Spun Cotton',
                'gauge' => '20/1 Single Jersey',
                'wash' => 'Enzyme Wash & Licensed High-Definition Screen Print',
                'moq' => '1,500 Pcs',
                'lead_time' => '40 Days',
                'description' => 'Pastel drop-shoulder streetwear graphic t-shirt featuring licensed character artwork and twin-needle stitched hems.',
            ],
            [
                'id' => 15,
                'title' => 'Tropical Pineapple Sleeveless Summer Jersey Dress',
                'category' => 'womens',
                'image' => '/images/womens/25.jpg',
                'gsm' => '160 GSM Combed Jersey',
                'yarn' => '100% Combed Cotton',
                'gauge' => '26 GG Single Jersey',
                'wash' => 'Anti-Pilling Bio-Wash & All-Over Rotary Print',
                'moq' => '1,200 Pcs',
                'lead_time' => '45 Days',
                'description' => 'Breathable A-line summer t-shirt dress with contrast binding at neck and armhole, featuring vivid tropical fruit motifs.',
            ],

            // Kids & Infant Collection
            [
                'id' => 10,
                'title' => 'Boys Turquoise N-Y-C Sports Team Pique Polo Shirt',
                'category' => 'kids',
                'image' => '/images/kids/1.jpg',
                'gsm' => '200 GSM Double Pique',
                'yarn' => '100% Combed Cotton',
                'gauge' => '26 GG Circular Knit',
                'wash' => 'Bio-Polished & Colorfast Reactive Dye',
                'moq' => '1,200 Pcs',
                'lead_time' => '40 Days',
                'description' => 'Turquoise pique polo with engineered flat knit collar, mother-of-pearl buttons, and athletic sleeve embroidery.',
            ],
            [
                'id' => 11,
                'title' => 'Cobalt Blue Tee with Textured Red Fish Applique',
                'category' => 'kids',
                'image' => '/images/kids/10.jpg',
                'gsm' => '170 GSM Single Jersey',
                'yarn' => '100% Ring-Spun Cotton',
                'gauge' => '24 GG Single Jersey',
                'wash' => 'Enzyme Wash & Embroidered 3D Applique',
                'moq' => '1,500 Pcs',
                'lead_time' => '35 Days',
                'description' => 'Bright cobalt blue crewneck tee featuring tactile patterned fish applique with soft backing for sensitive skin.',
            ],
            [
                'id' => 19,
                'title' => 'Boys Dinosaur Camo Long-Sleeve Tee & Joggers Set',
                'category' => 'kids',
                'image' => '/images/kids/48.jpg',
                'gsm' => '190 GSM Tee / 260 GSM Joggers',
                'yarn' => '95% BCI Cotton / 5% Elastane',
                'gauge' => 'Multi-Gauge Co-ord Set',
                'wash' => 'Non-Toxic Water-Based Screen Print & Soft Wash',
                'moq' => '1,200 Sets',
                'lead_time' => '45 Days',
                'description' => 'Matching two-piece set featuring all-over dinosaur print long-sleeve tee paired with comfortable rib-cuff jogger pants.',
            ],
            [
                'id' => 20,
                'title' => 'Toddler Girls Disney Elsa Striped Skater Dress',
                'category' => 'kids',
                'image' => '/images/kids/55.jpg',
                'gsm' => '160 GSM Combed Cotton',
                'yarn' => '100% Cotton Yarn-Dyed Stripe',
                'gauge' => '26 GG Fine Jersey',
                'wash' => 'Soft Enzyme Wash & Glitter Transfer',
                'moq' => '1,200 Pcs',
                'lead_time' => '40 Days',
                'description' => 'Yarn-dyed horizontal stripe skater dress with gathered waist, cap flutter sleeves, and licensed character artwork.',
            ],
            [
                'id' => 21,
                'title' => 'Toddler Girls Magenta Knitted Cardigan with Floral Lace',
                'category' => 'kids',
                'image' => '/images/kids/73.jpg',
                'gsm' => '320 GSM Soft Knit',
                'yarn' => '100% High-Bulk Soft Touch Acrylic',
                'gauge' => '7 GG Computerized Flat Knit',
                'wash' => 'Steam Milling & Anti-Pill Softener',
                'moq' => '800 Pcs',
                'lead_time' => '45 Days',
                'description' => 'Bright magenta button cardigan with delicate floral lace yoke trim, twin patch pockets, and scalloped rib edges.',
            ],

            // Sweaters & Flat Knit
            [
                'id' => 12,
                'title' => 'Nordic Fair Isle Chunky Knit Crop Sweater',
                'category' => 'sweaters',
                'image' => '/images/womens/31.jpg',
                'gsm' => '420 Gr/Pcs Heavyweight',
                'yarn' => '70% Soft Acrylic / 30% Merino Wool Blend',
                'gauge' => '7 GG Computerized Stoll Knitting Machine',
                'wash' => 'Steam Milling & Soft Wool Wash',
                'moq' => '800 Pcs',
                'lead_time' => '50 Days',
                'description' => 'Traditional Scandinavian Fair Isle geometric yoke pattern with thick ribbed collar, dropped shoulders, and cropped boxy fit.',
            ],
            [
                'id' => 16,
                'title' => 'Cream Cable-Knit Lace-Up V-Neck Long-Sleeve Sweater',
                'category' => 'sweaters',
                'image' => '/images/womens/32.jpg',
                'gsm' => '400 Gr/Pcs',
                'yarn' => '60% Cotton / 40% Acrylic Feather Yarn',
                'gauge' => '5 GG Computerized Flat Knit',
                'wash' => 'Silicone Softener Milling',
                'moq' => '800 Pcs',
                'lead_time' => '50 Days',
                'description' => 'Intricate central cable-twist knit with metal eyelet lace-up V-neckline and breathable pointelle openwork sleeves.',
            ],
            [
                'id' => 17,
                'title' => 'Mustard Yellow Chunky Ribbed Cardigan with Shawl Collar',
                'category' => 'sweaters',
                'image' => '/images/womens/33.jpg',
                'gsm' => '450 Gr/Pcs',
                'yarn' => '100% High-Bulk Soft Touch Acrylic',
                'gauge' => '5 GG Fisherman Rib Knit',
                'wash' => 'Steam Form Press & Low-Shrink Finish',
                'moq' => '600 Pcs',
                'lead_time' => '45 Days',
                'description' => 'Open-front chunky rib-knit layering cardigan with draped shawl collar and reinforced shoulder seams.',
            ],
            [
                'id' => 18,
                'title' => 'Tricolor Block Chunky Knit Crewneck Sweater',
                'category' => 'sweaters',
                'image' => '/images/womens/36.jpg',
                'gsm' => '420 Gr/Pcs',
                'yarn' => '80% Soft Wool Touch Acrylic / 20% Cotton',
                'gauge' => '5 GG Fully Fashioned Multi-Feed',
                'wash' => 'Silicon Tumble Softener',
                'moq' => '800 Pcs',
                'lead_time' => '45 Days',
                'description' => 'Bold tripartite horizontal block construction combining cream, warm ochre, and earthy terracotta bands with ribbed trims.',
            ],
        ];

        if ($category !== 'all') {
            $products = array_values(array_filter($products, function ($p) use ($category) {
                return $p['category'] === $category;
            }));
        }

        return response()->json([
            'status' => 'success',
            'category' => $category,
            'count' => count($products),
            'data' => $products
        ]);
    }

    /**
     * Instant Sourcing Cost & FOB Price Estimation Engine
     */
    public function calculateCost(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'item_type' => 'required|string',
            'fabric_type' => 'required|string',
            'order_quantity' => 'required|integer|min:500',
            'wash_treatment' => 'nullable|string',
            'destination_market' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $type = strtolower($request->item_type);
        $qty = (int) $request->order_quantity;
        $fabric = strtolower($request->fabric_type);
        $wash = strtolower($request->wash_treatment ?? 'regular');
        $market = strtolower($request->destination_market);

        // Dynamic Site Settings from MySQL
        $settings = \App\Models\SiteSetting::all()->pluck('value', 'key');
        $dutyEU = isset($settings['duty_exemption_eu_uk']) ? (float)$settings['duty_exemption_eu_uk'] : 12.0;
        $dutyCanada = isset($settings['duty_exemption_canada']) ? (float)$settings['duty_exemption_canada'] : 18.0;
        $dutyJapan = isset($settings['duty_exemption_japan']) ? (float)$settings['duty_exemption_japan'] : 10.0;
        $sampleTurnaround = !empty($settings['lead_time_sampling']) ? ($settings['lead_time_sampling'] . ' (DHL / FedEx Express)') : '5 - 7 Days (DHL / FedEx Express)';
        $bulkLeadTime = !empty($settings['lead_time_bulk']) ? $settings['lead_time_bulk'] : (($qty > 30000) ? '60 - 65 Days' : '45 - 55 Days');

        // Base price calculation matrix (in USD per piece)
        $basePrice = 2.50;
        if (str_contains($type, 'hoodie') || str_contains($type, 'fleece')) {
            $basePrice = 6.80;
        } elseif (str_contains($type, 'polo')) {
            $basePrice = 4.20;
        } elseif (str_contains($type, 't-shirt') || str_contains($type, 'tee')) {
            $basePrice = 2.40;
        } elseif (str_contains($type, 'denim') || str_contains($type, 'jeans')) {
            $basePrice = 7.50;
        } elseif (str_contains($type, 'jacket') || str_contains($type, 'outerwear')) {
            $basePrice = 12.50;
        } elseif (str_contains($type, 'sweater')) {
            $basePrice = 8.20;
        } elseif (str_contains($type, 'kids')) {
            $basePrice = 3.10;
        }

        // Fabric coefficient
        $fabricMultiplier = 1.0;
        if (str_contains($fabric, 'organic') || str_contains($fabric, 'gots')) {
            $fabricMultiplier = 1.15;
        } elseif (str_contains($fabric, 'modal') || str_contains($fabric, 'bamboo')) {
            $fabricMultiplier = 1.22;
        } elseif (str_contains($fabric, 'recycled') || str_contains($fabric, 'rpet')) {
            $fabricMultiplier = 1.18;
        } elseif (str_contains($fabric, 'wool') || str_contains($fabric, 'merino')) {
            $fabricMultiplier = 1.35;
        }

        // Wash & finishing add-on
        $washAddon = 0.20;
        if (str_contains($wash, 'laser') || str_contains($wash, 'ozone')) {
            $washAddon = 0.85;
        } elseif (str_contains($wash, 'enzyme') || str_contains($wash, 'stone')) {
            $washAddon = 0.50;
        } elseif (str_contains($wash, 'dwr') || str_contains($wash, 'waterproof')) {
            $washAddon = 1.10;
        }

        // Volume economy of scale discount
        $volumeDiscount = 0.0;
        if ($qty >= 50000) {
            $volumeDiscount = 0.16;
        } elseif ($qty >= 20000) {
            $volumeDiscount = 0.12;
        } elseif ($qty >= 10000) {
            $volumeDiscount = 0.08;
        } elseif ($qty >= 5000) {
            $volumeDiscount = 0.04;
        }

        $unitFobEstimated = ($basePrice * $fabricMultiplier + $washAddon) * (1 - $volumeDiscount);
        $lowFob = round($unitFobEstimated * 0.95, 2);
        $highFob = round($unitFobEstimated * 1.08, 2);

        // Transit times and GSP Duty Savings calculation
        $transitDays = 24;
        $dutyBenefit = 'GSP Duty-Free Eligible (0% Import Duty under EBA/DCTS)';
        $dutySavingsPercent = $dutyEU;
        $currencySymbol = '$';
        
        if (str_contains($market, 'us') || str_contains($market, 'usa') || str_contains($market, 'america')) {
            $transitDays = 28;
            $dutyBenefit = 'Standard MFN Duty Rates Apply. Full C-TPAT Security Cleared.';
            $dutySavingsPercent = 0.0;
        } elseif (str_contains($market, 'uk')) {
            $transitDays = 22;
            $dutyBenefit = 'UK Developing Countries Trading Scheme (DCTS) - 0% Tariff.';
            $dutySavingsPercent = $dutyEU;
        } elseif (str_contains($market, 'japan')) {
            $transitDays = 18;
            $dutyBenefit = 'Japan Generalized System of Preferences (GSP) - 0% Duty.';
            $dutySavingsPercent = $dutyJapan;
        } elseif (str_contains($market, 'canada')) {
            $transitDays = 30;
            $dutyBenefit = 'Canada Least Developed Country Tariff (LDCT) - 0% Duty.';
            $dutySavingsPercent = $dutyCanada;
        }

        $estimatedTotalOrder = $lowFob * $qty;
        $dutySavingsUsd = round($estimatedTotalOrder * ($dutySavingsPercent / 100), 2);

        return response()->json([
            'status' => 'success',
            'data' => [
                'item_type' => $request->item_type,
                'order_quantity' => $qty,
                'currency' => 'USD',
                'fob_range_low' => $lowFob,
                'fob_range_high' => $highFob,
                'eur_low' => round($lowFob * 0.92, 2),
                'eur_high' => round($highFob * 0.92, 2),
                'gbp_low' => round($lowFob * 0.79, 2),
                'gbp_high' => round($highFob * 0.79, 2),
                'total_fob_bracket' => '$' . number_format($lowFob * $qty, 2) . ' - $' . number_format($highFob * $qty, 2),
                'sample_turnaround_days' => $sampleTurnaround,
                'bulk_lead_time_days' => $bulkLeadTime,
                'sea_transit_days' => $transitDays . ' Days (Chittagong Port)',
                'air_transit_hours' => '24 - 48 Hours Express Cargo (DAC)',
                'trade_duty_benefit' => $dutyBenefit,
                'duty_savings_percent' => $dutySavingsPercent,
                'duty_savings_usd' => $dutySavingsUsd,
                'duty_savings_formatted' => '$' . number_format($dutySavingsUsd, 2),
                'aql_assurance' => 'AQL 1.5 Level II Final Random Inspection Included',
                'whatsapp_direct_lead' => 'https://wa.me/8801904464294?text=' . urlencode("Hello Softtex Fashions Sourcing Team, I ran an instant estimate for {$qty} pcs of {$request->item_type} ({$fabric}). Estimated FOB: \${$lowFob} - \${$highFob}. I would like to submit my tech pack.")
            ]
        ]);
    }

    /**
     * Handle RFQ (Request for Quotation) & Techpack Submission
     */
    public function submitRfq(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'brand_name' => 'required|string|max:255',
            'buyer_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'country' => 'required|string|max:100',
            'product_category' => 'required|string|max:100',
            'target_quantity' => 'required|integer|min:500',
            'target_price_usd' => 'nullable|numeric',
            'specifications' => 'required|string|min:5',
            'techpack' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx,zip,rar,jpg,jpeg,png|max:25600',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Please provide all required RFQ details correctly.',
                'errors' => $validator->errors()
            ], 422);
        }

        $rfqNumber = 'STX-RFQ-' . strtoupper(substr(uniqid(), -5)) . '-' . date('Y');

        $techpackPath = null;
        $techpackName = null;
        if ($request->hasFile('techpack')) {
            $file = $request->file('techpack');
            $techpackName = $file->getClientOriginalName();
            $filename = 'techpack_' . time() . '_' . Str::slug(pathinfo($techpackName, PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();
            $uploadDir = public_path('uploads/techpacks');
            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }
            $file->move($uploadDir, $filename);
            $techpackPath = 'uploads/techpacks/' . $filename;
        }

        $inquiry = \App\Models\RfqInquiry::create([
            'rfq_code' => $rfqNumber,
            'buyer_name' => $request->buyer_name,
            'company_name' => $request->brand_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'country' => $request->country,
            'product_category' => $request->product_category,
            'order_quantity' => $request->target_quantity,
            'target_price' => $request->target_price_usd ? ('$' . $request->target_price_usd) : null,
            'specifications' => $request->specifications,
            'techpack_path' => $techpackPath,
            'techpack_name' => $techpackName,
            'status' => 'new',
            'status_stage' => 'received',
        ]);

        return response()->json([
            'status' => 'success',
            'rfq_number' => $rfqNumber,
            'message' => 'Your Sourcing RFQ & Tech Pack have been received by Softtex Fashions Merchandising Team.',
            'timestamp' => now()->toIso8601String(),
            'assigned_merchandiser' => 'Senior Apparel Merchandiser (Dhaka Liaison Office)',
            'expected_quote_hours' => 24,
            'techpack_uploaded' => !empty($techpackPath),
            'techpack_name' => $techpackName,
            'whatsapp_link' => 'https://wa.me/8801904464294?text=' . urlencode("Hello Softtex Sourcing Team, I just submitted RFQ #{$rfqNumber} for {$request->brand_name} ({$request->target_quantity} pcs of {$request->product_category}). Please confirm receipt.")
        ]);
    }

    /**
     * Buyer RFQ Live Status Tracker
     */
    public function trackRfq($code)
    {
        $code = trim($code);
        $rfq = \App\Models\RfqInquiry::where('rfq_code', $code)
            ->orWhere('id', str_replace(['STX-RFQ-', 'STX-'], '', $code))
            ->first();

        if (!$rfq) {
            return response()->json([
                'status' => 'error',
                'message' => 'No active inquiry dossier found matching reference: ' . $code,
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'rfq_code' => $rfq->rfq_code ?? ('STX-RFQ-' . $rfq->id),
                'buyer_name' => $rfq->buyer_name,
                'company_name' => $rfq->company_name,
                'product_category' => $rfq->product_category,
                'order_quantity' => $rfq->order_quantity,
                'target_price' => $rfq->target_price,
                'status' => $rfq->status,
                'status_stage' => $rfq->status_stage ?? 'received',
                'submitted_at' => $rfq->created_at ? $rfq->created_at->format('M d, Y h:i A') : '',
                'has_techpack' => !empty($rfq->techpack_path),
                'techpack_name' => $rfq->techpack_name,
            ]
        ]);
    }

    /**
     * Public Dynamic Product Gallery & Lookbook
     */
    public function publicGalleries($slug)
    {
        $items = \App\Models\Gallery::where('client_slug', $slug)
            ->where('is_active', true)
            ->orderBy('order', 'asc')
            ->get();

        if (in_array($slug, ['mens', 'womens', 'kids'], true)) {
            $curatedItems = collect(\App\Services\CatalogDataService::getCategoryGallery($slug))
                ->keyBy(static fn (array $item): string => ltrim($item['image_url'], '/'));
            $savedItems = $items->keyBy(static fn ($item): string => ltrim($item->image_url, '/'));

            $items = $curatedItems->map(static function (array $item, string $imageUrl) use ($savedItems): array {
                $saved = $savedItems->get($imageUrl);
                $result = array_merge($item, $saved?->toArray() ?? []);
                $result['title'] = filled($saved?->title) ? $saved->title : $item['title'];

                return $result;
            })->values();
        }

        return response()->json([
            'status' => 'success',
            'slug' => $slug,
            'items' => $items,
        ]);
    }

    /**
     * Direct Buyer Contact Message
     */
    public function submitContact(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'company' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:50',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|min:5',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation error.',
                'errors' => $validator->errors()
            ], 422);
        }

        \App\Models\ContactMessage::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'subject' => $request->subject ?: ($request->company ? "Inquiry from {$request->company}" : 'General Sourcing Inquiry'),
            'message' => $request->message,
            'status' => 'unread',
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Thank you for reaching out to Softtex Fashions Wear Ltd. We will respond within 12 business hours.'
        ]);
    }

    /**
     * Public Apparel Sourcing Blog & Knowledge Base
     */
    public function publicArticles(Request $request)
    {
        $query = \App\Models\Article::where('status', 'published')->latest();

        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        if ($request->has('search') && !empty($request->search)) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('title', 'like', "%{$s}%")
                  ->orWhere('primary_keyword', 'like', "%{$s}%")
                  ->orWhere('excerpt', 'like', "%{$s}%");
            });
        }

        $articles = $query->get();
        $categories = \App\Models\Article::where('status', 'published')->pluck('category')->unique()->values();

        return response()->json([
            'status' => 'success',
            'articles' => $articles,
            'categories' => $categories,
        ]);
    }

    public function publicArticleDetail($slug)
    {
        $article = \App\Models\Article::where('slug', $slug)
            ->where('status', 'published')
            ->first();

        if (!$article) {
            return response()->json(['status' => 'error', 'message' => 'Article not found.'], 404);
        }

        $article->increment('views_count');

        $related = \App\Models\Article::where('status', 'published')
            ->where('id', '!=', $article->id)
            ->where(function ($q) use ($article) {
                $q->where('category', $article->category)
                  ->orWhere('primary_keyword', $article->primary_keyword);
            })
            ->take(3)
            ->get();

        return response()->json([
            'status' => 'success',
            'article' => $article,
            'related' => $related,
        ]);
    }

    /**
     * Curated Digital Fabric & Material Swatches
     */
    public function getSwatches()
    {
        $swatches = [
            [
                'id' => 'swatch-1',
                'title' => '100% Combed BCI Cotton Double Pique',
                'category' => 'Knits',
                'gsm' => '220 GSM',
                'yarn_count' => '26s/1 Ne Compact Ring Spun',
                'gauge' => '24 GG Circular Knit',
                'shrinkage' => '≤ 3.0% Length × ≤ 3.0% Width',
                'color_fastness' => 'Grade 4-5 (ISO 105-C06)',
                'texture_image' => '/images/uspolo/1.jpg',
                'best_for' => 'Luxury Heritage Polo Shirts, Golfwear, Resort Polos',
                'lead_time_labdip' => '5 - 7 Days',
                'moq' => '500 Kgs / Color (~1,800 Polos)'
            ],
            [
                'id' => 'swatch-2',
                'title' => 'Heavyweight Brushed French Terry',
                'category' => 'Fleece & Streetwear',
                'gsm' => '380 - 420 GSM',
                'yarn_count' => '3-End (30s Face / 10s Low-Twist Loop)',
                'gauge' => '20 GG Heavy Knit',
                'shrinkage' => '≤ 3.5% Length × ≤ 2.5% Width',
                'color_fastness' => 'Grade 4 (AATCC 61)',
                'texture_image' => '/images/mens/2.jpg',
                'best_for' => 'Oversized Streetwear Hoodies, Luxury Joggers, Crewnecks',
                'lead_time_labdip' => '7 Days',
                'moq' => '600 Kgs / Color'
            ],
            [
                'id' => 'swatch-3',
                'title' => '12.5 oz Ring-Spun Indigo Denim with 1% Stretch',
                'category' => 'Denim & Woven',
                'gsm' => '12.5 oz / sq.yd (425 GSM)',
                'yarn_count' => '9s × 10s+40D Lycra Dual-Core',
                'gauge' => '3/1 Right-Hand Twill',
                'shrinkage' => 'Sanforized (≤ 2.0% Skew & Shrinkage)',
                'color_fastness' => 'Deep Rope Dye Indigo (6 Dips)',
                'texture_image' => '/images/mens/10.jpg',
                'best_for' => '5-Pocket Tapered Jeans, Denim Jackets, Overshirts',
                'lead_time_labdip' => '10 Days Hand Loom',
                'moq' => '1,200 Yards (~850 Jeans)'
            ],
            [
                'id' => 'swatch-4',
                'title' => 'GOTS Certified Organic Bio-Cotton Single Jersey',
                'category' => 'Organic & Basics',
                'gsm' => '160 - 180 GSM',
                'yarn_count' => '30s/1 100% Organic Cotton',
                'gauge' => '28 GG Ultra-Fine Gauge',
                'shrinkage' => '≤ 3.0% Length × ≤ 3.0% Width',
                'color_fastness' => 'Grade 4-5 Eco-Reactive Dye',
                'texture_image' => '/images/kids/1.jpg',
                'best_for' => 'Premium Brand Basic T-Shirts, Infantwear, Loungewear',
                'lead_time_labdip' => '5 Days',
                'moq' => '400 Kgs / Color (~2,200 T-Shirts)'
            ],
            [
                'id' => 'swatch-5',
                'title' => 'Recycled Polyester Performance Spandex Interlock',
                'category' => 'Activewear & Athleisure',
                'gsm' => '240 GSM',
                'yarn_count' => '82% GRS Recycled Poly / 18% Elastane',
                'gauge' => '32 GG High Compression Interlock',
                'shrinkage' => '≤ 2.0% 4-Way Stretch Recovery',
                'color_fastness' => 'Disperse Dye Grade 4-5 (Chlorine Resistant)',
                'texture_image' => '/images/richcotton/1.jpg',
                'best_for' => 'Athleisure Leggings, Gym Compression Tees, Cycle Wear',
                'lead_time_labdip' => '7 Days',
                'moq' => '500 Kgs / Color'
            ],
        ];

        return response()->json([
            'status' => 'success',
            'swatches' => $swatches
        ]);
    }

    /**
     * Request Physical Swatch Hanger / Card
     */
    public function requestSwatch(Request $request)
    {
        $validated = $request->validate([
            'swatch_id' => 'required|string',
            'swatch_title' => 'required|string',
            'buyer_name' => 'required|string|max:255',
            'company_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'shipping_address' => 'required|string|max:1000',
            'country' => 'required|string|max:100',
        ]);

        $rfqCode = 'STX-SWT-' . rand(1000, 9999) . '-' . date('Y');

        $inquiry = \App\Models\RfqInquiry::create([
            'rfq_code' => $rfqCode,
            'buyer_name' => $validated['buyer_name'],
            'company_name' => $validated['company_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'country' => $validated['country'],
            'product_category' => 'Fabric Swatch Hanger Request',
            'order_quantity' => 1000,
            'target_price' => 'Sample Swatch',
            'specifications' => "Requested Swatch: {$validated['swatch_title']} (ID: {$validated['swatch_id']}). Courier Address: {$validated['shipping_address']}",
            'status' => 'pending',
            'status_stage' => 'sampling',
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Fabric swatch request logged. Express courier dispatch will be prepared within 24 hours.',
            'rfq_code' => $rfqCode
        ]);
    }

    /**
     * Compliance Audit & Certification Vault
     */
    public function getAudits()
    {
        $audits = [
            [
                'id' => 'audit-accord',
                'standard' => 'RSC / Accord on Fire & Building Safety',
                'issuer' => 'RMG Sustainability Council (RSC)',
                'audit_id' => 'RSC-BD-8924-STX',
                'status' => '100% Remediated',
                'score' => 'Grade A Approved',
                'renewal_date' => 'Valid Through 2027',
                'scope' => 'Structural Integrity, Electrical Safety, Fire Suppression & Evacuation Infrastructure.',
                'badge' => '/images/certificatelogos/accord-logo.png'
            ],
            [
                'id' => 'audit-bsci',
                'standard' => 'Amfori BSCI Social Audit',
                'issuer' => 'Amfori International',
                'audit_id' => 'BSCI-ID-158923',
                'status' => 'Verified Ethical',
                'score' => 'Overall Rating: A (Very Good)',
                'renewal_date' => 'Annual Cycle 2026-2027',
                'scope' => 'Fair Remuneration, Decent Working Hours, OHS Protection, No Child or Forced Labor.',
                'badge' => '/images/certificatelogos/bsci-logo.png'
            ],
            [
                'id' => 'audit-oekotex',
                'standard' => 'OEKO-TEX Standard 100 Class I & II',
                'issuer' => 'Testex Swiss Textile Testing Ltd',
                'audit_id' => 'OEKO-TESTEX-48912',
                'status' => 'Eco-Toxicology Certified',
                'score' => 'Zero Harmful Substances',
                'renewal_date' => 'Class I Safe for Infant Wear',
                'scope' => 'Pesticides, Heavy Metals, Formaldehyde & Azo Dye Banned Carcinogen Safety.',
                'badge' => '/images/certificatelogos/cit-logo.png'
            ],
            [
                'id' => 'audit-sedex',
                'standard' => 'SEDEX SMETA 4-Pillar Audit',
                'issuer' => 'Intertek Testing Services',
                'audit_id' => 'SEDEX-SMETA-2026-781',
                'status' => 'Full Sedex Member',
                'score' => 'Zero Non-Conformances',
                'renewal_date' => 'Updated Q2 2026',
                'scope' => 'Labor Standards, Health & Safety, Environmental Stewardship, Business Integrity.',
                'badge' => '/images/certificatelogos/sedex-logo.png'
            ],
            [
                'id' => 'audit-gots',
                'standard' => 'Global Organic Textile Standard (GOTS)',
                'issuer' => 'Control Union Certifications',
                'audit_id' => 'CU-GOTS-882194',
                'status' => 'Certified Organic Chain',
                'score' => '100% Traceable BCI/Organic',
                'renewal_date' => 'Valid for 2026-2027 Crop',
                'scope' => 'Ginning, Spinning, Wet Processing, CMT & Packing Traceable Transaction Certificates (TC).',
                'badge' => '/images/certificatelogos/gots-log.png'
            ],
        ];

        return response()->json([
            'status' => 'success',
            'audits' => $audits
        ]);
    }

    /**
     * Download Audit Executive Summary Lead Gate
     */
    public function downloadAuditDossier(Request $request)
    {
        $validated = $request->validate([
            'audit_id' => 'required|string',
            'standard_name' => 'required|string',
            'buyer_name' => 'required|string|max:255',
            'company_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'country' => 'nullable|string|max:100',
        ]);

        $rfqCode = 'STX-AUD-' . rand(1000, 9999) . '-' . date('Y');

        \App\Models\RfqInquiry::create([
            'rfq_code' => $rfqCode,
            'buyer_name' => $validated['buyer_name'],
            'company_name' => $validated['company_name'],
            'email' => $validated['email'],
            'country' => $validated['country'] ?? 'International Brand',
            'product_category' => 'Compliance Audit Dossier Access',
            'order_quantity' => 5000,
            'target_price' => 'Audit Access',
            'specifications' => "Buyer downloaded Executive Audit Summary for: {$validated['standard_name']} (Audit Ref: {$validated['audit_id']}).",
            'status' => 'reviewed',
            'status_stage' => 'costing',
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Audit credentials unlocked.',
            'dossier_download_url' => asset('images/certificatelogos/accord-logo.png'),
            'rfq_code' => $rfqCode
        ]);
    }
}
