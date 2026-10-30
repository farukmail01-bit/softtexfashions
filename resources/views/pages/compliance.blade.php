@extends('layouts.app')

@section('content')
<div class="softtex-editorial-page softtex-compliance-page">
  {{-- HERO SECTION --}}
  <header class="softtex-compliance-hero">
    <div class="softtex-editorial-wrap">
      <p class="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">
        Ethical Manufacturing &amp; Sustainability
      </p>
      <h1>Certified Compliance. Responsible Sourcing. Zero Compromise.</h1>
      <p class="softtex-compliance-hero-lead">
        Softtex Fashions Wear Limited guarantees that every apparel order is coordinated exclusively through
        verified, certified manufacturing partners in Bangladesh. We safeguard your brand reputation with strict
        structural safety, ethical labor protocols, and sustainable environmental stewardship.
      </p>

      {{-- KPI BENCHMARKS --}}
      <div class="softtex-compliance-kpis">
        <div class="softtex-compliance-kpi-card">
          <div class="softtex-compliance-kpi-val">100%</div>
          <div class="softtex-compliance-kpi-title">Safety Audited Facilities</div>
          <p class="softtex-compliance-kpi-desc">Fully inspected and remediated under national &amp; international RSC safety protocols.</p>
        </div>
        <div class="softtex-compliance-kpi-card">
          <div class="softtex-compliance-kpi-val">AQL 1.5/2.5</div>
          <div class="softtex-compliance-kpi-title">Strict Quality Benchmark</div>
          <p class="softtex-compliance-kpi-desc">Comprehensive multi-stage inline and final random inspection gates.</p>
        </div>
        <div class="softtex-compliance-kpi-card">
          <div class="softtex-compliance-kpi-val">0-Tolerance</div>
          <div class="softtex-compliance-kpi-title">Ethical Labor Mandate</div>
          <p class="softtex-compliance-kpi-desc">Zero tolerance for forced, bonded, or underage labor across all partner mills.</p>
        </div>
        <div class="softtex-compliance-kpi-card">
          <div class="softtex-compliance-kpi-val">OEKO / GOTS</div>
          <div class="softtex-compliance-kpi-title">Eco-Certified Chemistry</div>
          <p class="softtex-compliance-kpi-desc">Non-toxic, skin-safe chemistry with full organic and recycled yarn traceability.</p>
        </div>
      </div>
    </div>
  </header>

  {{-- 4 CORE GOVERNANCE PILLARS --}}
  <section class="softtex-editorial-section">
    <div class="softtex-editorial-wrap">
      <div class="softtex-editorial-heading">
        <p class="softtex-editorial-eyebrow">Governance &amp; Responsibility</p>
        <h2>Four Pillars of Our Sustainability Framework</h2>
        <p style="max-width: 640px; color: var(--editorial-muted); margin: 8px 0 0;">
          How we ensure every stitch meets the highest international safety, environmental, and humanitarian benchmarks.
        </p>
      </div>

      <div class="softtex-compliance-pillars-grid">
        <article class="softtex-compliance-pillar-card">
          <div class="softtex-compliance-pillar-header">
            <div class="softtex-compliance-pillar-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
            </div>
            <span class="softtex-compliance-pillar-tag">Structural &amp; Life Safety</span>
          </div>
          <h3>RSC &amp; ACCORD Factory Integrity</h3>
          <p>Engineered structural integrity with active fire sprinkler hydrants, thermal imaging electrical audits, wide emergency egress corridors, and certified remediation verified by the RMG Sustainability Council (RSC).</p>
        </article>

        <article class="softtex-compliance-pillar-card">
          <div class="softtex-compliance-pillar-header">
            <div class="softtex-compliance-pillar-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762"/></svg>
            </div>
            <span class="softtex-compliance-pillar-tag">Ethical Workplace</span>
          </div>
          <h3>Fair Wages &amp; Human Dignity</h3>
          <p>Strict alignment with ILO conventions and global buyer codes of conduct. Transparent digital payroll, living wages, regulated overtime, on-site healthcare clinics, maternity protections, and active worker welfare participation.</p>
        </article>

        <article class="softtex-compliance-pillar-card">
          <div class="softtex-compliance-pillar-header">
            <div class="softtex-compliance-pillar-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            </div>
            <span class="softtex-compliance-pillar-tag">Chemical &amp; Consumer Safety</span>
          </div>
          <h3>OEKO-TEX Standard 100 Chemistry</h3>
          <p>ZDHC MRSL (Zero Discharge of Hazardous Chemicals) compliant wet processing. Every fabric, sewing thread, zipper, and print pigment is certified 100% free from banned azo-dyes, formaldehyde, phthalates, and heavy metals.</p>
        </article>

        <article class="softtex-compliance-pillar-card">
          <div class="softtex-compliance-pillar-header">
            <div class="softtex-compliance-pillar-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
            </div>
            <span class="softtex-compliance-pillar-tag">Circular &amp; Organic Sourcing</span>
          </div>
          <h3>Sustainable Fibers &amp; Chain of Custody</h3>
          <p>End-to-end transaction certificates (TC) for GOTS-certified organic cotton, OCS blends, and GRS/RCS post-consumer recycled polyester yarns, minimizing environmental footprints with responsible water and energy stewardship.</p>
        </article>
      </div>
    </div>
  </section>

  {{-- CERTIFICATION CATALOGUE MATRIX --}}
  <section class="softtex-editorial-section softtex-editorial-alt">
    <div class="softtex-editorial-wrap">
      <div class="softtex-editorial-heading">
        <p class="softtex-editorial-eyebrow">Recognised Certifications</p>
        <h2>International Standards &amp; Factory Accreditations</h2>
        <p style="max-width: 680px; color: var(--editorial-muted); margin: 8px 0 0;">
          Our manufacturing facilities are actively audited and compliant with premier global regulatory bodies.
        </p>
      </div>

      <div class="softtex-compliance-cert-grid">
        {{-- ACCORD --}}
        <article class="softtex-compliance-cert-card">
          <div class="softtex-compliance-cert-logo-box">
            <img src="{{ asset('images/certificatelogos/accord-logo.png') }}" alt="ACCORD" loading="lazy">
          </div>
          <div class="softtex-compliance-cert-body">
            <div class="softtex-compliance-cert-topline">
              <span class="softtex-compliance-cert-type">Life &amp; Building Safety</span>
              <span class="softtex-compliance-cert-scope">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                Safety Audited
              </span>
            </div>
            <h3>ACCORD / RSC</h3>
            <p>National and international binding framework verifying electrical, fire and structural safety across all manufacturing units.</p>
          </div>
        </article>

        {{-- BSCI --}}
        <article class="softtex-compliance-cert-card">
          <div class="softtex-compliance-cert-logo-box">
            <img src="{{ asset('images/certificatelogos/bsci-logo.png') }}" alt="BSCI" loading="lazy">
          </div>
          <div class="softtex-compliance-cert-body">
            <div class="softtex-compliance-cert-topline">
              <span class="softtex-compliance-cert-type">Social Accountability</span>
              <span class="softtex-compliance-cert-scope">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                Socially Certified
              </span>
            </div>
            <h3>BSCI (amfori)</h3>
            <p>Comprehensive supply-chain social audit ensuring fair labor practices, safe working conditions, and occupational health governance.</p>
          </div>
        </article>

        {{-- OEKO-TEX --}}
        <article class="softtex-compliance-cert-card">
          <div class="softtex-compliance-cert-logo-box">
            <img src="{{ asset('images/certificatelogos/cit-logo.png') }}" alt="OEKO-TEX" loading="lazy">
          </div>
          <div class="softtex-compliance-cert-body">
            <div class="softtex-compliance-cert-topline">
              <span class="softtex-compliance-cert-type">Human-Ecological Safety</span>
              <span class="softtex-compliance-cert-scope">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                Non-Toxic Certified
              </span>
            </div>
            <h3>OEKO-TEX Standard 100</h3>
            <p>Independent global testing certifying that fabrics, threads, trims, and prints are tested for over 100 harmful substances and skin-safe.</p>
          </div>
        </article>

        {{-- C-TPAT --}}
        <article class="softtex-compliance-cert-card">
          <div class="softtex-compliance-cert-logo-box">
            <img src="{{ asset('images/certificatelogos/ctpat.jpg') }}" alt="C-TPAT" loading="lazy">
          </div>
          <div class="softtex-compliance-cert-body">
            <div class="softtex-compliance-cert-topline">
              <span class="softtex-compliance-cert-type">Supply Chain Security</span>
              <span class="softtex-compliance-cert-scope">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                Security Verified
              </span>
            </div>
            <h3>C-TPAT</h3>
            <p>Customs-Trade Partnership Against Terrorism security validation protecting cargo transit, container sealing, and port dispatch.</p>
          </div>
        </article>

        {{-- GOTS --}}
        <article class="softtex-compliance-cert-card">
          <div class="softtex-compliance-cert-logo-box">
            <img src="{{ asset('images/certificatelogos/gots-log.png') }}" alt="GOTS" loading="lazy">
          </div>
          <div class="softtex-compliance-cert-body">
            <div class="softtex-compliance-cert-topline">
              <span class="softtex-compliance-cert-type">Organic Ecology</span>
              <span class="softtex-compliance-cert-scope">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                Organic Certified
              </span>
            </div>
            <h3>GOTS</h3>
            <p>World-leading textile processing standard for organic fibers, including ecological and social criteria backed by independent certification.</p>
          </div>
        </article>

        {{-- OCS --}}
        <article class="softtex-compliance-cert-card">
          <div class="softtex-compliance-cert-logo-box">
            <img src="{{ asset('images/certificatelogos/ocs-logo.jpg') }}" alt="OCS" loading="lazy">
          </div>
          <div class="softtex-compliance-cert-body">
            <div class="softtex-compliance-cert-topline">
              <span class="softtex-compliance-cert-type">Fiber Content Claim</span>
              <span class="softtex-compliance-cert-scope">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                Content Verified
              </span>
            </div>
            <h3>OCS (Organic Content)</h3>
            <p>Third-party verification tracking the exact percentage of organic materials from raw farm ginning to finished garments.</p>
          </div>
        </article>

        {{-- RCS --}}
        <article class="softtex-compliance-cert-card">
          <div class="softtex-compliance-cert-logo-box">
            <img src="{{ asset('images/certificatelogos/rcs-logo.jpg') }}" alt="RCS" loading="lazy">
          </div>
          <div class="softtex-compliance-cert-body">
            <div class="softtex-compliance-cert-topline">
              <span class="softtex-compliance-cert-type">Recycled Polymers</span>
              <span class="softtex-compliance-cert-scope">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                Recycled Certified
              </span>
            </div>
            <h3>RCS (Recycled Claim)</h3>
            <p>Chain-of-custody certification tracking post-consumer recycled polymers, polyester, and regenerated yarns in knit &amp; woven wear.</p>
          </div>
        </article>

        {{-- SEDEX --}}
        <article class="softtex-compliance-cert-card">
          <div class="softtex-compliance-cert-logo-box">
            <img src="{{ asset('images/certificatelogos/sedex-logo.png') }}" alt="SEDEX" loading="lazy">
          </div>
          <div class="softtex-compliance-cert-body">
            <div class="softtex-compliance-cert-topline">
              <span class="softtex-compliance-cert-type">Ethical Data Exchange</span>
              <span class="softtex-compliance-cert-scope">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                Ethically Audited
              </span>
            </div>
            <h3>SEDEX SMETA</h3>
            <p>Global 4-pillar audit methodology assessing labor standards, health &amp; safety, environmental management, and business ethics.</p>
          </div>
        </article>

        {{-- SGS --}}
        <article class="softtex-compliance-cert-card">
          <div class="softtex-compliance-cert-logo-box">
            <img src="{{ asset('images/certificatelogos/sgs-logo.png') }}" alt="SGS" loading="lazy">
          </div>
          <div class="softtex-compliance-cert-body">
            <div class="softtex-compliance-cert-topline">
              <span class="softtex-compliance-cert-type">Testing &amp; Verification</span>
              <span class="softtex-compliance-cert-scope">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                Lab Accredited
              </span>
            </div>
            <h3>SGS Inspection</h3>
            <p>Accredited physical and chemical laboratory testing (colorfastness, shrinkage, tensile strength, tear strength, pilling resistance).</p>
          </div>
        </article>

        {{-- WRAP --}}
        <article class="softtex-compliance-cert-card">
          <div class="softtex-compliance-cert-logo-box">
            <img src="{{ asset('images/certificatelogos/wrap-logo.png') }}" alt="WRAP" loading="lazy">
          </div>
          <div class="softtex-compliance-cert-body">
            <div class="softtex-compliance-cert-topline">
              <span class="softtex-compliance-cert-type">Factory Accreditation</span>
              <span class="softtex-compliance-cert-scope">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                Facility Accredited
              </span>
            </div>
            <h3>WRAP</h3>
            <p>Worldwide Responsible Accredited Production certification proving lawful, humane, and ethical workplace compliance.</p>
          </div>
        </article>
      </div>
    </div>
  </section>

  {{-- 4-STEP BUYER DUE DILIGENCE AUDIT ROADMAP --}}
  <section class="softtex-editorial-section">
    <div class="softtex-editorial-wrap">
      <div class="softtex-editorial-heading">
        <p class="softtex-editorial-eyebrow">Quality &amp; Compliance Verification</p>
        <h2>End-to-End Audit &amp; Inspection Protocol</h2>
        <p style="max-width: 640px; color: var(--editorial-muted); margin: 8px 0 0;">
          Transparency at every checkpoint—from pre-production factory selection to final container sealing.
        </p>
      </div>

      <div class="softtex-compliance-flow-grid">
        <div class="softtex-compliance-flow-card">
          <div class="softtex-compliance-flow-num">01</div>
          <h4>Pre-Vetting &amp; License Audit</h4>
          <p>Validating active SEDEX/BSCI/RSC audit scores, building approvals, and trade licenses before initiating sampling.</p>
        </div>
        <div class="softtex-compliance-flow-card">
          <div class="softtex-compliance-flow-num">02</div>
          <h4>Material Safety &amp; Lab-Dip Tests</h4>
          <p>Testing raw greige, certified non-toxic dyes, and accessory endurance in third-party labs prior to bulk knitting or cutting.</p>
        </div>
        <div class="softtex-compliance-flow-card">
          <div class="softtex-compliance-flow-num">03</div>
          <h4>Inline Monitoring &amp; Work Protocols</h4>
          <p>On-site technical and social checks throughout sewing, ironing, and packaging to prevent deviations.</p>
        </div>
        <div class="softtex-compliance-flow-card">
          <div class="softtex-compliance-flow-num">04</div>
          <h4>Final Random Inspection (FRI)</h4>
          <p>Strict AQL 1.5/2.5 carton drop, barcode scanning, metal detection, and packaging verification before container dispatch.</p>
        </div>
      </div>
    </div>
  </section>

  {{-- CALL TO ACTION --}}
  <section class="softtex-editorial-cta">
    <div class="softtex-editorial-wrap">
      <div>
        <p class="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">Buyer Due Diligence</p>
        <h2>Require Specific Factory Audit Reports?</h2>
        <p>We provide verified SEDEX, BSCI, OEKO-TEX, and RSC audit documentation upon review of your sourcing inquiry.</p>
      </div>
      <a class="softtex-editorial-button" href="{{ route('contact') }}">
        Request Compliance Dossier
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </a>
    </div>
  </section>
</div>
@endsection
