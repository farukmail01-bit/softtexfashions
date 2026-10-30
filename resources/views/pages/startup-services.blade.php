@extends('layouts.app')

@section('content')
<div class="softtex-editorial-page">
  <!-- Hero Header -->
  <header class="softtex-page-hero softtex-services-hero">
    <div class="container">
      <div class="softtex-startup-hero-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        Apparel Sourcing Accelerator for Emerging Brands
      </div>
      <h1>Start-Up Apparel Services: Low MOQs, Rapid Sampling &amp; Direct Factory Sourcing</h1>
      <p class="softtex-services-hero-lead">
        Launch and scale your clothing line with enterprise-grade manufacturing capabilities without enterprise volume barriers. We bring Bangladesh's premier manufacturing ecosystem to emerging designers, DTC fashion brands, and boutique apparel labels.
      </p>
      <div class="softtex-services-hero-actions">
        <a class="softtex-editorial-button" href="{{ route('contact') }}">
          Request Start-Up Proposal
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
        <a class="softtex-editorial-button softtex-editorial-button-secondary" href="{{ url('/calculator') }}">
          FOB Cost Calculator
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
        </a>
      </div>

      <!-- Operational KPIs for Start-Ups -->
      <div class="softtex-services-kpis">
        <div class="softtex-services-kpi-card">
          <div class="softtex-services-kpi-val">500 - 1,000 Pcs</div>
          <div class="softtex-services-kpi-title">Flexible Low MOQs</div>
          <p class="softtex-services-kpi-desc">Break the standard 3,000-piece factory threshold with dedicated small-batch lines per style and colorway.</p>
        </div>
        <div class="softtex-services-kpi-card">
          <div class="softtex-services-kpi-val">5 - 7 Days</div>
          <div class="softtex-services-kpi-title">Rapid Prototyping</div>
          <p class="softtex-services-kpi-desc">Express proto samples, CAD pattern grading, and Pantone lab dip strike-offs delivered quickly.</p>
        </div>
        <div class="softtex-services-kpi-card">
          <div class="softtex-services-kpi-val">AQL 1.5 / 2.5</div>
          <div class="softtex-services-kpi-title">Zero-Defect Standard</div>
          <p class="softtex-services-kpi-desc">Same rigorous inspection standard used by tier-1 global retailers, with certified roving floor QA.</p>
        </div>
        <div class="softtex-services-kpi-card">
          <div class="softtex-services-kpi-val">100% Open-Book</div>
          <div class="softtex-services-kpi-title">Direct Factory Costing</div>
          <p class="softtex-services-kpi-desc">Transparent factory-gate pricing with complete bill of materials (BOM) breakdown and zero broker markups.</p>
        </div>
      </div>
    </div>
  </header>

  <!-- 4 Core Service Pillars -->
  <section class="softtex-editorial-section" id="pillars">
    <div class="softtex-editorial-wrap">
      <div class="softtex-editorial-heading">
        <p class="softtex-editorial-eyebrow">The 4 Core Pillars</p>
        <h2>Comprehensive Sourcing Architecture for Start-Up Brands</h2>
        <p>
          Every phase of your production cycle is engineered for agility, lower capital risk, and uncompromising garment quality.
        </p>
      </div>

      <div class="softtex-startup-pillars-grid">
        <!-- Pillar 1: Product Development & Sampling -->
        <article class="softtex-startup-pillar-card">
          <div class="softtex-startup-pillar-thumb">
            <img src="{{ asset('images/collections/product-development-sampling.jpg') }}" alt="Product Development & Sampling" loading="lazy">
            <span class="softtex-startup-pillar-tag">Design &amp; Lab</span>
            <span class="softtex-startup-pillar-metric">5-7 Day Proto</span>
          </div>
          <div class="softtex-startup-pillar-body">
            <h3 class="softtex-startup-pillar-title">Product Development &amp; Sampling</h3>
            <div class="softtex-startup-pillar-intro">
              From design brief to proto samples: pattern grading, fabric sourcing, trim development, and rapid fit revisions in 5-7 days.
            </div>
            <ul class="softtex-startup-pillar-features">
              <li>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6 9 17l-5-5"/></svg>
                <span><strong>Concept to Tech-Pack:</strong> We convert design sketches, mood boards, or physical reference garments into factory-ready technical specifications.</span>
              </li>
              <li>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6 9 17l-5-5"/></svg>
                <span><strong>Master Pattern Grading:</strong> International size grade rules (US, UK, EU, JP) with shrinkage compensation calculations.</span>
              </li>
              <li>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6 9 17l-5-5"/></svg>
                <span><strong>Fabric &amp; Trims Sourcing:</strong> Combed cotton jersey, French terry, fleece, linen, organic cotton (GOTS), custom branded woven labels, and tags.</span>
              </li>
              <li>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6 9 17l-5-5"/></svg>
                <span><strong>Rapid Fit Revisions:</strong> Quick turnaround on proto samples, fit approvals, and pre-production (PP) samples sent directly to your studio.</span>
              </li>
            </ul>
            <div class="softtex-startup-pillar-footer">
              <a class="softtex-editorial-button" href="{{ route('contact') }}">
                Start Sample Development
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </article>

        <!-- Pillar 2: Apparel Sourcing & Merchandising -->
        <article class="softtex-startup-pillar-card">
          <div class="softtex-startup-pillar-thumb">
            <img src="{{ asset('images/collections/woven-shirts-collection.jpg') }}" alt="Apparel Sourcing & Merchandising" loading="lazy">
            <span class="softtex-startup-pillar-tag">Sourcing Bridge</span>
            <span class="softtex-startup-pillar-metric">230+ Factory Network</span>
          </div>
          <div class="softtex-startup-pillar-body">
            <h3 class="softtex-startup-pillar-title">Apparel Sourcing &amp; Merchandising</h3>
            <div class="softtex-startup-pillar-intro">
              Direct factory matching across our network of 230+ audited manufacturing facilities in Bangladesh for optimal FOB pricing and capacity.
            </div>
            <ul class="softtex-startup-pillar-features">
              <li>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6 9 17l-5-5"/></svg>
                <span><strong>Small-Batch Line Allocation:</strong> Pre-screened partner factories equipped with agile production cells that welcome 500-1,000 unit runs.</span>
              </li>
              <li>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6 9 17l-5-5"/></svg>
                <span><strong>Transparent Open-Book Costing:</strong> Clear breakdown of yarn, knitting/weaving, dyeing, cut &amp; make (CM), and trims with zero hidden fees.</span>
              </li>
              <li>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6 9 17l-5-5"/></svg>
                <span><strong>Dedicated Merchandiser (SPOC):</strong> A single fluent English-speaking apparel engineer assigned to shepherd your orders from day one.</span>
              </li>
              <li>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6 9 17l-5-5"/></svg>
                <span><strong>Ethically Certified Facilities:</strong> Partner plants verified by BSCI, Sedex SMETA, RSC (Accord), and OEKO-TEX Standard 100.</span>
              </li>
            </ul>
            <div class="softtex-startup-pillar-footer">
              <a class="softtex-editorial-button" href="{{ route('contact') }}">
                Inquire Factory Capacity
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </article>

        <!-- Pillar 3: Quality Assurance & Inspection -->
        <article class="softtex-startup-pillar-card">
          <div class="softtex-startup-pillar-thumb">
            <img src="{{ asset('images/collections/quality-assurance-inspection.jpg') }}" alt="Quality Assurance & Inspection" loading="lazy">
            <span class="softtex-startup-pillar-tag">Zero Defects</span>
            <span class="softtex-startup-pillar-metric">AQL 1.5 Protocol</span>
          </div>
          <div class="softtex-startup-pillar-body">
            <h3 class="softtex-startup-pillar-title">Quality Assurance &amp; Inspection</h3>
            <div class="softtex-startup-pillar-intro">
              Rigorous 3-tier inspection protocol: Pre-production, In-line, and Final Random Inspection per strict AQL 1.5 / 2.5 standards.
            </div>
            <ul class="softtex-startup-pillar-features">
              <li>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6 9 17l-5-5"/></svg>
                <span><strong>Tier 1: Pre-Production Fabric Screening:</strong> 4-point ASTM D5430 fabric roll inspection, GSM verification, shrinkage testing, and color crocking.</span>
              </li>
              <li>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6 9 17l-5-5"/></svg>
                <span><strong>Tier 2: Roving Inline Audits:</strong> Continuous sewing line checks for stitches-per-inch (SPI), tension, symmetry, seam integrity, and critical dimensions.</span>
              </li>
              <li>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6 9 17l-5-5"/></svg>
                <span><strong>Tier 3: Level II Final Random Inspection:</strong> ANSI/ASQ Z1.4 sampling protocol with 0% tolerance for critical defects before packaging closure.</span>
              </li>
              <li>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6 9 17l-5-5"/></svg>
                <span><strong>Conveyor Needle Screening:</strong> 100% metal detector scan for every garment to ensure zero broken needle fragments reach end consumers.</span>
              </li>
            </ul>
            <div class="softtex-startup-pillar-footer">
              <a class="softtex-editorial-button" href="{{ route('quality') }}">
                View Quality Protocols
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </article>

        <!-- Pillar 4: Production Tracking & Export Logistics -->
        <article class="softtex-startup-pillar-card">
          <div class="softtex-startup-pillar-thumb">
            <img src="{{ asset('images/factory/sewing-garment.jpg') }}" alt="Production Tracking & Export Logistics" loading="lazy">
            <span class="softtex-startup-pillar-tag">Global Delivery</span>
            <span class="softtex-startup-pillar-metric">Door-to-Door &amp; LCL</span>
          </div>
          <div class="softtex-startup-pillar-body">
            <h3 class="softtex-startup-pillar-title">Production Tracking &amp; Export Logistics</h3>
            <div class="softtex-startup-pillar-intro">
              Proactive T&A scheduling, daily milestone updates, shipping documentation, and reliable global container freight export.
            </div>
            <ul class="softtex-startup-pillar-features">
              <li>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6 9 17l-5-5"/></svg>
                <span><strong>Live Critical Path (T&amp;A) Calendar:</strong> Granular tracking of yarn procurement, knitting/weaving, dyeing, cutting, sewing, and packing dates.</span>
              </li>
              <li>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6 9 17l-5-5"/></svg>
                <span><strong>Flexible Sea &amp; Air Freight:</strong> Cost-effective LCL (Less than Container Load) sea shipping, courier air freight (DHL/FedEx/UPS), or air cargo consolidation.</span>
              </li>
              <li>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6 9 17l-5-5"/></svg>
                <span><strong>Duty-Free Tariff Documentation:</strong> Full GSP Form A, EU REX, UK DCTS, and Canada GPT documentation to minimize import tariffs.</span>
              </li>
              <li>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6 9 17l-5-5"/></svg>
                <span><strong>Direct 3PL &amp; Amazon FBA Prep:</strong> Custom barcode polybags, carton labeling, packing lists, and commercial invoicing formatted for seamless customs clearance.</span>
              </li>
            </ul>
            <div class="softtex-startup-pillar-footer">
              <a class="softtex-editorial-button" href="{{ route('contact') }}">
                Plan Shipment Schedule
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- Startup vs Traditional Factory Comparison Matrix -->
  <section class="softtex-editorial-section softtex-editorial-alt">
    <div class="softtex-editorial-wrap">
      <div class="softtex-editorial-heading">
        <p class="softtex-editorial-eyebrow">Strategic Advantage</p>
        <h2>Why Emerging Brands Choose Softtex Fashions</h2>
        <p>
          Traditional factories build barriers for small orders. Softtex Fashions bridges the gap with tailored solutions built specifically for growing apparel labels.
        </p>
      </div>

      <div class="softtex-startup-matrix-wrap">
        <table class="softtex-startup-matrix">
          <thead>
            <tr>
              <th>Manufacturing Criteria</th>
              <th class="softtex-traditional-col">Traditional Enterprise Factories</th>
              <th class="softtex-highlight-col">Softtex Start-Up Program</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Minimum Order Quantity (MOQ)</strong></td>
              <td class="softtex-traditional-col">3,000 - 5,000 pcs per style (High inventory risk)</td>
              <td class="softtex-highlight-col">500 - 1,000 pcs per style (Agile test batches)</td>
            </tr>
            <tr>
              <td><strong>Prototyping &amp; Sampling Speed</strong></td>
              <td class="softtex-traditional-col">3 to 6 weeks, low priority in sample room</td>
              <td class="softtex-highlight-col">5 to 7 business days with rapid revision cycles</td>
            </tr>
            <tr>
              <td><strong>Pricing Transparency</strong></td>
              <td class="softtex-traditional-col">Opaque lump sum quote with hidden markups</td>
              <td class="softtex-highlight-col">100% open-book factory-gate costing breakdown</td>
            </tr>
            <tr>
              <td><strong>Account Management &amp; T&amp;A</strong></td>
              <td class="softtex-traditional-col">Slow email responses, deprioritized production slots</td>
              <td class="softtex-highlight-col">Dedicated SPOC merchandiser with real-time updates</td>
            </tr>
            <tr>
              <td><strong>Quality Control Standard</strong></td>
              <td class="softtex-traditional-col">Superficial end-of-line spot checks</td>
              <td class="softtex-highlight-col">3-tier AQL 1.5 inspection with photo audit reports</td>
            </tr>
            <tr>
              <td><strong>Logistics &amp; Fulfillment</strong></td>
              <td class="softtex-traditional-col">FOB Full Container (FCL) port pickup only</td>
              <td class="softtex-highlight-col">LCL sea freight, express air, and direct 3PL/FBA prep</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- 4-Step Production Flow for Startups -->
  <section class="softtex-editorial-section">
    <div class="softtex-editorial-wrap">
      <div class="softtex-editorial-heading">
        <p class="softtex-editorial-eyebrow">Agile Production Roadmap</p>
        <h2>From Tech-Pack to First Drop in 4 Steps</h2>
        <p>
          A synchronized, transparent workflow designed to launch your apparel collection smoothly and on schedule.
        </p>
      </div>

      <div class="softtex-services-flow-grid">
        <div class="softtex-services-flow-card">
          <div class="softtex-services-flow-step">01</div>
          <h3>Tech-Pack &amp; Costing</h3>
          <p>Send your sketches, tech-packs, or reference garments. We evaluate fabric suitability, yield, and provide an open-book FOB quote within 24 hours.</p>
        </div>
        <div class="softtex-services-flow-card">
          <div class="softtex-services-flow-step">02</div>
          <h3>Rapid Sampling &amp; Fit Seal</h3>
          <p>We source fabric, prepare Pantone lab dips, and craft initial proto samples in 5-7 days. We refine until you grant complete fit approval.</p>
        </div>
        <div class="softtex-services-flow-card">
          <div class="softtex-services-flow-step">03</div>
          <h3>Small-Batch Production</h3>
          <p>Bulk production begins on vetted lines. Roving QA teams conduct daily inline checks, and we send weekly photo and video progress reports.</p>
        </div>
        <div class="softtex-services-flow-card">
          <div class="softtex-services-flow-step">04</div>
          <h3>AQL 1.5 Audit &amp; Dispatch</h3>
          <p>We perform Level II final random inspection, 100% metal screening, pack to your specs, and ship via LCL sea freight or express air cargo.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Frequently Asked Questions -->
  <section class="softtex-editorial-section softtex-editorial-alt">
    <div class="softtex-editorial-wrap">
      <div class="softtex-editorial-heading">
        <p class="softtex-editorial-eyebrow">Founder Questions</p>
        <h2>Frequently Asked Questions About Start-Up Manufacturing</h2>
        <p>
          Clear answers to common questions about small-batch manufacturing, minimums, sampling, and shipping.
        </p>
      </div>

      <div class="softtex-startup-faq-grid">
        <div class="softtex-startup-faq-card">
          <h4 class="softtex-startup-faq-q">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
            What is the minimum order quantity (MOQ) for new fashion brands?
          </h4>
          <p class="softtex-startup-faq-a">
            Our start-up program accommodates orders starting from 500 to 1,000 pieces per style across standard colorways and size breakdowns. For specialized circular knits using in-stock yarns, lower test runs may be possible upon review.
          </p>
        </div>

        <div class="softtex-startup-faq-card">
          <h4 class="softtex-startup-faq-q">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
            Can I start if I only have sketches and reference photos?
          </h4>
          <p class="softtex-startup-faq-a">
            Yes. Our product development team can translate your rough sketches, moodboards, or physical vintage samples into complete technical specification sheets (tech packs), measurement charts, and pattern files.
          </p>
        </div>

        <div class="softtex-startup-faq-card">
          <h4 class="softtex-startup-faq-q">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
            How fast can I receive my first physical fit sample?
          </h4>
          <p class="softtex-startup-faq-a">
            Once tech-pack specifications and available fabric qualities are confirmed, proto samples are drafted, cut, and sewn within 5 to 7 business days, then dispatched via DHL or FedEx international express.
          </p>
        </div>

        <div class="softtex-startup-faq-card">
          <h4 class="softtex-startup-faq-q">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
            How does Softtex protect our brand's unique designs and IP?
          </h4>
          <p class="softtex-startup-faq-a">
            We operate with strict confidentiality agreements (NDAs). Your tech-packs, patterns, custom prints, and embroidery artworks remain your exclusive intellectual property and are never shared or repurposed.
          </p>
        </div>

        <div class="softtex-startup-faq-card">
          <h4 class="softtex-startup-faq-q">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
            Can you ship directly to Amazon FBA or our fulfillment 3PL warehouse?
          </h4>
          <p class="softtex-startup-faq-a">
            Yes. We handle carton labeling, barcode sticker application, individual polybagging, and palletization to comply with Amazon FBA and third-party logistics requirements across the USA, UK, Europe, and Canada.
          </p>
        </div>

        <div class="softtex-startup-faq-card">
          <h4 class="softtex-startup-faq-q">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
            What payment methods and terms are accepted for first runs?
          </h4>
          <p class="softtex-startup-faq-a">
            For initial startup runs, we accept Irrevocable Letters of Credit (L/C at sight) or standard Wire Transfer (T/T with a deposit for raw materials and the balance payable upon AQL 1.5 final inspection pass before shipment).
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Banner -->
  <section class="softtex-editorial-cta">
    <div class="softtex-editorial-wrap">
      <div>
        <p class="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">Launch With Softtex</p>
        <h2>Ready to manufacture your first collection?</h2>
        <p>
          Send us your designs, sketches, or tech-packs. Our dedicated startup merchandising desk will provide an open-book costing and rapid sampling proposal within 24 hours.
        </p>
      </div>
      <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
        <a class="softtex-editorial-button" href="{{ route('contact') }}">
          Request Start-Up Proposal
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
        <a class="softtex-editorial-button softtex-editorial-button-secondary" href="{{ url('/calculator') }}">
          Calculate FOB Cost
        </a>
      </div>
    </div>
  </section>
</div>
@endsection
