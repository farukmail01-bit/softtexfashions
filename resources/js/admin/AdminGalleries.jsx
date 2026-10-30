import React, { useState, useEffect, useMemo } from 'react';
import { useAdmin } from './AdminContext';
import { assetUrl } from '../utils/asset';
import MediaPickerModal from './MediaPickerModal';
import {
  Image,
  Plus,
  Trash2,
  Edit3,
  Filter,
  Layers,
  ExternalLink,
  Sparkles,
  X,
  CheckCircle,
  UploadCloud,
  Loader2,
  RefreshCw,
  Search,
} from 'lucide-react';

export default function AdminGalleries() {
  const { apiFetch, showToast } = useAdmin();
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [syncingCatalog, setSyncingCatalog] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState('new'); // 'new' | 'edit'

  const [newItem, setNewItem] = useState({
    client_slug: 'us-polo',
    title: '',
    image_url: '',
    category: 'Polo & Tees',
    gsm: '220 - 240',
    moq: '500 Pcs',
    order: 0,
    is_active: true,
  });
  const [saving, setSaving] = useState(false);

  const clients = [
    { slug: 'all', name: 'All Brands & Categories' },
    { slug: 'us-polo', name: 'U.S. Polo Assn.' },
    { slug: 'rich-cotton', name: 'Rich Cotton' },
    { slug: 'mens', name: 'Mens Collection' },
    { slug: 'womens', name: 'Womens Collection' },
    { slug: 'kids', name: 'Kids & Babywear' },
    { slug: 'emart', name: 'Emart' },
    { slug: 'head', name: 'Head Sportswear' },
    { slug: 'tesco', name: 'Tesco F&F' },
    { slug: 'eddiebauer', name: 'Eddie Bauer' },
    { slug: 'forever', name: 'Forever 21' },
    { slug: 'skechers', name: 'Skechers' },
    { slug: 'keithhering', name: 'Keith Hering' },
  ];

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const url =
        selectedClient === 'all'
          ? '/api/admin/galleries'
          : `/api/admin/galleries?client_slug=${selectedClient}`;
      const res = await apiFetch(url);
      if (res && res.galleries) {
        setGalleries(res.galleries);
      }
    } catch (err) {
      showToast(err.message || 'Failed to fetch galleries', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, [selectedClient]);

  const handleSyncCatalog = async () => {
    if (!window.confirm('Sync and update all 162 catalog items with curated accurate style names, categories, GSM, and MOQ?')) {
      return;
    }
    setSyncingCatalog(true);
    try {
      const res = await apiFetch('/api/admin/galleries/sync-all', {
        method: 'POST',
      });
      if (res && res.success) {
        showToast(res.message || 'All catalog styles synchronized successfully!', 'success');
        fetchGalleries();
      }
    } catch (err) {
      showToast(err.message || 'Failed to synchronize catalog items', 'error');
    } finally {
      setSyncingCatalog(false);
    }
  };

  const handleImageFileChange = async (e, target = 'new') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    setUploadingImage(true);

    try {
      const res = await apiFetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (res && res.success && res.url) {
        if (target === 'new') {
          setNewItem((prev) => ({
            ...prev,
            image_url: res.url,
            title: prev.title || file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
          }));
        } else if (target === 'edit') {
          setEditingItem((prev) => ({
            ...prev,
            image_url: res.url,
          }));
        }
        showToast('Image uploaded successfully!', 'success');
      }
    } catch (err) {
      showToast(err.message || 'Image upload failed', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!newItem.image_url) {
      showToast('Image URL or uploaded file is required', 'error');
      return;
    }

    setSaving(true);
    try {
      const res = await apiFetch('/api/admin/galleries', {
        method: 'POST',
        body: JSON.stringify(newItem),
      });

      if (res.success) {
        showToast('Gallery item added successfully!', 'success');
        setShowAddModal(false);
        setNewItem({
          client_slug: 'us-polo',
          title: '',
          image_url: '',
          category: 'Polo & Tees',
          gsm: '220 - 240',
          moq: '500 Pcs',
          order: 0,
          is_active: true,
        });
        fetchGalleries();
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const openEditModal = (item) => {
    setEditingItem({
      id: item.id,
      client_slug: item.client_slug,
      title: item.title || '',
      image_url: item.image_url || '',
      category: item.category || 'Export Apparel',
      gsm: item.gsm || '',
      moq: item.moq || '',
      order: item.order || 0,
      is_active: item.is_active !== undefined ? Boolean(item.is_active) : true,
    });
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingItem || !editingItem.image_url) {
      showToast('Image URL is required', 'error');
      return;
    }

    setSaving(true);
    try {
      const res = await apiFetch('/api/admin/galleries', {
        method: 'POST',
        body: JSON.stringify(editingItem),
      });

      if (res.success) {
        showToast('Gallery item updated successfully!', 'success');
        setEditModalOpen(false);
        setGalleries((prev) =>
          prev.map((g) => (g.id === editingItem.id ? { ...g, ...res.gallery } : g))
        );
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this gallery item?')) return;
    try {
      const res = await apiFetch(`/api/admin/galleries/${id}`, { method: 'DELETE' });
      if (res.success) {
        showToast('Item deleted', 'info');
        setGalleries((prev) => prev.filter((g) => g.id !== id));
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Filtered list based on search query
  const filteredGalleries = useMemo(() => {
    if (!searchQuery.trim()) return galleries;
    const q = searchQuery.toLowerCase().trim();
    return galleries.filter((item) => {
      const matchTitle = item.title && item.title.toLowerCase().includes(q);
      const matchCat = item.category && item.category.toLowerCase().includes(q);
      const matchSlug = item.client_slug && item.client_slug.toLowerCase().includes(q);
      const matchGsm = item.gsm && item.gsm.toLowerCase().includes(q);
      return matchTitle || matchCat || matchSlug || matchGsm;
    });
  }, [galleries, searchQuery]);

  return (
    <div className="space-y-4 w-full pb-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3.5">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Image className="w-5 h-5 text-amber-500" />
            <span>Product Galleries &amp; Portfolios</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage buyer showcase images, style titles, categories, GSM weights, and brand catalog assets.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleSyncCatalog}
            disabled={syncingCatalog}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-300 shadow-2xs transition cursor-pointer disabled:opacity-50"
            title="Populate and synchronize all 162 production styles to database"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-600 ${syncingCatalog ? 'animate-spin' : ''}`} />
            <span>{syncingCatalog ? 'Syncing...' : 'Sync Catalog (162 Styles)'}</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-2xs transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Gallery Item</span>
          </button>
        </div>
      </div>

      {/* Brand Filters Strip & Live Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
        {/* Brand Segmented Pills */}
        <div className="p-1 rounded-2xl bg-slate-100/90 border border-slate-200/80 flex flex-wrap items-center gap-1 shadow-2xs flex-1">
          {clients.map((c) => {
            const isActive = selectedClient === c.slug;
            return (
              <button
                key={c.slug}
                onClick={() => setSelectedClient(c.slug)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-slate-950 font-bold shadow-xs border border-slate-200/90 ring-1 ring-black/5'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
                }`}
              >
                <span>{c.name}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-xs animate-pulse ml-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search styles, GSM..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong className="text-slate-800">{filteredGalleries.length}</strong> styles
          {selectedClient !== 'all' && ` in ${clients.find((c) => c.slug === selectedClient)?.name}`}
        </span>
        <span className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md">
          <span className="font-semibold text-amber-850 mr-1">Tip:</span> Click the <strong>Edit button</strong> on any card to update its title &amp; image
        </span>
      </div>

      {/* Gallery Cards Grid */}
      {loading ? (
        <div className="p-16 text-center text-slate-400">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <span className="text-xs">Loading brand gallery assets...</span>
        </div>
      ) : filteredGalleries.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredGalleries.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:border-amber-400/80 hover:shadow-md transition relative flex flex-col justify-between"
            >
              <div className="aspect-[3/4] bg-slate-50 overflow-hidden relative">
                <img
                  src={assetUrl(item.image_url)}
                  alt={item.title || 'Product'}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/400x500/f8fafc/64748b?text=Garment+Sample';
                  }}
                />

                {/* Card Top Action Overlay */}
                <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1.5 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 transition shadow hover:scale-105 cursor-pointer"
                    title="Edit Style Details"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition shadow hover:scale-105 cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Category Pill Tag */}
                <div className="absolute bottom-2 left-2">
                  <span className="text-[10px] font-semibold bg-slate-950/70 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
                    {item.category || 'Export Apparel'}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-white space-y-1.5 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-900 line-clamp-2 min-h-[32px]" title={item.title}>
                  {item.title || 'Showcase Garment'}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span className="uppercase font-mono text-amber-700 font-bold">
                    {item.client_slug}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">#{item.id}</span>
                </div>
                {(item.gsm || item.moq) && (
                  <div className="flex items-center gap-1.5 pt-1 border-t border-slate-100 flex-wrap">
                    {item.gsm && (
                      <span className="text-[9px] font-semibold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                        {item.gsm}
                      </span>
                    )}
                    {item.moq && (
                      <span className="text-[9px] font-semibold bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded">
                        MOQ: {item.moq}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-16 text-center text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
          <Image className="w-8 h-8 mx-auto mb-2 opacity-30 text-slate-400" />
          <p className="text-sm">No items found matching your filter or search query.</p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <button
              onClick={() => {
                setSelectedClient('all');
                setSearchQuery('');
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition cursor-pointer"
            >
              Reset Filters
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold hover:bg-amber-100 transition cursor-pointer"
            >
              + Add First Showcase Item
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 shadow-xl relative my-8">
            <button
              onClick={() => setEditModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-amber-500" />
              <span>Edit Garment Style #{editingItem.id}</span>
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Update product name, image link, GSM weight, MOQ, and showcase details.
            </p>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              {/* Product Image Preview & Picker */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Garment Image
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMediaPickerTarget('edit');
                      setMediaPickerOpen(true);
                    }}
                    className="text-[11px] font-bold text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5 text-amber-600" />
                    <span>Choose from Media Library</span>
                  </button>
                </div>

                <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50 flex items-center gap-3">
                  <img
                    src={assetUrl(editingItem.image_url)}
                    alt="Preview"
                    className="w-16 h-20 object-cover rounded-lg border border-slate-200 shadow-xs bg-white"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/400x500/f8fafc/64748b?text=Preview';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Direct Image Path / URL:
                    </label>
                    <input
                      type="text"
                      value={editingItem.image_url}
                      onChange={(e) => setEditingItem({ ...editingItem, image_url: e.target.value })}
                      placeholder="images/mens/1.jpg"
                      required
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-900 font-mono focus:outline-none focus:border-amber-500"
                    />
                    <div className="mt-2 flex items-center gap-2">
                      <label className="px-2 py-1 rounded-md bg-slate-200/80 hover:bg-slate-300 text-slate-800 text-[11px] font-semibold cursor-pointer inline-flex items-center gap-1">
                        <UploadCloud className="w-3 h-3" />
                        <span>Upload New Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileChange(e, 'edit')}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title / Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product Style Name (Accurate Garment Title)
                </label>
                <input
                  type="text"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g. Heavyweight Loopback Fleece Hoodie"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white font-medium"
                />
              </div>

              {/* Brand Category & Garment Type */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Brand / Catalog Slug</label>
                  <select
                    value={editingItem.client_slug}
                    onChange={(e) => setEditingItem({ ...editingItem, client_slug: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                  >
                    {clients.filter(c => c.slug !== 'all').map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Garment Category</label>
                  <input
                    type="text"
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    placeholder="Hoodies, Polo Shirts, Denim..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* GSM & MOQ */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">GSM Weight</label>
                  <input
                    type="text"
                    value={editingItem.gsm}
                    onChange={(e) => setEditingItem({ ...editingItem, gsm: e.target.value })}
                    placeholder="e.g. 340 GSM"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Min Order Qty (MOQ)</label>
                  <input
                    type="text"
                    value={editingItem.moq}
                    onChange={(e) => setEditingItem({ ...editingItem, moq: e.target.value })}
                    placeholder="e.g. 1,000 Pcs"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Order & Active Status */}
              <div className="grid grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingItem.order}
                    onChange={(e) => setEditingItem({ ...editingItem, order: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div className="pt-4">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={editingItem.is_active}
                      onChange={(e) => setEditingItem({ ...editingItem, is_active: e.target.checked })}
                      className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                    />
                    <span>Active in Public Showroom</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingImage}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs transition disabled:opacity-50 cursor-pointer"
                >
                  {saving ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 shadow-xl relative my-8">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-1">Add Product Showcase Item</h3>
            <p className="text-xs text-slate-500 mb-5">
              Upload a garment image or enter a path with GSM and MOQ parameters.
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              {/* Direct File Upload Area */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Product Image (File Upload or URL)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMediaPickerTarget('new');
                      setMediaPickerOpen(true);
                    }}
                    className="text-[11px] font-bold text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5 text-amber-600" />
                    <span>Choose from Media Library</span>
                  </button>
                </div>
                <div className="border-2 border-dashed border-slate-200 hover:border-amber-400 rounded-xl p-4 bg-slate-50/50 text-center transition">
                  {newItem.image_url ? (
                    <div className="flex items-center gap-3">
                      <img
                        src={assetUrl(newItem.image_url)}
                        alt="Preview"
                        className="w-16 h-20 object-cover rounded-lg border border-slate-200 shadow-xs"
                      />
                      <div className="text-left flex-1 min-w-0">
                        <div className="text-xs font-semibold text-slate-900 truncate">
                          {newItem.image_url}
                        </div>
                        <span className="text-[10px] text-emerald-600 font-bold inline-flex items-center gap-1 mt-0.5">
                          <CheckCircle className="w-3 h-3" /> Image ready
                        </span>
                      </div>
                      <label className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer">
                        Change
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileChange(e, 'new')}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ) : (
                    <div>
                      {uploadingImage ? (
                        <div className="py-3 flex flex-col items-center gap-2 text-slate-500">
                          <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                          <span className="text-xs font-medium">Uploading image...</span>
                        </div>
                      ) : (
                        <label className="cursor-pointer block py-2">
                          <UploadCloud className="w-8 h-8 text-amber-500 mx-auto mb-1.5" />
                          <div className="text-xs font-bold text-slate-800">
                            Click to browse image or drop file here
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            PNG, JPG, WEBP up to 8MB
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageFileChange(e, 'new')}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-2">
                  <input
                    type="text"
                    value={newItem.image_url}
                    onChange={(e) => setNewItem({ ...newItem, image_url: e.target.value })}
                    placeholder="Or enter direct URL: images/mens/1.jpg"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Buyer / Category</label>
                <select
                  value={newItem.client_slug}
                  onChange={(e) => setNewItem({ ...newItem, client_slug: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                >
                  {clients.filter(c => c.slug !== 'all').map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Item Title / Description</label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  placeholder="e.g. Mens Pique Polo Shirt 100% Combed Cotton"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">GSM Weight</label>
                  <input
                    type="text"
                    value={newItem.gsm}
                    onChange={(e) => setNewItem({ ...newItem, gsm: e.target.value })}
                    placeholder="e.g. 220 - 240 GSM"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Min Order Qty (MOQ)</label>
                  <input
                    type="text"
                    value={newItem.moq}
                    onChange={(e) => setNewItem({ ...newItem, moq: e.target.value })}
                    placeholder="e.g. 500 Pcs"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Garment Category</label>
                  <input
                    type="text"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    placeholder="Polo & Tees"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={newItem.order}
                    onChange={(e) => setNewItem({ ...newItem, order: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingImage}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs transition disabled:opacity-50 cursor-pointer"
                >
                  {saving ? 'Saving...' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* WordPress-Style Global Media Picker Modal */}
      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={(media) => {
          if (mediaPickerTarget === 'edit') {
            setEditingItem((prev) => ({ ...prev, image_url: media.file_url }));
          } else {
            setNewItem((prev) => ({ ...prev, image_url: media.file_url }));
          }
        }}
        title="Select Product Showcase Image"
        buttonText="Use as Product Image"
      />
    </div>
  );
}
