import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAdmin } from './AdminContext';
import MediaPickerModal from './MediaPickerModal';
import {
  ArrowLeft,
  Save,
  ExternalLink,
  Plus,
  Trash2,
  Layers,
  Search,
  Globe,
  Sparkles,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Smartphone,
  Monitor,
  Code2,
  FileText,
  Sliders,
  Building,
  Eye,
  Award,
  Phone,
  Briefcase,
  Quote,
  Image as ImageIcon,
  UploadCloud,
} from 'lucide-react';

export default function AdminPageEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { apiFetch, showToast } = useAdmin();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('sections'); // default to 'sections' since user is working on sections!
  const [googleDevice, setGoogleDevice] = useState('desktop');
  const [jsonMode, setJsonMode] = useState(false);
  const [jsonRaw, setJsonRaw] = useState('');
  const [jsonError, setJsonError] = useState('');

  // Global Media Library Modal State
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaSelectCallback, setMediaSelectCallback] = useState(null);
  const [mediaPickerTitle, setMediaPickerTitle] = useState('Select Image Asset');

  const openMediaPicker = (title, onSelectCb) => {
    setMediaPickerTitle(title || 'Select Image Asset');
    setMediaSelectCallback(() => onSelectCb);
    setMediaPickerOpen(true);
  };

  const handleMediaSelected = (item) => {
    const chosenUrl = item.file_url || item.url || item.file_path;
    if (typeof mediaSelectCallback === 'function') {
      mediaSelectCallback(chosenUrl);
    }
    setMediaPickerOpen(false);
    showToast('Image selected from Media Library!', 'success');
  };

  const [page, setPage] = useState({
    id: null,
    slug: '',
    title: '',
    subtitle: '',
    hero_title: '',
    hero_image: '',
    content: '',
    status: 'published',
    sections_data: {},
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
  });

  useEffect(() => {
    let mounted = true;
    async function loadPage() {
      try {
        setLoading(true);
        const res = await apiFetch(`/api/admin/pages/${id}`);
        if (mounted && res && res.page) {
          const p = res.page;
          let secData = p.sections_data;
          if (!secData || typeof secData !== 'object') {
            secData = {};
          }
          setPage({
            ...p,
            sections_data: secData,
            meta_title: p.meta_title || `${p.title} | SOFTTEX FASHIONS WEAR LIMITED`,
            meta_description: p.meta_description || p.subtitle || '',
            meta_keywords: p.meta_keywords || '',
          });
          setJsonRaw(JSON.stringify(secData, null, 2));
        }
      } catch (err) {
        showToast(err.message || 'Error loading page', 'error');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadPage();
    return () => {
      mounted = false;
    };
  }, [id, apiFetch, showToast]);

  // Keyboard shortcut Ctrl+S
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [page, jsonMode, jsonRaw]);

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);

    let secToSave = page.sections_data;
    if (jsonMode) {
      try {
        secToSave = JSON.parse(jsonRaw);
        setJsonError('');
      } catch (err) {
        setJsonError('Invalid JSON format: ' + err.message);
        setSaving(false);
        showToast('Please fix JSON syntax before saving', 'error');
        return;
      }
    }

    try {
      const res = await apiFetch(`/api/admin/pages/${page.id || id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: page.title,
          subtitle: page.subtitle,
          hero_title: page.hero_title,
          hero_image: page.hero_image,
          content: page.content,
          sections_data: secToSave,
          meta_title: page.meta_title,
          meta_description: page.meta_description,
          meta_keywords: page.meta_keywords,
          status: page.status,
        }),
      });

      if (res.success) {
        showToast('Page updated successfully! Live changes synchronized to MySQL.', 'success');
        if (res.page) {
          setPage((prev) => ({
            ...prev,
            ...res.page,
            sections_data: res.page.sections_data || secToSave,
          }));
          setJsonRaw(JSON.stringify(res.page.sections_data || secToSave, null, 2));
        }
      }
    } catch (err) {
      showToast(err.message || 'Failed to save page', 'error');
    } finally {
      setSaving(false);
    }
  };

  const updateSectionField = (key, value) => {
    const updated = { ...page.sections_data, [key]: value };
    setPage({ ...page, sections_data: updated });
    setJsonRaw(JSON.stringify(updated, null, 2));
  };

  const getPublicLink = () => {
    const slug = page.slug;
    if (slug === 'home') return '/';
    if (['company-profile', 'vision', 'management'].includes(slug)) return `/about/${slug}`;
    return `/${slug}`;
  };

  if (loading) {
    return (
      <div className="p-20 text-center text-slate-400">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xs">Loading page editor from MySQL...</p>
      </div>
    );
  }

  const slug = page.slug;
  const sections = page.sections_data || {};
  const metaTitleLen = (page.meta_title || '').length;
  const metaDescLen = (page.meta_description || '').length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Sticky Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/95 border border-slate-200/90 backdrop-blur-md sticky top-16 z-20 shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/pages"
            className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition border border-slate-200"
            title="Back to Pages list"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-slate-900">{page.title}</h1>
              <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold">
                /{page.slug}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  page.status === 'published'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                {page.status === 'published' ? 'Live' : 'Draft'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Direct synchronization with public website &bull; Shortcut:{' '}
              <kbd className="font-mono px-1 bg-slate-100 border border-slate-200 rounded text-[9px] font-semibold">
                Ctrl+S
              </kbd>{' '}
              to save
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href={getPublicLink()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition border border-slate-200"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live</span>
          </a>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 rounded-xl shadow-xs transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving to MySQL...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Modern Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('sections')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'sections'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Page Sections &amp; Blocks (Dynamic)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'content'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>General &amp; Hero Content</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('seo')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'seo'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>SEO &amp; Google Preview</span>
        </button>

        <div className="ml-auto">
          <button
            type="button"
            onClick={() => {
              if (!jsonMode) {
                setJsonRaw(JSON.stringify(page.sections_data, null, 2));
              }
              setJsonMode(!jsonMode);
            }}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition flex items-center gap-1.5 cursor-pointer ${
              jsonMode
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>{jsonMode ? 'Exit JSON Mode' : 'Advanced JSON'}</span>
          </button>
        </div>
      </div>

      {/* JSON MODE EDITOR */}
      {jsonMode && (
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900">Advanced JSON Structure Editor</h3>
              <p className="text-[11px] text-slate-500">
                Direct raw JSON control for all database fields under <code className="text-amber-700">sections_data</code>.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                try {
                  const parsed = JSON.parse(jsonRaw);
                  setPage({ ...page, sections_data: parsed });
                  setJsonError('');
                  showToast('JSON synced with visual fields', 'success');
                } catch (e) {
                  setJsonError(e.message);
                }
              }}
              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold cursor-pointer"
            >
              Validate &amp; Sync
            </button>
          </div>

          {jsonError && (
            <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-mono">
              {jsonError}
            </div>
          )}

          <textarea
            rows={14}
            value={jsonRaw}
            onChange={(e) => setJsonRaw(e.target.value)}
            className="w-full font-mono text-xs p-3.5 rounded-xl bg-slate-900 text-emerald-400 border border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
          />
        </div>
      )}

      {/* TAB 1: GENERAL & HERO CONTENT */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-600" />
              General Page Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Page Title</label>
                <input
                  type="text"
                  value={page.title}
                  onChange={(e) => setPage({ ...page, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">URL Slug</label>
                <input
                  type="text"
                  value={page.slug}
                  disabled
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-sm font-mono cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle / Tagline</label>
              <input
                type="text"
                value={page.subtitle || ''}
                onChange={(e) => setPage({ ...page, subtitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Hero Banner Title</label>
                <input
                  type="text"
                  value={page.hero_title || ''}
                  onChange={(e) => setPage({ ...page, hero_title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Publication Status</label>
                <select
                  value={page.status}
                  onChange={(e) => setPage({ ...page, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-amber-500 focus:border-amber-500 cursor-pointer"
                >
                  <option value="published">Published (Visible on Live Website)</option>
                  <option value="draft">Draft (Hidden from Public)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Hero Banner / Cover Image
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={page.hero_image || ''}
                  onChange={(e) => setPage({ ...page, hero_image: e.target.value })}
                  placeholder="URL or select from Global Media Library"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-mono focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() =>
                    openMediaPicker('Select Page Hero Banner Image', (url) => {
                      setPage((prev) => ({ ...prev, hero_image: url }));
                    })
                  }
                  className="px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer transition-colors"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Media Library</span>
                </button>
              </div>
              {page.hero_image && (
                <div className="mt-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 inline-flex items-center gap-3">
                  <img
                    src={page.hero_image.startsWith('http') || page.hero_image.startsWith('/') ? page.hero_image : `/${page.hero_image}`}
                    alt="Hero Banner Preview"
                    className="w-20 h-12 rounded-lg object-cover border border-slate-200 bg-white"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="text-[11px] text-slate-500">
                    <p className="font-semibold text-slate-700">Active Banner Preview</p>
                    <button
                      type="button"
                      onClick={() => setPage((prev) => ({ ...prev, hero_image: '' }))}
                      className="text-red-500 hover:text-red-700 text-[10px] mt-0.5 block cursor-pointer"
                    >
                      Clear Banner
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Main Body Paragraph / Overview Content
              </label>
              <textarea
                rows={5}
                value={page.content || ''}
                onChange={(e) => setPage({ ...page, content: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm leading-relaxed focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SECTIONS & CONTENT BLOCKS (100% DYNAMIC) */}
      {activeTab === 'sections' && (
        <div className="space-y-6">
          {/* ============================================================== */}
          {/* A. HOME PAGE SECTIONS EDITOR */}
          {/* ============================================================== */}
          {slug === 'home' && (
            <div className="space-y-6">
              {/* 1. Hero Carousel Slides */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-amber-600" />
                      Hero Slider Slides
                    </h3>
                    <p className="text-xs text-slate-500">
                      Full-width slider banners on the homepage. Edit title and subtitle for each slide.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const slides = sections.hero_slides || [];
                      updateSectionField('hero_slides', [
                        ...slides,
                        {
                          title: 'New Fashion Banner Title',
                          subtitle: 'New apparel sourcing subtitle',
                          bg_class: `slider_img_${slides.length % 4 === 0 ? 'one' : slides.length % 4 === 1 ? 'two' : slides.length % 4 === 2 ? 'three' : 'four'}`,
                        },
                      ]);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold transition border border-amber-200 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Slide</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {(sections.hero_slides || []).map((slide, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">Slide #{sIdx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const slides = [...(sections.hero_slides || [])];
                            slides.splice(sIdx, 1);
                            updateSectionField('hero_slides', slides);
                          }}
                          className="text-slate-400 hover:text-red-600 transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-slate-600 block mb-1">
                            Slide Headline (H1)
                          </label>
                          <input
                            type="text"
                            value={slide.title || ''}
                            onChange={(e) => {
                              const slides = [...(sections.hero_slides || [])];
                              slides[sIdx] = { ...slides[sIdx], title: e.target.value };
                              updateSectionField('hero_slides', slides);
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-600 block mb-1">
                            Slide Subtitle / Description
                          </label>
                          <input
                            type="text"
                            value={slide.subtitle || ''}
                            onChange={(e) => {
                              const slides = [...(sections.hero_slides || [])];
                              slides[sIdx] = { ...slides[sIdx], subtitle: e.target.value };
                              updateSectionField('hero_slides', slides);
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs"
                          />
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex-1 w-full">
                          <label className="text-[11px] font-bold text-slate-600 block mb-1">
                            Background Banner Image (Custom or from Media Library)
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Leave empty for default CSS theme class, or paste/pick image URL"
                              value={slide.image || slide.bg_image || ''}
                              onChange={(e) => {
                                const slides = [...(sections.hero_slides || [])];
                                slides[sIdx] = { ...slides[sIdx], image: e.target.value };
                                updateSectionField('hero_slides', slides);
                              }}
                              className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono"
                            />
                            <button
                              type="button"
                              onClick={() => openMediaPicker(`Select Background for Slide #${sIdx + 1}`, (url) => {
                                const slides = [...(sections.hero_slides || [])];
                                slides[sIdx] = { ...slides[sIdx], image: url };
                                updateSectionField('hero_slides', slides);
                              })}
                              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition shrink-0 flex items-center gap-1.5 cursor-pointer border border-slate-300"
                            >
                              <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                              <span>Pick Media</span>
                            </button>
                          </div>
                        </div>
                        {(slide.image || slide.bg_image) && (
                          <div className="relative group w-14 h-10 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                            <img
                              src={slide.image || slide.bg_image}
                              alt="Slide Preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const slides = [...(sections.hero_slides || [])];
                                slides[sIdx] = { ...slides[sIdx], image: '' };
                                updateSectionField('hero_slides', slides);
                              }}
                              className="absolute inset-0 bg-red-900/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-[9px] font-bold cursor-pointer"
                            >
                              Clear
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Who We Are Section */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Building className="w-4 h-4 text-amber-600" />
                  "Who We Are?" Section
                </h3>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Section Title</label>
                  <input
                    type="text"
                    value={sections.about_section?.title || 'Who we are?'}
                    onChange={(e) => {
                      updateSectionField('about_section', {
                        ...(sections.about_section || {}),
                        title: e.target.value,
                      });
                    }}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    About Section Side Image
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={sections.about_section?.image || 'static/media/about_bg_img.6b58bb76aba9d2a5587f.jpg'}
                      onChange={(e) => {
                        updateSectionField('about_section', {
                          ...(sections.about_section || {}),
                          image: e.target.value,
                        });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => openMediaPicker('Select About Section Image', (url) => {
                        updateSectionField('about_section', {
                          ...(sections.about_section || {}),
                          image: url,
                        });
                      })}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition shrink-0 flex items-center gap-1.5 cursor-pointer border border-slate-300"
                    >
                      <ImageIcon className="w-4 h-4 text-amber-600" />
                      <span>Media Library</span>
                    </button>
                  </div>
                  {sections.about_section?.image && (
                    <div className="w-24 h-16 rounded-lg bg-white border border-slate-200 overflow-hidden p-1 mt-2">
                      <img
                        src={sections.about_section.image.startsWith('http') || sections.about_section.image.startsWith('/') ? sections.about_section.image : `/${sections.about_section.image}`}
                        alt="About preview"
                        className="w-full h-full object-cover rounded"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">Paragraphs</label>
                    <button
                      type="button"
                      onClick={() => {
                        const paras = sections.about_section?.paragraphs || [];
                        updateSectionField('about_section', {
                          ...(sections.about_section || {}),
                          paragraphs: [...paras, 'New corporate overview paragraph.'],
                        });
                      }}
                      className="text-[11px] font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Paragraph</span>
                    </button>
                  </div>

                  {(sections.about_section?.paragraphs || []).map((p, pIdx) => (
                    <div key={pIdx} className="flex gap-2 items-start">
                      <textarea
                        rows={3}
                        value={p}
                        onChange={(e) => {
                          const paras = [...(sections.about_section?.paragraphs || [])];
                          paras[pIdx] = e.target.value;
                          updateSectionField('about_section', {
                            ...(sections.about_section || {}),
                            paragraphs: paras,
                          });
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs leading-relaxed"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const paras = [...(sections.about_section?.paragraphs || [])];
                          paras.splice(pIdx, 1);
                          updateSectionField('about_section', {
                            ...(sections.about_section || {}),
                            paragraphs: paras,
                          });
                        }}
                        className="p-2 text-slate-400 hover:text-red-600 transition cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Creative Highlights & Production Message */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Creative &amp; Trendy Fashion Section
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Headline</label>
                    <input
                      type="text"
                      value={sections.creative_section?.title || ''}
                      onChange={(e) => {
                        updateSectionField('creative_section', {
                          ...(sections.creative_section || {}),
                          title: e.target.value,
                        });
                      }}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={sections.creative_section?.subtitle || ''}
                      onChange={(e) => {
                        updateSectionField('creative_section', {
                          ...(sections.creative_section || {}),
                          subtitle: e.target.value,
                        });
                      }}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-2">4 Feature Cards</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(sections.creative_section?.features || []).map((feat, fIdx) => (
                      <input
                        key={fIdx}
                        type="text"
                        value={feat}
                        onChange={(e) => {
                          const feats = [...(sections.creative_section?.features || [])];
                          feats[fIdx] = e.target.value;
                          updateSectionField('creative_section', {
                            ...(sections.creative_section || {}),
                            features: feats,
                          });
                        }}
                        className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. Business Stats Counters */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  Business Dealt Counters
                </h3>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Counters Section Title</label>
                  <input
                    type="text"
                    value={sections.counter_section?.title || 'BUSINESS WE DEALT SO FAR'}
                    onChange={(e) => {
                      updateSectionField('counter_section', {
                        ...(sections.counter_section || {}),
                        title: e.target.value,
                      });
                    }}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {(sections.counter_section?.counters || []).map((c, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                    >
                      <label className="text-[10px] font-bold text-slate-500 block uppercase">
                        Counter #{cIdx + 1}
                      </label>
                      <input
                        type="text"
                        placeholder="Value (e.g. 100+)"
                        value={c.value}
                        onChange={(e) => {
                          const cnts = [...(sections.counter_section?.counters || [])];
                          cnts[cIdx] = { ...cnts[cIdx], value: e.target.value };
                          updateSectionField('counter_section', {
                            ...(sections.counter_section || {}),
                            counters: cnts,
                          });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-black text-amber-600"
                      />
                      <input
                        type="text"
                        placeholder="Title (e.g. Categories)"
                        value={c.title}
                        onChange={(e) => {
                          const cnts = [...(sections.counter_section?.counters || [])];
                          cnts[cIdx] = { ...cnts[cIdx], title: e.target.value };
                          updateSectionField('counter_section', {
                            ...(sections.counter_section || {}),
                            counters: cnts,
                          });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold"
                      />
                      <input
                        type="text"
                        placeholder="Subtitle (e.g. Available)"
                        value={c.subtitle}
                        onChange={(e) => {
                          const cnts = [...(sections.counter_section?.counters || [])];
                          cnts[cIdx] = { ...cnts[cIdx], subtitle: e.target.value };
                          updateSectionField('counter_section', {
                            ...(sections.counter_section || {}),
                            counters: cnts,
                          });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-600"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Approved Certifications Manager */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-600" />
                      Approved Factory Certifications (Global Accreditations)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Manage global certification logos (ACCORD, BSCI, OEKO-TEX, SEDEX, GOTS, WRAP, etc.) shown on homepage and compliance page.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const certs = sections.cert_logos || [];
                      updateSectionField('cert_logos', [
                        ...certs,
                        { name: 'NEW CERTIFICATION', img: 'images/certificatelogos/accord-logo.png' },
                      ]);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold transition border border-amber-200 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Certificate</span>
                  </button>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Certifications Section Heading Title
                  </label>
                  <input
                    type="text"
                    value={sections.certifications_heading || 'Our assigned manufactories are approved for these global certifications/standards'}
                    onChange={(e) => updateSectionField('certifications_heading', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(sections.cert_logos || []).map((cert, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3"
                    >
                      <div className="w-14 h-14 rounded-lg bg-white border border-slate-200 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                        <img
                          src={cert.img ? (cert.img.startsWith('http') || cert.img.startsWith('/') ? cert.img : `/${cert.img}`) : ''}
                          alt={cert.name}
                          className="w-full h-full object-contain"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <input
                          type="text"
                          placeholder="Certificate Name (e.g. ACCORD)"
                          value={cert.name}
                          onChange={(e) => {
                            const certs = [...(sections.cert_logos || [])];
                            certs[cIdx] = { ...certs[cIdx], name: e.target.value };
                            updateSectionField('cert_logos', certs);
                          }}
                          className="w-full px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold"
                        />
                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            placeholder="Image path / URL"
                            value={cert.img}
                            onChange={(e) => {
                              const certs = [...(sections.cert_logos || [])];
                              certs[cIdx] = { ...certs[cIdx], img: e.target.value };
                              updateSectionField('cert_logos', certs);
                            }}
                            className="w-full px-2 py-1 rounded-lg bg-white border border-slate-200 text-[10px] font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => openMediaPicker(`Select Logo for ${cert.name}`, (url) => {
                              const certs = [...(sections.cert_logos || [])];
                              certs[cIdx] = { ...certs[cIdx], img: url };
                              updateSectionField('cert_logos', certs);
                            })}
                            className="p-1 px-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-bold transition shrink-0 cursor-pointer"
                            title="Pick from Media Library"
                          >
                            Pick
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const certs = [...(sections.cert_logos || [])];
                          certs.splice(cIdx, 1);
                          updateSectionField('cert_logos', certs);
                        }}
                        className="text-slate-400 hover:text-red-600 transition cursor-pointer p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. Buyer Brand Partners Manager */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-amber-600" />
                      Buyer &amp; Brand Partners (Client Showcase)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Manage global fashion brand customer logos (Eddie Bauer, Forever 21, Guess, Skechers, US Polo, etc.).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const buyers = sections.buyer_logos || [];
                      updateSectionField('buyer_logos', [
                        ...buyers,
                        { name: 'NEW BRAND PARTNER', img: 'images/buyer/us-polo.jpg' },
                      ]);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold transition border border-amber-200 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Brand Partner</span>
                  </button>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Client Logos Section Heading
                  </label>
                  <input
                    type="text"
                    value={sections.clients_heading || 'OUR CLIENTS, BRANDS, CUSTOMERS- AROUND THE WORLD'}
                    onChange={(e) => updateSectionField('clients_heading', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(sections.buyer_logos || []).map((buyer, bIdx) => (
                    <div
                      key={bIdx}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3"
                    >
                      <div className="w-14 h-14 rounded-lg bg-white border border-slate-200 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                        <img
                          src={buyer.img ? (buyer.img.startsWith('http') || buyer.img.startsWith('/') ? buyer.img : `/${buyer.img}`) : ''}
                          alt={buyer.name}
                          className="w-full h-full object-contain"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <input
                          type="text"
                          placeholder="Brand Name (e.g. Guess)"
                          value={buyer.name}
                          onChange={(e) => {
                            const buyers = [...(sections.buyer_logos || [])];
                            buyers[bIdx] = { ...buyers[bIdx], name: e.target.value };
                            updateSectionField('buyer_logos', buyers);
                          }}
                          className="w-full px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold"
                        />
                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            placeholder="Image path / URL"
                            value={buyer.img}
                            onChange={(e) => {
                              const buyers = [...(sections.buyer_logos || [])];
                              buyers[bIdx] = { ...buyers[bIdx], img: e.target.value };
                              updateSectionField('buyer_logos', buyers);
                            }}
                            className="w-full px-2 py-1 rounded-lg bg-white border border-slate-200 text-[10px] font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => openMediaPicker(`Select Logo for ${buyer.name}`, (url) => {
                              const buyers = [...(sections.buyer_logos || [])];
                              buyers[bIdx] = { ...buyers[bIdx], img: url };
                              updateSectionField('buyer_logos', buyers);
                            })}
                            className="p-1 px-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-bold transition shrink-0 cursor-pointer"
                            title="Pick from Media Library"
                          >
                            Pick
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const buyers = [...(sections.buyer_logos || [])];
                          buyers.splice(bIdx, 1);
                          updateSectionField('buyer_logos', buyers);
                        }}
                        className="text-slate-400 hover:text-red-600 transition cursor-pointer p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* B. COMPANY PROFILE SECTIONS EDITOR */}
          {/* ============================================================== */}
          {slug === 'company-profile' && (
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Building className="w-4 h-4 text-amber-600" />
                    Company Overview Details
                  </h3>
                  <p className="text-xs text-slate-500">
                    Edit corporate legal identity, trade license, CEO, capacity, product lines, and export metrics.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const items = sections.profile_items || [];
                    updateSectionField('profile_items', [
                      ...items,
                      { label: 'New Metric / Detail', value: 'Enter details here' },
                    ]);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold transition border border-amber-200 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Property</span>
                </button>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Section Title</label>
                <input
                  type="text"
                  value={sections.section_title || 'Company Overview'}
                  onChange={(e) => updateSectionField('section_title', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold"
                />
              </div>

              <div className="space-y-3">
                {(sections.profile_items || []).map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col md:flex-row gap-3 items-start md:items-center"
                  >
                    <div className="w-full md:w-1/3">
                      <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                        Field Label
                      </label>
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => {
                          const items = [...(sections.profile_items || [])];
                          items[idx] = { ...items[idx], label: e.target.value };
                          updateSectionField('profile_items', items);
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800"
                      />
                    </div>

                    <div className="w-full md:flex-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                        Content / Value
                      </label>
                      <textarea
                        rows={2}
                        value={item.value}
                        onChange={(e) => {
                          const items = [...(sections.profile_items || [])];
                          items[idx] = { ...items[idx], value: e.target.value };
                          updateSectionField('profile_items', items);
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs leading-relaxed"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const items = [...(sections.profile_items || [])];
                        items.splice(idx, 1);
                        updateSectionField('profile_items', items);
                      }}
                      className="p-2 text-slate-400 hover:text-red-600 transition cursor-pointer self-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* C. VISION & MISSION SECTIONS EDITOR */}
          {/* ============================================================== */}
          {slug === 'vision' && (
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-1">
                  <Eye className="w-4 h-4 text-amber-600" />
                  Vision &amp; Mission Statements
                </h3>
                <p className="text-xs text-slate-500">
                  Manage the strategic vision statement and core mission objectives.
                </p>
              </div>

              {/* Vision Block */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-slate-700">Vision Heading</label>
                  <input
                    type="text"
                    value={sections.vision_title || 'Vision'}
                    onChange={(e) => updateSectionField('vision_title', e.target.value)}
                    className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    Vision Description Text
                  </label>
                  <textarea
                    rows={3}
                    value={sections.vision_text || ''}
                    onChange={(e) => updateSectionField('vision_text', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs leading-relaxed"
                  />
                </div>
              </div>

              {/* Mission Block */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-slate-700">Mission Heading</label>
                    <input
                      type="text"
                      value={sections.mission_title || 'Mission'}
                      onChange={(e) => updateSectionField('mission_title', e.target.value)}
                      className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const pts = sections.mission_points || [];
                      updateSectionField('mission_points', [
                        ...pts,
                        'New strategic corporate mission point.',
                      ]);
                    }}
                    className="text-[11px] font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Point</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {(sections.mission_points || []).map((pt, pIdx) => (
                    <div key={pIdx} className="flex gap-2 items-center">
                      <span className="text-amber-600 font-black text-sm">&bull;</span>
                      <input
                        type="text"
                        value={pt}
                        onChange={(e) => {
                          const pts = [...(sections.mission_points || [])];
                          pts[pIdx] = e.target.value;
                          updateSectionField('mission_points', pts);
                        }}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const pts = [...(sections.mission_points || [])];
                          pts.splice(pIdx, 1);
                          updateSectionField('mission_points', pts);
                        }}
                        className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* D. MANAGEMENT SECTIONS EDITOR */}
          {/* ============================================================== */}
          {slug === 'management' && (
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-1">
                  <Quote className="w-4 h-4 text-amber-600" />
                  CEO Quote &amp; Management Message
                </h3>
                <p className="text-xs text-slate-500">
                  Update the executive leadership message, quote author, and portrait image.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Quote Heading</label>
                  <input
                    type="text"
                    value={sections.quote_title || 'Words of wisdom from our CEO'}
                    onChange={(e) => updateSectionField('quote_title', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    CEO Author &amp; Title
                  </label>
                  <input
                    type="text"
                    value={sections.ceo_author || '--- Muhammad Bashir Uddin, C.E.O, SOFTTEX FASHIONS WEAR LTD.'}
                    onChange={(e) => updateSectionField('ceo_author', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full CEO Message</label>
                <textarea
                  rows={8}
                  value={sections.quote_text || ''}
                  onChange={(e) => updateSectionField('quote_text', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">CEO Portrait Photo</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={sections.ceo_image || 'static/media/ceo.6569cb0597ecee45ec68.jpeg'}
                    onChange={(e) => updateSectionField('ceo_image', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono"
                    placeholder="e.g. static/media/ceo.jpeg or select from Media Library"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      openMediaPicker('Select CEO Portrait Photo', (url) => {
                        updateSectionField('ceo_image', url);
                      })
                    }
                    className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer transition-colors"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Media Library</span>
                  </button>
                </div>
                {sections.ceo_image && (
                  <div className="mt-2 p-2 rounded-xl bg-slate-50 border border-slate-200/60 inline-flex items-center gap-3">
                    <img
                      src={sections.ceo_image.startsWith('http') || sections.ceo_image.startsWith('/') ? sections.ceo_image : `/${sections.ceo_image}`}
                      alt="CEO Preview"
                      className="w-14 h-14 rounded-lg object-cover border border-slate-200 bg-white"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <div className="text-[11px] text-slate-500">
                      <p className="font-semibold text-slate-700">Current Portrait Preview</p>
                      <button
                        type="button"
                        onClick={() => updateSectionField('ceo_image', '')}
                        className="text-red-500 hover:text-red-700 text-[10px] mt-0.5 block cursor-pointer"
                      >
                        Remove Photo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* E. COMPLIANCE SECTIONS EDITOR */}
          {/* ============================================================== */}
          {slug === 'compliance' && (
            <div className="space-y-6">
              {/* Social Compliance Intro */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  Social Compliance Audit Protocols
                </h3>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Heading</label>
                  <input
                    type="text"
                    value={sections.intro_heading || 'Social Compliance'}
                    onChange={(e) => updateSectionField('intro_heading', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">Audit Protocol Points</label>
                    <button
                      type="button"
                      onClick={() => {
                        const b = sections.intro_bullets || [];
                        updateSectionField('intro_bullets', [...b, 'New audit standard rule']);
                      }}
                      className="text-[11px] font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Protocol</span>
                    </button>
                  </div>

                  {(sections.intro_bullets || []).map((bullet, bIdx) => (
                    <div key={bIdx} className="flex gap-2 items-center">
                      <span className="text-amber-600 font-bold">&bull;</span>
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => {
                          const b = [...(sections.intro_bullets || [])];
                          b[bIdx] = e.target.value;
                          updateSectionField('intro_bullets', b);
                        }}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const b = [...(sections.intro_bullets || [])];
                          b.splice(bIdx, 1);
                          updateSectionField('intro_bullets', b);
                        }}
                        className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Zero Tolerance Policy */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    Zero Tolerance Policy (ZTV) Items
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      const items = sections.ztv_items || [];
                      updateSectionField('ztv_items', [...items, 'New strict ZTV violation policy']);
                    }}
                    className="text-[11px] font-bold text-red-700 hover:text-red-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add ZTV Item</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ZTV Section Title</label>
                    <input
                      type="text"
                      value={sections.ztv_title || 'ZERO TOLERANCE POLICY'}
                      onChange={(e) => updateSectionField('ztv_title', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-red-700"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ZTV Subtitle</label>
                    <input
                      type="text"
                      value={sections.ztv_subtitle || 'Compliance Issues to be categorized as ZTV'}
                      onChange={(e) => updateSectionField('ztv_subtitle', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  {(sections.ztv_items || []).map((item, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 text-[10px] font-black flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const items = [...(sections.ztv_items || [])];
                          items[idx] = e.target.value;
                          updateSectionField('ztv_items', items);
                        }}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const items = [...(sections.ztv_items || [])];
                          items.splice(idx, 1);
                          updateSectionField('ztv_items', items);
                        }}
                        className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance Side Image Block */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-amber-600" />
                  Compliance Side Illustration Image
                </h3>
                <p className="text-xs text-slate-500">
                  Feature graphic displayed next to social compliance audit overview on the live site.
                </p>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={sections.side_image || page.hero_image || 'static/media/compliance.60e4fbca700a75ba099f.png'}
                    onChange={(e) => updateSectionField('side_image', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => openMediaPicker('Select Compliance Side Image', (url) => {
                      updateSectionField('side_image', url);
                    })}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition shrink-0 flex items-center gap-1.5 cursor-pointer border border-slate-300"
                  >
                    <ImageIcon className="w-4 h-4 text-amber-600" />
                    <span>Media Library</span>
                  </button>
                </div>
                {(sections.side_image || page.hero_image) && (
                  <div className="w-32 h-20 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden p-1">
                    <img
                      src={(sections.side_image || page.hero_image).startsWith('http') || (sections.side_image || page.hero_image).startsWith('/') ? (sections.side_image || page.hero_image) : `/${sections.side_image || page.hero_image}`}
                      alt="Preview"
                      className="w-full h-full object-contain"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                )}
              </div>

              {/* Compliance Global Certifications Title & Logos */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  Compliance Certified Manufactories Heading &amp; Standards
                </h3>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Certifications Grid Heading
                  </label>
                  <textarea
                    rows={2}
                    value={sections.certificates_title || 'SOFTTEX FASHIONS WEAR LTD. is associated with 25-30 export-oriented as well as social and environmental compliance-certified manufactories. Certified by global testing approvals:'}
                    onChange={(e) => updateSectionField('certificates_title', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs leading-relaxed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* F. CONTACT PAGE SECTIONS EDITOR */}
          {/* ============================================================== */}
          {slug === 'contact' && (
            <div className="space-y-6">
              {/* Addresses Block */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-600" />
                  Corporate Office &amp; Permanent Factory Addresses
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Office */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 uppercase">Office Address</h4>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        Street Address (Use Enter for new line)
                      </label>
                      <textarea
                        rows={3}
                        value={sections.office_address || ''}
                        onChange={(e) => updateSectionField('office_address', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs leading-relaxed"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Cell / Phone"
                        value={sections.office_phone || ''}
                        onChange={(e) => updateSectionField('office_phone', e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Email"
                        value={sections.office_email || ''}
                        onChange={(e) => updateSectionField('office_email', e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs"
                      />
                    </div>
                  </div>

                  {/* Permanent */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 uppercase">Permanent Address</h4>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        Street Address (Use Enter for new line)
                      </label>
                      <textarea
                        rows={3}
                        value={sections.permanent_address || ''}
                        onChange={(e) => updateSectionField('permanent_address', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs leading-relaxed"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Cell / Phone"
                        value={sections.permanent_phone || ''}
                        onChange={(e) => updateSectionField('permanent_phone', e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Email"
                        value={sections.permanent_email || ''}
                        onChange={(e) => updateSectionField('permanent_email', e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Persons */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-amber-600" />
                    Key Executive Contact Persons
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      const persons = sections.contact_persons || [];
                      updateSectionField('contact_persons', [
                        ...persons,
                        {
                          title: 'DIRECTOR',
                          name: 'EXECUTIVE NAME',
                          phone: '+880 1904 464294',
                          email: 'contact@softtexfashions.com',
                        },
                      ]);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold transition border border-amber-200 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Executive</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {(sections.contact_persons || []).map((person, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row gap-3 items-start md:items-center"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 flex-1 w-full">
                        <input
                          type="text"
                          placeholder="Designation Title"
                          value={person.title}
                          onChange={(e) => {
                            const p = [...(sections.contact_persons || [])];
                            p[pIdx] = { ...p[pIdx], title: e.target.value };
                            updateSectionField('contact_persons', p);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold uppercase"
                        />
                        <input
                          type="text"
                          placeholder="Executive Full Name"
                          value={person.name}
                          onChange={(e) => {
                            const p = [...(sections.contact_persons || [])];
                            p[pIdx] = { ...p[pIdx], name: e.target.value };
                            updateSectionField('contact_persons', p);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold"
                        />
                        <input
                          type="text"
                          placeholder="Mobile / Phone"
                          value={person.phone}
                          onChange={(e) => {
                            const p = [...(sections.contact_persons || [])];
                            p[pIdx] = { ...p[pIdx], phone: e.target.value };
                            updateSectionField('contact_persons', p);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono"
                        />
                        <input
                          type="text"
                          placeholder="Email"
                          value={person.email}
                          onChange={(e) => {
                            const p = [...(sections.contact_persons || [])];
                            p[pIdx] = { ...p[pIdx], email: e.target.value };
                            updateSectionField('contact_persons', p);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const p = [...(sections.contact_persons || [])];
                          p.splice(pIdx, 1);
                          updateSectionField('contact_persons', p);
                        }}
                        className="p-2 text-slate-400 hover:text-red-600 transition cursor-pointer self-center"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Side Feature Image Selector for Services & Quality */}
          {(slug === 'services' || slug === 'quality') && (
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-amber-600" />
                Side Illustration / Feature Banner Image
              </h3>
              <p className="text-xs text-slate-500">
                Displays on the live site alongside the overview description and interactive accordions.
              </p>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Image path / URL (e.g. static/media/... or storage/...)"
                  value={sections.side_image || page.hero_image || ''}
                  onChange={(e) => updateSectionField('side_image', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono"
                />
                <button
                  type="button"
                  onClick={() => openMediaPicker(`Select Side Image for ${page.title}`, (url) => {
                    updateSectionField('side_image', url);
                  })}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition shrink-0 flex items-center gap-1.5 cursor-pointer border border-slate-300"
                >
                  <ImageIcon className="w-4 h-4 text-amber-600" />
                  <span>Media Library</span>
                </button>
              </div>
              {(sections.side_image || page.hero_image) && (
                <div className="w-32 h-20 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden p-1">
                  <img
                    src={(sections.side_image || page.hero_image).startsWith('http') || (sections.side_image || page.hero_image).startsWith('/') ? (sections.side_image || page.hero_image) : `/${sections.side_image || page.hero_image}`}
                    alt="Preview"
                    className="w-full h-full object-contain"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* G. SERVICES / QUALITY / DEFAULT ACCORDION BUILDER */}
          {/* ============================================================== */}
          {(slug === 'services' || slug === 'quality' || sections.accordion_items) && (
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-600" />
                    Structured Accordion &amp; Capability Sections
                  </h3>
                  <p className="text-xs text-slate-500">
                    Each item expands with detailed paragraphs and bullet points on the live site.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const items = sections.accordion_items || [];
                    updateSectionField('accordion_items', [
                      ...items,
                      {
                        title: 'New Operational Function',
                        paragraphs: ['Enter section overview or operational description here.'],
                        bullets: ['Key operational capability 1', 'Key operational capability 2'],
                      },
                    ]);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold transition border border-amber-200 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Accordion Item</span>
                </button>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Accordion Group Heading
                </label>
                <input
                  type="text"
                  value={sections.accordion_title || 'Key Functions'}
                  onChange={(e) => updateSectionField('accordion_title', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold"
                />
              </div>

              <div className="space-y-4">
                {(sections.accordion_items || []).map((item, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/90 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 text-xs font-black flex items-center justify-center shrink-0">
                          {sIdx + 1}
                        </span>
                        <input
                          type="text"
                          value={item.title || ''}
                          onChange={(e) => {
                            const items = [...(sections.accordion_items || [])];
                            items[sIdx] = { ...items[sIdx], title: e.target.value };
                            updateSectionField('accordion_items', items);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-900"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const items = [...(sections.accordion_items || [])];
                          items.splice(sIdx, 1);
                          updateSectionField('accordion_items', items);
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 transition cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Paragraph */}
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        Main Paragraph Description
                      </label>
                      <textarea
                        rows={2}
                        value={
                          Array.isArray(item.paragraphs)
                            ? item.paragraphs.join('\n\n')
                            : item.paragraphs || item.text || ''
                        }
                        onChange={(e) => {
                          const items = [...(sections.accordion_items || [])];
                          items[sIdx] = {
                            ...items[sIdx],
                            paragraphs: e.target.value.split('\n\n').filter(Boolean),
                          };
                          updateSectionField('accordion_items', items);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs leading-relaxed"
                      />
                    </div>

                    {/* Bullets */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">
                          Bullet Highlights ({item.bullets ? item.bullets.length : 0})
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const items = [...(sections.accordion_items || [])];
                            const currentBullets = items[sIdx].bullets || [];
                            items[sIdx] = {
                              ...items[sIdx],
                              bullets: [...currentBullets, 'New operational highlight'],
                            };
                            updateSectionField('accordion_items', items);
                          }}
                          className="text-[11px] font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Bullet</span>
                        </button>
                      </div>

                      {(item.bullets || []).map((bullet, bIdx) => (
                        <div key={bIdx} className="flex gap-2 items-center">
                          <span className="text-amber-600 font-bold">&bull;</span>
                          <input
                            type="text"
                            value={bullet}
                            onChange={(e) => {
                              const items = [...(sections.accordion_items || [])];
                              const bullets = [...(items[sIdx].bullets || [])];
                              bullets[bIdx] = e.target.value;
                              items[sIdx] = { ...items[sIdx], bullets };
                              updateSectionField('accordion_items', items);
                            }}
                            className="flex-1 px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const items = [...(sections.accordion_items || [])];
                              const bullets = [...(items[sIdx].bullets || [])];
                              bullets.splice(bIdx, 1);
                              items[sIdx] = { ...items[sIdx], bullets };
                              updateSectionField('accordion_items', items);
                            }}
                            className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SEO & GOOGLE PREVIEW */}
      {activeTab === 'seo' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Search className="w-4 h-4 text-amber-600" />
                SEO Metadata &amp; Search Optimization
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  SEO Health 98/100
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">Meta Title</label>
                <span
                  className={`text-[10px] font-mono font-semibold ${
                    metaTitleLen > 60 ? 'text-amber-600 font-bold' : 'text-slate-400'
                  }`}
                >
                  {metaTitleLen}/60 chars recommended
                </span>
              </div>
              <input
                type="text"
                value={page.meta_title || ''}
                onChange={(e) => setPage({ ...page, meta_title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">Meta Description</label>
                <span
                  className={`text-[10px] font-mono font-semibold ${
                    metaDescLen > 160 ? 'text-amber-600 font-bold' : 'text-slate-400'
                  }`}
                >
                  {metaDescLen}/160 chars recommended
                </span>
              </div>
              <textarea
                rows={3}
                value={page.meta_description || ''}
                onChange={(e) => setPage({ ...page, meta_description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs leading-relaxed focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Meta Keywords</label>
              <input
                type="text"
                value={page.meta_keywords || ''}
                onChange={(e) => setPage({ ...page, meta_keywords: e.target.value })}
                placeholder="garments buying house, apparel sourcing bangladesh, etc."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>

          {/* DUAL GOOGLE SERP SIMULATION (Desktop & Mobile) */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  Live Google Search Engine Snippet Preview
                </h3>
                <p className="text-xs text-slate-500">
                  How this page looks on Google Search Engine Results Page (SERP).
                </p>
              </div>

              {/* Device switcher */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setGoogleDevice('desktop')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                    googleDevice === 'desktop'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGoogleDevice('mobile')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                    googleDevice === 'mobile'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 font-sans transition-all ${
                googleDevice === 'mobile' ? 'max-w-sm mx-auto shadow-md rounded-2xl' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-black text-amber-700">
                  SF
                </div>
                <div className="leading-tight">
                  <div className="text-[12px] text-[#202124] font-medium">Softtex Fashions Wear</div>
                  <div className="text-[11px] text-[#5f6368] font-mono truncate max-w-md">
                    https://www.softtexfashions.com{getPublicLink()}
                  </div>
                </div>
              </div>

              <div className="text-lg text-[#1a0dab] hover:text-[#1a0dab] cursor-pointer font-medium leading-snug pt-1">
                {page.meta_title || `${page.title} | SOFTTEX FASHIONS WEAR LIMITED`}
              </div>

              <div className="text-xs text-[#4d5156] leading-relaxed max-w-2xl">
                {page.meta_description ||
                  page.subtitle ||
                  'Discover comprehensive garment buying house services, quality assurance, apparel manufacturing, and export capabilities by Softtex Fashions Wear Limited in Bangladesh.'}
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Global WordPress-Style Media Library Picker Modal */}
      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={handleMediaSelected}
        title={mediaPickerTitle}
      />
    </div>
  );
}
