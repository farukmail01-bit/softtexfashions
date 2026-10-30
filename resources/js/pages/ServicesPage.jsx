import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  FileCheck2,
  Globe2,
  Layers,
  Scissors,
  ShieldCheck,
  Ship,
  Sparkles,
} from 'lucide-react';

const serviceKpis = [
  {
    val: '1.8M+',
    title: 'Monthly Capacity',
    desc: 'Units monthly output across knitwear, woven tops, denim, and sweater production lines.',
  },
  {
    val: '20-45 Days',
    title: 'Agile Lead Time',
    desc: 'From lab dip & fabric approval to FOB port dispatch, tailored for fast-fashion cycles.',
  },
  {
    val: '230+ Units',
    title: 'Audited Partner Network',
    desc: 'RSC, BSCI, Sedex, and OEKO-TEX certified manufacturing units across Bangladesh.',
  },
  {
    val: 'AQL 1.5 / 2.5',
    title: 'Strict Quality Standard',
    desc: 'Multi-stage roving inline audits and Level II final random inspections with 0% critical tolerance.',
  },
];

const serviceBentoCards = [
  {
    id: 'product-development',
    icon: Layers,
    tag: 'Concept to Proto',
    title: 'Product Development & 3D CAD Sampling',
    desc: 'Transforming design sketches and tech-packs into production-ready styles with rapid 3D CLO virtual drape simulation and physical fit samples within 3 to 5 business days.',
    checks: [
      '3D CLO virtual garment drape, tension mapping & pattern fitting',
      'Rapid proto, fit, salesman (SMS) & photo shoot samples',
      'Shrinkage-compensated master pattern grading across international size runs',
      'Dedicated tech-pack engineering for fabric yield & floor cost optimization',
    ],
  },
  {
    id: 'factory-sourcing',
    icon: Building2,
    tag: 'Strategic Sourcing',
    title: 'Direct Factory-Gate Sourcing & Line Allocation',
    desc: 'Leveraging our vetted network of 230+ compliant manufacturing units to match each style with the optimal machinery, stitch capability, labor efficiency, and price point.',
    checks: [
      'Rigorous pre-screening for RSC structural, electrical, and BSCI social compliance',
      'Dedicated line allocation for knitwear, denim, shirts, outerwear, and activewear',
      'Transparent open-book costing with direct factory-gate FOB pricing',
      'Pre-booked seasonal capacity to guarantee on-time bulk delivery',
    ],
  },
  {
    id: 'fabric-trims',
    icon: Scissors,
    tag: 'Material Innovation',
    title: 'Fabric R&D, Eco-Dyeing & Trims Development',
    desc: 'Custom yarn sourcing, sustainable textile milling, precise pantone lab-dipping, and OEKO-TEX certified embellishments engineered for luxurious hand-feel and endurance.',
    checks: [
      'Organic cotton (GOTS/OCS), recycled polyester (GRS), linen, and specialized modal/viscose blends',
      'Continuous lab dip matching under standard D65 / CWF lightboxes with spectrophotometer verification',
      'Custom trims, woven jacquard labels, nickel-free snap buttons, and YKK/SBS zipper sourcing',
      'Heavy enzyme, silicone, acid, vintage, and ozone eco-friendly laundry washes',
    ],
  },
  {
    id: 'merchandising',
    icon: Calendar,
    tag: 'End-to-End Tracking',
    title: 'Merchandising & Critical Path (T&A) Follow-up',
    desc: 'Dedicated single point of contact (SPOC) senior merchandisers overseeing day-by-day Time & Action (T&A) schedules to ensure zero line stoppages and complete transparency.',
    checks: [
      'Granular critical path tracking from yarn spinning to final export packaging',
      'Weekly transparent photo and video milestone progress reports sent to buyer',
      'Proactive risk mitigation for raw material arrivals and dye lot approvals',
      'Rapid 24-hour turnaround on buyer queries across European and US timezones',
    ],
  },
  {
    id: 'quality-assurance',
    icon: ShieldCheck,
    tag: 'AQL 1.5 / 2.5 Assurance',
    title: 'Quality Assurance & Multi-Stage AQL Audits',
    desc: 'Independent certified roving QA teams stationed on factory floors conducting raw material inspection, inline checks, and final random inspections per ISO 2859-1.',
    checks: [
      '100% bulk fabric roll screening via ASTM D5430 4-Point inspection protocol',
      'Hourly roving inline audits checking SPI, seam strength, color continuity, and symmetry',
      'Calibrated 9-point conveyor needle detector screening for every exported carton',
      'ANSI/ASQ Z1.4 Level II final statistical inspection with comprehensive digital reporting',
    ],
  },
  {
    id: 'logistics',
    icon: Ship,
    tag: 'Global Freight & Duty-Free',
    title: 'Export Logistics & Duty-Free Trade Documentation',
    desc: 'Streamlining multimodal sea and air freight through Chittagong Port and Dhaka Airport with full GSP, REX, and duty-free preferential tariff documentation for global markets.',
    checks: [
      'Full GSP Form A, EU REX, UK DCTS, and Canada GPT preferential tariff documentation',
      'Freight consolidation, custom carton packing, palletization, and vessel booking',
      'Real-time container tracking from factory gate to destination seaport',
      'C-TPAT compliant container sealing and export customs clearance',
    ],
  },
];

