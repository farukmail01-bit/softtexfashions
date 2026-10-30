import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Zap,
  Check,
  Sparkles,
  HelpCircle,
  FileCheck2,
  Calculator,
} from 'lucide-react';
import { assetUrl } from '../utils/asset';

const startupKpis = [
  {
    val: '500 - 1,000 Pcs',
    title: 'Flexible Low MOQs',
    desc: 'Break the standard 3,000-piece factory threshold with dedicated small-batch lines per style and colorway.',
  },
  {
    val: '5 - 7 Days',
    title: 'Rapid Prototyping',
    desc: 'Express proto samples, CAD pattern grading, and Pantone lab dip strike-offs delivered quickly.',
  },
  {
    val: 'AQL 1.5 / 2.5',
    title: 'Zero-Defect Standard',
    desc: 'Same rigorous inspection standard used by tier-1 global retailers, with certified roving floor QA.',
  },
  {
    val: '100% Open-Book',
    title: 'Direct Factory Costing',
    desc: 'Transparent factory-gate pricing with complete bill of materials (BOM) breakdown and zero broker markups.',
  },
];

const startupPillars = [
  {
    id: 'product-development-sampling',
    tag: 'Design & Lab',
    metric: '5-7 Day Proto',
    title: 'Product Development & Sampling',
    image: 'images/collections/product-development-sampling.jpg',
    intro:
      'From design brief to proto samples: pattern grading, fabric sourcing, trim development, and rapid fit revisions in 5-7 days.',
    features: [
      {
        title: 'Concept to Tech-Pack',
        desc: 'We convert design sketches, mood boards, or physical reference garments into factory-ready technical specifications.',
      },
      {
        title: 'Master Pattern Grading',
        desc: 'International size grade rules (US, UK, EU, JP) with shrinkage compensation calculations.',
      },
      {
        title: 'Fabric & Trims Sourcing',
        desc: 'Combed cotton jersey, French terry, fleece, linen, organic cotton (GOTS), custom branded woven labels, and tags.',
      },
      {
        title: 'Rapid Fit Revisions',
        desc: 'Quick turnaround on proto samples, fit approvals, and pre-production (PP) samples sent directly to your studio.',
      },
    ],
    ctaText: 'Start Sample Development',
    ctaLink: '/contact',
  },
  {
    id: 'apparel-sourcing-merchandising',
    tag: 'Sourcing Bridge',
    metric: '230+ Factory Network',
    title: 'Apparel Sourcing & Merchandising',
    image: 'images/collections/woven-shirts-collection.jpg',
    intro:
      'Direct factory matching across our network of 230+ audited manufacturing facilities in Bangladesh for optimal FOB pricing and capacity.',
    features: [
      {
        title: 'Small-Batch Line Allocation',
        desc: 'Pre-screened partner factories equipped with agile production cells that welcome 500-1,000 unit runs.',
      },
      {
        title: 'Transparent Open-Book Costing',
        desc: 'Clear breakdown of yarn, knitting/weaving, dyeing, cut & make (CM), and trims with zero hidden fees.',
      },
      {
        title: 'Dedicated Merchandiser (SPOC)',
        desc: 'A single fluent English-speaking apparel engineer assigned to shepherd your orders from day one.',
      },
      {
        title: 'Ethically Certified Facilities',
        desc: 'Partner plants verified by BSCI, Sedex SMETA, RSC (Accord), and OEKO-TEX Standard 100.',
      },
    ],
    ctaText: 'Inquire Factory Capacity',
    ctaLink: '/contact',
  },
  {
    id: 'quality-assurance-inspection',
    tag: 'Zero Defects',
    metric: 'AQL 1.5 Protocol',
    title: 'Quality Assurance & Inspection',
    image: 'images/collections/quality-assurance-inspection.jpg',
    intro:
      'Rigorous 3-tier inspection protocol: Pre-production, In-line, and Final Random Inspection per strict AQL 1.5 / 2.5 standards.',
    features: [
      {
        title: 'Tier 1: Pre-Production Fabric Screening',
        desc: '4-point ASTM D5430 fabric roll inspection, GSM verification, shrinkage testing, and color crocking.',
      },
      {
        title: 'Tier 2: Roving Inline Audits',
        desc: 'Continuous sewing line checks for stitches-per-inch (SPI), tension, symmetry, seam integrity, and critical dimensions.',
      },
      {
        title: 'Tier 3: Level II Final Random Inspection',
        desc: 'ANSI/ASQ Z1.4 sampling protocol with 0% tolerance for critical defects before packaging closure.',
      },
      {
        title: 'Conveyor Needle Screening',
        desc: '100% metal detector scan for every garment to ensure zero broken needle fragments reach end consumers.',
      },
    ],
    ctaText: 'View Quality Protocols',
    ctaLink: '/quality',
  },
  {
    id: 'production-tracking-export-logistics',
    tag: 'Global Delivery',
    metric: 'Door-to-Door & LCL',
    title: 'Production Tracking & Export Logistics',
    image: 'images/factory/sewing-garment.jpg',
    intro:
      'Proactive T&A scheduling, daily milestone updates, shipping documentation, and reliable global container freight export.',
    features: [
      {
        title: 'Live Critical Path (T&A) Calendar',
        desc: 'Granular tracking of yarn procurement, knitting/weaving, dyeing, cutting, sewing, and packing dates.',
      },
      {
        title: 'Flexible Sea & Air Freight',
        desc: 'Cost-effective LCL (Less than Container Load) sea shipping, courier air freight (DHL/FedEx/UPS), or air cargo consolidation.',
      },
      {
        title: 'Duty-Free Tariff Documentation',
        desc: 'Full GSP Form A, EU REX, UK DCTS, and Canada GPT documentation to minimize import tariffs.',
      },
      {
        title: 'Direct 3PL & Amazon FBA Prep',
        desc: 'Custom barcode polybags, carton labeling, packing lists, and commercial invoicing formatted for seamless customs clearance.',
      },
    ],
    ctaText: 'Plan Shipment Schedule',
    ctaLink: '/contact',
  },
];

