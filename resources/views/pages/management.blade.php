@extends('layouts.app')

@php
  $partners = [
    [
      'name' => 'Josna',
      'role' => 'Chairman (Founder)',
      'department' => 'Founding Board',
      'avatar' => 'JS',
      'type' => 'founder',
      'badge' => 'Founder & Board',
      'badgeClass' => 'gold',
      'bio' => 'Providing strategic stewardship, corporate governance, and ethical vision. Ensures Softtex Fashions maintains international compliance benchmarks, worker welfare, and sustainable apparel growth.',
      'highlight' => 'Corporate Governance & Ethical Compliance',
    ],
    [
      'name' => 'Rakib',
      'role' => 'Managing Director (Founder)',
      'department' => 'Executive Leadership',
      'avatar' => 'RK',
      'type' => 'founder',
      'badge' => 'Founder & Executive',
      'badgeClass' => 'gold',
      'bio' => 'Oversees end-to-end executive operations, strategic factory partnerships across Bangladesh, supply chain synchronization, and delivery commitments for global fashion brands.',
      'highlight' => 'Factory Operations & Global Supply Chain',
    ],
    [
      'name' => 'Rana',
      'role' => 'Marketing Director (Head of Marketing)',
      'department' => 'Commercial Leadership',
      'avatar' => 'RN',
      'type' => 'director',
      'badge' => 'Head of Marketing',
      'badgeClass' => 'navy',
      'bio' => 'Leads international buyer acquisition, global apparel market expansion, FOB pricing competitiveness, and strategic relationships with fashion retailers across Europe and North America.',
      'highlight' => 'Global Brand Acquisition & Buyer Relations',
    ],
    [
      'name' => 'Jannatul Ferdous Happy',
      'role' => 'Co-Marketing Director',
      'department' => 'Marketing & Merchandising',
      'avatar' => 'JH',
      'type' => 'director',
      'badge' => 'Marketing Leadership',
      'badgeClass' => 'navy',
      'bio' => 'Coordinates merchandising follow-ups, proto sample development, rapid fit revisions, and cross-functional communication between overseas design teams and factory lines.',
      'highlight' => 'Merchandising Operations & Fast Sampling',
    ],
    [
      'name' => 'Yusuf',
      'role' => 'Business Development Executive',
      'department' => 'Business Growth',
      'avatar' => 'YS',
      'type' => 'executive',
      'badge' => 'Business Development',
      'badgeClass' => 'blue',
      'bio' => 'Drives market research, tech-pack costing analysis, RFQ tenders, and new buyer onboarding across emerging international apparel and retail markets.',
      'highlight' => 'Strategic Sourcing & New Market Growth',
    ],
  ];

  $founders = array_filter($partners, fn($p) => in_array($p['name'], ['Josna', 'Rakib']));
  $executives = array_filter($partners, fn($p) => !in_array($p['name'], ['Josna', 'Rakib']));

  $pillars = [
    [
      'title' => 'Direct Leadership Access',
      'desc' => 'Direct communication with founding directors and senior decision-makers ensures rapid turnaround and zero bureaucratic delays.',
      'svg' => '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    ],
    [
      'title' => 'Certified Factory Compliance',
      'desc' => 'Every partner facility is stringently audited under ACCORD, BSCI, OEKO-TEX, SEDEX, and local environmental standards.',
      'svg' => '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>',
    ],
    [
      'title' => 'Critical-Path T&A Transparency',
      'desc' => 'Proactive time-and-action schedules updated daily, providing complete milestone clarity from proto approval to final shipment.',
      'svg' => '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    ],
    [
      'title' => 'Long-Term Partnership Value',
      'desc' => 'We prioritize sustained buyer loyalty, competitive FOB costing, and strict AQL 1.5/2.5 quality control above short-term gains.',
      'svg' => '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
    ],
  ];
@endphp

@section('content')
<div class="softtex-editorial-page softtex-leadership-page">
  {{-- 1. Page Header --}}
  <section class="ph">
    <div class="w">
      <p class="ey">Leadership &amp; Governance</p>
      <h1>Our Partners &amp; Management</h1>
      <p>The visionary founders and dedicated leadership team steering Softtex Fashions Wear Limited toward sustainable manufacturing and global apparel excellence.</p>
    </div>
  </section>

  {{-- 2. Founders & Board of Directors --}}
  <section class="sec" style="padding-top: 64px; padding-bottom: 48px;">
    <div class="w">
      <div class="hd" style="text-align: center; max-width: 780px; margin: 0 auto 40px;">
        <div class="ey">Founding Board</div>
        <h2>Founders &amp; Executive Board</h2>
        <p>Guiding our manufacturing vision with uncompromising ethical integrity, long-term industry experience, and dedicated commitment to global fashion retail partners.</p>
      </div>

      <div class="softtex-founders-grid">
        @foreach($founders as $partner)
          <article class="softtex-partner-card is-founder">
            <div class="softtex-partner-card-header">
              <div class="softtex-partner-avatar {{ $partner['type'] }}">
                {{ $partner['avatar'] }}
              </div>
              <div>
                <span class="softtex-partner-badge {{ $partner['badgeClass'] }}">
                  {{ $partner['badge'] }}
                </span>
                <h3 class="softtex-partner-name">{{ $partner['name'] }}</h3>
                <p class="softtex-partner-role">{{ $partner['role'] }}</p>
              </div>
            </div>

            <div class="softtex-partner-highlight">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--editorial-bronze, #8f5825)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
              <span>{{ $partner['highlight'] }}</span>
            </div>

            <p class="softtex-partner-bio">{{ $partner['bio'] }}</p>
          </article>
        @endforeach
      </div>
    </div>
  </section>

  {{-- 3. Commercial & Marketing Leadership --}}
  <section class="sec alt" style="padding-top: 60px; padding-bottom: 68px;">
    <div class="w">
      <div class="hd" style="text-align: center; max-width: 780px; margin: 0 auto 40px;">
        <div class="ey">Commercial Leadership</div>
        <h2>Marketing &amp; Business Development</h2>
        <p>Connecting international clothing brands with audited Bangladeshi manufacturing through responsive communication, competitive costing, and technical merchandising follow-up.</p>
      </div>

      <div class="softtex-directors-grid">
        @foreach($executives as $partner)
          <article class="softtex-partner-card">
            <div class="softtex-partner-card-header">
              <div class="softtex-partner-avatar {{ $partner['type'] }}">
                {{ $partner['avatar'] }}
              </div>
              <div>
                <span class="softtex-partner-badge {{ $partner['badgeClass'] }}">
                  {{ $partner['badge'] }}
                </span>
                <h3 class="softtex-partner-name">{{ $partner['name'] }}</h3>
                <p class="softtex-partner-role">{{ $partner['role'] }}</p>
              </div>
            </div>

            <div class="softtex-partner-highlight">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--editorial-bronze, #8f5825)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
              <span>{{ $partner['highlight'] }}</span>
            </div>

            <p class="softtex-partner-bio">{{ $partner['bio'] }}</p>
          </article>
        @endforeach
      </div>
    </div>
  </section>

  {{-- 4. Leadership Commitments & Pillars --}}
  <section class="sec" style="padding-top: 60px; padding-bottom: 68px;">
    <div class="w">
      <div class="hd" style="text-align: center; max-width: 780px; margin: 0 auto;">
        <div class="ey">Management Focus</div>
        <h2>Why Global Brands Trust Our Leadership</h2>
        <p>Our leadership principles guarantee seamless production execution, transparent communication, and uncompromising compliance standards.</p>
      </div>

      <div class="softtex-pillars-grid">
        @foreach($pillars as $pillar)
          <div class="softtex-pillar-item">
            <div style="margin-bottom: 14px; color: var(--editorial-bronze, #8f5825);">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                {!! $pillar['svg'] !!}
              </svg>
            </div>
            <h4>{{ $pillar['title'] }}</h4>
            <p>{{ $pillar['desc'] }}</p>
          </div>
        @endforeach
      </div>
    </div>
  </section>

  {{-- 5. Call To Action --}}
  <section class="cta">
    <div class="w">
      <div>
        <div class="ey l">Direct Contact</div>
        <h2>Connect with Our Leadership Desk</h2>
        <p>Discuss your upcoming season's tech packs, order volumes, or schedule a formal factory audit visit in Bangladesh.</p>
      </div>
      <div style="display: flex; gap: 14px; flex-wrap: wrap;">
        <a class="btn" href="{{ route('contact') }}">Start a Conversation &rarr;</a>
        <a class="btn o" href="{{ route('services') }}">Explore Our Capabilities</a>
      </div>
    </div>
  </section>
</div>
@endsection
