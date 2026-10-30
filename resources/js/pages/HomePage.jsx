import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, ArrowDownToLine, Check, ChevronLeft, ChevronRight, Clock, Globe, Layers, ShieldCheck, Sparkles, SlidersHorizontal, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assetUrl } from '../utils/asset';

const solutionCards = [
  {
    title: 'Product Development & Sampling',
    description: 'From design brief to proto samples: pattern grading, fabric sourcing, trim development, and rapid fit revisions in 5-7 days.',
    image: 'images/collections/product-development-sampling.jpg',
    tag: 'Design & Lab',
    link: '/startup-services',
  },
  {
    title: 'Apparel Sourcing & Merchandising',
    description: 'Direct factory matching across our network of 230+ audited manufacturing facilities in Bangladesh for optimal FOB pricing and capacity.',
    image: 'images/collections/woven-shirts-collection.jpg',
    tag: 'Sourcing Bridge',
    link: '/startup-services',
  },
  {
    title: 'Quality Assurance & Inspection',
    description: 'Rigorous 3-tier inspection protocol: Pre-production, In-line, and Final Random Inspection per strict AQL 1.5 / 2.5 standards.',
    image: 'images/collections/quality-assurance-inspection.jpg',
    tag: 'Zero Defects',
    link: '/startup-services',
  },
  {
    title: 'Production Tracking & Export Logistics',
    description: 'Proactive T&A scheduling, daily milestone updates, shipping documentation, and reliable global container freight export.',
    image: 'images/factory/sewing-garment.jpg',
    tag: 'Global Delivery',
    link: '/startup-services',
  },
];

const productCollections = [
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

const operationalBenchmarks = [
  {
    icon: <Layers size={20} />,
    title: '1.8M+ Units / Month',
    subtitle: 'Production Capacity',
    desc: 'Scalable production capacity across 230+ audited partner units in Dhaka, Gazipur & Narayanganj industrial zones.',
  },
  {
    icon: <Clock size={20} />,
    title: '5 - 7 Working Days',
    subtitle: 'Proto Sampling',
    desc: 'Dedicated rapid development atelier for proto patterns, strike-offs, lab dips and size-sets before bulk commitment.',
  },
  {
    icon: <ShieldCheck size={20} />,
    title: 'AQL 1.5 / 2.5 Level II',
    subtitle: 'Quality Benchmark',
    desc: 'Stationed QA inspectors enforce 100% 4-point fabric inspection, inline audits, and final needle detection.',
  },
  {
    icon: <Globe size={20} />,
    title: '17+ Export Destinations',
    subtitle: 'Global Logistics',
    desc: 'Direct maritime export via Chittagong Sea Port and expedited air cargo from Hazrat Shahjalal International (DAC).',
  },
];

const certificationBadges = [
  { name: 'ACCORD / RSC', logo: 'images/certificatelogos/accord-logo.png', desc: 'Building & Fire Safety' },
  { name: 'BSCI', logo: 'images/certificatelogos/bsci-logo.png', desc: 'Social Compliance' },
  { name: 'OEKO-TEX 100', logo: 'images/certificatelogos/cit-logo.png', desc: 'Harmful Substance Free' },
  { name: 'GOTS', logo: 'images/certificatelogos/gots-log.png', desc: 'Global Organic Textile' },
  { name: 'OCS', logo: 'images/certificatelogos/ocs-logo.jpg', desc: 'Organic Content Standard' },
  { name: 'RCS', logo: 'images/certificatelogos/rcs-logo.jpg', desc: 'Recycled Claim Standard' },
  { name: 'SEDEX SMETA', logo: 'images/certificatelogos/sedex-logo.png', desc: 'Ethical Trade Audits' },
  { name: 'WRAP', logo: 'images/certificatelogos/wrap-logo.png', desc: 'Worldwide Responsible' },
  { name: 'C-TPAT', logo: 'images/certificatelogos/ctpat.jpg', desc: 'Supply Chain Security' },
  { name: 'SGS', logo: 'images/certificatelogos/sgs-logo.png', desc: 'Quality Verification' },
];

const categories = [
  { title: 'Women', path: '/catalogue/womens', tone: 'women' },
  { title: 'Men', path: '/catalogue/mens', tone: 'men' },
  { title: 'Children', path: '/catalogue/kids', tone: 'children' },
];

const processSteps = [
  ['01', 'Understand your brief', 'We discuss your product requirements, target market, target FOB price, GSM, and fabric specifications.'],
  ['02', 'Source the right partners', 'We match each style with specialized, compliant manufacturing units possessing required certifications.'],
  ['03', 'Develop and approve samples', 'We coordinate proto samples, lab dips, strike-offs, fit adjustments, and size-sets until complete approval.'],
  ['04', 'Monitor quality and shipment', 'We conduct inline audits, pre-shipment AQL 1.5 inspections, and coordinate freight forwarding to destination.'],
];

const heroSlides = [
  {
    path: 'images/home-slider/linen-fashion-editorial.jpg',
    alt: 'Minimalist linen fashion editorial',
    hasOverlayText: true,
    headline: <>Quality in Every Detail.<em>Made for Global Markets.</em></>,
    description: 'Thoughtful product development, quality assurance and production coordination for international fashion brands.',
  },
  {
    path: 'images/home-slider/softtex-buying-house-meeting.jpg',
    alt: 'Softtex apparel buying house team reviewing designs and production plans',
    hasOverlayText: false,
  },
  {
    path: 'images/home-slider/softtex-fashions-global-garment-manufacturing-banner.jpg',
    alt: 'Softtex Fashions Global Garment Manufacturing Banner',
    hasOverlayText: false,
  },
  {
    path: 'images/home-slider/softtex-fashions-quality-in-every-stitch.jpg',
    alt: 'Softtex Fashions Quality in Every Stitch',
    hasOverlayText: false,
  },
  {
    path: 'images/home-slider/fashion-atelier.jpg',
    alt: 'Sunlit fashion atelier and clothing design workspace',
    hasOverlayText: true,
    headline: <>From Concept.<em>To Collection.</em></>,
    description: 'We connect your product ideas with dependable apparel manufacturing and sourcing partners in Bangladesh.',
  },
];

const trustNames = {
  buyers: ['U.S. Polo Assn.', 'Eddie Bauer', 'Emart', 'Forever 21', 'Guess', 'Hard Rock', 'Head', 'Home Plus', 'Joy Rich', 'Keith Haring', 'Rich Cotton', 'Skechers', 'Tesco'],
  standards: ['ACCORD', 'BSCI', 'OEKO-TEX', 'C-TPAT', 'GOTS', 'OCS', 'RCS', 'SEDEX', 'SGS', 'WRAP'],
};

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4M9 13h6M9 17h6" />
    </svg>
  );
}