const comparisonMatrix = [
  {
    criteria: 'Minimum Order Quantity (MOQ)',
    traditional: '3,000 - 5,000 pcs per style (High inventory risk)',
    softtex: '500 - 1,000 pcs per style (Agile test batches)',
  },
  {
    criteria: 'Prototyping & Sampling Speed',
    traditional: '3 to 6 weeks, low priority in sample room',
    softtex: '5 to 7 business days with rapid revision cycles',
  },
  {
    criteria: 'Pricing Transparency',
    traditional: 'Opaque lump sum quote with hidden markups',
    softtex: '100% open-book factory-gate costing breakdown',
  },
  {
    criteria: 'Account Management & T&A',
    traditional: 'Slow email responses, deprioritized production slots',
    softtex: 'Dedicated SPOC merchandiser with real-time updates',
  },
  {
    criteria: 'Quality Control Standard',
    traditional: 'Superficial end-of-line spot checks',
    softtex: '3-tier AQL 1.5 inspection with photo audit reports',
  },
  {
    criteria: 'Logistics & Fulfillment',
    traditional: 'FOB Full Container (FCL) port pickup only',
    softtex: 'LCL sea freight, express air, and direct 3PL/FBA prep',
  },
];

const startupSteps = [
  {
    step: '01',
    title: 'Tech-Pack & Costing',
    desc: 'Send your sketches, tech-packs, or reference garments. We evaluate fabric suitability, yield, and provide an open-book FOB quote within 24 hours.',
  },
  {
    step: '02',
    title: 'Rapid Sampling & Fit Seal',
    desc: 'We source fabric, prepare Pantone lab dips, and craft initial proto samples in 5-7 days. We refine until you grant complete fit approval.',
  },
  {
    step: '03',
    title: 'Small-Batch Production',
    desc: 'Bulk production begins on vetted lines. Roving QA teams conduct daily inline checks, and we send weekly photo and video progress reports.',
  },
  {
    step: '04',
    title: 'AQL 1.5 Audit & Dispatch',
    desc: 'We perform Level II final random inspection, 100% metal screening, pack to your specs, and ship via LCL sea freight or express air cargo.',
  },
];

