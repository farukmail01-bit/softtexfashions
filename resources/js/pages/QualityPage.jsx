import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  FileCheck2,
  Microscope,
  Scale,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { assetUrl } from '../utils/asset';

const qualityKpis = [
  {
    val: 'AQL 1.5 / 2.5',
    title: 'Strict Quality Standard',
    desc: 'ISO 2859-1 Level II normal sampling with zero tolerance for critical flaws.',
  },
  {
    val: '4-Point System',
    title: 'Fabric Defect Screening',
    desc: 'ASTM D5430 inspection across 100% of bulk fabric rolls before cutting.',
  },
  {
    val: '100% Metal Scan',
    title: 'Needle Detector Security',
    desc: 'High-sensitivity 9-point conveyor detector screening for all export units.',
  },
  {
    val: '0% Critical',
    title: 'Zero-Defect Protocol',
    desc: 'Immediate quarantine of any style exceeding allowable defect thresholds.',
  },
];

const gateways = [
  {
    num: '01',
    pill: 'Raw Material & CAD',
    title: 'Pre-Production Gateway',
    subtitle: 'Fabric Inspection & Component Approvals',
    checks: [
      'ASTM D5430 4-point fabric scoring for holes, slubs, skewness, and color shading.',
      'Laboratory yarn count, GSM tolerance (+/- 3%), and dimensional stability wash tests.',
      'Trims endurance tests: zipper cycle test, button pull force (>90 Newtons), elastic recovery.',
      'CAD grading, shrinkage-adjusted patterns, and buyer-approved fit proto validation.',
    ],
  },
  {
    num: '02',
    pill: 'Floor Process Control',
    title: 'In-Line Manufacturing Gateway',
    subtitle: 'Cutting, Sewing & Roving Floor Audits',
    checks: [
      'Precision laser & automatic spreading checks with 24-hour fabric relaxation.',
      'Hourly roving QA checks: SPI (Stitches Per Inch), seam slippage, tension balance, needle heat.',
      'Critical shade-matching between front/back panels under D65 standard daylight lightboxes.',
      'Real-time traffic-light alert system on sewing floor to instantly correct line defects.',
    ],
  },
  {
    num: '03',
    pill: 'Export Authorization',
    title: 'Final AQL Inspection Gateway',
    subtitle: 'Statistical Random Sampling & Container Release',
    checks: [
      'Statistically valid random sampling according to ANSI/ASQ Z1.4 / ISO 2859-1 Level II.',
      '100% carton drop safety test, barcode readability, and moisture-barrier silica placement.',
      'Conveyorized 9-point needle detection certification ensuring zero foreign metal particles.',
      'Comprehensive digital QA dossier with high-resolution defect logs sent prior to BL issuance.',
    ],
  },
];

const labTests = [
  {
    title: 'Dimensional Stability & Shrinkage',
    std: 'ISO 6330 / AATCC 135',
    desc: 'Monitored across 5 wash & tumble dry cycles to ensure knit & woven garments retain exact buyer fit specifications.',
  },
  {
    title: 'Color Fastness to Washing & Crocking',
    std: 'ISO 105-C06 / AATCC 8',
    desc: 'Tested against perspiration, wet/dry rubbing, and detergent exposure, maintaining a minimum Grade 4.0 on the grey scale.',
  },
  {
    title: 'Seam Strength & Tensile Pull Force',
    std: 'ISO 13936 / ASTM D5034',
    desc: 'Laboratory tensile testing verifying high-stress armhole, crotch, and waistband seams withstand required pull forces.',
  },
  {
    title: 'Pilling & Abrasion Resistance',
    std: 'ISO 12945-2 / Martindale',
    desc: 'Evaluated under 2,000 to 5,000 surface friction cycles to ensure premium knitwear maintains a fresh, pill-free face.',
  },
];

const galleryPhotos = [
  {
    img: 'images/collections/quality-assurance-inspection.jpg',
    title: 'Garment Specification & Measurement',
    desc: 'Critical point-to-point measurement audit against approved buyer tech pack.',
  },
  {
    img: 'images/factory/sewing-garment.jpg',
    title: 'Modern Lean Production Floor',
    desc: 'Synchronized sewing line with automated workstations and inline QA desks.',
  },
  {
    img: 'images/collections/product-development-sampling.jpg',
    title: 'Fabric Swatch & Shade Matching',
    desc: 'D65 lightbox evaluation ensuring absolute color harmony across dye lots.',
  },
];

