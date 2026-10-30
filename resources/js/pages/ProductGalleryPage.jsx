import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowDownToLine, ArrowRight, Check, FileText } from 'lucide-react';
import { businessTerms } from '../data/businessTerms';
import { assetUrl } from '../utils/asset';

const categories = {
  womens: {
    title: 'Women',
    intro: 'A focused range of womenswear for contemporary fashion and private-label programmes.',
    imageCount: 100,
    products: ['T-shirts and tops', 'Shirts and blouses', 'Dresses and tunics', 'Skirts and trousers', 'Knitwear and sweatshirts', 'Denim and lightweight outerwear'],
  },
  mens: {
    title: 'Men',
    intro: 'Versatile menswear categories for everyday, casual and performance-inspired collections.',
    imageCount: 120,
    products: ['T-shirts and polos', 'Shirts and overshirts', 'Hoodies and sweatshirts', 'Trousers and shorts', 'Denim', 'Jackets and outerwear'],
  },
  kids: {
    title: 'Children',
    intro: 'Comfort-led apparel concepts for children, toddlers and babywear programmes.',
    imageCount: 78,
    products: ['T-shirts and tops', 'Sets and co-ordinates', 'Dresses and skirts', 'Sleepwear and loungewear', 'Babywear', 'School and playwear'],
  },
};

const categoryPdfs = {
  womens: {
    file: 'Softtex_Fashions_Wear_Limited_Womens.pdf',
    title: 'Women Apparel Catalogue',
    size: '1.75 MB',
  },
  mens: {
    file: 'Softtex_Fashions_Wear_Limited_Mens.pdf',
    title: 'Men Apparel Catalogue',
    size: '1.48 MB',
  },
  kids: {
    file: 'Softtex_Fashions_Wear_Limited_Kids.pdf',
    title: 'Children Apparel Catalogue',
    size: '902 KB',
  },
};

const clientTitles = {
  'us-polo': 'U.S. Polo Assn. portfolio',
  'rich-cotton': 'Rich Cotton portfolio',
  emart: 'Emart portfolio',
  head: 'Head sportswear portfolio',
  tesco: 'Tesco F&F portfolio',
  eddiebauer: 'Eddie Bauer portfolio',
  forever: 'Forever 21 portfolio',
  skechers: 'Skechers portfolio',
  keithhering: 'Keith Haring portfolio',
};

