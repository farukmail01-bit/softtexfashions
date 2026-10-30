import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, CheckCircle2, Award, Users, Globe2, Briefcase } from 'lucide-react';

const defaultPartners = [
  {
    name: 'Josna',
    role: 'Chairman (Founder)',
    department: 'Founding Board',
    avatar: 'JS',
    type: 'founder',
    badge: 'Founder & Board',
    badgeClass: 'gold',
    bio: 'Providing strategic stewardship, corporate governance, and ethical vision. Ensures Softtex Fashions maintains international compliance benchmarks, worker welfare, and sustainable apparel growth.',
    highlight: 'Corporate Governance & Ethical Compliance',
  },
  {
    name: 'Rakib',
    role: 'Managing Director (Founder)',
    department: 'Executive Leadership',
    avatar: 'RK',
    type: 'founder',
    badge: 'Founder & Executive',
    badgeClass: 'gold',
    bio: 'Oversees end-to-end executive operations, strategic factory partnerships across Bangladesh, supply chain synchronization, and delivery commitments for global fashion brands.',
    highlight: 'Factory Operations & Global Supply Chain',
  },
  {
    name: 'Rana',
    role: 'Marketing Director (Head of Marketing)',
    department: 'Commercial Leadership',
    avatar: 'RN',
    type: 'director',
    badge: 'Head of Marketing',
    badgeClass: 'navy',
    bio: 'Leads international buyer acquisition, global apparel market expansion, FOB pricing competitiveness, and strategic relationships with fashion retailers across Europe and North America.',
    highlight: 'Global Brand Acquisition & Buyer Relations',
  },
  {
    name: 'Jannatul Ferdous Happy',
    role: 'Co-Marketing Director',
    department: 'Marketing & Merchandising',
    avatar: 'JH',
    type: 'director',
    badge: 'Marketing Leadership',
    badgeClass: 'navy',
    bio: 'Coordinates merchandising follow-ups, proto sample development, rapid fit revisions, and cross-functional communication between overseas design teams and factory lines.',
    highlight: 'Merchandising Operations & Fast Sampling',
  },
  {
    name: 'Yusuf',
    role: 'Business Development Executive',
    department: 'Business Growth',
    avatar: 'YS',
    type: 'executive',
    badge: 'Business Development',
    badgeClass: 'blue',
    bio: 'Drives market research, tech-pack costing analysis, RFQ tenders, and new buyer onboarding across emerging international apparel and retail markets.',
    highlight: 'Strategic Sourcing & New Market Growth',
  },
];