const startupFaqs = [
  {
    q: 'What is the minimum order quantity (MOQ) for new fashion brands?',
    a: 'Our start-up program accommodates orders starting from 500 to 1,000 pieces per style across standard colorways and size breakdowns. For specialized circular knits using in-stock yarns, lower test runs may be possible upon review.',
  },
  {
    q: 'Can I start if I only have sketches and reference photos?',
    a: 'Yes. Our product development team can translate your rough sketches, moodboards, or physical vintage samples into complete technical specification sheets (tech packs), measurement charts, and pattern files.',
  },
  {
    q: 'How fast can I receive my first physical fit sample?',
    a: 'Once tech-pack specifications and available fabric qualities are confirmed, proto samples are drafted, cut, and sewn within 5 to 7 business days, then dispatched via DHL or FedEx international express.',
  },
  {
    q: "How does Softtex protect our brand's unique designs and IP?",
    a: 'We operate with strict confidentiality agreements (NDAs). Your tech-packs, patterns, custom prints, and embroidery artworks remain your exclusive intellectual property and are never shared or repurposed.',
  },
  {
    q: 'Can you ship directly to Amazon FBA or our fulfillment 3PL warehouse?',
    a: 'Yes. We handle carton labeling, barcode sticker application, individual polybagging, and palletization to comply with Amazon FBA and third-party logistics requirements across the USA, UK, Europe, and Canada.',
  },
  {
    q: 'What payment methods and terms are accepted for first runs?',
    a: 'For initial startup runs, we accept Irrevocable Letters of Credit (L/C at sight) or standard Wire Transfer (T/T with a deposit for raw materials and the balance payable upon AQL 1.5 final inspection pass before shipment).',
  },
];

