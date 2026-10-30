import React from 'react';
import { ArrowRight, ArrowDownToLine, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assetUrl } from '../utils/asset';

const products = [
  {
    id: 'women',
    title: 'Women',
    slug: 'womens',
    description: 'Women’s clothing in knit, denim and woven fabrics.',
    tone: 'women',
    pdf: 'Softtex_Fashions_Wear_Limited_Womens.pdf',
    size: '1.75 MB',
  },
  {
    id: 'men',
    title: 'Men',
    slug: 'mens',
    description: 'Men’s clothing in knit, denim and woven fabrics.',
    tone: 'men',
    pdf: 'Softtex_Fashions_Wear_Limited_Mens.pdf',
    size: '1.48 MB',
  },
  {
    id: 'children',
    title: 'Children',
    slug: 'kids',
    description: 'Baby clothes and kids’ clothing for everyday collections.',
    tone: 'children',
    pdf: 'Softtex_Fashions_Wear_Limited_Kids.pdf',
    size: '902 KB',
  },
  {
    id: 'misc',
    title: 'Misc',
    slug: 'misc',
    description: 'Sportswear, uniforms and custom clothing programmes.',
    tone: 'misc',
    pdf: null,
    size: null,
  },
];

function DocumentGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width="22" height="22">
      <path d="M6 3h8l4 4v14H6z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 3v4h4M9 13h6M9 17h6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProductsPage() {
  return (
    <div className="softtex-editorial-page softtex-editorial-products-page">
      <header className="softtex-page-hero">
        <div className="container">
          <p className="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">Our products</p>
          <h1>Product catalogues</h1>
          <p>
            Choose a category to view its online gallery or instantly download the complete buyer-ready PDF catalogue
            for technical specifications and styling.
          </p>
        </div>
      </header>

      <nav className="softtex-editorial-product-tabs" aria-label="Product categories">
        <div className="softtex-editorial-wrap">
          {products.map((product) => (
            <a key={product.id} href={`#${product.id}`}>
              {product.title}
            </a>
          ))}
        </div>
      </nav>

      {products.map((product) => (
        <section className="softtex-editorial-section softtex-editorial-catalogue-section" id={product.id} key={product.id}>
          <div className="softtex-editorial-wrap softtex-editorial-catalogue-row">
            <div>
              <p className="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">Product category</p>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
            </div>
            <article className={`softtex-editorial-category-card ${product.tone}`}>
              <span className="softtex-editorial-document">
                <DocumentGlyph />
                <b>PDF CATALOGUE</b>
              </span>
              <span className="softtex-editorial-category-title">{product.title} catalogue</span>

              {product.pdf ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '14px', width: '100%' }}>
                  <a
                    className="softtex-editorial-button"
                    href={assetUrl(`pdf/${product.pdf}`)}
                    download={product.pdf}
                    style={{ justifyContent: 'center', textDecoration: 'none' }}
                  >
                    <ArrowDownToLine size={16} /> Download PDF ({product.size})
                  </a>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <a
                      className="softtex-editorial-button softtex-editorial-button-outline"
                      href={assetUrl(`pdf/${product.pdf}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ flex: 1, justifyContent: 'center', fontSize: '11px', padding: '8px 10px', textDecoration: 'none' }}
                    >
                      <FileText size={13} /> View PDF
                    </a>
                    <Link
                      className="softtex-editorial-button softtex-editorial-button-outline"
                      to={`/catalogue/${product.slug}`}
                      style={{ flex: 1, justifyContent: 'center', fontSize: '11px', padding: '8px 10px', textDecoration: 'none' }}
                    >
                      Gallery <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ) : (
                <Link className="softtex-editorial-button" to={`/catalogue/${product.slug}`}>
                  Browse Gallery <ArrowRight size={15} />
                </Link>
              )}
            </article>
          </div>
        </section>
      ))}

      <section className="softtex-editorial-cta">
        <div className="softtex-editorial-wrap">
          <div>
            <p className="softtex-editorial-eyebrow softtex-editorial-eyebrow-left">Let&apos;s work together</p>
            <h2>Planning your next collection?</h2>
            <p>Share the categories, styles and quantities you are considering, and our team will help with the next steps.</p>
          </div>
          <Link className="softtex-editorial-button" to="/contact">
            Request a sourcing quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
