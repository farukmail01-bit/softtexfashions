import React from 'react';
import { Link } from 'react-router-dom';
import { assetUrl } from '../utils/asset';

const productLinks = [
  ['Women', '/catalogue/womens'],
  ['Men', '/catalogue/mens'],
  ['Children', '/catalogue/kids'],
];

export default function Footer() {
  const settings = typeof window !== 'undefined' ? (window.__SOFTTEX_SETTINGS__ || {}) : {};
  const companyName = settings.company_name || settings.site_name || 'SOFTTEX FASHIONS WEAR LIMITED';
  const companyAddress = settings.corporate_address || settings.contact_address ||
    'House # 53/55(3A floor), Road # 20, Nikunja-2, Khilkhet, Dhaka -1229, Bangladesh.';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="softtex-editorial-footer">
      <div className="w softtex-editorial-footer-grid">
        <div className="softtex-editorial-footer-brand">
          <Link className="logo softtex-editorial-logo" to="/" aria-label={`${companyName} home`}>
            <div className="softtex-footer-logo-badge">
              <img src={assetUrl('images/softtex-logo.png')} alt="SOFTTEX FASHIONS WEAR LIMITED" className="softtex-brand-logo-img" />
            </div>
            <div className="softtex-brand-logo-text">
              <b style={{ color: '#fff' }}>SOFTTEX</b>
              <small style={{ color: '#9fb0c4' }}>FASHIONS WEAR LIMITED</small>
            </div>
          </Link>
          <p>
            A 100% export-oriented garments manufacturer and buying house in Bangladesh, working with global fashion brands through reliable sourcing, quality control and professional production coordination.
          </p>
        </div>

        <div className="softtex-editorial-footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about/company-profile">About Us</Link></li>
            <li><Link to="/catalogue/womens">Catalogue</Link></li>
            <li><Link to="/services">Our Services</Link></li>
            <li><Link to="/compliance">Sustainability</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="softtex-editorial-footer-column">
          <h4>Apparel Catalogue</h4>
          <ul>
            {productLinks.map(([label, path]) => (
              <li key={path}><Link to={path}>{label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="softtex-editorial-footer-column">
          <h4>Contact Us</h4>
          <ul>
            <li>{companyAddress}</li>
            <li><Link to="/contact">Contact page</Link></li>
          </ul>
        </div>
      </div>

      <div className="fb softtex-editorial-footer-bottom">
        <div className="w" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', width: '100%' }}>
          <span>© {currentYear} {companyName}. All Rights Reserved.</span>
          <span>Quality Our Commitment</span>
        </div>
      </div>
    </footer>
  );
}
