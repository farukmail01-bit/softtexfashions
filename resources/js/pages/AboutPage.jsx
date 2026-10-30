import React from 'react';
import { ArrowRight, Award, ShieldCheck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assetUrl } from '../utils/asset';

const productCategories = [
  {
    title: 'Woven Shirts & Tops',
    category: 'Woven Wear',
    image: 'images/collections/woven-shirts-collection.jpg',
    path: '/catalogue/mens',
    count: '120+ Styles',
    description: 'Poplin, oxford, linen blends & tailored formal/casual shirts.',
  },
  {
    title: 'Knitwear & Polos',
    category: 'Knitwear',
    image: 'images/collections/knitwear-polos-collection.jpg',
    path: '/catalogue/womens',
    count: '100+ Styles',
    description: '100% combed cotton jersey tees, piqués & fleece hoodies.',
  },
  {
    title: 'Denim & Bottoms',
    category: 'Denim & Casuals',
    image: 'images/collections/denim-bottoms-collection.jpg',
    path: '/catalogue/mens',
    count: '80+ Styles',
    description: '10-14oz authentic ring denim, stretches & washed chinos.',
  },
  {
    title: 'Jackets & Outerwear',
    category: 'Outerwear',
    image: 'images/factory/slider-one.b923b4732b89d937bdaf.jpg',
    path: '/catalogue/mens',
    count: '45+ Styles',
    description: 'Technical field jackets, windbreakers & lightweight puffers.',
  },
  {
    title: 'Children & Babywear',
    category: 'Kidswear',
    image: 'images/collections/children-babywear-collection.jpg',
    path: '/catalogue/kids',
    count: '78+ Styles',
    description: 'Safe, nickel-free, OEKO-TEX certified infant & youth apparel.',
  },
];

