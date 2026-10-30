import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Send,
  MessageCircle,
  HelpCircle,
  Award,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { assetUrl } from '../utils/asset';

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [faqOpenIndex, setFaqOpenIndex] = useState(0);

  const baseUrl = (window.__SOFTTEX_BASE_URL__ || window.__SOF値EX_BASE_URL__ || '').replace(/\/$/, '');

  useEffect(() => {
    async function loadArticle() {
      try {
        setLoading(true);
        const res = await fetch(`${baseUrl}/api/blogs/${slug}`);
        const data = await res.json();
        if (data && data.article) {
          setArticle(data.article);
          document.title = `${data.article.meta_title || data.article.title} | SOFTTEX FASHIONS WEAR LTD`;
        } else {
          setArticle(null);
        }
      } catch (err) {
        console.error('Failed to load article detail:', err);
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [slug, baseUrl]);

  // Inject JSON-LD Schema into DOM for SEO Rich Snippets
  useEffect(() => {
    if (!article) return;

    let parsedFaqs = [];
    if (article.faq_schema) {
      parsedFaqs = typeof article.faq_schema === 'string' ? JSON.parse(article.faq_schema) : article.faq_schema;
    }

    const schemaObj = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline: article.title,
          description: article.meta_description,
          author: {
            '@type': 'Organization',
            name: article.author || 'SOFTTEX FASHIONS WEAR LIMITED',
          },
          publisher: {
            '@type': 'Organization',
            name: 'SOFTTEX FASHIONS WEAR LIMITED',
            logo: {
              '@type': 'ImageObject',
              url: `${window.location.origin}/images/logo.png`,
            },
          },
          datePublished: article.created_at,
          dateModified: article.updated_at || article.created_at,
        },
      ],
    };

    if (parsedFaqs && parsedFaqs.length > 0) {
      schemaObj['@graph'].push({
        '@type': 'FAQPage',
        mainEntity: parsedFaqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
          },
        })),
      });
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaObj);
    script.id = 'article-json-ld';
    document.head.appendChild(script);

    return () => {
      const oldScript = document.getElementById('article-json-ld');
      if (oldScript) oldScript.remove();
    };
  }, [article]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-500">
        <div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
          Loading Sourcing Intelligence Whitepaper...
        </p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-[70vh] bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4 font-black text-2xl">
          404
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Whitepaper Dossier Not Found</h2>
        <p className="text-slate-500 text-sm max-w-md mb-6">
          The requested sourcing article could not be located or may have been relocated.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs no-underline transition shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sourcing Intelligence Hub</span>
        </Link>
      </div>
    );
  }

  const faqs = article.faq_schema
    ? typeof article.faq_schema === 'string'
      ? JSON.parse(article.faq_schema)
      : article.faq_schema
    : [];

  const focusKw = article.focus_keyword || 'Garments Sourcing';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-amber-500/20 selection:text-amber-900 pb-20">
      {/* Article Header Bar */}
      <section className="bg-slate-950 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Breadcrumb navigation */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link to="/blog" className="hover:text-amber-400 transition flex items-center gap-1 no-underline text-slate-400">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sourcing Hub</span>
            </Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">{focusKw}</span>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                {focusKw}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.reading_time || '7 min read'}</span>
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                <Calendar className="w-3.5 h-3.5" />
                <span>{article.created_at ? new Date(article.created_at).toLocaleDateString() : '2026'}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              {article.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              {article.excerpt}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-slate-950 font-black text-sm">
                ST
              </div>
              <div>
                <div className="font-bold text-white">{article.author}</div>
                <div className="text-[11px] text-amber-400">{article.author_role || 'Apparel Procurement Desk'}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-[11px] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>AQL 1.5 Verified Spec</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Article Body (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
            {/* Formatted Technical HTML Content */}
            <div
              className="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-4
                prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-slate-100 prose-h2:pb-2
                prose-h3:text-xl prose-h3:mt-6 prose-h3:text-slate-800
                prose-p:text-slate-700 prose-p:leading-relaxed
                prose-strong:text-slate-900 prose-strong:font-bold
                prose-table:w-full prose-table:text-left prose-table:border-collapse prose-table:my-6
                prose-th:bg-slate-100 prose-th:p-3 prose-th:font-black prose-th:text-xs prose-th:uppercase prose-th:tracking-wider prose-th:border prose-th:border-slate-200
                prose-td:p-3 prose-td:text-xs prose-td:border prose-td:border-slate-200 prose-td:bg-slate-50/50
                prose-ul:list-disc prose-ul:pl-5 prose-ul:space-y-1.5
                prose-ol:list-decimal prose-ol:pl-5 prose-ol:space-y-1.5"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Buyer FAQs Section (Schema.org Compliant Accordion) */}
            {faqs.length > 0 && (
              <div className="pt-8 border-t border-slate-200 space-y-4">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-500" />
                  <h3 className="text-xl font-black text-slate-900">
                    Frequently Asked Procurement Questions
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  Direct answers to common commercial, compliance, and sampling questions from fashion brand sourcing managers.
                </p>

                <div className="space-y-3 pt-2">
                  {faqs.map((f, i) => {
                    const isOpen = faqOpenIndex === i;
                    return (
                      <div
                        key={i}
                        className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden transition"
                      >
                        <button
                          type="button"
                          onClick={() => setFaqOpenIndex(isOpen ? null : i)}
                          className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-amber-700 transition cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[10px] font-black shrink-0">
                              Q
                            </span>
                            <span>{f.q}</span>
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                              isOpen ? 'rotate-180 text-amber-600' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200/60 bg-white">
                            {f.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sourcing Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Sourcing Dossier Request Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-md space-y-5 sticky top-24 border border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black text-xs">
                  RFQ
                </div>
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">
                    Procure This Garment Line
                  </h4>
                  <p className="text-[11px] text-slate-400">Direct Factory Merchandising Desk</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Target Line</span>
                  <div className="font-bold text-amber-400">{focusKw}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Sampling &amp; Lab-Dips</span>
                  <div className="font-bold text-white">5 to 7 Days Proto Delivery</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Production Lead Time</span>
                  <div className="font-bold text-white">45 to 60 Days (FOB Chittagong)</div>
                </div>
              </div>

              <div className="pt-2 space-y-2.5">
                <Link
                  to="/contact"
                  className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2 no-underline text-center"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Custom Quotation</span>
                </Link>

                <a
                  href={`https://wa.me/8801713000000?text=${encodeURIComponent(
                    `Hello Softtex Fashions, I read your whitepaper on "${article.title}" and would like to request FOB pricing and sample tech pack review.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center justify-center gap-2 no-underline text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Direct Merchandiser WhatsApp</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-slate-800 space-y-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>AQL 1.5 FRI Independent Quality Gate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>OEKO-TEX Standard 100, BSCI, WRAP</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>0% Duty Tariff under EU &amp; UK GSP Rules</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
