import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingDockIsland from './islands/FloatingDockIsland';
import RfqIsland from './islands/RfqIsland';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import CompliancePage from './pages/CompliancePage';
import ProductsPage from './pages/ProductsPage';
import VisionPage from './pages/VisionPage';
import ManagementPage from './pages/ManagementPage';
import QualityPage from './pages/QualityPage';
import TermsPage from './pages/TermsPage';
import ContactPage from './pages/ContactPage';
import ProductGalleryPage from './pages/ProductGalleryPage';
import NotFoundPage from './pages/NotFoundPage';
import BlogPage from './pages/BlogPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import SourcingHub from './pages/SourcingHub';
const AdminRoot = lazy(() => import('./admin/AdminRoot'));

function PageSeoTracker() {
  const location = useLocation();

  useEffect(() => {
    const rawPath = location.pathname.replace(/\/$/, '') || '/';

    if (rawPath.startsWith('/admin')) {
      document.title = 'Softtex CMS | Administrator Control Center';
      return;
    }

    const titles = {
      '/': 'SOFTTEX FASHIONS WEAR LIMITED | Garments Manufacturer & Buying House Bangladesh',
      '/about/company-profile': 'Company Profile | SOFTTEX FASHIONS WEAR LIMITED',
      '/about/vision': 'Our Vision & Mission | SOFTTEX FASHIONS WEAR LIMITED',
      '/about/management': 'Executive Management | SOFTTEX FASHIONS WEAR LIMITED',
      '/management': 'Executive Management | SOFTTEX FASHIONS WEAR LIMITED',
      '/services': 'Our Services | Sourcing, Development & QA | SOFTTEX FASHIONS',
      '/products': 'Product Catalogues | SOFTTEX FASHIONS WEAR LIMITED',
      '/catalogue': 'Product Catalogues | SOFTTEX FASHIONS WEAR LIMITED',
      '/quality': 'Quality Assurance & AQL Standards | SOFTTEX FASHIONS',
      '/compliance': 'Global Compliance & Factory Standards | SOFTTEX FASHIONS',
      '/terms': 'Terms & Conditions | SOFTTEX FASHIONS WEAR LIMITED',
      '/terms-conditions': 'Terms & Conditions | SOFTTEX FASHIONS WEAR LIMITED',
      '/contact': 'Contact Us | SOFTTEX FASHIONS WEAR LIMITED | Dhaka, Bangladesh',
      '/catalogue/mens': 'Men Apparel Catalogue | SOFTTEX FASHIONS',
      '/catalogue/womens': 'Women Apparel Catalogue | SOFTTEX FASHIONS',
      '/catalogue/kids': 'Children Apparel Catalogue | SOFTTEX FASHIONS',
      '/catalogue/misc': 'Specialist Apparel Categories | SOFTTEX FASHIONS',
      '/catalogue/us-polo': 'U.S. Polo Assn. Production Portfolio | SOFTTEX FASHIONS',
      '/catalogue/rich-cotton': 'Rich Cotton Production Portfolio | SOFTTEX FASHIONS',
      '/catalogue/emart': 'Emart Production Portfolio | SOFTTEX FASHIONS',
      '/catalogue/head': 'Head Sportswear Production Portfolio | SOFTTEX FASHIONS',
      '/catalogue/tesco': 'Tesco F&F Production Portfolio | SOFTTEX FASHIONS',
      '/catalogue/eddiebauer': 'Eddie Bauer Outerwear Portfolio | SOFTTEX FASHIONS',
      '/catalogue/forever': 'Forever 21 Fast Fashion Portfolio | SOFTTEX FASHIONS',
      '/catalogue/skechers': 'Skechers Performance Apparel | SOFTTEX FASHIONS',
      '/catalogue/keithhering': 'Keith Hering Graphic Collection | SOFTTEX FASHIONS',
      '/products/mens': 'Men Apparel Catalogue | SOFTTEX FASHIONS',
      '/products/womens': 'Women Apparel Catalogue | SOFTTEX FASHIONS',
      '/products/kids': 'Children Apparel Catalogue | SOFTTEX FASHIONS',
      '/products/misc': 'Specialist Apparel Categories | SOFTTEX FASHIONS',
      '/products/us-polo': 'U.S. Polo Assn. Production Portfolio | SOFTTEX FASHIONS',
      '/products/rich-cotton': 'Rich Cotton Production Portfolio | SOFTTEX FASHIONS',
      '/products/emart': 'Emart Production Portfolio | SOFTTEX FASHIONS',
      '/products/head': 'Head Sportswear Production Portfolio | SOFTTEX FASHIONS',
      '/products/tesco': 'Tesco F&F Production Portfolio | SOFTTEX FASHIONS',
      '/products/eddiebauer': 'Eddie Bauer Outerwear Portfolio | SOFTTEX FASHIONS',
      '/products/forever': 'Forever 21 Fast Fashion Portfolio | SOFTTEX FASHIONS',
      '/products/skechers': 'Skechers Performance Apparel | SOFTTEX FASHIONS',
      '/products/keithhering': 'Keith Hering Graphic Collection | SOFTTEX FASHIONS',
      '/blog': 'Apparel Sourcing Intelligence & Fashion Insights | SOFTTEX FASHIONS',
      '/sourcing-hub': 'Global Apparel Sourcing Command Hub & FOB Cost Benchmark | SOFTTEX FASHIONS',
      '/sourcing': 'Global Apparel Sourcing Command Hub & FOB Cost Benchmark | SOFTTEX FASHIONS',
      '/calculator': 'FOB Garment Cost & Duty Exemption Calculator | SOFTTEX FASHIONS',
    };

    let title = titles[rawPath];
    if (!title) {
      const matched = Object.entries(titles).find(([k]) => k !== '/' && rawPath.endsWith(k));
      if (matched) title = matched[1];
    }
    if (title) {
      document.title = title;
    }
  }, [location.pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <Suspense fallback={<div className="softtex-route-loading" role="status">Loading administration…</div>}>
        <Routes>
          <Route path="/admin/*" element={<AdminRoot />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <div className="softtex-public-site">
      <Navbar />

      <main id="main-content">
        <Suspense fallback={<div className="softtex-route-instant" aria-hidden="true" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about/company-profile" element={<AboutPage />} />
            <Route path="/about/vision" element={<VisionPage />} />
            <Route path="/about/management" element={<ManagementPage />} />
            <Route path="/management" element={<Navigate to="/about/management" replace />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/quality" element={<QualityPage />} />
            <Route path="/compliance" element={<CompliancePage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/terms-conditions" element={<TermsPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Sourcing Intelligence Blog */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<ArticleDetailPage />} />

            {/* Sourcing Command Hub & Utilities */}
            <Route path="/sourcing-hub" element={<SourcingHub />} />
            <Route path="/sourcing" element={<SourcingHub />} />
            <Route path="/calculator" element={<SourcingHub />} />
            <Route path="/sourcing/calculator" element={<SourcingHub />} />
            <Route path="/fabrics" element={<SourcingHub />} />
            <Route path="/audits" element={<SourcingHub />} />

            {/* Product Catalogues & Gallery */}
            <Route path="/catalogue" element={<ProductsPage />} />
            <Route path="/catalogue/misc" element={<Navigate to="/catalogue/womens" replace />} />
            <Route path="/catalogue/:slug" element={<ProductGalleryPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/misc" element={<Navigate to="/catalogue/womens" replace />} />
            <Route path="/products/:slug" element={<ProductGalleryPage />} />

            {/* Route Aliases */}
            <Route path="/company-profile" element={<AboutPage />} />
            <Route path="/vision" element={<VisionPage />} />
            <Route path="/management" element={<ManagementPage />} />
            <Route path="/mens" element={<ProductGalleryPage clientSlug="mens" />} />
            <Route path="/womens" element={<ProductGalleryPage clientSlug="womens" />} />
            <Route path="/kids" element={<ProductGalleryPage clientSlug="kids" />} />
            <Route path="/us-polo" element={<ProductGalleryPage clientSlug="us-polo" />} />
            <Route path="/rich-cotton" element={<ProductGalleryPage clientSlug="rich-cotton" />} />
            <Route path="/emart" element={<ProductGalleryPage clientSlug="emart" />} />
            <Route path="/head" element={<ProductGalleryPage clientSlug="head" />} />
            <Route path="/tesco" element={<ProductGalleryPage clientSlug="tesco" />} />
            <Route path="/eddiebauer" element={<ProductGalleryPage clientSlug="eddiebauer" />} />
            <Route path="/forever" element={<ProductGalleryPage clientSlug="forever" />} />
            <Route path="/skechers" element={<ProductGalleryPage clientSlug="skechers" />} />
            <Route path="/keithhering" element={<ProductGalleryPage clientSlug="keithhering" />} />

            {/* 404 Not Found Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />

      <FloatingDockIsland />
      <RfqIsland />
    </div>
  );
}

export default function App() {
  const getBasename = () => {
    try {
      const base = window.__SOFTTEX_BASE_URL__;
      if (base) {
        const url = new URL(base);
        const path = url.pathname.replace(/\/$/, '');
        return path || '/';
      }
    } catch (e) {}
    return '/';
  };

  const basename = getBasename();

  return (
    <BrowserRouter basename={basename}>
      <ScrollToTop />
      <PageSeoTracker />
      <AppContent />
    </BrowserRouter>
  );
}
