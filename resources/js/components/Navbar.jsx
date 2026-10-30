import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, MessageCircle } from 'lucide-react';
import { assetUrl } from '../utils/asset';

export default function Navbar({ onOpenRfq }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [catalogueOpen, setCatalogueOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMobileMenuOpen(false);
    setAboutOpen(false);
    setCatalogueOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setAboutOpen(false);
    setCatalogueOpen(false);
  };

  const handleDropdownClick = (e, type) => {
    // If on mobile screen or mobile menu drawer is open, toggle accordion open/close
    if (window.innerWidth <= 1024 || mobileMenuOpen) {
      e.preventDefault();
      e.stopPropagation();
      if (type === 'about') {
        setAboutOpen((prev) => !prev);
      } else if (type === 'catalogue') {
        setCatalogueOpen((prev) => !prev);
      }
    } else {
      if (type === 'about') navigate('/about/company-profile');
      if (type === 'catalogue') navigate('/catalogue/womens');
    }
  };

  return (
    <>
      {/* TOP EDITORIAL ANNOUNCEMENT BAR */}
      <div className="top softtex-editorial-topbar">
        <div className="w" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
          <span>100% Export-Oriented Garments Manufacturer &amp; Buying House - Quality Our Commitment</span>
        </div>
      </div>

      {/* EDITORIAL STICKY HEADER */}
      <header className="softtex-editorial-header">
        <div className="w softtex-editorial-nav-wrap">
          <Link className="logo softtex-editorial-logo" to="/" onClick={closeMenu}>
            <img src={assetUrl('images/softtex-logo.png')} alt="SOFTTEX FASHIONS WEAR LIMITED" className="softtex-brand-logo-img" />
            <div className="softtex-brand-logo-text">
              <b>SOFTTEX</b>
              <small>FASHIONS WEAR LIMITED</small>
            </div>
          </Link>

          {/* Touch-Friendly Mobile Hamburger Button */}
          <button
            id="mb"
            className="softtex-editorial-menu-toggle"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            type="button"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Navigation Menu */}
          <nav
            id="nav"
            className={`softtex-editorial-nav ${mobileMenuOpen ? 'open' : ''}`}
            aria-label="Main"
          >
            <Link className={location.pathname === '/' ? 'on' : ''} to="/" onClick={closeMenu}>
              Home
            </Link>

            {/* About Us Dropdown / Accordion */}
            <div className={`dd ${aboutOpen ? 'expanded' : ''}`}>
              <div
                className="dd-toggle-wrap"
                onClick={(e) => handleDropdownClick(e, 'about')}
                role="button"
                tabIndex={0}
                aria-expanded={aboutOpen}
                aria-label="Toggle About Us submenu"
              >
                <span className={`dd-title ${location.pathname.startsWith('/about') ? 'on' : ''}`}>
                  About Us
                </span>
                <button
                  type="button"
                  className="mobile-accordion-toggle"
                  aria-label="Toggle About submenu"
                  aria-expanded={aboutOpen}
                  onClick={(e) => handleDropdownClick(e, 'about')}
                >
                  <ChevronDown size={18} className={`accordion-icon ${aboutOpen ? 'rotated' : ''}`} />
                </button>
              </div>
              <div className={`sub ${aboutOpen ? 'show-mobile' : ''}`}>
                <Link to="/about/company-profile" onClick={closeMenu}>Company Profile</Link>
                <Link to="/about/vision" onClick={closeMenu}>Vision &amp; Mission</Link>
                <Link to="/about/management" onClick={closeMenu}>Our Management</Link>
                <Link to="/quality" onClick={closeMenu}>Quality Assurance</Link>
                <Link to="/compliance" onClick={closeMenu}>Sustainability</Link>
              </div>
            </div>

            <Link className={isActive('/services') ? 'on' : ''} to="/services" onClick={closeMenu}>
              Our Services
            </Link>

            {/* Catalogue Dropdown / Accordion */}
            <div className={`dd ${catalogueOpen ? 'expanded' : ''}`}>
              <div
                className="dd-toggle-wrap"
                onClick={(e) => handleDropdownClick(e, 'catalogue')}
                role="button"
                tabIndex={0}
                aria-expanded={catalogueOpen}
                aria-label="Toggle Catalogue submenu"
              >
                <span className={`dd-title ${(location.pathname.startsWith('/catalogue') || location.pathname.startsWith('/products')) ? 'on' : ''}`}>
                  Catalogue
                </span>
                <button
                  type="button"
                  className="mobile-accordion-toggle"
                  aria-label="Toggle Catalogue submenu"
                  aria-expanded={catalogueOpen}
                  onClick={(e) => handleDropdownClick(e, 'catalogue')}
                >
                  <ChevronDown size={18} className={`accordion-icon ${catalogueOpen ? 'rotated' : ''}`} />
                </button>
              </div>
              <div className={`sub ${catalogueOpen ? 'show-mobile' : ''}`}>
                <Link to="/catalogue/womens" onClick={closeMenu}>Women</Link>
                <Link to="/catalogue/mens" onClick={closeMenu}>Men</Link>
                <Link to="/catalogue/kids" onClick={closeMenu}>Children</Link>
              </div>
            </div>

            <Link className={isActive('/compliance') ? 'on' : ''} to="/compliance" onClick={closeMenu}>
              Sustainability
            </Link>

            <Link className={isActive('/contact') ? 'on' : ''} to="/contact" onClick={closeMenu}>
              Contact
            </Link>

            {/* Quote CTA Button */}
            <Link className="btn softtex-nav-cta-btn" to="/contact#terms-conditions" onClick={closeMenu}>
              Request a Quote &rarr;
            </Link>

            {/* Mobile Contact Bar (Visible only inside mobile drawer) */}
            <div className="softtex-mobile-nav-contact">
              <a href="tel:+8801904464294" className="mobile-contact-chip">
                <Phone size={14} />
                <span>+880 1904 464294</span>
              </a>
              <a href="tel:01612844020" className="mobile-contact-chip">
                <Phone size={14} />
                <span>01612 844020</span>
              </a>
              <a
                href="https://wa.me/8801904464294?text=Hello%20Softtex%20Fashions"
                target="_blank"
                rel="noreferrer"
                className="mobile-contact-chip whatsapp"
              >
                <MessageCircle size={14} />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Backdrop overlay for mobile menu drawer */}
      {mobileMenuOpen && (
        <div
          className="softtex-mobile-backdrop"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}
