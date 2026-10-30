import React, { useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';
import {
  Inbox,
  Mail,
  Phone,
  Building,
  CheckCircle,
  Clock,
  Eye,
  Search,
  Filter,
  Download,
  Paperclip,
  Send,
  MessageCircle,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export default function AdminInquiries() {
  const { apiFetch, showToast } = useAdmin();
  const [rfqs, setRfqs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('rfqs'); // 'rfqs' | 'messages'
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState('');

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/api/admin/inquiries');
      if (res) {
        const fetchedRfqs = res.rfqs || [];
        const fetchedMsgs = res.messages || [];
        setRfqs(fetchedRfqs);
        setMessages(fetchedMsgs);
        if (fetchedRfqs.length > 0) {
          setSelectedItem(fetchedRfqs[0]);
        } else if (fetchedMsgs.length > 0) {
          setSelectedItem(fetchedMsgs[0]);
        }
      }
    } catch (err) {
      showToast(err.message || 'Failed to fetch inquiries', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleUpdateStatus = async (id, status, type = 'rfq') => {
    try {
      const res = await apiFetch(`/api/admin/inquiries/${id}/status`, {
        method: 'POST',
        body: JSON.stringify({ status, type }),
      });
      if (res.success) {
        showToast('Inquiry status updated', 'success');
        if (type === 'message') {
          setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
        } else {
          setRfqs((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
        }
        if (selectedItem?.id === id) {
          setSelectedItem((prev) => ({ ...prev, status }));
        }
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleUpdateStage = async (id, stage) => {
    try {
      const res = await apiFetch(`/api/admin/inquiries/${id}/stage`, {
        method: 'POST',
        body: JSON.stringify({ stage }),
      });
      if (res.success) {
        showToast(res.message || 'Workflow stage updated', 'success');
        setRfqs((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status_stage: stage, status: res.rfq?.status || r.status } : r))
        );
        if (selectedItem?.id === id) {
          setSelectedItem((prev) => ({
            ...prev,
            status_stage: stage,
            status: res.rfq?.status || prev.status,
          }));
        }
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const currentList = activeTab === 'rfqs' ? rfqs : messages;
  const filteredList = currentList.filter((item) => {
    const q = search.toLowerCase();
    const name = item.buyer_name || item.name || '';
    const email = item.email || '';
    const company = item.company_name || item.company || '';
    const code = item.rfq_code || '';
    const category = item.product_category || item.subject || '';
    return (
      name.toLowerCase().includes(q) ||
      email.toLowerCase().includes(q) ||
      company.toLowerCase().includes(q) ||
      code.toLowerCase().includes(q) ||
      category.toLowerCase().includes(q)
    );
  });

  const baseUrl = (window.__SOFTTEX_BASE_URL__ || window.__SOF値EX_BASE_URL__ || '').replace(/\/$/, '');

  return (
    <div className="space-y-4 w-full pb-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3.5">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Inbox className="w-5 h-5 text-amber-500" />
            <span>Buyer Inquiries &amp; Sourcing Dossiers Hub</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review RFQ tech packs, quotation pricing requests, and direct buyer messages in real time.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Export CSV Button */}
          <a
            href={`${baseUrl}/api/admin/inquiries/export`}
            download
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-2xs"
            title="Download Excel / CSV of all buyer RFQs"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export CSV</span>
          </a>

          {/* Smart Tab switch */}
          <div className="inline-flex p-1 rounded-xl bg-slate-100/90 border border-slate-200/80 shadow-2xs">
            <button
              onClick={() => {
                setActiveTab('rfqs');
                setSelectedItem(rfqs[0] || null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'rfqs'
                  ? 'bg-white text-slate-950 font-bold shadow-xs border border-slate-200/90 ring-1 ring-black/5'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span>Buyer RFQs</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                activeTab === 'rfqs' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200/80 text-slate-600'
              }`}>
                {rfqs.length}
              </span>
              {activeTab === 'rfqs' && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-xs animate-pulse ml-0.5" />
              )}
            </button>
            <button
              onClick={() => {
                setActiveTab('messages');
                setSelectedItem(messages[0] || null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'messages'
                  ? 'bg-white text-slate-950 font-bold shadow-xs border border-slate-200/90 ring-1 ring-black/5'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span>Contact Messages</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                activeTab === 'messages' ? 'bg-blue-100 text-blue-800' : 'bg-slate-200/80 text-slate-600'
              }`}>
                {messages.length}
              </span>
              {activeTab === 'messages' && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-xs ml-0.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Inbox Table + Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inquiries Table (Span 2) */}
        <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          {/* Search bar */}
          <div className="p-4 border-b border-slate-200 flex items-center gap-3">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab === 'rfqs' ? 'RFQs by buyer, brand, code...' : 'messages by name, email...'}`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs font-medium bg-transparent border-none focus:outline-hidden text-slate-900 placeholder:text-slate-400"
            />
          </div>

          {loading ? (
            <div className="p-16 text-center text-slate-400">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-xs">Loading buyer inquiries from MySQL...</p>
            </div>
          ) : filteredList.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Inquiry / Brand</th>
                    <th className="py-3 px-4">Specs &amp; Category</th>
                    <th className="py-3 px-4">Tech Pack</th>
                    <th className="py-3 px-4">Status &amp; Stage</th>
                    <th className="py-3 px-4 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredList.map((item) => {
                    const isSelected = selectedItem?.id === item.id;
                    const buyerName = item.buyer_name || item.name || 'Anonymous';
                    const company = item.company_name || item.company || 'Direct Buyer';
                    const code = item.rfq_code || `STX-${item.id}`;

                    return (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className={`hover:bg-slate-50 cursor-pointer transition ${
                          isSelected ? 'bg-amber-50/60 font-semibold' : ''
                        }`}
                      >
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{buyerName}</div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                            <span className="font-medium text-amber-700">{company}</span>
                            {item.rfq_code && (
                              <span className="font-mono text-[9px] text-slate-400">({code})</span>
                            )}
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="text-slate-800 font-medium">
                            {item.product_category || item.subject || 'Garments'}
                          </div>
                          {item.order_quantity && (
                            <div className="text-[10px] text-slate-500">
                              Qty: <strong className="text-slate-800">{item.order_quantity.toLocaleString()} pcs</strong>
                              {item.target_price ? ` • Price: ${item.target_price}` : ''}
                            </div>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          {item.techpack_path ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                              <Paperclip className="w-3 h-3" />
                              <span>Attached</span>
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-400 font-mono">None</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex flex-col gap-1 items-start">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                item.status === 'reviewed' || item.status === 'read' || item.status === 'closed'
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                  : 'bg-amber-50 text-amber-800 border border-amber-200'
                              }`}
                            >
                              {item.status || 'new'}
                            </span>
                            {item.status_stage && (
                              <span className="text-[9px] font-mono text-slate-500 capitalize">
                                Stage: {item.status_stage}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-right text-slate-400 font-mono text-[10px]">
                          {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recent'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400">
              No inquiries found in this category.
            </div>
          )}
        </div>

        {/* Lead Details Card */}
        {(() => {
          const activeItem = selectedItem || (filteredList.length > 0 ? filteredList[0] : null);
          return (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
              {activeItem ? (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                        Lead Dossier Details
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                        {activeItem.buyer_name || activeItem.name || activeItem.contact_person || 'Direct Buyer'}
                      </h3>
                      {activeItem.rfq_code && (
                        <div className="font-mono text-xs text-amber-700 font-bold">{activeItem.rfq_code}</div>
                      )}
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                          activeItem.status === 'reviewed' || activeItem.status === 'closed'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {activeItem.status || 'pending'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs">
                    {/* Email & 1-Click Send Quote Action */}
                    {activeItem.email && (
                      <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center gap-2 text-slate-800 font-semibold truncate">
                          <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                          <span className="truncate">{activeItem.email}</span>
                        </div>
                        <a
                          href={`mailto:${activeItem.email}?subject=${encodeURIComponent(
                            `SOFTTEX FASHIONS — Quotation & Merchandising Follow-up (${activeItem.rfq_code || 'Inquiry'})`
                          )}&body=${encodeURIComponent(
                            `Dear ${activeItem.buyer_name || activeItem.name || 'Valued Buyer'},\n\nThank you for reaching out to SOFTTEX FASHIONS WEAR LIMITED regarding ${activeItem.product_category || 'apparel manufacturing'}.\n\nReference: ${activeItem.rfq_code || 'Online Inquiry'}\nTarget Quantity: ${activeItem.target_quantity || 'Bulk'}\n\nPlease find our preliminary merchandising feedback and FOB quotation below:\n\nKind regards,\nMerchandising & Sourcing Team\nSOFTTEX FASHIONS WEAR LIMITED\nNikunja-2, Khilkhet, Dhaka, Bangladesh`
                          )}`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold transition shadow-xs shrink-0"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Email Quote</span>
                        </a>
                      </div>
                    )}

                    {/* Phone & 1-Click WhatsApp Button */}
                    {activeItem.phone && (
                      <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center gap-2 text-slate-800 font-semibold">
                          <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>{activeItem.phone}</span>
                        </div>
                        <a
                          href={`https://wa.me/${activeItem.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hello ${activeItem.buyer_name || activeItem.name}, thank you for contacting Softtex Fashions Wear Ltd regarding RFQ #${activeItem.rfq_code || ''} for ${activeItem.product_category || 'garments'}. Our merchandising desk is ready to assist you.`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition shadow-xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Chat WhatsApp</span>
                        </a>
                      </div>
                    )}

                    {/* Company / Country */}
                    {(activeItem.company_name || activeItem.company || activeItem.country) && (
                      <div className="flex items-center gap-2.5 text-slate-700">
                        <Building className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>
                          {activeItem.company_name || activeItem.company || 'Direct Buyer'}
                          {activeItem.country ? ` • ${activeItem.country}` : ''}
                        </span>
                      </div>
                    )}

                    {/* Target Order Specs */}
                    {activeItem.order_quantity && (
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <div className="text-[10px] uppercase font-semibold text-slate-500">
                          Target Production Order
                        </div>
                        <div className="text-sm font-bold text-slate-900">
                          {activeItem.product_category} &mdash;{' '}
                          <span className="text-amber-700">{activeItem.order_quantity.toLocaleString()} pcs</span>
                        </div>
                        {activeItem.target_price && (
                          <div className="text-xs text-slate-600 font-medium">
                            Target Unit Price: <strong className="text-emerald-700">{activeItem.target_price}</strong>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Attached Tech Pack Document */}
                    {activeItem.techpack_path && (
                      <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 space-y-2">
                        <div className="text-[10px] uppercase font-bold text-blue-800 flex items-center gap-1.5">
                          <Paperclip className="w-3.5 h-3.5 text-blue-600" />
                          <span>Attached Tech Pack / Spec Sheet</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-800 truncate max-w-[180px]">
                            {activeItem.techpack_name || 'TechPack_Document'}
                          </span>
                          <a
                            href={`${baseUrl}/${activeItem.techpack_path}`}
                            target="_blank"
                            rel="noreferrer"
                            download
                            className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shadow-xs transition"
                          >
                            Download &darr;
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Specifications / Message */}
                    <div className="space-y-1 pt-1">
                      <div className="text-[11px] font-semibold text-slate-500">Technical Specifications &amp; Notes:</div>
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 leading-relaxed text-xs max-h-36 overflow-y-auto">
                        {activeItem.specifications || activeItem.message || 'No additional notes provided.'}
                      </div>
                    </div>

                    {/* Advance Workflow Stage */}
                    {activeTab === 'rfqs' && (
                      <div className="pt-2">
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">
                          Workflow Pipeline Stage
                        </label>
                        <select
                          value={activeItem.status_stage || 'received'}
                          onChange={(e) => handleUpdateStage(activeItem.id, e.target.value)}
                          className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-amber-500"
                        >
                          <option value="received">1. Dossier Received</option>
                          <option value="costing">2. Costing &amp; Fabric Yield</option>
                          <option value="sampling">3. Proto Sampling Developed</option>
                          <option value="quoted">4. Official FOB Offer Sent</option>
                          <option value="closed">5. Purchase Order Confirmed</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Status Action Buttons */}
                  <div className="pt-4 border-t border-slate-100 flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateStatus(
                          activeItem.id,
                          activeItem.status === 'reviewed' ? 'pending' : 'reviewed',
                          activeTab === 'messages' ? 'message' : 'rfq'
                        )
                      }
                      className="flex-1 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>
                        {activeItem.status === 'reviewed' ? 'Mark as Pending' : 'Mark as Reviewed'}
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center text-slate-400">
                  <Inbox className="w-8 h-8 mx-auto mb-2 opacity-30 text-slate-400" />
                  <p className="text-xs">Click on any inquiry from the left table to inspect details.</p>
                </div>
              )}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
