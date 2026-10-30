@extends('layouts.app')

@section('content')
@php
    $catalogues = [
        'womens' => ['title' => 'Women', 'image_count' => 100, 'products' => ['T-shirts and tops', 'Shirts and blouses', 'Dresses and tunics', 'Skirts and trousers', 'Knitwear and sweatshirts', 'Denim and lightweight outerwear']],
        'mens' => ['title' => 'Men', 'image_count' => 120, 'products' => ['T-shirts and polos', 'Shirts and overshirts', 'Hoodies and sweatshirts', 'Trousers and shorts', 'Denim', 'Jackets and outerwear']],
        'kids' => ['title' => 'Children', 'image_count' => 78, 'products' => ['T-shirts and tops', 'Sets and co-ordinates', 'Dresses and skirts', 'Sleepwear and loungewear', 'Babywear', 'School and playwear']],
        'misc' => ['title' => 'Misc', 'image_count' => 0, 'products' => ['Sportswear and activewear', 'Uniforms and workwear', 'Aprons and utility garments', 'Accessories and soft goods', 'Custom-developed styles']],
    ];
    $category = $catalogues[$slug] ?? null;
@endphp
<div class="softtex-catalogue-page">
  <header class="softtex-page-hero softtex-catalogue-hero">
    <div class="container softtex-catalogue-hero-inner{{ $category && $category['image_count'] > 0 ? ' has-download' : '' }}">
      <div class="softtex-catalogue-hero-copy">
        <p class="softtex-eyebrow">Apparel Catalogue / {{ $category['title'] ?? 'Portfolio' }}</p>
        <h1>{{ $category ? $category['title'] . ' Apparel' : $title }}</h1>
        <p>100% Export-Oriented Garments Manufacturer &amp; Buying House - Quality Our Commitment</p>
        <div class="softtex-catalogue-actions">
          <a class="softtex-button softtex-button-primary" href="{{ route('contact') }}">Request a quotation <span aria-hidden="true">→</span></a>
        </div>
      </div>
      @php
        $categoryPdfs = [
          'womens' => ['file' => 'Softtex_Fashions_Wear_Limited_Womens.pdf', 'size' => '1.75 MB', 'name' => 'Women Apparel Catalogue'],
          'mens' => ['file' => 'Softtex_Fashions_Wear_Limited_Mens.pdf', 'size' => '1.48 MB', 'name' => 'Men Apparel Catalogue'],
          'kids' => ['file' => 'Softtex_Fashions_Wear_Limited_Kids.pdf', 'size' => '902 KB', 'name' => 'Children Apparel Catalogue'],
        ];
        $currentPdf = $categoryPdfs[$slug] ?? null;
      @endphp
      @if($currentPdf)
        <div class="softtex-catalogue-hero-download">
          <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
            <a class="softtex-button softtex-button-primary" href="{{ asset('pdf/' . $currentPdf['file']) }}" download="{{ $currentPdf['file'] }}" style="text-decoration:none;">
              <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0 5-5m-5 5-5-5M5 17v4h14v-4" /></svg>
              Download PDF Catalogue
            </a>
            <a class="softtex-button" style="background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.35); text-decoration:none;" href="{{ asset('pdf/' . $currentPdf['file']) }}" target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              View PDF
            </a>
          </div>
          <small style="color:rgba(255,255,255,0.85);">PDF format ({{ $currentPdf['size'] }}) &bull; Ready for offline buyer review &amp; tech packs</small>
        </div>
      @elseif($category && $category['image_count'] > 0)
        <div class="softtex-catalogue-hero-download">
          <button type="button" class="softtex-button softtex-button-primary" onclick="window.print()">
            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 3v12m0 0 5-5m-5 5-5-5M5 17v4h14v-4" /></svg>
            Download PDF Catalogue
          </button>
          <small>Choose “Save as PDF” in the print dialog.</small>
        </div>
      @endif
    </div>
  </header>
  <main class="container softtex-catalogue-main">
    @if($category && $category['image_count'] > 0)
      <div class="softtex-product-gallery-toolbar">
        <p>{{ $category['image_count'] }} styles in the {{ $category['title'] }} collection</p>
      </div>
      <section class="softtex-product-gallery" aria-label="{{ $category['title'] }} product gallery">
        @foreach($galleryItems as $index => $item)
          <article class="softtex-product-gallery-card">
            <div class="softtex-product-gallery-image">
              <img src="{{ asset($item['image_url']) }}" alt="{{ $item['title'] }}" loading="{{ $index < 8 ? 'eager' : 'lazy' }}" decoding="async">
            </div>
            <h2>{{ $item['title'] }}</h2>
          </article>
        @endforeach
      </section>
    @elseif($category)
      <section class="softtex-range-section">
        <div class="softtex-section-heading"><p class="softtex-eyebrow">Explore the range</p><h2>What we can develop</h2></div>
        <div class="softtex-range-grid">
          @foreach($category['products'] as $index => $product)
            <article class="softtex-range-card"><span class="softtex-range-index">{{ sprintf('%02d', $index + 1) }}</span><h3>{{ $product }}</h3><p>Developed to your approved design, materials and quality requirements.</p></article>
          @endforeach
        </div>
      </section>
    @else
      <section class="softtex-portfolio-notice"><h2>Portfolio shared on request</h2><p>To respect buyer confidentiality, product photographs are not displayed here. Contact us with your category and we will respond with relevant information cleared for sharing.</p><a class="softtex-button softtex-button-primary" href="{{ route('contact') }}">Contact Softtex</a></section>
    @endif
    <section style="margin:40px 0 24px; padding:24px 28px; background:linear-gradient(135deg, #0b1a2b 0%, #16314c 100%); border-radius:8px; color:#ffffff; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px; box-shadow:0 8px 24px rgba(11,26,43,0.08);">
      <div>
        <span style="display:inline-block; font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#e5b378; margin-bottom:4px;">Export Catalogues</span>
        <h3 style="margin:0 0 4px; font-size:20px; font-family:Newsreader, Georgia, serif; color:#ffffff;">Download PDF Catalogues</h3>
        <p style="margin:0; font-size:13px; color:#9fb0c4;">Direct access to complete garment styling, technical specifications, and fabric blends.</p>
      </div>
      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <a href="{{ asset('pdf/Softtex_Fashions_Wear_Limited_Womens.pdf') }}" download="Softtex_Fashions_Wear_Limited_Womens.pdf" class="softtex-button" style="text-decoration:none; background:{{ $slug === 'womens' ? '#8f5825' : 'rgba(255,255,255,0.12)' }}; color:#ffffff; border:1px solid rgba(255,255,255,0.25); font-size:12px; padding:10px 14px;">
          <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline; vertical-align:middle; margin-right:4px;"><path d="M12 3v12m0 0 5-5m-5 5-5-5M5 17v4h14v-4" /></svg> Women (1.75 MB)
        </a>
        <a href="{{ asset('pdf/Softtex_Fashions_Wear_Limited_Mens.pdf') }}" download="Softtex_Fashions_Wear_Limited_Mens.pdf" class="softtex-button" style="text-decoration:none; background:{{ $slug === 'mens' ? '#8f5825' : 'rgba(255,255,255,0.12)' }}; color:#ffffff; border:1px solid rgba(255,255,255,0.25); font-size:12px; padding:10px 14px;">
          <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline; vertical-align:middle; margin-right:4px;"><path d="M12 3v12m0 0 5-5m-5 5-5-5M5 17v4h14v-4" /></svg> Men (1.48 MB)
        </a>
        <a href="{{ asset('pdf/Softtex_Fashions_Wear_Limited_Kids.pdf') }}" download="Softtex_Fashions_Wear_Limited_Kids.pdf" class="softtex-button" style="text-decoration:none; background:{{ $slug === 'kids' ? '#8f5825' : 'rgba(255,255,255,0.12)' }}; color:#ffffff; border:1px solid rgba(255,255,255,0.25); font-size:12px; padding:10px 14px;">
          <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline; vertical-align:middle; margin-right:4px;"><path d="M12 3v12m0 0 5-5m-5 5-5-5M5 17v4h14v-4" /></svg> Children (902 KB)
        </a>
      </div>
    </section>

    <nav class="softtex-category-nav" aria-label="Product categories">
      <p class="softtex-eyebrow">Browse other catalogues</p>
      <div>
        <a href="{{ route('product.client', 'womens') }}">Women <span>→</span></a>
        <a href="{{ route('product.client', 'mens') }}">Men <span>→</span></a>
        <a href="{{ route('product.client', 'kids') }}">Children <span>→</span></a>
      </div>
    </nav>
  </main>
  @if($category)
    <div class="catalogue-print-root" aria-hidden="true">
      <h1>SOFTTEX FASHIONS WEAR LIMITED</h1>
      <p>100% Export-Oriented Garments Manufacturer &amp; Buying House - Quality Our Commitment</p>
      <h2>{{ $category['title'] }} Apparel Catalogue</h2>
      @if($category['image_count'] > 0)
        <div class="catalogue-print-grid">
          @foreach($galleryItems as $index => $item)
            <figure class="catalogue-print-product">
              <img src="{{ asset($item['image_url']) }}" alt="{{ $item['title'] }}" loading="{{ $index < 8 ? 'eager' : 'lazy' }}">
              <figcaption>{{ $item['title'] }}</figcaption>
            </figure>
          @endforeach
        </div>
      @endif
      <h3>Product categories</h3>
      <ul>@foreach($category['products'] as $product)<li>{{ $product }}</li>@endforeach</ul>
      <p>For product details and enquiries: info@softtexfashions.com | Mobile: +880 1904 464294 | Tel: 01612 844020</p>
    </div>
  @endif
</div>
@endsection
