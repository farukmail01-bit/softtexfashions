@extends('layouts.app')

@section('content')
{{-- FULL-BLEED EDITORIAL HERO (100% EDGE-TO-EDGE FULLSCREEN PHOTOGRAPHY) --}}
<section class="softtex-editorial-hero softtex-editorial-hero-fullscreen" style="background-image: url('{{ asset('images/home-slider/linen-fashion-editorial.jpg') }}'); background-size: cover; background-position: center right; position: relative;">
  <div class="softtex-editorial-hero-overlay"></div>
  <div class="w softtex-editorial-hero-inner">
    <div class="softtex-editorial-hero-copy">
      <p class="ey l">SOFTTEX FASHIONS WEAR LIMITED</p>
      <h1>Quality in Every Detail. <em>Made for Global Markets.</em></h1>
      <p class="softtex-editorial-lead">Thoughtful product development, quality assurance and production coordination for international fashion brands.</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:28px;">
        <a class="btn" href="{{ route('services') }}">Explore our capabilities &rarr;</a>
        <a class="btn o" href="{{ route('contact') }}">Start a conversation</a>
      </div>
      <div class="vals">
        <span>Reliable sourcing</span>
        <span>Quality focused</span>
        <span>Long-term partnership</span>
      </div>
    </div>
  </div>
</section>

{{-- CAPABILITIES / SERVICE STRIP --}}
<div class="srv softtex-reveal" id="services">
  <div class="w">
    <div class="softtex-reveal"><svg viewBox="0 0 24 24"><path d="M4 20l1-5L16 4l4 4L9 19z"/></svg>Product<br>Development</div>
    <div class="softtex-reveal"><svg viewBox="0 0 24 24"><circle cx="12" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><path d="M12 8v4M12 12l-6 4M12 12l6 4"/></svg>Sourcing &amp;<br>Merchandising</div>
    <div class="softtex-reveal"><svg viewBox="0 0 24 24"><path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z"/><path d="M9 12l2 2 4-4"/></svg>Quality<br>Assurance</div>
    <div class="softtex-reveal"><svg viewBox="0 0 24 24"><path d="M3 20V10l6 3V10l6 3V6h3v14z"/></svg>Production<br>Follow-up</div>
    <div class="softtex-reveal"><svg viewBox="0 0 24 24"><path d="M3 15l2 5h14l2-5zM6 15V9h9v6M10 9V5h3"/></svg>Export<br>Coordination</div>
  </div>
</div>

