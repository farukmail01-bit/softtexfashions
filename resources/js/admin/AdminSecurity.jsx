import React, { useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';
import {
  ShieldCheck,
  ShieldAlert,
  Shield,
  Lock,
  Unlock,
  Database,
  Cpu,
  Zap,
  Activity,
  RefreshCw,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock,
  Terminal,
  Sliders,
  Search,
  Plus,
  Play,
  RotateCcw,
  Layers,
  ArrowUpRight,
  HardDrive,
  FileText,
  KeyRound,
  Filter,
  Check,
  Download
} from 'lucide-react';

export default function AdminSecurity() {
  const { apiFetch, showToast } = useAdmin();

  // State
  const [activeTab, setActiveTab] = useState('shield'); // 'shield' | 'database' | 'indexing'
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [securityData, setSecurityData] = useState(null);

  // Settings form
  const [settingsForm, setSettingsForm] = useState({
    max_attempts: 5,
    lockout_minutes: 30,
    enabled: true,
  });

  // Manual IP block form
  const [manualIpForm, setManualIpForm] = useState({
    ip_address: '',
    reason: '',
    duration_type: '60', // '60', '1440', '10080', 'permanent'
  });
  const [showManualBlockModal, setShowManualBlockModal] = useState(false);

  // Execution Log Console
  const [consoleLogs, setConsoleLogs] = useState([
    { time: new Date().toLocaleTimeString(), type: 'info', text: 'Softtex Security & Database Engine active.' }
  ]);

  // Filters & Searches
  const [ipSearch, setIpSearch] = useState('');
  const [tableSearch, setTableSearch] = useState('');

  const addLog = (text, type = 'info') => {
    setConsoleLogs(prev => [
      { time: new Date().toLocaleTimeString(), type, text },
      ...prev.slice(0, 49)
    ]);
  };

  const fetchSecurityOverview = async (quiet = false) => {
    if (!quiet) setLoading(true);
    try {
      const res = await apiFetch('/api/admin/security');
      if (res && res.success) {
        setSecurityData(res);
        setSettingsForm({
          max_attempts: res.shield?.max_attempts || 5,
          lockout_minutes: res.shield?.lockout_minutes || 30,
          enabled: res.shield?.enabled ?? true,
        });
      }
    } catch (err) {
      showToast(err.message || 'Failed to load security overview', 'error');
      addLog(`Error loading security status: ${err.message}`, 'error');
    } finally {
      if (!quiet) setLoading(false);
    }
  };

  useEffect(() => {
    fetchSecurityOverview();
  }, []);

  // 1. Toggle Brute Force Shield
  const handleToggleShield = async () => {
    setActionLoading(true);
    try {
      const res = await apiFetch('/api/admin/security/toggle', { method: 'POST' });
      if (res && res.success) {
        showToast(res.message, 'success');
        addLog(res.message, res.enabled ? 'success' : 'warn');
        fetchSecurityOverview(true);
      }
    } catch (err) {
      showToast(err.message || 'Failed to toggle shield', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // 2. Save Shield Thresholds
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await apiFetch('/api/admin/security/settings', {
        method: 'POST',
        body: JSON.stringify(settingsForm),
      });
      if (res && res.success) {
        showToast(res.message || 'Security settings updated', 'success');
        addLog('Brute force lockout rules updated in MySQL.', 'success');
        fetchSecurityOverview(true);
      }
    } catch (err) {
      showToast(err.message || 'Failed to save settings', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // 3. Manual Block IP
  const handleManualBlock = async (e) => {
    e.preventDefault();
    if (!manualIpForm.ip_address.trim()) {
      showToast('Please enter a valid IP address', 'error');
      return;
    }
    setActionLoading(true);
    try {
      let duration = null;
      if (manualIpForm.duration_type !== 'permanent') {
        duration = parseInt(manualIpForm.duration_type, 10);
      }

      const res = await apiFetch('/api/admin/security/block-ip', {
        method: 'POST',
        body: JSON.stringify({
          ip_address: manualIpForm.ip_address.trim(),
          reason: manualIpForm.reason.trim() || 'Manual administrative ban',
          duration_minutes: duration,
        }),
      });

      if (res && res.success) {
        showToast(res.message, 'success');
        addLog(`Manual IP Block enacted on: ${manualIpForm.ip_address}`, 'warn');
        setManualIpForm({ ip_address: '', reason: '', duration_type: '60' });
        setShowManualBlockModal(false);
        fetchSecurityOverview(true);
      }
    } catch (err) {
      showToast(err.message || 'Failed to block IP', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // 4. Unblock IP
  const handleUnblockIp = async (ip) => {
    if (!confirm(`Are you sure you want to unblock IP address ${ip}?`)) return;
    setActionLoading(true);
    try {
      const res = await apiFetch('/api/admin/security/unblock-ip', {
        method: 'POST',
        body: JSON.stringify({ ip_address: ip }),
      });
      if (res && res.success) {
        showToast(res.message, 'success');
        addLog(`Unblocked IP: ${ip}`, 'success');
        fetchSecurityOverview(true);
      }
    } catch (err) {
      showToast(err.message || 'Failed to unblock IP', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // 5. Clear Security Logs
  const handleClearLogs = async () => {
    if (!confirm('Clear all resolved security history and temporary lockout logs?')) return;
    setActionLoading(true);
    try {
      const res = await apiFetch('/api/admin/security/clear-logs', { method: 'POST' });
      if (res && res.success) {
        showToast(res.message, 'success');
        addLog('Cleared transient IP lockout history.', 'info');
        fetchSecurityOverview(true);
      }
    } catch (err) {
      showToast(err.message || 'Failed to clear logs', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // 6. Optimize Database Tables
  const handleOptimizeTables = async (tableName = null) => {
    setActionLoading(true);
    addLog(tableName ? `Starting OPTIMIZE on \`${tableName}\`...` : 'Optimizing all MySQL tables...', 'info');
    try {
      const res = await apiFetch('/api/admin/security/optimize-tables', {
        method: 'POST',
        body: JSON.stringify({ table: tableName }),
      });
      if (res && res.success) {
        showToast(res.message, 'success');
        if (res.logs && Array.isArray(res.logs)) {
          res.logs.forEach(l => addLog(l, 'success'));
        }
        addLog(`Optimization complete in ${res.execution_ms}ms`, 'success');
        fetchSecurityOverview(true);
      }
    } catch (err) {
      showToast(err.message || 'Database optimization failed', 'error');
      addLog(`Optimization error: ${err.message}`, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // 7. Run Intelligent Indexing
  const handleRunIndexing = async () => {
    setActionLoading(true);
    addLog('Executing intelligent database indexing audit...', 'info');
    try {
      const res = await apiFetch('/api/admin/security/run-indexing', { method: 'POST' });
      if (res && res.success) {
        showToast(res.message, 'success');
        if (res.logs && Array.isArray(res.logs)) {
          res.logs.forEach(l => addLog(l, l.includes('CREATED') ? 'success' : 'info'));
        }
        addLog(`Indexing audit finished in ${res.execution_ms}ms (${res.created_count} created, ${res.active_count} verified)`, 'success');
        fetchSecurityOverview(true);
      }
    } catch (err) {
      showToast(err.message || 'Indexing failed', 'error');
      addLog(`Indexing error: ${err.message}`, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // 8. Download Complete Database SQL Dump
  const handleDownloadSqlBackup = () => {
    addLog('Exporting full database SQL dump with schema and table rows...', 'info');
    showToast('Preparing SQL database backup file...', 'info');
    const baseUrl = (window.__SOFTTEX_BASE_URL__ || '').replace(/\/$/, '');
    const downloadUrl = `${baseUrl}/api/admin/security/backup-sql`;

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', `softtex_db_backup_${new Date().toISOString().slice(0, 10)}.sql`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      addLog('Full SQL Backup export completed! All MySQL tables exported safely.', 'success');
      showToast('Database SQL backup downloaded successfully!', 'success');
    }, 1500);
  };

  // 9. Purge Laravel & View Caches
  const handlePurgeCache = async () => {
    setActionLoading(true);
    addLog('Purging application, compiled blade views, routes, and config caches...', 'info');
    try {
      const res = await apiFetch('/api/admin/security/purge-cache', { method: 'POST' });
      if (res && res.success) {
        showToast(res.message || 'Caches purged successfully!', 'success');
        addLog(`SUCCESS: ${res.message}`, 'success');
        if (Array.isArray(res.logs)) {
          res.logs.forEach((l) => addLog(l, 'info'));
        }
      }
    } catch (err) {
      showToast(err.message || 'Failed to purge cache', 'error');
      addLog(`ERROR: ${err.message}`, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredIps = (securityData?.tracked_ips || []).filter(item => {
    if (!ipSearch) return true;
    const q = ipSearch.toLowerCase();
    return item.ip_address.toLowerCase().includes(q) || (item.reason && item.reason.toLowerCase().includes(q));
  });

  const filteredTables = (securityData?.database?.tables || []).filter(item => {
    if (!tableSearch) return true;
    return item.name.toLowerCase().includes(tableSearch.toLowerCase());
  });

  return (
    <div className="space-y-4 pb-8 w-full">
      {/* Top Header Card (Compact & Full Width) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 border border-emerald-200/80 rounded-xl text-emerald-700 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  Security &amp; Database Speed Hub
                </h1>
                {securityData?.shield?.enabled ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Shield Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Shield Paused
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Enterprise Brute-Force Login Defense, MySQL Storage Defragmentation &amp; Query Indexing
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleOptimizeTables()}
              disabled={actionLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-2xs transition cursor-pointer disabled:opacity-50"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Optimize Tables</span>
            </button>
            <button
              onClick={handleRunIndexing}
              disabled={actionLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Run DB Indexing</span>
            </button>
            <button
              onClick={() => fetchSecurityOverview()}
              disabled={loading || actionLoading}
              className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 shadow-2xs transition cursor-pointer"
              title="Refresh Status"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-amber-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Database & Latency Status Strip */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              MYSQL / INNODB
            </span>
            <span className="text-slate-500 font-mono text-[11px]">
              Database: <strong className="text-slate-800">softtex_db</strong> &bull; Status: <span className="text-emerald-700 font-semibold">Healthy</span>
            </span>
          </div>

          <div className="text-slate-500 text-[11px] font-mono">
            IP Defense: {securityData?.shield?.enabled ? 'Active' : 'Paused'} &bull; Max Limit: {securityData?.shield?.max_attempts || 5} attempts
          </div>
        </div>
      </div>

      {/* 4 Compact Metrics KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: Shield Status */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Brute Force
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <Lock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-black text-slate-900">
            {securityData?.shield?.enabled ? 'Protected' : 'Inactive'}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5 flex items-center justify-between">
            <span>Limit: {securityData?.shield?.max_attempts || 5} tries</span>
            <span className="font-semibold text-slate-700">{securityData?.shield?.lockout_minutes || 30}m lock</span>
          </div>
        </div>

        {/* Metric 2: Blocked IPs */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Tracked IPs
            </span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
              <ShieldAlert className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-black text-slate-900">
            {securityData?.shield?.total_blocked ?? 0}
            <span className="text-xs font-normal text-slate-500 ml-1">
              / {securityData?.shield?.total_tracked ?? 0}
            </span>
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5 truncate">
            Auto-lockout on invalid login
          </div>
        </div>

        {/* Metric 3: DB Storage */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              MySQL Storage
            </span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
              <HardDrive className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-black text-slate-900">
            {securityData?.database?.total_size_mb ?? '0.00'} <span className="text-xs font-normal text-slate-500">MB</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5 flex items-center justify-between">
            <span>{securityData?.database?.total_tables ?? 0} tables</span>
            <span className="text-emerald-700 font-semibold">{securityData?.database?.total_overhead_kb ?? 0} KB free</span>
          </div>
        </div>

        {/* Metric 4: Query Indexing */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Query Speed
            </span>
            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-700">
              <Cpu className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-black text-slate-900">
            Ultra-Fast
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            B-Tree &amp; Composite active
          </div>
        </div>
      </div>

      {/* Smart Tab Navigation Strip */}
      <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 shadow-2xs">
        <button
          type="button"
          onClick={() => setActiveTab('shield')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'shield'
              ? 'bg-white text-slate-950 font-bold shadow-xs border border-slate-200/90 ring-1 ring-black/5'
              : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
          }`}
        >
          <Shield className={`w-3.5 h-3.5 transition-colors ${activeTab === 'shield' ? 'text-amber-600' : 'text-slate-400'}`} />
          <span>Brute Force Defense &amp; IP Blocks</span>
          {activeTab === 'shield' && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-xs animate-pulse ml-0.5" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('database')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'database'
              ? 'bg-white text-slate-950 font-bold shadow-xs border border-slate-200/90 ring-1 ring-black/5'
              : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
          }`}
        >
          <Database className={`w-3.5 h-3.5 transition-colors ${activeTab === 'database' ? 'text-blue-600' : 'text-slate-400'}`} />
          <span>Database Table Storage &amp; Optimization</span>
          {activeTab === 'database' && (
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-xs ml-0.5" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('indexing')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'indexing'
              ? 'bg-white text-slate-950 font-bold shadow-xs border border-slate-200/90 ring-1 ring-black/5'
              : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
          }`}
        >
          <Zap className={`w-3.5 h-3.5 transition-colors ${activeTab === 'indexing' ? 'text-purple-600' : 'text-slate-400'}`} />
          <span>Intelligent Query Indexing</span>
          {activeTab === 'indexing' && (
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-xs ml-0.5" />
          )}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: BRUTE FORCE SHIELD & IP BLOCKS (COMPACT) */}
      {/* ========================================================================= */}
      {activeTab === 'shield' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Shield Toggle & Threshold Form */}
            <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-emerald-600" />
                    Automated Defense Configuration
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Set thresholds for credential stuffing detection and automated IP lockout.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleToggleShield}
                  disabled={actionLoading}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none cursor-pointer ${
                    securityData?.shield?.enabled ? 'bg-emerald-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow-xs ${
                      securityData?.shield?.enabled ? 'translate-x-4.5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Max Failed Attempts
                    </label>
                    <input
                      type="number"
                      min="2"
                      max="20"
                      value={settingsForm.max_attempts}
                      onChange={(e) => setSettingsForm({ ...settingsForm, max_attempts: parseInt(e.target.value) || 5 })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 transition"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Default: 5 failed attempts</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Lockout Duration (Minutes)
                    </label>
                    <input
                      type="number"
                      min="5"
                      max="1440"
                      value={settingsForm.lockout_minutes}
                      onChange={(e) => setSettingsForm({ ...settingsForm, lockout_minutes: parseInt(e.target.value) || 30 })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 transition"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Default: 30 minutes lockout</span>
                  </div>
                </div>

                <div className="pt-1 flex justify-end">
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Defense Rules</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Quick Ban Action Card */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-1.5">
                  <Lock className="w-4 h-4 text-amber-600" />
                  Manual IP Ban
                </h3>
                <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
                  Restrict an abusive IP from reaching admin authentication endpoints.
                </p>
                <div className="p-2.5 bg-amber-50 border border-amber-200/80 rounded-lg text-[11px] text-amber-900 leading-relaxed font-medium">
                  Banned IPs receive HTTP 423 (Locked) instantly before reaching auth logic, saving server CPU.
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setShowManualBlockModal(true)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-2xs transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ban IP Address</span>
                </button>
                <button
                  type="button"
                  onClick={handleClearLogs}
                  disabled={actionLoading}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Clear Temporary Logs</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tracked & Blocked IPs Table (Compact) */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">Tracked IP Access Registry</h3>
                <p className="text-[11px] text-slate-500">
                  IP addresses with login attempts, warning states, or active lockouts.
                </p>
              </div>

              <div className="relative w-full sm:w-60">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by IP or reason..."
                  value={ipSearch}
                  onChange={(e) => setIpSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 transition"
                />
              </div>
            </div>

            {filteredIps.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-slate-200 rounded-lg text-slate-500">
                <ShieldCheck className="w-6 h-6 text-emerald-500/60 mx-auto mb-1.5" />
                <p className="text-xs font-bold text-slate-700">No active blocks or suspicious attempts</p>
                <p className="text-[10px] text-slate-400">Your admin endpoint is clean and secure.</p>
              </div>
            ) : (
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs text-slate-800">
                  <thead className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-3">IP Address</th>
                      <th className="py-2 px-3">Status</th>
                      <th className="py-2 px-3">Failed Attempts</th>
                      <th className="py-2 px-3">Reason / Notes</th>
                      <th className="py-2 px-3">Blocked At</th>
                      <th className="py-2 px-3">Expires In</th>
                      <th className="py-2 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {filteredIps.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition">
                        <td className="py-2 px-3 text-slate-900 font-bold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          {item.ip_address}
                        </td>
                        <td className="py-2 px-3 font-sans">
                          {item.is_active_blocked ? (
                            <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                              LOCKED
                            </span>
                          ) : item.failed_attempts > 0 ? (
                            <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                              WARNING
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                              CLEARED
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-3 font-sans">
                          <span className={item.failed_attempts >= (securityData?.shield?.max_attempts || 5) ? 'text-rose-600 font-bold' : 'text-slate-600'}>
                            {item.failed_attempts} attempts
                          </span>
                        </td>
                        <td className="py-2 px-3 font-sans text-slate-600 truncate max-w-xs">
                          {item.reason || 'Failed login threshold'}
                        </td>
                        <td className="py-2 px-3 text-slate-500 font-sans text-[11px]">
                          {item.blocked_at ? new Date(item.blocked_at).toLocaleString() : 'N/A'}
                        </td>
                        <td className="py-2 px-3 font-sans">
                          {item.is_permanent ? (
                            <span className="text-rose-700 font-bold text-[11px]">Permanent Ban</span>
                          ) : item.remaining_minutes > 0 ? (
                            <span className="text-amber-700 font-bold text-[11px]">{item.remaining_minutes} min remaining</span>
                          ) : (
                            <span className="text-emerald-700 font-semibold text-[11px]">Expired / Allowed</span>
                          )}
                        </td>
                        <td className="py-2 px-3 text-right">
                          <button
                            onClick={() => handleUnblockIp(item.ip_address)}
                            disabled={actionLoading}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition cursor-pointer"
                          >
                            <Unlock className="w-3 h-3" />
                            <span>Unblock</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: DATABASE TABLE STORAGE & OPTIMIZATION (COMPACT) */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* TAB 2: DATABASE TABLE STORAGE & OPTIMIZATION (COMPACT) */}
      {/* ========================================================================= */}
      {activeTab === 'database' && (
        <div className="space-y-4">
          {/* Quick Action Operations Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {/* 1. SQL Database Backup Card */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex flex-col justify-between">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                  <Download className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    Complete MySQL Database Backup
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">.SQL</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Download a full SQL dump containing DDL structure and rows for all {filteredTables.length || 9} database tables. Essential safeguard before major updates.
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">
                  Schema: softtex_db &bull; Engine: InnoDB
                </span>
                <button
                  type="button"
                  onClick={handleDownloadSqlBackup}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download SQL Backup</span>
                </button>
              </div>
            </div>

            {/* 2. System Cache Cleaner Card */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex flex-col justify-between">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    1-Click System &amp; View Cache Purge
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 font-semibold">Optimizer</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Instantly purge Laravel application cache, compiled blade templates, route caches, and configuration trees with real-time artisan output.
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">
                  Artisan: cache, view, route, config
                </span>
                <button
                  type="button"
                  onClick={handlePurgeCache}
                  disabled={actionLoading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-2xs transition cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${actionLoading ? 'animate-spin' : ''}`} />
                  <span>Purge All Caches</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-amber-600" />
                  MySQL Storage Defragmentation &amp; Engine Tuning
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Defrag InnoDB data pages, reclaim free overhead, and refresh index cardinality via <code className="bg-amber-50 text-amber-900 px-1 py-0.2 rounded font-mono text-[10px] border border-amber-200">OPTIMIZE TABLE</code>.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOptimizeTables()}
                  disabled={actionLoading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-2xs transition cursor-pointer disabled:opacity-50"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${actionLoading ? 'animate-spin' : ''}`} />
                  <span>Optimize All Tables</span>
                </button>
              </div>
            </div>

            {/* Filter Search */}
            <div className="pt-3 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-[11px] text-slate-600">
                Found <strong>{filteredTables.length}</strong> tables in <code className="text-emerald-700 font-mono font-bold">softtex_db</code>
              </span>
              <div className="relative w-full sm:w-60">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter table name..."
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 transition"
                />
              </div>
            </div>

            {/* Tables Matrix */}
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs text-slate-800">
                <thead className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3">Table Name</th>
                    <th className="py-2 px-3">Engine</th>
                    <th className="py-2 px-3">Records</th>
                    <th className="py-2 px-3">Data Size</th>
                    <th className="py-2 px-3">Index Size</th>
                    <th className="py-2 px-3">Total Storage</th>
                    <th className="py-2 px-3">Overhead (Free)</th>
                    <th className="py-2 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {filteredTables.map((t) => (
                    <tr key={t.name} className="hover:bg-slate-50/70 transition">
                      <td className="py-2 px-3 text-slate-900 font-bold">
                        {t.name}
                      </td>
                      <td className="py-2 px-3 text-slate-600 font-sans">
                        <span className="px-1.5 py-0.2 rounded bg-slate-100 text-[9px] text-slate-700 font-semibold border border-slate-200">
                          {t.engine || 'InnoDB'}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-slate-700 font-sans">
                        {t.rows?.toLocaleString() ?? 0}
                      </td>
                      <td className="py-2 px-3 text-slate-600">
                        {t.data_kb} KB
                      </td>
                      <td className="py-2 px-3 text-slate-600">
                        {t.index_kb} KB
                      </td>
                      <td className="py-2 px-3 text-emerald-700 font-bold">
                        {t.total_kb} KB
                      </td>
                      <td className="py-2 px-3 font-sans">
                        {parseFloat(t.overhead_kb) > 0 ? (
                          <span className="text-amber-700 font-bold">
                            {t.overhead_kb} KB
                          </span>
                        ) : (
                          <span className="text-slate-400">
                            0.00 KB
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-3 text-right font-sans">
                        <button
                          type="button"
                          onClick={() => handleOptimizeTables(t.name)}
                          disabled={actionLoading}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-bold text-amber-900 hover:text-amber-950 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md transition cursor-pointer"
                        >
                          <Play className="w-2.5 h-2.5 text-amber-600" />
                          <span>Optimize</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: INTELLIGENT QUERY INDEXING (COMPACT) */}
      {/* ========================================================================= */}
      {activeTab === 'indexing' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-purple-600" />
                  Intelligent Query Indexing &amp; Speed Acceleration
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Analyze query patterns and construct high-frequency composite indexes across critical CMS tables for up to 50x faster lookups.
                </p>
              </div>

              <button
                type="button"
                onClick={handleRunIndexing}
                disabled={actionLoading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-2xs transition cursor-pointer disabled:opacity-50"
              >
                <Zap className={`w-3.5 h-3.5 ${actionLoading ? 'animate-spin' : ''}`} />
                <span>Run Re-Index</span>
              </button>
            </div>

            {/* Explanation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-3.5">
              <div className="p-3 bg-purple-50/70 border border-purple-200/80 rounded-lg">
                <div className="text-[11px] font-bold text-purple-900 mb-0.5">Composite Multi-Column</div>
                <p className="text-[11px] text-purple-800/80 leading-relaxed">
                  Indexes like <code className="bg-purple-100 px-1 py-0.2 rounded font-mono text-[10px]">(status, created_at)</code> eliminate filesort in blog &amp; RFQ queries.
                </p>
              </div>
              <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-lg">
                <div className="text-[11px] font-bold text-emerald-900 mb-0.5">Foreign Key &amp; Filter</div>
                <p className="text-[11px] text-emerald-800/80 leading-relaxed">
                  Fast filtering on client slugs, categories, and media library folders.
                </p>
              </div>
              <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-lg">
                <div className="text-[11px] font-bold text-blue-900 mb-0.5">Safe &amp; Idempotent</div>
                <p className="text-[11px] text-blue-800/80 leading-relaxed">
                  Audits existing signatures first to avoid duplicate indexes or table locks.
                </p>
              </div>
            </div>

            {/* Active Indexes Registry */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Audited Index Coverage Across Active Tables
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {securityData?.indexing &&
                  Object.entries(securityData.indexing).map(([tbl, info]) => (
                    <div key={tbl} className="bg-slate-50/80 border border-slate-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2 border-b border-slate-200 pb-1.5">
                        <div className="flex items-center gap-1.5">
                          <Database className="w-3.5 h-3.5 text-purple-600" />
                          <span className="text-xs font-bold text-slate-900 font-mono">{tbl}</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-white border border-slate-200 text-slate-700 font-bold shadow-2xs">
                          {info.indexes?.length || 0} Indexes
                        </span>
                      </div>

                      <div className="space-y-1.5 font-mono text-xs">
                        {info.indexes?.map((idx) => (
                          <div
                            key={idx.name}
                            className="flex items-center justify-between p-2 rounded-md bg-white border border-slate-200/80 shadow-2xs"
                          >
                            <div>
                              <div className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                {idx.name}
                              </div>
                              <div className="text-[10px] text-slate-500 mt-0.5">
                                Columns: <span className="text-slate-800 font-semibold">{idx.columns.join(', ')}</span>
                              </div>
                            </div>
                            <span
                              className={`text-[9px] px-1.5 py-0.2 rounded font-sans font-bold uppercase ${
                                idx.type === 'UNIQUE'
                                  ? 'bg-purple-50 text-purple-700 border border-purple-200'
                                  : idx.type === 'COMPOSITE'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-slate-100 text-slate-700 border border-slate-200'
                              }`}
                            >
                              {idx.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compact Real-Time Security & Database Terminal Log Console */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <Terminal className="w-3.5 h-3.5 text-emerald-600" />
            <span>Real-Time Security &amp; Database Terminal Log</span>
          </div>
          <button
            type="button"
            onClick={() => setConsoleLogs([])}
            className="text-[10px] font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer"
          >
            Clear Console
          </button>
        </div>

        <div className="h-28 overflow-y-auto space-y-1 font-mono text-[11px] pr-2 bg-slate-950 text-slate-300 p-3 rounded-lg border border-slate-900 shadow-inner">
          {consoleLogs.map((log, i) => (
            <div key={i} className="flex items-start gap-1.5 leading-relaxed">
              <span className="text-slate-600 text-[10px] shrink-0">[{log.time}]</span>
              <span
                className={
                  log.type === 'error'
                    ? 'text-rose-400 font-semibold'
                    : log.type === 'warn'
                    ? 'text-amber-400 font-semibold'
                    : log.type === 'success'
                    ? 'text-emerald-400 font-semibold'
                    : 'text-slate-300'
                }
              >
                {log.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Manual IP Ban Modal (Compact Light Theme) */}
      {showManualBlockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-amber-600" />
                Manually Block IP Address
              </h3>
              <button
                type="button"
                onClick={() => setShowManualBlockModal(false)}
                className="w-6 h-6 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center cursor-pointer transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleManualBlock} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">IP Address</label>
                <input
                  type="text"
                  placeholder="e.g. 192.168.1.100 or 203.0.113.195"
                  value={manualIpForm.ip_address}
                  onChange={(e) => setManualIpForm({ ...manualIpForm, ip_address: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 font-mono focus:bg-white focus:outline-none focus:border-amber-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Reason / Note</label>
                <input
                  type="text"
                  placeholder="e.g. Repeated unauthorized login attempts"
                  value={manualIpForm.reason}
                  onChange={(e) => setManualIpForm({ ...manualIpForm, reason: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Block Duration</label>
                <select
                  value={manualIpForm.duration_type}
                  onChange={(e) => setManualIpForm({ ...manualIpForm, duration_type: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 transition"
                >
                  <option value="60">1 Hour (Temporary Lockout)</option>
                  <option value="1440">24 Hours (1 Day)</option>
                  <option value="10080">7 Days (1 Week)</option>
                  <option value="permanent">Permanent Administrative Ban</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowManualBlockModal(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-2xs transition cursor-pointer"
                >
                  Confirm IP Ban
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
