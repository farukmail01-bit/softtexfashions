@extends('layouts.app')

@php
  $productCategories = [
    [
      'title' => 'Woven Shirts & Tops',
      'category' => 'Woven Wear',
      'image' => 'images/collections/woven-shirts-collection.jpg',
      'url' => url('/catalogue/mens'),
      'count' => '120+ Styles',
      'desc' => 'Poplin, oxford, linen blends & tailored formal/casual shirts.',
    ],
    [
      'title' => 'Knitwear & Polos',
      'category' => 'Knitwear',
      'image' => 'images/collections/knitwear-polos-collection.jpg',
      'url' => url('/catalogue/womens'),
      'count' => '100+ Styles',
      'desc' => '100% combed cotton jersey tees, piqués & fleece hoodies.',
    ],
    [
      'title' => 'Denim & Bottoms',
      'category' => 'Denim & Casuals',
      'image' => 'images/collections/denim-bottoms-collection.jpg',
      'url' => url('/catalogue/mens'),
      'count' => '80+ Styles',
      'desc' => '10-14oz authentic ring denim, stretches & washed chinos.',
    ],
    [
      'title' => 'Jackets & Outerwear',
      'category' => 'Outerwear',
      'image' => 'images/factory/slider-one.b923b4732b89d937bdaf.jpg',
      'url' => url('/catalogue/mens'),
      'count' => '45+ Styles',
      'desc' => 'Technical field jackets, windbreakers & lightweight puffers.',
    ],
    [
      'title' => 'Children & Babywear',
      'category' => 'Kidswear',
      'image' => 'images/collections/children-babywear-collection.jpg',
      'url' => url('/catalogue/kids'),
      'count' => '78+ Styles',
      'desc' => 'Safe, nickel-free, OEKO-TEX certified infant & youth apparel.',
    ],
  ];
@endphp

@section('content')
<section class="ph">
  <div class="w">
    <div class="ey l">About Softtex</div>
    <h1>A local partner. A global perspective.</h1>
    <p>SOFTTEX FASHIONS WEAR LIMITED is a 100% export-oriented garments manufacturer and buying house based in Dhaka, Bangladesh.</p>
  </div>
</section>

<section class="sec">
  <div class="w">
    {{-- Clean Cinematic Sourcing Atelier Banner --}}
    <div class="softtex-editorial-banner-wrap">
      <div class="softtex-editorial-banner-inner">
        <img
          src="{{ asset('images/home-slider/softtex-buying-house-meeting.jpg') }}"
          alt="Softtex Fashions buying house team reviewing garment production briefs and tech packs"
          loading="lazy"
        >
        <div class="softtex-editorial-banner-pill-clean">
          <span class="dot"></span>
          <span>Dhaka Sourcing Headquarters · Merchandising &amp; Execution Operations</span>
        </div>
      </div>
    </div>

    {{-- Who We Are Split Grid --}}
    <div class="softtex-editorial-content-grid" style="align-items:start;">
      <div class="softtex-who-we-are-col-left">
        <div class="ey l">Who We Are</div>
        <h2>Bridging global apparel buyers with verified Bangladesh manufacturers.</h2>

        <p class="softtex-who-lead">
          Softtex Fashions Wear Limited supports international apparel buyers, retailers, and fashion wholesalers with seamless sourcing and manufacturing coordination in Bangladesh.
        </p>
        <p>
          We operate as the dedicated buying bridge between international fashion brands and verified manufacturing facilities. Our stationed merchandising and technical teams follow orders against buyer-approved specifications, ensuring timely fabric lab dips, accurate proto sizing, strict AQL 1.5/2.5 quality control, and dependable shipping schedules.
        </p>
        <p>
          From high-volume commercial basic knits to intricate fashion woven shirts and authentic washed denim, we provide complete supply chain visibility and transparent communication at every stage of production.
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

        <div style="margin-top:28px;">
          <a class="btn" href="{{ route('services') }}">Explore Our Sourcing Services &rarr;</a>
        </div>
      </div>

      {{-- Right Column: Visual Photo Composition with Overlapping Stats Card --}}
      <div class="softtex-who-composition">
        <div class="softtex-who-we-are-card">
          <div class="softtex-who-we-are-img-wrap" style="height:250px;">
            <img
              src="{{ asset('images/collections/product-development-sampling.jpg') }}"
              alt="Textile swatches and pattern development atelier at Softtex Fashions"
              loading="lazy"
              style="height:100%; object-fit:cover;"
            >
            <div class="softtex-who-we-are-badge">
              <span>Apparel Merchandising &amp; Prototyping Atelier · Dhaka, Bangladesh</span>
            </div>
          </div>
        </div>

        {{-- Overlapping Stats Card --}}
        <div class="softtex-who-stat-card">
          <div class="softtex-who-stat-item">
            <strong>1.8M+ Units</strong>
            <span>Monthly Line Capacity</span>
          </div>
          <div class="softtex-who-stat-item">
            <strong>5 - 7 Days</strong>
            <span>Proto Sample Turnaround</span>
          </div>
          <div class="softtex-who-stat-item">
            <strong>AQL 1.5 / 2.5</strong>
            <span>Major / Minor Standard</span>
          </div>
          <div class="softtex-who-stat-item">
            <strong>100% Tested</strong>
            <span>Needle &amp; Metal Detection</span>
          </div>
        </div>

        {{-- Secondary Factory Production Card (Fills height and completes the story) --}}
        <div class="softtex-who-secondary-card">
          <div class="softtex-who-secondary-img-wrap">
            <img
              src="{{ asset('images/factory/sewing-garment.jpg') }}"
              alt="Modern export garment factory sewing line"
              loading="lazy"
            >
            <div class="softtex-who-secondary-badge">
              <span>Certified Apparel Manufacturing Facilities · Ashulia &amp; Gazipur</span>
            </div>
          </div>
          <div class="softtex-who-secondary-meta">
            <div class="softtex-who-secondary-pills">
              <span>ACCORD / RSC Certified</span>
              <span>BSCI Audited</span>
              <span>OEKO-TEX Standard</span>
            </div>
            <span class="softtex-who-secondary-caption">230+ Assigned Units</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{{-- Mission & Values Section --}}
