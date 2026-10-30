import React, { useEffect, useState } from 'react';
import { Mail, MapPin, Phone, MessageCircle, ArrowUpRight, Check } from 'lucide-react';
import { businessTerms } from '../data/businessTerms';

export default function ContactPage() {
  const [pageData, setPageData] = useState(null);
  const settings = typeof window !== 'undefined' ? (window.__SOFTTEX_SETTINGS__ || {}) : {};

  useEffect(() => {
    let mounted = true;
    const base = (window.__SOFTTEX_BASE_URL__ || '').replace(/\/$/, '');

    fetch(`${base}/api/cms/pages/contact`)
      .then((response) => response.ok ? response.json() : null)
      .then((json) => {
        if (mounted && json?.page) setPageData(json.page);
      })
      .catch(() => {
        if (mounted) setPageData(null);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const office = pageData?.sections_data || {};
  const rawEmail = office.office_email || settings.company_email || settings.contact_email || 'info@softtexfashions.com';
  const email = rawEmail.includes('bashir@') ? 'info@softtexfashions.com' : rawEmail;
  const phone = office.office_phone || settings.company_phone || settings.contact_phone || '+880 1904 464294';
  const tel = office.office_tel || settings.contact_tel || '01612 844020';
  const whatsapp = settings.company_whatsapp || settings.contact_whatsapp || phone;
  const whatsappNumber = whatsapp.replace(/[^\d]/g, '');
  const address = office.office_address || settings.corporate_address || settings.contact_address ||
    'House # 53/55(3A floor), Road # 20, Nikunja-2, Khilkhet, Dhaka -1229, Bangladesh.';

  return (
    <div className="softtex-contact-page">
      <header className="softtex-page-hero">
        <div className="container">
          <p className="softtex-eyebrow">Talk to our sourcing team</p>
          <h1>Let&apos;s make your next collection.</h1>
          <p>Clear communication, transparent order terms and a dedicated team in Bangladesh.</p>
        </div>
      </header>

      <section className="container softtex-contact-layout" aria-label="Contact information and order terms">
        <div className="softtex-contact-card">
          <p className="softtex-eyebrow">SOFTTEX FASHIONS WEAR LIMITED</p>
          <h2>Contact our team</h2>
          <p className="softtex-muted">For new enquiries, sampling and production discussions.</p>

          <a className="softtex-contact-method" href={`mailto:${email}`}>
            <span className="softtex-contact-icon"><Mail size={20} /></span>
            <span><small>Email</small><strong>{email}</strong></span>
            <ArrowUpRight size={17} />
          </a>
          <a className="softtex-contact-method" href={`tel:${phone.replace(/[^\d+]/g, '')}`}>
            <span className="softtex-contact-icon"><Phone size={20} /></span>
            <span><small>Mobile</small><strong>{phone}</strong></span>
            <ArrowUpRight size={17} />
          </a>
          <a className="softtex-contact-method" href={`tel:${tel.replace(/[^\d+]/g, '')}`}>
            <span className="softtex-contact-icon"><Phone size={20} /></span>
            <span><small>Telephone</small><strong>{tel}</strong></span>
            <ArrowUpRight size={17} />
          </a>
          <div className="softtex-contact-method">
            <span className="softtex-contact-icon"><MapPin size={20} /></span>
            <span><small>Bangladesh office</small><strong>{address}</strong></span>
          </div>

          <div className="softtex-uk-office">
            <div>
              <p className="softtex-eyebrow">UK MARKETING OFFICE</p>
              <h3>Yusuf <span>· WhatsApp</span></h3>
              <p>Message our WhatsApp desk and ask to speak with Yusuf.</p>
            </div>
            <a
              className="softtex-button softtex-button-outline"
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello, I would like to speak with Yusuf about the UK marketing office.')}`}
              target="_blank"
              rel="noreferrer"
            >
              Message on WhatsApp <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <aside className="softtex-contact-note">
          <p className="softtex-eyebrow">A straightforward process</p>
          <h2>From tech pack to shipment.</h2>
          <p>Share your product brief and target delivery window. Our team will confirm feasibility, pricing and the production schedule before an order is placed.</p>
          <a className="softtex-button softtex-button-primary" href={`mailto:${email}?subject=${encodeURIComponent('Apparel production enquiry')}`}>
            Start an enquiry <ArrowUpRight size={17} />
          </a>
        </aside>
      </section>

      <section className="softtex-terms-section" id="terms-conditions">
        <div className="container">
          <div className="softtex-section-heading">
            <p className="softtex-eyebrow">Order information</p>
            <h2>Terms &amp; Conditions</h2>
            <p>Please review these commercial terms before confirming an order.</p>
          </div>
          <ol className="softtex-terms-list">
            {businessTerms.map((term) => (
              <li key={term}><Check size={17} aria-hidden="true" /><span>{term}</span></li>
            ))}
          </ol>
          <p className="softtex-terms-note">Order specifications, final pricing and confirmed delivery dates will be documented in the order confirmation.</p>
        </div>
      </section>
    </div>
  );
}
