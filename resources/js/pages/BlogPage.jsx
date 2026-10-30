import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  BookOpen,
  Tag,
  Clock,
  ArrowRight,
  Search,
  CheckCircle,
  FileText,
  ShieldCheck,
  TrendingUp,
  Layers,
  Award
} from 'lucide-react';
import { assetUrl } from '../utils/asset';

export default function BlogPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const baseUrl = (window.__SOFTTEX_BASE_URL__ || window.__SOF値EX_BASE_URL__ || '').replace(/\/$/, '');

  useEffect(() => {
    async function loadArticles() {
      try {
        setLoading(true);
        const res = await fetch(`${baseUrl}/api/blogs`);
        const data = await res.json();
        if (data && data.articles) {
          setArticles(data.articles);
        }
      } catch (err) {
        console.error('Failed to load articles:', err);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
  }, [baseUrl]);

  const categories = ['All', 'Knitwear', 'Denim & Woven', 'Quality & Compliance', 'Costing & Tariffs'];

  const filteredArticles = articles.filter((art) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      art.title?.toLowerCase().includes(q) ||
      art.focus_keyword?.toLowerCase().includes(q) ||
      art.excerpt?.toLowerCase().includes(q);

    if (!matchesSearch) return false;
    if (selectedCategory === 'All') return true;
    return art.tags?.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  const featured = articles[0] || null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-amber-500/20 selection:text-amber-900">
      {/* Hero Banner */}
      <section className="relative bg-slate-950 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Garments Procurement Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-3xl mx-auto leading-tight">
            Apparel Sourcing Whitepapers &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              Technical RMG Insights
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            In-depth procurement guides for international fashion brands: fabric GSM specs, AQL 1.5 quality gates, transparent FOB costing, and Bangladesh duty-free tariff rules.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search topics (e.g. Knitwear, AQL 1.5, Denim, FOB costing)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Pillar Article */}
        {featured && !searchQuery && selectedCategory === 'All' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden hover:shadow-md transition">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px] tracking-wide uppercase">
                      Featured Pillar Whitepaper
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{featured.reading_time || '7 min read'}</span>
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                    <Link
                      to={`/blog/${featured.slug}`}
                      className="hover:text-amber-600 transition no-underline text-slate-900"
                    >
                      {featured.title}
                    </Link>
                  </h2>

                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    By <strong className="text-slate-800">{featured.author}</strong>
                  </div>

                  <Link
                    to={`/blog/${featured.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs transition shadow-xs no-underline"
                  >
                    <span>Read Sourcing Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 p-8 sm:p-12 flex flex-col justify-center text-white space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Technical RMG Standards Included
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Fabric GSM, Yarn Count &amp; Shrinkage Metrics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>AQL 1.5 Final Random Inspection (FRI) Protocol</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Transparent FOB Cost Breakdown Matrix</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>EU &amp; UK GSP Duty Exemption Framework</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Article Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-500" />
              <span>Sourcing Whitepapers &amp; Procurement Insights</span>
            </h3>
            <span className="text-xs font-semibold text-slate-500">
              Showing {filteredArticles.length} published articles
            </span>
          </div>

          {loading ? (
            <div className="py-20 text-center text-slate-400">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-xs">Loading sourcing intelligence from MySQL...</p>
            </div>
          ) : filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((art) => (
                <article
                  key={art.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold text-[10px]">
                        {art.focus_keyword || 'Sourcing'}
                      </span>
                      <span className="text-slate-400 flex items-center gap-1 font-mono text-[11px]">
                        <Clock className="w-3 h-3" />
                        <span>{art.reading_time || '6 min'}</span>
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-slate-900 leading-snug group-hover:text-amber-600 transition">
                      <Link to={`/blog/${art.slug}`} className="no-underline text-slate-900 hover:text-amber-600">
                        {art.title}
                      </Link>
                    </h4>

                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono text-[11px]">
                      {art.created_at ? new Date(art.created_at).toLocaleDateString() : 'Updated'}
                    </span>

                    <Link
                      to={`/blog/${art.slug}`}
                      className="inline-flex items-center gap-1.5 font-bold text-amber-700 hover:text-amber-800 no-underline"
                    >
                      <span>Read Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">
              <FileText className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-400" />
              <p className="text-sm font-semibold text-slate-600">No articles matched your criteria.</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for other terms or reset filters.</p>
            </div>
          )}
        </div>

        {/* Global Sourcing CTA Island */}
        <section className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-3xl p-8 sm:p-12 text-slate-950 shadow-md">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-slate-950/10 inline-block">
              Immediate Merchandising Response
            </span>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950">
              Ready to Source Directly from Bangladesh?
            </h3>
            <p className="text-sm sm:text-base font-medium text-slate-900 max-w-xl mx-auto">
              Send your Tech Pack and target quantities to receive a fast, itemized FOB costing sheet and lab-dip timeline within 24 hours.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm no-underline"
              >
                <span>Request Custom Sourcing Dossier &rarr;</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
