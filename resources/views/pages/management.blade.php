@extends('layouts.app')

@section('content')
<section class="ph">
  <div class="w">
    <p class="ey">Executive Leadership</p>
    <h1>Our Management</h1>
    <p>Experienced apparel leadership bridging international buyers and certified manufacturing facilities.</p>
  </div>
</section>

<section class="sec">
  <div class="w two" style="align-items:start">
    <div>
      <div class="ey l">Message from Leadership</div>
      <h2>A letter from our CEO</h2>
      <p style="margin-top:16px;">SOFTTEX FASHIONS WEAR LTD. has been emerging over the years as a trusted sourcing as well as manufacturing partner for global clothing buyers, retailers &amp; brands along with ingenuity, uniqueness, managing supply chain, and well-planned operations.</p>
      <p>SOFTTEX FASHIONS WEAR LTD. has a large network of factories that have been technically and ethically audited to industry standards. We specialize in Knitwear, Sweater, and Woven items. All are composite top-class factories with all modern facilities &amp; internationally certified.</p>
      <p>We have experienced and highly technical management to execute the product exactly as per the buyer’s requirements. Our management concentrates fully on buyer satisfaction. Quality is our main strength — that is why we believe in a long-term relationship.</p>
      <p style="font-weight:600; color:var(--bz); margin-top:24px;">— Muhammad Bashir Uddin<br><small style="color:var(--mut); font-weight:400;">Chief Executive Officer (C.E.O), SOFTTEX FASHIONS WEAR LTD.</small></p>
    </div>
    <div style="display:flex; flex-direction:column; gap:20px;">
      <div style="background:var(--bg2); padding:32px; border-left:3px solid var(--bz); border-radius:6px; box-shadow:0 4px 20px rgba(0,0,0,0.03);">
        <h3 style="font-size:20px; margin-bottom:14px; font-family:Newsreader, Georgia, serif;">Executive Management Focus</h3>
        <ul style="color:var(--mut); line-height:2; padding-left:0; list-style:none;">
          <li>• Direct merchandising oversight for global fashion brands</li>
          <li>• Strict AQL 1.5 / 2.5 quality control at factory level</li>
          <li>• Transparent critical-path scheduling and lead-time monitoring</li>
          <li>• Social compliance &amp; environmental safety audit assurance</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="cta">
  <div class="w">
    <div>
      <div class="ey l">Let’s Work Together</div>
      <h2>Planning your next collection?</h2>
      <p>Tell us about your styles, quantities and target market, and receive a tailored sourcing solution.</p>
    </div>
    <a class="btn" href="{{ route('contact') }}">Request a Sourcing Quote &rarr;</a>
  </div>
</section>
@endsection
