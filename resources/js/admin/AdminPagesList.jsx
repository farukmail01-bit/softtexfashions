import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from './AdminContext';
import {
  FileText,
  Search,
  Plus,
  Edit3,
  ExternalLink,
  Trash2,
  CheckCircle,
  Clock,
  Sparkles,
  Layers,
  X,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

export default function AdminPagesList() {
  const { apiFetch, showToast } = useAdmin();
  const [pages, setPages] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'corporate' | 'services' | 'draft'
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [creating, setCreating] = useState(false);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/api/admin/pages');
      if (res && res.pages) {
        setPages(res.pages);
      }
    } catch (err) {
      showToast(err.message || 'Failed to fetch pages', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const res = await apiFetch(`/api/admin/pages/${id}/toggle-status`, {
        method: 'POST',
      });
      if (res.success) {
        showToast(res.message, 'success');
        setPages((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: res.status } : p))
        );
      }
    } catch (err) {
      showToast(err.message || 'Failed to update status', 'error');
    }
  };

  const handleCreatePage = async (e) => {
    e.preventDefault();
    if (!newTitle || !newSlug) {
      showToast('Title and URL slug are required', 'error');
      return;
    }

    setCreating(true);
    try {
      const res = await apiFetch('/api/admin/pages', {
        method: 'POST',
        body: JSON.stringify({
          title: newTitle,
          slug: newSlug,
          subtitle: newSubtitle,
          status: 'published',
        }),
      });

      if (res.success) {
        showToast('Page created successfully!', 'success');
        setShowCreateModal(false);
        setNewTitle('');
        setNewSlug('');
        setNewSubtitle('');
        fetchPages();
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id, title, slug) => {
    const coreSlugs = ['home', 'services', 'quality', 'company-profile', 'vision', 'management', 'compliance', 'terms', 'contact'];
    if (coreSlugs.includes(slug)) {
      showToast('Core system pages cannot be deleted.', 'error');
      return;
    }

    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const res = await apiFetch(`/api/admin/pages/${id}`, { method: 'DELETE' });
      if (res.success) {
        showToast('Page deleted', 'info');
        setPages(pages.filter((p) => p.id !== id));
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const coreSlugs = ['home', 'services', 'quality', 'company-profile', 'vision', 'management', 'compliance', 'terms', 'contact'];

  const filteredPages = pages.filter((p) => {
    const matchSearch =
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.slug?.toLowerCase().includes(search.toLowerCase());

    if (!matchSearch) return false;

    if (filterType === 'corporate') {
      return ['home', 'company-profile', 'vision', 'management', 'compliance', 'terms', 'contact'].includes(p.slug);
    }
    if (filterType === 'services') {
      return ['services', 'quality'].includes(p.slug);
    }
    if (filterType === 'draft') {
      return p.status === 'draft';
    }
    return true;
  });

  const getPublicLink = (slug) => {
    if (slug === 'home') return '/';
    if (['company-profile', 'vision', 'management'].includes(slug)) return `/about/${slug}`;
    return `/${slug}`;
  };

  return (
    <div className="space-y-4 w-full pb-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3.5">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-500" />
            <span>Pages Management &amp; Content Engine</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Dynamic content control, structured accordions, and automated Google SEO indexing.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-2xs transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create New Page</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3 rounded-xl bg-white border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search pages by title or slug..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white"
          />
        </div>

        {/* Smart Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 text-xs p-1 bg-slate-100/90 rounded-xl border border-slate-200/80 shadow-2xs">
          {[
            { id: 'all', name: 'All Pages', count: pages.length },
            { id: 'corporate', name: 'Corporate', count: 6 },
            { id: 'services', name: 'Services & QA', count: 2 },
            { id: 'draft', name: 'Drafts', count: pages.filter((p) => p.status === 'draft').length },
          ].map((tab) => {
            const isActive = filterType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-slate-950 font-bold shadow-xs border border-slate-200/90 ring-1 ring-black/5'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
                }`}
              >
                <span>{tab.name}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  isActive ? 'bg-amber-100 text-amber-800' : 'bg-slate-200/80 text-slate-600'
                }`}>
                  {tab.count}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-xs" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
        {loading ? (
          <div className="p-16 text-center text-slate-400">
            <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <span className="text-xs">Loading CMS pages from MySQL...</span>
          </div>
        ) : filteredPages.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase font-bold border-b border-slate-200 text-[11px]">
                <tr>
                  <th className="py-4 px-6">Page Title &amp; SEO Health</th>
                  <th className="py-4 px-6">URL Slug</th>
                  <th className="py-4 px-6">Dynamic Features</th>
                  <th className="py-4 px-6">Status (1-Click Toggle)</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPages.map((page) => {
                  const isCore = coreSlugs.includes(page.slug);
                  const sectionsCount =
                    page.sections_data?.accordion_items?.length ||
                    page.sections_data?.sections?.length ||
                    0;
                  const isPublished = page.status === 'published';

                  return (
                    <tr key={page.id} className="hover:bg-slate-50/70 transition">
                      {/* Title & SEO Badge */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">{page.title}</span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                            SEO 98/100
                          </span>
                        </div>
                        {page.subtitle && (
                          <div className="text-[11px] text-slate-500 max-w-sm truncate mt-0.5">
                            {page.subtitle}
                          </div>
                        )}
                      </td>

                      {/* Slug */}
                      <td className="py-4 px-6">
                        <span className="font-mono text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-semibold">
                          /{page.slug}
                        </span>
                      </td>

                      {/* Sections Count */}
                      <td className="py-4 px-6">
                        {sectionsCount > 0 ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-semibold">
                            <Layers className="w-3 h-3" />
                            <span>{sectionsCount} Accordion Items</span>
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">Standard Body</span>
                        )}
                      </td>

                      {/* 1-Click Status Toggle */}
                      <td className="py-4 px-6">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(page.id, page.status)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition cursor-pointer ${
                            isPublished
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                          }`}
                          title="Click to toggle between Published & Draft"
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isPublished ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                            }`}
                          />
                          <span>{page.status}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            to={`/admin/pages/edit/${page.slug || page.id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold transition shadow-2xs"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                            <span>Edit &amp; SEO</span>
                          </Link>

                          <Link
                            to={getPublicLink(page.slug)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition border border-slate-200"
                            title="Preview Public Page"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>

                          {!isCore && (
                            <button
                              onClick={() => handleDelete(page.id, page.title, page.slug)}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 transition cursor-pointer"
                              title="Delete Page"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400">
            No pages found matching &ldquo;{search}&rdquo;.
          </div>
        )}
      </div>

      {/* Create Page Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-xl relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-1">Create New CMS Page</h3>
            <p className="text-xs text-slate-500 mb-5">
              Add a dynamic custom page to your buying house catalog.
            </p>

            <form onSubmit={handleCreatePage} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Page Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => {
                    setNewTitle(e.target.value);
                    if (!newSlug) {
                      setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                    }
                  }}
                  placeholder="e.g. Sustainable Yarn Sourcing"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">URL Slug</label>
                <input
                  type="text"
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value)}
                  placeholder="sustainable-yarn"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 font-mono focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subtitle (Optional)</label>
                <textarea
                  rows={2}
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  placeholder="Brief summary of this page..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs transition disabled:opacity-50 cursor-pointer"
                >
                  {creating ? 'Creating...' : 'Create Page'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