export default function AboutPage() {
  return (
    <div className="softtex-editorial-page">
      <header className="softtex-page-hero">
        <div className="container">
          <p className="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">About Softtex</p>
          <h1>A local partner. A global perspective.</h1>
          <p>SOFTTEX FASHIONS WEAR LIMITED is a 100% export-oriented garments manufacturer and buying house based in Dhaka, Bangladesh.</p>
        </div>
      </header>

      <section className="softtex-editorial-section">
        <div className="softtex-editorial-wrap">
          {/* Clean Cinematic Sourcing Atelier Banner */}
          <div className="softtex-editorial-banner-wrap">
            <div className="softtex-editorial-banner-inner">
              <img
                src={assetUrl('images/home-slider/softtex-buying-house-meeting.jpg')}
                alt="Softtex Fashions buying house team reviewing garment production briefs and tech packs"
                loading="lazy"
              />
              <div className="softtex-editorial-banner-pill-clean">
                <span className="dot" />
                <span>Dhaka Sourcing Headquarters · Merchandising &amp; Execution Operations</span>
              </div>
            </div>
          </div>

          {/* Who We Are Split Grid */}
          <div className="softtex-editorial-content-grid" style={{ alignItems: 'start' }}>
            <div className="softtex-who-we-are-col-left">
              <p className="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">Who we are</p>
              <h2>Bridging global apparel buyers with verified Bangladesh manufacturers.</h2>

              <p className="softtex-who-lead">
                Softtex Fashions Wear Limited operates as the dedicated sourcing and manufacturing bridge between international apparel brands, retailers, and verified production facilities across Bangladesh.
              </p>
              <p>
                From high-volume commercial basic knits to intricate fashion woven tailoring and authentic washed denim, our stationed merchandising and technical teams enforce buyer-approved specifications, timely fabric lab dips, and dependable shipping schedules.
              </p>

              {/* Numbered Editorial Pillars */}
              <div className="softtex-who-pillars">
                <div className="softtex-who-pillar-item">
                  <div className="softtex-who-pillar-num">01</div>
                  <div className="softtex-who-pillar-content">
                    <strong>Direct Factory Matching</strong>
                    <p>Connecting every style program with 230+ audited partner units across Dhaka, Gazipur &amp; Narayanganj with specialized machinery.</p>
                  </div>
                </div>

                <div className="softtex-who-pillar-item">
                  <div className="softtex-who-pillar-num">02</div>
                  <div className="softtex-who-pillar-content">
                    <strong>Stationed QA Oversight</strong>
                    <p>On-site quality teams enforcing 4-point raw fabric inspection, inline stitch monitoring, and strict AQL 1.5/2.5 audits.</p>
                  </div>
                </div>

                <div className="softtex-who-pillar-item">
                  <div className="softtex-who-pillar-num">03</div>
                  <div className="softtex-who-pillar-content">
                    <strong>Transparent Milestone Tracking</strong>
                    <p>Proactive Time &amp; Action (T&amp;A) calendar updates with daily reporting, providing complete control over shipment timelines.</p>
                  </div>
                </div>
              </div>

              <div className="softtex-who-actions">
                <Link className="softtex-editorial-button" to="/services">
                  Explore our sourcing services <ArrowRight size={16} />
                </Link>
                <Link className="btn o" to="/contact" style={{ textDecoration: 'none' }}>
                  Contact Merchandising Desk
                </Link>
              </div>
            </div>

            {/* Right Column: Single Unified Operations Sourcing Hub Card */}
            <div className="softtex-who-hub-card">
              <div className="softtex-who-hub-media">
                <img
                  src={assetUrl('images/collections/product-development-sampling.jpg')}
                  alt="Textile swatches and pattern development atelier at Softtex Fashions"
                  loading="lazy"
                />
                <div className="softtex-who-hub-badge">
                  <span className="softtex-who-hub-badge-dot" />
                  <span>Apparel Merchandising Atelier · Dhaka Sourcing Hub</span>
                </div>
              </div>

              <div className="softtex-who-hub-stats">
                <div className="softtex-who-hub-stat">
                  <strong>1.8M+ Units</strong>
                  <span>Monthly Capacity</span>
                </div>
                <div className="softtex-who-hub-stat">
                  <strong>5–7 Days</strong>
                  <span>Proto Turnaround</span>
                </div>
                <div className="softtex-who-hub-stat">
                  <strong>AQL 1.5 / 2.5</strong>
                  <span>Quality Standard</span>
                </div>
                <div className="softtex-who-hub-stat">
                  <strong>100% Tested</strong>
                  <span>Needle &amp; Metal Check</span>
                </div>
              </div>

              <div className="softtex-who-hub-footer">
                <div className="softtex-who-hub-tags">
                  <span>RSC / ACCORD</span>
                  <span>BSCI Audited</span>
                  <span>OEKO-TEX</span>
                  <span>SEDEX</span>
                </div>
                <span className="softtex-who-hub-network">230+ Assigned Units</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="softtex-editorial-section softtex-editorial-alt">
        <div className="softtex-editorial-wrap">
          <div className="softtex-editorial-heading">
            <p className="softtex-editorial-eyebrow">Our mission &amp; values</p>
            <h2>Long-term partnerships built on clear commitments.</h2>
          </div>
          <p className="softtex-editorial-mission">
            We strive for mutual benefit and sustainable growth for our buyer partners and manufacturing facilities, maintaining an uncompromising standard for quality, competitive FOB pricing, and reliable on-time delivery.
          </p>

          <div className="softtex-mission-values-grid">
            <div className="softtex-mission-value-card">
              <div className="softtex-mission-value-card-header">
                <div className="softtex-mission-value-icon">
                  <ShieldCheck size={18} />
                </div>
                <h4>Uncompromising Quality</h4>
              </div>
              <p>Continuous inline quality monitoring, 4-point raw fabric inspection, and strict AQL Level II audit standards so zero defective garments ship.</p>
            </div>

            <div className="softtex-mission-value-card">
              <div className="softtex-mission-value-card-header">
                <div className="softtex-mission-value-icon">
                  <Award size={18} />
                </div>
                <h4>Complete Transparency</h4>
              </div>
              <p>Direct factory matching, clear open-book costing, and authentic compliance accreditation across BSCI, OEKO-TEX, SEDEX, and ACCORD.</p>
            </div>

            <div className="softtex-mission-value-card">
              <div className="softtex-mission-value-card-header">
                <div className="softtex-mission-value-icon">
                  <Clock size={18} />
                </div>
                <h4>Reliable Lead Times</h4>
              </div>
              <p>Disciplined Time &amp; Action (T&amp;A) milestone tracking, prompt proto approvals in 5-7 days, and ocean freight logistics to global ports.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics & What We Make Section */}
      <section className="softtex-editorial-section">
        <div className="softtex-editorial-wrap">
          {/* Executive Dark Navy Metrics Ribbon */}
          <div className="softtex-profile-metrics-bar">
            <div className="softtex-profile-metric-box">
              <strong>100+</strong>
              <span>Garment Categories</span>
            </div>
            <div className="softtex-profile-metric-box">
              <strong>5+</strong>
              <span>Major Export Continents</span>
            </div>
            <div className="softtex-profile-metric-box">
              <strong>230+</strong>
              <span>Partner Manufacturing Units</span>
            </div>
            <div className="softtex-profile-metric-box">
              <strong>1.8M+</strong>
              <span>Units Monthly Capacity</span>
            </div>
            <div className="softtex-profile-metric-box">
              <strong>17+</strong>
              <span>Associated Countries</span>
            </div>
          </div>

          {/* What We Make Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
            <div>
              <p className="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">Product portfolio</p>
              <h2 style={{ fontSize: 'clamp(26px, 3vw, 36px)', margin: '4px 0 8px' }}>What We Make</h2>
              <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--editorial-muted)' }}>
                Full-spectrum apparel manufacturing across knitwear, woven tailoring, authentic washed denim, and certified babywear.
              </p>
            </div>
            <Link to="/catalogue/mens" style={{ fontSize: '12px', fontWeight: 650, color: 'var(--editorial-bronze)' }}>
              View full catalogue &rarr;
            </Link>
          </div>

          {/* 5-Category Product Grid with Real Photos */}
          <div className="softtex-profile-products-grid">
            {productCategories.map((cat) => (
              <Link key={cat.title} to={cat.path} className="softtex-profile-product-card">
                <div className="softtex-profile-product-img-wrap">
                  <img src={assetUrl(cat.image)} alt={cat.title} loading="lazy" />
                  <span className="softtex-profile-product-count">{cat.count}</span>
                </div>
                <div className="softtex-profile-product-body">
                  <h4>{cat.title}</h4>
                  <p>{cat.description}</p>
                  <span className="softtex-profile-product-link">
                    Explore styles &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
