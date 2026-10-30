@extends('layouts.app')

@section('content')
<div class="softtex-editorial-page softtex-vision-page">
  <header class="softtex-vision-hero">
    <div class="softtex-editorial-wrap">
      <p class="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">About Softtex</p>
      <h1>Vision and Mission</h1>
      <p class="softtex-vision-hero-lead">The principles that guide how we work with buyers, brands and manufacturing partners worldwide.</p>
    </div>
  </header>

  <section class="softtex-vision-section">
    <div class="softtex-editorial-wrap">
      <article class="softtex-vision-feature">
        <div class="softtex-vision-feature-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
        </div>
        <div class="softtex-vision-feature-copy">
          <p class="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">Our direction</p>
          <h2>Our Vision</h2>
          <p>Our vision is simple but bold: we aspire to maintain the image of the brands and help our customers navigate their own distinct identity, styles and continuous strategic planning for better production.</p>
        </div>
        <div class="softtex-vision-feature-mark" aria-hidden="true">VISION</div>
      </article>

      <div class="softtex-vision-mission-heading">
        <div>
          <p class="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">What guides us</p>
          <h2>Our Mission</h2>
        </div>
        <p>Our commitments shape the way we create value and build lasting working relationships.</p>
      </div>

      <div class="softtex-vision-mission-grid">
        {{-- Card 01: Global Excellence --}}
        <article class="softtex-vision-mission-card">
          <div class="softtex-vision-mission-card-top">
            <span class="softtex-vision-mission-number">01</span>
          </div>
          <p class="softtex-vision-mission-text">To strive hard to be a trading house of world class textile &amp; garments products as well as service while positioning the country in the higher value segment of the international textile market.</p>
          <div class="softtex-vision-mission-watermark" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/>
              <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"/>
              <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"/>
              <circle cx="12" cy="12" r="10"/>
            </svg>
          </div>
        </article>

        {{-- Card 02: Quality Leadership --}}
        <article class="softtex-vision-mission-card">
          <div class="softtex-vision-mission-card-top">
            <span class="softtex-vision-mission-number">02</span>
          </div>
          <p class="softtex-vision-mission-text">Our Relentless endeavor is contributing to enhancing the country’s position as an international provider of quality products.</p>
          <div class="softtex-vision-mission-watermark" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="12" r="6"/>
              <circle cx="12" cy="2" r="0.5"/>
            </svg>
          </div>
        </article>

        {{-- Card 03: Technological Synergy --}}
        <article class="softtex-vision-mission-card">
          <div class="softtex-vision-mission-card-top">
            <span class="softtex-vision-mission-number">03</span>
          </div>
          <p class="softtex-vision-mission-text">To satisfy customers through technology and synergic synchronization of man and machine , tailoring quality products and services to harvest the reward of responsibility.</p>
          <div class="softtex-vision-mission-watermark" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762"/>
            </svg>
          </div>
        </article>

        {{-- Card 04: Social Responsibility --}}
        <article class="softtex-vision-mission-card">
          <div class="softtex-vision-mission-card-top">
            <span class="softtex-vision-mission-number">04</span>
          </div>
          <p class="softtex-vision-mission-text">To Create a better future for the stakeholders, maintaining high standards of integrity, propriety and goodwill in shouldering social responsibilities.</p>
          <div class="softtex-vision-mission-watermark" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
        </article>
      </div>

      <div class="softtex-vision-cta">
        <div>
          <h2>Let's build a better partnership.</h2>
          <p>Share your requirements with our team and start a conversation.</p>
        </div>
        <a class="softtex-editorial-button" href="{{ route('contact') }}">
          Contact our team
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  </section>
</div>
@endsection
