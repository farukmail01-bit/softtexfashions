import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Clock, Ship, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

const CURRENCIES = {
  USD: { symbol: '$', code: 'USD', rate: 1.0, label: 'USD ($)' },
  EUR: { symbol: '€', code: 'EUR', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', code: 'GBP', rate: 0.79, label: 'GBP (£)' },
};

export default function CostCalculatorIsland() {
  const [itemType, setItemType] = useState('Polo Shirt (Mercerized)');
  const [fabricType, setFabricType] = useState('100% Combed BCI Cotton');
  const [orderQuantity, setOrderQuantity] = useState(3000);
  const [washTreatment, setWashTreatment] = useState('Enzyme Silicon Softener');
  const [destinationMarket, setDestinationMarket] = useState('European Union (EU)');
  const [currency, setCurrency] = useState('USD');

  const [calculationResult, setCalculationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateEstimate = async () => {
    setLoading(true);
    try {
      let baseUrl = window.__SOFTTEX_BASE_URL__ || '';
      if (!baseUrl && typeof window !== 'undefined') {
        const idx = window.location.pathname.indexOf('/public');
        if (idx !== -1) {
          baseUrl = window.location.origin + window.location.pathname.substring(0, idx + 7);
        }
      }
      baseUrl = baseUrl.replace(/\/$/, '');
      const res = await fetch(`${baseUrl}/api/calculate-cost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          item_type: itemType,
          fabric_type: fabricType,
          order_quantity: Number(orderQuantity),
          wash_treatment: washTreatment,
          destination_market: destinationMarket,
        }),
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setCalculationResult(data.data);
      }
    } catch (err) {
      console.error('Calculation error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateEstimate();
  }, [itemType, fabricType, orderQuantity, washTreatment, destinationMarket]);

  const currentCurr = CURRENCIES[currency] || CURRENCIES.USD;
  const lowPrice = calculationResult ? (calculationResult.fob_range_low * currentCurr.rate).toFixed(2) : '0.00';
  const highPrice = calculationResult ? (calculationResult.fob_range_high * currentCurr.rate).toFixed(2) : '0.00';
  const totalLow = (Number(lowPrice) * orderQuantity).toLocaleString(undefined, { maximumFractionDigits: 0 });
  const totalHigh = (Number(highPrice) * orderQuantity).toLocaleString(undefined, { maximumFractionDigits: 0 });

  const handleOpenRfqPrefilled = () => {
    if (typeof window.openSofttexRfq === 'function') {
      window.openSofttexRfq({
        brandName: '',
        destinationMarket: destinationMarket,
        itemType: itemType,
        fabricType: fabricType,
        orderQuantity: orderQuantity,
        targetPrice: calculationResult ? `${currentCurr.symbol}${lowPrice}` : '',
      });
    }
  };

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '30px 15px',
        fontFamily: 'inherit',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(0, 112, 243, 0.08)',
            color: '#0070f3',
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            padding: '4px 14px',
            borderRadius: '20px',
            marginBottom: '8px',
          }}
        >
          <Calculator size={14} />
          <span>Interactive Sourcing Intelligence</span>
        </span>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>
          Instant FOB Pricing &amp; Sourcing Lead-Time Simulator
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '680px', margin: '0 auto' }}>
          Simulate production costing and international logistics turnaround for your custom apparel programs.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          background: '#ffffff',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* Controls Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
              Garment Silhouette
            </label>
            <select
              value={itemType}
              onChange={(e) => setItemType(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.88rem',
                backgroundColor: '#f8fafc',
              }}
            >
              <option value="Classic T-Shirt (Single Jersey)">Classic T-Shirt (Single Jersey)</option>
              <option value="Polo Shirt (Mercerized)">Polo Shirt (Mercerized Pique)</option>
              <option value="French Terry Hoodie">French Terry Hoodie &amp; Sweatshirt</option>
              <option value="Denim Jeans 5-Pocket">Denim Jeans 5-Pocket</option>
              <option value="Woven Casual Shirt">Woven Casual Shirt</option>
              <option value="Outerwear Field Jacket">Outerwear Field Jacket</option>
              <option value="Kids & Infant Romper">Kids &amp; Infant Romper</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
              Fabric Composition &amp; Yarn
            </label>
            <select
              value={fabricType}
              onChange={(e) => setFabricType(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.88rem',
                backgroundColor: '#f8fafc',
              }}
            >
              <option value="100% Combed BCI Cotton">100% Combed BCI Cotton (Standard)</option>
              <option value="100% Organic GOTS Certified Cotton">100% Organic GOTS Certified Cotton (+15%)</option>
              <option value="95% Cotton / 5% Elastane Spandex">95% Cotton / 5% Elastane Spandex</option>
              <option value="Recycled RPET / Cotton Eco Blend">Recycled RPET / Cotton Eco Blend</option>
              <option value="Lenzing Modal / Bamboo Fluid Drape">Lenzing Modal / Bamboo Fluid Drape</option>
            </select>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                Order Volume: <strong style={{ color: '#0070f3' }}>{Number(orderQuantity).toLocaleString()} Pcs</strong>
              </label>
              <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 700 }}>
                {orderQuantity >= 10000 ? 'Volume Discount Active' : 'Standard MOQ'}
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="50000"
              step="500"
              value={orderQuantity}
              onChange={(e) => setOrderQuantity(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#0070f3', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                Wash &amp; Finish
              </label>
              <select
                value={washTreatment}
                onChange={(e) => setWashTreatment(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.82rem',
                  backgroundColor: '#f8fafc',
                }}
              >
                <option value="Regular Garment Wash">Regular Softener</option>
                <option value="Enzyme Silicon Softener">Enzyme Silicon Softener</option>
                <option value="Bio-Polish Anti-Pill">Bio-Polish Anti-Pill</option>
                <option value="Laser Whisker & Ozone Wash">Laser Whisker &amp; Ozone</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                Destination Market
              </label>
              <select
                value={destinationMarket}
                onChange={(e) => setDestinationMarket(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.82rem',
                  backgroundColor: '#f8fafc',
                }}
              >
                <option value="European Union (EU)">European Union (EU)</option>
                <option value="United States (USA)">United States (USA)</option>
                <option value="United Kingdom (UK)">United Kingdom (UK)</option>
                <option value="Japan">Japan</option>
                <option value="Canada">Canada</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%)',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {loading ? (
            <div style={{ padding: '40px 0', textAlign: 'center', color: '#64748b' }}>
              Calculating real-time FOB costing...
            </div>
          ) : calculationResult ? (
            <>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
                    ESTIMATED FOB BRACKET (CHITTAGONG)
                  </span>
                  <div style={{ display: 'inline-flex', background: '#e2e8f0', borderRadius: '6px', padding: '2px', gap: '2px' }}>
                    {Object.keys(CURRENCIES).map((currKey) => (
                      <button
                        key={currKey}
                        type="button"
                        onClick={() => setCurrency(currKey)}
                        style={{
                          border: 'none',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          background: currency === currKey ? '#ffffff' : 'transparent',
                          color: currency === currKey ? '#0f172a' : '#64748b',
                          boxShadow: currency === currKey ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {currKey}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0070f3', margin: '4px 0' }}>
                  {currentCurr.symbol}{lowPrice} - {currentCurr.symbol}{highPrice}
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#64748b', marginLeft: '6px' }}>/ pc</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '14px' }}>
                  Total Program FOB: <strong>{currentCurr.symbol}{totalLow} – {currentCurr.symbol}{totalHigh} ({currentCurr.code})</strong>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
                  <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '0.72rem', fontWeight: 700 }}>
                      <Clock size={12} />
                      <span>BULK LEAD TIME</span>
                    </div>
                    <strong style={{ fontSize: '0.88rem', color: '#0f172a' }}>{calculationResult.bulk_lead_time_days}</strong>
                  </div>
                  <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '0.72rem', fontWeight: 700 }}>
                      <Ship size={12} />
                      <span>SEA TRANSIT</span>
                    </div>
                    <strong style={{ fontSize: '0.88rem', color: '#0f172a' }}>{calculationResult.sea_transit_days}</strong>
                  </div>
                </div>

                <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '8px 12px', borderRadius: '8px', fontSize: '0.78rem', color: '#065f46', marginBottom: '16px' }}>
                  <strong>Trade Benefit:</strong> {calculationResult.trade_duty_benefit}
                </div>
              </div>

              <button
                onClick={handleOpenRfqPrefilled}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#0070f3',
                  color: '#ffffff',
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0, 112, 243, 0.25)',
                  transition: 'background 0.2s',
                }}
              >
                <Sparkles size={16} />
                <span>Request Sample &amp; Formal Quote for this Specification</span>
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
