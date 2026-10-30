@extends('layouts.app')

@php
  $highlights = [
    [
      'title' => 'Payment Structure',
      'desc' => '50% advance deposit by T/T or Irrevocable L/C to start production; 50% balance before bill of lading and shipment dispatch.',
      'svg' => '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
    ],
    [
      'title' => 'Standard Production MOQ',
      'desc' => '300 pieces per style / colorway (100 pcs per size). Small boutique runs (50-100 pcs) accepted on customized pricing.',
      'svg' => '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    ],
    [
      'title' => 'Sample Approvals & Tech Pack',
      'desc' => 'Tech Pack required. Samples provided at cost + courier, 100% refunded with bulk order. Subsequent samples free for ongoing buyers.',
      'svg' => '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/>',
    ],
    [
      'title' => 'Lead Times & Tracking',
      'desc' => '20-45 business days ex-factory bulk delivery. Dedicated daily Time & Action (T&A) milestones and inspection reporting.',
      'svg' => '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    ],
  ];

  $articles = [
    [
      'num' => '01',
      'title' => 'Order Placement & Tech Pack Specifications',
      'subtitle' => 'Technical Foundation & Sampling',
      'items' => [
        'The buyer must supply a complete Tech Pack for each style, including graded measurement tables, bill of materials (BOM), artwork/embroidery files, and packaging instructions.',
        'Initial proto samples and salesman samples are developed at nominal cost plus courier fee. 100% of the sample fee is credited against confirmed bulk production orders.',
        'Future seasonal development and proto samples for regular, ongoing fashion brand partners are produced free of charge.',
        'Any design or measurement amendments after purchase order sign-off require mutual written approval.',
      ],
    ],
    [
      'num' => '02',
      'title' => 'Minimum Order Quantities (MOQ)',
      'subtitle' => 'Volume Standards & Flexibility',
      'items' => [
        'Standard OEM bulk manufacturing MOQ is 300 pieces per style and per colorway (broken down into 100 pieces per size).',
        'Small batch and capsule collections of 50-100 pieces per style are accepted at a slightly higher negotiated price to support emerging labels.',
        'Volume tier discounts are automatically applied for high-volume programs exceeding 1,500 pieces per style.',
      ],
    ],
    [
      'num' => '03',
      'title' => 'Commercial Pricing & Annual Contracts',
      'subtitle' => 'Currency, FOB & Discounts',
      'items' => [
        'All commercial quotations are offered on FOB (Free On Board) Chittagong Port or CIF global destination basis in USD or EUR.',
        'Discounts and preferential production slotting are available for repeat orders and scheduled annual capacity reservations.',
        'Quotations include export packaging, garment polybags, master export cartons, and export custom clearances in Bangladesh.',
      ],
    ],
    [
      'num' => '04',
      'title' => 'Payment Terms & Financial Safeguards',
      'subtitle' => 'Banking & Remittance Guidelines',
      'items' => [
        'Production initiates upon receipt of 50% advance deposit via Telegraphic Transfer (T/T) or confirmed Irrevocable Letter of Credit (L/C) at sight.',
        'The remaining 50% balance is payable upon successful final inspection and before bill of lading/freight release.',
        'Strictly no refund on cancelled orders once raw materials (yarn, fabric knitting, weaving, or dyeing) have entered production.',
      ],
    ],
    [
      'num' => '05',
      'title' => 'Production Lead Times & Critical Path',
      'subtitle' => 'Delivery Milestones & T&A Tracking',
      'items' => [
        'Main bulk order delivery requires 20-45 business days, subject to fabric availability, lab dip approvals, and production planning.',
        'A comprehensive Time & Action (T&A) critical-path calendar is shared with the buyer upon order confirmation.',
        'Weekly progress updates including fabric testing, inline audit results, and ex-factory dispatch milestones are actively communicated.',
      ],
    ],
    [
      'num' => '06',
      'title' => 'Quality Assurance & Inspection Standards',
      'subtitle' => 'Zero-Defect Commitment',
      'items' => [
        'Strict 4-Point System fabric inspection is performed on 100% of incoming rolls prior to pattern lay and cutting.',
        'Final Random Inspection (FRI) is conducted strictly per international AQL 1.5 (Major) and AQL 2.5 (Minor) protocols.',
        'Buyers are fully entitled to appoint recognized third-party inspection agencies (SGS, Intertek, Bureau Veritas, QIMA) prior to shipment.',
      ],
    ],
    [
      'num' => '07',
      'title' => 'Social Compliance & Factory Standards',
      'subtitle' => 'Ethical & Environmental Integrity',
      'items' => [
        'All manufacturing partner factories are stringently vetted and certified by ACCORD / RSC, BSCI, SEDEX SMETA, and OEKO-TEX Standard 100.',
        'Zero tolerance for child labor, forced labor, or hazardous working environments.',
        'Ethical wage distribution, building safety, and wastewater treatment compliance are mandatory across all facilities.',
      ],
    ],
    [
      'num' => '08',
      'title' => 'Governing Law & Dispute Resolution',
      'subtitle' => 'Legal Jurisdiction & Incoterms',
      'items' => [
        'Commercial transactions are executed in accordance with ICC Incoterms 2020 international trade rules.',
        'Any commercial claims or discrepancies regarding quality or shortages must be submitted in writing within 15 days of cargo arrival at port.',
        'Contracts are governed and construed under the applicable commercial laws of Bangladesh, with amicable arbitration preferred.',
      ],
    ],
  ];
@endphp

@section('content')
<div class="softtex-editorial-page softtex-terms-page">
  {{-- 1. Page Header --}}
  <section class="ph">
    <div class="w">
      <p class="ey">Commercial Governance &amp; Trade Guidelines</p>
      <h1>Terms &amp; Conditions</h1>
      <p>Clear, transparent, and international trade-compliant commercial principles governing apparel manufacturing, minimum order quantities, payment structures, quality control, and export logistics at Softtex Fashions Wear Limited.</p>

      <div class="softtex-terms-pills">
        <span class="softtex-terms-pill">
          <span class="softtex-terms-pill-dot"></span> Incoterms: FOB Chittagong / CIF Global Ports
        </span>
        <span class="softtex-terms-pill">
          <span class="softtex-terms-pill-dot"></span> Standard MOQ: 300 Pcs / Style
        </span>
        <span class="softtex-terms-pill">
          <span class="softtex-terms-pill-dot"></span> Payment: 50% Advance / 50% Pre-Shipment
        </span>
        <span class="softtex-terms-pill">
          <span class="softtex-terms-pill-dot"></span> Quality Protocol: AQL 1.5 / 2.5 FRI
        </span>
      </div>
    </div>
  </section>

  {{-- 2. Top Bento Highlights --}}
  <section class="sec" style="padding-top: 56px; padding-bottom: 32px;">
    <div class="w">
      <div class="hd" style="text-align: center; max-width: 780px; margin: 0 auto 36px;">
        <div class="ey">Commercial Overview</div>
        <h2>Core Order Commitments at a Glance</h2>
        <p>Designed to provide international fashion brands, private labels, and retail buyers with full transparency and zero ambiguity.</p>
      </div>

      <div class="softtex-terms-bento">
        @foreach($highlights as $card)
          <div class="softtex-terms-bento-card">
            <div class="softtex-terms-bento-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                {!! $card['svg'] !!}
              </svg>
            </div>
            <h4>{{ $card['title'] }}</h4>
            <p>{{ $card['desc'] }}</p>
          </div>
        @endforeach
      </div>
    </div>
  </section>

  {{-- 3. Detailed Articles Grid --}}
  <section class="sec alt" style="padding-top: 56px; padding-bottom: 64px;">
    <div class="w">
      <div class="hd" style="text-align: center; max-width: 780px; margin: 0 auto 36px;">
        <div class="ey">Commercial Articles</div>
        <h2>Detailed Terms &amp; Production Policies</h2>
        <p>Please review these business policies prior to order confirmation. Final style specifications and order details will be summarized in your confirmed Proforma Invoice (PI).</p>
      </div>

      <div class="softtex-terms-articles-grid">
        @foreach($articles as $art)
          <article class="softtex-terms-article-card">
            <div class="softtex-terms-article-header">
              <span class="softtex-terms-article-num">{{ $art['num'] }}</span>
              <div>
                <h3 class="softtex-terms-article-title">{{ $art['title'] }}</h3>
                <p class="softtex-terms-article-subtitle">{{ $art['subtitle'] }}</p>
              </div>
            </div>

            <ul class="softtex-terms-article-list">
              @foreach($art['items'] as $item)
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
                  </svg>
                  <span>{{ $item }}</span>
                </li>
              @endforeach
            </ul>
          </article>
        @endforeach
      </div>

      <div style="margin-top: 40px; padding: 24px 28px; background: #ffffff; border: 1px solid var(--editorial-line, #e6ded1); border-radius: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div>
          <h4 style="margin: 0 0 4px; fontSize: 16px; color: #0b1a2b;">Need a formal signed copy for your compliance department?</h4>
          <p style="margin: 0; fontSize: 13px; color: #5a6b7d;">You can print or save these terms as a reference PDF directly from your browser.</p>
        </div>
        <button type="button" onclick="window.print()" class="softtex-editorial-button softtex-editorial-button-outline" style="cursor: pointer;">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline; vertical-align:middle; margin-right:4px;">
            <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/>
          </svg>
          Print / Save as PDF
        </button>
      </div>
    </div>
  </section>

  {{-- 4. CTA --}}
  <section class="cta">
    <div class="w">
      <div>
        <div class="ey l">Ready to Proceed?</div>
        <h2>Start your next apparel production inquiry.</h2>
        <p>Share your styles, target quantities, and tech pack requirements with our Dhaka merchandising team for a prompt FOB quotation.</p>
      </div>
      <div style="display: flex; gap: 14px; flex-wrap: wrap;">
        <a class="btn" href="{{ route('contact') }}">Request a Quotation &rarr;</a>
        <a class="btn o" href="{{ route('services') }}">Explore Our Capabilities</a>
      </div>
    </div>
  </section>
</div>
@endsection
