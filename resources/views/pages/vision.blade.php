@extends('layouts.app')

@section('content')
<section class="ph">
  <div class="w">
    <p class="ey">About Softtex</p>
    <h1>Our Vision &amp; Mission</h1>
    <p>The principles that guide how we work with buyers, brands and manufacturing partners worldwide.</p>
  </div>
</section>

<section class="sec">
  <div class="w two" style="align-items:start">
    <h2>Our Vision</h2>
    <div>
      <p class="big" style="text-align:left; margin:0 0 16px;">Our vision is simple but bold: we aspire to maintain the image of the brands and help our customers navigate their own distinct identity, styles and continuous strategic planning for better production.</p>
    </div>
  </div>
</section>

<section class="sec alt">
  <div class="w">
    <div class="hd" style="margin-bottom:28px">
      <div class="ey">Our Commitments</div>
      <h2>Our Mission</h2>
      <p>Our commitments shape the way we create value and build lasting working relationships.</p>
    </div>
    <div class="st">
      <div>
        <div class="n">01</div>
        <h3>Global Excellence</h3>
        <p>To strive hard to be a trading house of world-class textile &amp; garment products while positioning Bangladesh in the higher-value segment of international markets.</p>
      </div>
      <div>
        <div class="n">02</div>
        <h3>Quality Leadership</h3>
        <p>Our relentless endeavor contributes to enhancing Bangladesh’s reputation as an international provider of premium quality apparel products.</p>
      </div>
      <div>
        <div class="n">03</div>
        <h3>Technological Synergy</h3>
        <p>To satisfy customers through innovation and synchronized production, tailoring quality products and services to harvest the reward of responsibility.</p>
      </div>
      <div>
        <div class="n">04</div>
        <h3>Social Responsibility</h3>
        <p>To create a sustainable future for all stakeholders, maintaining the highest standards of integrity, ethical propriety and mutual trust.</p>
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
