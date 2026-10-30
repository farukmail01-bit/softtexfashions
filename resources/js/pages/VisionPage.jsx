import React, { useEffect, useState } from 'react';
import { ArrowRight, Eye, Globe2, HeartHandshake, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const defaultMissionPoints = [
  'To strive hard to be a trading house of world class textile & garments products as well as service while positioning the country in the higher value segment of the international textile market.',
  'Our Relentless endeavor is contributing to enhancing the country’s position as an international provider of quality products.',
  'To satisfy customers through technology and synergic synchronization of man and machine, tailoring quality products and services to harvest the reward of responsibility.',
  'To Create a better future for the stakeholders, maintaining high standards of integrity, propriety and goodwill in shouldering social responsibilities.',
];

const missionIcons = [Globe2, Target, HeartHandshake, Eye];

export default function VisionPage() {
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchVision() {
      try {
        const base = (window.__SOFTTEX_BASE_URL__ || '').replace(/\/$/, '');
        const res = await fetch(`${base}/api/cms/pages/vision`);
        if (!res.ok) {
          throw new Error(`Vision content request failed (${res.status})`);
        }
        const json = await res.json();
        if (mounted && json?.page) {
          setPageData(json.page);
        }
      } catch (error) {
        console.error('Unable to load Vision & Mission CMS content:', error);
      }
    }

    fetchVision();
    return () => {
      mounted = false;
    };
  }, []);

  const sections = pageData?.sections_data || {};
  const heroTitle = sections.hero_title || pageData?.hero_title || 'Vision and Mission';
  const visionTitle = sections.vision_title || 'Our Vision';
  const visionText =
    sections.vision_text ||
    'Our vision is simple but bold: we aspire to maintain the image of the brands and help our customers navigate their own distinct identity, styles and continuous strategic planning for better production.';
  const missionTitle = sections.mission_title || 'Our Mission';
  const missionPoints =
    Array.isArray(sections.mission_points) && sections.mission_points.length > 0
      ? sections.mission_points
      : defaultMissionPoints;

  return (
    <div className="softtex-editorial-page softtex-vision-page">
      <header className="softtex-vision-hero">
        <div className="softtex-editorial-wrap">
          <p className="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">About Softtex</p>
          <h1>{heroTitle}</h1>
          <p className="softtex-vision-hero-lead">
            The principles that guide how we work with buyers, brands and manufacturing partners.
          </p>
        </div>
      </header>

      <section className="softtex-vision-section">
        <div className="softtex-editorial-wrap">
          <article className="softtex-vision-feature">
            <div className="softtex-vision-feature-icon" aria-hidden="true">
              <Eye size={24} strokeWidth={1.5} />
            </div>
            <div className="softtex-vision-feature-copy">
              <p className="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">Our direction</p>
              <h2>{visionTitle}</h2>
              <p>{visionText}</p>
            </div>
            <div className="softtex-vision-feature-mark" aria-hidden="true">VISION</div>
          </article>

          <div className="softtex-vision-mission-heading">
            <div>
              <p className="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">What guides us</p>
              <h2>{missionTitle}</h2>
            </div>
            <p>Our commitments shape the way we create value and build lasting working relationships.</p>
          </div>

          <div className="softtex-vision-mission-grid">
            {missionPoints.map((point, index) => {
              const MissionIcon = missionIcons[index % missionIcons.length];
              return (
                <article className="softtex-vision-mission-card" key={`${index}-${point}`}>
                  <div className="softtex-vision-mission-card-top">
                    <span className="softtex-vision-mission-number">{String(index + 1).padStart(2, '0')}</span>
                    <MissionIcon size={20} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <p>{point}</p>
                </article>
              );
            })}
          </div>

          <div className="softtex-vision-cta">
            <div>
              <h2>Let&apos;s build a better partnership.</h2>
              <p>Share your requirements with our team and start a conversation.</p>
            </div>
            <Link className="softtex-editorial-button" to="/contact">
              Contact our team <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
