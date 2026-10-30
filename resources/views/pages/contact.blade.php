@extends('layouts.app')

@section('content')
@php
    $terms = [
        '50% deposit with order to start production.',
        '50% balance before shipment.',
        'No refund on cancelled orders.',
        'MOQ: 300 pieces per style and per colour (100 pieces per size).',
        'Small orders of 50-100 pieces per style are accepted at a higher price.',
        'The customer must supply a Tech Pack for each style.',
        'Samples are available at cost plus courier charge; sample costs are refunded with a regular order. Future samples are free.',
        'Discounts are available for repeat orders.',
        'Main-order delivery: 20-45 days, subject to order confirmation and production planning.',
        'OEM MOQ: 300 pieces per style.',
        'Discounts are available for fixed annual orders.',
    ];
@endphp
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
    </aside>
  </section>
  <section class="softtex-terms-section" id="terms-conditions">
    <div class="container">
      <div class="softtex-section-heading">
        <p class="softtex-eyebrow">Order information</p>
        <h2>Terms &amp; Conditions</h2>
        <p>Please review these commercial terms before confirming an order.</p>
      </div>
      <ol class="softtex-terms-list">
        @foreach($terms as $term)
          <li><span class="softtex-terms-check" aria-hidden="true">✓</span><span>{{ $term }}</span></li>
        @endforeach
      </ol>
      <p class="softtex-terms-note">Order specifications, final pricing and confirmed delivery dates will be documented in the order confirmation.</p>
    </div>
  </section>
</div>
@endsection
