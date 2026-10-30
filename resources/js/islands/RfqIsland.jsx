import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Send,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  AlertCircle,
  FileText,
  Upload,
  Paperclip,
  Trash2,
  Search,
  Clock,
  ShieldCheck,
  Building2,
  Package,
} from 'lucide-react';

export default function RfqIsland() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('new'); // 'new' | 'track'

  // RFQ Submission State
  const [formData, setFormData] = useState({
    brand_name: '',
    buyer_name: '',
    email: '',
    phone: '',
    country: 'United States',
    product_category: 'Knitwear & Polos',
    target_quantity: 2500,
    target_price_usd: '',
    specifications: '',
  });
  const [techpackFile, setTechpackFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submittedResult, setSubmittedResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // RFQ Tracking State
  const [trackingCode, setTrackingCode] = useState('');
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState(null);
  const [trackingError, setTrackingError] = useState('');

  // Global trigger listener
  useEffect(() => {
    window.openSofttexRfq = (params = null) => {
      if (params) {
        setFormData((prev) => ({
          ...prev,
          brand_name: params.brandName || prev.brand_name,
          country: params.country || prev.country,
          product_category: params.itemType || params.productCategory || prev.product_category,
          target_quantity: params.orderQuantity || prev.target_quantity,
          target_price_usd: params.targetPrice || prev.target_price_usd,
          specifications:
            params.specifications ||
            (params.fabricType
              ? `Fabric: ${params.fabricType}. Selected Style: ${params.itemType || ''}.`
              : prev.specifications),
        }));
      }
      setActiveTab('new');
      setSubmittedResult(null);
      setErrorMsg('');
      setIsOpen(true);
    };

    window.openSofttexTracker = (code = '') => {
      if (code) setTrackingCode(code);
      setActiveTab('track');
      setTrackingError('');
      setIsOpen(true);
    };

    const handleRfqClick = (e) => {
      const target = e.target.closest('[data-open-rfq], a[href="#rfq"]');
      if (target) {
        e.preventDefault();
        const category = target.getAttribute('data-category') || '';
        const item = target.getAttribute('data-item') || '';
        window.openSofttexRfq({
          itemType: item,
          productCategory: category,
        });
      }
    };

    document.addEventListener('click', handleRfqClick);
    return () => {
      document.removeEventListener('click', handleRfqClick);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setSubmittedResult(null);
    setErrorMsg('');
    setTechpackFile(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 26214400) {
        setErrorMsg('File exceeds 25MB limit. Please upload a smaller file or send via email.');
        return;
      }
      setErrorMsg('');
      setTechpackFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const baseUrl = (window.__SOFTTEX_BASE_URL__ || window.__SOF値EX_BASE_URL__ || '').replace(/\/$/, '');

      const payload = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (v !== null && v !== undefined) payload.append(k, v);
      });
      if (techpackFile) {
        payload.append('techpack', techpackFile);
      }

      const res = await fetch(`${baseUrl}/api/rfq`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: payload,
      });

      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setSubmittedResult(data);
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#98642f', '#c4894d', '#10b981', '#0f172a'],
          });
        } catch (e) {}
      } else {
        setErrorMsg(data.message || 'Validation failed. Please check all fields.');
      }
    } catch (err) {
      console.error('RFQ error:', err);
      setErrorMsg('Network error. Please try again or reach us via WhatsApp directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    if (!trackingCode.trim()) return;

    setTrackingLoading(true);
    setTrackingError('');
    setTrackingResult(null);

    try {
      const baseUrl = (window.__SOFTTEX_BASE_URL__ || window.__SOF値EX_BASE_URL__ || '').replace(/\/$/, '');
      const res = await fetch(`${baseUrl}/api/rfq/track/${encodeURIComponent(trackingCode.trim())}`);
      const data = await res.json();

      if (res.ok && data.status === 'success') {
        setTrackingResult(data.data);
      } else {
        setTrackingError(data.message || 'No active inquiry found with this reference.');
      }
    } catch (err) {
      setTrackingError('Failed to query inquiry database. Please check reference code.');
    } finally {
      setTrackingLoading(false);
    }
  };

  if (!isOpen) return null;

  const stageOrder = ['received', 'costing', 'sampling', 'quoted', 'closed'];
  const stageLabels = {
    received: 'Dossier Logged',
    costing: 'Costing & Yield',
    sampling: 'Proto Sampling',
    quoted: 'FOB Offer Sent',
    closed: 'Order Confirmed',
  };

  return (
    <div
      className="softtex-rfq-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(5px)',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={handleClose}
    >
      <div
        className="softtex-rfq-container"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '700px',
          maxHeight: '92vh',
          overflowY: 'auto',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.3)',
          border: '1px solid #e2e8f0',
          padding: '28px',
          fontFamily: 'inherit',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#475569',
            transition: 'background 0.2s',
          }}
          aria-label="Close RFQ Modal"
        >
          <X size={18} />
        </button>

        {/* Tab Switcher: Submit New RFQ vs Track Existing RFQ */}
        <div className="softtex-rfq-tabs" style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '20px' }}>
          <button
            type="button"
            onClick={() => {
              setActiveTab('new');
              setErrorMsg('');
            }}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeTab === 'new' ? '#0f172a' : '#f1f5f9',
              color: activeTab === 'new' ? '#ffffff' : '#64748b',
              transition: 'all 0.2s',
            }}
          >
            Submit Sourcing RFQ &amp; Tech Pack
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('track');
              setTrackingError('');
            }}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeTab === 'track' ? '#0f172a' : '#f1f5f9',
              color: activeTab === 'track' ? '#ffffff' : '#64748b',
              transition: 'all 0.2s',
            }}
          >
            Track Existing RFQ Status
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: NEW SOURCING RFQ SUBMISSION */}
        {/* ============================================================== */}
        {activeTab === 'new' && (
          <div>
            {submittedResult ? (
              /* SUCCESS VIEW */
              <div style={{ textAlign: 'center', padding: '20px 8px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    margin: '0 auto 16px',
                    borderRadius: '50%',
                    background: '#dcfce7',
                    color: '#15803d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  Sourcing RFQ Received!
                </h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto 14px' }}>
                  Official Tracking Code:{' '}
                  <strong style={{ color: '#98642f', fontFamily: 'monospace', fontSize: '1.1rem' }}>
                    {submittedResult.rfq_number}
                  </strong>
                </p>

                {submittedResult.techpack_uploaded && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#ecfdf5',
                      border: '1px solid #a7f3d0',
                      color: '#065f46',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      marginBottom: '16px',
                    }}
                  >
                    <Paperclip size={14} />
                    <span>Tech Pack Attached: {submittedResult.techpack_name}</span>
                  </div>
                )}

                <div
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '16px',
                    marginBottom: '20px',
                    textAlign: 'left',
                    fontSize: '0.88rem',
                    color: '#334155',
                  }}
                >
                  <p style={{ margin: '0 0 6px' }}>
                    ✓ Assigned to <strong>Senior Apparel Merchandiser</strong> (Dhaka Liaison Office)
                  </p>
                  <p style={{ margin: '0 0 6px' }}>
                    ✓ Official FOB Breakdown generated within <strong>24 business hours</strong>
                  </p>
                  <p style={{ margin: 0 }}>
                    ✓ Save your tracking code to monitor real-time costing &amp; sampling status anytime.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {submittedResult.whatsapp_link && (
                    <a
                      href={submittedResult.whatsapp_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: '#25d366',
                        color: '#ffffff',
                        padding: '11px 20px',
                        borderRadius: '10px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                      }}
                    >
                      Chat Direct on WhatsApp
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setTrackingCode(submittedResult.rfq_number);
                      setActiveTab('track');
                      handleTrackSubmit({ preventDefault: () => {} });
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#0f172a',
                      color: '#ffffff',
                      padding: '11px 20px',
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <Search size={16} />
                    <span>Track Dossier Status</span>
                  </button>
                </div>
              </div>
            ) : (
              /* FORM VIEW */
              <div>
                <div style={{ marginBottom: '18px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      background: 'rgba(152, 100, 47, 0.1)',
                      color: '#98642f',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      marginBottom: '6px',
                    }}
                  >
                    SOFTTEX MERCHANDISING DESK
                  </span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>
                    Request Sourcing Quotation &amp; Tech Pack Submission
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
                    Direct factory-gate pricing &bull; AQL 1.5/2.5 assurance &bull; Fast proto turnaround
                  </p>
                </div>

                {errorMsg && (
                  <div
                    style={{
                      background: '#fee2e2',
                      border: '1px solid #f87171',
                      color: '#b91c1c',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      marginBottom: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <AlertCircle size={16} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="softtex-rfq-grid">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Company / Brand Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Zara, U.S. Polo, Forever 21"
                        value={formData.brand_name}
                        onChange={(e) => setFormData({ ...formData, brand_name: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.88rem',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Buyer / Sourcing Lead Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={formData.buyer_name}
                        onChange={(e) => setFormData({ ...formData, buyer_name: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.88rem',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  </div>

                  <div className="softtex-rfq-grid">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="sourcing@yourbrand.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.88rem',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Phone / WhatsApp
                      </label>
                      <input
                        type="text"
                        placeholder="+1 234 567 890"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.88rem',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Product Category *
                      </label>
                      <select
                        value={formData.product_category}
                        onChange={(e) => setFormData({ ...formData, product_category: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.88rem',
                          boxSizing: 'border-box',
                          backgroundColor: '#ffffff',
                        }}
                      >
                        <option value="Knitwear & Polos">Knitwear &amp; Polos</option>
                        <option value="T-Shirts & Hoodies">T-Shirts &amp; Hoodies</option>
                        <option value="Denim & Jeans">Denim &amp; Jeans</option>
                        <option value="Woven Shirts & Pants">Woven Shirts &amp; Pants</option>
                        <option value="Outerwear & Jackets">Outerwear &amp; Jackets</option>
                        <option value="Sweaters & Flatknit">Sweaters &amp; Flatknit</option>
                        <option value="Kids & Infantwear">Kids &amp; Infantwear</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Order Quantity (Pcs) *
                      </label>
                      <input
                        type="number"
                        min="500"
                        step="100"
                        required
                        value={formData.target_quantity}
                        onChange={(e) => setFormData({ ...formData, target_quantity: Number(e.target.value) })}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.88rem',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                        Target FOB Price ($)
                      </label>
                      <input
                        type="number"
                        step="0.05"
                        placeholder="e.g. 4.50"
                        value={formData.target_price_usd}
                        onChange={(e) => setFormData({ ...formData, target_price_usd: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.88rem',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                      Fabric &amp; Technical Specifications *
                    </label>
                    <textarea
                      rows="3"
                      required
                      placeholder="Composition (e.g. 100% Organic BCI Cotton, 220 GSM), colorways, size breakdown, wash standards, target shipment date."
                      value={formData.specifications}
                      onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.88rem',
                        boxSizing: 'border-box',
                        resize: 'vertical',
                      }}
                    ></textarea>
                  </div>

                  {/* TECH PACK ATTACHMENT ZONE */}
                  <div style={{ marginBottom: '18px' }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                      Attach Tech Pack / Measurement Spec Sheet (Optional)
                    </label>
                    <div
                      style={{
                        border: '2px dashed #cbd5e1',
                        borderRadius: '10px',
                        padding: '14px',
                        textAlign: 'center',
                        background: '#f8fafc',
                        cursor: 'pointer',
                        position: 'relative',
                      }}
                    >
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.zip,.rar,.ai,.jpg,.jpeg,.png"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          opacity: 0,
                          cursor: 'pointer',
                          width: '100%',
                          height: '100%',
                        }}
                      />
                      {techpackFile ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                          <Paperclip size={18} color="#98642f" />
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                            {techpackFile.name}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                            ({(techpackFile.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setTechpackFile(null);
                            }}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#ef4444',
                              cursor: 'pointer',
                              padding: '2px',
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                          <Upload size={20} color="#64748b" />
                          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                            Click or drag Tech Pack to upload
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                            Supports PDF, Excel, Word, ZIP, AI, JPG (Max 25MB)
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                    <button
                      type="button"
                      onClick={handleClose}
                      style={{
                        padding: '11px 20px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        background: '#ffffff',
                        color: '#475569',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        border: '1px solid #784b22',
                        background: '#98642f',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        boxShadow: '0 4px 14px rgba(152, 100, 47, 0.35)',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!loading) e.currentTarget.style.background = '#784b22';
                      }}
                      onMouseLeave={(e) => {
                        if (!loading) e.currentTarget.style.background = '#98642f';
                      }}
                    >
                      <Send size={16} />
                      <span>{loading ? 'Transmitting Dossier...' : 'Submit RFQ to Sourcing Desk'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: LIVE RFQ STATUS TRACKER */}
        {/* ============================================================== */}
        {activeTab === 'track' && (
          <div style={{ padding: '8px 0' }}>
            <div style={{ marginBottom: '18px' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
                Track Sourcing Dossier &amp; Costing Workflow
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
                Enter your official RFQ reference code (e.g. <code style={{ color: '#98642f' }}>STX-RFQ-XXXX-2026</code>) to inspect live progress.
              </p>
            </div>

            <form onSubmit={handleTrackSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Enter RFQ Reference Code (e.g. STX-RFQ-1234-2026)"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                  fontFamily: 'monospace',
                }}
              />
              <button
                type="submit"
                disabled={trackingLoading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#0f172a',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: trackingLoading ? 'not-allowed' : 'pointer',
                }}
              >
                <Search size={16} />
                <span>{trackingLoading ? 'Searching...' : 'Track'}</span>
              </button>
            </form>

            {trackingError && (
              <div
                style={{
                  background: '#fee2e2',
                  border: '1px solid #f87171',
                  color: '#b91c1c',
                  padding: '12px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  marginBottom: '16px',
                }}
              >
                {trackingError}
              </div>
            )}

            {trackingResult && (
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '20px',
                  spaceY: '14px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
                      Reference Dossier
                    </span>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 0', fontFamily: 'monospace' }}>
                      {trackingResult.rfq_code}
                    </h4>
                  </div>
                  <span
                    style={{
                      background: '#dbeafe',
                      color: '#1e40af',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      textTransform: 'uppercase',
                    }}
                  >
                    Stage: {stageLabels[trackingResult.status_stage] || trackingResult.status_stage}
                  </span>
                </div>

                {/* Visual Pipeline Stepper */}
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '24px 0', position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '5%',
                      right: '5%',
                      height: '3px',
                      background: '#e2e8f0',
                      zIndex: 1,
                    }}
                  />
                  {stageOrder.map((stage, idx) => {
                    const currentIdx = stageOrder.indexOf(trackingResult.status_stage || 'received');
                    const isPassed = idx <= currentIdx;
                    return (
                      <div
                        key={stage}
                        style={{
                          position: 'relative',
                          zIndex: 2,
                          textAlign: 'center',
                          flex: 1,
                        }}
                      >
                        <div
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            margin: '0 auto 6px',
                            background: isPassed ? '#10b981' : '#ffffff',
                            border: `2px solid ${isPassed ? '#10b981' : '#cbd5e1'}`,
                            color: isPassed ? '#ffffff' : '#64748b',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {isPassed ? '✓' : idx + 1}
                        </div>
                        <div
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: isPassed ? 700 : 500,
                            color: isPassed ? '#0f172a' : '#94a3b8',
                          }}
                        >
                          {stageLabels[stage]}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div
                  className="softtex-rfq-grid"
                  style={{
                    fontSize: '0.85rem',
                    color: '#334155',
                    borderTop: '1px solid #e2e8f0',
                    paddingTop: '14px',
                  }}
                >
                  <div>
                    <span style={{ color: '#64748b' }}>Brand / Company:</span>{' '}
                    <strong>{trackingResult.company_name || 'Individual Sourcing'}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Item Category:</span>{' '}
                    <strong>{trackingResult.product_category}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Target Quantity:</span>{' '}
                    <strong>{trackingResult.order_quantity.toLocaleString()} Pcs</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Submitted On:</span>{' '}
                    <strong>{trackingResult.submitted_at}</strong>
                  </div>
                  {trackingResult.has_techpack && (
                    <div style={{ gridColumn: '1 / -1' }}>
                      <span style={{ color: '#64748b' }}>Attached Tech Pack:</span>{' '}
                      <strong style={{ color: '#98642f' }}>✓ {trackingResult.techpack_name} (Under Review by Pattern Master)</strong>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
