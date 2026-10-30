import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from './AdminContext';
import {
  FileText,
  Inbox,
  Image,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Sliders,
  Sparkles,
  Database,
  Layers,
  Activity,
  Globe,
  Plus,
  Compass,
} from 'lucide-react';

export default function AdminDashboard() {
  const { apiFetch } = useAdmin();
  const [stats, setStats] = useState({
    total_pages: 8,
    total_inquiries: 0,
    pending_rfqs: 0,
    unread_messages: 1,
    total_gallery_items: 12,
    recent_inquiries: [],
    system: {
      db_driver: 'MYSQL',
      db_name: 'softtex_db',
      php_version: '8.2.12',
      latency: '1.2ms',
    },
    chart_data: {
      months: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      inquiries: [18, 27, 34, 42, 58, 76],
      rfq_volume: [120000, 195000, 240000, 310000, 420000, 580000],
    },
    category_breakdown: [
      { name: 'Knitwear (Polo & T-Shirts)', percent: 42, color: '#f59e0b' },
      { name: 'Woven (Shirts & Chinos)', percent: 32, color: '#3b82f6' },
      { name: 'Outerwear & Jackets', percent: 16, color: '#10b981' },
      { name: 'Sweaters & Heavy Knit', percent: 10, color: '#8b5cf6' },
    ],
    recent_activities: [],
  });
  const [loading, setLoading] = useState(true);
  const [hoveredMonthIdx, setHoveredMonthIdx] = useState(5);

  useEffect(() => {
    let mounted = true;
    async function loadStats() {
      try {
        const res = await apiFetch('/api/admin/stats');
        if (mounted && res) {
          setStats((prev) => ({ ...prev, ...res }));
        }
      } catch (err) {
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadStats();
    return () => {
      mounted = false;
    };
  }, [apiFetch]);

  // Chart coordinates calculation for SVG curve
  const chartData = stats.chart_data || {
    months: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    inquiries: [18, 27, 34, 42, 58, 76],
  };
  const maxInq = Math.max(...chartData.inquiries, 80);
  const chartPoints = chartData.inquiries.map((val, idx) => {
    const x = (idx / (chartData.inquiries.length - 1)) * 500;
    const y = 135 - (val / maxInq) * 105;
    return { x, y, val, month: chartData.months[idx] };
  });

  const svgPathD = chartPoints.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = chartPoints[i - 1];
    const cx = (prev.x + pt.x) / 2;
    return `${acc} C ${cx} ${prev.y}, ${cx} ${pt.y}, ${pt.x} ${pt.y}`;
  }, '');

  const svgAreaD = `${svgPathD} L 500 155 L 0 155 Z`;

  return (
    <div className="space-y-4 w-full pb-8">
      {/* Executive Welcome Hero Banner (Compact & Full Width) */}
      <div className="relative overflow-hidden rounded-xl bg-white border border-slate-200/90 p-4 sm:p-5 shadow-xs">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Executive Sourcing Command Center</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              Softtex Fashions Wear Limited
            </h1>
            <p className="text-slate-500 text-xs max-w-2xl leading-relaxed">
              100% Export-Oriented Garments Buying House Bangladesh &bull; Dynamic Content Management, Buyer RFQ Quotations, and Automated SEO Indexing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/admin/pages"
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Manage All 8 Pages</span>
            </Link>

            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-200 shadow-2xs transition flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-600" />
              <span>Live Website</span>
            </Link>
          </div>
        </div>

        {/* Database & Diagnostics Status Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              DATABASE: {stats.system?.db_driver || 'MYSQL'}
            </span>
            <span className="text-slate-500 font-mono text-[11px]">
              Host: 127.0.0.1:3306 &bull; Database: <strong className="text-slate-900">{stats.system?.db_name || 'softtex_db'}</strong>
            </span>
          </div>

          <div className="text-slate-500 text-[11px] font-mono">
            PHP {stats.system?.php_version || '8.2'} &bull; Laravel {stats.system?.laravel_version || '12.x'} &bull; React 19.3
          </div>
        </div>
      </div>

      {/* 4 Compact Metric KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1 */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Total Pages
            </span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{stats.total_pages || 8}</div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 font-medium">
            <span className="text-emerald-700 font-bold">100% Dynamic</span> &bull; 8 Core Pages
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Buyer RFQ Leads
            </span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{stats.pending_rfqs || 0}</div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 font-medium">
            <span className="text-blue-700 font-bold">+28%</span> &bull; Inbound orders
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Inquiries
            </span>
            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{stats.unread_messages || 1}</div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 font-medium">
            <span className="text-purple-700 font-bold">Active Inbox</span> &bull; Direct buyer inquiries
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Portfolios &amp; Brands
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <Image className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{stats.total_gallery_items || 12}</div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 font-medium">
            <span className="text-emerald-700 font-bold">Showcase</span> &bull; Client lookbooks
          </div>
        </div>
      </div>

      {/* Visual Analytics Grid: Monthly Inquiries Trend + Garments Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Monthly RFQ Trajectory */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <h2 className="text-base font-bold text-slate-900">Buyer RFQ &amp; Quotation Inflow Trend</h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Monthly buyer request volume generated from interactive sourcing islands
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 font-mono">
                {chartData.months[hoveredMonthIdx]}: {chartData.inquiries[hoveredMonthIdx]} Inquiries
              </span>
            </div>
          </div>

          {/* SVG Smooth Curved Area Chart in Light Palette */}
          <div className="relative pt-4 pb-2">
            <svg viewBox="0 0 500 155" className="w-full h-44 overflow-visible">
              <defs>
                <linearGradient id="chartGradientLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1.5" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1.5" />
              <line x1="0" y1="135" x2="500" y2="135" stroke="#e2e8f0" strokeWidth="1.5" />

              {/* Gradient Area */}
              <path d={svgAreaD} fill="url(#chartGradientLight)" />

              {/* Line Stroke */}
              <path d={svgPathD} fill="none" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />

              {/* Interactive Data points */}
              {chartPoints.map((pt, i) => (
                <g
                  key={i}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredMonthIdx(i)}
                >
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={hoveredMonthIdx === i ? 6 : 4}
                    fill={hoveredMonthIdx === i ? '#ffffff' : '#d97706'}
                    stroke={hoveredMonthIdx === i ? '#d97706' : '#ffffff'}
                    strokeWidth="2.5"
                    className="transition-all"
                  />
                </g>
              ))}
            </svg>

            {/* X-Axis Month labels */}
            <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-2 px-1">
              {chartData.months.map((m, i) => (
                <span
                  key={i}
                  className={`cursor-pointer transition ${
                    hoveredMonthIdx === i ? 'text-amber-700 font-bold' : ''
                  }`}
                  onMouseEnter={() => setHoveredMonthIdx(i)}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Chart 2: Garment Category Distribution */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Layers className="w-4 h-4 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900">Sourcing Categories</h2>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Buyer quotation distribution by garment apparel category
            </p>
          </div>

          <div className="space-y-4 my-2">
            {(stats.category_breakdown || []).map((cat, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700">{cat.name}</span>
                  <span className="font-mono font-bold text-slate-900">{cat.percent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${cat.percent}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 flex items-center justify-between">
            <span>Primary Export: <b>100% Cotton &amp; Blends</b></span>
            <span className="text-emerald-700 font-bold font-mono">Verified</span>
          </div>
        </div>
      </div>

      {/* Quick Access Shortcuts Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-amber-600" />
          <span>Quick Dynamic Editors</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/pages/edit/services"
            className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-300 transition group flex flex-col justify-between shadow-xs hover:shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                  Services
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mt-3">Our Services</h3>
              <p className="text-xs text-slate-500 mt-1">
                Edit 8 Key Functions accordion (Sourcing, Merchandising, QA, Logistics).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-amber-700 font-bold flex items-center gap-1">
              <span>Edit 8 Key Functions</span>
              <span>&rarr;</span>
            </div>
          </Link>

          <Link
            to="/admin/pages/edit/quality"
            className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-300 transition group flex flex-col justify-between shadow-xs hover:shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Quality
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mt-3">Quality Management</h3>
              <p className="text-xs text-slate-500 mt-1">
                Edit QA protocols, AQL 1.5/2.5 inspection charts, and quality dimensions.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-emerald-700 font-bold flex items-center gap-1">
              <span>Edit Quality Protocols</span>
              <span>&rarr;</span>
            </div>
          </Link>

          <Link
            to="/admin/settings"
            className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 transition group flex flex-col justify-between shadow-xs hover:shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                  Settings
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mt-3">Site Contact &amp; Stats</h3>
              <p className="text-xs text-slate-500 mt-1">
                Update phone numbers, WhatsApp, emails, address &amp; factory turnover stats.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-blue-700 font-bold flex items-center gap-1">
              <span>Update Site Settings</span>
              <span>&rarr;</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Live System Activity Feed */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900">Live System Activity &amp; Audit Feed</h2>
          </div>
          <span className="text-[11px] text-slate-500 font-mono font-medium">Real-time status</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(stats.recent_activities || []).map((act, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-900">{act.action}</span>
                <span className="text-slate-500 font-mono">{act.time}</span>
              </div>
              <div className="text-[11px] text-slate-500 leading-snug">{act.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
