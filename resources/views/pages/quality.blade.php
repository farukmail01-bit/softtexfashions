@extends('layouts.app')

@section('content')
<section class="ph">
  <div class="w">
    <p class="ey">Quality Assurance &amp; Standards</p>
    <h1>Quality Built into Every Step</h1>
    <p>Zero-defect quality commitment: 4-point fabric inspection, in-line audits, and AQL 1.5 / 2.5 final random inspections.</p>
  </div>
</section>

<section class="sec">
  <div class="w two" style="align-items:start">
    <div>
      <div class="ey l">Quality Management Framework</div>
      <h2>Systematic Quality Control</h2>
      <p style="margin-top:16px;">Quality encompasses communication, sample development, material testing, and factory floor monitoring. SOFTTEX FASHIONS WEAR LIMITED strictly implements comprehensive quality control at all three critical phases of production.</p>
      
      <div class="tc" style="margin-top:24px;">
        <div>
          <h3>01. Pre-Production</h3>
          <ul>
            <li>• 4-Point fabric inspection system (GSM, yarn composition, shrinkage, colour fastness)</li>
            <li>• Trims and accessories verification (zippers, buttons, elastic, sewing thread test)</li>
            <li>• Pattern grading, fit confirmation, and CAD sample validation</li>
          </ul>
        </div>
        <div>
          <h3>02. In-Production</h3>
          <ul>
            <li>• Spreading and precision laser cutting checks</li>
            <li>• In-line sewing checks (SPI, seam slippage, tension, dimensional tolerances)</li>
            <li>• Wash fastness, pressing, and initial finishing audits</li>
          </ul>
        </div>
        <div>
          <h3>03. Final Inspection (AQL)</h3>
          <ul>
            <li>• Standard pre-shipment inspection per ISO 2859-1 (AQL 1.5 / 2.5)</li>
            <li>• Barcode scanning, carton drop testing, and export packaging verification</li>
            <li>• Comprehensive digital QA report delivered to buyer before release</li>
          </ul>
        </div>
      </div>
    </div>
    <div>
      <div class="qm">
        <div><img src="{{ asset('images/softtex-editorial/q1.jpg') }}" alt="Quality check of a shirt" loading="lazy"></div>
        <div><img src="{{ asset('images/softtex-editorial/q2.jpg') }}" alt="Garment factory floor" loading="lazy"></div>
        <div><img src="{{ asset('images/softtex-editorial/q3.jpg') }}" alt="Fabric swatches" loading="lazy"></div>
      </div>
      <div style="margin-top:24px; padding:24px; background:var(--bg2); border-left:3px solid var(--bz);">
        <h4 style="font-size:16px; margin-bottom:8px; font-family:Inter,sans-serif; text-transform:uppercase; letter-spacing:0.1em; color:var(--bz);">AQL Inspection Standard</h4>
        <p style="margin:0; font-size:13.5px; color:var(--mut);">We strictly follow buyer-specified Acceptable Quality Limits (AQL 1.5 Level II standard for luxury and major retail brands, AQL 2.5 for volume commercial apparel). Zero substandard goods leave our partner facilities.</p>
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
