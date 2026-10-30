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
  <section class="container softtex-contact-layout">
    <div class="softtex-contact-card">
      <p class="softtex-eyebrow">SOFTTEX FASHIONS WEAR LIMITED</p>
      <h2>Contact our team</h2>
      <a class="softtex-contact-method" href="mailto:info@softtexfashions.com"><span><small>Email</small><strong>info@softtexfashions.com</strong></span></a>
      <a class="softtex-contact-method" href="tel:+8801904464294"><span><small>Mobile</small><strong>+880 1904 464294</strong></span></a>
      <a class="softtex-contact-method" href="tel:01612844020"><span><small>Telephone</small><strong>01612 844020</strong></span></a>
      <div class="softtex-contact-method"><span><small>Bangladesh office</small><strong>House # 53/55(3A floor), Road # 20, Nikunja-2, Khilkhet, Dhaka -1229, Bangladesh.</strong></span></div>
      <div class="softtex-uk-office">
        <div><p class="softtex-eyebrow">UK MARKETING OFFICE</p><h3>Yusuf <span>· WhatsApp</span></h3><p>Message our WhatsApp desk and ask to speak with Yusuf.</p></div>
        <a class="softtex-button softtex-button-outline" href="https://wa.me/8801904464294?text=Hello%2C%20I%20would%20like%20to%20speak%20with%20Yusuf%20about%20the%20UK%20marketing%20office." target="_blank" rel="noreferrer">Message on WhatsApp</a>
      </div>
    </div>
    <aside class="softtex-contact-note">
      <p class="softtex-eyebrow">A straightforward process</p>
      <h2>From tech pack to shipment.</h2>
      <p>Share your product brief and target delivery window. Our team will confirm feasibility, pricing and the production schedule before an order is placed.</p>
      <a class="softtex-button softtex-button-primary" href="mailto:info@softtexfashions.com?subject=Apparel%20production%20enquiry">Start an enquiry</a>

      <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid rgba(0,0,0,0.08);">
        <p style="margin: 0 0 6px; font-size: 12px; font-weight: 600; color: var(--editorial-ink, #0b1a2b);">Commercial Governance</p>
        <p style="margin: 0; font-size: 12px; color: var(--editorial-muted, #5a6b7d); line-height: 1.5;">
          Review our minimum order quantities (MOQ), sample approval protocol, payment guidelines and export policies on our dedicated
          <a href="{{ route('terms-conditions') }}" style="color: var(--editorial-bronze, #8f5825); font-weight: 600; text-decoration: underline;">
            Terms &amp; Conditions page &rarr;
          </a>
        </p>
      </div>
    </aside>
  </section>
</div>
@endsection