<section class="sec alt">
  <div class="w">
    <div class="hd">
      <div class="ey">Our Mission &amp; Values</div>
      <h2>Long-term partnerships built on clear commitments.</h2>
    </div>
    <p class="softtex-editorial-mission">
      We strive for mutual benefit and sustainable growth for our buyer partners and manufacturing facilities, maintaining an uncompromising standard for quality, competitive FOB pricing, and reliable on-time delivery.
    </p>

    <div class="softtex-mission-values-grid">
      <div class="softtex-mission-value-card">
        <div class="softtex-mission-value-card-header">
          <div class="softtex-mission-value-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h4>Uncompromising Quality</h4>
        </div>
        <p>Continuous inline quality monitoring, 4-point raw fabric inspection, and strict AQL Level II audit standards so zero defective garments ship.</p>
      </div>

      <div class="softtex-mission-value-card">
        <div class="softtex-mission-value-card-header">
          <div class="softtex-mission-value-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
          </div>
          <h4>Complete Transparency</h4>
        </div>
        <p>Direct factory matching, clear open-book costing, and authentic compliance accreditation across BSCI, OEKO-TEX, SEDEX, and ACCORD.</p>
      </div>

      <div class="softtex-mission-value-card">
        <div class="softtex-mission-value-card-header">
          <div class="softtex-mission-value-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <h4>Reliable Lead Times</h4>
        </div>
        <p>Disciplined Time &amp; Action (T&amp;A) milestone tracking, prompt proto approvals in 5-7 days, and ocean freight logistics to global ports.</p>
      </div>
    </div>
  </div>
</section>

{{-- Metrics & What We Make Section --}}
<section class="sec">
  <div class="w">
    {{-- Elevated Executive Metrics Bar --}}
    <div class="softtex-profile-metrics-bar">
      <div class="softtex-profile-metric-box">
        <strong>100+</strong>
        <span>Garment Categories</span>
      </div>
      <div class="softtex-profile-metric-box">
        <strong>5+</strong>
        <span>Years Export Excellence</span>
      </div>
      <div class="softtex-profile-metric-box">
        <strong>230+</strong>
        <span>Assigned Manufacturing Units</span>
      </div>
      <div class="softtex-profile-metric-box">
        <strong>1.8M+</strong>
        <span>Units Monthly Capacity</span>
      </div>
      <div class="softtex-profile-metric-box">
        <strong>17+</strong>
        <span>Associated Countries</span>
      </div>
    </div>

    {{-- What We Make Header --}}
    <div style="display:flex; justify-content:space-between; align-items:baseline; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
      <div>
        <div class="ey l">Product Portfolio</div>
        <h2 style="font-size:clamp(26px, 3vw, 36px); margin:4px 0 8px;">What We Make</h2>
        <p style="margin:0; font-size:13.5px; color:var(--editorial-muted);">
          Full-spectrum apparel manufacturing across knitwear, woven tailoring, authentic washed denim, and certified babywear.
        </p>
      </div>
      <a href="{{ url('/catalogue/mens') }}" style="font-size:12px; font-weight:650; color:var(--editorial-bronze, #9c6c38);">
        View full catalogue &rarr;
      </a>
    </div>

    {{-- 5-Category Product Grid with Real Photos --}}
    <div class="softtex-profile-products-grid">
      @foreach($productCategories as $cat)
        <a href="{{ $cat['url'] }}" class="softtex-profile-product-card">
          <div class="softtex-profile-product-img-wrap">
            <img src="{{ asset($cat['image']) }}" alt="{{ $cat['title'] }}" loading="lazy">
            <span class="softtex-profile-product-count">{{ $cat['count'] }}</span>
          </div>
          <div class="softtex-profile-product-body">
            <h4>{{ $cat['title'] }}</h4>
            <p>{{ $cat['desc'] }}</p>
            <span class="softtex-profile-product-link">
              Explore styles &rarr;
            </span>
          </div>
        </a>
      @endforeach
    </div>
  </div>
</section>

{{-- CTA Section --}}
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
