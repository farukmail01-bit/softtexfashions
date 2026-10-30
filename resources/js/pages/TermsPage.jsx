import React from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  Layers,
  FileCheck,
  Clock,
  ShieldCheck,
  Award,
  Scale,
  Globe,
  CheckCircle2,
  ArrowRight,
  Printer,
  FileText,
} from 'lucide-react';

const coreHighlights = [
  {
    title: 'Payment Structure',
    description: '50% advance deposit by T/T or Irrevocable L/C to start production; 50% balance before bill of lading and shipment dispatch.',
    icon: CreditCard,
  },
  {
    title: 'Standard Production MOQ',
    description: '300 pieces per style / colorway (100 pcs per size). Small boutique runs (50-100 pcs) accepted on customized pricing.',
    icon: Layers,
  },
  {
    title: 'Sample Approvals & Tech Pack',
    description: 'Tech Pack required. Samples provided at cost + courier, 100% refunded with bulk order. Subsequent samples free for ongoing buyers.',
    icon: FileCheck,
  },
  {
    title: 'Lead Times & Tracking',
    description: '20-45 business days ex-factory bulk delivery. Dedicated daily Time & Action (T&A) milestones and inspection reporting.',
    icon: Clock,
  },
];

const articles = [
  {
    num: '01',
    title: 'Order Placement & Tech Pack Specifications',
    subtitle: 'Technical Foundation & Sampling',
    items: [
      'The buyer must supply a complete Tech Pack for each style, including graded measurement tables, bill of materials (BOM), artwork/embroidery files, and packaging instructions.',
      'Initial proto samples and salesman samples are developed at nominal cost plus courier fee. 100% of the sample fee is credited against confirmed bulk production orders.',
      'Future seasonal development and proto samples for regular, ongoing fashion brand partners are produced free of charge.',
      'Any design or measurement amendments after purchase order sign-off require mutual written approval.',
    ],
  },
  {
    num: '02',
    title: 'Minimum Order Quantities (MOQ)',
    subtitle: 'Volume Standards & Flexibility',
    items: [
      'Standard OEM bulk manufacturing MOQ is 300 pieces per style and per colorway (broken down into 100 pieces per size).',
      'Small batch and capsule collections of 50-100 pieces per style are accepted at a slightly higher negotiated price to support emerging labels.',
      'Volume tier discounts are automatically applied for high-volume programs exceeding 1,500 pieces per style.',
    ],
  },
  {
    num: '03',
    title: 'Commercial Pricing & Annual Contracts',
    subtitle: 'Currency, FOB & Discounts',
    items: [
      'All commercial quotations are offered on FOB (Free On Board) Chittagong Port or CIF global destination basis in USD or EUR.',
      'Discounts and preferential production slotting are available for repeat orders and scheduled annual capacity reservations.',
      'Quotations include export packaging, garment polybags, master export cartons, and export custom clearances in Bangladesh.',
    ],
  },
  {
    num: '04',
    title: 'Payment Terms & Financial Safeguards',
    subtitle: 'Banking & Remittance Guidelines',
    items: [
      'Production initiates upon receipt of 50% advance deposit via Telegraphic Transfer (T/T) or confirmed Irrevocable Letter of Credit (L/C) at sight.',
      'The remaining 50% balance is payable upon successful final inspection and before bill of lading/freight release.',
      'Strictly no refund on cancelled orders once raw materials (yarn, fabric knitting, weaving, or dyeing) have entered production.',
    ],
  },
  {
    num: '05',
    title: 'Production Lead Times & Critical Path',
    subtitle: 'Delivery Milestones & T&A Tracking',
    items: [
      'Main bulk order delivery requires 20-45 business days, subject to fabric availability, lab dip approvals, and production planning.',
      'A comprehensive Time & Action (T&A) critical-path calendar is shared with the buyer upon order confirmation.',
      'Weekly progress updates including fabric testing, inline audit results, and ex-factory dispatch milestones are actively communicated.',
    ],
  },
  {
    num: '06',
    title: 'Quality Assurance & Inspection Standards',
    subtitle: 'Zero-Defect Commitment',
    items: [
      'Strict 4-Point System fabric inspection is performed on 100% of incoming rolls prior to pattern lay and cutting.',
      'Final Random Inspection (FRI) is conducted strictly per international AQL 1.5 (Major) and AQL 2.5 (Minor) protocols.',
      'Buyers are fully entitled to appoint recognized third-party inspection agencies (SGS, Intertek, Bureau Veritas, QIMA) prior to shipment.',
    ],
  },
  {
    num: '07',
    title: 'Social Compliance & Factory Standards',
    subtitle: 'Ethical & Environmental Integrity',
    items: [
      'All manufacturing partner factories are stringently vetted and certified by ACCORD / RSC, BSCI, SEDEX SMETA, and OEKO-TEX Standard 100.',
      'Zero tolerance for child labor, forced labor, or hazardous working environments.',
      'Ethical wage distribution, building safety, and wastewater treatment compliance are mandatory across all facilities.',
    ],
  },
  {
    num: '08',
    title: 'Governing Law & Dispute Resolution',
    subtitle: 'Legal Jurisdiction & Incoterms',
    items: [
      'Commercial transactions are executed in accordance with ICC Incoterms 2020 international trade rules.',
      'Any commercial claims or discrepancies regarding quality or shortages must be submitted in writing within 15 days of cargo arrival at port.',
      'Contracts are governed and construed under the applicable commercial laws of Bangladesh, with amicable arbitration preferred.',
    ],
  },
];

