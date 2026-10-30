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
  Sparkles
} from 'lucide-react';

export default function MediaPickerModal({
  isOpen,
  onClose,
  onSelect,
  title = 'Select or Upload Media Asset',
  buttonText = 'Select Media',
}) {
  const { apiFetch, showToast } = useAdmin();
  const [activeTab, setActiveTab] = useState('library'); // 'library' | 'upload'
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  // Uploading state
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const fileInputRef = useRef(null);

  // Fetch Media Items
  const fetchMedia = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (selectedFolder !== 'all') params.append('folder', selectedFolder);
      params.append('per_page', '60');

      const res = await apiFetch(`/api/admin/media?${params.toString()}`);
      if (res && res.media) {
        setMediaList(res.media);
        // If current selected item is not in list, pick first
        if (!selectedItem && res.media.length > 0) {
          setSelectedItem(res.media[0]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen, search, selectedFolder]);

  // Handle Upload
  const handleFileUpload = async (files) => {
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

      if (res.success && res.uploaded) {
        showToast(res.message || 'Media uploaded successfully!', 'success');
        await fetchMedia();
        if (res.uploaded.length > 0) {
          setSelectedItem(res.uploaded[0]);
        }
        setActiveTab('library');
      }
    } catch (err) {
      showToast(err.message || 'Upload failed', 'error');
    } finally {
      setUploading(false);
      setUploadProgress('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Delete Media
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this media asset permanently?')) return;
    try {
      const res = await apiFetch(`/api/admin/media/${id}`, { method: 'DELETE' });
      if (res.success) {
        showToast('Media removed', 'success');
        setMediaList((prev) => prev.filter((m) => m.id !== id));
        if (selectedItem?.id === id) {
          setSelectedItem(null);
        }
      }
    } catch (err) {
      showToast(err.message || 'Failed to delete', 'error');
    }
  };

  // Copy URL
  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    showToast('Direct image URL copied to clipboard!', 'info');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-5xl h-[88vh] max-h-[850px] shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Top Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">{title}</h3>
              <p className="text-[11px] text-slate-500">WordPress-style Global Media Library</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tabs */}
            <div className="flex items-center bg-slate-200/80 p-1 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('library')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  activeTab === 'library'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Media Library
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  activeTab === 'upload'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Upload Files
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* TAB 1: UPLOAD FILES */}
          {activeTab === 'upload' && (
            <div className="flex-1 p-8 flex flex-col items-center justify-center bg-slate-50/50">
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFileUpload(e.dataTransfer.files);
                }}
                onClick={() => fileInputRef.current?.click()}
                className="w-full max-w-xl border-2 border-dashed border-amber-400 hover:border-amber-500 bg-white rounded-3xl p-12 text-center shadow-xs transition cursor-pointer flex flex-col items-center justify-center space-y-4"
              >
                <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                />

                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <UploadCloud className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-900">
                    Drop files anywhere to upload
                  </h4>
                  <p className="text-xs text-slate-500">
                    or click to browse from your computer (Max: 20MB per file)
                  </p>
                </div>

                <button
                  type="button"
                  disabled={uploading}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-2xs pointer-events-none"
                >
                  {uploading ? uploadProgress : 'Select Files'}
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: MEDIA LIBRARY GRID & DETAILS */}
          {activeTab === 'library' && (
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              {/* Left / Center Grid Area */}
              <div className="flex-1 flex flex-col overflow-hidden border-r border-slate-200">
                {/* Search & Filters Filter Bar */}
                <div className="p-3.5 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3 shrink-0">
                  <div className="flex items-center gap-2 flex-1 max-w-md">
                    <div className="relative flex-1">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search media files by name or alt text..."
                        className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={selectedFolder}
                      onChange={(e) => setSelectedFolder(e.target.value)}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="all">All Folders ({mediaList.length})</option>
                      <option value="uploads">Uploads</option>
                      <option value="products_mens">Mens Products</option>
                      <option value="products_polo">Polo Products</option>
                      <option value="buyer_brands">Buyer Logos</option>
                      <option value="certifications">Compliance Logos</option>
                    </select>

                    <button
                      type="button"
                      onClick={fetchMedia}
                      className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                      title="Refresh library"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-amber-500' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Thumbnails Grid */}
                <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50">
                  {loading && mediaList.length === 0 ? (
                    <div className="py-20 text-center text-slate-400">
                      <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                      <p className="text-xs">Loading media assets...</p>
                    </div>
                  ) : mediaList.length === 0 ? (
                    <div className="py-20 text-center text-slate-400 space-y-2">
                      <ImageIcon className="w-10 h-10 mx-auto text-slate-300" />
                      <p className="text-sm font-semibold text-slate-600">No media assets found</p>
                      <p className="text-xs">Upload images using the "Upload Files" tab above.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                      {mediaList.map((item) => {
                        const isSelected = selectedItem?.id === item.id;
                        return (
                          <div
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className={`group aspect-square rounded-2xl overflow-hidden border-2 transition cursor-pointer relative bg-white shadow-2xs ${
                              isSelected
                                ? 'border-amber-500 ring-2 ring-amber-500/20'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <img
                              src={item.file_url}
                              alt={item.alt_text || item.original_name}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-200"
                              loading="lazy"
                            />

                            {/* Active check indicator */}
                            {isSelected && (
                              <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-xs">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                            )}

                            {/* Hover info badge */}
                            <div className="absolute inset-x-0 bottom-0 bg-slate-950/75 text-white p-1.5 text-[9px] truncate opacity-0 group-hover:opacity-100 transition">
                              {item.original_name}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Sidebar: WordPress-Style Attachment Details */}
              <div className="w-full lg:w-72 bg-white p-4 border-t lg:border-t-0 flex flex-col justify-between shrink-0 overflow-y-auto">
                {selectedItem ? (
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block border-b border-slate-100 pb-2">
                      Attachment Details
                    </span>

                    {/* Preview Thumbnail */}
                    <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200 relative flex items-center justify-center">
                      <img
                        src={selectedItem.file_url}
                        alt={selectedItem.alt_text || ''}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    {/* File Meta */}
                    <div className="text-xs space-y-1 text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <p className="font-bold text-slate-900 truncate" title={selectedItem.original_name}>
                        {selectedItem.original_name}
                      </p>
                      <p className="text-[11px] text-slate-500">{selectedItem.dimensions}</p>
                      <p className="text-[11px] text-slate-500">{selectedItem.formatted_size}</p>
                    </div>

                    {/* Editable Alt Text */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Alt Text (SEO Description)
                      </label>
                      <input
                        type="text"
                        value={selectedItem.alt_text || ''}
                        onChange={(e) => {
                          const updated = { ...selectedItem, alt_text: e.target.value };
                          setSelectedItem(updated);
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    {/* Action Links */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => handleCopyUrl(selectedItem.file_url)}
                        className="w-full py-1.5 px-3 rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Image URL</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(selectedItem.id)}
                        className="w-full py-1.5 px-3 rounded-lg text-rose-600 hover:bg-rose-50 text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Permanently</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-20 text-slate-400 text-xs">
                    Select an image from the library to inspect details.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500 truncate max-w-md">
            {selectedItem ? (
              <span>Selected: <strong className="text-slate-800">{selectedItem.original_name}</strong></span>
            ) : (
              <span>No asset selected</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={!selectedItem}
              onClick={() => {
                if (selectedItem && onSelect) {
                  onSelect(selectedItem);
                  onClose();
                }
              }}
              className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-sm cursor-pointer disabled:opacity-40"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
