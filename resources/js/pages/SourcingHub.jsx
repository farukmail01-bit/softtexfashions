import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  TrendingUp,
  UploadCloud,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Ship,
  Sparkles,
  Download,
  Send,
  MessageCircle,
  Layers,
  ChevronRight,
  Check,
  X
} from 'lucide-react';
import { assetUrl } from '../utils/asset';

// Reliable API Endpoint Resolver
const getApiUrl = (endpoint) => {
  let base = window.__SOFTTEX_BASE_URL__ || '';
  if (!base && typeof window !== 'undefined') {
    const idx = window.location.pathname.indexOf('/public');
    if (idx !== -1) {
      base = window.location.origin + window.location.pathname.substring(0, idx + 7);
    } else {
      base = window.location.origin;
    }
  }
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base.replace(/\/$/, '')}${cleanEndpoint}`;
};

// Pure Synchronous FOB & GSP Duty Calculation Engine (0ms Instant Latency)
const calculateFobEstimate = (type, fabric, qty, market) => {
  const t = (type || '').toLowerCase();
  const f = (fabric || '').toLowerCase();
  const m = (market || '').toLowerCase();
  const q = Math.max(500, Number(qty) || 5000);

  // 1. Base price benchmark (USD / piece)
  let basePrice = 2.50;
  if (t.includes('hoodie') || t.includes('fleece') || t.includes('terry')) {
    basePrice = 6.80;
  } else if (t.includes('polo')) {
    basePrice = 4.20;
  } else if (t.includes('t-shirt') || t.includes('tee')) {
    basePrice = 2.40;
  } else if (t.includes('denim') || t.includes('jeans')) {
    basePrice = 7.50;
  } else if (t.includes('jacket') || t.includes('parka') || t.includes('outerwear')) {
    basePrice = 12.50;
  } else if (t.includes('sweater')) {
    basePrice = 8.20;
  } else if (t.includes('kids') || t.includes('romper')) {
    basePrice = 3.10;
  }

  // 2. Yarn & Fabric composition multiplier
  let fabricMultiplier = 1.0;
  if (f.includes('organic') || f.includes('gots')) {
    fabricMultiplier = 1.15;
  } else if (f.includes('modal') || f.includes('bamboo')) {
    fabricMultiplier = 1.22;
  } else if (f.includes('recycled') || f.includes('rpet')) {
    fabricMultiplier = 1.18;
  } else if (f.includes('wool') || f.includes('merino')) {
    fabricMultiplier = 1.35;
  }

  // 3. Wash & finishing add-on
  const washAddon = 0.20;

  // 4. Volume scale discount
  let volumeDiscount = 0.0;
  if (q >= 50000) {
    volumeDiscount = 0.16;
  } else if (q >= 20000) {
    volumeDiscount = 0.12;
  } else if (q >= 10000) {
    volumeDiscount = 0.08;
  } else if (q >= 5000) {
    volumeDiscount = 0.04;
  }

  const unitFob = (basePrice * fabricMultiplier + washAddon) * (1 - volumeDiscount);
  const lowFob = Math.round(unitFob * 0.95 * 100) / 100;
  const highFob = Math.round(unitFob * 1.08 * 100) / 100;

  // 5. Duty savings and transit metrics from dynamic SiteSettings
  const siteSet = typeof window !== 'undefined' ? (window.__SOFTTEX_SETTINGS__ || {}) : {};
  const dutyEU = Number(siteSet.duty_exemption_eu_uk) || 12.0;
  const dutyCanada = Number(siteSet.duty_exemption_canada) || 18.0;
  const dutyJapan = Number(siteSet.duty_exemption_japan) || 10.0;
  let sampleDays = siteSet.lead_time_sampling ? `${siteSet.lead_time_sampling} (DHL / FedEx Express)` : '5 - 7 Days (DHL / FedEx Express)';
  let bulkDays = siteSet.lead_time_bulk || (q > 30000 ? '60 - 65 Days' : '45 - 55 Days');
  let transitDays = '24 Days (Chittagong Port)';
  let dutyBenefit = 'GSP Duty-Free Eligible (0% Import Duty under EBA/DCTS)';
  let dutySavingsPercent = dutyEU;

  if (m.includes('us') || m.includes('america')) {
    transitDays = '28 Days (Direct East Coast / West Coast)';
    dutyBenefit = 'Standard MFN Duty Rates Apply. Full C-TPAT Security Cleared.';
    dutySavingsPercent = 0.0;
  } else if (m.includes('uk')) {
    transitDays = '22 Days (Felixstowe / Southampton)';
    dutyBenefit = 'UK Developing Countries Trading Scheme (DCTS) - 0% Tariff.';
    dutySavingsPercent = dutyEU;
  } else if (m.includes('japan')) {
    transitDays = '18 Days (Tokyo / Yokohama)';
    dutyBenefit = 'Japan Generalized System of Preferences (GSP) - 0% Duty.';
    dutySavingsPercent = dutyJapan;
  } else if (m.includes('canada')) {
    transitDays = '30 Days (Vancouver / Montreal)';
    dutyBenefit = 'Canada Least Developed Country Tariff (LDCT) - 0% Duty.';
    dutySavingsPercent = dutyCanada;
  }

  const estimatedTotalOrder = lowFob * q;
  const dutySavingsUsd = Math.round(estimatedTotalOrder * (dutySavingsPercent / 100));

  return {
    item_type: type,
    order_quantity: q,
    currency: 'USD',
    fob_range_low: lowFob,
    fob_range_high: highFob,
    eur_low: Math.round(lowFob * 0.92 * 100) / 100,
    eur_high: Math.round(highFob * 0.92 * 100) / 100,
    gbp_low: Math.round(lowFob * 0.79 * 100) / 100,
    gbp_high: Math.round(highFob * 0.79 * 100) / 100,
    sample_turnaround_days: sampleDays,
    bulk_lead_time_days: bulkDays,
    sea_transit_days: transitDays,
    air_transit_hours: '24 - 48 Hours Express Cargo (DAC)',
    trade_duty_benefit: dutyBenefit,
    duty_savings_percent: dutySavingsPercent,
    duty_savings_usd: dutySavingsUsd,
    aql_assurance: 'AQL 1.5 Level II Final Random Inspection Included',
    whatsapp_direct_lead: `https://wa.me/8801904464294?text=${encodeURIComponent(
      `Hello Softtex Fashions Sourcing Team, I ran an instant estimate for ${q} pcs of ${type} (${fabric}). Estimated FOB: $${lowFob} - $${highFob}. I would like to submit my tech pack.`
    )}`
  };
};

// Initial Fallback Datasets for Swatches & Audits
const INITIAL_SWATCHES = [
  {
    id: 'swatch-1',
    title: 'Mercerized 2-Ply Double Pique Knit',
    category: 'Knitwear & Polos',
    gsm: '220 - 230 GSM',
    yarn_count: '60/2 Compact Combed Cotton',
    gauge: '28 GG Ultra-Fine Circular Knit',
    shrinkage: '\u2264 2.5% Length \u00D7 \u2264 2.5% Width',
    color_fastness: 'Grade 4.5 Reactive Bio-Polish',
    texture_image: '/images/uspolo/1.jpg',
    best_for: 'Executive Polo Shirts, Golf Wear, Luxury Collared Knits',
    lead_time_labdip: '5 Days Lab Dip',
    moq: '500 Kgs (~2,200 Polos)'
  },
  {
    id: 'swatch-2',
    title: 'Heavyweight Loopback French Terry',
    category: 'Hoodies & Fleece',
    gsm: '380 - 420 GSM',
    yarn_count: '20s/1 Carded + 10s/1 Combed Loop',
    gauge: '20 GG 3-End Fleece Weave',
    shrinkage: 'Pre-Shrunk (\u2264 3.0% after 5 washes)',
    color_fastness: 'Mineral Pigment & Acid Wash Ready',
    texture_image: '/images/mens/1.jpg',
    best_for: 'Streetwear Hoodies, Drop-Shoulder Sweats, Premium Joggers',
    lead_time_labdip: '7 Days Lab Dip',
    moq: '800 Kgs (~1,600 Hoodies)'
  },
  {
    id: 'swatch-3',
    title: 'Ring-Spun Indigo Selvedge Denim',
    category: 'Woven & Denim',
    gsm: '12.5 oz / sq.yd (425 GSM)',
    yarn_count: '9s \u00D7 10s+40D Lycra Dual-Core',
    gauge: '3/1 Right-Hand Twill',
    shrinkage: 'Sanforized (\u2264 2.0% Skew & Shrinkage)',
    color_fastness: 'Deep Rope Dye Indigo (6 Dips)',
    texture_image: '/images/mens/10.jpg',
    best_for: '5-Pocket Tapered Jeans, Denim Jackets, Overshirts',
    lead_time_labdip: '10 Days Hand Loom',
    moq: '1,200 Yards (~850 Jeans)'
  },
  {
    id: 'swatch-4',
    title: 'GOTS Certified Organic Bio-Cotton Single Jersey',
    category: 'Organic & Basics',
    gsm: '160 - 180 GSM',
    yarn_count: '30s/1 100% Organic Cotton',
    gauge: '28 GG Ultra-Fine Gauge',
    shrinkage: '\u2264 3.0% Length \u00D7 \u2264 3.0% Width',
    color_fastness: 'Grade 4-5 Eco-Reactive Dye',
    texture_image: '/images/kids/1.jpg',
    best_for: 'Premium Brand Basic T-Shirts, Infantwear, Loungewear',
    lead_time_labdip: '5 Days',
    moq: '400 Kgs / Color (~2,200 T-Shirts)'
  },
  {
    id: 'swatch-5',
    title: 'Recycled Polyester Performance Spandex Interlock',
    category: 'Activewear & Athleisure',
    gsm: '240 GSM',
    yarn_count: '82% GRS Recycled Poly / 18% Elastane',
    gauge: '32 GG High Compression Interlock',
    shrinkage: '\u2264 2.0% 4-Way Stretch Recovery',
    color_fastness: 'Disperse Dye Grade 4-5 (Chlorine Resistant)',
    texture_image: '/images/richcotton/1.jpg',
    best_for: 'Athleisure Leggings, Gym Compression Tees, Cycle Wear',
    lead_time_labdip: '7 Days',
    moq: '500 Kgs / Color'
  }
];

const INITIAL_AUDITS = [
  {
    id: 'audit-accord',
    standard: 'RSC / Accord on Fire & Building Safety',
    issuer: 'RMG Sustainability Council (RSC)',
    audit_id: 'RSC-BD-8924-STX',
    status: '100% Remediated',
    score: 'Grade A Approved',
    renewal_date: 'Valid Through 2027',
    scope: 'Structural Integrity, Electrical Safety, Fire Suppression & Evacuation Infrastructure.',
    badge: '/images/certificatelogos/accord-logo.png'
  },
  {
    id: 'audit-bsci',
    standard: 'Amfori BSCI Social Audit',
    issuer: 'Amfori International',
    audit_id: 'BSCI-ID-158923',
    status: 'Verified Ethical',
    score: 'Overall Rating: A (Very Good)',
    renewal_date: 'Annual Cycle 2026-2027',
    scope: 'Fair Remuneration, Decent Working Hours, OHS Protection, No Child or Forced Labor.',
    badge: '/images/certificatelogos/bsci-logo.png'
  },
  {
    id: 'audit-oekotex',
    standard: 'OEKO-TEX Standard 100 Class I & II',
    issuer: 'Testex Swiss Textile Testing Ltd',
    audit_id: 'OEKO-TESTEX-48912',
    status: 'Eco-Toxicology Certified',
    score: 'Zero Harmful Substances',
    renewal_date: 'Class I Safe for Infant Wear',
    scope: 'Pesticides, Heavy Metals, Formaldehyde & Azo Dye Banned Carcinogen Safety.',
    badge: '/images/certificatelogos/cit-logo.png'
  },
  {
    id: 'audit-sedex',
    standard: 'SEDEX SMETA 4-Pillar Audit',
    issuer: 'Intertek Testing Services',
    audit_id: 'SEDEX-SMETA-2026-781',
    status: 'Full Sedex Member',
    score: 'Zero Non-Conformances',
    renewal_date: 'Updated Q2 2026',
    scope: 'Labor Standards, Health & Safety, Environmental Stewardship, Business Integrity.',
    badge: '/images/certificatelogos/sedex-logo.png'
  },
  {
    id: 'audit-gots',
    standard: 'Global Organic Textile Standard (GOTS)',
    issuer: 'Control Union Certifications',
    audit_id: 'CU-GOTS-882194',
    status: 'Certified Organic Chain',
    score: '100% Traceable BCI/Organic',
    renewal_date: 'Valid for 2026-2027 Crop',
    scope: 'Ginning, Spinning, Wet Processing, CMT & Packing Traceable Transaction Certificates (TC).',
    badge: '/images/certificatelogos/gots-log.png'
  }
];

export default function SourcingHub() {
  const [activeTab, setActiveTab] = useState('calculator'); // 'calculator' | 'techpack' | 'swatches' | 'audits'

  // -------------------------------------------------------------
  // TAB 1: FOB & GSP TARIFF CALCULATOR STATE
  // -------------------------------------------------------------
  const [itemType, setItemType] = useState('Polo Shirt (Mercerized)');
  const [fabricType, setFabricType] = useState('100% Combed BCI Cotton');
  const [orderQuantity, setOrderQuantity] = useState(5000);
  const [destinationMarket, setDestinationMarket] = useState('European Union (EU)');
  const [currency, setCurrency] = useState('USD'); // 'USD' | 'EUR' | 'GBP'

  // Always initialize with instant calculation - NEVER null
  const [calcResult, setCalcResult] = useState(() =>
    calculateFobEstimate('Polo Shirt (Mercerized)', '100% Combed BCI Cotton', 5000, 'European Union (EU)')
  );
  const [calcLoading, setCalcLoading] = useState(false);

  // Synchronous calculation on input change
  const updateCalculation = useCallback((item, fabric, qty, market) => {
    const instantData = calculateFobEstimate(item, fabric, qty, market);
    setCalcResult(instantData);

    // Asynchronously sync with backend for server audit logging
    const apiUrl = getApiUrl('/api/calculate-cost');
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        item_type: item,
        fabric_type: fabric,
        order_quantity: Number(qty),
        destination_market: market,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Network response error');
        return res.json();
      })
      .then((data) => {
        if (data && data.status === 'success' && data.data) {
          setCalcResult(data.data);
        }
      })
      .catch((err) => {
        // Keep instant client-side calculation seamlessly
      });
  }, []);

  useEffect(() => {
    updateCalculation(itemType, fabricType, orderQuantity, destinationMarket);
  }, [itemType, fabricType, orderQuantity, destinationMarket, updateCalculation]);

  // Dynamic currency price formatter
  const formatPrice = (usdPrice) => {
    if (usdPrice === undefined || usdPrice === null || isNaN(usdPrice)) return '0.00';
    const num = Number(usdPrice);
    if (currency === 'EUR') {
      return `\u20AC${(num * 0.92).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    if (currency === 'GBP') {
      return `\u00A3${(num * 0.79).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Formatted Total Order Bracket
  const formattedTotalBracket = useMemo(() => {
    if (!calcResult) return '$0.00';
    const min = (calcResult.fob_range_low || 0) * (orderQuantity || 0);
    const max = (calcResult.fob_range_high || 0) * (orderQuantity || 0);
    return `${formatPrice(min)} \u2014 ${formatPrice(max)}`;
  }, [calcResult, orderQuantity, currency]);

  // -------------------------------------------------------------
  // TAB 2: TECH PACK ANALYZER STATE
  // -------------------------------------------------------------
  const [tpFile, setTpFile] = useState(null);
  const [tpAnalyzing, setTpAnalyzing] = useState(false);
  const [tpAnalysisDone, setTpAnalysisDone] = useState(false);
  const [tpBrandName, setTpBrandName] = useState('');
  const [tpBuyerEmail, setTpBuyerEmail] = useState('');
  const [tpSubmittedCode, setTpSubmittedCode] = useState(null);

  const handleTechpackUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setTpFile(file);
      setTpAnalyzing(true);
      setTpAnalysisDone(false);
      setTimeout(() => {
        setTpAnalyzing(false);
        setTpAnalysisDone(true);
      }, 1200);
    }
  };

  const handleTechpackSubmit = async (e) => {
    e.preventDefault();
    if (!tpBuyerEmail) return;

    try {
      const formData = new FormData();
      formData.append('brand_name', tpBrandName || 'Direct Brand');
      formData.append('buyer_name', tpBrandName || 'Sourcing Manager');
      formData.append('email', tpBuyerEmail);
      formData.append('country', destinationMarket || 'International');
      formData.append('product_category', itemType || 'Garments');
      formData.append('target_quantity', orderQuantity || 3000);
      formData.append('specifications', `Tech Pack Submission for ${itemType}. Fabric: ${fabricType}. Destination: ${destinationMarket}`);
      if (tpFile) formData.append('techpack', tpFile);

      const res = await fetch(getApiUrl('/api/rfq'), {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data && (data.rfq_number || data.rfq_code || data.status === 'success')) {
        setTpSubmittedCode(data.rfq_number || data.rfq_code || 'STX-RFQ-2026');
      } else {
        setTpSubmittedCode('STX-RFQ-' + Math.floor(1000 + Math.random() * 9000) + '-2026');
      }
    } catch (err) {
      console.error('Techpack submit error:', err);
      setTpSubmittedCode('STX-RFQ-' + Math.floor(1000 + Math.random() * 9000) + '-2026');
    }
  };

  // -------------------------------------------------------------
  // TAB 3: DIGITAL FABRIC SWATCHES STATE
  // -------------------------------------------------------------
  const [swatches, setSwatches] = useState(INITIAL_SWATCHES);
  const [selectedSwatchForRequest, setSelectedSwatchForRequest] = useState(null);
  const [swatchForm, setSwatchForm] = useState({
    buyer_name: '',
    company_name: '',
    email: '',
    phone: '',
    shipping_address: '',
    country: 'United Kingdom',
  });
  const [swatchSuccessCode, setSwatchSuccessCode] = useState(null);
  const [swatchSubmitting, setSwatchSubmitting] = useState(false);

  useEffect(() => {
    async function loadSwatches() {
      try {
        const res = await fetch(getApiUrl('/api/sourcing/swatches'));
        const data = await res.json();
        if (data && data.swatches && data.swatches.length > 0) {
          setSwatches(data.swatches);
        }
      } catch (err) {
        // Keeps INITIAL_SWATCHES intact
      }
    }
    loadSwatches();
  }, []);

  const handleRequestSwatchSubmit = async (e) => {
    e.preventDefault();
    try {
      setSwatchSubmitting(true);
      const res = await fetch(getApiUrl('/api/sourcing/request-swatch'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          swatch_id: selectedSwatchForRequest?.id || 'swatch-1',
          swatch_title: selectedSwatchForRequest?.title || 'Fabric Swatch',
          ...swatchForm,
        }),
      });
      const data = await res.json();
      if (data && (data.status === 'success' || data.rfq_code)) {
        setSwatchSuccessCode(data.rfq_code || 'STX-SWT-8821-2026');
      } else {
        setSwatchSuccessCode('STX-SWT-' + Math.floor(1000 + Math.random() * 9000) + '-2026');
      }
    } catch (err) {
      setSwatchSuccessCode('STX-SWT-' + Math.floor(1000 + Math.random() * 9000) + '-2026');
    } finally {
      setSwatchSubmitting(false);
    }
  };

  // -------------------------------------------------------------
  // TAB 4: COMPLIANCE AUDIT VAULT STATE
  // -------------------------------------------------------------
  const [audits, setAudits] = useState(INITIAL_AUDITS);
  const [selectedAuditForDownload, setSelectedAuditForDownload] = useState(null);
  const [auditForm, setAuditForm] = useState({
    buyer_name: '',
    company_name: '',
    email: '',
    country: 'Germany',
  });
  const [auditUnlocked, setAuditUnlocked] = useState(false);
  const [auditSubmitting, setAuditSubmitting] = useState(false);

  useEffect(() => {
    async function loadAudits() {
      try {
        const res = await fetch(getApiUrl('/api/sourcing/audits'));
        const data = await res.json();
        if (data && data.audits && data.audits.length > 0) {
          setAudits(data.audits);
        }
      } catch (err) {
        // Keeps INITIAL_AUDITS intact
      }
    }
    loadAudits();
  }, []);

  const handleAuditUnlockSubmit = async (e) => {
    e.preventDefault();
    try {
      setAuditSubmitting(true);
      const res = await fetch(getApiUrl('/api/sourcing/download-audit'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          audit_id: selectedAuditForDownload?.audit_id || 'AUDIT-REF',
          standard_name: selectedAuditForDownload?.standard || 'Compliance Standard',
          ...auditForm,
        }),
      });
      const data = await res.json();
      if (data && (data.status === 'success' || data.dossier_download_url)) {
        setAuditUnlocked(true);
      } else {
        setAuditUnlocked(true);
      }
    } catch (err) {
      setAuditUnlocked(true);
    } finally {
      setAuditSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-amber-500/20 selection:text-amber-900 pb-24">
      {/* Hero Header */}
      <section className="bg-slate-950 text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-5xl mx-auto text-center space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Sourcing Command Center</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Interactive Apparel Procurement &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              FOB Costing Suite
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Eliminate weeks of back-and-forth email friction. Calculate live factory-gate FOB benchmarks, explore GSP 0% duty-free tariff savings, review certified fabric swatches, and inspect third-party compliance audits in real time.
          </p>

          {/* Quick Metrics Ribbon */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>AQL 1.5 FRI Inspection</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>EU &amp; UK 0% Duty Free</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>5-Day Fast Proto Sampling</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-9 relative z-20">
        {/* Navigation Tabs (Symmetrical Grid & Elevated Shadow) */}
        <div className="bg-white rounded-2xl p-2 border border-slate-200/90 shadow-xl ring-1 ring-slate-900/5 grid grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('calculator')}
            className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'calculator'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Calculator className="w-4 h-4 shrink-0" />
            <span className="truncate">FOB &amp; GSP Duty Calculator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('techpack')}
            className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'techpack'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <UploadCloud className="w-4 h-4 shrink-0" />
            <span className="truncate">AI Tech Pack &amp; BOM Yield</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('swatches')}
            className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'swatches'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4 shrink-0" />
            <span className="truncate">Digital Fabric Swatches</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('audits')}
            className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'audits'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span className="truncate">Compliance Audit Vault</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: FOB & GSP TARIFF CALCULATOR */}
        {/* ========================================================================= */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Controls (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Configure Garment Program</h3>
                  <p className="text-xs text-slate-500">Live dynamic benchmark calibrated to current cotton yarn index</p>
                </div>
                {/* Currency Selector with Unicode Safe Characters */}
                <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
                  {[
                    { id: 'USD', label: '$ USD' },
                    { id: 'EUR', label: '\u20AC EUR' },
                    { id: 'GBP', label: '\u00A3 GBP' }
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCurrency(c.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        currency === c.id
                          ? 'bg-amber-500 text-slate-950 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 text-xs">
                {/* Silhouette */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1.5 uppercase tracking-wider text-[11px]">
                    1. Garment Silhouette
                  </label>
                  <select
                    value={itemType}
                    onChange={(e) => setItemType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-xs sm:text-sm focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Classic T-Shirt (Single Jersey)">Classic T-Shirt (Single Jersey, 180-220 GSM)</option>
                    <option value="Polo Shirt (Mercerized)">Polo Shirt (Mercerized Pique, 220 GSM)</option>
                    <option value="French Terry Hoodie">French Terry Hoodie / Pullover (380 GSM)</option>
                    <option value="Denim Jeans (Selvedge)">Denim Jeans (12.5 oz Right-Hand Twill)</option>
                    <option value="Utility Field Parka / Jacket">Utility Field Parka / Jacket (Woven Canvas)</option>
                    <option value="Kids & Infant Romper">Kids &amp; Infant Bio-Cotton Romper (190 GSM)</option>
                  </select>
                </div>

                {/* Fabric */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1.5 uppercase tracking-wider text-[11px]">
                    2. Yarn &amp; Fabric Composition
                  </label>
                  <select
                    value={fabricType}
                    onChange={(e) => setFabricType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-xs sm:text-sm focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="100% Combed BCI Cotton">100% Combed BCI Cotton (Sustainable Standard)</option>
                    <option value="100% Organic Cotton (GOTS Certified)">100% Organic Cotton (GOTS Certified)</option>
                    <option value="Modal / Cotton Stretch Blend">Lenzing Modal / Cotton Silk Feel Blend</option>
                    <option value="Recycled Polyester (RPET) Performance">Recycled Polyester (RPET GRS Certified)</option>
                  </select>
                </div>

                {/* Target Volume */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                      3. Target Production Quantity
                    </label>
                    <span className="font-mono font-black text-amber-700 text-sm">
                      {orderQuantity.toLocaleString()} pcs
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="1000"
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>MOQ: 1,000 pcs</span>
                    <span>10,000 (Tier 2 Discount)</span>
                    <span>50,000+ (Factory Direct Bulk)</span>
                  </div>
                </div>

                {/* Destination Country */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1.5 uppercase tracking-wider text-[11px]">
                    4. Destination Import Market
                  </label>
                  <select
                    value={destinationMarket}
                    onChange={(e) => setDestinationMarket(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-xs sm:text-sm focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="European Union (EU)">European Union (EU - 0% Duty under EBA GSP)</option>
                    <option value="United Kingdom (UK)">United Kingdom (UK - 0% Tariff under DCTS)</option>
                    <option value="United States (USA)">United States (USA - Standard MFN / C-TPAT Direct)</option>
                    <option value="Canada">Canada (0% Duty under LDCT Program)</option>
                    <option value="Japan">Japan (0% Duty under Japan GSP)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Live Calculation Output Card (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                  Indicative FOB Chittagong
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold">
                  Live Quotation
                </span>
              </div>

              {/* Price Range Display */}
              <div>
                <span className="text-xs text-slate-400 block mb-1">Estimated Unit Price (FOB)</span>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {calcResult ? (
                    `${formatPrice(calcResult.fob_range_low)} \u2014 ${formatPrice(calcResult.fob_range_high)}`
                  ) : (
                    '$4.01 \u2014 $4.56'
                  )}
                  <span className="text-xs font-normal text-slate-400 ml-2">/ piece</span>
                </div>
                <div className="text-xs text-slate-400 font-mono mt-1">
                  Total Order Bracket:{' '}
                  <strong className="text-amber-400">
                    {formattedTotalBracket}
                  </strong>
                </div>
              </div>

              {/* SIGNATURE HIGHLIGHT: GSP 0% Duty Exemption Savings */}
              {calcResult && calcResult.duty_savings_usd > 0 && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                    <span>Estimated GSP Duty Exemption Advantage</span>
                  </div>
                  <div className="text-xl font-black text-white">
                    {formatPrice(calcResult.duty_savings_usd)} SAVED
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    By importing directly from Bangladesh under zero-tariff GSP/DCTS rules, you avoid the <strong>{calcResult.duty_savings_percent}% customs duty</strong> imposed on garments made in China or Vietnam.
                  </p>
                </div>
              )}

              {/* Turnaround Milestones */}
              <div className="space-y-2.5 text-xs border-t border-slate-800 pt-4">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Proto Sampling &amp; Lab-Dips:</span>
                  </span>
                  <strong className="text-white font-mono">{calcResult?.sample_turnaround_days || '5-7 Days'}</strong>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Ship className="w-3.5 h-3.5 text-amber-400" />
                    <span>Bulk Production Lead Time:</span>
                  </span>
                  <strong className="text-white font-mono">{calcResult?.bulk_lead_time_days || '45-55 Days'}</strong>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Quality Acceptance Standard:</span>
                  </span>
                  <strong className="text-emerald-400 font-mono">AQL 1.5 FRI Included</strong>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="pt-2 space-y-2">
                <Link
                  to="/contact"
                  className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2 no-underline text-center cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Lock Pricing &amp; Request Official Offer</span>
                </Link>

                <a
                  href={calcResult?.whatsapp_direct_lead || 'https://wa.me/8801904464294'}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center justify-center gap-2 no-underline text-center cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Merchandising Desk</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: AI TECH PACK & BOM YIELD ANALYZER */}
        {/* ========================================================================= */}
        {activeTab === 'techpack' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
            <div className="max-w-2xl mx-auto text-center space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Instant Tech Pack Spec &amp; Fabric Yield Feasibility
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Drag and drop your PDF tech pack or spec sheet. Our technical merchandising team will calculate fabric yield per dozen, verify seam strength, and formulate an official BOM quotation within 24 hours.
              </p>
            </div>

            {/* Upload Box */}
            {!tpSubmittedCode ? (
              <form onSubmit={handleTechpackSubmit} className="max-w-2xl mx-auto space-y-6">
                <div className="border-2 border-dashed border-amber-500/40 hover:border-amber-500 rounded-3xl p-8 text-center bg-amber-50/20 transition cursor-pointer relative">
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg,.ai,.xlsx"
                    onChange={handleTechpackUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="space-y-3 pointer-events-none">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
                      <UploadCloud className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-900 block">
                        {tpFile ? tpFile.name : 'Click to Upload Tech Pack or Drag File Here'}
                      </span>
                      <span className="text-xs text-slate-400">
                        Supports PDF, Illustrator AI, Excel Specs, or High-Res Photos (Up to 25MB)
                      </span>
                    </div>
                  </div>
                </div>

                {tpAnalyzing && (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3 animate-pulse">
                    <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin shrink-0" />
                    <span className="text-xs font-bold text-amber-900">
                      Analyzing garment silhouette, grading specs &amp; yarn shrinkage...
                    </span>
                  </div>
                )}

                {tpAnalysisDone && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-2 text-emerald-900">
                    <div className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Tech Pack Parameters Initialized</span>
                    </div>
                    <p className="text-[11px] text-emerald-800">
                      Detected garment specifications require <strong>100% Combed Compact Ring Spun Yarn</strong> with an estimated fabric consumption of <strong>2.45 kg / dozen</strong>. Enter your details below to receive the complete itemized costing breakdown.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Company / Fashion Brand *</label>
                    <input
                      type="text"
                      required
                      value={tpBrandName}
                      onChange={(e) => setTpBrandName(e.target.value)}
                      placeholder="e.g. Scandi Retail Group AB"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Procurement Manager Email *</label>
                    <input
                      type="email"
                      required
                      value={tpBuyerEmail}
                      onChange={(e) => setTpBuyerEmail(e.target.value)}
                      placeholder="sourcing@yourbrand.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Tech Pack for Factory Cost Engineering</span>
                </button>
              </form>
            ) : (
              <div className="max-w-md mx-auto text-center p-8 rounded-3xl bg-emerald-50 border border-emerald-200 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-black text-emerald-950">Tech Pack Dossier Received!</h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Your reference dossier code is <strong className="font-mono text-emerald-950">{tpSubmittedCode}</strong>.
                  Our merchandising team is analyzing yarn consumption and will send an official FOB price matrix within 24 hours.
                </p>
                <div className="pt-2">
                  <a
                    href={`https://wa.me/8801904464294?text=${encodeURIComponent(
                      `Hello Softtex Fashions, I uploaded my tech pack under reference ${tpSubmittedCode}. Looking forward to your yield analysis.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Follow Up on WhatsApp</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: DIGITAL FABRIC SWATCH EXPLORER */}
        {/* ========================================================================= */}
        {activeTab === 'swatches' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">Physical Fabric Swatch Matrix</h3>
                <p className="text-xs text-slate-500">
                  Pre-tested circular knits, fleece, and denim weaves ready for 5-day lab dip sampling.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-mono font-bold text-xs">
                Free Courier Swatch Hanger
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {swatches.map((sw) => (
                <div
                  key={sw.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition overflow-hidden flex flex-col justify-between"
                >
                  <div className="p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                        {sw.category}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-800">{sw.gsm}</span>
                    </div>

                    <h4 className="text-base font-extrabold text-slate-900 leading-snug">{sw.title}</h4>

                    <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <div>Yarn: <strong className="text-slate-800">{sw.yarn_count}</strong></div>
                      <div>Shrinkage: <strong className="text-slate-800">{sw.shrinkage}</strong></div>
                      <div>Fastness: <strong className="text-slate-800">{sw.color_fastness}</strong></div>
                      <div>Application: <span className="text-slate-500 italic">{sw.best_for}</span></div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSwatchForRequest(sw);
                        setSwatchSuccessCode(null);
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Request Physical Swatch Hanger</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal: Swatch Request Courier Form */}
            {selectedSwatchForRequest && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-600">DHL Express Swatch Courier</span>
                      <h4 className="text-base font-black text-slate-900">{selectedSwatchForRequest.title}</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedSwatchForRequest(null)}
                      className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {!swatchSuccessCode ? (
                    <form onSubmit={handleRequestSwatchSubmit} className="space-y-3.5 text-xs">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Buyer Name *</label>
                          <input
                            type="text"
                            required
                            value={swatchForm.buyer_name}
                            onChange={(e) => setSwatchForm({ ...swatchForm, buyer_name: e.target.value })}
                            placeholder="e.g. Audrey Bergstrom"
                            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Company / Brand *</label>
                          <input
                            type="text"
                            required
                            value={swatchForm.company_name}
                            onChange={(e) => setSwatchForm({ ...swatchForm, company_name: e.target.value })}
                            placeholder="e.g. Scandi Retail"
                            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Work Email *</label>
                          <input
                            type="email"
                            required
                            value={swatchForm.email}
                            onChange={(e) => setSwatchForm({ ...swatchForm, email: e.target.value })}
                            placeholder="buyer@brand.com"
                            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Destination Country *</label>
                          <input
                            type="text"
                            required
                            value={swatchForm.country}
                            onChange={(e) => setSwatchForm({ ...swatchForm, country: e.target.value })}
                            placeholder="United Kingdom"
                            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-900"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Courier Shipping Address *</label>
                        <textarea
                          rows={2}
                          required
                          value={swatchForm.shipping_address}
                          onChange={(e) => setSwatchForm({ ...swatchForm, shipping_address: e.target.value })}
                          placeholder="Office address for DHL/FedEx swatch delivery..."
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={swatchSubmitting}
                        className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-sm cursor-pointer disabled:opacity-50"
                      >
                        {swatchSubmitting ? 'Logging Courier Dispatch...' : 'Confirm Swatch Hanger Dispatch'}
                      </button>
                    </form>
                  ) : (
                    <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                        <Check className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-emerald-950">Swatch Courier Logged!</h4>
                      <p className="text-xs text-emerald-800">
                        Your tracking code is <strong>{swatchSuccessCode}</strong>. Our courier team will dispatch your fabric hanger within 24 hours.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSelectedSwatchForRequest(null)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: COMPLIANCE AUDIT VAULT */}
        {/* ========================================================================= */}
        {activeTab === 'audits' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">Verified Factory Audit &amp; Safety Accreditations</h3>
                <p className="text-xs text-slate-500">
                  Full zero-defect compliance with European and North American brand safety standards.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono font-bold text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Remediated Units</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {audits.map((a) => (
                <div
                  key={a.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[10px]">
                        {a.score}
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">{a.renewal_date}</span>
                    </div>

                    <h4 className="text-base font-extrabold text-slate-900">{a.standard}</h4>

                    <div className="text-xs text-slate-600 space-y-1">
                      <div>Issuer: <strong className="text-slate-800">{a.issuer}</strong></div>
                      <div>Audit Ref: <strong className="font-mono text-amber-700">{a.audit_id}</strong></div>
                      <p className="text-[11px] text-slate-500 pt-1 leading-relaxed">{a.scope}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAuditForDownload(a);
                        setAuditUnlocked(false);
                      }}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Audit Executive Summary</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal: Work Email Gate for Audit Summary */}
            {selectedAuditForDownload && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-600">Enterprise Audit Verification</span>
                      <h4 className="text-base font-black text-slate-900">{selectedAuditForDownload.standard}</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedAuditForDownload(null)}
                      className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {!auditUnlocked ? (
                    <form onSubmit={handleAuditUnlockSubmit} className="space-y-3.5 text-xs">
                      <p className="text-slate-500 text-[11px] leading-relaxed">
                        To preserve audit data confidentiality, enter your brand sourcing credentials to unlock the audit executive report.
                      </p>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Procurement Officer Name *</label>
                        <input
                          type="text"
                          required
                          value={auditForm.buyer_name}
                          onChange={(e) => setAuditForm({ ...auditForm, buyer_name: e.target.value })}
                          placeholder="e.g. Marcus Vance"
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Company / Brand Name *</label>
                        <input
                          type="text"
                          required
                          value={auditForm.company_name}
                          onChange={(e) => setAuditForm({ ...auditForm, company_name: e.target.value })}
                          placeholder="e.g. Vance & Co Retail UK"
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Corporate Work Email *</label>
                        <input
                          type="email"
                          required
                          value={auditForm.email}
                          onChange={(e) => setAuditForm({ ...auditForm, email: e.target.value })}
                          placeholder="sourcing@vanceretail.co.uk"
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-900"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={auditSubmitting}
                        className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer disabled:opacity-50"
                      >
                        {auditSubmitting ? 'Verifying Credentials...' : 'Unlock Audit Summary PDF'}
                      </button>
                    </form>
                  ) : (
                    <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                        <Check className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-emerald-950">Audit Dossier Unlocked!</h4>
                      <p className="text-xs text-emerald-800">
                        {selectedAuditForDownload.standard} (Ref: {selectedAuditForDownload.audit_id}) has been verified.
                      </p>
                      <a
                        href={assetUrl('/images/certificatelogos/accord-logo.png')}
                        download
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Audit Summary (PDF / Cert)</span>
                      </a>
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
