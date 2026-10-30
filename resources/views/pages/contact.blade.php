@extends('layouts.app')

@section('content')
<div class="softtex-contact-page">
  <header class="softtex-page-hero">
    <div class="container">
      <p class="softtex-eyebrow">Talk to our sourcing team</p>
      <h1>Let&apos;s make your next collection.</h1>
      <p>Clear communication, transparent order terms and a dedicated team in Bangladesh.</p>
    </div>
  </header>

  <section class="container softtex-contact-layout" aria-label="Contact information and order terms">
    {{-- Left Column: Direct Desks & UK Marketing Office --}}
    <div class="softtex-contact-card">
      <div class="softtex-contact-card-main">
        <p class="softtex-eyebrow">SOFTTEX FASHIONS WEAR LIMITED</p>
        <h2>Contact our team</h2>
        <p class="softtex-muted">For new enquiries, sampling and production discussions.</p>

        <a class="softtex-contact-method" href="mailto:info@softtexfashions.com">
          <span class="softtex-contact-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </span>
          <span><small>Email</small><strong>info@softtexfashions.com</strong></span>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
        </a>

        <a class="softtex-contact-method" href="tel:+8801904464294">
          <span class="softtex-contact-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </span>
          <span><small>Mobile</small><strong>+880 1904 464294</strong></span>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
        </a>

        <a class="softtex-contact-method" href="tel:01612844020">
          <span class="softtex-contact-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </span>
          <span><small>Telephone</small><strong>01612 844020</strong></span>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
        </a>

        <div class="softtex-contact-method">
          <span class="softtex-contact-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
          </span>
          <span><small>Bangladesh office</small><strong>House # 53/55(3A floor), Road # 20, Nikunja-2, Khilkhet, Dhaka -1229, Bangladesh.</strong></span>
        </div>
      </div>

      {{-- UK Marketing Office Box (Perfect Vertical Alignment) --}}
      <div class="softtex-uk-office">
        <div class="softtex-uk-office-content">
          <p class="softtex-eyebrow">UK MARKETING OFFICE</p>
          <h3>Yusuf <span>&bull; WhatsApp</span></h3>
          <p>Message our WhatsApp desk and ask to speak with Yusuf.</p>
        </div>
        <div class="softtex-uk-office-action">
          <a
            class="softtex-button softtex-button-outline"
            href="https://wa.me/8801904464294?text=Hello%2C%20I%20would%20like%20to%20speak%20with%20Yusuf%20about%20the%20UK%20marketing%20office."
            target="_blank"
            rel="noreferrer"
          >
            Message on WhatsApp
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline; vertical-align:middle; margin-left:4px;"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
          </a>
        </div>
      </div>
    </div>

    {{-- Right Column: Production Process & Commercial Governance (Symmetrical Height) --}}
    <aside class="softtex-contact-note">
      <div class="softtex-contact-note-main">
        <p class="softtex-eyebrow">A straightforward process</p>
        <h2>From tech pack to shipment.</h2>
        <p class="softtex-muted">Share your product brief and target delivery window. Our team will confirm feasibility, pricing and the production schedule before an order is placed.</p>
        <a class="softtex-button softtex-button-primary" href="mailto:info@softtexfashions.com?subject=Apparel%20production%20enquiry">
          Start an enquiry
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline; vertical-align:middle; margin-left:4px;"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
        </a>
      </div>

      <div class="softtex-contact-governance-box">
        <p class="softtex-eyebrow" style="color: var(--editorial-bronze, #8f5825); margin: 0 0 6px;">Commercial Governance</p>
        <p style="margin: 0 0 12px; font-size: 13px; color: var(--editorial-muted, #5a6b7d); line-height: 1.55;">
          Review our minimum order quantities (MOQ 300 pcs), AQL 1.5/2.5 inspection benchmarks, payment structures and export policies on our dedicated
          <a href="{{ route('terms-conditions') }}" style="color: var(--editorial-bronze, #8f5825); font-weight: 600; text-decoration: underline;">
            Terms &amp; Conditions page &rarr;
          </a>
        </p>
        <div class="softtex-contact-meta-row">
          <div class="softtex-contact-meta-item">
            <small>Working Hours</small>
            <strong>Mon &ndash; Sat &bull; 9am &ndash; 7pm GMT+6</strong>
          </div>
          <div class="softtex-contact-meta-item">
            <small>Direct Turnaround</small>
            <strong>Within 24 Business Hours</strong>
          </div>
        </div>
      </div>
    </aside>
  </section>
</div>
@endsection
