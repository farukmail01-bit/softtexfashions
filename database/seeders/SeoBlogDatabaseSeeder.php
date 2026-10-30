<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SeoKeyword;
use App\Models\Article;
use Illuminate\Support\Str;

class SeoBlogDatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $keywords = [
            [
                'keyword' => 'Garments Buying House in Bangladesh',
                'category' => 'Apparel Sourcing',
                'search_intent' => 'Commercial Sourcing',
                'priority' => 'high',
                'usage_count' => 1,
            ],
            [
                'keyword' => 'Sustainable BCI Cotton Polo Shirt Manufacturer',
                'category' => 'Knitwear & Polos',
                'search_intent' => 'Buyer OEM Inquiry',
                'priority' => 'high',
                'usage_count' => 0,
            ],
            [
                'keyword' => 'AQL 1.5 Garments Quality Inspection Standards Dhaka',
                'category' => 'Quality & Compliance',
                'search_intent' => 'Technical Audit',
                'priority' => 'high',
                'usage_count' => 0,
            ],
            [
                'keyword' => 'GSP 0% Duty Free Apparel Export to European Union',
                'category' => 'Logistics & Trade',
                'search_intent' => 'Tariff & Customs Benefit',
                'priority' => 'high',
                'usage_count' => 0,
            ],
            [
                'keyword' => 'OEM Custom Denim Jeans Manufacturer Chittagong',
                'category' => 'Denim & Woven',
                'search_intent' => 'Commercial Sourcing',
                'priority' => 'high',
                'usage_count' => 0,
            ],
            [
                'keyword' => 'GOTS Certified Organic Babywear Supplier Bangladesh',
                'category' => 'Kids & Babywear',
                'search_intent' => 'Organic OEM',
                'priority' => 'medium',
                'usage_count' => 0,
            ],
            [
                'keyword' => 'Apparel Sourcing Turnaround & Sea Freight Lead Times',
                'category' => 'Supply Chain',
                'search_intent' => 'Lead Time Planning',
                'priority' => 'medium',
                'usage_count' => 0,
            ],
            [
                'keyword' => 'Heavyweight French Terry Hoodie Factory Wholesale',
                'category' => 'Knitwear & Fleece',
                'search_intent' => 'Streetwear Brand Sourcing',
                'priority' => 'high',
                'usage_count' => 0,
            ],
            [
                'keyword' => 'BSCI and Accord Certified Garments Factories in Dhaka',
                'category' => 'Social Compliance',
                'search_intent' => 'Ethical Sourcing Audit',
                'priority' => 'medium',
                'usage_count' => 0,
            ],
            [
                'keyword' => 'Garment Cost Engineering & FOB Breakdown Guide',
                'category' => 'Costing & Merchandising',
                'search_intent' => 'Price Negotiation',
                'priority' => 'high',
                'usage_count' => 0,
            ],
        ];

        foreach ($keywords as $kw) {
            SeoKeyword::firstOrCreate(['keyword' => $kw['keyword']], $kw);
        }

        // Seed an authentic pillar article
        $sampleTitle = 'Why Global Fashion Brands Partner with Garments Buying Houses in Bangladesh: The Complete 2026 Sourcing Blueprint';
        Article::firstOrCreate(
            ['slug' => 'garments-buying-house-bangladesh-sourcing-blueprint'],
            [
                'title' => $sampleTitle,
                'slug' => 'garments-buying-house-bangladesh-sourcing-blueprint',
                'primary_keyword' => 'Garments Buying House in Bangladesh',
                'category' => 'Apparel Sourcing',
                'meta_title' => 'Garments Buying House in Bangladesh | 2026 Sourcing Blueprint',
                'meta_description' => 'Comprehensive sourcing guide for international fashion retail brands: How partnering with an elite garments buying house in Dhaka ensures AQL 1.5 quality, 0% duty GSP tariffs, and direct factory pricing.',
                'meta_keywords' => 'Garments Buying House in Bangladesh, apparel sourcing agency Dhaka, knitwear OEM Bangladesh, AQL inspection Chittagong',
                'excerpt' => 'Navigating Asian textile supply chains requires on-the-ground technical merchandisers, strict AQL 1.5 quality assurance, and direct access to 30+ compliant composite manufacturing units in Bangladesh.',
                'content' => '<h2>The Strategic Evolution of Bangladesh’s RMG Sourcing Ecosystem</h2>
<p>Bangladesh continues to solidify its undisputed position as the world’s second-largest apparel exporter, shipping over <strong>$47 billion</strong> in knitwear, woven garments, denim, and specialized outerwear annually. For European, North American, and Scandinavian fashion retail chains, the critical question is no longer <em>whether</em> to source in Bangladesh, but <em>how to manage production without quality variances, communication delays, or social compliance risks</em>.</p>
<p>This is where an elite, 100% export-oriented <strong>Garments Buying House in Bangladesh</strong>—such as <strong>SOFTTEX FASHIONS WEAR LIMITED</strong>—acts as the indispensable sourcing bridge between global fashion brands and specialized composite factories in Dhaka, Gazipur, and Narayanganj.</p>

<h2>1. Direct Factory Sourcing vs. Technical Buying House: The Risk Matrix</h2>
<p>International apparel buyers frequently attempt to engage directly with individual factories, only to encounter common operational pitfalls:</p>
<ul>
  <li><strong>Capacity Allocation Mismatch:</strong> Individual factories prioritize their largest bulk accounts (100k+ pcs), leaving medium-scale brand programs (1,000 to 20,000 pcs) vulnerable to line delays.</li>
  <li><strong>Lack of Independent QA:</strong> Factory-internal QC teams inherently face conflicting priorities between meeting delivery deadlines and reporting defective stitching, shading, or needle holes.</li>
  <li><strong>Fabric Sourcing Bottlenecks:</strong> Local yarn spinning, lab-dip color approvals, and imported trims require dedicated merchandising follow-ups every 48 hours.</li>
</ul>
<p>By engaging an on-the-ground buying house, brand buyers gain a dedicated merchandising desk that supervises spinning mills, knitting units, industrial dye-houses, and sewing lines on a daily basis.</p>

<h2>2. Technical Quality Assurance: The AQL 1.5 Standard in Practice</h2>
<p>At SOFTTEX FASHIONS WEAR LIMITED, quality assurance is an engineered discipline rather than a cosmetic inspection. Every purchase order is subjected to a strict 4-stage inspection regimen:</p>
<ol>
  <li><strong>Pre-Production Sample (PPS) & Fabric Testing:</strong> Verifying shrinkage tolerances (&le; 3.5%), color fastness to wash and rub (Grade 4-5), pilling resistance, and dimensional stability.</li>
  <li><strong>Initial Production Check (IPC):</strong> Auditing cut-piece bundles, print alignment, and embroidery precision before sewing lines reach full speed.</li>
  <li><strong>During Production Check (DUPRO):</strong> Verifying in-line measurements, stitch per inch (SPI) count, seam tension, and needle detectors.</li>
  <li><strong>Final Random Inspection (FRI):</strong> Full pre-shipment audit under ISO 2859-1 (AQL 1.5 Major / 2.5 Minor) before releasing shipping documents.</li>
</ol>

<h2>3. International Tariff Advantages: GSP 0% Duty Free Access</h2>
<p>Bangladesh maintains duty-free trade advantages that significantly boost retailer gross margins:</p>
<ul>
  <li><strong>European Union (EBA / GSP):</strong> 0% import duty on knitwear and woven apparel under the Everything But Arms arrangement.</li>
  <li><strong>United Kingdom (DCTS):</strong> 0% tariff under the Developing Countries Trading Scheme.</li>
  <li><strong>Canada (LDCT) & Japan (GSP):</strong> Full duty exemption on certified knit and woven products.</li>
</ul>

<h2>4. Actionable Sourcing Checklist for Fashion Importers</h2>
<p>When preparing your upcoming Spring/Summer or Autumn/Winter programs with a Bangladesh garments buying house, ensure your dossier includes:</p>
<ul>
  <li>Complete Tech Pack with graded measurement spec sheet and tolerance allowances.</li>
  <li>Pantone TCX / TPX color references for lab dip strike-offs.</li>
  <li>Yarn specifications (e.g., 30/1 combed BCI cotton, 220 GSM single jersey, 2x2 lycra rib).</li>
  <li>Branded trims package (care labels, woven neck labels, hangtags, and FSC-certified polybags).</li>
</ul>
<p>To request custom FOB cost engineering and fabric strike-off swatches for your next collection, contact the merchandising desk at <strong>SOFTTEX FASHIONS WEAR LIMITED</strong> today.</p>',
                'featured_image' => 'images/mens/1.jpg',
                'read_time_minutes' => 6,
                'author' => 'Softtex Technical Merchandising Desk',
                'status' => 'published',
                'views_count' => 142,
            ]
        );
    }
}
