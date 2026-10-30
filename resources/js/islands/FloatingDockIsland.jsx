import React, { useState, useEffect } from 'react';
import { PhoneCall, MessageCircle, ArrowUp, Sparkles } from 'lucide-react';

export default function FloatingDockIsland() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRfq = () => {
    if (typeof window.openSofttexRfq === 'function') {
      window.openSofttexRfq();
    }
  };

  const settings = typeof window !== 'undefined' ? (window.__SOFTTEX_SETTINGS__ || {}) : {};
  const rawWa =
    settings.company_whatsapp ||
    settings.contact_whatsapp ||
    settings.company_phone ||
    settings.contact_phone ||
    '8801904464294';
  const cleanWaNumber = String(rawWa).replace(/[^0-9]/g, '') || '8801904464294';
  const greetingText = encodeURIComponent(
    settings.whatsapp_greeting_text ||
      'Hello Softtex Fashions Sourcing Team, I would like to discuss an apparel manufacturing order.'
  );
  const waUrl = `https://wa.me/${cleanWaNumber}?text=${greetingText}`;

  const rawPhone = settings.company_phone || settings.contact_phone || '+880 1904 464294';
  const telUrl = `tel:${String(rawPhone).replace(/[^\d+]/g, '')}`;

  return (
    <div
      className="softtex-floating-dock softtex-screen-only no-print"
      style={{
        position: 'fixed',
        bottom: 'calc(16px + env(safe-area-inset-bottom))',
        right: 'calc(16px + env(safe-area-inset-right))',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '10px',
        fontFamily: 'inherit',
      }}
    >
      {/* Scroll To Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: '#ffffff',
            color: '#0f172a',
            border: '1px solid #cbd5e1',
            boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.borderColor = '#98642f';
            e.currentTarget.style.color = '#98642f';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = '#cbd5e1';
            e.currentTarget.style.color = '#0f172a';
          }}
        >
          <ArrowUp size={18} />
        </button>
      )}

      {/* Main Glassmorphic Quick Dock */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(16px)',
          padding: '6px 12px',
          borderRadius: '40px',
          boxShadow: '0 12px 32px rgba(15, 23, 42, 0.18)',
          border: '1px solid rgba(203, 213, 225, 0.8)',
        }}
      >
        {/* Instant RFQ Trigger */}
        <button
          onClick={handleOpenRfq}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            minHeight: '44px',
            background: '#98642f',
            color: '#ffffff',
            border: 'none',
            borderRadius: '24px',
            padding: '8px 16px',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(152, 100, 47, 0.3)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.background = '#805225';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(128, 82, 37, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.background = '#98642f';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(152, 100, 47, 0.3)';
          }}
        >
          <Sparkles size={14} color="#f2d49b" />
          <span>Quick RFQ</span>
        </button>

        {/* WhatsApp Lead Channel */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: '#25d366',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            boxShadow: '0 4px 10px rgba(37, 211, 102, 0.3)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <MessageCircle size={18} />
        </a>

        {/* Phone Call */}
        <a
          href={telUrl}
          aria-label="Call Direct"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: '#f1f5f9',
            color: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            border: '1px solid #e2e8f0',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)';
            e.currentTarget.style.color = '#98642f';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.color = '#0f172a';
          }}
        >
          <PhoneCall size={16} />
        </a>
      </div>
    </div>
  );
}
