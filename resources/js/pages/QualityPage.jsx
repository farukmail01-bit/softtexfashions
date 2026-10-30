import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { assetUrl } from '../utils/asset';

export default function QualityPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const defaultSections = [
    {
      title: '01. Pre-Production Quality Controls',
      items: [
        '4-Point fabric inspection system (GSM, yarn count, shrinkage, color fastness)',
        'Trims & accessories verification (zipper endurance, button pull strength, elastic tension)',
        'CAD pattern grading, dimensional tolerance review, and proto sample approval'
      ]
    },
    {
      title: '02. In-Line Production Monitoring',
      items: [
        'Precision spreading and laser-guided cutting checks',
        'In-line sewing inspections (SPI, seam strength, tension balance)',
        'Daily wash fastness tests, pressing audits, and dimensional stability checks'
      ]
    },
    {
      title: '03. Pre-Shipment Final Inspection (AQL)',
      items: [
        'Statistically rigorous AQL 1.5 Major / 2.5 Minor inspection per ISO 2859-1 standards',
        'Barcode readability, carton drop safety tests, and moisture-barrier packaging checks',
        'Transparent digital QA audit dossiers delivered to the brand before release'
      ]
    }
  ];

  return (
    <div className="softtex-editorial-page">
      <section className="ph">
        <div className="w">
          <p className="ey">Quality Assurance &amp; Standards</p>
          <h1>Quality Built into Every Step</h1>
          <p>Zero-defect quality commitment: 4-point fabric inspection, in-line audits, and AQL 1.5 / 2.5 final random inspections.</p>
        </div>
      </section>

      <section className="sec">
        <div className="w two" style={{ alignItems: 'start' }}>
          <div>
            <div className="ey l">Quality Management Framework</div>
            <h2>Systematic Quality Control</h2>
            <p style={{ marginTop: '16px' }}>
              Quality encompasses communication, sample development, material testing, and factory floor monitoring. SOFTTEX FASHIONS WEAR LIMITED strictly implements comprehensive quality control at all critical phases of production.
            </p>

            <div className="tc" style={{ marginTop: '24px' }}>
              {defaultSections.map((sec, idx) => (
                <div key={idx}>
                  <h3>{sec.title}</h3>
                  <ul>
                    {sec.items.map((item, iIdx) => (
                      <li key={iIdx}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="qm">
              <div><img src={assetUrl('images/softtex-editorial/q1.jpg')} alt="Quality check of a shirt" loading="lazy" /></div>
              <div><img src={assetUrl('images/softtex-editorial/q2.jpg')} alt="Garment factory floor" loading="lazy" /></div>
              <div><img src={assetUrl('images/softtex-editorial/q3.jpg')} alt="Fabric swatches" loading="lazy" /></div>
            </div>
            <div style={{ marginTop: '24px', padding: '24px', background: 'var(--bg2)', borderLeft: '3px solid var(--bz)' }}>
              <h4 style={{ fontSize: '16px', marginBottom: '8px', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--bz)' }}>
                AQL Inspection Standard
              </h4>
              <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--mut)' }}>
                We strictly follow buyer-specified Acceptable Quality Limits (AQL 1.5 Level II standard for luxury and major retail brands, AQL 2.5 for volume commercial apparel). Zero substandard goods leave our partner facilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="w">
          <div>
            <div className="ey l">Let’s Work Together</div>
            <h2>Planning your next collection?</h2>
            <p>Tell us about your styles, quantities and target market, and receive a tailored sourcing solution.</p>
          </div>
          <Link className="btn" to="/contact">
            Request a Sourcing Quote &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
