import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Send, Sparkles, Layers, ShieldCheck, Shirt } from 'lucide-react';

export default function NotFoundPage() {
  const handleOpenRfq = () => {
    if (typeof window.openSofttexRfq === 'function') {
      window.openSofttexRfq();
    }
  };

  return (
    <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center py-20 px-4 sm:px-6">
      <div className="max-w-2xl w-full text-center">
        {/* Brand Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-black uppercase tracking-widest mb-6">
          <Compass className="w-3.5 h-3.5 text-amber-600" />
          <span>Navigation Deviation • Error 404</span>
        </div>

        {/* Large Editorial Headline */}
        <h1 className="text-6xl sm:text-7xl font-black text-slate-900 tracking-tight mb-4">
          404
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">
          Collection Dossier Not Found
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed mb-8">
          The garments lookbook or apparel specifications you were seeking might have been re-cataloged, updated, or moved to our private buyer repository.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Main Runway</span>
          </Link>
          <button
            type="button"
            onClick={handleOpenRfq}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Submit RFQ Dossier</span>
          </button>
        </div>

        {/* Curated Sourcing Shortcuts */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs max-w-xl mx-auto">
          <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4">
            Curated Sourcing Destinations
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-left">
            <Link
              to="/catalogue/mens"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-amber-500/10 border border-slate-100 hover:border-amber-500/30 text-xs font-semibold text-slate-800 hover:text-amber-900 transition flex items-center gap-2"
            >
              <Shirt className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Mens Lookbook</span>
            </Link>
            <Link
              to="/catalogue/womens"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-amber-500/10 border border-slate-100 hover:border-amber-500/30 text-xs font-semibold text-slate-800 hover:text-amber-900 transition flex items-center gap-2"
            >
              <Layers className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Womens Styles</span>
            </Link>
            <Link
              to="/services"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-amber-500/10 border border-slate-100 hover:border-amber-500/30 text-xs font-semibold text-slate-800 hover:text-amber-900 transition flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Sourcing Services</span>
            </Link>
            <Link
              to="/quality"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-amber-500/10 border border-slate-100 hover:border-amber-500/30 text-xs font-semibold text-slate-800 hover:text-amber-900 transition flex items-center gap-2"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>AQL Assurance</span>
            </Link>
            <Link
              to="/compliance"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-amber-500/10 border border-slate-100 hover:border-amber-500/30 text-xs font-semibold text-slate-800 hover:text-amber-900 transition flex items-center gap-2"
            >
              <Compass className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Factory Audits</span>
            </Link>
            <Link
              to="/contact"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-amber-500/10 border border-slate-100 hover:border-amber-500/30 text-xs font-semibold text-slate-800 hover:text-amber-900 transition flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Direct Liaison</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
