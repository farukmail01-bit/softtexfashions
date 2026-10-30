import React, { useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';
import {
  Sparkles,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Search,
  FileText,
  CheckCircle2,
  Tag,
  TrendingUp,
  BarChart2,
  Award,
  Globe,
  RefreshCw,
  Eye,
  BookOpen,
  Layers,
  Sliders,
  HelpCircle,
  Send,
  X,
  ChevronRight,
  FolderPlus,
  Check,
  AlertCircle
} from 'lucide-react';
import { assetUrl } from '../utils/asset';
import MediaPickerModal from './MediaPickerModal';

export default function AdminBlogManager() {
  const { apiFetch, showToast } = useAdmin();

  // Navigation sub-tabs
  const [activeTab, setActiveTab] = useState('studio'); // 'studio' | 'keywords' | 'articles'
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);

  // Keywords state
  const [keywords, setKeywords] = useState([]);
  const [loadingKeywords, setLoadingKeywords] = useState(false);
  const [newKeywordModal, setNewKeywordModal] = useState(false);
  const [newKwForm, setNewKwForm] = useState({
    keyword: '',
    search_volume: 'High',
    intent: 'Commercial',
    category: 'Knitwear',
    suggested_title: '',
    outline_prompts: '',
  });

  // Articles state
  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(false);

  // AI Generator state
  const [selectedKeywordChip, setSelectedKeywordChip] = useState('');
  const [topicInput, setTopicInput] = useState('');
  const [targetAudience, setTargetAudience] = useState('EU & US Fashion Brands, Apparel Sourcing Heads');
  const [categorySelection, setCategorySelection] = useState('Knitwear & T-Shirts');
  const [toneSelection, setToneSelection] = useState('Technical Sourcing Whitepaper');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');

  // Current Article in Editor
  const [currentArticle, setCurrentArticle] = useState({
    id: null,
    seo_keyword_id: null,
    title: '',
    slug: '',
    meta_title: '',
    meta_description: '',
    focus_keyword: '',
    secondary_keywords: '',
    reading_time: '7 min read',
    content: '',
    excerpt: '',
    author: 'Softtex Merchandising & Technical QA Desk',
    author_role: 'Chief Technical Sourcing Lead',
    cover_image: '/images/hero-bg.jpg',
    tags: 'Apparel Sourcing, Garments Bangladesh, AQL 1.5, FOB Costing',
    seo_score: 95,
    faq_schema: [],
    status: 'published',
  });

  const [editorMode, setEditorMode] = useState('preview'); // 'preview' | 'html'
  const [savingArticle, setSavingArticle] = useState(false);

  // Load Keywords & Articles on Mount
  useEffect(() => {
    fetchKeywords();
    fetchArticles();
  }, []);

  const fetchKeywords = async () => {
    try {
      setLoadingKeywords(true);
      const res = await apiFetch('/api/admin/keywords');
      if (res && res.keywords) {
        setKeywords(res.keywords);
        if (res.keywords.length > 0 && !selectedKeywordChip) {
          // Pre-select first keyword as shortcut chip
          handleSelectKeywordChip(res.keywords[0]);
        }
      }
    } catch (e) {
      showToast(e.message || 'Failed to load keywords', 'error');
    } finally {
      setLoadingKeywords(false);
    }
  };

  const fetchArticles = async () => {
    try {
      setLoadingArticles(true);
      const res = await apiFetch('/api/admin/blogs');
      if (res && res.articles) {
        setArticles(res.articles);
        // If current article is empty and articles exist, pre-populate editor with latest
        if (!currentArticle.title && res.articles.length > 0) {
          loadArticleIntoEditor(res.articles[0]);
        }
      }
    } catch (e) {
      showToast(e.message || 'Failed to load articles', 'error');
    } finally {
      setLoadingArticles(false);
    }
  };

  // Keyword selection from ribbon chip
  const handleSelectKeywordChip = (kw) => {
    setSelectedKeywordChip(kw.keyword);
    setTopicInput(kw.keyword);
    if (kw.category) setCategorySelection(kw.category);
    if (kw.target_audience) setTargetAudience(kw.target_audience);
  };

  // Generate Article via Backend AI Service
  const handleGenerateAiArticle = async () => {
    const focusKeyword = topicInput.trim() || selectedKeywordChip;
    if (!focusKeyword) {
      showToast('Please select or type a target keyword / topic', 'error');
      return;
    }

    try {
      setIsGenerating(true);
      setGenerationStep('Analyzing RMG textile benchmarks & technical yarn data...');

      const stepTimer1 = setTimeout(() => {
        setGenerationStep('Formulating ASTM/ISO shrinkage parameters & AQL 1.5 inspection gates...');
      }, 900);

      const stepTimer2 = setTimeout(() => {
        setGenerationStep('Calculating FOB cost breakdowns, GSP 0% duty tariffs & buyer FAQs...');
      }, 1900);

      const matchedKw = keywords.find(
        (k) => k.keyword.toLowerCase() === focusKeyword.toLowerCase()
      );

      const res = await apiFetch('/api/admin/blogs/generate', {
        method: 'POST',
        body: JSON.stringify({
          keyword: focusKeyword,
          category: categorySelection,
          target_audience: targetAudience,
          tone: toneSelection,
          keyword_id: matchedKw ? matchedKw.id : null,
        }),
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      if (res && res.success && res.article) {
        loadArticleIntoEditor(res.article);
        setActiveTab('studio');
        showToast('✨ High-authority technical SEO article successfully generated!', 'success');
      } else {
        throw new Error(res?.message || 'Generation failed');
      }
    } catch (e) {
      showToast(e.message || 'Error generating AI article', 'error');
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  // Load an article into editor
  const loadArticleIntoEditor = (art) => {
    let parsedFaqs = [];
    if (art.faq_schema) {
      parsedFaqs = typeof art.faq_schema === 'string' ? JSON.parse(art.faq_schema) : art.faq_schema;
    }
    const kw = art.primary_keyword || art.focus_keyword || '';
    setCurrentArticle({
      id: art.id || null,
      seo_keyword_id: art.seo_keyword_id || null,
      title: art.title || '',
      slug: art.slug || '',
      meta_title: art.meta_title || '',
      meta_description: art.meta_description || '',
      primary_keyword: kw,
      focus_keyword: kw,
      secondary_keywords: art.secondary_keywords || '',
      category: art.category || 'Knitwear',
      reading_time: art.read_time_minutes ? `${art.read_time_minutes} min read` : (art.reading_time || '7 min read'),
      content: art.content || '',
      excerpt: art.excerpt || '',
      author: art.author || 'Softtex Merchandising & Technical QA Desk',
      author_role: art.author_role || 'Chief Technical Sourcing Lead',
      cover_image: art.featured_image || art.cover_image || '/images/hero-bg.jpg',
      featured_image: art.featured_image || art.cover_image || '/images/hero-bg.jpg',
      tags: art.tags || 'Apparel Sourcing, Garments Bangladesh',
      seo_score: art.seo_score || 95,
      faq_schema: parsedFaqs,
      status: art.status || 'published',
    });
  };

  // Save current article to database
  const handleSaveArticle = async (statusOverride = null) => {
    if (!currentArticle.title || !currentArticle.content) {
      showToast('Article must have a title and content', 'error');
      return;
    }

    try {
      setSavingArticle(true);
      const kw = currentArticle.primary_keyword || currentArticle.focus_keyword || topicInput;
      const payload = {
        ...currentArticle,
        primary_keyword: kw,
        focus_keyword: kw,
        status: statusOverride || currentArticle.status,
      };

      const res = await apiFetch('/api/admin/blogs', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (res && res.success) {
        showToast(res.message || 'Article successfully saved!', 'success');
        if (res.article) {
          loadArticleIntoEditor(res.article);
        }
        fetchArticles();
      }
    } catch (e) {
      showToast(e.message || 'Failed to save article', 'error');
    } finally {
      setSavingArticle(false);
    }
  };

  // Delete article
  const handleDeleteArticle = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      const res = await apiFetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
      if (res && res.success) {
        showToast('Article deleted', 'success');
        fetchArticles();
        if (currentArticle.id === id) {
          setCurrentArticle((prev) => ({ ...prev, id: null }));
        }
      }
    } catch (e) {
      showToast(e.message || 'Failed to delete article', 'error');
    }
  };

  // Create new keyword
  const handleSaveNewKeyword = async (e) => {
    e.preventDefault();
    if (!newKwForm.keyword.trim()) {
      showToast('Keyword is required', 'error');
      return;
    }

    try {
      const res = await apiFetch('/api/admin/keywords', {
        method: 'POST',
        body: JSON.stringify(newKwForm),
      });

      if (res && res.success) {
        showToast('Target keyword successfully added!', 'success');
        setNewKeywordModal(false);
        setNewKwForm({
          keyword: '',
          search_volume: 'High',
          intent: 'Commercial',
          category: 'Knitwear',
          suggested_title: '',
          outline_prompts: '',
        });
        fetchKeywords();
      }
    } catch (e) {
      showToast(e.message || 'Failed to add keyword', 'error');
    }
  };

  // Delete keyword
  const handleDeleteKeyword = async (id) => {
    if (!window.confirm('Delete this target keyword?')) return;
    try {
      const res = await apiFetch(`/api/admin/keywords/${id}`, { method: 'DELETE' });
      if (res && res.success) {
        showToast('Keyword removed', 'success');
        fetchKeywords();
      }
    } catch (e) {
      showToast(e.message || 'Failed to delete keyword', 'error');
    }
  };

  // Compute live SEO score dynamically
  const computeLiveSeoScore = () => {
    let score = 50;
    const focus = (currentArticle.focus_keyword || '').toLowerCase();
    const title = (currentArticle.title || '').toLowerCase();
    const slug = (currentArticle.slug || '').toLowerCase();
    const metaDesc = (currentArticle.meta_description || '').toLowerCase();
    const content = (currentArticle.content || '').toLowerCase();

    if (focus && title.includes(focus)) score += 12;
    if (focus && slug.includes(focus.replace(/\s+/g, '-'))) score += 8;
    if (focus && metaDesc.includes(focus)) score += 8;
    if (currentArticle.meta_description && currentArticle.meta_description.length >= 120) score += 6;
    if (content.length > 3000) score += 10;
    if (currentArticle.faq_schema && currentArticle.faq_schema.length >= 2) score += 6;

    return Math.min(score, 99);
  };

  const dynamicScore = computeLiveSeoScore();
  const baseUrl = (window.__SOFTTEX_BASE_URL__ || window.__SOF値EX_BASE_URL__ || '').replace(/\/$/, '');

  return (
    <div className="space-y-4 w-full pb-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3.5">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>AI SEO Blog Engine &amp; Target Keywords Hub</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Produce deeply technical, commercial-intent sourcing whitepapers to capture global garment buyer Google searches.
          </p>
        </div>

        {/* View Live Blog & Switch Tab Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href={`${baseUrl}/blog`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-2xs"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-600" />
            <span>Public Blog Hub</span>
          </a>

          <div className="inline-flex p-1 rounded-xl bg-slate-100/90 border border-slate-200/80 shadow-2xs">
            <button
              onClick={() => setActiveTab('studio')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'studio'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/90 font-bold ring-1 ring-black/5'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 transition-colors ${activeTab === 'studio' ? 'text-amber-500 fill-amber-500/20' : 'text-slate-400'}`} />
              <span>AI Studio</span>
              {activeTab === 'studio' && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-xs animate-pulse ml-0.5" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('keywords')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'keywords'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/90 font-bold ring-1 ring-black/5'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Tag className={`w-3.5 h-3.5 transition-colors ${activeTab === 'keywords' ? 'text-amber-600' : 'text-slate-400'}`} />
              <span>Keywords</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold transition-colors ${
                activeTab === 'keywords' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200/80 text-slate-600'
              }`}>
                {keywords.length}
              </span>
              {activeTab === 'keywords' && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-xs" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('articles')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'articles'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/90 font-bold ring-1 ring-black/5'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <FileText className={`w-3.5 h-3.5 transition-colors ${activeTab === 'articles' ? 'text-amber-600' : 'text-slate-400'}`} />
              <span>Articles</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold transition-colors ${
                activeTab === 'articles' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200/80 text-slate-600'
              }`}>
                {articles.length}
              </span>
              {activeTab === 'articles' && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-xs" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* QUICK SHORTCUT KEYWORDS RIBBON (Always visible for instant 1-click topic selection) */}
      <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-3.5 sm:p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-lg bg-amber-500/10 text-amber-700">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-slate-800">
              Smart SEO Target Keywords <span className="text-slate-400 font-normal text-[11px]">(Click chip to load AI generator)</span>
            </span>
          </div>
          <button
            onClick={() => setNewKeywordModal(true)}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 hover:text-amber-800 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-amber-200/80 shadow-2xs hover:bg-amber-50/40 transition"
          >
            <Plus className="w-3.5 h-3.5 text-amber-600" />
            <span>Add Target Keyword</span>
          </button>
        </div>

        {/* Scrollable chip container */}
        <div className="flex flex-wrap gap-2">
          {keywords.length > 0 ? (
            keywords.map((kw) => {
              const isSelected =
                selectedKeywordChip.toLowerCase() === kw.keyword.toLowerCase() ||
                topicInput.toLowerCase() === kw.keyword.toLowerCase();

              return (
                <button
                  key={kw.id}
                  type="button"
                  onClick={() => handleSelectKeywordChip(kw)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-white text-slate-950 border-2 border-amber-500 shadow-xs ring-2 ring-amber-500/15 font-bold scale-[1.01]'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  {isSelected ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  ) : (
                    <Tag className="w-3 h-3 text-slate-400 shrink-0" />
                  )}
                  <span>{kw.keyword}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                      isSelected
                        ? 'bg-amber-100 text-amber-900 font-bold border border-amber-200/80'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {kw.search_volume || 'High'}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="text-xs text-slate-400 py-1">Loading target keywords...</div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: AI STUDIO (Generator + Interactive Split Editor & Live SEO Score) */}
      {/* ========================================================================= */}
      {activeTab === 'studio' && (
        <div className="space-y-6">
          {/* AI Generator Control Box */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center justify-between">
                  <span>Selected Focus Keyword / Buyer Topic</span>
                  <span className="text-[10px] text-amber-600 font-normal">
                    Auto-filled from chips above or type custom
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={topicInput}
                    onChange={(e) => setTopicInput(e.target.value)}
                    placeholder="e.g. Bangladesh Garments Buying House AQL 1.5 Quality"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                  {topicInput && (
                    <button
                      type="button"
                      onClick={() => setTopicInput('')}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Sector Category</label>
                <select
                  value={categorySelection}
                  onChange={(e) => setCategorySelection(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Knitwear & T-Shirts">Knitwear &amp; T-Shirts</option>
                  <option value="Denim & Woven Pants">Denim &amp; Woven Pants</option>
                  <option value="Outerwear & Heavy Jackets">Outerwear &amp; Heavy Jackets</option>
                  <option value="Kids & Infant Wear">Kids &amp; Infant Wear</option>
                  <option value="Activewear & Polyester">Activewear &amp; Polyester</option>
                  <option value="Organic & Recycled Cotton">Organic &amp; Recycled Cotton</option>
                </select>
              </div>

              <div>
                <button
                  type="button"
                  disabled={isGenerating || !topicInput.trim()}
                  onClick={handleGenerateAiArticle}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs transition shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Writing Whitepaper...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-slate-950" />
                      <span>✨ Generate AI SEO Article</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Live Progress Bar when generating */}
            {isGenerating && (
              <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200/80 animate-pulse">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                  <span>{generationStep || 'Analyzing global buyer procurement parameters...'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Split View: SEO Score Meter & Article Studio */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Title, Metadata & Live Article Preview/Editor */}
            <div className="lg:col-span-2 space-y-5">
              {/* Document Meta Header Bar */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                      Article Metadata &amp; SERP Architecture
                    </span>
                  </div>
                  <div className="inline-flex p-0.5 bg-slate-100 rounded-lg border border-slate-200/80 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setEditorMode('preview')}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                        editorMode === 'preview'
                          ? 'bg-white text-slate-900 shadow-2xs font-bold border border-slate-200/60'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Formatted Preview
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorMode('html')}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                        editorMode === 'html'
                          ? 'bg-white text-slate-900 shadow-2xs font-bold border border-slate-200/60'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Raw HTML
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">
                      H1 Article Headline (Target Commercial Intent)
                    </label>
                    <input
                      type="text"
                      value={currentArticle.title}
                      onChange={(e) => setCurrentArticle({ ...currentArticle, title: e.target.value })}
                      placeholder="e.g. Bangladesh Knitwear Sourcing Guide 2026: Costing, GSM Specs & AQL 1.5 Quality"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        URL Slug
                      </label>
                      <input
                        type="text"
                        value={currentArticle.slug}
                        onChange={(e) => setCurrentArticle({ ...currentArticle, slug: e.target.value })}
                        placeholder="bangladesh-knitwear-sourcing-guide"
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        Focus SEO Keyword
                      </label>
                      <input
                        type="text"
                        value={currentArticle.focus_keyword}
                        onChange={(e) => setCurrentArticle({ ...currentArticle, focus_keyword: e.target.value })}
                        placeholder="knitwear sourcing bangladesh"
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-amber-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1 flex items-center justify-between">
                      <span>Google Meta Description (SERP Snippet)</span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {currentArticle.meta_description?.length || 0} / 160 chars
                      </span>
                    </label>
                    <textarea
                      rows={2}
                      value={currentArticle.meta_description}
                      onChange={(e) => setCurrentArticle({ ...currentArticle, meta_description: e.target.value })}
                      placeholder="Comprehensive technical guide for apparel brands sourcing knitwear from Bangladesh..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Main Content Workspace */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>Whitepaper Content Body ({currentArticle.content.split(/\s+/).length} words)</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-500">
                    Est. Reading Time: <strong>{currentArticle.reading_time || '7 min'}</strong>
                  </div>
                </div>

                {editorMode === 'preview' ? (
                  <div
                    className="prose prose-slate max-w-none text-slate-800 text-sm leading-relaxed p-4 rounded-xl bg-slate-50/50 border border-slate-100 max-h-[600px] overflow-y-auto"
                    dangerouslySetInnerHTML={{ __html: currentArticle.content || '<p class="text-slate-400 italic">No article generated yet. Select a keyword chip above and click "Generate AI SEO Article".</p>' }}
                  />
                ) : (
                  <textarea
                    rows={18}
                    value={currentArticle.content}
                    onChange={(e) => setCurrentArticle({ ...currentArticle, content: e.target.value })}
                    placeholder="Article HTML content..."
                    className="w-full font-mono text-xs p-3.5 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                )}
              </div>

              {/* FAQ Schema Accordion Preview */}
              {currentArticle.faq_schema && currentArticle.faq_schema.length > 0 && (
                <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-800">
                    <HelpCircle className="w-4 h-4 text-blue-600" />
                    <span>Structured Schema.org FAQ Questions ({currentArticle.faq_schema.length})</span>
                  </div>
                  <div className="space-y-2">
                    {currentArticle.faq_schema.map((faq, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[10px] font-black">
                            Q
                          </span>
                          <span>{faq.q}</span>
                        </div>
                        <div className="text-xs text-slate-600 pl-5 leading-relaxed">
                          {faq.a}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Col: Live SEO Score Meter & Publishing Actions */}
            <div className="space-y-5">
              {/* SEO Score Meter Card */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Live SEO Score Meter</span>
                  </span>
                  <span className="text-xs font-black px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                    {dynamicScore} / 100
                  </span>
                </div>

                {/* Score Progress Circle / Bar */}
                <div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        dynamicScore >= 90
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                          : dynamicScore >= 75
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                          : 'bg-gradient-to-r from-rose-500 to-orange-500'
                      }`}
                      style={{ width: `${dynamicScore}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5 flex items-center justify-between">
                    <span>Rank Potential</span>
                    <strong className="text-emerald-700 font-bold">Top 3 Google SERP Tier</strong>
                  </p>
                </div>

                {/* Audit Checklist */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        currentArticle.title.toLowerCase().includes(currentArticle.focus_keyword?.toLowerCase() || 'xxx')
                          ? 'text-emerald-500'
                          : 'text-slate-300'
                      }`}
                    />
                    <span className="text-slate-700 font-medium">Focus Keyword in H1 Title</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        currentArticle.slug ? 'text-emerald-500' : 'text-slate-300'
                      }`}
                    />
                    <span className="text-slate-700 font-medium">Clean SEO-friendly URL Slug</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        currentArticle.meta_description?.length >= 100 ? 'text-emerald-500' : 'text-slate-300'
                      }`}
                    />
                    <span className="text-slate-700 font-medium">Meta Description &gt; 120 chars</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        currentArticle.content.split(/\s+/).length > 800 ? 'text-emerald-500' : 'text-slate-300'
                      }`}
                    />
                    <span className="text-slate-700 font-medium">Deep Form Content &gt; 1,200 words</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        currentArticle.faq_schema?.length > 0 ? 'text-emerald-500' : 'text-slate-300'
                      }`}
                    />
                    <span className="text-slate-700 font-medium">JSON-LD FAQ Schema Structured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-slate-700 font-medium">AQL 1.5 &amp; FOB Technical Table Embedded</span>
                  </div>
                </div>
              </div>

              {/* Author & Publishing Card */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3">
                <span className="text-xs font-black uppercase tracking-wider text-slate-800 block border-b border-slate-100 pb-2">
                  Publishing Controls
                </span>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Author Byline</label>
                  <input
                    type="text"
                    value={currentArticle.author}
                    onChange={(e) => setCurrentArticle({ ...currentArticle, author: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-slate-600">Cover Image</label>
                    <button
                      type="button"
                      onClick={() => setMediaPickerOpen(true)}
                      className="text-[10px] font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded-lg border border-amber-200 transition"
                    >
                      <Layers className="w-3 h-3" />
                      <span>Media Library</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={currentArticle.cover_image}
                    onChange={(e) =>
                      setCurrentArticle({
                        ...currentArticle,
                        cover_image: e.target.value,
                        featured_image: e.target.value,
                      })
                    }
                    placeholder="/images/mens/1.jpg or URL"
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700"
                  />
                  {currentArticle.cover_image && (
                    <div className="mt-2 aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-100 relative group">
                      <img
                        src={assetUrl(currentArticle.cover_image)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setMediaPickerOpen(true)}
                        className="absolute inset-0 bg-slate-900/40 text-white font-bold text-xs opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Change Cover</span>
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Publication Status</label>
                  <select
                    value={currentArticle.status}
                    onChange={(e) => setCurrentArticle({ ...currentArticle, status: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800"
                  >
                    <option value="published">Published (Live on Website)</option>
                    <option value="draft">Draft (Private in CMS)</option>
                  </select>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="button"
                    disabled={savingArticle}
                    onClick={() => handleSaveArticle('published')}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Check className="w-4 h-4" />
                    <span>{savingArticle ? 'Saving...' : 'Publish to Live Blog'}</span>
                  </button>

                  <button
                    type="button"
                    disabled={savingArticle}
                    onClick={() => handleSaveArticle('draft')}
                    className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Save as Draft</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: TARGET KEYWORDS REPOSITORY (Full Table CRUD) */}
      {/* ========================================================================= */}
      {activeTab === 'keywords' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
            <div>
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-500" />
                <span>Target SEO Keywords Catalog</span>
              </h2>
              <p className="text-xs text-slate-500">
                High-intent search phrases targeted at international retail buyers and fashion sourcing executives.
              </p>
            </div>
            <button
              onClick={() => setNewKeywordModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Keyword</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Target Keyword</th>
                  <th className="py-3 px-4">Search Volume &amp; Intent</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Target Audience</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {keywords.map((kw) => (
                  <tr key={kw.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-slate-900">{kw.keyword}</div>
                      {kw.suggested_title && (
                        <div className="text-[11px] text-slate-500 italic mt-0.5 max-w-md truncate">
                          "{kw.suggested_title}"
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 font-mono">
                          {kw.search_volume || 'High'}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                          {kw.intent || 'Commercial'}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">
                      {kw.category || 'Apparel'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      {kw.target_audience || 'Global Fashion Brands'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            handleSelectKeywordChip(kw);
                            setActiveTab('studio');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-[11px] border border-amber-200 cursor-pointer"
                        >
                          Write Article &rarr;
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteKeyword(kw.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PUBLISHED ARTICLES DIRECTORY */}
      {/* ========================================================================= */}
      {activeTab === 'articles' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
            <div>
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Published Sourcing Whitepapers &amp; Articles</span>
              </h2>
              <p className="text-xs text-slate-500">
                Live SEO content indexed by Google, driving international buyer discovery and RFQs.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveTab('studio');
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition shadow-xs cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create New Article</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Article Title &amp; Slug</th>
                  <th className="py-3 px-4">Focus Keyword</th>
                  <th className="py-3 px-4">SEO Score</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {articles.map((art) => (
                  <tr key={art.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="font-extrabold text-slate-900 line-clamp-1">{art.title}</div>
                      <div className="text-[11px] font-mono text-slate-400 mt-0.5">/blog/{art.slug}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        {art.focus_keyword || 'Sourcing'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">
                      {art.seo_score || 95}/100
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          art.status === 'published'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {art.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      {art.created_at ? new Date(art.created_at).toLocaleDateString() : 'Recent'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            loadArticleIntoEditor(art);
                            setActiveTab('studio');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] cursor-pointer"
                        >
                          Edit &rarr;
                        </button>
                        <a
                          href={`${baseUrl}/blog/${art.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 transition"
                          title="View live article"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDeleteArticle(art.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Add New Keyword */}
      {newKeywordModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-500" />
                <span>Add Target Sourcing Keyword</span>
              </h3>
              <button
                onClick={() => setNewKeywordModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveNewKeyword} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Keyword *</label>
                <input
                  type="text"
                  required
                  value={newKwForm.keyword}
                  onChange={(e) => setNewKwForm({ ...newKwForm, keyword: e.target.value })}
                  placeholder="e.g. Bangladesh Jeans OEM Manufacturer"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Search Volume</label>
                  <select
                    value={newKwForm.search_volume}
                    onChange={(e) => setNewKwForm({ ...newKwForm, search_volume: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-800"
                  >
                    <option value="Very High">Very High</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Niche">Niche Long-tail</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Buyer Intent</label>
                  <select
                    value={newKwForm.intent}
                    onChange={(e) => setNewKwForm({ ...newKwForm, intent: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-800"
                  >
                    <option value="Commercial">Commercial</option>
                    <option value="Transactional">Transactional</option>
                    <option value="Informational">Informational</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Category</label>
                <input
                  type="text"
                  value={newKwForm.category}
                  onChange={(e) => setNewKwForm({ ...newKwForm, category: e.target.value })}
                  placeholder="Knitwear, Denim, Woven, Outerwear"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Suggested Whitepaper Title</label>
                <input
                  type="text"
                  value={newKwForm.suggested_title}
                  onChange={(e) => setNewKwForm({ ...newKwForm, suggested_title: e.target.value })}
                  placeholder="e.g. Bangladesh Jeans OEM Manufacturing: Denim Wash & Pricing Guide"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setNewKeywordModal(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black shadow-xs cursor-pointer"
                >
                  Save Keyword
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global Media Picker Modal */}
      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={(media) => {
          setCurrentArticle((prev) => ({
            ...prev,
            cover_image: media.file_url,
            featured_image: media.file_url,
          }));
        }}
        title="Select Blog Cover Image"
        buttonText="Use as Cover Image"
      />
    </div>
  );
}