export default function QualityPage() {
  return (
    <div className="softtex-editorial-page softtex-quality-page">
      {/* HERO SECTION */}
      <header className="softtex-quality-hero">
        <div className="softtex-editorial-wrap">
          <p className="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">
            Precision Engineering &amp; Quality Governance
          </p>
          <h1>Zero-Defect Standard. Multi-Stage Quality Assurance.</h1>
          <p className="softtex-quality-hero-lead">
            Quality is not an afterthought at Softtex Fashions Wear Limited—it is engineered into every stage of the
            sourcing lifecycle. From raw fiber inspection to laser-guided cutting and statistical AQL 1.5 container
            sealing, our dedicated technical teams safeguard your brand reputation.
          </p>

          {/* 4 CORE KPI BADGES */}
          <div className="softtex-quality-kpis">
            {qualityKpis.map((kpi, index) => (
              <div className="softtex-quality-kpi-card" key={index}>
                <div className="softtex-quality-kpi-val">{kpi.val}</div>
                <div className="softtex-quality-kpi-title">{kpi.title}</div>
                <p className="softtex-quality-kpi-desc">{kpi.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* 3 QUALITY GATEWAYS SECTION */}
      <section className="softtex-editorial-section">
        <div className="softtex-editorial-wrap">
          <div className="softtex-editorial-heading">
            <p className="softtex-editorial-eyebrow">Three-Tier Quality Gateways</p>
            <h2>Systematic Quality Control Across Every Order</h2>
            <p style={{ maxWidth: '640px', color: 'var(--editorial-muted)', margin: '8px 0 0' }}>
              Rigorous milestones where no batch advances to the next phase without certified QA clearance.
            </p>
          </div>

          <div className="softtex-quality-gateways-grid">
            {gateways.map((gate, index) => (
              <article className="softtex-quality-gateway-card" key={index}>
                <div>
                  <div className="softtex-quality-gateway-top">
                    <span className="softtex-quality-gateway-num">{gate.num}</span>
                    <span className="softtex-quality-gateway-pill">{gate.pill}</span>
                  </div>
                  <h3>{gate.title}</h3>
                  <span className="softtex-quality-gateway-subtitle">{gate.subtitle}</span>
                  <ul className="softtex-quality-checklist">
                    {gate.checks.map((item, cIndex) => (
                      <li key={cIndex}>
                        <Check size={16} strokeWidth={2.5} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PHYSICAL & CHEMICAL LABORATORY BENCHMARKS */}
      <section className="softtex-editorial-section softtex-editorial-alt">
        <div className="softtex-editorial-wrap">
          <div className="softtex-editorial-heading">
            <p className="softtex-editorial-eyebrow">Testing Protocols</p>
            <h2>Physical &amp; Chemical Laboratory Benchmarks</h2>
            <p style={{ maxWidth: '680px', color: 'var(--editorial-muted)', margin: '8px 0 0' }}>
              All fabrics and trims are verified through certified third-party testing partners (SGS, Intertek, Bureau Veritas).
            </p>
          </div>

          <div className="softtex-quality-tests-grid">
            {labTests.map((test, index) => (
              <div className="softtex-quality-test-card" key={index}>
                <span className="softtex-quality-test-meta">{test.std}</span>
                <h4>{test.title}</h4>
                <p>{test.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FACTORY QUALITY PHOTO SHOWCASE */}
      <section className="softtex-editorial-section">
        <div className="softtex-editorial-wrap">
          <div className="softtex-editorial-heading">
            <p className="softtex-editorial-eyebrow">On-Site Execution</p>
            <h2>Factory Floor Inspection &amp; Calibration</h2>
            <p style={{ maxWidth: '640px', color: 'var(--editorial-muted)', margin: '8px 0 0' }}>
              Real images from our audited partner facilities in Dhaka and Gazipur industrial manufacturing zones.
            </p>
          </div>

          <div className="softtex-quality-gallery-grid">
            {galleryPhotos.map((photo, index) => (
              <div className="softtex-quality-gallery-card" key={index}>
                <div className="softtex-quality-gallery-img">
                  <img src={assetUrl(photo.img)} alt={photo.title} loading="lazy" />
                </div>
                <div className="softtex-quality-gallery-caption">
                  <strong>{photo.title}</strong>
                  <span>{photo.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* AQL 1.5 SAMPLING PROTOCOL BOX */}
          <div className="softtex-quality-aql-box">
            <h4>AQL 1.5 / 2.5 Sampling Acceptance Protocol</h4>
            <p>
              We operate under ANSI/ASQ Z1.4 / ISO 2859-1 Level II Normal Sampling protocols. For instance, for an order
              lot of 10,000 pieces, our certified QA team draws a statistically randomized sample of 200 garments. If
              Major defects exceed 7 pieces or Minor defects exceed 10 pieces, the entire lot is automatically
              rejected, 100% re-screened, and corrected at the factory&apos;s expense before any re-audit. Zero critical
              defects (broken needle points, sharp edges, unfunctional fasteners) are ever permitted.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <span className="softtex-quality-gateway-pill">Critical: 0 Allowed</span>
              <span className="softtex-quality-gateway-pill">Major: AQL 1.5</span>
              <span className="softtex-quality-gateway-pill">Minor: AQL 2.5</span>
              <span className="softtex-quality-gateway-pill">ISO 2859-1 Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="softtex-editorial-cta">
        <div className="softtex-editorial-wrap">
          <div>
            <p className="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">Quality Governance</p>
            <h2>Require a Custom Quality Audit Protocol for Your Brand?</h2>
            <p>
              Share your brand&apos;s QA manual or technical specifications with our engineering team for full alignment.
            </p>
          </div>
          <Link className="softtex-editorial-button" to="/contact">
            Request Quality Dossier <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