export default function TermsPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="softtex-editorial-page softtex-terms-page">
      {/* 0. Print-Only Corporate Letterhead */}
      <div className="softtex-terms-print-letterhead softtex-print-only">
        <div className="softtex-terms-print-brand-row">
          <div>
            <div className="softtex-terms-print-company-name">SOFTTEX FASHIONS WEAR LIMITED</div>
            <div className="softtex-terms-print-company-desc">100% Export-Oriented Garments Manufacturer &amp; Sourcing Buying House</div>
            <div className="softtex-terms-print-company-details">
              Corporate Office: House #14, Road #02, Sector #03, Uttara, Dhaka-1230, Bangladesh<br />
              Email: info@softtexfashions.com &bull; Phone: +880 1904 464294 &bull; Web: softtexfashions.com
            </div>
          </div>
          <div className="softtex-terms-print-badge-box">
            <div className="softtex-terms-print-badge-code">DOC ID: STX-TOS-2026/27</div>
            <div className="softtex-terms-print-badge-title">Official Trade Policy</div>
            <div style={{ fontSize: '7pt', color: '#555555', marginTop: '2px' }}>AQL 1.5 / 2.5 Certified</div>
          </div>
        </div>
        <div className="softtex-terms-print-doc-title">
          Commercial Terms &amp; Conditions of Apparel Export
        </div>
      </div>

      {/* 1. Page Header */}
      <section className="ph">
        <div className="w">
          <p className="ey">Commercial Governance &amp; Trade Guidelines</p>
          <h1>Terms &amp; Conditions</h1>
          <p>
            Clear, transparent, and international trade-compliant commercial principles governing apparel manufacturing,
            minimum order quantities, payment structures, quality control, and export logistics at Softtex Fashions Wear Limited.
          </p>

          <div className="softtex-terms-pills">
            <span className="softtex-terms-pill">
              <span className="softtex-terms-pill-dot" /> Incoterms: FOB Chittagong / CIF Global Ports
            </span>
            <span className="softtex-terms-pill">
              <span className="softtex-terms-pill-dot" /> Standard MOQ: 300 Pcs / Style
            </span>
            <span className="softtex-terms-pill">
              <span className="softtex-terms-pill-dot" /> Payment: 50% Advance / 50% Pre-Shipment
            </span>
            <span className="softtex-terms-pill">
              <span className="softtex-terms-pill-dot" /> Quality Protocol: AQL 1.5 / 2.5 FRI
            </span>
          </div>
        </div>
      </section>

      {/* 2. Top Bento Highlights */}
      <section className="sec" style={{ paddingTop: '56px', paddingBottom: '32px' }}>
        <div className="w">
          <div className="hd" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px' }}>
            <div className="ey">Commercial Overview</div>
            <h2>Core Order Commitments at a Glance</h2>
            <p>
              Designed to provide international fashion brands, private labels, and retail buyers with full transparency and zero ambiguity.
            </p>
          </div>

          <div className="softtex-terms-bento">
            {coreHighlights.map((card) => {
              const IconComp = card.icon;
              return (
                <div key={card.title} className="softtex-terms-bento-card">
                  <div className="softtex-terms-bento-icon">
                    <IconComp size={22} />
                  </div>
                  <h4>{card.title}</h4>
                  <p>{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Detailed Articles Grid */}
      <section className="sec alt" style={{ paddingTop: '56px', paddingBottom: '64px' }}>
        <div className="w">
          <div className="hd" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px' }}>
            <div className="ey">Commercial Articles</div>
            <h2>Detailed Terms &amp; Production Policies</h2>
            <p>
              Please review these business policies prior to order confirmation. Final style specifications and order details will be summarized in your confirmed Proforma Invoice (PI).
            </p>
          </div>

          <div className="softtex-terms-articles-grid">
            {articles.map((art) => (
              <article key={art.num} className="softtex-terms-article-card">
                <div className="softtex-terms-article-header">
                  <span className="softtex-terms-article-num">{art.num}</span>
                  <div>
                    <h3 className="softtex-terms-article-title">{art.title}</h3>
                    <p className="softtex-terms-article-subtitle">{art.subtitle}</p>
                  </div>
                </div>

                <ul className="softtex-terms-article-list">
                  {art.items.map((item, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div
            className="softtex-terms-print-banner softtex-screen-only"
            style={{
              marginTop: '40px',
              padding: '24px 28px',
              background: '#ffffff',
              border: '1px solid var(--editorial-line, #e6ded1)',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <h4 style={{ margin: '0 0 4px', fontSize: '16px', color: '#0b1a2b' }}>
                Need a formal signed copy for your compliance department?
              </h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#5a6b7d' }}>
                You can print or save these terms as a reference PDF directly from your browser.
              </p>
            </div>
            <button
              type="button"
              onClick={handlePrint}
              className="softtex-editorial-button softtex-editorial-button-outline"
              style={{ cursor: 'pointer' }}
            >
              <Printer size={15} /> Print / Save as PDF
            </button>
          </div>

          {/* Print-Only Corporate Signature & Endorsement Block */}
          <div className="softtex-terms-print-endorsement softtex-print-only">
            <div className="softtex-terms-print-sign-box">
              <div className="softtex-terms-sign-title">Issued &amp; Certified By:</div>
              <div className="softtex-terms-sign-company">SOFTTEX FASHIONS WEAR LIMITED</div>
              <div className="softtex-terms-sign-placeholder" />
              <div className="softtex-terms-sign-meta">
                <strong>Managing Director / Compliance &amp; Sourcing Lead</strong><br />
                Softtex Fashions Wear Limited &bull; Dhaka, Bangladesh
              </div>
            </div>

            <div className="softtex-terms-print-sign-box">
              <div className="softtex-terms-sign-title">Accepted &amp; Confirmed By Buyer:</div>
              <div className="softtex-terms-sign-company">AUTHORIZED APPAREL BUYER / CLIENT</div>
              <div className="softtex-terms-sign-placeholder" />
              <div className="softtex-terms-sign-meta">
                <strong>Authorized Representative Signature &amp; Company Seal</strong><br />
                Company Name &amp; Date: ________________________________
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="cta softtex-screen-only">
        <div className="w">
          <div>
            <div className="ey l">Ready to Proceed?</div>
            <h2>Start your next apparel production inquiry.</h2>
            <p>
              Share your styles, target quantities, and tech pack requirements with our Dhaka merchandising team for a prompt FOB quotation.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link className="btn" to="/contact">
              Request a Quotation &rarr;
            </Link>
            <Link className="btn o" to="/services">
              Explore Our Capabilities
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
