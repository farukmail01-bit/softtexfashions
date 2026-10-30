import React from 'react';
import {
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  FileCheck2,
  Flame,
  HeartHandshake,
  Leaf,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { assetUrl } from '../utils/asset';

const kpis = [
  {
    val: '100%',
    title: 'Safety Audited Facilities',
    desc: 'Fully inspected and remediated under national & international RSC safety protocols.',
  },
  {
    val: 'AQL 1.5/2.5',
    title: 'Strict Quality Benchmark',
    desc: 'Comprehensive multi-stage inline and final random inspection gates.',
  },
  {
    val: '0-Tolerance',
    title: 'Ethical Labor Mandate',
    desc: 'Zero tolerance for forced, bonded, or underage labor across all partner mills.',
  },
  {
    val: 'OEKO / GOTS',
    title: 'Eco-Certified Chemistry',
    desc: 'Non-toxic, skin-safe chemistry with full organic and recycled yarn traceability.',
  },
];

const pillars = [
  {
    icon: Flame,
    tag: 'Structural & Life Safety',
    title: 'RSC & ACCORD Factory Integrity',
    desc: 'Engineered structural integrity with active fire sprinkler hydrants, thermal imaging electrical audits, wide emergency egress corridors, and certified remediation verified by the RMG Sustainability Council (RSC).',
  },
  {
    icon: HeartHandshake,
    tag: 'Ethical Workplace',
    title: 'Fair Wages & Human Dignity',
    desc: 'Strict alignment with ILO conventions and global buyer codes of conduct. Transparent digital payroll, living wages, regulated overtime, on-site healthcare clinics, maternity protections, and active worker welfare participation.',
  },
  {
    icon: Sparkles,
    tag: 'Chemical & Consumer Safety',
    title: 'OEKO-TEX Standard 100 Chemistry',
    desc: 'ZDHC MRSL (Zero Discharge of Hazardous Chemicals) compliant wet processing. Every fabric, sewing thread, zipper, and print pigment is certified 100% free from banned azo-dyes, formaldehyde, phthalates, and heavy metals.',
  },
  {
    icon: Leaf,
    tag: 'Circular & Organic Sourcing',
    title: 'Sustainable Fibers & Chain of Custody',
    desc: 'End-to-end transaction certificates (TC) for GOTS-certified organic cotton, OCS blends, and GRS/RCS post-consumer recycled polyester yarns, minimizing environmental footprints with responsible water and energy stewardship.',
  },
];

const standards = [
  {
    name: 'ACCORD / RSC',
    type: 'Life & Building Safety',
    description: 'National and international binding framework verifying electrical, fire and structural safety across all manufacturing units.',
    logo: 'images/certificatelogos/accord-logo.png',
    scope: 'Safety Audited',
  },
  {
    name: 'BSCI (amfori)',
    type: 'Social Accountability',
    description: 'Comprehensive supply-chain social audit ensuring fair labor practices, safe working conditions, and occupational health governance.',
    logo: 'images/certificatelogos/bsci-logo.png',
    scope: 'Socially Certified',
  },
  {
    name: 'OEKO-TEX Standard 100',
    type: 'Human-Ecological Safety',
    description: 'Independent global testing certifying that fabrics, threads, trims, and prints are tested for over 100 harmful substances and skin-safe.',
    logo: 'images/certificatelogos/cit-logo.png',
    scope: 'Non-Toxic Certified',
  },
  {
    name: 'C-TPAT',
    type: 'Supply Chain Security',
    description: 'Customs-Trade Partnership Against Terrorism security validation protecting cargo transit, container sealing, and port dispatch.',
    logo: 'images/certificatelogos/ctpat.jpg',
    scope: 'Security Verified',
  },
  {
    name: 'GOTS',
    type: 'Organic Ecology',
    description: 'World-leading textile processing standard for organic fibers, including ecological and social criteria backed by independent certification.',
    logo: 'images/certificatelogos/gots-log.png',
    scope: 'Organic Certified',
  },
  {
    name: 'OCS (Organic Content)',
    type: 'Fiber Content Claim',
    description: 'Third-party verification tracking the exact percentage of organic materials from raw farm ginning to finished garments.',
    logo: 'images/certificatelogos/ocs-logo.jpg',
    scope: 'Content Verified',
  },
  {
    name: 'RCS (Recycled Claim)',
    type: 'Recycled Polymers',
    description: 'Chain-of-custody certification tracking post-consumer recycled polymers, polyester, and regenerated yarns in knit & woven wear.',
    logo: 'images/certificatelogos/rcs-logo.jpg',
    scope: 'Recycled Certified',
  },
  {
    name: 'SEDEX SMETA',
    type: 'Ethical Data Exchange',
    description: 'Global 4-pillar audit methodology assessing labor standards, health & safety, environmental management, and business ethics.',
    logo: 'images/certificatelogos/sedex-logo.png',
    scope: 'Ethically Audited',
  },
  {
    name: 'SGS Inspection',
    type: 'Testing & Verification',
    description: 'Accredited physical and chemical laboratory testing (colorfastness, shrinkage, tensile strength, tear strength, pilling resistance).',
    logo: 'images/certificatelogos/sgs-logo.png',
    scope: 'Lab Accredited',
  },
  {
    name: 'WRAP',
    type: 'Factory Accreditation',
    description: 'Worldwide Responsible Accredited Production certification proving lawful, humane, and ethical workplace compliance.',
    logo: 'images/certificatelogos/wrap-logo.png',
    scope: 'Facility Accredited',
  },
];

const auditSteps = [
  {
    num: '01',
    title: 'Pre-Vetting & License Audit',
    desc: 'Validating active SEDEX/BSCI/RSC audit scores, building approvals, and trade licenses before initiating sampling.',
  },
  {
    num: '02',
    title: 'Material Safety & Lab-Dip Tests',
    desc: 'Testing raw greige, certified non-toxic dyes, and accessory endurance in third-party labs prior to bulk knitting or cutting.',
  },
  {
    num: '03',
    title: 'Inline Monitoring & Work Protocols',
    desc: 'On-site technical and social checks throughout sewing, ironing, and packaging to prevent deviations.',
  },
  {
    num: '04',
    title: 'Final Random Inspection (FRI)',
    desc: 'Strict AQL 1.5/2.5 carton drop, barcode scanning, metal detection, and packaging verification before container dispatch.',
  },
];

export default function CompliancePage() {
  return (
    <div className="softtex-editorial-page softtex-compliance-page">
      {/* HERO SECTION */}
      <header className="softtex-compliance-hero">
        <div className="softtex-editorial-wrap">
          <p className="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">
            Ethical Manufacturing &amp; Sustainability
          </p>
          <h1>Certified Compliance. Responsible Sourcing. Zero Compromise.</h1>
          <p className="softtex-compliance-hero-lead">
            Softtex Fashions Wear Limited guarantees that every apparel order is coordinated exclusively through
            verified, certified manufacturing partners in Bangladesh. We safeguard your brand reputation with strict
            structural safety, ethical labor protocols, and sustainable environmental stewardship.
          </p>

          {/* KPI BENCHMARKS */}
          <div className="softtex-compliance-kpis">
            {kpis.map((kpi, index) => (
              <div className="softtex-compliance-kpi-card" key={index}>
                <div className="softtex-compliance-kpi-val">{kpi.val}</div>
                <div className="softtex-compliance-kpi-title">{kpi.title}</div>
                <p className="softtex-compliance-kpi-desc">{kpi.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* 4 CORE GOVERNANCE PILLARS */}
      <section className="softtex-editorial-section">
        <div className="softtex-editorial-wrap">
          <div className="softtex-editorial-heading">
            <p className="softtex-editorial-eyebrow">Governance &amp; Responsibility</p>
            <h2>Four Pillars of Our Sustainability Framework</h2>
            <p style={{ maxWidth: '640px', color: 'var(--editorial-muted)', margin: '8px 0 0' }}>
              How we ensure every stitch meets the highest international safety, environmental, and humanitarian benchmarks.
            </p>
          </div>

          <div className="softtex-compliance-pillars-grid">
            {pillars.map((pillar, index) => {
              const IconComponent = pillar.icon;
              return (
                <article className="softtex-compliance-pillar-card" key={index}>
                  <div className="softtex-compliance-pillar-header">
                    <div className="softtex-compliance-pillar-icon" aria-hidden="true">
                      <IconComponent size={22} strokeWidth={1.5} />
                    </div>
                    <span className="softtex-compliance-pillar-tag">{pillar.tag}</span>
                  </div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CERTIFICATION CATALOGUE MATRIX */}
      <section className="softtex-editorial-section softtex-editorial-alt">
        <div className="softtex-editorial-wrap">
          <div className="softtex-editorial-heading">
            <p className="softtex-editorial-eyebrow">Recognised Certifications</p>
            <h2>International Standards &amp; Factory Accreditations</h2>
            <p style={{ maxWidth: '680px', color: 'var(--editorial-muted)', margin: '8px 0 0' }}>
              Our manufacturing facilities are actively audited and compliant with premier global regulatory bodies.
            </p>
          </div>

          <div className="softtex-compliance-cert-grid">
            {standards.map((cert, index) => (
              <article className="softtex-compliance-cert-card" key={index}>
                <div className="softtex-compliance-cert-logo-box">
                  <img src={assetUrl(cert.logo)} alt={cert.name} loading="lazy" />
                </div>
                <div className="softtex-compliance-cert-body">
                  <div className="softtex-compliance-cert-topline">
                    <span className="softtex-compliance-cert-type">{cert.type}</span>
                    <span className="softtex-compliance-cert-scope">
                      <Check size={12} strokeWidth={2.5} />
                      {cert.scope}
                    </span>
                  </div>
                  <h3>{cert.name}</h3>
                  <p>{cert.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4-STEP BUYER DUE DILIGENCE AUDIT ROADMAP */}
      <section className="softtex-editorial-section">
        <div className="softtex-editorial-wrap">
          <div className="softtex-editorial-heading">
            <p className="softtex-editorial-eyebrow">Quality &amp; Compliance Verification</p>
            <h2>End-to-End Audit &amp; Inspection Protocol</h2>
            <p style={{ maxWidth: '640px', color: 'var(--editorial-muted)', margin: '8px 0 0' }}>
              Transparency at every checkpoint—from pre-production factory selection to final container sealing.
            </p>
          </div>

          <div className="softtex-compliance-flow-grid">
            {auditSteps.map((step, index) => (
              <div className="softtex-compliance-flow-card" key={index}>
                <div className="softtex-compliance-flow-num">{step.num}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="softtex-editorial-cta">
        <div className="softtex-editorial-wrap">
          <div>
            <p className="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">Buyer Due Diligence</p>
            <h2>Require Specific Factory Audit Reports?</h2>
            <p>
              We provide verified SEDEX, BSCI, OEKO-TEX, and RSC audit documentation upon review of your sourcing inquiry.
            </p>
          </div>
          <Link className="softtex-editorial-button" to="/contact">
            Request Compliance Dossier <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