const lifecycleSteps = [
  {
    num: '01',
    title: 'Design Brief & Tech-Pack Consultation',
    desc: 'Review buyer tech-packs, target FOB prices, and material specs. We deliver a detailed feasibility breakdown and price structure within 24 hours.',
  },
  {
    num: '02',
    title: 'Sampling, Fit Approval & Lab Dips',
    desc: 'Develop initial proto samples, lab-dipped pantone strike-offs, and print strike-offs until full buyer approval and fit seal.',
  },
  {
    num: '03',
    title: 'Bulk Production & In-Line Quality Control',
    desc: 'Automated spreading, precision laser cutting, and sewing line execution under continuous roving QA oversight with daily progress updates.',
  },
  {
    num: '04',
    title: 'Final AQL 1.5 Audit & Port Dispatch',
    desc: 'Rigorous Level II final random inspection, metal scan verification, container stuffing, and prompt release of export shipping documentation.',
  },
];

const categoryExpertise = [
  {
    title: 'Circular Knit & Jersey',
    items: 'T-shirts, polos, hoodies, joggers, sweatshirts, tank tops, and loungewear in 100% combed cotton, CVC, and poly-cotton blends.',
  },
  {
    title: 'Woven Bottoms & Tops',
    items: '5-pocket denim jeans, cargo trousers, casual & formal shirts, chinos, and workwear in twill, poplin, oxford, and stretch weaves.',
  },
  {
    title: 'Sweaters & Flat Knits',
    items: 'Fine 12-14 gauge to chunky 3-5 gauge knitwear, pullovers, cardigans, and jacquard knits in cotton, acrylic, and blended yarns.',
  },
  {
    title: 'Outerwear & Sportswear',
    items: 'Windbreakers, padded puffer jackets, softshells, moisture-wicking athletic jerseys, and technical performance garments.',
  },
];

const sourcingAdvantages = [
  {
    title: 'Zero Broker Markups',
    desc: 'Direct factory-gate pricing with 100% open-book material & labor breakdown. You negotiate directly with transparent terms.',
  },
  {
    title: 'Dedicated Account Merchandiser',
    desc: 'One accountable apparel engineering lead handles your account from development through delivery with proactive daily communication.',
  },
  {
    title: 'Comprehensive Compliance Shield',
    desc: 'Zero tolerance for non-compliance. All partner factories hold valid RSC, BSCI, Sedex, or OEKO-TEX safety and social certifications.',
  },
];