const leadershipCommitments = [
  {
    title: 'Direct Leadership Access',
    description: 'Direct communication with founding directors and senior decision-makers ensures rapid turnaround and zero bureaucratic delays.',
    icon: Users,
  },
  {
    title: 'Certified Factory Compliance',
    description: 'Every partner facility is stringently audited under ACCORD, BSCI, OEKO-TEX, SEDEX, and local environmental standards.',
    icon: ShieldCheck,
  },
  {
    title: 'Critical-Path T&A Transparency',
    description: 'Proactive time-and-action schedules updated daily, providing complete milestone clarity from proto approval to final shipment.',
    icon: CheckCircle2,
  },
  {
    title: 'Long-Term Partnership Value',
    description: 'We prioritize sustained buyer loyalty, competitive FOB costing, and strict AQL 1.5/2.5 quality control above short-term gains.',
    icon: Award,
  },
];

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
        // Fallback to static defaultPartners
      }
    }
    fetchManagement();
    return () => {
      mounted = false;
    };
  }, []);

  const partners = pageData?.sections_data?.partners || defaultPartners;
  const founders = partners.filter((p) => p.name === 'Josna' || p.name === 'Rakib');
  const executives = partners.filter((p) => p.name !== 'Josna' && p.name !== 'Rakib');

  return (
    <div className="softtex-editorial-page softtex-leadership-page">
      {/* 1. Page Header */}
      <section className="ph">
        <div className="w">
          <p className="ey">Leadership &amp; Governance</p>
          <h1>Our Partners &amp; Management</h1>
          <p>
            The visionary founders and dedicated leadership team steering Softtex Fashions Wear Limited toward
            sustainable manufacturing and global apparel excellence.
          </p>
        </div>
      </section>

      {/* 2. Founders & Board of Directors */}
      <section className="sec" style={{ paddingTop: '64px', paddingBottom: '48px' }}>
        <div className="w">
          <div className="hd" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px' }}>
            <div className="ey">Founding Board</div>
            <h2>Founders &amp; Executive Board</h2>
            <p>
              Guiding our manufacturing vision with uncompromising ethical integrity, long-term industry experience,
              and dedicated commitment to global fashion retail partners.
            </p>
          </div>

          <div className="softtex-founders-grid">
            {founders.map((partner) => (
              <article key={partner.name} className="softtex-partner-card is-founder">
                <div className="softtex-partner-card-header">
                  <div className={`softtex-partner-avatar ${partner.type || 'founder'}`}>
                    {partner.avatar}
                  </div>
                  <div>
                    <span className={`softtex-partner-badge ${partner.badgeClass || 'gold'}`}>
                      {partner.badge || partner.department}
                    </span>
                    <h3 className="softtex-partner-name">{partner.name}</h3>
                    <p className="softtex-partner-role">{partner.role}</p>
                  </div>
                </div>

                <div className="softtex-partner-highlight">
                  <ShieldCheck size={15} color="var(--editorial-bronze, #8f5825)" />
                  <span>{partner.highlight}</span>
                </div>

                <p className="softtex-partner-bio">{partner.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Commercial & Marketing Leadership */}
      <section className="sec alt" style={{ paddingTop: '60px', paddingBottom: '68px' }}>
        <div className="w">
          <div className="hd" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px' }}>
            <div className="ey">Commercial Leadership</div>
            <h2>Marketing &amp; Business Development</h2>
            <p>
              Connecting international clothing brands with audited Bangladeshi manufacturing through responsive
              communication, competitive costing, and technical merchandising follow-up.
            </p>
          </div>

          <div className="softtex-directors-grid">
            {executives.map((partner) => (
              <article key={partner.name} className="softtex-partner-card">
                <div className="softtex-partner-card-header">
                  <div className={`softtex-partner-avatar ${partner.type || 'director'}`}>
                    {partner.avatar}
                  </div>
                  <div>
                    <span className={`softtex-partner-badge ${partner.badgeClass || 'navy'}`}>
                      {partner.badge || partner.department}
                    </span>
                    <h3 className="softtex-partner-name">{partner.name}</h3>
                    <p className="softtex-partner-role">{partner.role}</p>
                  </div>
                </div>

                <div className="softtex-partner-highlight">
                  <Briefcase size={14} color="var(--editorial-bronze, #8f5825)" />
                  <span>{partner.highlight}</span>
                </div>

                <p className="softtex-partner-bio">{partner.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Leadership Commitments & Pillars */}
      <section className="sec" style={{ paddingTop: '60px', paddingBottom: '68px' }}>
        <div className="w">
          <div className="hd" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
            <div className="ey">Management Focus</div>
            <h2>Why Global Brands Trust Our Leadership</h2>
            <p>
              Our leadership principles guarantee seamless production execution, transparent communication, and
              uncompromising compliance standards.
            </p>
          </div>

          <div className="softtex-pillars-grid">
            {leadershipCommitments.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <div key={pillar.title} className="softtex-pillar-item">
                  <div style={{ marginBottom: '14px', color: 'var(--editorial-bronze, #8f5825)' }}>
                    <IconComponent size={24} />
                  </div>
                  <h4>{pillar.title}</h4>
                  <p>{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Call To Action */}
      <section className="cta">
        <div className="w">
          <div>
            <div className="ey l">Direct Contact</div>
            <h2>Connect with Our Leadership Desk</h2>
            <p>
              Discuss your upcoming season's tech packs, order volumes, or schedule a formal factory audit visit in
              Bangladesh.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link className="btn" to="/contact">
              Start a Conversation &rarr;
            </Link>
            <Link className="btn o" to="/services">
              Explore Our Capabilities
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
