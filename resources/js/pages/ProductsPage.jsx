import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  { id: 'women', title: 'Women', slug: 'womens', description: 'Women’s clothing in knit, denim and woven fabrics.', tone: 'women' },
  { id: 'men', title: 'Men', slug: 'mens', description: 'Men’s clothing in knit, denim and woven fabrics.', tone: 'men' },
  { id: 'children', title: 'Children', slug: 'kids', description: 'Baby clothes and kids’ clothing for everyday collections.', tone: 'children' },
  { id: 'misc', title: 'Misc', slug: 'misc', description: 'Sportswear, uniforms and custom clothing programmes.', tone: 'misc' },
];

function DocumentGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4M9 13h6M9 17h6" />
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
          <p>Choose a category to view its catalogue and save a buyer-ready PDF for the styles you are interested in.</p>
        </div>
      </header>

      <nav className="softtex-editorial-product-tabs" aria-label="Product categories">
        <div className="softtex-editorial-wrap">
          {products.map((product) => <a key={product.id} href={`#${product.id}`}>{product.title}</a>)}
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
              <span className="softtex-editorial-document"><DocumentGlyph /><b>PDF CATALOGUE</b></span>
              <span className="softtex-editorial-category-title">{product.title} catalogue</span>
              <Link className="softtex-editorial-button" to={`/catalogue/${product.slug}`}>View / Save PDF <ArrowRight size={15} /></Link>
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
          <Link className="softtex-editorial-button" to="/contact">Request a sourcing quote <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
