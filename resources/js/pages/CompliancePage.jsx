import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assetUrl } from '../utils/asset';

const standards = [
  ['ACCORD', 'Building, fire and electrical safety programme for garment factories in Bangladesh.', 'images/certificatelogos/accord-logo.png'],
  ['BSCI', 'Social compliance programme for working conditions in supply chains.', 'images/certificatelogos/bsci-logo.png'],
  ['OEKO-TEX 100', 'Textile testing and certification for harmful substances.', 'images/certificatelogos/cit-logo.png'],
  ['C-TPAT', 'Customs programme focused on supply-chain security.', 'images/certificatelogos/ctpat.jpg'],
  ['GOTS', 'Standard for organic fibres and responsible processing.', 'images/certificatelogos/gots-log.png'],
  ['OCS', 'Verifies organic material content in products.', 'images/certificatelogos/ocs-logo.jpg'],
  ['RCS', 'Tracks recycled material through the supply chain.', 'images/certificatelogos/rcs-logo.jpg'],
  ['SEDEX SMETA', 'Platform for sharing ethical sourcing and responsible business data.', 'images/certificatelogos/sedex-logo.png'],
  ['SGS', 'Independent inspection, verification, testing and certification.', 'images/certificatelogos/sgs-logo.png'],
  ['WRAP', 'Certifies lawful, humane and ethical manufacturing.', 'images/certificatelogos/wrap-logo.png'],
];

export default function CompliancePage() {
  return (
    <div className="softtex-editorial-page">
      <header className="softtex-page-hero">
        <div className="container">
          <p className="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">Sustainability &amp; compliance</p>
          <h1>Responsible sourcing through informed partnerships.</h1>
          <p>Our manufacturing partners work with recognised social, environmental, safety and product standards.</p>
        </div>
      </header>

      <section className="softtex-editorial-section">
        <div className="softtex-editorial-wrap">
          <div className="softtex-editorial-standard-grid">
            {standards.map(([name, description, logo]) => (
              <article key={name} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', flexShrink: 0, padding: '4px', background: '#fff', border: '1px solid var(--editorial-line)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={assetUrl(logo)} alt={name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} loading="lazy" />
                </div>
                <div>
                  <h2 style={{ fontSize: '18px', margin: '0 0 6px' }}>{name}</h2>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--editorial-muted)' }}>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="softtex-editorial-section softtex-editorial-alt">
        <div className="softtex-editorial-wrap">
          <div className="softtex-editorial-heading">
            <p className="softtex-editorial-eyebrow">Responsible sourcing</p>
            <h2>How we work with our partners</h2>
          </div>
          <div className="softtex-editorial-principles">
            <article><h3>Approved factories</h3><p>We work with manufacturing partners and review relevant buyer requirements before an order is placed.</p></article>
            <article><h3>Fair trade</h3><p>We value transparent communication, professional conduct and long-term business relationships.</p></article>
            <article><h3>Quality focus</h3><p>Production follow-up and inspections help keep order execution aligned with approved specifications.</p></article>
          </div>
        </div>
      </section>

      <section className="softtex-editorial-cta">
        <div className="softtex-editorial-wrap">
          <div>
            <p className="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">Let&apos;s work together</p>
            <h2>Planning your next collection?</h2>
            <p>Tell us about your styles, quantities and target market, and receive a tailored sourcing response.</p>
          </div>
          <Link className="softtex-editorial-button" to="/contact">Request a sourcing quote <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
