@extends('layouts.app')

@section('content')
<div class="softtex-editorial-page">
  <!-- Hero Header -->
  <header class="softtex-page-hero softtex-services-hero">
    <div class="container">
      <p class="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">
        Full-Spectrum Apparel Sourcing &amp; Manufacturing Services
      </p>
      <h1>End-to-End Apparel Manufacturing. Sourced with Absolute Precision.</h1>
      <p class="softtex-services-hero-lead">
        From rapid CAD sampling and custom fabric R&amp;D to automated sewing lines, rigorous AQL 1.5 inspection gates, and duty-free global export logistics — Softtex Fashions delivers seamless apparel production across Bangladesh for premier global retail brands.
      </p>
      <div class="softtex-services-hero-actions">
        <a class="softtex-editorial-button" href="{{ route('contact') }}">
          Request Sourcing Proposal
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
        <a class="softtex-editorial-button softtex-editorial-button-secondary" href="{{ url('/calculator') }}">
          FOB Cost Calculator
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
        </a>
      </div>

      <!-- Operational KPIs -->
      <div class="softtex-services-kpis">
        <div class="softtex-services-kpi-card">
          <div class="softtex-services-kpi-val">1.8M+</div>
          <div class="softtex-services-kpi-title">Monthly Capacity</div>
          <p class="softtex-services-kpi-desc">Units monthly output across knitwear, woven tops, denim, and sweater production lines.</p>
        </div>
        <div class="softtex-services-kpi-card">
          <div class="softtex-services-kpi-val">20-45 Days</div>
          <div class="softtex-services-kpi-title">Agile Lead Time</div>
          <p class="softtex-services-kpi-desc">From lab dip &amp; fabric approval to FOB port dispatch, tailored for fast-fashion cycles.</p>
        </div>
        <div class="softtex-services-kpi-card">
          <div class="softtex-services-kpi-val">230+ Units</div>
          <div class="softtex-services-kpi-title">Audited Partner Network</div>
          <p class="softtex-services-kpi-desc">RSC, BSCI, Sedex, and OEKO-TEX certified manufacturing units across Bangladesh.</p>
        </div>
        <div class="softtex-services-kpi-card">
          <div class="softtex-services-kpi-val">AQL 1.5 / 2.5</div>
          <div class="softtex-services-kpi-title">Strict Quality Standard</div>
          <p class="softtex-services-kpi-desc">Multi-stage roving inline audits and Level II final random inspections with 0% critical tolerance.</p>
        </div>
      </div>
    </div>
  </header>

  <!-- 6 Core Enterprise Bento Services -->
  <section class="softtex-editorial-section">
    <div class="softtex-editorial-wrap">
      <div class="softtex-editorial-heading">
        <p class="softtex-editorial-eyebrow">Enterprise Capabilities</p>
        <h2>Comprehensive Garment Sourcing &amp; Manufacturing Services</h2>
        <p>
          Every stage of your production is managed by seasoned textile engineers and merchandisers on the ground in Dhaka.
        </p>
      </div>

      <div class="softtex-services-bento-grid">
        <!-- 1. Product Development -->
        <article class="softtex-services-card">
          <div>
            <div class="softtex-services-card-top">
              <div class="softtex-services-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>
              </div>
              <span class="softtex-services-card-tag">Concept to Proto</span>
            </div>
            <h3 class="softtex-services-card-title">Product Development &amp; 3D CAD Sampling</h3>
            <p class="softtex-services-card-desc">Transforming design sketches and tech-packs into production-ready styles with rapid 3D CLO virtual drape simulation and physical fit samples within 3 to 5 business days.</p>
          </div>
          <ul class="softtex-services-card-checklist">
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><span>3D CLO virtual garment drape, tension mapping &amp; pattern fitting</span></li>
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><span>Rapid proto, fit, salesman (SMS) &amp; photo shoot samples</span></li>
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><span>Shrinkage-compensated master pattern grading across international size runs</span></li>
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><span>Dedicated tech-pack engineering for fabric yield &amp; floor cost optimization</span></li>
          </ul>
        </article>

        <!-- 2. Direct Factory Sourcing -->
        <article class="softtex-services-card">
          <div>
            <div class="softtex-services-card-top">
              <div class="softtex-services-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
              </div>
              <span class="softtex-services-card-tag">Strategic Sourcing</span>
            </div>
            <h3 class="softtex-services-card-title">Direct Factory-Gate Sourcing &amp; Line Allocation</h3>
            <p class="softtex-services-card-desc">Leveraging our vetted network of 230+ compliant manufacturing units to match each style with the optimal machinery, stitch capability, labor efficiency, and price point.</p>
          </div>
          <ul class="softtex-services-card-checklist">
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><span>Rigorous pre-screening for RSC structural, electrical, and BSCI social compliance</span></li>
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><span>Dedicated line allocation for knitwear, denim, shirts, outerwear, and activewear</span></li>
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><span>Transparent open-book costing with direct factory-gate FOB pricing</span></li>
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><span>Pre-booked seasonal capacity to guarantee on-time bulk delivery</span></li>
          </ul>
        </article>

        <!-- 3. Fabric R&D & Trims -->
        <article class="softtex-services-card">
          <div>
            <div class="softtex-services-card-top">
              <div class="softtex-services-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/><path d="m14.8 9.2 5.2-5.2"/><path d="m8.12 15.88 3.88-3.88"/></svg>
              </div>
              <span class="softtex-services-card-tag">Material Innovation</span>
            </div>
            <h3 class="softtex-services-card-title">Fabric R&amp;D, Eco-Dyeing &amp; Trims Development</h3>
            <p class="softtex-services-card-desc">Custom yarn sourcing, sustainable textile milling, precise pantone lab-dipping, and OEKO-TEX certified embellishments engineered for luxurious hand-feel and endurance.</p>
          </div>
          <ul class="softtex-services-card-checklist">
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><span>Organic cotton (GOTS/OCS), recycled polyester (GRS), linen, and specialized modal/viscose blends</span></li>
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><span>Continuous lab dip matching under standard D65 / CWF lightboxes with spectrophotometer verification</span></li>
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><span>Custom trims, woven jacquard labels, nickel-free snap buttons, and YKK/SBS zipper sourcing</span></li>
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><span>Heavy enzyme, silicone, acid, vintage, and ozone eco-friendly laundry washes</span></li>
          </ul>
        </article>

        <!-- 4. Merchandising & T&A -->
        <article class="softtex-services-card">
          <div>
            <div class="softtex-services-card-top">
              <div class="softtex-services-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
              </div>
              <span class="softtex-services-card-tag">End-to-End Tracking</span>
            </div>
            <h3 class="softtex-services-card-title">Merchandising &amp; Critical Path (T&amp;A) Follow-up</h3>
            <p class="softtex-services-card-desc">Dedicated single point of contact (SPOC) senior merchandisers overseeing day-by-day Time &amp; Action (T&amp;A) schedules to ensure zero line stoppages and complete transparency.</p>
          </div>
          <ul class="softtex-services-card-checklist">
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><span>Granular critical path tracking from yarn spinning to final export packaging</span></li>
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><span>Weekly transparent photo and video milestone progress reports sent to buyer</span></li>
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><span>Proactive risk mitigation for raw material arrivals and dye lot approvals</span></li>
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><span>Rapid 24-hour turnaround on buyer queries across European and US timezones</span></li>
          </ul>
        </article>

        <!-- 5. Quality Assurance -->
        <article class="softtex-services-card">
          <div>
            <div class="softtex-services-card-top">
              <div class="softtex-services-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <span class="softtex-services-card-tag">AQL 1.5 / 2.5 Assurance</span>
            </div>
            <h3 class="softtex-services-card-title">Quality Assurance &amp; Multi-Stage AQL Audits</h3>
            <p class="softtex-services-card-desc">Independent certified roving QA teams stationed on factory floors conducting raw material inspection, inline checks, and final random inspections per ISO 2859-1.</p>
          </div>
          <ul class="softtex-services-card-checklist">
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><span>100% bulk fabric roll screening via ASTM D5430 4-Point inspection protocol</span></li>
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><span>Hourly roving inline audits checking SPI, seam strength, color continuity, and symmetry</span></li>
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><span>Calibrated 9-point conveyor needle detector screening for every exported carton</span></li>
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><span>ANSI/ASQ Z1.4 Level II final statistical inspection with comprehensive digital reporting</span></li>
          </ul>
        </article>

        <!-- 6. Logistics & Shipping -->
        <article class="softtex-services-card">
          <div>
            <div class="softtex-services-card-top">
              <div class="softtex-services-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M12 10v4"/><path d="M12 2v3"/></svg>
              </div>
              <span class="softtex-services-card-tag">Global Freight &amp; Duty-Free</span>
            </div>
            <h3 class="softtex-services-card-title">Export Logistics &amp; Duty-Free Trade Documentation</h3>
            <p class="softtex-services-card-desc">Streamlining multimodal sea and air freight through Chittagong Port and Dhaka Airport with full GSP, REX, and duty-free preferential tariff documentation for global markets.</p>
          </div>
          <ul class="softtex-services-card-checklist">
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><span>Full GSP Form A, EU REX, UK DCTS, and Canada GPT preferential tariff documentation</span></li>
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><span>Freight consolidation, custom carton packing, palletization, and vessel booking</span></li>
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><span>Real-time container tracking from factory gate to destination seaport</span></li>
            <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><span>C-TPAT compliant container sealing and export customs clearance</span></li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <!-- 4-Step Production Flow -->
  <section class="softtex-editorial-section softtex-editorial-alt">
    <div class="softtex-editorial-wrap">
      <div class="softtex-editorial-heading">
        <p class="softtex-editorial-eyebrow">Seamless Execution</p>
        <h2>Our 4-Stage Production Roadmap</h2>
        <p>
          A proven, synchronized workflow engineered to take your collection from concept sketches to shipping port on schedule.
        </p>
      </div>

      <div class="softtex-services-flow-grid">
        <div class="softtex-services-flow-card">
          <div class="softtex-services-flow-step">01</div>
          <h3>Design Brief &amp; Tech-Pack Consultation</h3>
          <p>Review buyer tech-packs, target FOB prices, and material specs. We deliver a detailed feasibility breakdown and price structure within 24 hours.</p>
        </div>
        <div class="softtex-services-flow-card">
          <div class="softtex-services-flow-step">02</div>
          <h3>Sampling, Fit Approval &amp; Lab Dips</h3>
          <p>Develop initial proto samples, lab-dipped pantone strike-offs, and print strike-offs until full buyer approval and fit seal.</p>
        </div>
        <div class="softtex-services-flow-card">
          <div class="softtex-services-flow-step">03</div>
          <h3>Bulk Production &amp; In-Line Quality Control</h3>
          <p>Automated spreading, precision laser cutting, and sewing line execution under continuous roving QA oversight with daily progress updates.</p>
        </div>
        <div class="softtex-services-flow-card">
          <div class="softtex-services-flow-step">04</div>
          <h3>Final AQL 1.5 Audit &amp; Port Dispatch</h3>
          <p>Rigorous Level II final random inspection, metal scan verification, container stuffing, and prompt release of export shipping documentation.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Category Specialization Grid -->
  <section class="softtex-editorial-section">
    <div class="softtex-editorial-wrap">
      <div class="softtex-editorial-heading">
        <p class="softtex-editorial-eyebrow">Category Mastery</p>
        <h2>Product Divisions &amp; Manufacturing Lines</h2>
        <p>
          Specialized manufacturing facilities equipped with modern machinery tailored for specific garment constructions.
        </p>
      </div>

      <div class="softtex-services-cat-grid">
        <div class="softtex-services-cat-card">
          <div class="softtex-services-cat-title">Circular Knit &amp; Jersey</div>
          <p class="softtex-services-cat-items">T-shirts, polos, hoodies, joggers, sweatshirts, tank tops, and loungewear in 100% combed cotton, CVC, and poly-cotton blends.</p>
        </div>
        <div class="softtex-services-cat-card">
          <div class="softtex-services-cat-title">Woven Bottoms &amp; Tops</div>
          <p class="softtex-services-cat-items">5-pocket denim jeans, cargo trousers, casual &amp; formal shirts, chinos, and workwear in twill, poplin, oxford, and stretch weaves.</p>
        </div>
        <div class="softtex-services-cat-card">
          <div class="softtex-services-cat-title">Sweaters &amp; Flat Knits</div>
          <p class="softtex-services-cat-items">Fine 12-14 gauge to chunky 3-5 gauge knitwear, pullovers, cardigans, and jacquard knits in cotton, acrylic, and blended yarns.</p>
        </div>
        <div class="softtex-services-cat-card">
          <div class="softtex-services-cat-title">Outerwear &amp; Sportswear</div>
          <p class="softtex-services-cat-items">Windbreakers, padded puffer jackets, softshells, moisture-wicking athletic jerseys, and technical performance garments.</p>
        </div>
      </div>

      <!-- Sourcing Advantages -->
      <div class="softtex-services-highlights">
        <div class="softtex-services-highlight-card">
          <h4>Zero Broker Markups</h4>
          <p>Direct factory-gate pricing with 100% open-book material &amp; labor breakdown. You negotiate directly with transparent terms.</p>
        </div>
        <div class="softtex-services-highlight-card">
          <h4>Dedicated Account Merchandiser</h4>
          <p>One accountable apparel engineering lead handles your account from development through delivery with proactive daily communication.</p>
        </div>
        <div class="softtex-services-highlight-card">
          <h4>Comprehensive Compliance Shield</h4>
          <p>Zero tolerance for non-compliance. All partner factories hold valid RSC, BSCI, Sedex, or OEKO-TEX safety and social certifications.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Direct Sourcing Call to Action -->
  <section class="softtex-editorial-cta">
    <div class="softtex-editorial-wrap">
      <div>
        <p class="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">Partner With Softtex</p>
        <h2>Ready to manufacture your next apparel collection?</h2>
        <p>
          Send us your tech-packs, target quantities, and destination port. Our merchandising team will provide a comprehensive costing and sampling plan within 24 hours.
        </p>
      </div>
      <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
        <a class="softtex-editorial-button" href="{{ route('contact') }}">
          Request Sourcing Proposal
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
        <a class="softtex-editorial-button softtex-editorial-button-secondary" href="{{ url('/catalogue') }}">
          Browse Catalogues
        </a>
      </div>
    </div>
  </section>
</div>
@endsection
