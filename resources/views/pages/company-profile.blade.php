@extends('layouts.app')

@section('content')
<section class="ph">
  <div class="w">
    <h1>A local partner. A global perspective.</h1>
    <p>Softtex Fashions Wear Limited is a 100% export-oriented garments manufacturer and buying house based in Dhaka, Bangladesh.</p>
  </div>
</section>

<section class="sec">
  <div class="w">
    {{-- Editorial Sourcing Atelier Banner --}}
    <div class="softtex-editorial-banner-wrap">
      <div class="softtex-editorial-banner-inner">
        <img
          src="{{ asset('images/home-slider/softtex-buying-house-meeting.jpg') }}"
          alt="Softtex Fashions buying house team reviewing garment production briefs and tech packs"
          loading="lazy"
        >
        <div class="softtex-editorial-banner-overlay">
          <span class="softtex-editorial-banner-pill">Merchandising Operations</span>
          <h3>Reliable apparel execution from concept tech-pack to vessel departure</h3>
        </div>
      </div>
    </div>

    {{-- Who We Are Split Grid --}}
    <div class="softtex-editorial-content-grid">
      <div class="softtex-who-we-are-col-left">
        <p class="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">Who we are</p>
        <h2>Bridging global apparel buyers with verified Bangladesh manufacturers.</h2>
        <div class="softtex-who-we-are-card">
          <div class="softtex-who-we-are-img-wrap">
            <img
              src="{{ asset('images/collections/product-development-sampling.jpg') }}"
              alt="Textile swatches and pattern development atelier at Softtex Fashions"
              loading="lazy"
            >
            <div class="softtex-who-we-are-badge">
              <span>Sourcing &amp; Merchandising Desk · Dhaka, Bangladesh</span>
            </div>
          </div>
          <div class="softtex-who-we-are-meta">
            <span>100% Export Oriented</span>
            <span>230+ Factory Partners</span>
            <span>AQL 1.5 Quality</span>
          </div>
        </div>
      </div>

      <div class="softtex-who-we-are-col-right">
        <p class="softtex-who-lead">
          Softtex Fashions Wear Limited supports apparel buyers with sourcing and manufacturing coordination in Bangladesh. We work between international buyers and garment manufacturers to help move approved product briefs through sampling, production and shipment.
        </p>
        <p>
          Our merchandising and quality teams follow orders against buyer-approved specifications, agreed quality requirements and delivery plans. We focus on clear communication and practical coordination throughout the process.
        </p>
        <p>
          We support global buyers with finished apparel programmes across knitwear, denim and woven categories.
        </p>

        {{-- Structured Highlights --}}
        <div class="softtex-who-highlights">
          <div class="softtex-who-highlight-item">
            <div class="softtex-who-highlight-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <strong>Direct Factory Network</strong>
              <p>Matching each style with 230+ audited partner units in Dhaka, Gazipur &amp; Narayanganj with specialized machinery and compliance certifications.</p>
            </div>
          </div>

          <div class="softtex-who-highlight-item">
            <div class="softtex-who-highlight-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <strong>Rigorous QA Oversight</strong>
              <p>Stationed on-site QA team enforcing 4-point raw fabric inspection, inline stitch monitoring, and 100% metal/needle detection.</p>
            </div>
          </div>

          <div class="softtex-who-highlight-item">
            <div class="softtex-who-highlight-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <strong>Transparent Milestone Tracking</strong>
              <p>Proactive Time &amp; Action (T&amp;A) calendar updates with daily reporting, ensuring complete control over shipment timelines.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="sec alt">
  <div class="w">
    <div class="hd">
      <div class="ey">Our Mission</div>
    </div>
    <p class="big">We strive for the greatest possible satisfaction and mutual benefit for our customers and manufacturers, with a constant focus on quality, on-time delivery and the best possible value for money.</p>
  </div>
</section>

<section class="sec">
  <div class="w">
    <div class="kp">
      <div><b>100+</b><span>Garment categories</span></div>
      <div><b>5+</b><span>Years of experience</span></div>
      <div><b>230+</b><span>Assigned manufacturing units</span></div>
      <div><b>17+</b><span>Associated countries</span></div>
    </div>
    <div class="two" style="align-items:start">
      <h2>What we make</h2>
      <p style="margin:0">We manufacture and export baby clothes, kids’ clothes, women’s and men’s clothing, T-shirts, polo shirts, hoodies, sweatshirts, pants, shorts, skirts, dresses, sportswear, school uniforms, sports uniforms, corporate uniforms and custom clothing, in knitwear, denim and woven fabrics.</p>
    </div>
  </div>
</section>

<section class="cta">
  <div class="w">
    <div>
      <div class="ey l">Let’s Work Together</div>
      <h2>Planning your next collection?</h2>
      <p>Tell us about your styles, quantities and target market, and receive a tailored sourcing solution.</p>
    </div>
    <a class="btn" href="{{ route('contact') }}">Request a Sourcing Quote &rarr;</a>
  </div>
</section>
@endsection
