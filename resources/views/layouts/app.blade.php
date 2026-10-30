<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover">
  <meta name="theme-color" content="#0070f3">

  {{-- 1. AUTOMATED ENTERPRISE SEO META ENGINE --}}
  <title>{{ $meta['title'] ?? 'SOFTTEX FASHIONS WEAR LIMITED | Garments Manufacturer & Buying House' }}</title>
  <meta name="description" content="{{ $meta['description'] ?? '' }}">
  <meta name="keywords" content="{{ $meta['keywords'] ?? '' }}">
  <meta name="author" content="{{ $meta['author'] ?? 'Softtex Fashions Wear Ltd.' }}">
  <meta name="robots" content="{{ $meta['robots'] ?? 'index, follow' }}">
  <link rel="canonical" href="{{ $meta['canonical'] ?? url()->current() }}">

  {{-- Open Graph / Social SEO --}}
  <meta property="og:type" content="{{ $meta['type'] ?? 'website' }}">
  <meta property="og:site_name" content="SOFTTEX FASHIONS WEAR LIMITED">
  <meta property="og:title" content="{{ $meta['title'] ?? '' }}">
  <meta property="og:description" content="{{ $meta['description'] ?? '' }}">
  <meta property="og:url" content="{{ $meta['canonical'] ?? url()->current() }}">
  {{-- Dynamic Branding Assets from MySQL SiteSettings --}}
  @php
    $softtexSettings = \App\Models\SiteSetting::publicSettings();
    if (request()->routeIs('home')) {
      $softtexSettings = array_filter(
        $softtexSettings,
        fn ($key) => !preg_match('/email|phone|mobile|whatsapp/i', (string) $key),
        ARRAY_FILTER_USE_KEY
      );
    }
    $rawFavicon = $softtexSettings['site_favicon'] ?? 'images/softtex-logo.png';
    $siteFaviconUrl = (str_starts_with($rawFavicon, 'http://') || str_starts_with($rawFavicon, 'https://')) ? $rawFavicon : asset($rawFavicon);

    $rawLogo = $softtexSettings['site_logo'] ?? 'images/softtex-logo.png';
    $siteLogoUrl = (str_starts_with($rawLogo, 'http://') || str_starts_with($rawLogo, 'https://')) ? $rawLogo : asset($rawLogo);
  @endphp

  <meta property="og:image" content="{{ $meta['image'] ?? $siteLogoUrl }}">
  <meta property="og:locale" content="en_US">

  {{-- Twitter Card --}}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{{ $meta['title'] ?? '' }}">
  <meta name="twitter:description" content="{{ $meta['description'] ?? '' }}">
  <meta name="twitter:image" content="{{ $meta['image'] ?? $siteLogoUrl }}">

  {{-- 2. SCHEMA.ORG JSON-LD STRUCTURED DATA --}}
  @if(isset($schemaJsonLd))
  <script type="application/ld+json">
  {!! $schemaJsonLd !!}
  </script>
  @endif

  {{-- 3. ASSETS & FAST CSS STYLESHEETS --}}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Newsreader:wght@400;500&display=swap">
  <link rel="icon" type="image/png" href="{{ $siteFaviconUrl }}">

  <script>
    window.__SOFTTEX_BASE_URL__ = "{{ url('/') }}";
    window.__SOFTTEX_SETTINGS__ = {!! json_encode($softtexSettings) !!};
  </script>
  @vite(['resources/css/app.css', 'resources/js/main.jsx'])
  
  {{-- Motion Enhancements --}}
  <style>
    /* Smooth orchestrated micro-interactions */
    .fade-in-up {
      animation: softtexFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    @keyframes softtexFadeUp {
      from { opacity: 0; transform: translateY(18px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .hover-lift {
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
    }
    .hover-lift:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 28px rgba(0, 112, 243, 0.12);
    }
    .bg-badge-pill {
      background: rgba(0, 112, 243, 0.08);
      color: #0070f3;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 1px;
      padding: 4px 12px;
      border-radius: 999px;
      display: inline-block;
      text-transform: uppercase;
    }
  </style>
</head>

<body>
  <div id="root">
    <div class="softtex-public-site">
      <div>
        {{-- TOP EDITORIAL ANNOUNCEMENT BAR --}}
        <div class="top softtex-editorial-topbar" role="region" aria-label="Announcement">
          {{-- Desktop Topbar --}}
          <div class="w softtex-topbar-inner softtex-topbar-desktop">
            <span class="softtex-topbar-tagline">100% Export-Oriented Garments Manufacturer &amp; Buying House - Quality Our Commitment</span>
            <div class="softtex-topbar-contact">
              <a href="tel:+8801904464294" class="softtex-topbar-link">&#9742; <span>+880 1904 464294</span></a>
              <span class="softtex-topbar-divider">|</span>
              <a href="tel:01612844020" class="softtex-topbar-link">&#9742; <span>01612 844020</span></a>
              <span class="softtex-topbar-divider">|</span>
              <a href="https://wa.me/8801904464294?text=Hello%20Softtex%20Fashions" target="_blank" rel="noreferrer" class="softtex-topbar-link softtex-topbar-wa">&#9993; <span>WhatsApp Desk</span></a>
            </div>
          </div>

          {{-- Mobile Infinite Marquee Ticker --}}
          <div class="softtex-topbar-mobile-ticker">
            <div class="softtex-ticker-track">
              <div class="softtex-ticker-content">
                <span>100% Export-Oriented Garments Manufacturer &amp; Buying House - Quality Our Commitment</span>
                <span class="ticker-bullet">&middot;</span>
                <a href="tel:+8801904464294" class="ticker-link">&#9742; <span>+880 1904 464294</span></a>
                <span class="ticker-bullet">&middot;</span>
                <a href="tel:01612844020" class="ticker-link">&#9742; <span>01612 844020</span></a>
                <span class="ticker-bullet">&middot;</span>
                <a href="https://wa.me/8801904464294?text=Hello%20Softtex%20Fashions" target="_blank" rel="noreferrer" class="ticker-link ticker-wa">&#9993; <span>WhatsApp Desk</span></a>
                <span class="ticker-bullet">&middot;</span>
              </div>
              <div class="softtex-ticker-content" aria-hidden="true">
                <span>100% Export-Oriented Garments Manufacturer &amp; Buying House - Quality Our Commitment</span>
                <span class="ticker-bullet">&middot;</span>
                <a href="tel:+8801904464294" class="ticker-link">&#9742; <span>+880 1904 464294</span></a>
                <span class="ticker-bullet">&middot;</span>
                <a href="tel:01612844020" class="ticker-link">&#9742; <span>01612 844020</span></a>
                <span class="ticker-bullet">&middot;</span>
                <a href="https://wa.me/8801904464294?text=Hello%20Softtex%20Fashions" target="_blank" rel="noreferrer" class="ticker-link ticker-wa">&#9993; <span>WhatsApp Desk</span></a>
                <span class="ticker-bullet">&middot;</span>
              </div>
            </div>
          </div>
        </div>

        {{-- EDITORIAL STICKY HEADER --}}
        <header class="softtex-editorial-header">
          <div class="w softtex-editorial-nav-wrap">
            <a class="logo softtex-editorial-logo" href="{{ route('home') }}">
              <img src="{{ asset('images/softtex-logo.png') }}" alt="SOFTTEX FASHIONS WEAR LIMITED" class="softtex-brand-logo-img">
              <div class="softtex-brand-logo-text">
                <b>SOFTTEX</b>
                <small>FASHIONS WEAR LIMITED</small>
              </div>
            </a>
            <button id="mb" class="softtex-editorial-menu-toggle" aria-label="Open menu" aria-expanded="false">&#9776;</button>
            <nav id="nav" class="softtex-editorial-nav" aria-label="Main">
              <a class="{{ request()->routeIs('home') ? 'on' : '' }}" href="{{ route('home') }}">Home</a>
              <div class="dd">
                <a class="{{ request()->is('about*') ? 'on' : '' }}" href="{{ route('company-profile') }}">About Us &#9662;</a>
                <div class="sub">
                  <a href="{{ route('company-profile') }}">Company Profile</a>
                  <a href="{{ route('vision') }}">Vision &amp; Mission</a>
                  <a href="{{ route('management') }}">Our Management</a>
                  <a href="{{ route('quality') }}">Quality Assurance</a>
                  <a href="{{ route('compliance') }}">Sustainability</a>
                  <a href="{{ route('terms-conditions') }}">Terms &amp; Conditions</a>
                </div>
              </div>
              <a class="{{ request()->routeIs('services') ? 'on' : '' }}" href="{{ route('services') }}">Our Services</a>
              <div class="dd">
                <a class="{{ (request()->is('catalogue*') || request()->is('products*')) ? 'on' : '' }}" href="{{ route('product.client', 'womens') }}">Catalogue &#9662;</a>
                <div class="sub">
                  <a href="{{ route('product.client', 'womens') }}">Women</a>
                  <a href="{{ route('product.client', 'mens') }}">Men</a>
                  <a href="{{ route('product.client', 'kids') }}">Children</a>
                  <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 6px 0;"></div>
                  <a href="{{ asset('pdf/Softtex_Fashions_Wear_Limited_Womens.pdf') }}" download="Softtex_Fashions_Wear_Limited_Womens.pdf" style="font-size: 12px;">Download Women's PDF</a>
                  <a href="{{ asset('pdf/Softtex_Fashions_Wear_Limited_Mens.pdf') }}" download="Softtex_Fashions_Wear_Limited_Mens.pdf" style="font-size: 12px;">Download Men's PDF</a>
                  <a href="{{ asset('pdf/Softtex_Fashions_Wear_Limited_Kids.pdf') }}" download="Softtex_Fashions_Wear_Limited_Kids.pdf" style="font-size: 12px;">Download Kids' PDF</a>
                </div>
              </div>
              <a class="{{ request()->routeIs('compliance') ? 'on' : '' }}" href="{{ route('compliance') }}">Sustainability</a>
              <a class="{{ (request()->is('terms*') || request()->routeIs('terms*')) ? 'on' : '' }}" href="{{ route('terms-conditions') }}">Terms &amp; Conditions</a>
              <a class="{{ request()->routeIs('contact') ? 'on' : '' }}" href="{{ route('contact') }}">Contact</a>
              <a class="btn" href="{{ route('contact') }}">Request a Quote &rarr;</a>
            </nav>
          </div>
        </header>
      </div>

      {{-- MAIN BODY CONTENT (INSTANT SPA ACCELERATED CONTAINER) --}}
      <main id="main-content">
        @yield('content')
      </main>

      {{-- NEW EDITORIAL 4-COLUMN FOOTER --}}
      <footer class="softtex-editorial-footer">
        <div class="w softtex-editorial-footer-grid">
          <div class="softtex-editorial-footer-brand">
            <a class="logo softtex-editorial-logo" href="{{ route('home') }}" style="margin-bottom:14px;">
              <div class="softtex-footer-logo-badge">
                <img src="{{ asset('images/softtex-logo.png') }}" alt="SOFTTEX FASHIONS WEAR LIMITED" class="softtex-brand-logo-img">
              </div>
              <div class="softtex-brand-logo-text">
                <b style="color:#fff;">SOFTTEX</b>
                <small style="color:#9fb0c4;">FASHIONS WEAR LIMITED</small>
              </div>
            </a>
            <p>A 100% export-oriented garments manufacturer and buying house in Bangladesh, working with global fashion brands through reliable sourcing, quality control and professional production coordination.</p>
          </div>
          <div class="softtex-editorial-footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="{{ route('home') }}">Home</a></li>
              <li><a href="{{ route('company-profile') }}">About Us</a></li>
              <li><a href="{{ route('product.client', 'womens') }}">Catalogue</a></li>
              <li><a href="{{ route('services') }}">Our Services</a></li>
              <li><a href="{{ route('compliance') }}">Sustainability</a></li>
              <li><a href="{{ route('terms-conditions') }}">Terms &amp; Conditions</a></li>
              <li><a href="{{ route('contact') }}">Contact</a></li>
            </ul>
          </div>
          <div class="softtex-editorial-footer-column">
            <h4>Apparel Catalogue</h4>
            <ul>
              <li><a href="{{ route('product.client', 'womens') }}">Women Collection</a></li>
              <li><a href="{{ route('product.client', 'mens') }}">Men Collection</a></li>
              <li><a href="{{ route('product.client', 'kids') }}">Children Collection</a></li>
              <li><a href="{{ asset('pdf/Softtex_Fashions_Wear_Limited_Womens.pdf') }}" download="Softtex_Fashions_Wear_Limited_Womens.pdf" style="color:#e5b378;">Women's PDF Catalogue</a></li>
              <li><a href="{{ asset('pdf/Softtex_Fashions_Wear_Limited_Mens.pdf') }}" download="Softtex_Fashions_Wear_Limited_Mens.pdf" style="color:#e5b378;">Men's PDF Catalogue</a></li>
              <li><a href="{{ asset('pdf/Softtex_Fashions_Wear_Limited_Kids.pdf') }}" download="Softtex_Fashions_Wear_Limited_Kids.pdf" style="color:#e5b378;">Kids' PDF Catalogue</a></li>
            </ul>
          </div>
          <div class="softtex-editorial-footer-column">
            <h4>Contact Us</h4>
            <ul>
              <li>House # 53/55(3A floor), Road # 20, Nikunja-2, Khilkhet, Dhaka -1229, Bangladesh.</li>
              <li><a href="{{ route('contact') }}">Contact page</a></li>
            </ul>
          </div>
        </div>
        <div class="fb softtex-editorial-footer-bottom">
          <div class="w" style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:12px; width:100%;">
            <span>© {{ date('Y') }} SOFTTEX FASHIONS WEAR LIMITED. All Rights Reserved.</span>
            <span>Quality Our Commitment</span>
          </div>
        </div>
      </footer>
    </div>
  </div>

  {{-- REACT 19 INTERACTIVE ISLANDS (RFQ MODAL + FLOATING SOURCING DOCK) --}}
  <div id="react-rfq-root"></div>
  <div id="react-floating-dock-root"></div>
  @yield('scripts')
  <script>
    (function() {
      const mb = document.getElementById('mb');
      const nav = document.getElementById('nav');
      if (mb && nav) {
        mb.addEventListener('click', function(e) {
          e.stopPropagation();
          const isOpen = nav.classList.toggle('open');
          mb.setAttribute('aria-expanded', isOpen);
        });
      }

      document.querySelectorAll('.softtex-editorial-nav .dd > a').forEach(function(link) {
        link.addEventListener('click', function(e) {
          if (window.innerWidth <= 1024) {
            e.preventDefault();
            e.stopPropagation();
            const parent = link.closest('.dd');
            if (parent) {
              const isExpanded = parent.classList.toggle('expanded');
              const sub = parent.querySelector('.sub');
              if (sub) {
                if (isExpanded) {
                  sub.classList.add('show-mobile');
                } else {
                  sub.classList.remove('show-mobile');
                }
              }
            }
          }
        });
      });
    })();
  </script>
</body>
</html>
