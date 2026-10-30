@extends('layouts.app')

@section('content')
<div class="softtex-editorial-page softtex-quality-page">
  {{-- HERO SECTION --}}
  <header class="softtex-quality-hero">
    <div class="softtex-editorial-wrap">
      <p class="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">
        Precision Engineering &amp; Quality Governance
      </p>
      <h1>Zero-Defect Standard. Multi-Stage Quality Assurance.</h1>
      <p class="softtex-quality-hero-lead">
        Quality is not an afterthought at Softtex Fashions Wear Limited—it is engineered into every stage of the
        sourcing lifecycle. From raw fiber inspection to laser-guided cutting and statistical AQL 1.5 container
        sealing, our dedicated technical teams safeguard your brand reputation.
      </p>

      {{-- 4 CORE KPI BADGES --}}
      <div class="softtex-quality-kpis">
        <div class="softtex-quality-kpi-card">
          <div class="softtex-quality-kpi-val">AQL 1.5 / 2.5</div>
          <div class="softtex-quality-kpi-title">Strict Quality Standard</div>
          <p class="softtex-quality-kpi-desc">ISO 2859-1 Level II normal sampling with zero tolerance for critical flaws.</p>
        </div>
        <div class="softtex-quality-kpi-card">
          <div class="softtex-quality-kpi-val">4-Point System</div>
          <div class="softtex-quality-kpi-title">Fabric Defect Screening</div>
          <p class="softtex-quality-kpi-desc">ASTM D5430 inspection across 100% of bulk fabric rolls before cutting.</p>
        </div>
        <div class="softtex-quality-kpi-card">
          <div class="softtex-quality-kpi-val">100% Metal Scan</div>
          <div class="softtex-quality-kpi-title">Needle Detector Security</div>
          <p class="softtex-quality-kpi-desc">High-sensitivity 9-point conveyor detector screening for all export units.</p>
        </div>
        <div class="softtex-quality-kpi-card">
          <div class="softtex-quality-kpi-val">0% Critical</div>
          <div class="softtex-quality-kpi-title">Zero-Defect Protocol</div>
          <p class="softtex-quality-kpi-desc">Immediate quarantine of any style exceeding allowable defect thresholds.</p>
        </div>
      </div>
    </div>
  </header>

  {{-- 3 QUALITY GATEWAYS SECTION --}}
  <section class="softtex-editorial-section">
    <div class="softtex-editorial-wrap">
      <div class="softtex-editorial-heading">
        <p class="softtex-editorial-eyebrow">Three-Tier Quality Gateways</p>
        <h2>Systematic Quality Control Across Every Order</h2>
        <p style="max-width: 640px; color: var(--editorial-muted); margin: 8px 0 0;">
          Rigorous milestones where no batch advances to the next phase without certified QA clearance.
        </p>
      </div>

      <div class="softtex-quality-gateways-grid">
        {{-- Gateway 01 --}}
        <article class="softtex-quality-gateway-card">
          <div>
            <div class="softtex-quality-gateway-top">
              <span class="softtex-quality-gateway-num">01</span>
              <span class="softtex-quality-gateway-pill">Raw Material &amp; CAD</span>
            </div>
            <h3>Pre-Production Gateway</h3>
            <span class="softtex-quality-gateway-subtitle">Fabric Inspection &amp; Component Approvals</span>
            <ul class="softtex-quality-checklist">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                <span>ASTM D5430 4-point fabric scoring for holes, slubs, skewness, and color shading.</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                <span>Laboratory yarn count, GSM tolerance (+/- 3%), and dimensional stability wash tests.</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                <span>Trims endurance tests: zipper cycle test, button pull force (&gt;90 Newtons), elastic recovery.</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                <span>CAD grading, shrinkage-adjusted patterns, and buyer-approved fit proto validation.</span>
              </li>
            </ul>
          </div>
        </article>

        {{-- Gateway 02 --}}
        <article class="softtex-quality-gateway-card">
          <div>
            <div class="softtex-quality-gateway-top">
              <span class="softtex-quality-gateway-num">02</span>
              <span class="softtex-quality-gateway-pill">Floor Process Control</span>
            </div>
            <h3>In-Line Manufacturing Gateway</h3>
            <span class="softtex-quality-gateway-subtitle">Cutting, Sewing &amp; Roving Floor Audits</span>
            <ul class="softtex-quality-checklist">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                <span>Precision laser &amp; automatic spreading checks with 24-hour fabric relaxation.</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                <span>Hourly roving QA checks: SPI (Stitches Per Inch), seam slippage, tension balance, needle heat.</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                <span>Critical shade-matching between front/back panels under D65 standard daylight lightboxes.</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                <span>Real-time traffic-light alert system on sewing floor to instantly correct line defects.</span>
              </li>
            </ul>
          </div>
        </article>

        {{-- Gateway 03 --}}
        <article class="softtex-quality-gateway-card">
          <div>
            <div class="softtex-quality-gateway-top">
              <span class="softtex-quality-gateway-num">03</span>
              <span class="softtex-quality-gateway-pill">Export Authorization</span>
            </div>
            <h3>Final AQL Inspection Gateway</h3>
            <span class="softtex-quality-gateway-subtitle">Statistical Random Sampling &amp; Container Release</span>
            <ul class="softtex-quality-checklist">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                <span>Statistically valid random sampling according to ANSI/ASQ Z1.4 / ISO 2859-1 Level II.</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                <span>100% carton drop safety test, barcode readability, and moisture-barrier silica placement.</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                <span>Conveyorized 9-point needle detection certification ensuring zero foreign metal particles.</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                <span>Comprehensive digital QA dossier with high-resolution defect logs sent prior to BL issuance.</span>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>

  {{-- PHYSICAL & CHEMICAL LABORATORY BENCHMARKS --}}
  <section class="softtex-editorial-section softtex-editorial-alt">
    <div class="softtex-editorial-wrap">
      <div class="softtex-editorial-heading">
        <p class="softtex-editorial-eyebrow">Testing Protocols</p>
        <h2>Physical &amp; Chemical Laboratory Benchmarks</h2>
        <p style="max-width: 680px; color: var(--editorial-muted); margin: 8px 0 0;">
          All fabrics and trims are verified through certified third-party testing partners (SGS, Intertek, Bureau Veritas).
        </p>
      </div>

      <div class="softtex-quality-tests-grid">
        <div class="softtex-quality-test-card">
          <span class="softtex-quality-test-meta">ISO 6330 / AATCC 135</span>
          <h4>Dimensional Stability &amp; Shrinkage</h4>
          <p>Monitored across 5 wash &amp; tumble dry cycles to ensure knit &amp; woven garments retain exact buyer fit specifications.</p>
        </div>
        <div class="softtex-quality-test-card">
          <span class="softtex-quality-test-meta">ISO 105-C06 / AATCC 8</span>
          <h4>Color Fastness to Washing &amp; Crocking</h4>
          <p>Tested against perspiration, wet/dry rubbing, and detergent exposure, maintaining a minimum Grade 4.0 on the grey scale.</p>
        </div>
        <div class="softtex-quality-test-card">
          <span class="softtex-quality-test-meta">ISO 13936 / ASTM D5034</span>
          <h4>Seam Strength &amp; Tensile Pull Force</h4>
          <p>Laboratory tensile testing verifying high-stress armhole, crotch, and waistband seams withstand required pull forces.</p>
        </div>
        <div class="softtex-quality-test-card">
          <span class="softtex-quality-test-meta">ISO 12945-2 / Martindale</span>
          <h4>Pilling &amp; Abrasion Resistance</h4>
          <p>Evaluated under 2,000 to 5,000 surface friction cycles to ensure premium knitwear maintains a fresh, pill-free face.</p>
        </div>
      </div>
    </div>
  </section>

  {{-- FACTORY QUALITY PHOTO SHOWCASE --}}
  <section class="softtex-editorial-section">
    <div class="softtex-editorial-wrap">
      <div class="softtex-editorial-heading">
        <p class="softtex-editorial-eyebrow">On-Site Execution</p>
        <h2>Factory Floor Inspection &amp; Calibration</h2>
        <p style="max-width: 640px; color: var(--editorial-muted); margin: 8px 0 0;">
          Real images from our audited partner facilities in Dhaka and Gazipur industrial manufacturing zones.
        </p>
      </div>

      <div class="softtex-quality-gallery-grid">
        <div class="softtex-quality-gallery-card">
          <div class="softtex-quality-gallery-img">
            <img src="{{ asset('images/collections/quality-assurance-inspection.jpg') }}" alt="Garment Specification &amp; Measurement" loading="lazy">
          </div>
          <div class="softtex-quality-gallery-caption">
            <strong>Garment Specification &amp; Measurement</strong>
            <span>Critical point-to-point measurement audit against approved buyer tech pack.</span>
          </div>
        </div>
        <div class="softtex-quality-gallery-card">
          <div class="softtex-quality-gallery-img">
            <img src="{{ asset('images/factory/sewing-garment.jpg') }}" alt="Modern Lean Production Floor" loading="lazy">
          </div>
          <div class="softtex-quality-gallery-caption">
            <strong>Modern Lean Production Floor</strong>
            <span>Synchronized sewing line with automated workstations and inline QA desks.</span>
          </div>
        </div>
        <div class="softtex-quality-gallery-card">
          <div class="softtex-quality-gallery-img">
            <img src="{{ asset('images/collections/product-development-sampling.jpg') }}" alt="Fabric Swatch &amp; Shade Matching" loading="lazy">
          </div>
          <div class="softtex-quality-gallery-caption">
            <strong>Fabric Swatch &amp; Shade Matching</strong>
            <span>D65 lightbox evaluation ensuring absolute color harmony across dye lots.</span>
          </div>
        </div>
      </div>

      {{-- AQL 1.5 SAMPLING PROTOCOL BOX --}}
      <div class="softtex-quality-aql-box">
        <h4>AQL 1.5 / 2.5 Sampling Acceptance Protocol</h4>
        <p>
          We operate under ANSI/ASQ Z1.4 / ISO 2859-1 Level II Normal Sampling protocols. For instance, for an order
          lot of 10,000 pieces, our certified QA team draws a statistically randomized sample of 200 garments. If
          Major defects exceed 7 pieces or Minor defects exceed 10 pieces, the entire lot is automatically
          rejected, 100% re-screened, and corrected at the factory's expense before any re-audit. Zero critical
          defects (broken needle points, sharp edges, unfunctional fasteners) are ever permitted.
        </p>
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          <span class="softtex-quality-gateway-pill">Critical: 0 Allowed</span>
          <span class="softtex-quality-gateway-pill">Major: AQL 1.5</span>
          <span class="softtex-quality-gateway-pill">Minor: AQL 2.5</span>
          <span class="softtex-quality-gateway-pill">ISO 2859-1 Compliant</span>
        </div>
      </div>
    </div>
  </section>

  {{-- CALL TO ACTION --}}
  <section class="softtex-editorial-cta">
    <div class="softtex-editorial-wrap">
      <div>
        <p class="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">Quality Governance</p>
        <h2>Require a Custom Quality Audit Protocol for Your Brand?</h2>
        <p>Share your brand's QA manual or technical specifications with our engineering team for full alignment.</p>
      </div>
      <a class="softtex-editorial-button" href="{{ route('contact') }}">
        Request Quality Dossier
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </a>
    </div>
  </section>
</div>
@endsection
