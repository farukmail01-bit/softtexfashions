import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  ['Product development', 'Turning your design ideas into producible styles.'],
  ['Supplier sourcing', 'Matching each order with an appropriate manufacturing partner.'],
  ['Production planning and follow-up', 'Tracking order progress against agreed milestones.'],
  ['Merchandising', 'Coordinating samples, costing and approvals.'],
  ['Supply chain monitoring', 'Keeping visibility across the supply chain from start to finish.'],
  ['Factory audits', 'Reviewing partner factories against buyer requirements.'],
  ['Quality assurance', 'Coordinating inspections before goods leave the factory.'],
];

const processSteps = [
  ['01', 'Understand your brief', 'We discuss your product requirements, target market and specifications.'],
  ['02', 'Source the right partners', 'We identify and work with suitable factories based on your needs.'],
  ['03', 'Develop and approve samples', 'We coordinate sampling, fit, fabric and details until approval.'],
  ['04', 'Monitor quality and shipment', 'We follow production, conduct quality checks and coordinate shipment to your destination.'],
];

export default function ServicesPage() {
  return (
    <div className="softtex-editorial-page">
      <header className="softtex-page-hero">
        <div className="container">
          <p className="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">Our services</p>
          <h1>From the first sample to the final shipment.</h1>
          <p>We coordinate the work between your product brief, manufacturing partners and the shipment plan.</p>
        </div>
      </header>

      <section className="softtex-editorial-section">
        <div className="softtex-editorial-wrap">
          <div className="softtex-editorial-service-cards">
            {services.map(([title, description], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h2>{title}</h2>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="softtex-editorial-section softtex-editorial-alt">
        <div className="softtex-editorial-wrap">
          <div className="softtex-editorial-heading">
            <p className="softtex-editorial-eyebrow">Our process</p>
            <h2>From first brief to final shipment</h2>
          </div>
          <div className="softtex-editorial-process-grid">
            {processSteps.map(([number, title, description]) => (
              <article key={number}>
                <span className="softtex-editorial-step-number">{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="softtex-editorial-section">
        <div className="softtex-editorial-wrap">
          <div className="softtex-editorial-heading">
            <p className="softtex-editorial-eyebrow">Quality</p>
            <h2>Quality is built into every step.</h2>
            <p>Clear specifications, close production follow-up and careful quality oversight help keep every order aligned with the buyer’s requirements.</p>
          </div>
          <div className="softtex-editorial-principles">
            <article><h3>Quality assurance</h3><p>We coordinate inspections and communicate observations to the relevant production teams.</p></article>
            <article><h3>Lead-time planning</h3><p>Production timing is planned around the style, quantity, material availability and approvals.</p></article>
            <article><h3>Responsible coordination</h3><p>We aim for clear expectations and mutual benefit for buyers and manufacturing partners.</p></article>
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