{{-- COMPREHENSIVE APPAREL SOLUTIONS (MOCKUP REFERENCE 1) --}}
<section class="sec softtex-reveal" id="solutions">
  <div class="w">
    <div class="hd softtex-reveal">
      <div class="ey">Our Services</div>
      <h2>Comprehensive Apparel Solutions</h2>
      <p>End-to-end supply chain execution from initial tech pack development to compliant factory manufacturing and global export.</p>
    </div>
    <div class="softtex-editorial-solutions-grid">
      <article class="softtex-editorial-solution-card softtex-reveal">
        <div class="softtex-editorial-solution-img-wrap">
          <img src="{{ asset('images/softtex-editorial/ab.jpg') }}" alt="Product Development and Sampling" loading="lazy">
          <span class="softtex-editorial-solution-tag">Design &amp; Lab</span>
        </div>
        <div class="softtex-editorial-solution-body">
          <h3>Product Development &amp; Sampling</h3>
          <p>From design brief to proto samples: pattern grading, fabric sourcing, trim development, and rapid fit revisions in 7-10 days.</p>
          <a class="softtex-editorial-solution-link" href="{{ route('services') }}">Learn more &rarr;</a>
        </div>
      </article>

      <article class="softtex-editorial-solution-card softtex-reveal">
        <div class="softtex-editorial-solution-img-wrap">
          <img src="{{ asset('images/softtex-editorial/f3.jpg') }}" alt="Apparel Sourcing" loading="lazy">
          <span class="softtex-editorial-solution-tag">Sourcing Bridge</span>
        </div>
        <div class="softtex-editorial-solution-body">
          <h3>Apparel Sourcing &amp; Merchandising</h3>
          <p>Direct factory matching across our network of 230+ audited manufacturing facilities in Bangladesh for optimal pricing and capacity.</p>
          <a class="softtex-editorial-solution-link" href="{{ route('services') }}">Learn more &rarr;</a>
        </div>
      </article>

      <article class="softtex-editorial-solution-card softtex-reveal">
        <div class="softtex-editorial-solution-img-wrap">
          <img src="{{ asset('images/softtex-editorial/q1.jpg') }}" alt="Quality Control" loading="lazy">
          <span class="softtex-editorial-solution-tag">Zero Defects</span>
        </div>
        <div class="softtex-editorial-solution-body">
          <h3>Quality Assurance &amp; Inspection</h3>
          <p>Rigorous 3-tier inspection protocol: Pre-production, In-line, and Final Random Inspection per strict AQL 1.5 / 2.5 standards.</p>
          <a class="softtex-editorial-solution-link" href="{{ route('quality') }}">Learn more &rarr;</a>
        </div>
      </article>

      <article class="softtex-editorial-solution-card softtex-reveal">
        <div class="softtex-editorial-solution-img-wrap">
          <img src="{{ asset('images/softtex-editorial/q2.jpg') }}" alt="Merchandising & Production Follow-up" loading="lazy">
          <span class="softtex-editorial-solution-tag">Global Delivery</span>
        </div>
        <div class="softtex-editorial-solution-body">
          <h3>Production Tracking &amp; Export Logistics</h3>
          <p>Proactive T&A scheduling, daily milestone updates, shipping documentation, and reliable global container freight export.</p>
          <a class="softtex-editorial-solution-link" href="{{ route('services') }}">Learn more &rarr;</a>
        </div>
      </article>
    </div>
  </div>
</section>

