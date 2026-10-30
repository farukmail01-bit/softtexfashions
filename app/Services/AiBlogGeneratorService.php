<?php

namespace App\Services;

use App\Models\SiteSetting;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class AiBlogGeneratorService
{
    /**
     * Generates a high-authority, technical, SEO-optimized apparel buying guide.
     * Uses configured external AI (Gemini / OpenAI) if an API key is present in settings,
     * or seamlessly uses the built-in high-authority technical heuristics engine.
     *
     * @param string $keyword
     * @param string|null $category
     * @return array
     */
    public function generateArticle(string $keyword, ?string $category = null): array
    {
        $cleanKeyword = trim($keyword);
        
        // 1. Check if external AI engine is configured in Admin Settings
        $apiKey = SiteSetting::get('ai_api_key');
        $provider = strtolower(SiteSetting::get('ai_provider', 'gemini'));
        $model = SiteSetting::get('ai_model', 'gemini-1.5-flash');
        $temperature = (float) SiteSetting::get('ai_temperature', '0.7');

        if (!empty($apiKey) && $provider !== 'heuristic') {
            try {
                if ($provider === 'gemini' || str_contains($provider, 'google')) {
                    $article = $this->generateWithGemini($cleanKeyword, $category, $apiKey, $model, $temperature);
                    if ($article) return $article;
                } elseif ($provider === 'openai') {
                    $article = $this->generateWithOpenAi($cleanKeyword, $category, $apiKey, $model, $temperature);
                    if ($article) return $article;
                }
            } catch (\Throwable $e) {
                Log::warning("External AI generation failed ({$e->getMessage()}). Using built-in technical engine.");
            }
        }

        // 2. High-Authority Built-in Technical Engine Fallback
        return $this->generateHeuristicArticle($cleanKeyword, $category);
    }

    /**
     * Generate article using Google Gemini API
     */
    protected function generateWithGemini(string $keyword, ?string $category, string $apiKey, string $model, float $temperature): ?array
    {
        $endpoint = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent?key={$apiKey}";
        
        $systemPrompt = "You are a Senior Technical Apparel Merchandiser and Sourcing Director for SOFTTEX FASHIONS WEAR LIMITED, an elite garments buying house in Bangladesh. Write an authoritative, comprehensive B2B sourcing guide (800-1200 words) for global apparel buyers on the keyword: \"{$keyword}\". Include technical fabric specs (ASTM/ISO), AQL 1.5 inspection, FOB cost factors, and GSP 0% duty advantages for EU/UK/Canada/Japan. Respond ONLY with valid JSON having keys: title, slug, meta_title (under 60 chars), meta_description (under 160 chars), meta_keywords, excerpt (1-2 sentences), content (rich HTML with h2, h3, p, tables, ul, ol, styling inline), read_time_minutes (integer), author.";

        $response = Http::timeout(25)->post($endpoint, [
            'contents' => [
                ['parts' => [['text' => $systemPrompt]]]
            ],
            'generationConfig' => [
                'temperature' => $temperature,
                'responseMimeType' => 'application/json',
            ]
        ]);

        if ($response->successful()) {
            $json = $response->json();
            $rawText = $json['candidates'][0]['content']['parts'][0]['text'] ?? null;
            if ($rawText) {
                $data = json_decode($rawText, true);
                if ($data && !empty($data['title']) && !empty($data['content'])) {
                    return $this->sanitizeAiResult($data, $keyword, $category);
                }
            }
        }

        return null;
    }

    /**
     * Generate article using OpenAI API
     */
    protected function generateWithOpenAi(string $keyword, ?string $category, string $apiKey, string $model, float $temperature): ?array
    {
        $systemPrompt = "You are a Senior Technical Apparel Merchandiser and Sourcing Director for SOFTTEX FASHIONS WEAR LIMITED, an elite garments buying house in Bangladesh. Write an authoritative, comprehensive B2B sourcing guide (800-1200 words) for global apparel buyers on the keyword: \"{$keyword}\". Include technical fabric specs (ASTM/ISO), AQL 1.5 inspection, FOB cost factors, and GSP 0% duty advantages for EU/UK/Canada/Japan. Respond ONLY with valid JSON with keys: title, slug, meta_title, meta_description, meta_keywords, excerpt, content (HTML with h2, h3, p, tables, ul, ol), read_time_minutes, author.";

        $response = Http::timeout(25)->withHeaders([
            'Authorization' => "Bearer {$apiKey}",
            'Content-Type' => 'application/json',
        ])->post('https://api.openai.com/v1/chat/completions', [
            'model' => $model ?: 'gpt-4o-mini',
            'messages' => [
                ['role' => 'system', 'content' => $systemPrompt],
                ['role' => 'user', 'content' => "Generate complete B2B sourcing guide for: {$keyword}"]
            ],
            'response_format' => ['type' => 'json_object'],
            'temperature' => $temperature,
        ]);

        if ($response->successful()) {
            $json = $response->json();
            $rawText = $json['choices'][0]['message']['content'] ?? null;
            if ($rawText) {
                $data = json_decode($rawText, true);
                if ($data && !empty($data['title']) && !empty($data['content'])) {
                    return $this->sanitizeAiResult($data, $keyword, $category);
                }
            }
        }

        return null;
    }

    /**
     * Sanitize and format AI generation output
     */
    protected function sanitizeAiResult(array $data, string $keyword, ?string $category): array
    {
        $cleanKeyword = trim($keyword);
        $vertical = $this->detectVertical($cleanKeyword);
        $featuredImage = $this->detectImage($cleanKeyword);

        $wordCount = str_word_count(strip_tags($data['content'] ?? ''));
        $readTime = max(3, (int)($data['read_time_minutes'] ?? ceil($wordCount / 200)));

        return [
            'title' => $data['title'],
            'slug' => Str::slug($data['slug'] ?? ($data['title'] . '-' . date('Y'))),
            'primary_keyword' => $cleanKeyword,
            'category' => $category ?: $vertical,
            'meta_title' => substr($data['meta_title'] ?? "{$cleanKeyword} | 2026 Sourcing Guide", 0, 60),
            'meta_description' => substr($data['meta_description'] ?? "Expert sourcing guide on {$cleanKeyword}.", 0, 160),
            'meta_keywords' => $data['meta_keywords'] ?? "{$cleanKeyword}, garments buying house Bangladesh, FOB pricing",
            'excerpt' => $data['excerpt'] ?? "Comprehensive procurement briefing for apparel sourcing heads on {$cleanKeyword}.",
            'content' => $data['content'],
            'featured_image' => $featuredImage,
            'read_time_minutes' => $readTime,
            'author' => $data['author'] ?? 'Softtex Technical Merchandising Desk',
            'status' => SiteSetting::get('ai_default_status', 'published'),
            'word_count' => $wordCount,
        ];
    }

    /**
     * Built-in Heuristic Technical Generator
     */
    public function generateHeuristicArticle(string $cleanKeyword, ?string $category = null): array
    {
        $slug = Str::slug($cleanKeyword . '-sourcing-guide-' . date('Y'));
        $vertical = $this->detectVertical($cleanKeyword);
        $featuredImage = $this->detectImage($cleanKeyword);

        if (!$category) {
            $category = $vertical;
        }

        $title = "The Strategic Buyer’s Guide to {$cleanKeyword}: Technical Specifications, Pricing & Lead Times";
        $metaTitle = "{$cleanKeyword} | 2026 Sourcing Guide";
        if (strlen($metaTitle) > 60) {
            $metaTitle = substr($metaTitle, 0, 57) . '...';
        }

        $metaDesc = "Expert sourcing guide on {$cleanKeyword}. Technical fabric specs, AQL 1.5 quality benchmarks, GSP 0% duty benefits, and factory-gate FOB costing for global fashion brands.";
        if (strlen($metaDesc) > 160) {
            $metaDesc = substr($metaDesc, 0, 157) . '...';
        }

        $metaKeywords = "{$cleanKeyword}, garments buying house Bangladesh, apparel OEM manufacturer Dhaka, FOB pricing Chittagong, AQL 1.5 inspection, textile sourcing 2026";
        $excerpt = "An in-depth procurement briefing for international apparel buyers and sourcing heads on {$cleanKeyword}, covering yarn selection, compliance audits, cost engineering, and production turnaround.";

        $htmlContent = $this->buildTechnicalBody($cleanKeyword, $vertical);
        $wordCount = str_word_count(strip_tags($htmlContent));
        $readTime = max(3, ceil($wordCount / 200));

        return [
            'title' => $title,
            'slug' => $slug,
            'primary_keyword' => $cleanKeyword,
            'category' => $category,
            'meta_title' => $metaTitle,
            'meta_description' => $metaDesc,
            'meta_keywords' => $metaKeywords,
            'excerpt' => $excerpt,
            'content' => $htmlContent,
            'featured_image' => $featuredImage,
            'read_time_minutes' => $readTime,
            'author' => 'Softtex Technical Merchandising Desk',
            'status' => SiteSetting::get('ai_default_status', 'published'),
            'word_count' => $wordCount,
        ];
    }

    protected function detectVertical(string $cleanKeyword): string
    {
        $lower = strtolower($cleanKeyword);
        if (str_contains($lower, 'polo') || str_contains($lower, 'tee') || str_contains($lower, 't-shirt') || str_contains($lower, 'knit')) {
            return 'Knitwear & Circular Knits';
        } elseif (str_contains($lower, 'denim') || str_contains($lower, 'jean') || str_contains($lower, 'pant') || str_contains($lower, 'woven')) {
            return 'Denim & Woven Apparel';
        } elseif (str_contains($lower, 'hoodie') || str_contains($lower, 'sweat') || str_contains($lower, 'fleece')) {
            return 'Heavyweight Fleece & Streetwear';
        } elseif (str_contains($lower, 'kid') || str_contains($lower, 'baby') || str_contains($lower, 'infant') || str_contains($lower, 'romper')) {
            return 'Kids & Organic Babywear';
        } elseif (str_contains($lower, 'compliance') || str_contains($lower, 'audit') || str_contains($lower, 'bsci') || str_contains($lower, 'accord')) {
            return 'Social Compliance & Factory Audits';
        } elseif (str_contains($lower, 'cost') || str_contains($lower, 'fob') || str_contains($lower, 'price') || str_contains($lower, 'gsp')) {
            return 'Cost Engineering & Tariffs';
        }
        return 'General Apparel';
    }

    protected function detectImage(string $cleanKeyword): string
    {
        $lower = strtolower($cleanKeyword);
        if (str_contains($lower, 'polo')) return 'images/uspolo/1.jpg';
        if (str_contains($lower, 'denim') || str_contains($lower, 'jean')) return 'images/mens/10.jpg';
        if (str_contains($lower, 'hoodie') || str_contains($lower, 'fleece')) return 'images/mens/2.jpg';
        if (str_contains($lower, 'kid') || str_contains($lower, 'romper')) return 'images/kids/1.jpg';
        return 'images/mens/1.jpg';
    }

    protected function buildTechnicalBody(string $kw, string $vertical): string
    {
        return <<<HTML
<h2>Introduction: Strategic Procurement Overview for "{$kw}"</h2>
<p>In today's competitive global apparel landscape, international fashion retail brands and department store sourcing managers must balance margin targets with strict supply chain agility. Sourcing <strong>{$kw}</strong> requires deep visibility into yarn spinning volatility, fabric finish stability, social compliance benchmarks, and ocean logistics turnaround.</p>

<p>Operating through an elite, 100% export-oriented garments buying house in Bangladesh—such as <strong>SOFTTEX FASHIONS WEAR LIMITED</strong>—bridges the gap between overseas commercial buyers and over 30+ compliant composite manufacturing units across Dhaka, Gazipur, and Narayanganj.</p>

<h2>1. Technical Fabric Engineering & Physical Specifications</h2>
<p>When developing tech packs and bill-of-materials (BOM) for <em>{$kw}</em>, the following technical standards should be explicitly stated to prevent bulk variance:</p>

<table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 0.9rem;">
  <thead>
    <tr style="background-color: #f1f5f9; text-align: left;">
      <th style="padding: 10px; border: 1px solid #cbd5e1;">Parameter</th>
      <th style="padding: 10px; border: 1px solid #cbd5e1;">Target Benchmark</th>
      <th style="padding: 10px; border: 1px solid #cbd5e1;">Test Method / Standard</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 8px 10px; border: 1px solid #cbd5e1;">Yarn Quality & Count</td>
      <td style="padding: 8px 10px; border: 1px solid #cbd5e1;">100% Combed Compact Ring Spun BCI Cotton</td>
      <td style="padding: 8px 10px; border: 1px solid #cbd5e1;">ASTM D1422</td>
    </tr>
    <tr>
      <td style="padding: 8px 10px; border: 1px solid #cbd5e1;">Dimensional Stability (Shrinkage)</td>
      <td style="padding: 8px 10px; border: 1px solid #cbd5e1;">&le; 3.0% Length &times; &le; 3.0% Width</td>
      <td style="padding: 8px 10px; border: 1px solid #cbd5e1;">AATCC 135 / ISO 6330 (3 washes @ 40&deg;C)</td>
    </tr>
    <tr>
      <td style="padding: 8px 10px; border: 1px solid #cbd5e1;">Color Fastness to Washing</td>
      <td style="padding: 8px 10px; border: 1px solid #cbd5e1;">Grade 4-5 (Change in Color & Staining)</td>
      <td style="padding: 8px 10px; border: 1px solid #cbd5e1;">ISO 105-C06 / AATCC 61</td>
    </tr>
    <tr>
      <td style="padding: 8px 10px; border: 1px solid #cbd5e1;">Color Fastness to Rubbing (Crocking)</td>
      <td style="padding: 8px 10px; border: 1px solid #cbd5e1;">Dry: Grade 4-5 | Wet: Grade 3-4</td>
      <td style="padding: 8px 10px; border: 1px solid #cbd5e1;">ISO 105-X12</td>
    </tr>
    <tr>
      <td style="padding: 8px 10px; border: 1px solid #cbd5e1;">Pilling Resistance</td>
      <td style="padding: 8px 10px; border: 1px solid #cbd5e1;">Grade 4.0 after 2,000 revs</td>
      <td style="padding: 8px 10px; border: 1px solid #cbd5e1;">Martindale Method ISO 12945-2</td>
    </tr>
  </tbody>
</table>

<h2>2. Multi-Stage Quality Assurance: Implementing AQL 1.5 / 2.5</h2>
<p>To ensure zero defect spillover into international retail distribution centers, SOFTTEX implements an institutional 4-gate quality protocol for all programs involving <em>{$kw}</em>:</p>
<ol>
  <li><strong>Pre-Production Review & Lab Dip Strike-Off:</strong> Verifying D65/TL84/CWF light source delta-E under computerized spectrophotometer (&Delta;E &le; 0.8).</li>
  <li><strong>Initial Cutting & Bundle Audit (IPC):</strong> Verifying grainline alignment, bow and skew (&le; 2.5%), and marker efficiency.</li>
  <li><strong>In-Line Production Inspection (DUPRO):</strong> Hourly monitoring of stitch-per-inch (10-12 SPI), flatlock tension, safety stitch margins, and magnetic metal needle detection (1.0mm ferrous calibration).</li>
  <li><strong>Final Random Inspection (FRI):</strong> Performed under internationally recognized ISO 2859-1 standards at Acceptable Quality Level (AQL) 1.5 Major and 2.5 Minor.</li>
</ol>

<h2>3. Factory Gate FOB Cost Breakdown Matrix</h2>
<p>Commercial buyers evaluating FOB Chittagong pricing for <strong>{$kw}</strong> typically observe the following cost allocation ratio in a composite facility:</p>
<ul>
  <li><strong>Raw Materials (Fabric & Yarn):</strong> 58% &ndash; 65% of net garment FOB.</li>
  <li><strong>Cut & Make (CM - Labor & Machinery):</strong> 16% &ndash; 20% based on SAM (Standard Allowed Minutes).</li>
  <li><strong>Trims & Accessories:</strong> 8% &ndash; 12% (YKK zippers, woven damask labels, engraved buttons, barcoding polybags).</li>
  <li><strong>Washing & Industrial Finishing:</strong> 4% &ndash; 7% (Bio-silicone softener, ozone wash, anti-pill enzymes).</li>
  <li><strong>Testing, Overhead & Export Logistics:</strong> 4% &ndash; 6% (Inland transport to Chittagong Port, terminal handling, forwarding documentation).</li>
</ul>

<h2>4. International Duty Exemption: GSP 0% Tariff Advantage</h2>
<p>Importing <em>{$kw}</em> from Bangladesh delivers substantial gross margin benefits due to preferential international trade agreements:</p>
<ul>
  <li><strong>European Union (EBA / GSP):</strong> Full 0% import duty on knitwear and woven items under single-transformation rules of origin.</li>
  <li><strong>United Kingdom (DCTS):</strong> 0% tariff access under the Developing Countries Trading Scheme.</li>
  <li><strong>Canada & Japan:</strong> Duty-free market entry under LDCT and Japanese GSP schemes.</li>
</ul>

<h2>5. Standard Sourcing Lead-Time Calendar</h2>
<p>From initial tech pack sign-off to container loading at Chittagong Port:</p>
<ul>
  <li><strong>Proto Sample & Lab Dip Development:</strong> 7 &ndash; 10 business days.</li>
  <li><strong>Fit Sample & Fit Approvals:</strong> 5 &ndash; 7 business days.</li>
  <li><strong>Fabric Knitting / Weaving & Dyeing:</strong> 18 &ndash; 22 business days.</li>
  <li><strong>Bulk Garment Sewing & Finishing:</strong> 15 &ndash; 20 business days.</li>
  <li><strong>Final AQL Inspection & Container Stuffing:</strong> 3 &ndash; 5 business days.</li>
  <li><strong>Total Typical Turnaround:</strong> 45 &ndash; 60 calendar days (Re-orders: 30 &ndash; 35 days).</li>
</ul>

<h2>Frequently Asked Questions (Buyer FAQ)</h2>
<div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin: 16px 0;">
  <p style="margin: 0 0 8px;"><strong>Q1: What is the minimum order quantity (MOQ) for {$kw}?</strong></p>
  <p style="margin: 0 0 16px; color: #475569;">A: Our standard production MOQ is 1,000 pieces per style/colorway. For specialized blends or test retail programs, we can accommodate flexible trial runs down to 500 pieces.</p>
  
  <p style="margin: 0 0 8px;"><strong>Q2: Can SOFTTEX source custom organic or recycled yarns for this program?</strong></p>
  <p style="margin: 0 0 16px; color: #475569;">A: Yes. We are fully connected to spinning mills holding GOTS, BCI, GRS (Global Recycled Standard), and OEKO-TEX Step certifications, providing full transaction certificates (TC).</p>

  <p style="margin: 0 0 8px;"><strong>Q3: How do I initiate a formal costing and sample proto?</strong></p>
  <p style="margin: 0; color: #475569;">A: You can upload your Tech Pack and target price directly via our digital RFQ portal or WhatsApp desk. Our senior technical merchandisers deliver formal costing within 24 business hours.</p>
</div>

<p style="margin-top: 24px;"><em>Looking to engineer your next apparel collection with zero defect rates and competitive factory-gate pricing? Submit your technical specifications to <strong>SOFTTEX FASHIONS WEAR LIMITED</strong> today.</em></p>
HTML;
    }
}
