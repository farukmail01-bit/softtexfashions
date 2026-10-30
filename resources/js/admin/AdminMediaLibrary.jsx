import React, { useState, useEffect, useRef } from 'react';
import { useAdmin } from './AdminContext';
import {
  UploadCloud,
  Image as ImageIcon,
  Search,
  Check,
  X,
  Trash2,
  Copy,
  ExternalLink,
  Filter,
  RefreshCw,
  Folder,
  Layers,
  Sparkles,
  Grid,
  List,
  Save,
  CheckCircle,
  FileText
} from 'lucide-react';

export default function AdminMediaLibrary() {
  const { apiFetch, showToast } = useAdmin();
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  
  // Selected detail modal/drawer
  const [selectedItem, setSelectedItem] = useState(null);
  const [savingDetail, setSavingDetail] = useState(false);

  // Uploader toggle
  const [showUploadZone, setShowUploadZone] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const fileInputRef = useRef(null);

  // Fetch Media List
  const fetchMedia = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (selectedFolder !== 'all') params.append('folder', selectedFolder);
      if (selectedType !== 'all') params.append('type', selectedType);
      params.append('per_page', '100');

      const res = await apiFetch(`/api/admin/media?${params.toString()}`);
      if (res && res.media) {
        setMediaList(res.media);
      }
    } catch (err) {
      showToast(err.message || 'Failed to fetch media assets', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [search, selectedFolder, selectedType]);

  // Handle Multi-file Upload
  const handleUpload = async (files) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadProgress(`Uploading ${files.length} file(s)...`);

    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files[]', files[i]);
      }

      const res = await apiFetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.success) {
        showToast(res.message || 'Media uploaded successfully!', 'success');
        setShowUploadZone(false);
        await fetchMedia();
      }
    } catch (err) {
      showToast(err.message || 'Upload failed', 'error');
    } finally {
      setUploading(false);
      setUploadProgress('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Re-scan server images
  const handleScanExisting = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/api/admin/media/scan', { method: 'POST' });
      if (res.success) {
        showToast(res.message, 'success');
        await fetchMedia();
      }
    } catch (err) {
      showToast(err.message || 'Scan failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Update Detail (Alt text, Caption)
  const handleSaveDetails = async (e) => {
    e.preventDefault();
    if (!selectedItem) return;

    setSavingDetail(true);
    try {
      const res = await apiFetch(`/api/admin/media/${selectedItem.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          alt_text: selectedItem.alt_text,
          caption: selectedItem.caption,
          original_name: selectedItem.original_name,
        }),
      });

      if (res.success) {
        showToast('Media details updated successfully!', 'success');
        setMediaList((prev) =>
          prev.map((m) => (m.id === selectedItem.id ? res.media : m))
        );
      }
    } catch (err) {
      showToast(err.message || 'Failed to update details', 'error');
    } finally {
      setSavingDetail(false);
    }
  };

  // Delete Media Item
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this media file permanently? This cannot be undone.')) return;
    try {
      const res = await apiFetch(`/api/admin/media/${id}`, { method: 'DELETE' });
      if (res.success) {
        showToast('Media item deleted.', 'success');
        setMediaList((prev) => prev.filter((m) => m.id !== id));
        if (selectedItem?.id === id) {
          setSelectedItem(null);
        }
      }
    } catch (err) {
      showToast(err.message || 'Failed to delete file', 'error');
    }
  };

  // Copy Direct Link
  const copyLink = (url) => {
    navigator.clipboard.writeText(url);
    showToast('Direct image URL copied to clipboard!', 'info');
  };

  return (
    <div className="space-y-4 w-full pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3.5">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-500" />
            <span>WordPress-Style Global Media Library</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Centralized media asset vault for all product catalogs, blog articles, buyer tech packs, and brand certifications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleScanExisting}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-2xs transition cursor-pointer"
            title="Scan public/images folder and index newly added files"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Sync Assets</span>
          </button>

          <button
            type="button"
            onClick={() => setShowUploadZone(!showUploadZone)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-2xs transition cursor-pointer"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>{showUploadZone ? 'Close Uploader' : 'Add New Media'}</span>
          </button>
        </div>
      </div>

      {/* Collapsible Drag-and-Drop Uploader */}
      {showUploadZone && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleUpload(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-amber-500 bg-amber-50/20 hover:bg-amber-50/40 rounded-3xl p-10 text-center transition cursor-pointer flex flex-col items-center justify-center space-y-3 shadow-xs"
        >
          <input
            type="file"
            multiple
            ref={fileInputRef}
            accept="image/*,.pdf"
            onChange={(e) => handleUpload(e.target.files)}
            className="hidden"
          />

          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <UploadCloud className="w-7 h-7" />
          </div>

          <div>
            <span className="font-bold text-slate-900 block text-sm">
              Drag &amp; Drop media files here or click to browse
            </span>
            <span className="text-xs text-slate-400">
              Supports JPG, PNG, WebP, SVG, and PDF documents (Max 20MB per file)
            </span>
          </div>

          <button
            type="button"
            disabled={uploading}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs pointer-events-none"
          >
            {uploading ? uploadProgress : 'Browse from Computer'}
          </button>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="p-3.5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          {/* Search */}
          <div className="relative min-w-[240px] flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by file name or alt text..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Folder Filter */}
          <select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Folders ({mediaList.length})</option>
            <option value="uploads">Uploads</option>
            <option value="products_mens">Mens Collection</option>
            <option value="products_polo">Polo Shirts</option>
            <option value="products_streetwear">Streetwear &amp; Hoodies</option>
            <option value="products_activewear">Activewear</option>
            <option value="products_woven">Denim &amp; Woven</option>
            <option value="products_kids">Kids &amp; Infant</option>
            <option value="buyer_brands">Buyer Brand Logos</option>
            <option value="certifications">Compliance &amp; Audits</option>
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Media Types</option>
            <option value="image">Images (JPG, PNG, WebP)</option>
            <option value="document">Documents (PDF)</option>
          </select>
        </div>

        {/* View Layout Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg transition cursor-pointer ${
              viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
            title="Grid View"
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-lg transition cursor-pointer ${
              viewMode === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content: Grid / List View */}
      {loading ? (
        <div className="py-24 text-center text-slate-400">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs">Loading media repository...</p>
        </div>
      ) : mediaList.length === 0 ? (
        <div className="py-20 text-center text-slate-400 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <ImageIcon className="w-12 h-12 mx-auto text-slate-300" />
          <h3 className="text-base font-bold text-slate-900">No media assets found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Upload images from your computer or click "Sync Server Assets" to index existing catalog photos.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mediaList.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group bg-white rounded-2xl border border-slate-200/90 hover:border-amber-500 hover:shadow-md transition overflow-hidden cursor-pointer flex flex-col justify-between"
            >
              <div className="aspect-square bg-slate-100 overflow-hidden relative flex items-center justify-center">
                <img
                  src={item.file_url}
                  alt={item.alt_text || item.original_name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-200"
                  loading="lazy"
                />
                <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded-md bg-slate-950/75 text-white font-mono text-[9px] backdrop-blur-xs">
                  {item.formatted_size}
                </span>
              </div>

              <div className="p-2.5">
                <p className="font-bold text-xs text-slate-900 truncate" title={item.original_name}>
                  {item.original_name}
                </p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                  {item.dimensions || item.folder}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* LIST TABLE VIEW */
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Preview</th>
                <th className="py-3 px-4">File Name</th>
                <th className="py-3 px-4">Folder / Tag</th>
                <th className="py-3 px-4">Dimensions</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mediaList.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="hover:bg-slate-50/80 transition cursor-pointer"
                >
                  <td className="py-2.5 px-4">
                    <img
                      src={item.file_url}
                      alt=""
                      className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                    />
                  </td>
                  <td className="py-2.5 px-4 font-bold text-slate-900 max-w-xs truncate">
                    {item.original_name}
                  </td>
                  <td className="py-2.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 font-mono text-[10px] text-slate-600">
                      {item.folder}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 font-mono text-slate-500">
                    {item.dimensions}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-slate-500">
                    {item.formatted_size}
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyLink(item.file_url);
                      }}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800"
                      title="Copy URL"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* WordPress-Style Attachment Details Modal / Drawer */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-600 tracking-wider">
                  Attachment Details
                </span>
                <h3 className="text-base font-black text-slate-900 truncate max-w-md">
                  {selectedItem.original_name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-res Image Preview */}
            <div className="aspect-video w-full rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center relative">
              <img
                src={selectedItem.file_url}
                alt={selectedItem.alt_text || ''}
                className="max-h-full max-w-full object-contain"
              />
              <a
                href={selectedItem.file_url}
                target="_blank"
                rel="noreferrer"
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 text-slate-700 hover:text-slate-950 shadow-xs"
                title="View Full Resolution"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Meta Information Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-100 font-mono text-slate-600">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Dimensions</span>
                <strong className="text-slate-800">{selectedItem.dimensions}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">File Size</span>
                <strong className="text-slate-800">{selectedItem.formatted_size}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Type</span>
                <strong className="text-slate-800">{selectedItem.mime_type}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Folder</span>
                <strong className="text-slate-800">{selectedItem.folder}</strong>
              </div>
            </div>

            {/* Editable Form */}
            <form onSubmit={handleSaveDetails} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Title / Display Name</label>
                <input
                  type="text"
                  value={selectedItem.original_name || ''}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, original_name: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-amber-500 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Alt Text (Alternative Text for SEO)
                </label>
                <input
                  type="text"
                  value={selectedItem.alt_text || ''}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, alt_text: e.target.value })
                  }
                  placeholder="Describe image for Google image search..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Direct File URL</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={selectedItem.file_url || ''}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-[11px] text-slate-600 font-mono select-all"
                  />
                  <button
                    type="button"
                    onClick={() => copyLink(selectedItem.file_url)}
                    className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shrink-0 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleDelete(selectedItem.id)}
                  className="text-rose-600 hover:text-rose-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Permanently</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer"
                  >
                    Close
                  </button>

                  <button
                    type="submit"
                    disabled={savingDetail}
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {savingDetail ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