export default function ProductGalleryPage({ clientSlug = null }) {
  const params = useParams();
  const slug = clientSlug || params.slug || 'womens';
  const category = categories[slug];
  const title = category?.title || clientTitles[slug] || 'Product Portfolio';
  const [galleryTitles, setGalleryTitles] = useState({});
  const [galleryLoading, setGalleryLoading] = useState(Boolean(category));
  const [galleryError, setGalleryError] = useState('');
  const [galleryRetry, setGalleryRetry] = useState(0);
  const products = category?.products || [];
  const productImages = useMemo(() => category?.imageCount
    ? Array.from({ length: category.imageCount }, (_, index) => {
      const number = index + 1;
      const extension = slug === 'kids' && number === 78 ? 'png' : 'jpg';
      const path = `images/${slug}/${number}.${extension}`;
      return { path, url: assetUrl(path) };
    })
    : [], [category, slug]);
  const galleryReady = productImages.length > 0 &&
    productImages.every(({ path }) => Boolean(galleryTitles[path]));

  useEffect(() => {
    if (!category) return undefined;

    const controller = new AbortController();
    setGalleryLoading(true);
    setGalleryError('');
    setGalleryTitles({});

    fetch(`/api/galleries/${slug}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Product names could not be loaded (HTTP ${response.status}).`);
        }
        const payload = await response.json();
        if (!Array.isArray(payload.items)) {
          throw new Error('The product catalogue returned an invalid response.');
        }
        const titles = Object.fromEntries(
          payload.items
            .filter((item) => item?.image_url && item?.title)
            .map((item) => [item.image_url.replace(/^\/+/, ''), item.title])
        );
        if (productImages.some(({ path }) => !titles[path])) {
          throw new Error('Some product names are missing from this catalogue.');
        }
        setGalleryTitles(titles);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.error('Unable to load product catalogue names:', error);
          setGalleryError(error.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setGalleryLoading(false);
      });

    return () => controller.abort();
  }, [category, galleryRetry, productImages, slug]);

  const saveCatalogueAsPdf = async () => {
    if (!galleryReady) return;

    try {
      setGalleryError('');
      const printImages = Array.from(document.querySelectorAll('.catalogue-print-grid img'));
      await Promise.all(printImages.map((image) => {
        image.loading = 'eager';
        if (image.complete) {
          return image.naturalWidth > 0
            ? Promise.resolve()
            : Promise.reject(new Error(`Unable to load ${image.alt}.`));
        }
        return new Promise((resolve, reject) => {
          image.addEventListener('load', resolve, { once: true });
          image.addEventListener('error', () => reject(new Error(`Unable to load ${image.alt}.`)), { once: true });
        });
      }));
      document.body.classList.add('is-printing-catalogue');
      const cleanup = () => {
        document.body.classList.remove('is-printing-catalogue');
        window.removeEventListener('afterprint', cleanup);
      };
      window.addEventListener('afterprint', cleanup);
      window.print();
    } catch (error) {
      console.error('Unable to prepare product catalogue PDF:', error);
      setGalleryError('The PDF could not be prepared because one or more product images failed to load. Please retry.');
    }
  };
  const openEnquiry = () => {
    if (window.openSofttexRfq) {
      window.openSofttexRfq({
        itemType: `${title} apparel`,
        specifications: `Please share your requirements for our ${title} product range. Final styles and specifications will be confirmed from the buyer-approved Tech Pack.`,
      });
    } else {
      window.location.href = `/contact?category=${encodeURIComponent(title)}`;
    }
  };

  return (
    <div className="softtex-catalogue-page">
      <header className="softtex-page-hero softtex-catalogue-hero">
        <div className={`container softtex-catalogue-hero-inner${category ? ' has-download' : ''}`}>
          <div className="softtex-catalogue-hero-copy">
            <p className="softtex-eyebrow">Product categories / {title}</p>
            <h1>{category ? `${title} Apparel` : title}</h1>
            <p>{category?.intro || 'Our team can share relevant, approved product information for your sourcing brief.'}</p>
            <div className="softtex-catalogue-actions">
              <button type="button" className="softtex-button softtex-button-primary" onClick={openEnquiry}>
                Request a quotation <ArrowRight size={17} />
              </button>
            </div>
          </div>
          {category && (
            <div className="softtex-catalogue-hero-download">
              {categoryPdfs[slug] ? (
                <>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <a
                      href={assetUrl(`pdf/${categoryPdfs[slug].file}`)}
                      download={categoryPdfs[slug].file}
                      className="softtex-button softtex-button-primary"
                      style={{ textDecoration: 'none' }}
                      title={`Download ${categoryPdfs[slug].title} (${categoryPdfs[slug].size})`}
                    >
                      <ArrowDownToLine size={17} /> Download PDF Catalogue
                    </a>
                    <a
                      href={assetUrl(`pdf/${categoryPdfs[slug].file}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="softtex-button"
                      style={{
                        textDecoration: 'none',
                        background: 'rgba(255, 255, 255, 0.15)',
                        color: '#ffffff',
                        border: '1px solid rgba(255, 255, 255, 0.35)',
                      }}
                      title={`Open ${categoryPdfs[slug].title} in browser`}
                    >
                      <FileText size={16} /> View PDF
                    </a>
                  </div>
                  <small style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                    PDF format ({categoryPdfs[slug].size}) &bull; Ready for offline buyer review &amp; tech packs
                  </small>
                </>
              ) : (
                <>
                  <button type="button" className="softtex-button softtex-button-primary" onClick={saveCatalogueAsPdf} disabled={!galleryReady}>
                    <ArrowDownToLine size={17} /> {galleryLoading ? 'Loading product names…' : 'Download PDF Catalogue'}
                  </button>
                  <small>{galleryReady ? 'Choose “Save as PDF” in the print dialog.' : 'Product names are required before the catalogue can be downloaded.'}</small>
                </>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="container softtex-catalogue-main">
        {category && (
          <div className="softtex-product-gallery-toolbar">
            <p>{productImages.length} styles in the {title} collection</p>
          </div>
        )}
        {galleryError && (
          <div className="softtex-product-gallery-error" role="alert">
            <span>{galleryError}</span>
            <button type="button" onClick={() => setGalleryRetry((retry) => retry + 1)}>Retry</button>
          </div>
        )}

        {category && productImages.length ? (
          <section className="softtex-product-gallery" aria-label={`${title} product gallery`}>
            {productImages.map(({ path, url }, index) => (
              <article className="softtex-product-gallery-card" key={path}>
                <div className="softtex-product-gallery-image">
                  <img
                    src={url}
                    alt={galleryTitles[path] || `${title} apparel style ${index + 1}`}
                    loading={index < 8 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
                <h2>{galleryTitles[path] || (galleryLoading ? 'Loading product name…' : 'Name unavailable')}</h2>
              </article>
            ))}
          </section>
        ) : category ? (
          <>
            <section className="softtex-range-section" aria-labelledby="range-heading">
              <div className="softtex-section-heading">
                <p className="softtex-eyebrow">Explore the range</p>
                <h2 id="range-heading">What we can develop</h2>
              </div>
              <div className="softtex-range-grid">
                {products.map((product, index) => (
                  <article className="softtex-range-card" key={product}>
                    <span className="softtex-range-index">{String(index + 1).padStart(2, '0')}</span>
                    <FileText size={20} aria-hidden="true" />
                    <h3>{product}</h3>
                    <p>Developed to your approved design, materials and quality requirements.</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="softtex-print-terms">
              <div className="softtex-section-heading">
                <p className="softtex-eyebrow">Commercial overview</p>
                <h2>Terms &amp; Conditions</h2>
              </div>
              <ol className="softtex-terms-list">
                {businessTerms.map((term) => (
                  <li key={term}><Check size={17} aria-hidden="true" /><span>{term}</span></li>
                ))}
              </ol>
              <p className="softtex-terms-note">All final specifications, prices and delivery dates are confirmed in the order documentation.</p>
            </section>
          </>
        ) : (
          <section className="softtex-portfolio-notice">
            <FileText size={28} />
            <div>
              <h2>Portfolio shared on request</h2>
              <p>To respect buyer confidentiality, product photographs are not displayed here. Contact us with your category and we will respond with relevant information that is cleared for sharing.</p>
              <Link className="softtex-button softtex-button-primary" to="/contact">Contact Softtex <ArrowRight size={17} /></Link>
            </div>
          </section>
        )}

        <section
          style={{
            margin: '40px 0 24px',
            padding: '24px 28px',
            background: 'linear-gradient(135deg, #0b1a2b 0%, #16314c 100%)',
            borderRadius: '8px',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            boxShadow: '0 8px 24px rgba(11, 26, 43, 0.08)',
          }}
        >
          <div>
            <span
              style={{
                display: 'inline-block',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#e5b378',
                marginBottom: '4px',
              }}
            >
              Export Catalogues
            </span>
            <h3 style={{ margin: '0 0 4px', fontSize: '20px', fontFamily: 'Newsreader, Georgia, serif', color: '#ffffff' }}>
              Download PDF Catalogues
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#9fb0c4' }}>
              Direct access to complete garment styling, technical specifications, and fabric blends.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a
              href={assetUrl('pdf/Softtex_Fashions_Wear_Limited_Womens.pdf')}
              download="Softtex_Fashions_Wear_Limited_Womens.pdf"
              className="softtex-button"
              style={{
                textDecoration: 'none',
                background: slug === 'womens' ? '#8f5825' : 'rgba(255,255,255,0.12)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.25)',
                fontSize: '12px',
                padding: '10px 14px',
              }}
            >
              <ArrowDownToLine size={15} /> Women (1.75 MB)
            </a>
            <a
              href={assetUrl('pdf/Softtex_Fashions_Wear_Limited_Mens.pdf')}
              download="Softtex_Fashions_Wear_Limited_Mens.pdf"
              className="softtex-button"
              style={{
                textDecoration: 'none',
                background: slug === 'mens' ? '#8f5825' : 'rgba(255,255,255,0.12)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.25)',
                fontSize: '12px',
                padding: '10px 14px',
              }}
            >
              <ArrowDownToLine size={15} /> Men (1.48 MB)
            </a>
            <a
              href={assetUrl('pdf/Softtex_Fashions_Wear_Limited_Kids.pdf')}
              download="Softtex_Fashions_Wear_Limited_Kids.pdf"
              className="softtex-button"
              style={{
                textDecoration: 'none',
                background: slug === 'kids' ? '#8f5825' : 'rgba(255,255,255,0.12)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.25)',
                fontSize: '12px',
                padding: '10px 14px',
              }}
            >
              <ArrowDownToLine size={15} /> Children (902 KB)
            </a>
          </div>
        </section>

        <nav className="softtex-category-nav" aria-label="Product categories">
          <p className="softtex-eyebrow">Browse categories</p>
          <div>
            {Object.entries(categories).map(([key, item]) => (
              <Link key={key} className={slug === key ? 'is-current' : ''} to={`/catalogue/${key}`}>
                {item.title}<ArrowRight size={15} />
              </Link>
            ))}
          </div>
        </nav>
      </main>
      <div className="catalogue-print-root" aria-hidden="true">
        <h1>SOFTTEX FASHIONS WEAR LIMITED</h1>
        <p>100% Export-Oriented Garments Manufacturer &amp; Buying House - Quality Our Commitment</p>
        <h2>{title} Apparel Catalogue</h2>
        <p>{category?.intro}</p>
        {productImages.length > 0 && (
          <div className="catalogue-print-grid">
            {productImages.map(({ path, url }, index) => (
              <figure className="catalogue-print-product" key={path}>
                <img src={url} alt={galleryTitles[path] || `${title} apparel style ${index + 1}`} loading="lazy" />
                <figcaption>{galleryTitles[path] || `${title} style ${index + 1}`}</figcaption>
              </figure>
            ))}
          </div>
        )}
        <h3>Product categories</h3>
        <ul>{products.map((product) => <li key={product}>{product}</li>)}</ul>
        <h3>Terms &amp; Conditions</h3>
        <ol>{businessTerms.map((term) => <li key={term}>{term}</li>)}</ol>
        <p>For product details and enquiries: info@softtexfashions.com | +880 1904 464294</p>
      </div>
    </div>
  );
}
