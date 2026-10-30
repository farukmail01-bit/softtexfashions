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
      @if($category && $category['image_count'] > 0)
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
