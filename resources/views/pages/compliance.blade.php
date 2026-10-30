@extends('layouts.app')

@section('content')
<section class="ph">
  <div class="w">
    <h1>Sustainability and compliance</h1>
    <p>Our assigned manufacturers are approved for these global certifications and standards.</p>
  </div>
</section>

<section class="sec" style="padding-top:40px">
  <div class="w">
    <div class="rl">
      <div style="display:flex; gap:16px; align-items:flex-start;">
        <div style="width:48px; height:48px; flex-shrink:0; padding:4px; background:#fff; border:1px solid var(--bd); border-radius:4px; display:flex; align-items:center; justify-content:center;">
          <img src="{{ asset('images/certificatelogos/accord-logo.png') }}" alt="ACCORD" style="max-width:100%; max-height:100%; object-fit:contain;" loading="lazy">
        </div>
        <div>
          <h3>ACCORD / RSC</h3>
          <p>Building, fire and electrical safety programme for garment factories in Bangladesh.</p>
        </div>
      </div>

      <div style="display:flex; gap:16px; align-items:flex-start;">
        <div style="width:48px; height:48px; flex-shrink:0; padding:4px; background:#fff; border:1px solid var(--bd); border-radius:4px; display:flex; align-items:center; justify-content:center;">
          <img src="{{ asset('images/certificatelogos/bsci-logo.png') }}" alt="BSCI" style="max-width:100%; max-height:100%; object-fit:contain;" loading="lazy">
        </div>
        <div>
          <h3>BSCI</h3>
          <p>Business Social Compliance Initiative, a social audit programme for working conditions in supply chains.</p>
        </div>
      </div>

      <div style="display:flex; gap:16px; align-items:flex-start;">
        <div style="width:48px; height:48px; flex-shrink:0; padding:4px; background:#fff; border:1px solid var(--bd); border-radius:4px; display:flex; align-items:center; justify-content:center;">
          <img src="{{ asset('images/certificatelogos/cit-logo.png') }}" alt="OEKO-TEX" style="max-width:100%; max-height:100%; object-fit:contain;" loading="lazy">
        </div>
        <div>
          <h3>OEKO-TEX 100</h3>
          <p>Testing and certification that textiles are free from harmful substances.</p>
        </div>
      </div>

      <div style="display:flex; gap:16px; align-items:flex-start;">
        <div style="width:48px; height:48px; flex-shrink:0; padding:4px; background:#fff; border:1px solid var(--bd); border-radius:4px; display:flex; align-items:center; justify-content:center;">
          <img src="{{ asset('images/certificatelogos/ctpat.jpg') }}" alt="C-TPAT" style="max-width:100%; max-height:100%; object-fit:contain;" loading="lazy">
        </div>
        <div>
          <h3>C-TPAT</h3>
          <p>Customs-Trade Partnership Against Terrorism, a customs programme for supply chain security.</p>
        </div>
      </div>

      <div style="display:flex; gap:16px; align-items:flex-start;">
        <div style="width:48px; height:48px; flex-shrink:0; padding:4px; background:#fff; border:1px solid var(--bd); border-radius:4px; display:flex; align-items:center; justify-content:center;">
          <img src="{{ asset('images/certificatelogos/gots-log.png') }}" alt="GOTS" style="max-width:100%; max-height:100%; object-fit:contain;" loading="lazy">
        </div>
        <div>
          <h3>GOTS</h3>
          <p>Global Organic Textile Standard for organic fibres and responsible processing.</p>
        </div>
      </div>

      <div style="display:flex; gap:16px; align-items:flex-start;">
        <div style="width:48px; height:48px; flex-shrink:0; padding:4px; background:#fff; border:1px solid var(--bd); border-radius:4px; display:flex; align-items:center; justify-content:center;">
          <img src="{{ asset('images/certificatelogos/ocs-logo.jpg') }}" alt="OCS" style="max-width:100%; max-height:100%; object-fit:contain;" loading="lazy">
        </div>
        <div>
          <h3>OCS</h3>
          <p>Organic Content Standard, which verifies the organic material content of a product.</p>
        </div>
      </div>

      <div style="display:flex; gap:16px; align-items:flex-start;">
        <div style="width:48px; height:48px; flex-shrink:0; padding:4px; background:#fff; border:1px solid var(--bd); border-radius:4px; display:flex; align-items:center; justify-content:center;">
          <img src="{{ asset('images/certificatelogos/rcs-logo.jpg') }}" alt="RCS" style="max-width:100%; max-height:100%; object-fit:contain;" loading="lazy">
        </div>
        <div>
          <h3>RCS</h3>
          <p>Recycled Claim Standard, which tracks recycled material through the supply chain.</p>
        </div>
      </div>

      <div style="display:flex; gap:16px; align-items:flex-start;">
        <div style="width:48px; height:48px; flex-shrink:0; padding:4px; background:#fff; border:1px solid var(--bd); border-radius:4px; display:flex; align-items:center; justify-content:center;">
          <img src="{{ asset('images/certificatelogos/sedex-logo.png') }}" alt="SEDEX" style="max-width:100%; max-height:100%; object-fit:contain;" loading="lazy">
        </div>
        <div>
          <h3>SEDEX SMETA</h3>
          <p>Platform for sharing ethical and responsible sourcing data with buyers.</p>
        </div>
      </div>

      <div style="display:flex; gap:16px; align-items:flex-start;">
        <div style="width:48px; height:48px; flex-shrink:0; padding:4px; background:#fff; border:1px solid var(--bd); border-radius:4px; display:flex; align-items:center; justify-content:center;">
          <img src="{{ asset('images/certificatelogos/sgs-logo.png') }}" alt="SGS" style="max-width:100%; max-height:100%; object-fit:contain;" loading="lazy">
        </div>
        <div>
          <h3>SGS</h3>
          <p>Independent inspection, verification, testing and certification.</p>
        </div>
      </div>

      <div style="display:flex; gap:16px; align-items:flex-start;">
        <div style="width:48px; height:48px; flex-shrink:0; padding:4px; background:#fff; border:1px solid var(--bd); border-radius:4px; display:flex; align-items:center; justify-content:center;">
          <img src="{{ asset('images/certificatelogos/wrap-logo.png') }}" alt="WRAP" style="max-width:100%; max-height:100%; object-fit:contain;" loading="lazy">
        </div>
        <div>
          <h3>WRAP</h3>
          <p>Worldwide Responsible Accredited Production, which certifies lawful, humane and ethical manufacturing.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="sec alt">
  <div class="w">
    <div class="hd" style="margin-bottom:0">
      <div class="ey">Responsible Sourcing</div>
      <h2>How we work with our partners</h2>
    </div>
    <div class="tri">
      <div><h3>Approved factories</h3><p>We source from assigned manufacturing partners, and factory audits help us check that required standards are met.</p></div>
      <div><h3>Fair trade</h3><p>We build long-term relationships through transparency and professionalism, for mutual benefit.</p></div>
      <div><h3>Quality focus</h3><p>Close production follow-up and standard inspections keep every order consistent.</p></div>
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