export default function StartupServicesPage() {
  return (
    <div className="softtex-editorial-page">
      {/* Hero Header */}
      <header className="softtex-page-hero softtex-services-hero">
        <div className="container">
          <div className="softtex-startup-hero-badge">
            <Zap size={14} />
            <span>Apparel Sourcing Accelerator for Emerging Brands</span>
          </div>
          <h1>Start-Up Apparel Services: Low MOQs, Rapid Sampling &amp; Direct Factory Sourcing</h1>
          <p className="softtex-services-hero-lead">
            Launch and scale your clothing line with enterprise-grade manufacturing capabilities without enterprise volume barriers. We bring Bangladesh&apos;s premier manufacturing ecosystem to emerging designers, DTC fashion brands, and boutique apparel labels.
          </p>
          <div className="softtex-services-hero-actions">
            <Link className="softtex-editorial-button" to="/contact">
              Request Start-Up Proposal
              <ArrowRight size={16} />
            </Link>
            <Link className="softtex-editorial-button softtex-editorial-button-secondary" to="/calculator">
              FOB Cost Calculator
              <Calculator size={16} />
            </Link>
          </div>

          {/* Operational KPIs */}
          <div className="softtex-services-kpis">
            {startupKpis.map((kpi) => (
              <div className="softtex-services-kpi-card" key={kpi.title}>
                <div className="softtex-services-kpi-val">{kpi.val}</div>
                <div className="softtex-services-kpi-title">{kpi.title}</div>
                <p className="softtex-services-kpi-desc">{kpi.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* 4 Core Pillars Section */}
      <section className="softtex-editorial-section" id="pillars">
        <div className="softtex-editorial-wrap">
          <div className="softtex-editorial-heading">
            <p className="softtex-editorial-eyebrow">The 4 Core Pillars</p>
            <h2>Comprehensive Sourcing Architecture for Start-Up Brands</h2>
            <p>
              Every phase of your production cycle is engineered for agility, lower capital risk, and uncompromising garment quality.
            </p>
          </div>

          <div className="softtex-startup-pillars-grid">
            {startupPillars.map((pillar) => (
              <article className="softtex-startup-pillar-card" key={pillar.id}>
                <div className="softtex-startup-pillar-thumb">
                  <img src={assetUrl(pillar.image)} alt={pillar.title} loading="lazy" />
                  <span className="softtex-startup-pillar-tag">{pillar.tag}</span>
                  <span className="softtex-startup-pillar-metric">{pillar.metric}</span>
                </div>
                <div className="softtex-startup-pillar-body">
                  <h3 className="softtex-startup-pillar-title">{pillar.title}</h3>
                  <div className="softtex-startup-pillar-intro">{pillar.intro}</div>
                  <ul className="softtex-startup-pillar-features">
                    {pillar.features.map((feat) => (
                      <li key={feat.title}>
                        <Check size={15} />
                        <span>
                          <strong>{feat.title}:</strong> {feat.desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="softtex-startup-pillar-footer">
                    <Link className="softtex-editorial-button" to={pillar.ctaLink}>
                      {pillar.ctaText}
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Startup vs Traditional Factory Comparison Matrix */}
      <section className="softtex-editorial-section softtex-editorial-alt">
        <div className="softtex-editorial-wrap">
          <div className="softtex-editorial-heading">
            <p className="softtex-editorial-eyebrow">Strategic Advantage</p>
            <h2>Why Emerging Brands Choose Softtex Fashions</h2>
            <p>
              Traditional factories build barriers for small orders. Softtex Fashions bridges the gap with tailored solutions built specifically for growing apparel labels.
            </p>
          </div>

          <div className="softtex-startup-matrix-wrap">
            <table className="softtex-startup-matrix">
              <thead>
                <tr>
                  <th>Manufacturing Criteria</th>
                  <th className="softtex-traditional-col">Traditional Enterprise Factories</th>
                  <th className="softtex-highlight-col">Softtex Start-Up Program</th>
                </tr>
              </thead>
              <tbody>
                {comparisonMatrix.map((row) => (
                  <tr key={row.criteria}>
                    <td>
                      <strong>{row.criteria}</strong>
                    </td>
                    <td className="softtex-traditional-col">{row.traditional}</td>
                    <td className="softtex-highlight-col">{row.softtex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4-Step Production Flow */}
      <section className="softtex-editorial-section">
        <div className="softtex-editorial-wrap">
          <div className="softtex-editorial-heading">
            <p className="softtex-editorial-eyebrow">Agile Production Roadmap</p>
            <h2>From Tech-Pack to First Drop in 4 Steps</h2>
            <p>
              A synchronized, transparent workflow designed to launch your apparel collection smoothly and on schedule.
            </p>
          </div>

          <div className="softtex-services-flow-grid">
            {startupSteps.map((step) => (
              <div className="softtex-services-flow-card" key={step.step}>
                <div className="softtex-services-flow-step">{step.step}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="softtex-editorial-section softtex-editorial-alt">
        <div className="softtex-editorial-wrap">
          <div className="softtex-editorial-heading">
            <p className="softtex-editorial-eyebrow">Founder Questions</p>
            <h2>Frequently Asked Questions About Start-Up Manufacturing</h2>
            <p>
              Clear answers to common questions about small-batch manufacturing, minimums, sampling, and shipping.
            </p>
          </div>

          <div className="softtex-startup-faq-grid">
            {startupFaqs.map((faq) => (
              <div className="softtex-startup-faq-card" key={faq.q}>
                <h4 className="softtex-startup-faq-q">
                  <HelpCircle size={18} />
                  <span>{faq.q}</span>
                </h4>
                <p className="softtex-startup-faq-a">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Call to Action */}
      <section className="softtex-editorial-cta">
        <div className="softtex-editorial-wrap">
          <div>
            <p className="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">Launch With Softtex</p>
            <h2>Ready to manufacture your first collection?</h2>
            <p>
              Send us your designs, sketches, or tech-packs. Our dedicated startup merchandising desk will provide an open-book costing and rapid sampling proposal within 24 hours.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link className="softtex-editorial-button" to="/contact">
              Request Start-Up Proposal
              <ArrowRight size={16} />
            </Link>
            <Link className="softtex-editorial-button softtex-editorial-button-secondary" to="/calculator">
              Calculate FOB Cost
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
