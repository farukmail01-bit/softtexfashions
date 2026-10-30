import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { assetUrl } from '../utils/asset';

export default function ManagementPage() {
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchManagement() {
      try {
        const base = (window.__SOFTTEX_BASE_URL__ || '').replace(/\/$/, '');
        const res = await fetch(`${base}/api/cms/pages/management`);
        if (res.ok) {
          const json = await res.json();
          if (mounted && json?.page) {
            setPageData(json.page);
          }
        }
      } catch (err) {
        // Fallback to static
      }
    }
    fetchManagement();
    return () => {
      mounted = false;
    };
  }, []);

  const quoteTitle = pageData?.sections_data?.quote_title || 'A letter from our CEO';
  const quoteText =
    pageData?.sections_data?.quote_text ||
    'SOFTTEX FASHIONS WEAR LTD. has been emerging over the years as a trusted sourcing as well as manufacturing partner for global clothing buyers, retailers & brands along with ingenuity, uniqueness, managing supply chain, and well-planned operations. SOFTTEX FASHIONS WEAR LTD. has a large network of factories that have been technically and ethically audited to industry standards. We specialize in Knitwear, Sweater, and Woven items. All are composite top-class factories with all modern facilities & internationally certified. We have experienced and highly technical management to execute the product exactly as per the buyer’s requirements. Our management concentrates fully on buyer satisfaction. Quality is our main strength that is why we believe in a long-term relationship. As the Chief Executive Officer (C.E.O) of the SOFTTEX FASHIONS WEAR LTD., me & my team is profoundly dedicated & enthusiastic to take on new challenges. Overcoming hurdles and reaping opportunities, which would not have been possible without the concerted effort of my entire team, we have honed the deliverance of premium quality clothing materials & goods.';

  const ceoAuthor =
    pageData?.sections_data?.ceo_author ||
    '— Muhammad Bashir Uddin, C.E.O, SOFTTEX FASHIONS WEAR LTD.';

  return (
    <div className="softtex-editorial-page">
      <section className="ph">
        <div className="w">
          <p className="ey">Executive Leadership</p>
          <h1>Our Management</h1>
          <p>Experienced apparel leadership bridging international buyers and certified manufacturing facilities.</p>
        </div>
      </section>

      <section className="sec">
        <div className="w two" style={{ alignItems: 'start' }}>
          <div>
            <div className="ey l">Message from Leadership</div>
            <h2>{quoteTitle}</h2>
            <p style={{ marginTop: '16px' }}>{quoteText}</p>
            <p style={{ fontWeight: 600, color: 'var(--bz)', marginTop: '24px' }}>
              {ceoAuthor}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: 'var(--bg2)', padding: '32px', borderLeft: '3px solid var(--bz)', borderRadius: '6px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '14px', fontFamily: 'Newsreader, Georgia, serif' }}>Executive Management Focus</h3>
              <ul style={{ color: 'var(--mut)', lineHeight: 2, paddingLeft: 0, listStyle: 'none' }}>
                <li>• Direct merchandising oversight for global fashion brands</li>
                <li>• Strict AQL 1.5 / 2.5 quality control at factory level</li>
                <li>• Transparent critical-path scheduling and lead-time monitoring</li>
                <li>• Social compliance &amp; environmental safety audit assurance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="w">
          <div>
            <div className="ey l">Let’s Work Together</div>
            <h2>Planning your next collection?</h2>
            <p>Tell us about your styles, quantities and target market, and receive a tailored sourcing solution.</p>
          </div>
          <Link className="btn" to="/contact">
            Request a Sourcing Quote &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
