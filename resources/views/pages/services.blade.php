@extends('layouts.app')

@section('content')
<section class="ph">
  <div class="w">
    <h1>Our services</h1>
    <p>From the first sample to the final shipment, we manage the work between you and the factory floor.</p>
  </div>
</section>

<section class="sec" style="padding-top:40px">
  <div class="w">
    <div class="rl">
      <div><h3>Product development</h3><p>Turning your design ideas into producible styles.</p></div>
      <div><h3>Supplier sourcing</h3><p>Matching each order with the right approved manufacturer.</p></div>
      <div><h3>Production planning and follow-up</h3><p>Tracking every order against its schedule.</p></div>
      <div><h3>Merchandising</h3><p>One point of contact for samples, costing and approvals.</p></div>
      <div><h3>Supply chain monitoring</h3><p>Visibility across the supply chain, start to finish.</p></div>
      <div><h3>Factory audits</h3><p>Checking that partner factories meet required standards.</p></div>
      <div><h3>Quality assurance</h3><p>Standard inspections before goods leave the factory.</p></div>
    </div>
  </div>
</section>

<section class="sec alt">
  <div class="w">
    <div class="hd" style="margin-bottom:0">
      <div class="ey">Our Process</div>
      <h2>From First Brief to Final Shipment</h2>
    </div>
    <div class="st">
      <div><div class="n">01</div><h3>Understand Your Brief</h3><p>We discuss your product requirements, target market and specifications.</p></div>
      <div><div class="n">02</div><h3>Source the Right Partners</h3><p>We identify and work with suitable factories based on your needs.</p></div>
      <div><div class="n">03</div><h3>Develop &amp; Approve Samples</h3><p>We coordinate sampling, fit, fabric and details until approval.</p></div>
      <div><div class="n">04</div><h3>Monitor Quality &amp; Shipment</h3><p>We follow up production, conduct quality checks and coordinate shipment to your destination.</p></div>
    </div>
  </div>
</section>

<section class="sec" id="quality">
  <div class="w">
    <div class="hd" style="margin-bottom:0">
      <div class="ey">Quality</div>
      <h2>Quality is built into every step.</h2>
      <p>Consistent quality comes from clear specifications, close production follow-up and careful quality oversight.</p>
    </div>
    <div class="tri">
      <div><h3>Quality assurance</h3><p>Strict order follow-up and standard inspections keep every style to the buyer’s requirements.</p></div>
      <div><h3>Lead timing</h3><p>Production planning and follow-up keep orders on time. Lead time depends on the style and quantity.</p></div>
      <div><h3>Fair trade</h3><p>We aim for mutual benefit for buyers and manufacturers, with the best possible value for money.</p></div>
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