export default function ServicesPage() {
  return (
    <div className="softtex-editorial-page">
      {/* Hero Header */}
      <header className="softtex-page-hero softtex-services-hero">
        <div className="container">
          <p className="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">
            Full-Spectrum Apparel Sourcing &amp; Manufacturing Services
          </p>
          <h1>End-to-End Apparel Manufacturing. Sourced with Absolute Precision.</h1>
          <p className="softtex-services-hero-lead">
            From rapid CAD sampling and custom fabric R&amp;D to automated sewing lines, rigorous AQL 1.5 inspection gates, and duty-free global export logistics — Softtex Fashions delivers seamless apparel production across Bangladesh for premier global retail brands.
          </p>
          <div className="softtex-services-hero-actions">
            <Link className="softtex-editorial-button" to="/contact">
              Request Sourcing Proposal <ArrowRight size={16} />
            </Link>
            <Link className="softtex-editorial-button softtex-editorial-button-secondary" to="/startup-services">
              Start-Up Program (Low MOQs)
            </Link>
            <Link className="softtex-editorial-button softtex-editorial-button-secondary" to="/calculator">
              FOB Cost Calculator <Sparkles size={16} />
            </Link>
          </div>

          {/* Operational KPIs */}
          <div className="softtex-services-kpis">
            {serviceKpis.map((kpi) => (
              <div key={kpi.title} className="softtex-services-kpi-card">
                <div className="softtex-services-kpi-val">{kpi.val}</div>
                <div className="softtex-services-kpi-title">{kpi.title}</div>
                <p className="softtex-services-kpi-desc">{kpi.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* 6 Core Enterprise Bento Services */}
      <section className="softtex-editorial-section">
        <div className="softtex-editorial-wrap">
          <div className="softtex-editorial-heading">
            <p className="softtex-editorial-eyebrow">Enterprise Capabilities</p>
            <h2>Comprehensive Garment Sourcing &amp; Manufacturing Services</h2>
            <p>
              Every stage of your production is managed by seasoned textile engineers and merchandisers on the ground in Dhaka.
            </p>
          </div>

          <div className="softtex-services-bento-grid">
            {serviceBentoCards.map((service) => {
              const IconComp = service.icon;
              return (
                <article key={service.id} className="softtex-services-card">
                  <div>
                    <div className="softtex-services-card-top">
                      <div className="softtex-services-card-icon">
                        <IconComp size={22} />
                      </div>
                      <span className="softtex-services-card-tag">{service.tag}</span>
                    </div>
                    <h3 className="softtex-services-card-title">{service.title}</h3>
                    <p className="softtex-services-card-desc">{service.desc}</p>
                  </div>

                  <ul className="softtex-services-card-checklist">
                    {service.checks.map((check) => (
                      <li key={check}>
                        <Check size={14} />
                        <span>{check}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4-Step Production Flow */}
      <section className="softtex-editorial-section softtex-editorial-alt">
        <div className="softtex-editorial-wrap">
          <div className="softtex-editorial-heading">
            <p className="softtex-editorial-eyebrow">Seamless Execution</p>
            <h2>Our 4-Stage Production Roadmap</h2>
            <p>
              A proven, synchronized workflow engineered to take your collection from concept sketches to shipping port on schedule.
            </p>
          </div>

          <div className="softtex-services-flow-grid">
            {lifecycleSteps.map((step) => (
              <div key={step.num} className="softtex-services-flow-card">
                <div className="softtex-services-flow-step">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Specialization Grid */}
      <section className="softtex-editorial-section">
        <div className="softtex-editorial-wrap">
          <div className="softtex-editorial-heading">
            <p className="softtex-editorial-eyebrow">Category Mastery</p>
            <h2>Product Divisions &amp; Manufacturing Lines</h2>
            <p>
              Specialized manufacturing facilities equipped with modern machinery tailored for specific garment constructions.
            </p>
          </div>

          <div className="softtex-services-cat-grid">
            {categoryExpertise.map((cat) => (
              <div key={cat.title} className="softtex-services-cat-card">
                <div className="softtex-services-cat-title">{cat.title}</div>
                <p className="softtex-services-cat-items">{cat.items}</p>
              </div>
            ))}
          </div>

          {/* Sourcing Advantages */}
          <div className="softtex-services-highlights">
            {sourcingAdvantages.map((adv) => (
              <div key={adv.title} className="softtex-services-highlight-card">
                <h4>{adv.title}</h4>
                <p>{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Sourcing Call to Action */}
      <section className="softtex-editorial-cta">
        <div className="softtex-editorial-wrap">
          <div>
            <p className="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">Partner With Softtex</p>
            <h2>Ready to manufacture your next apparel collection?</h2>
            <p>
              Send us your tech-packs, target quantities, and destination port. Our merchandising team will provide a comprehensive costing and sampling plan within 24 hours.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link className="softtex-editorial-button" to="/contact">
              Request Sourcing Proposal <ArrowRight size={16} />
            </Link>
            <Link className="softtex-editorial-button softtex-editorial-button-secondary" to="/catalogue">
              Browse Catalogues
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