{{-- VERSATILE COLLECTIONS FOR GLOBAL MARKETS (PHOTOGRAPHIC CATEGORIES) --}}
<section class="sec alt softtex-reveal" id="products">
  <div class="w">
    <div class="hd softtex-reveal">
      <div class="ey">Our Product Range</div>
      <h2>Versatile Collections for Global Markets</h2>
      <p>A comprehensive portfolio of sustainably sourced apparel engineered for durability, exact fit, and international retail compliance.</p>
    </div>
    <div class="softtex-editorial-photo-collections-grid">
      <a class="softtex-editorial-photo-collection-card softtex-reveal" href="{{ route('product.client', 'mens') }}">
        <div class="softtex-editorial-photo-collection-thumb">
          <img src="{{ asset('images/softtex-editorial/f3.jpg') }}" alt="Woven Shirts & Tops" loading="lazy">
          <span class="softtex-editorial-photo-collection-count">120+ Styles</span>
        </div>
        <div class="softtex-editorial-photo-collection-body">
          <span class="softtex-editorial-photo-collection-category">Woven Wear</span>
          <h3 class="softtex-editorial-photo-collection-title">Woven Shirts &amp; Tops &rarr;</h3>
          <p class="softtex-editorial-photo-collection-desc">Poplin, oxford, linen blends &amp; tailored formal/casual shirts.</p>
        </div>
      </a>

      <a class="softtex-editorial-photo-collection-card softtex-reveal" href="{{ route('product.client', 'womens') }}">
        <div class="softtex-editorial-photo-collection-thumb">
          <img src="{{ asset('images/softtex-editorial/f1.jpg') }}" alt="Knitwear & Polos" loading="lazy">
          <span class="softtex-editorial-photo-collection-count">100+ Styles</span>
        </div>
        <div class="softtex-editorial-photo-collection-body">
          <span class="softtex-editorial-photo-collection-category">Knitwear</span>
          <h3 class="softtex-editorial-photo-collection-title">Knitwear &amp; Polos &rarr;</h3>
          <p class="softtex-editorial-photo-collection-desc">100% combed cotton jersey tees, piqués &amp; fleece hoodies.</p>
        </div>
      </a>

      <a class="softtex-editorial-photo-collection-card softtex-reveal" href="{{ route('product.client', 'mens') }}">
        <div class="softtex-editorial-photo-collection-thumb">
          <img src="{{ asset('images/softtex-editorial/f2.jpg') }}" alt="Denim & Bottoms" loading="lazy">
          <span class="softtex-editorial-photo-collection-count">80+ Styles</span>
        </div>
        <div class="softtex-editorial-photo-collection-body">
          <span class="softtex-editorial-photo-collection-category">Denim &amp; Casuals</span>
          <h3 class="softtex-editorial-photo-collection-title">Denim &amp; Bottoms &rarr;</h3>
          <p class="softtex-editorial-photo-collection-desc">10-14oz authentic ring denim, stretches &amp; washed chinos.</p>
        </div>
      </a>

      <a class="softtex-editorial-photo-collection-card softtex-reveal" href="{{ route('product.client', 'mens') }}">
        <div class="softtex-editorial-photo-collection-thumb">
          <img src="{{ asset('images/factory/slider-one.b923b4732b89d937bdaf.jpg') }}" alt="Jackets & Outerwear" loading="lazy">
          <span class="softtex-editorial-photo-collection-count">45+ Styles</span>
        </div>
        <div class="softtex-editorial-photo-collection-body">
          <span class="softtex-editorial-photo-collection-category">Outerwear</span>
          <h3 class="softtex-editorial-photo-collection-title">Jackets &amp; Outerwear &rarr;</h3>
          <p class="softtex-editorial-photo-collection-desc">Technical field jackets, windbreakers &amp; lightweight puffers.</p>
        </div>
      </a>

      <a class="softtex-editorial-photo-collection-card softtex-reveal" href="{{ route('product.client', 'kids') }}">
        <div class="softtex-editorial-photo-collection-thumb">
          <img src="{{ asset('images/kids/1.jpg') }}" alt="Children & Babywear" loading="lazy">
          <span class="softtex-editorial-photo-collection-count">78+ Styles</span>
        </div>
        <div class="softtex-editorial-photo-collection-body">
          <span class="softtex-editorial-photo-collection-category">Kidswear</span>
          <h3 class="softtex-editorial-photo-collection-title">Children &amp; Babywear &rarr;</h3>
          <p class="softtex-editorial-photo-collection-desc">Safe, nickel-free, OEKO-TEX certified infant &amp; youth apparel.</p>
        </div>
      </a>
    </div>
  </div>
</section>

{{-- PROCESS SECTION --}}
<section class="sec softtex-reveal" id="process">
  <div class="w">
    <div class="hd softtex-reveal" style="margin-bottom:0">
      <div class="ey">Our Process</div>
      <h2>From First Brief to Final Shipment</h2>
      <p>A structured, milestone-driven sourcing workflow ensuring complete transparency, cost efficiency, and on-time delivery.</p>
    </div>
    <div class="st">
      <div class="softtex-reveal"><div class="n">01</div><h3>Understand Your Brief</h3><p>We discuss your product requirements, target market, target FOB price, GSM, and fabric specifications.</p></div>
      <div class="softtex-reveal"><div class="n">02</div><h3>Source the Right Partners</h3><p>We match each style with specialized, compliant manufacturing units possessing required certifications.</p></div>
      <div class="softtex-reveal"><div class="n">03</div><h3>Develop &amp; Approve Samples</h3><p>We coordinate proto samples, lab dips, strike-offs, fit adjustments, and size-sets until complete approval.</p></div>
      <div class="softtex-reveal"><div class="n">04</div><h3>Monitor Quality &amp; Shipment</h3><p>We conduct inline audits, pre-shipment AQL 1.5 inspections, and coordinate freight forwarding to destination.</p></div>
    </div>
  </div>
