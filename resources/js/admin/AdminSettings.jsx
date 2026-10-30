import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from './AdminContext';
import MediaPickerModal from './MediaPickerModal';
import { assetUrl } from '../utils/asset';
import {
  Settings,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  Save,
  ShieldCheck,
  CheckCircle,
  Building,
  Globe,
  Database,
  ExternalLink,
  Bot,
  Key,
  Cpu,
  Sliders,
  DollarSign,
  MessageCircle,
  Search,
  Eye,
  EyeOff,
  Zap,
  Check,
  AlertCircle,
  Sparkles,
  Layers,
  Clock,
  Palette,
  Wrench,
  HardDrive,
  RefreshCw,
  UploadCloud,
  RotateCcw,
  Terminal,
  AlertTriangle,
  Monitor,
  Download,
  Image as ImageIcon
} from 'lucide-react';

export default function AdminSettings() {
  const { apiFetch, showToast } = useAdmin();
  
  // Active Settings Tab
  const [activeTab, setActiveTab] = useState('branding'); // 'branding' | 'cpanel' | 'ai' | 'corporate' | 'sourcing' | 'leads' | 'seo' | 'milestones'

  const [settings, setSettings] = useState({
    // Branding & Identity
    site_logo: 'images/softtex-logo.png',
    site_favicon: 'images/softtex-logo.png',
    admin_logo: '',

    // Corporate
    company_name: 'SOFTTEX FASHIONS WEAR LIMITED',
    company_email: 'info@softtexfashions.com',
    company_phone: '+880 1612 844020',
    company_mobile: '+880 1904 464294',
    company_whatsapp: '+8801904464294',
    corporate_address: 'House # 53/55(3A floor), Road # 20, Nikunja-2, Khilkhet, Dhaka -1229, Bangladesh',
    factory_address: 'Ashulia & Gazipur Industrial Zone, Dhaka, Bangladesh',
    working_hours: 'Monday - Saturday: 9:00 AM - 7:00 PM (BST)',

    // AI & Automation
    ai_provider: 'gemini', // 'gemini' | 'openai' | 'heuristic'
    ai_api_key: '',
    ai_model: 'gemini-1.5-flash',
    ai_temperature: '0.7',
    ai_default_status: 'published', // 'published' | 'draft'

    // Sourcing & FOB Benchmarks
    benchmark_yarn_price: '3.85',
    default_moq: '1000',
    duty_exemption_eu_uk: '12.0',
    duty_exemption_canada: '18.0',
    duty_exemption_japan: '10.0',
    lead_time_sampling: '5 - 7 Days',
    lead_time_bulk: '45 - 55 Days',
    quality_gate_standard: 'AQL 1.5 FRI Level II',

    // Leads & Notifications
    lead_notification_email: 'sourcing@softtexfashions.com',
    whatsapp_greeting_text: 'Hello Softtex Fashions Sourcing Desk, I would like to discuss an apparel production order.',

    // SEO & Tracking
    meta_title_suffix: '| SOFTTEX FASHIONS WEAR LIMITED - 100% Export Garments Buying House',
    default_meta_description: 'Premier 100% export-oriented garments buying house in Dhaka, Bangladesh. Connecting global fashion brands with compliant composite factories.',
    ga4_measurement_id: '',
    gsc_verification_tag: '',

    // Milestones Counters
    stat_turnover: '$45M+',
    stat_brands: '15+',
    stat_lines: '120+',
    stat_qa_rate: '99.8%',
    stat_capacity: '2.5M+ Pcs',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  // Global Media Picker Modal Integration
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [targetMediaField, setTargetMediaField] = useState('site_logo');
  const [uploadingField, setUploadingField] = useState(null);

  // Direct File Input Refs
  const logoInputRef = useRef(null);
  const faviconInputRef = useRef(null);
  const adminLogoInputRef = useRef(null);

  // cPanel Storage Repair Engine
  const [fixingStorage, setFixingStorage] = useState(false);
  const [storageFixResult, setStorageFixResult] = useState(null);

  // AI Connection Test State
  const [testingAi, setTestingAi] = useState(false);
  const [aiTestResult, setAiTestResult] = useState(null); // { success: boolean, message: string }

  useEffect(() => {
    let mounted = true;
    async function fetchSettings() {
      try {
        setLoading(true);
        const res = await apiFetch('/api/admin/settings');
        if (mounted && res && res.settings) {
          setSettings((prev) => ({ ...prev, ...res.settings }));
        }
      } catch (err) {
        showToast(err.message || 'Failed to fetch settings', 'error');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchSettings();
    return () => {
      mounted = false;
    };
  }, [apiFetch, showToast]);

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const res = await apiFetch('/api/admin/settings', {
        method: 'POST',
        body: JSON.stringify(settings),
      });

      if (res.success) {
        showToast('All configurations updated successfully in MySQL!', 'success');
      }
    } catch (err) {
      showToast(err.message || 'Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Media Library Handler
  const handleOpenMediaPicker = (fieldName) => {
    setTargetMediaField(fieldName);
    setMediaPickerOpen(true);
  };

  const handleSelectMedia = (item) => {
    const chosenUrl = item.file_url || item.url || item.file_path;
    setSettings((prev) => ({ ...prev, [targetMediaField]: chosenUrl }));
    setMediaPickerOpen(false);
    showToast(`Asset selected for ${targetMediaField.replace('_', ' ')}! Click 'Save All Settings' to apply.`, 'success');
  };

  // Direct File Upload Handler
  const handleDirectUpload = async (e, fieldName) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(fieldName);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'branding');

      const res = await apiFetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (res && res.success && res.uploaded && res.uploaded.length > 0) {
        const upItem = res.uploaded[0];
        const newUrl = upItem.url || upItem.file_url || upItem.relative_url;
        setSettings((prev) => ({ ...prev, [fieldName]: newUrl }));
        showToast(`${fieldName.replace('_', ' ')} uploaded! Click 'Save All Settings' to apply.`, 'success');
      } else {
        showToast(res?.message || 'File upload failed', 'error');
      }
    } catch (err) {
      showToast(err.message || 'Error uploading file', 'error');
    } finally {
      setUploadingField(null);
      e.target.value = '';
    }
  };

  // cPanel Storage & Uploads Repair Execution
  const handleFixStorage = async () => {
    setFixingStorage(true);
    setStorageFixResult(null);
    try {
      const res = await apiFetch('/api/admin/settings/fix-storage', {
        method: 'POST',
      });
      setStorageFixResult(res);
      if (res && res.success) {
        showToast('cPanel storage link and folders repaired successfully!', 'success');
      } else {
        showToast(res?.message || 'Repair completed with some warnings', 'warning');
      }
    } catch (err) {
      setStorageFixResult({
        success: false,
        message: err.message || 'Failed to execute storage repair',
        errors: [err.message],
        logs: ['Failed: ' + (err.message || 'Unknown network error')],
      });
      showToast(err.message || 'Failed to repair storage link', 'error');
    } finally {
      setFixingStorage(false);
    }
  };

  const handleTestAi = async () => {
    if (!settings.ai_api_key && settings.ai_provider !== 'heuristic') {
      showToast('Please enter an AI API Key first to test connection.', 'error');
      return;
    }

    setTestingAi(true);
    setAiTestResult(null);
    try {
      const res = await apiFetch('/api/admin/settings/test-ai', {
        method: 'POST',
        body: JSON.stringify({
          provider: settings.ai_provider,
          api_key: settings.ai_api_key,
          model: settings.ai_model,
        }),
      });

      if (res.success) {
        setAiTestResult({ success: true, message: res.message });
        showToast(res.message, 'success');
      } else {
        setAiTestResult({ success: false, message: res.message || 'Authentication error' });
        showToast(res.message || 'Connection test failed', 'error');
      }
    } catch (err) {
      setAiTestResult({ success: false, message: err.message || 'Failed to connect to AI API' });
      showToast(err.message || 'Connection error', 'error');
    } finally {
      setTestingAi(false);
    }
  };

  if (loading) {
    return (
      <div className="p-20 text-center text-slate-400">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs">Loading system configurations from MySQL...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3.5">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-amber-500" />
            <span>Master System Settings &amp; AI Configuration</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure AI generators, FOB costing benchmarks, buyer lead channels, and global SEO coordinates.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-2xs transition cursor-pointer disabled:opacity-50"
        >
          {saving ? (
            <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {/* MySQL & Server Storage Active Indicator */}
      <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200">
            <Database className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-slate-900">Database Engine: MySQL / MariaDB (softtex_db)</span>
            <span className="text-slate-500 ml-2 hidden sm:inline">&bull; All AI parameters, branding, and benchmarks persist in database.</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleFixStorage}
            disabled={fixingStorage}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-2xs transition cursor-pointer disabled:opacity-50"
            title="Fix storage shortcut, create upload directories & repair permissions on cPanel"
          >
            <RefreshCw className={`w-3 h-3 ${fixingStorage ? 'animate-spin' : ''}`} />
            <span>{fixingStorage ? 'Fixing...' : 'Fix cPanel Storage'}</span>
          </button>

          <a
            href="http://localhost/phpmyadmin/index.php?route=/database/structure&db=softtex_db"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 underline flex items-center gap-1"
          >
            <span>phpMyAdmin</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Smart Tab Navigation Strip */}
      <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 shadow-2xs">
        {[
          { id: 'branding', label: 'Brand Assets & Logo', icon: Palette },
          { id: 'cpanel', label: 'cPanel Storage Fixer', icon: Wrench },
          { id: 'ai', label: 'AI & Automation', icon: Bot },
          { id: 'sourcing', label: 'FOB Sourcing Matrix', icon: DollarSign },
          { id: 'corporate', label: 'Corporate & Contact', icon: Building },
          { id: 'leads', label: 'Buyer Leads & WhatsApp', icon: MessageCircle },
          { id: 'seo', label: 'SEO Master', icon: Search },
          { id: 'milestones', label: 'Trust Counters', icon: TrendingUp },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-slate-950 font-bold shadow-xs border border-slate-200/90 ring-1 ring-black/5'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 transition-colors ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-xs animate-pulse ml-0.5" />
              )}
            </button>
          );
        })}

        <Link
          to="/admin/security"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 shadow-2xs ml-auto group"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
          <span>Security &amp; Speed</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </Link>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* ========================================================================= */}
        {/* TAB 0: BRAND ASSETS & LOGO (লোগো ও ফেভিকোন) */}
        {/* ========================================================================= */}
        {activeTab === 'branding' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                    <Palette className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-slate-900">Brand Identity &amp; Digital Assets</h2>
                    <p className="text-xs text-slate-500">
                      সাইটের মূল লোগো, ব্রাউজার ট্যাব ফেভিকোন এবং অ্যাডমিন প্যানেল লোগো সেট করুন
                    </p>
                  </div>
                </div>
              </div>

              {/* 1. Main Website Logo */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-amber-500" />
                      <span>Main Website Logo (সাইটের মূল ব্র্যান্ড লোগো)</span>
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Renders on the public navbar, mobile drawer, and footer. Recommended transparent PNG or SVG (max height: 60px).
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenMediaPicker('site_logo')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition shadow-2xs cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5 text-amber-400" />
                      <span>Media Library</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => logoInputRef.current?.click()}
                      disabled={uploadingField === 'site_logo'}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs transition cursor-pointer"
                    >
                      <UploadCloud className="w-3.5 h-3.5 text-blue-600" />
                      <span>{uploadingField === 'site_logo' ? 'Uploading...' : 'Direct Upload'}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  {/* Live Visual Preview */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center min-h-[90px] relative overflow-hidden">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Live Navbar Preview</span>
                    <img
                      src={assetUrl(settings.site_logo)}
                      alt="Site Logo Preview"
                      className="max-h-12 w-auto object-contain"
                      onError={(e) => {
                        e.target.src = assetUrl('images/softtex-logo.png');
                      }}
                    />
                  </div>

                  {/* URL Input & Controls */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-[11px] font-bold text-slate-600">Logo Image Path or URL</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={settings.site_logo || ''}
                        onChange={(e) => setSettings({ ...settings, site_logo: e.target.value })}
                        placeholder="images/softtex-logo.png or https://..."
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-900 focus:ring-2 focus:ring-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => setSettings({ ...settings, site_logo: 'images/softtex-logo.png' })}
                        title="Reset to default logo"
                        className="p-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 transition cursor-pointer shrink-0"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-400 block">
                      Default: <code className="bg-slate-200/70 px-1 py-0.5 rounded text-slate-700">images/softtex-logo.png</code>
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Site Favicon */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-600" />
                      <span>Site Favicon (ব্রাউজার ট্যাব ফেভিকোন)</span>
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Displays in browser tabs, bookmarks bar, and mobile home shortcuts (32x32 or 48x48 PNG/ICO).
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenMediaPicker('site_favicon')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition shadow-2xs cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5 text-amber-400" />
                      <span>Media Library</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => faviconInputRef.current?.click()}
                      disabled={uploadingField === 'site_favicon'}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs transition cursor-pointer"
                    >
                      <UploadCloud className="w-3.5 h-3.5 text-blue-600" />
                      <span>{uploadingField === 'site_favicon' ? 'Uploading...' : 'Direct Upload'}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  {/* Browser Tab Simulation */}
                  <div className="p-3.5 rounded-xl bg-slate-200 border border-slate-300 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-2">Simulated Browser Tab</span>
                    <div className="w-full bg-white rounded-t-lg px-2.5 py-1.5 shadow-xs border border-slate-300 flex items-center gap-2 max-w-[240px]">
                      <img
                        src={assetUrl(settings.site_favicon)}
                        alt="Favicon"
                        className="w-4 h-4 object-contain shrink-0 rounded-xs"
                        onError={(e) => {
                          e.target.src = assetUrl('images/softtex-logo.png');
                        }}
                      />
                      <span className="text-[11px] font-bold text-slate-800 truncate flex-1">
                        {settings.company_name || 'SOFTTEX FASHIONS'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold cursor-pointer">&times;</span>
                    </div>
                  </div>

                  {/* Favicon URL Input & Controls */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-[11px] font-bold text-slate-600">Favicon Path or URL</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={settings.site_favicon || ''}
                        onChange={(e) => setSettings({ ...settings, site_favicon: e.target.value })}
                        placeholder="images/softtex-logo.png or /storage/uploads/..."
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-900 focus:ring-2 focus:ring-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => setSettings({ ...settings, site_favicon: 'images/softtex-logo.png' })}
                        title="Reset to default favicon"
                        className="p-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 transition cursor-pointer shrink-0"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-400 block">
                      Default: <code className="bg-slate-200/70 px-1 py-0.5 rounded text-slate-700">images/softtex-logo.png</code>
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. Admin Panel Brand Logo */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Admin Panel Logo (অ্যাডমিন প্যানেল লোগো)</span>
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Optional custom logo for the top left Admin CMS sidebar header.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenMediaPicker('admin_logo')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition shadow-2xs cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5 text-amber-400" />
                      <span>Media Library</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => adminLogoInputRef.current?.click()}
                      disabled={uploadingField === 'admin_logo'}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs transition cursor-pointer"
                    >
                      <UploadCloud className="w-3.5 h-3.5 text-blue-600" />
                      <span>{uploadingField === 'admin_logo' ? 'Uploading...' : 'Direct Upload'}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center min-h-[80px]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Admin Sidebar Preview</span>
                    {settings.admin_logo ? (
                      <img
                        src={assetUrl(settings.admin_logo)}
                        alt="Admin Logo"
                        className="max-h-10 w-auto object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs shadow-xs">
                        ST
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-[11px] font-bold text-slate-600">Admin Logo Path or URL (Optional)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={settings.admin_logo || ''}
                        onChange={(e) => setSettings({ ...settings, admin_logo: e.target.value })}
                        placeholder="Leave blank to use default stylish ST badge or enter URL"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-900 focus:ring-2 focus:ring-amber-500"
                      />
                      {settings.admin_logo && (
                        <button
                          type="button"
                          onClick={() => setSettings({ ...settings, admin_logo: '' })}
                          title="Clear admin logo"
                          className="p-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 transition cursor-pointer shrink-0"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB CPANEL: CPANEL STORAGE LINK & PERMISSIONS FIXER (সিপ্যানেল স্টোরেজ মেরামত) */}
        {/* ========================================================================= */}
        {activeTab === 'cpanel' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-slate-900">
                      cPanel Storage Symlink &amp; Uploads Repair Suite
                    </h2>
                    <p className="text-xs text-slate-500">
                      সিপ্যানেলে জিপ আনজিপ করার পর ব্রোকেন স্টোরেজ শর্টকাট ও পারমিশন স্বয়ংক্রিয়ভাবে মেরামত করুন
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleFixStorage}
                  disabled={fixingStorage}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-sm transition cursor-pointer disabled:opacity-50 self-start sm:self-auto"
                >
                  <RefreshCw className={`w-4 h-4 ${fixingStorage ? 'animate-spin' : ''}`} />
                  <span>{fixingStorage ? 'Executing Repair...' : 'Fix cPanel Storage Link'}</span>
                </button>
              </div>

              {/* Informative Explanatory Alert in Bengali & English */}
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
                <div className="flex items-center gap-2 font-black text-amber-900 text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>কেন সিপ্যানেলে আপলোড করলে শর্টকাট নষ্ট হয় এবং এই টুল কীভাবে সমাধান করে?</span>
                </div>
                <div className="text-xs text-amber-950/90 leading-relaxed space-y-1.5 font-medium">
                  <p>
                    <strong>সমস্যা:</strong> উইন্ডোজ বা লোকাল কম্পিউটার থেকে সাইটের ফাইল জিপ (ZIP) করে cPanel File Manager-এ আনজিপ করলে লিনাক্স সিম্বলিক লিংক (<code className="bg-amber-200/60 px-1 py-0.5 rounded text-amber-900 font-mono">public/storage</code> shortcut) ভেঙে যায় অথবা সাধারণ টেক্সট ফাইল হয়ে যায়। ফলে ব্রাউজারে আপলোড করা প্রোডাক্ট ছবি বা টেক প্যাক 404 দেখায়।
                  </p>
                  <p>
                    <strong>সমাধান:</strong> এই <strong className="text-emerald-800">"Fix cPanel Storage Link"</strong> বাটনে ক্লিক করলে সিস্টেম সম্পূর্ণ স্বয়ংক্রিয়ভাবে নিচের কাজগুলো সম্পন্ন করে:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700">
                    <li>ভেঙে যাওয়া পুরোনো <code className="font-mono bg-white px-1 py-0.2 rounded border">public/storage</code> সিম্বলিক লিংক আনলিঙ্ক ও ক্লিন করে।</li>
                    <li>আর্টিসান কমান্ড <code className="font-mono bg-white px-1 py-0.2 rounded border">storage:link</code> এক্সিকিউট করে নতুন কার্যকর সিম্বলিক লিংক সংযোগ তৈরি করে।</li>
                    <li>যদি কোনো শেয়ার্ড হোস্টিংয়ে <code className="font-mono bg-white px-1 py-0.2 rounded border">symlink()</code> ফাংশন নিষিদ্ধ থাকে, তবে স্বয়ংক্রিয় ফিজিক্যাল ডিরেক্টরি ফলব্যাক তৈরি করে ফাইল আপলোড চালু রাখে।</li>
                    <li><code className="font-mono bg-white px-1 py-0.2 rounded border">public/uploads</code> ও <code className="font-mono bg-white px-1 py-0.2 rounded border">public/uploads/techpacks</code> ফোল্ডার বানিয়ে <strong>0775</strong> ফুল রিড-রাইট পারমিশন সেট করে।</li>
                    <li>লারাভেলের কনফিগ ও ভিউ ক্যাশ (<code className="font-mono bg-white px-1 py-0.2 rounded border">config:clear</code>, <code className="font-mono bg-white px-1 py-0.2 rounded border">cache:clear</code>) রিসেট করে।</li>
                  </ul>
                </div>
              </div>

              {/* Status Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-500 text-[10px] uppercase">Uploads Directory</span>
                    <HardDrive className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="font-bold text-slate-900 text-sm">public/uploads</div>
                  <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[11px]">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>0775 Writable</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-500 text-[10px] uppercase">Techpack Folder</span>
                    <HardDrive className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="font-bold text-slate-900 text-sm">uploads/techpacks</div>
                  <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[11px]">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Ready for PDFs</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-500 text-[10px] uppercase">Storage Target</span>
                    <Database className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="font-bold text-slate-900 text-sm">storage/app/public</div>
                  <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[11px]">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Isolated &amp; Secure</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-500 text-[10px] uppercase">Public Symlink</span>
                    <Layers className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="font-bold text-slate-900 text-sm">public/storage</div>
                  <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[11px]">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Active Route Link</span>
                  </div>
                </div>
              </div>

              {/* Server Safety & Maintenance Shortcuts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                      <Download className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Database SQL Backup</h4>
                      <p className="text-[11px] text-slate-500">1-click full export of all MySQL tables</p>
                    </div>
                  </div>
                  <a
                    href={`${(window.__SOFTTEX_BASE_URL__ || '').replace(/\/$/, '')}/api/admin/security/backup-sql`}
                    download
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 transition shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .SQL</span>
                  </a>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-200">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">System Cache Optimizer</h4>
                      <p className="text-[11px] text-slate-500">Purge views, route & config caches</p>
                    </div>
                  </div>
                  <Link
                    to="/admin/security"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shrink-0 transition shadow-xs text-center"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Manage Cache</span>
                  </Link>
                </div>
              </div>

              {/* Execution Output Console */}
              {storageFixResult && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-800 flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-emerald-600" />
                      <span>Live Server Execution Diagnostic Log</span>
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        storageFixResult.success ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {storageFixResult.success ? 'COMPLETED (0 ERRORS)' : 'WARNINGS DETECTED'}
                    </span>
                  </div>

                  <div className="bg-slate-950 text-slate-200 p-4 rounded-2xl font-mono text-[11px] space-y-1 shadow-inner border border-slate-800 max-h-56 overflow-y-auto">
                    <div className="text-slate-500 text-[10px]"># Softtex Host Storage Repair Engine v2.5</div>
                    {storageFixResult.logs?.map((log, i) => (
                      <div key={i} className="flex items-start gap-2 text-emerald-400">
                        <span className="text-slate-600 select-none">&gt;</span>
                        <span>{log}</span>
                      </div>
                    ))}
                    {storageFixResult.errors?.map((err, i) => (
                      <div key={i} className="flex items-start gap-2 text-rose-400">
                        <span className="text-slate-600 select-none">!</span>
                        <span>{err}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {/* ========================================================================= */}
        {/* TAB 1: AI & AUTOMATION ENGINE */}
        {/* ========================================================================= */}
        {activeTab === 'ai' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-slate-900">AI Engine &amp; API Integration</h2>
                    <p className="text-xs text-slate-500">Power the AI SEO Blog Writer &amp; Tech Pack Assistant with LLMs</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleTestAi}
                  disabled={testingAi}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-2xs transition cursor-pointer disabled:opacity-50 self-start sm:self-auto"
                >
                  <Zap className={`w-3.5 h-3.5 ${testingAi ? 'animate-spin text-amber-400' : 'text-amber-400'}`} />
                  <span>{testingAi ? 'Testing Connection...' : 'Test AI Connection'}</span>
                </button>
              </div>

              {/* Live Connection Test Banner */}
              {aiTestResult && (
                <div
                  className={`p-4 rounded-2xl flex items-center gap-3 text-xs ${
                    aiTestResult.success
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border border-rose-200 text-rose-900'
                  }`}
                >
                  {aiTestResult.success ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <span className="font-semibold">{aiTestResult.message}</span>
                </div>
              )}

              {/* Provider Selection */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  1. Select AI Intelligence Provider
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'gemini',
                      name: 'Google Gemini',
                      desc: 'Fast, high token window, free tier available via Google AI Studio',
                      badge: 'Recommended',
                    },
                    {
                      id: 'openai',
                      name: 'OpenAI ChatGPT',
                      desc: 'Industry standard GPT-4o & GPT-4o-mini via OpenAI platform',
                      badge: 'Supported',
                    },
                    {
                      id: 'heuristic',
                      name: 'Built-in High-Authority Engine',
                      desc: 'Zero-cost offline deterministic technical apparel writing engine',
                      badge: 'Zero API Key Required',
                    },
                  ].map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setSettings({ ...settings, ai_provider: p.id })}
                      className={`p-4 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between space-y-2 ${
                        settings.ai_provider === p.id
                          ? 'border-amber-500 bg-amber-50/20 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-slate-900">{p.name}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          {p.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* API Key Input (Masked with Eye) */}
              {settings.ai_provider !== 'heuristic' && (
                <div className="space-y-4 pt-2">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Key className="w-3.5 h-3.5 text-amber-500" />
                        <span>2. {settings.ai_provider === 'gemini' ? 'Google Gemini' : 'OpenAI'} API Key</span>
                      </label>
                      <a
                        href={
                          settings.ai_provider === 'gemini'
                            ? 'https://aistudio.google.com/app/apikey'
                            : 'https://platform.openai.com/api-keys'
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-amber-700 hover:text-amber-800 font-bold underline flex items-center gap-1"
                      >
                        <span>Get Free Key</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="relative">
                      <input
                        type={showApiKey ? 'text' : 'password'}
                        value={settings.ai_api_key || ''}
                        onChange={(e) => setSettings({ ...settings, ai_api_key: e.target.value })}
                        placeholder={
                          settings.ai_provider === 'gemini'
                            ? 'AIzaSy...'
                            : 'sk-proj-...'
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono pr-10 focus:ring-2 focus:ring-amber-500 focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Stored securely in MySQL database. Used exclusively for generating SEO articles and technical specs.
                    </p>
                  </div>

                  {/* Model Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                        3. AI Model Name
                      </label>
                      <select
                        value={settings.ai_model || 'gemini-1.5-flash'}
                        onChange={(e) => setSettings({ ...settings, ai_model: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:ring-2 focus:ring-amber-500"
                      >
                        {settings.ai_provider === 'gemini' ? (
                          <>
                            <option value="gemini-1.5-flash">gemini-1.5-flash (Fastest &amp; Most Cost-Effective)</option>
                            <option value="gemini-1.5-pro">gemini-1.5-pro (Deep Technical Reasoning)</option>
                            <option value="gemini-2.0-flash">gemini-2.0-flash (Next Gen High-Speed)</option>
                          </>
                        ) : (
                          <>
                            <option value="gpt-4o-mini">gpt-4o-mini (Fast &amp; Accurate)</option>
                            <option value="gpt-4o">gpt-4o (Flagship Model)</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          4. Temperature (Creativity)
                        </label>
                        <span className="font-mono text-xs font-bold text-amber-700">
                          {settings.ai_temperature || '0.7'}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.2"
                        max="1.0"
                        step="0.05"
                        value={settings.ai_temperature || '0.7'}
                        onChange={(e) => setSettings({ ...settings, ai_temperature: e.target.value })}
                        className="w-full accent-amber-500 cursor-pointer mt-1"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                        <span>0.2 (Rigid &amp; Technical)</span>
                        <span>0.7 (Balanced B2B)</span>
                        <span>1.0 (Creative)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Default Publishing Status */}
              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-slate-800 block">Default AI Generated Article Status</span>
                  <span className="text-slate-500">Choose whether newly generated articles go live immediately or wait as drafts</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, ai_default_status: 'published' })}
                    className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                      settings.ai_default_status === 'published'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Auto-Publish Live
                  </button>
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, ai_default_status: 'draft' })}
                    className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                      settings.ai_default_status === 'draft'
                        ? 'bg-amber-500 text-slate-950 shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Save as Draft (Review First)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: FOB & SOURCING MATRIX */}
        {/* ========================================================================= */}
        {activeTab === 'sourcing' && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-amber-500" />
                <span>Live Garment FOB Costing &amp; Trade Tariffs Matrix</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Adjust baseline raw cotton price, MOQ rules, and duty-free tariff advantage benchmarks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Cotton Yarn Benchmark Index ($/kg)</label>
                <input
                  type="text"
                  value={settings.benchmark_yarn_price || '3.85'}
                  onChange={(e) => setSettings({ ...settings, benchmark_yarn_price: e.target.value })}
                  placeholder="3.85"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono font-bold focus:ring-2 focus:ring-amber-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Live 30s/1 Combed Ring Spun Yarn Base</span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Default Factory MOQ (Pcs)</label>
                <input
                  type="text"
                  value={settings.default_moq || '1000'}
                  onChange={(e) => setSettings({ ...settings, default_moq: e.target.value })}
                  placeholder="1000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono font-bold focus:ring-2 focus:ring-amber-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Standard Minimum Order Quantity per style</span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Quality Inspection Standard</label>
                <input
                  type="text"
                  value={settings.quality_gate_standard || 'AQL 1.5 FRI Level II'}
                  onChange={(e) => setSettings({ ...settings, quality_gate_standard: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-bold focus:ring-2 focus:ring-amber-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Included Final Random Inspection gate</span>
              </div>
            </div>

            {/* Duty Exemption Percentages */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Tariff Exemption Savings Benchmarks (%)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">EU &amp; UK (EBA / DCTS) Savings</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={settings.duty_exemption_eu_uk || '12.0'}
                      onChange={(e) => setSettings({ ...settings, duty_exemption_eu_uk: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-emerald-700"
                    />
                    <span className="font-bold text-slate-600">%</span>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Canada (LDCT) Savings</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={settings.duty_exemption_canada || '18.0'}
                      onChange={(e) => setSettings({ ...settings, duty_exemption_canada: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-emerald-700"
                    />
                    <span className="font-bold text-slate-600">%</span>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Japan (GSP) Savings</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={settings.duty_exemption_japan || '10.0'}
                      onChange={(e) => setSettings({ ...settings, duty_exemption_japan: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-emerald-700"
                    />
                    <span className="font-bold text-slate-600">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Standard Timelines */}
            <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Proto Sampling Lead Time</label>
                <input
                  type="text"
                  value={settings.lead_time_sampling || '5 - 7 Days'}
                  onChange={(e) => setSettings({ ...settings, lead_time_sampling: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Bulk Production Lead Time</label>
                <input
                  type="text"
                  value={settings.lead_time_bulk || '45 - 55 Days'}
                  onChange={(e) => setSettings({ ...settings, lead_time_bulk: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: CORPORATE & CONTACT */}
        {/* ========================================================================= */}
        {activeTab === 'corporate' && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Building className="w-5 h-5 text-amber-500" />
                <span>Corporate Headquarters &amp; Physical Facilities</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Official registration details, contact numbers, and factory addresses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Company Legal Name</label>
                <input
                  type="text"
                  value={settings.company_name || ''}
                  onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Corporate Email Address</label>
                <input
                  type="email"
                  value={settings.company_email || ''}
                  onChange={(e) => setSettings({ ...settings, company_email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Office Telephone (PABX)</label>
                <input
                  type="text"
                  value={settings.company_phone || ''}
                  onChange={(e) => setSettings({ ...settings, company_phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Direct Mobile</label>
                <input
                  type="text"
                  value={settings.company_mobile || ''}
                  onChange={(e) => setSettings({ ...settings, company_mobile: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Corporate Office Address</label>
                <textarea
                  rows={2}
                  value={settings.corporate_address || ''}
                  onChange={(e) => setSettings({ ...settings, corporate_address: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Factory &amp; Sourcing Hub Address</label>
                <textarea
                  rows={2}
                  value={settings.factory_address || ''}
                  onChange={(e) => setSettings({ ...settings, factory_address: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Operating Hours</label>
                <input
                  type="text"
                  value={settings.working_hours || ''}
                  onChange={(e) => setSettings({ ...settings, working_hours: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: BUYER LEADS & WHATSAPP */}
        {/* ========================================================================= */}
        {activeTab === 'leads' && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span>Buyer Inquiries &amp; WhatsApp Hotlines</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Set numbers and notifications for instant RFQs, Tech Packs, and Swatch dispatches.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Official WhatsApp Sourcing Number</label>
                <input
                  type="text"
                  value={settings.company_whatsapp || ''}
                  onChange={(e) => setSettings({ ...settings, company_whatsapp: e.target.value })}
                  placeholder="+8801904464294"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono font-bold focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Include international country code with +</span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Lead Alert Notification Email</label>
                <input
                  type="email"
                  value={settings.lead_notification_email || ''}
                  onChange={(e) => setSettings({ ...settings, lead_notification_email: e.target.value })}
                  placeholder="sourcing@softtexfashions.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Where RFQ and Tech Pack alerts are forwarded</span>
              </div>
            </div>

            <div className="text-xs">
              <label className="block font-bold text-slate-700 mb-1">Pre-filled WhatsApp Greeting Template</label>
              <textarea
                rows={2}
                value={settings.whatsapp_greeting_text || ''}
                onChange={(e) => setSettings({ ...settings, whatsapp_greeting_text: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 resize-none"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Pre-filled when buyers click the WhatsApp Merchandising Desk button.
              </span>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: SEO MASTER & WEB TRACKING */}
        {/* ========================================================================= */}
        {activeTab === 'seo' && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-600" />
                <span>Global SEO Master &amp; Web Analytics</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Optimize search engine indexation, meta titles, Google Analytics 4, and Search Console.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Site Meta Title Suffix</label>
                <input
                  type="text"
                  value={settings.meta_title_suffix || ''}
                  onChange={(e) => setSettings({ ...settings, meta_title_suffix: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Global Meta Description</label>
                <textarea
                  rows={2}
                  value={settings.default_meta_description || ''}
                  onChange={(e) => setSettings({ ...settings, default_meta_description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Google Analytics 4 Measurement ID</label>
                  <input
                    type="text"
                    value={settings.ga4_measurement_id || ''}
                    onChange={(e) => setSettings({ ...settings, ga4_measurement_id: e.target.value })}
                    placeholder="G-XXXXXXXXXX"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Google Search Console Verification Tag</label>
                  <input
                    type="text"
                    value={settings.gsc_verification_tag || ''}
                    onChange={(e) => setSettings({ ...settings, gsc_verification_tag: e.target.value })}
                    placeholder="google-site-verification=..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono"
                  />
                </div>
              </div>

              {/* Sitemap & Robots.txt Links */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 pt-3">
                <div className="text-slate-600">
                  <strong className="text-slate-900 block">Automated XML Sitemap &amp; Robots.txt</strong>
                  <span>Dynamically compiled for Googlebot and Bing indexing.</span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="http://localhost/softtexfashions_new/softtex-laravel/public/sitemap.xml"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 font-bold hover:bg-slate-100"
                  >
                    <span>View sitemap.xml</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                  <a
                    href="http://localhost/softtexfashions_new/softtex-laravel/public/robots.txt"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 font-bold hover:bg-slate-100"
                  >
                    <span>View robots.txt</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: TRUST COUNTERS & STATS */}
        {/* ========================================================================= */}
        {activeTab === 'milestones' && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-500" />
                <span>Live Factory Milestones &amp; Trust Counters</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                These numbers display in the hero section, company profile, and dashboard.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-500 mb-1">Annual Turnover</label>
                <input
                  type="text"
                  value={settings.stat_turnover || ''}
                  onChange={(e) => setSettings({ ...settings, stat_turnover: e.target.value })}
                  placeholder="$45M+"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-amber-700 font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-500 mb-1">Global Brands</label>
                <input
                  type="text"
                  value={settings.stat_brands || ''}
                  onChange={(e) => setSettings({ ...settings, stat_brands: e.target.value })}
                  placeholder="15+"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-blue-700 font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-500 mb-1">Production Lines</label>
                <input
                  type="text"
                  value={settings.stat_lines || ''}
                  onChange={(e) => setSettings({ ...settings, stat_lines: e.target.value })}
                  placeholder="120+"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-emerald-700 font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-500 mb-1">QA Acceptance Rate</label>
                <input
                  type="text"
                  value={settings.stat_qa_rate || ''}
                  onChange={(e) => setSettings({ ...settings, stat_qa_rate: e.target.value })}
                  placeholder="99.8%"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-purple-700 font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-500 mb-1">Monthly Capacity</label>
                <input
                  type="text"
                  value={settings.stat_capacity || ''}
                  onChange={(e) => setSettings({ ...settings, stat_capacity: e.target.value })}
                  placeholder="2.5M+ Pcs"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold"
                />
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Hidden File Inputs for Fast Direct Image Uploads */}
      <input
        type="file"
        ref={logoInputRef}
        onChange={(e) => handleDirectUpload(e, 'site_logo')}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={faviconInputRef}
        onChange={(e) => handleDirectUpload(e, 'site_favicon')}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={adminLogoInputRef}
        onChange={(e) => handleDirectUpload(e, 'admin_logo')}
        accept="image/*"
        className="hidden"
      />

      {/* Global Media Picker Modal */}
      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={handleSelectMedia}
        title={`Select Asset for ${targetMediaField.replace('_', ' ').toUpperCase()}`}
        buttonText="Apply to Setting"
      />
    </div>
  );
}
