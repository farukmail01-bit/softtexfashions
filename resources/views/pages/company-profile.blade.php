@extends('layouts.app')

@section('content')
<section class="ph">
  <div class="w">
    <h1>A local partner. A global perspective.</h1>
    <p>Softtex Fashions Wear Limited is a 100% export-oriented garments manufacturer and buying house based in Dhaka, Bangladesh.</p>
  </div>
</section>

<section class="sec">
  <div class="w two" style="align-items:start">
    <h2>Who we are</h2>
    <div>
      <p>Softtex Fashions Wear Ltd. has bought and sourced apparel in Bangladesh since 2018. We are the buying bridge between buyers and importers on one side, and manufacturers and exporters of readymade garments on the other.</p>
      <p>We work closely with renowned Bangladeshi garment manufacturers. Every order is followed strictly, with quality assurance, standard inspections and on-time delivery.</p>
      <p>Our global merchandising team serves buyers worldwide for finished apparel, textiles and readymade garment stock lots. Competitive prices, good quality and on-time delivery are our main strength.</p>
    </div>
  </div>
</section>

<section class="sec alt">
  <div class="w">
    <div class="hd">
      <div class="ey">Our Mission</div>
    </div>
    <p class="big">We strive for the greatest possible satisfaction and mutual benefit for our customers and manufacturers, with a constant focus on quality, on-time delivery and the best possible value for money.</p>
  </div>
</section>

<section class="sec">
  <div class="w">
    <div class="kp">
      <div><b>100+</b><span>Garment categories</span></div>
      <div><b>5+</b><span>Years of experience</span></div>
      <div><b>230+</b><span>Assigned manufacturing units</span></div>
      <div><b>17+</b><span>Associated countries</span></div>
    </div>
    <div class="two" style="align-items:start">
      <h2>What we make</h2>
      <p style="margin:0">We manufacture and export baby clothes, kids’ clothes, women’s and men’s clothing, T-shirts, polo shirts, hoodies, sweatshirts, pants, shorts, skirts, dresses, sportswear, school uniforms, sports uniforms, corporate uniforms and custom clothing, in knitwear, denim and woven fabrics.</p>
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
