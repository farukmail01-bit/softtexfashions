import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        <div className="softtex-editorial-wrap softtex-editorial-content-grid">
          <h2>Who we are</h2>
          <div>
            <p>Softtex Fashions Wear Limited supports apparel buyers with sourcing and manufacturing coordination in Bangladesh. We work between international buyers and garment manufacturers to help move approved product briefs through sampling, production and shipment.</p>
            <p>Our merchandising and quality teams follow orders against buyer-approved specifications, agreed quality requirements and delivery plans. We focus on clear communication and practical coordination throughout the process.</p>
            <p>We support global buyers with finished apparel programmes across knitwear, denim and woven categories.</p>
          </div>
        </div>
      </section>

      <section className="softtex-editorial-section softtex-editorial-alt">
        <div className="softtex-editorial-wrap">
          <div className="softtex-editorial-heading">
            <p className="softtex-editorial-eyebrow">Our mission</p>
            <h2>Long-term partnerships built on clear commitments.</h2>
          </div>
          <p className="softtex-editorial-mission">We work toward mutual benefit for buyers and manufacturing partners, with a consistent focus on quality, on-time delivery and value.</p>
        </div>
      </section>

      <section className="softtex-editorial-section">
        <div className="softtex-editorial-wrap">
          <div className="softtex-editorial-metrics">
            <div><strong>100+</strong><span>Garment categories</span></div>
            <div><strong>5+</strong><span>Years of experience</span></div>
            <div><strong>230+</strong><span>Manufacturing units</span></div>
            <div><strong>17+</strong><span>Associated countries</span></div>
          </div>
          <div className="softtex-editorial-content-grid softtex-editorial-products-intro">
            <h2>What we make</h2>
            <p>We work across babywear, children’s, women’s and men’s clothing, including T-shirts, polo shirts, hoodies, sweatshirts, pants, shorts, skirts, dresses, sportswear, uniforms and custom apparel in knitwear, denim and woven fabrics.</p>
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
