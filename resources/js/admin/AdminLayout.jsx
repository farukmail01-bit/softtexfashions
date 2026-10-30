import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAdmin } from './AdminContext';
import {
  LayoutDashboard,
  FileText,
  Inbox,
  Image,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
  Layers,
  ChevronRight,
  Bell,
  Search,
  Database,
  CheckCircle,
  Activity,
  Sparkles,
  Command,
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const { user, logout, apiFetch } = useAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [systemStats, setSystemStats] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    async function loadQuickStats() {
      try {
        const res = await apiFetch('/api/admin/stats');
        if (mounted && res) {
          setSystemStats(res);
        }
      } catch (e) {}
    }
    loadQuickStats();
    return () => {
      mounted = false;
    };
  }, [apiFetch]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Pages Management', path: '/admin/pages', icon: FileText },
    {
      label: 'Inquiries & RFQs',
      path: '/admin/inquiries',
      icon: Inbox,
      badge: systemStats?.unread_messages || systemStats?.pending_rfqs || null,
    },
    { label: 'Product Galleries', path: '/admin/galleries', icon: Image },
    { label: 'Media Library', path: '/admin/media', icon: Layers },
    { label: 'SEO Blog & AI Studio', path: '/admin/blog', icon: Sparkles },
    { label: 'Security & Speed', path: '/admin/security', icon: Shield },
    { label: 'Site Settings', path: '/admin/settings', icon: Settings },
  ];

  // Compute breadcrumbs
  const path = location.pathname.replace(/^\/admin/, '') || '';
  const getBreadcrumb = () => {
    if (!path || path === '/') return 'Dashboard Overview';
    if (path.startsWith('/pages/edit')) return 'Pages Management › Edit Page';
    if (path.startsWith('/pages')) return 'Pages Management › Catalog';
    if (path.startsWith('/inquiries')) return 'Buyer Inquiries & Leads';
    if (path.startsWith('/galleries')) return 'Brand Portfolios';
    if (path.startsWith('/media')) return 'Global Media Library';
    if (path.startsWith('/blog')) return 'SEO Blog Engine & Keywords';
    if (path.startsWith('/security')) return 'Security Shield & Database Speed Engine';
    if (path.startsWith('/settings')) return 'Global Site Settings';
    return 'Management';
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col md:flex-row font-sans selection:bg-amber-500/20 selection:text-amber-900">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black text-sm shadow-xs">
            ST
          </div>
          <span className="font-extrabold text-sm tracking-wider text-slate-900">SOFTTEX CMS</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-900"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileMenuOpen ? 'block fixed inset-0' : 'hidden'
        } md:block md:static md:w-64 bg-white border-r border-slate-200/90 flex-shrink-0 flex flex-col justify-between z-40 transition-all shadow-xs`}
      >
        <div>
          {/* Brand header */}
          <div className="p-5 border-b border-slate-100">
            <Link to="/admin" className="flex items-center gap-3 group">
              <div className="relative">
                {typeof window !== 'undefined' && (window.__SOFTTEX_SETTINGS__?.admin_logo || window.__SOFTTEX_SETTINGS__?.site_logo) ? (
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-1 overflow-hidden shadow-sm group-hover:scale-105 transition">
                    <img
                      src={window.__SOFTTEX_SETTINGS__.admin_logo || window.__SOFTTEX_SETTINGS__.site_logo}
                      alt="Logo"
                      className="w-full h-full object-contain"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black text-sm shadow-sm group-hover:scale-105 transition">
                    ST
                  </div>
                )}
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
              </div>
              <div>
                <div className="font-extrabold text-sm tracking-tight text-slate-900 group-hover:text-amber-600 transition flex items-center gap-1.5">
                  <span>SOFTTEX CMS</span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 font-medium">
                  <span className="text-amber-600 font-bold font-mono">v2.5</span>
                  <span>&bull;</span>
                  <span>Admin Panel</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-3.5 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Core Modules
            </div>

            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition group ${
                    isActive
                      ? 'bg-amber-50 text-amber-900 font-bold border border-amber-200 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <item.icon
                    className={`w-4 h-4 transition ${
                      location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path))
                        ? 'text-amber-600'
                        : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {item.badge ? (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-amber-500 text-slate-950">
                      {item.badge}
                    </span>
                  ) : null}
                  <ChevronRight className="w-3.5 h-3.5 opacity-30 group-hover:opacity-60 group-hover:translate-x-0.5 transition" />
                </div>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Database & Diagnostics Footer */}
        <div className="p-4 border-t border-slate-100 space-y-3 bg-slate-50/60">
          {/* Active Database Badge */}
          <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1.5">
                <Database className="w-3 h-3 text-emerald-600" />
                Database Engine
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {systemStats?.system?.db_driver || 'MYSQL'}
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-700 truncate font-medium">
              {systemStats?.system?.db_name || 'softtex_db'}
              <span className="text-slate-400 text-[10px]"> (localhost)</span>
            </div>
          </div>

          {/* Admin User Card */}
          <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-xs text-slate-950 font-black shrink-0">
                A
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-slate-900 truncate">
                  {user?.name || 'Administrator'}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {user?.email || 'admin@softtexfashions.com'}
                </div>
              </div>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800 border border-amber-200 shrink-0">
              Admin
            </span>
          </div>

          {/* Action links */}
          <div className="flex items-center gap-2">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 hover:text-slate-900 transition border border-slate-200 shadow-2xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-600" />
              <span>Live Website</span>
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 hover:text-rose-700 transition cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto min-h-screen bg-slate-50">
        {/* Top Desktop Navigation & Utility Header */}
        <header className="hidden md:flex items-center justify-between px-6 py-2.5 bg-white/95 border-b border-slate-200/80 backdrop-blur-md sticky top-0 z-30 shadow-2xs">
          {/* Breadcrumb Trail */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Shield className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-medium text-slate-400">Admin</span>
            <span>&rsaquo;</span>
            <span className="font-bold text-slate-800">{getBreadcrumb()}</span>
          </div>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-2.5">
            {/* System Engine Health Pill */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-emerald-700">
                {systemStats?.system?.db_driver || 'MYSQL'}
              </span>
              <span className="text-slate-300">&bull;</span>
              <span>PHP {systemStats?.system?.php_version?.substring(0, 3) || '8.2'}</span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-amber-700 font-semibold">{systemStats?.system?.latency || '1.2ms'}</span>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition relative cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {(systemStats?.unread_messages > 0 || systemStats?.pending_rfqs > 0) && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
                )}
              </button>

              {/* Notification Popover Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-slate-200 shadow-xl p-4 z-50 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-900">Recent Buyer Alerts</span>
                    <span className="text-[10px] text-amber-600 font-mono font-bold">Live</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    {systemStats?.recent_inquiries && systemStats.recent_inquiries.length > 0 ? (
                      systemStats.recent_inquiries.slice(0, 3).map((item) => (
                        <Link
                          key={item.id}
                          to="/admin/inquiries"
                          onClick={() => setNotificationsOpen(false)}
                          className="block p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50/60 transition border border-slate-100"
                        >
                          <div className="font-bold text-slate-900 text-xs">{item.name || 'New Buyer'}</div>
                          <div className="text-[11px] text-slate-500 truncate">
                            {item.garments_type} &mdash; {item.target_quantity} pcs
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="py-4 text-center text-slate-400 text-xs">
                        No pending inquiries. All caught up!
                      </div>
                    )}
                  </div>
                  <Link
                    to="/admin/inquiries"
                    onClick={() => setNotificationsOpen(false)}
                    className="block text-center text-[11px] font-bold text-amber-600 hover:text-amber-700 pt-1"
                  >
                    View All Leads &rarr;
                  </Link>
                </div>
              )}
            </div>

            {/* Live Website Button */}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span>Live Website</span>
            </Link>
          </div>
        </header>

        {/* Child Page Content */}
        <div className="p-4 sm:p-5 lg:p-6 flex-1 w-full max-w-none">
          {children}
        </div>
      </main>
    </div>
  );
}