function ServiceIcon({ type }) {
  const paths = {
    development: <><path d="M4 20l1-5L16 4l4 4L9 19z" /><path d="m14 6 4 4" /></>,
    sourcing: <><circle cx="12" cy="6" r="2" /><circle cx="5" cy="18" r="2" /><circle cx="19" cy="18" r="2" /><path d="M12 8v4M12 12l-6 4M12 12l6 4" /></>,
    quality: <><path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z" /><path d="m9 12 2 2 4-4" /></>,
    production: <><path d="M3 20V10l6 3v-3l6 3V6h3v14z" /><path d="M17 6V3h3v3" /></>,
    export: <><path d="M3 15l2 5h14l2-5zM6 15V9h9v6M10 9V5h3" /><path d="M16 5h5m-2-2 2 2-2 2" /></>,
  };

  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[type]}</svg>;
}

export default function HomePage() {
  const [pageData, setPageData] = useState(null);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [heroSlideDirection, setHeroSlideDirection] = useState('next');
  const [isHeroPhotoPaused, setIsHeroPhotoPaused] = useState(false);
  const heroGridRef = useRef(null);
  const previousHeroSlide = useRef(activeHeroSlide);

  const changeHeroSlide = (direction) => {
    setHeroSlideDirection(direction);
    setActiveHeroSlide((current) => (
      direction === 'next'
        ? (current + 1) % heroSlides.length
        : (current - 1 + heroSlides.length) % heroSlides.length
    ));
  };

  useEffect(() => {
    if (isHeroPhotoPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setHeroSlideDirection('next');
      setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [isHeroPhotoPaused]);

  useEffect(() => {
    if (previousHeroSlide.current === activeHeroSlide) return;
    previousHeroSlide.current = activeHeroSlide;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const offset = heroSlideDirection === 'next' ? 36 : -36;
    heroGridRef.current?.animate(
      [
        { opacity: 0, transform: `translateX(${offset}px) scale(0.98)`, filter: 'blur(4px)' },
        { opacity: 1, transform: 'translateX(0) scale(1)', filter: 'blur(0)' },
      ],
      { duration: 700, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    );
  }, [activeHeroSlide, heroSlideDirection]);

  // Universal GPU-accelerated Scroll Reveal Observer
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.softtex-reveal, .softtex-reveal-scale, .softtex-reveal-left, .softtex-reveal-right')
        .forEach((el) => el.classList.add('is-revealed'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1,
    });

    document.querySelectorAll('.softtex-reveal, .softtex-reveal-scale, .softtex-reveal-left, .softtex-reveal-right')
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const base = (window.__SOFTTEX_BASE_URL__ || '').replace(/\/$/, '');
    let active = true;

    fetch(`${base}/api/cms/pages/home`)
      .then((response) => response.ok ? response.json() : null)
      .then((result) => {
        if (active && result?.page) setPageData(result.page);
      })
      .catch(() => {
        // The curated copy remains available when the optional CMS request fails.
      });

    return () => {
      active = false;
    };
  }, []);

  const sections = pageData?.sections_data || {};
  const cmsCounters = Array.isArray(sections.counter_section?.counters)
    ? sections.counter_section.counters
    : [];
  const counters = [
    { value: cmsCounters[0]?.value || '100+', label: 'Garment categories' },
    { value: cmsCounters[1]?.value || '5+', label: 'Years of experience' },
    { value: cmsCounters[2]?.value || '230+', label: 'Manufacturing units' },
    { value: cmsCounters[3]?.value || '17+', label: 'Associated countries' },
  ];

  return (
    <div className="softtex-home-page softtex-editorial-home">
      <section
        className={`softtex-editorial-hero softtex-editorial-hero-fullscreen ${!heroSlides[activeHeroSlide]?.hasOverlayText ? 'is-pure-banner' : ''}`}
        aria-labelledby="home-heading"
        aria-roledescription="carousel"
        aria-label="Softtex fashion highlights"
        onMouseEnter={() => setIsHeroPhotoPaused(true)}
        onMouseLeave={() => setIsHeroPhotoPaused(false)}
        onFocusCapture={() => setIsHeroPhotoPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setIsHeroPhotoPaused(false);
        }}
      >
        {/* Full-bleed background slider layer spanning 100% of the hero section */}
        <div className="softtex-editorial-hero-bg-layer" aria-hidden="true">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.path}
              className={`softtex-editorial-hero-bg-slide ${index === activeHeroSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${assetUrl(slide.path)})` }}
            />
          ))}
          {heroSlides[activeHeroSlide]?.hasOverlayText && (
            <div className="softtex-editorial-hero-overlay" />
          )}
        </div>

        {/* Foreground Content */}
        <div className="softtex-editorial-wrap softtex-editorial-hero-inner">
          {heroSlides[activeHeroSlide]?.hasOverlayText ? (
            <div
              ref={heroGridRef}
              className="softtex-editorial-hero-copy"
              aria-live="polite"
            >
              <p className="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">SOFTTEX FASHIONS WEAR LIMITED</p>
              <h1 id="home-heading">{heroSlides[activeHeroSlide].headline}</h1>
              <p className="softtex-editorial-lead">{heroSlides[activeHeroSlide].description}</p>
              <div className="softtex-editorial-actions">
                <Link className="softtex-editorial-button" to="/services">Explore our capabilities <ArrowRight size={16} /></Link>
                <Link className="softtex-editorial-button softtex-editorial-button-outline" to="/contact">Start a conversation</Link>
              </div>
              <div className="softtex-editorial-values" aria-label="Our commitments">
                <span>Reliable sourcing</span><span>Quality focused</span><span>Long-term partnership</span>
              </div>
            </div>
          ) : (
            <h1 id="home-heading" className="sr-only">SOFTTEX FASHIONS WEAR LIMITED - 100% Export-Oriented Garments Manufacturer &amp; Buying House</h1>
          )}

          {/* Floating Hero Carousel Controls */}
          <div className="softtex-editorial-hero-controls-wrap">
            <div className="softtex-editorial-photo-controls" aria-label="Choose hero slide">
              <button
                type="button"
                aria-label="Previous hero slide"
                onClick={() => changeHeroSlide('prev')}
              >
                <ChevronLeft size={17} aria-hidden="true" />
              </button>
              <div className="softtex-editorial-photo-indicators" aria-label="Choose hero slide">
                {heroSlides.map((slide, index) => (
                  <button
                    type="button"
                    key={slide.path}
                    className={index === activeHeroSlide ? 'active' : ''}
                    aria-label={`Show hero slide ${index + 1}`}
                    aria-current={index === activeHeroSlide ? 'true' : undefined}
                    onClick={() => {
                      setHeroSlideDirection(index > activeHeroSlide ? 'next' : 'prev');
                      setActiveHeroSlide(index);
                    }}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next hero slide"
                onClick={() => changeHeroSlide('next')}
              >
                <ChevronRight size={17} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Capability Strip */}
      <section className="softtex-editorial-service-strip softtex-reveal" aria-label="Our capabilities">
        <div className="softtex-editorial-wrap softtex-editorial-service-grid">
          <div className="softtex-reveal delay-1"><ServiceIcon type="development" /><span>Product<br />development</span></div>
          <div className="softtex-reveal delay-2"><ServiceIcon type="sourcing" /><span>Sourcing &amp;<br />merchandising</span></div>
          <div className="softtex-reveal delay-3"><ServiceIcon type="quality" /><span>Quality<br />assurance</span></div>
          <div className="softtex-reveal delay-4"><ServiceIcon type="production" /><span>Production<br />follow-up</span></div>
          <div className="softtex-reveal delay-5"><ServiceIcon type="export" /><span>Export<br />coordination</span></div>
        </div>
      </section>

      {/* Comprehensive Apparel Solutions (Photographic 4-Card Grid from Mockup 1) */}
      <section className="softtex-editorial-section" id="solutions">
        <div className="softtex-editorial-wrap">
          <div className="softtex-editorial-heading softtex-reveal">
            <p className="softtex-editorial-eyebrow">Our services</p>
            <h2>Comprehensive Apparel Solutions</h2>
            <p>End-to-end supply chain execution from initial tech pack development to compliant factory manufacturing and global export.</p>
          </div>
          <div className="softtex-editorial-solutions-grid">
            {solutionCards.map((card, idx) => (
              <article className={`softtex-editorial-solution-card softtex-reveal delay-${idx + 1}`} key={card.title}>
                <div className="softtex-editorial-solution-img-wrap">
                  <img src={assetUrl(card.image)} alt={card.title} loading="lazy" />
                  <span className="softtex-editorial-solution-tag">{card.tag}</span>
                </div>
                <div className="softtex-editorial-solution-body">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <Link className="softtex-editorial-solution-link" to={card.link}>
                    Learn more <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Start-Up Accelerator Callout Banner */}
          <div className="softtex-startup-banner softtex-reveal">
            <div className="softtex-startup-banner-content">
              <span className="softtex-startup-banner-badge">
                <Zap size={13} />
                <span>Start-Up &amp; Emerging Brands Accelerator</span>
              </span>
              <h3 className="softtex-startup-banner-title">Launching a New Apparel Label? Start with 500-Piece MOQs</h3>
              <p className="softtex-startup-banner-text">
                Enterprise factory-gate pricing, 5-7 day rapid sampling, and on-site AQL 1.5 inspection without the traditional 3,000+ unit barriers.
              </p>
            </div>
            <Link className="softtex-startup-banner-cta" to="/startup-services">
              Explore Start-Up Services <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Versatile Collections for Global Markets (Photographic Category Grid from Mockup 1 & 2) */}
      <section className="softtex-editorial-section softtex-editorial-alt" id="products">
        <div className="softtex-editorial-wrap">
          <div className="softtex-editorial-heading softtex-reveal">
            <p className="softtex-editorial-eyebrow">Our product range</p>
            <h2>Versatile Collections for Global Markets</h2>
            <p>A comprehensive portfolio of sustainably sourced apparel engineered for durability, exact fit, and international retail compliance.</p>
          </div>
          <div className="softtex-editorial-photo-collections-grid">
            {productCollections.map((col, idx) => (
              <Link className={`softtex-editorial-photo-collection-card softtex-reveal delay-${(idx % 4) + 1}`} key={col.title} to={col.path}>
                <div className="softtex-editorial-photo-collection-thumb">
                  <img src={assetUrl(col.image)} alt={col.title} loading="lazy" />
                  <span className="softtex-editorial-photo-collection-count">{col.count}</span>
                </div>
                <div className="softtex-editorial-photo-collection-body">
                  <span className="softtex-editorial-photo-collection-category">{col.category}</span>
                  <h3 className="softtex-editorial-photo-collection-title">
                    {col.title} <ArrowRight size={15} />
                  </h3>
                  <p className="softtex-editorial-photo-collection-desc">{col.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick PDF Catalogue Download Bar for Buyers */}
          <div
            className="softtex-reveal"
            style={{
              marginTop: '36px',
              padding: '24px 28px',
              background: '#ffffff',
              border: '1px solid var(--editorial-line)',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '18px',
              boxShadow: '0 4px 16px rgba(11,26,43,0.04)',
            }}
          >
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--editorial-bronze)', display: 'block', marginBottom: '2px' }}>
                Buyer Resources
              </span>
              <h3 style={{ margin: 0, fontSize: '18px', fontFamily: 'Newsreader, Georgia, serif', color: 'var(--editorial-ink)' }}>
                Download Complete PDF Catalogues
              </h3>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--editorial-muted)' }}>
                Full technical specifications, fabric compositions, and style portfolios ready for offline review.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a
                href={assetUrl('pdf/Softtex_Fashions_Wear_Limited_Womens.pdf')}
                download="Softtex_Fashions_Wear_Limited_Womens.pdf"
                className="softtex-editorial-button"
                style={{ fontSize: '12px', padding: '10px 16px', textDecoration: 'none' }}
              >
                <ArrowDownToLine size={15} /> Women's PDF (1.75 MB)
              </a>
              <a
                href={assetUrl('pdf/Softtex_Fashions_Wear_Limited_Mens.pdf')}
                download="Softtex_Fashions_Wear_Limited_Mens.pdf"
                className="softtex-editorial-button"
                style={{ fontSize: '12px', padding: '10px 16px', textDecoration: 'none' }}
              >
                <ArrowDownToLine size={15} /> Men's PDF (1.48 MB)
              </a>
              <a
                href={assetUrl('pdf/Softtex_Fashions_Wear_Limited_Kids.pdf')}
                download="Softtex_Fashions_Wear_Limited_Kids.pdf"
                className="softtex-editorial-button"
                style={{ fontSize: '12px', padding: '10px 16px', textDecoration: 'none' }}
              >
                <ArrowDownToLine size={15} /> Children's PDF (902 KB)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section: From First Brief to Final Shipment */}
      <section className="softtex-editorial-section softtex-editorial-process-section" id="process">
        <div className="softtex-editorial-wrap">
          <div className="softtex-editorial-heading softtex-reveal">
            <p className="softtex-editorial-eyebrow">Our process</p>
            <h2>From First Brief to Final Shipment</h2>
            <p>A structured, milestone-driven sourcing workflow ensuring complete transparency, cost efficiency, and on-time delivery.</p>
          </div>
          <div className="softtex-editorial-process-grid">
            {processSteps.map(([number, title, description], idx) => (
              <article key={number} className={`softtex-reveal delay-${idx + 1}`}>
                <span className="softtex-editorial-step-number">{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance Section with 3-Image Collage */}
      <section className="softtex-editorial-section softtex-editorial-alt" id="quality">
        <div className="softtex-editorial-wrap softtex-editorial-quality-grid">
          <div className="softtex-reveal-left">
            <p className="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">Quality &amp; responsible sourcing</p>
            <h2>Quality is built into every step.</h2>
            <p>We believe consistent quality comes from clear technical specifications, inline monitoring, and statistically verified inspections. Our on-site QA team enforces AQL 1.5 / 2.5 standards so zero substandard goods leave the factory floor.</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px', marginBottom: '24px' }}>
              <span style={{ fontSize: '11px', fontWeight: 650, color: 'var(--editorial-bronze)', border: '1px solid var(--editorial-line)', padding: '5px 10px', background: '#fff' }}>• 4-Point Fabric Inspection</span>
              <span style={{ fontSize: '11px', fontWeight: 650, color: 'var(--editorial-bronze)', border: '1px solid var(--editorial-line)', padding: '5px 10px', background: '#fff' }}>• AQL 1.5 / 2.5 Level II</span>
              <span style={{ fontSize: '11px', fontWeight: 650, color: 'var(--editorial-bronze)', border: '1px solid var(--editorial-line)', padding: '5px 10px', background: '#fff' }}>• 100% Needle Detection</span>
            </div>
            <Link className="softtex-editorial-button" to="/quality">Learn about our quality process <ArrowRight size={16} /></Link>
          </div>
          <div className="softtex-editorial-quality-collage softtex-reveal-right">
            <img src={assetUrl('images/collections/quality-assurance-inspection.jpg')} alt="Garment quality inspection" loading="lazy" />
            <img src={assetUrl('images/factory/sewing-garment.jpg')} alt="Garment production floor" loading="lazy" />
            <img src={assetUrl('images/collections/woven-shirts-collection.jpg')} alt="Apparel fabric swatches" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Operational Intelligence & Sourcing Benchmarks Dossier */}
      <section className="softtex-editorial-dossier-section" id="capabilities">
        <div className="softtex-editorial-wrap">
          <div className="softtex-editorial-heading softtex-reveal">
            <p className="softtex-editorial-eyebrow">Operational intelligence</p>
            <h2>Manufacturing Capacity &amp; Execution Benchmarks</h2>
            <p>Verifiable manufacturing metrics and standard operating procedures powering dependable supply chains for global brands.</p>
          </div>
          <div className="softtex-editorial-dossier-grid">
            {operationalBenchmarks.map((bench, idx) => (
              <div key={bench.title} className={`softtex-editorial-dossier-card softtex-reveal delay-${idx + 1}`}>
                <div className="softtex-editorial-dossier-icon-wrap">{bench.icon}</div>
                <span className="dossier-subtitle">{bench.subtitle}</span>
                <strong>{bench.title}</strong>
                <p>{bench.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Worldwide Section: Metrics + Brand Showcase + Certification Emblems */}
      <section className="softtex-editorial-section softtex-editorial-alt" id="trust">
        <div className="softtex-editorial-wrap">
          <div className="softtex-editorial-heading softtex-reveal">
            <p className="softtex-editorial-eyebrow">Trusted worldwide</p>
            <h2>Certified Standards &amp; International Compliance</h2>
            <p>Our assigned manufacturing units operate to recognized international compliance benchmarks and ethical sourcing standards worldwide.</p>
          </div>

          <div className="softtex-editorial-metrics softtex-reveal-scale">
            {counters.map((counter, idx) => (
              <div key={counter.label} className={`delay-${idx + 1}`}>
                <strong>{counter.value}</strong>
                <span>{counter.label}</span>
              </div>
            ))}
          </div>

          {/* Real Certification Emblems: Continuous Scrolling Marquee with Enlarged Badges */}
          <div className="softtex-editorial-certs-block softtex-reveal" style={{ marginTop: '48px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
              <div>
                <h3 style={{ marginBottom: '4px' }}>International Compliance &amp; Certifications</h3>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--editorial-muted)' }}>
                  Assigned facilities meet stringent social, chemical, structural and environmental safety standards.
                </p>
              </div>
              <span style={{ fontSize: '11.5px', color: 'var(--editorial-muted)', letterSpacing: '0.04em' }}>
                Audited &amp; Accredited Partner Facilities
              </span>
            </div>
            <div className="softtex-editorial-cert-marquee-wrap" aria-label="International compliance and certification partners marquee">
              <div className="softtex-editorial-cert-marquee-track">
                {[...certificationBadges, ...certificationBadges].map((cert, index) => (
                  <div className="softtex-editorial-cert-big-card" key={`${cert.name}-${index}`}>
                    <div className="softtex-editorial-cert-big-card-logo">
                      <img src={assetUrl(cert.logo)} alt={cert.name} loading="lazy" />
                    </div>
                    <div className="softtex-editorial-cert-big-card-text">
                      <strong>{cert.name}</strong>
                      <span>{cert.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing Inquiry CTA */}
      <section className="softtex-editorial-cta softtex-reveal">
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