</section>

{{-- OPERATIONAL INTELLIGENCE & SOURCING DOSSIER --}}
<section class="softtex-editorial-dossier-section softtex-reveal" id="capabilities">
  <div class="w">
    <div class="hd" style="margin-bottom:0">
      <div class="ey">Operational Intelligence</div>
      <h2>Manufacturing Capacity &amp; Execution Benchmarks</h2>
      <p>Verifiable manufacturing metrics and standard operating procedures powering dependable supply chains for global brands.</p>
    </div>
    <div class="softtex-editorial-dossier-grid">
      <div class="softtex-editorial-dossier-card softtex-reveal">
        <span class="dossier-subtitle">Production Capacity</span>
        <strong>1.8M+ Units / Month</strong>
        <p>Scalable production capacity across 230+ audited partner units in Dhaka, Gazipur &amp; Narayanganj industrial zones.</p>
      </div>
      <div class="softtex-editorial-dossier-card softtex-reveal">
        <span class="dossier-subtitle">Proto Sampling</span>
        <strong>5 - 7 Working Days</strong>
        <p>Dedicated rapid development atelier for proto patterns, strike-offs, lab dips and size-sets before bulk commitment.</p>
      </div>
      <div class="softtex-editorial-dossier-card softtex-reveal">
        <span class="dossier-subtitle">Quality Benchmark</span>
        <strong>AQL 1.5 / 2.5 Level II</strong>
        <p>Stationed QA inspectors enforce 100% 4-point fabric inspection, inline audits, and final needle detection.</p>
      </div>
      <div class="softtex-editorial-dossier-card softtex-reveal">
        <span class="dossier-subtitle">Global Logistics</span>
        <strong>17+ Export Destinations</strong>
        <p>Direct maritime export via Chittagong Sea Port and expedited air cargo from Hazrat Shahjalal International (DAC).</p>
      </div>
    </div>
  </div>
</section>

{{-- QUALITY SECTION WITH 3-IMAGE COLLAGE --}}
<section class="sec alt softtex-reveal" id="quality">
  <div class="w two">
    <div class="softtex-reveal-left">
      <div class="ey l">Quality &amp; Responsible Sourcing</div>
      <h2>Quality is built into every step.</h2>
      <p>We believe consistent quality comes from clear technical specifications, inline monitoring, and statistically verified inspections. Our on-site QA team enforces AQL 1.5 / 2.5 standards so zero substandard goods leave the factory floor.</p>
      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:14px; margin-bottom:22px;">
        <span style="font-size:11px; font-weight:650; color:var(--bz); border:1px solid var(--bd); padding:4px 9px; background:#fff;">• 4-Point Fabric Inspection</span>
        <span style="font-size:11px; font-weight:650; color:var(--bz); border:1px solid var(--bd); padding:4px 9px; background:#fff;">• AQL 1.5 / 2.5 Level II</span>
        <span style="font-size:11px; font-weight:650; color:var(--bz); border:1px solid var(--bd); padding:4px 9px; background:#fff;">• 100% Needle Detection</span>
      </div>
      <a class="btn" href="{{ route('quality') }}">Learn More About Our Services &rarr;</a>
    </div>
    <div class="qm softtex-reveal-right">
      <div><img src="{{ asset('images/softtex-editorial/q1.jpg') }}" alt="Quality check of a shirt" loading="lazy"></div>
      <div><img src="{{ asset('images/softtex-editorial/q2.jpg') }}" alt="Garment factory floor" loading="lazy"></div>
      <div><img src="{{ asset('images/softtex-editorial/q3.jpg') }}" alt="Fabric swatches" loading="lazy"></div>
    </div>
  </div>
</section>

{{-- ABOUT SECTION --}}
<section class="sec alt softtex-editorial-about-section softtex-reveal" id="about">
  <div class="w">
    <div class="softtex-editorial-about-inner">
      <div class="softtex-editorial-about-img-wrap softtex-reveal-left">
        <img src="{{ asset('images/softtex-editorial/ab.jpg') }}" alt="Fabric swatches on a sourcing table" loading="lazy">
      </div>
      <div class="softtex-editorial-about-content softtex-reveal-right">
        <div class="ey l">About Softtex</div>
        <h2>A local partner. A global perspective.</h2>
        <p>SOFTTEX FASHIONS WEAR LIMITED is a 100% export-oriented garments manufacturer and buying house based in Bangladesh. We work with international fashion brands, retailers and wholesalers to source a wide range of apparel through a reliable network of manufacturers. Our focus is on building long-term relationships through transparency, professionalism and a commitment to your business goals.</p>
        <a class="btn o" href="{{ route('company-profile') }}">More About Us &rarr;</a>
      </div>
    </div>
  </div>
</section>

{{-- TRUST & CERTIFICATIONS --}}
<section class="sec alt" id="trust">
  <div class="w">
    <div class="hd softtex-reveal">
      <div class="ey">Trusted Worldwide</div>
      <h2>Certified Standards, Global Brands</h2>
      <p>Our assigned manufacturing units operate to recognized international compliance benchmarks and supply reputable apparel brands worldwide.</p>
    </div>
    <div class="kp softtex-reveal-scale">
      <div><b>100+</b><span>Garment categories</span></div>
      <div><b>5+</b><span>Years of experience</span></div>
      <div><b>230+</b><span>Assigned manufacturing units</span></div>
      <div><b>17+</b><span>Associated countries</span></div>
    </div>

    {{-- Brand Logos Showcase from public/images/buyer --}}
    @php
      $buyerLogosList = [
        ['name' => 'Guess', 'logo' => 'images/buyer/guess.png', 'url' => route('contact'), 'region' => 'Americas', 'category' => 'Denim & Trendwear', 'desc' => 'Premium washed denim, graphic tees & casual apparel programmes.'],
        ['name' => 'Eddie Bauer', 'logo' => 'images/buyer/eddies-bauer.png', 'url' => route('product.client', 'eddiebauer'), 'region' => 'Americas', 'category' => 'Outerwear & Performance', 'desc' => 'Technical mountain jackets, packable puffers & rugged outdoor knits.'],
        ['name' => 'Forever 21', 'logo' => 'images/buyer/forever-21.jpg', 'url' => route('product.client', 'forever'), 'region' => 'Americas', 'category' => 'Fast Fashion Ladieswear', 'desc' => 'Rapid-turnaround trend tops, dresses & fashion-forward jersey.'],
        ['name' => 'U.S. Polo Assn.', 'logo' => 'images/buyer/us-polo.jpg', 'url' => route('product.client', 'us-polo'), 'region' => 'Americas', 'category' => 'Heritage Polos & Knits', 'desc' => 'Combed cotton double-piqué polos, fleece hoodies & sweat shorts.'],
        ['name' => 'Hard Rock', 'logo' => 'images/buyer/hard-rock.png', 'url' => route('contact'), 'region' => 'Americas', 'category' => 'Merchandise & Heavy Tees', 'desc' => 'Heavyweight organic graphic t-shirts & signature merchandise.'],
        ['name' => 'Head Sportswear', 'logo' => 'images/buyer/head.png', 'url' => route('product.client', 'head'), 'region' => 'Europe', 'category' => 'Athletic Activewear', 'desc' => 'Quick-dry training tees, tennis polo tops & active performance wear.'],
        ['name' => 'Emart', 'logo' => 'images/buyer/emart.png', 'url' => route('product.client', 'emart'), 'region' => 'Asia-Pacific', 'category' => 'Licensed Character Apparel', 'desc' => 'Official Peanuts™ Charlie Brown & Snoopy licensed graphic tees.'],
        ['name' => 'Home Plus', 'logo' => 'images/buyer/home-plus.jpg', 'url' => route('contact'), 'region' => 'Asia-Pacific', 'category' => 'Retail Basics & Loungewear', 'desc' => 'High-volume essential t-shirts, loungewear & family basics.'],
        ['name' => 'Joy Rich', 'logo' => 'images/buyer/joy-rich.jpg', 'url' => route('contact'), 'region' => 'Asia-Pacific', 'category' => 'Creative Streetwear', 'desc' => 'Street fashion knits, typography hoodies & contemporary silhouettes.'],
        ['name' => 'Keith Haring', 'logo' => 'images/buyer/keith-haring.jpg', 'url' => route('product.client', 'keithhering'), 'region' => 'Americas', 'category' => 'Graphic Artwear', 'desc' => 'Licensed Keith Haring pop-art streetwear tees & heavy jersey.'],
        ['name' => 'Rich Cotton', 'logo' => 'images/buyer/rich-cotton.jpg', 'url' => route('product.client', 'rich-cotton'), 'region' => 'Europe', 'category' => 'Sustainable Combed Knits', 'desc' => 'Eco-dyed combed cotton V-necks & signature single-jersey basics.'],
        ['name' => 'Skechers', 'logo' => 'images/buyer/skechers.jpg', 'url' => route('product.client', 'skechers'), 'region' => 'Americas', 'category' => 'Athleisure & Sportswear', 'desc' => 'Ergonomic moisture-wicking tees, sports joggers & performance knits.'],
      ];
    @endphp
    <div class="softtex-editorial-brands-block softtex-reveal">
      <div style="display:flex; justify-content:space-between; align-items:baseline; flex-wrap:wrap; gap:8px; margin-bottom:18px;">
        <div>
          <h3 style="margin-bottom:4px;">Global Brands &amp; Production Portfolios</h3>
          <p style="margin:0; font-size:13px; color:var(--editorial-muted, #72849a);">Trusted manufacturing partner for prestigious fashion retailers worldwide.</p>
        </div>
        <span style="font-size:11.5px; color:var(--editorial-bronze, #9c6c38); font-weight:650; letter-spacing:0.04em;">12 Accredited Brand Portfolios</span>
      </div>

      {{-- Interactive Brand Spotlight Grid --}}
      <div class="softtex-brand-spotlight-grid">
        @foreach($buyerLogosList as $buyer)
          <a class="softtex-brand-spotlight-card softtex-reveal" href="{{ $buyer['url'] }}" title="View {{ $buyer['name'] }} Production Portfolio">
            <div class="softtex-brand-spotlight-card-top">
              <div class="softtex-brand-spotlight-logo-wrap">
                <img src="{{ asset($buyer['logo']) }}" alt="{{ $buyer['name'] }}" loading="lazy">
              </div>
              <span class="softtex-brand-spotlight-region-pill">{{ $buyer['region'] }}</span>
            </div>
            <div class="softtex-brand-spotlight-body">
              <h4>{{ $buyer['name'] }}</h4>
              <span style="display:block; font-size:11px; font-weight:650; color:var(--editorial-bronze, #9c6c38); margin-bottom:4px;">{{ $buyer['category'] }}</span>
              <p>{{ $buyer['desc'] }}</p>
            </div>
            <div class="softtex-brand-spotlight-footer">
              <span>Explore Portfolio</span>
              <span>&rarr;</span>
            </div>
          </a>
        @endforeach
      </div>
    </div>

    {{-- Certification Emblems: Continuous Scrolling Marquee with Enlarged Badges --}}
    @php
      $certBadges = [
        ['name' => 'ACCORD / RSC', 'logo' => 'images/certificatelogos/accord-logo.png', 'desc' => 'Building & Fire Safety'],
        ['name' => 'BSCI', 'logo' => 'images/certificatelogos/bsci-logo.png', 'desc' => 'Social Compliance'],
        ['name' => 'OEKO-TEX 100', 'logo' => 'images/certificatelogos/cit-logo.png', 'desc' => 'Harmful Substance Free'],
        ['name' => 'GOTS', 'logo' => 'images/certificatelogos/gots-log.png', 'desc' => 'Global Organic Textile'],
        ['name' => 'OCS', 'logo' => 'images/certificatelogos/ocs-logo.jpg', 'desc' => 'Organic Content Standard'],
        ['name' => 'RCS', 'logo' => 'images/certificatelogos/rcs-logo.jpg', 'desc' => 'Recycled Claim Standard'],
        ['name' => 'SEDEX SMETA', 'logo' => 'images/certificatelogos/sedex-logo.png', 'desc' => 'Ethical Trade Audits'],
        ['name' => 'WRAP', 'logo' => 'images/certificatelogos/wrap-logo.png', 'desc' => 'Worldwide Responsible'],
        ['name' => 'C-TPAT', 'logo' => 'images/certificatelogos/ctpat.jpg', 'desc' => 'Supply Chain Security'],
        ['name' => 'SGS', 'logo' => 'images/certificatelogos/sgs-logo.png', 'desc' => 'Quality Verification'],
      ];
      $marqueeCertBadges = array_merge($certBadges, $certBadges);
    @endphp
    <div class="softtex-editorial-certs-block softtex-reveal" style="margin-top:48px;">
      <div style="display:flex; justify-content:space-between; align-items:baseline; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
        <div>
          <h3 style="margin-bottom:4px;">International Compliance &amp; Certifications</h3>
          <p style="margin:0; font-size:13px; color:var(--editorial-muted, #72849a);">Assigned facilities meet stringent social, chemical, structural and environmental safety standards.</p>
        </div>
        <span style="font-size:11.5px; color:var(--editorial-muted, #72849a); letter-spacing:0.04em;">Audited &amp; Accredited Partner Facilities</span>
      </div>
      <div class="softtex-editorial-cert-marquee-wrap" aria-label="International compliance and certification partners marquee">
        <div class="softtex-editorial-cert-marquee-track">
          @foreach($marqueeCertBadges as $cert)
            <div class="softtex-editorial-cert-big-card">
              <div class="softtex-editorial-cert-big-card-logo">
                <img src="{{ asset($cert['logo']) }}" alt="{{ $cert['name'] }}" loading="lazy">
              </div>
              <div class="softtex-editorial-cert-big-card-text">
                <strong>{{ $cert['name'] }}</strong>
                <span>{{ $cert['desc'] }}</span>
              </div>
            </div>
          @endforeach
        </div>
      </div>
    </div>
  </div>
</section>

{{-- CTA BANNER --}}
<section class="cta softtex-reveal">
  <div class="w">
    <div>
      <div class="ey l">Let’s Work Together</div>
      <h2>Planning your next collection?</h2>
      <p>Get in touch with our team to discuss your requirements, explore possibilities and receive a tailored sourcing solution.</p>
    </div>
    <a class="btn" href="{{ route('contact') }}">Request a Sourcing Quote &rarr;</a>
  </div>
</section>
@endsection

@section('scripts')
<script>
  document.addEventListener('DOMContentLoaded', function () {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.softtex-reveal, .softtex-reveal-scale, .softtex-reveal-left, .softtex-reveal-right')
        .forEach(function (el) { el.classList.add('is-revealed'); });
      return;
    }
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      document.querySelectorAll('.softtex-reveal, .softtex-reveal-scale, .softtex-reveal-left, .softtex-reveal-right')
        .forEach(function (el) { observer.observe(el); });
    } else {
      document.querySelectorAll('.softtex-reveal, .softtex-reveal-scale, .softtex-reveal-left, .softtex-reveal-right')
        .forEach(function (el) { el.classList.add('is-revealed'); });
    }
  });
</script>
@endsection
