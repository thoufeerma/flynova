"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ZoomIn, ZoomOut, RotateCcw, ArrowRight, Compass, Sparkles, MapPin } from "lucide-react";
import { KERALA_DISTRICTS, DistrictData } from "./keralaData";
import DistrictDossierModal from "./DistrictDossierModal";

// Dynamic import with ssr: false to prevent Three.js SSR execution
const Kerala3DCanvas = dynamic(() => import("./Kerala3DCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[580px] sm:h-[650px] lg:h-[720px] flex flex-col items-center justify-center text-white/50">
      <div className="w-12 h-12 border-4 border-[#c59b27] border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-xs tracking-[0.2em] font-semibold text-white/70 uppercase">
        Initializing 3D Kerala Engine...
      </p>
    </div>
  ),
});

interface KeralaMapSectionProps {
  onOpenPlanModal: (destName?: string) => void;
}

export default function KeralaMapSection({ onOpenPlanModal }: KeralaMapSectionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const [zoomAction, setZoomAction] = useState(0);
  const [zoomOutAction, setZoomOutAction] = useState(0);
  const [resetAction, setResetAction] = useState(0);

  // Active district to show in dossier (hovered takes priority, else selected, else null)
  const activeDistrict: DistrictData | null =
    (hoveredId && KERALA_DISTRICTS[hoveredId]) ||
    (selectedId && KERALA_DISTRICTS[selectedId]) ||
    null;

  const handleReset = () => {
    setSelectedId(null);
    setIsDossierOpen(false);
    setHoveredId(null);
    setActiveZone(null);
    setResetAction((prev) => prev + 1);
  };

  return (
    <section id="kerala-3d" className="relative bg-[#050b08] py-16 sm:py-24 text-white overflow-hidden border-t border-white/5">
      
      {/* Background Decorative Grid and Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#c59b27]/8 blur-[180px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#3d5c64]/15 blur-[160px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-6">
        
        {/* Section Title & 3D Experience Tag (Matches Reference Screenshot) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase text-[#c59b27] mb-2 drop-shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>3D EXPERIENCE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.2rem] font-bold text-white tracking-tight leading-none">
              Explore <span className="italic font-normal text-white/90">Kerala.</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-white/60 font-light max-w-md leading-relaxed">
            Interact with Kerala’s 14 geographic districts in 3D perspective. Hover or click any region to inspect district dossiers and Flynova’s curated journeys.
          </p>
        </div>

        {/* 3D Map Stage with Floating UI Controls and Right Dossier */}
        <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#0a0f0d] to-[#050b08] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Top-Left Zoom Controls (Matches Reference UI) */}
          <div className="absolute top-6 left-6 z-20 flex items-center bg-black/50 backdrop-blur-xl border border-white/15 rounded-xl p-1.5 shadow-2xl">
            <button
              onClick={() => setZoomAction((p) => p + 1)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              title="Zoom In"
              aria-label="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <div className="w-[1px] h-4 bg-white/20 mx-1" />
            <button
              onClick={() => setZoomOutAction((p) => p + 1)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <div className="w-[1px] h-4 bg-white/20 mx-1" />
            <button
              onClick={handleReset}
              className="w-9 h-9 rounded-lg bg-[#c59b27] flex items-center justify-center text-black hover:bg-[#e5b94c] transition-all shadow-md cursor-pointer"
              title="Reset View"
              aria-label="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Three.js 3D WebGL Canvas */}
          <div className="w-full">
            <Kerala3DCanvas
              selectedDistrictId={selectedId}
              hoveredDistrictId={hoveredId}
              activeZoneFilter={activeZone}
              onHoverDistrict={(id) => setHoveredId(id)}
              onSelectDistrict={(id) => {
                setSelectedId(id);
                // 160ms delay lets 3D camera smoothly glide towards the district before the card blooms
                setTimeout(() => {
                  setIsDossierOpen(true);
                }, 160);
              }}
              zoomAction={zoomAction}
              zoomOutAction={zoomOutAction}
              resetAction={resetAction}
            />
          </div>

          {/* Bottom-Left Floating Legend Card (Matches Reference UI) */}
          <div className="absolute bottom-6 left-6 z-20 hidden md:block max-w-[270px] bg-black/45 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#c59b27] animate-pulse-gold inline-block" />
              <p className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">
                INTERACTIVE ZONES
              </p>
            </div>
            
            <p className="text-xs text-white/70 font-light leading-relaxed mb-4">
              Hover over any region of the 3D map to view real-time statistics. Click to dive deep into a district’s exclusive dossier.
            </p>

            <div className="space-y-2 pt-3 border-t border-white/10">
              <button
                onClick={() => setActiveZone(activeZone === "highlands" ? null : "highlands")}
                className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded text-left transition-all cursor-pointer ${
                  activeZone === "highlands" ? "bg-white/15" : "hover:bg-white/5"
                }`}
              >
                <div className="w-3.5 h-3.5 rounded bg-[#617042] border border-white/20" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">
                  Heritage Highlands
                </span>
              </button>

              <button
                onClick={() => setActiveZone(activeZone === "backwaters" ? null : "backwaters")}
                className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded text-left transition-all cursor-pointer ${
                  activeZone === "backwaters" ? "bg-white/15" : "hover:bg-white/5"
                }`}
              >
                <div className="w-3.5 h-3.5 rounded bg-[#3d5c64] border border-white/20" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">
                  Backwater Lagoons
                </span>
              </button>

              <button
                onClick={() => setActiveZone(activeZone === "coastal" ? null : "coastal")}
                className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded text-left transition-all cursor-pointer ${
                  activeZone === "coastal" ? "bg-white/15" : "hover:bg-white/5"
                }`}
              >
                <div className="w-3.5 h-3.5 rounded bg-[#93856b] border border-white/20" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">
                  Coastal & Gateways
                </span>
              </button>

              <button
                onClick={() => setActiveZone(activeZone === "sacred" ? null : "sacred")}
                className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded text-left transition-all cursor-pointer ${
                  activeZone === "sacred" ? "bg-white/15" : "hover:bg-white/5"
                }`}
              >
                <div className="w-3.5 h-3.5 rounded bg-[#c59b27] border border-white/20" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">
                  Sacred Royal South
                </span>
              </button>
            </div>
          </div>

          {/* Desktop Right-Side Floating District Dossier Panel (Matches Reference UI Card) */}
          <aside
            className={`hidden md:flex absolute right-6 top-6 bottom-6 z-20 w-[360px] lg:w-[410px] max-h-[calc(100%-48px)] flex-col will-change-transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isDossierOpen ? "opacity-0 pointer-events-none translate-x-8 scale-95" : "opacity-100 pointer-events-auto translate-x-0 scale-100"
            }`}
          >
            <div className="h-full bg-white/95 backdrop-blur-2xl rounded-[2rem] p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/60 text-[#181d21] flex flex-col justify-between overflow-y-auto">
              
              <div>
                {/* State / District Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a07a16]">
                    {activeDistrict ? `DISTRICT PROFILE · ${activeDistrict.zoneName}` : "STATE PROFILE"}
                  </span>
                  {activeDistrict && (
                    <span className="text-[10px] bg-[#080a0c] text-white px-2 py-0.5 rounded font-mono">
                      {activeDistrict.bestSeason}
                    </span>
                  )}
                </div>

                {/* Headline */}
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#080a0c] tracking-tight leading-tight mb-2">
                  {activeDistrict ? activeDistrict.name : "God's Own Country."}
                </h3>

                {activeDistrict?.alias && (
                  <p className="text-xs font-semibold text-[#a07a16] mb-3">
                    {activeDistrict.alias}
                  </p>
                )}

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#4b5563] font-normal leading-relaxed mb-4">
                  {activeDistrict
                    ? activeDistrict.description
                    : "From the emerald backwaters to the misty Western Ghats, hover over the map to explore Kerala's 14 diverse districts."}
                </p>

                {/* Connected Flynova Packages for this District */}
                {activeDistrict && activeDistrict.flynovaPackages.length > 0 && (
                  <div className="bg-[#f5efe6] p-3.5 rounded-xl border border-[#e5dccf] mb-4">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#8d6910] uppercase tracking-wider mb-2">
                      <Compass className="w-3.5 h-3.5 text-[#a07a16]" />
                      <span>Flynova Curated Journeys Here</span>
                    </div>
                    <ul className="space-y-1.5">
                      {activeDistrict.flynovaPackages.map((pkg) => (
                        <li key={pkg} className="text-xs text-[#1c2227] font-medium flex items-start gap-1.5">
                          <span className="text-[#a07a16] font-bold mt-0.5">•</span>
                          <span>{pkg}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* 4-Stat Grid (Matches Reference UI Card Exactly) */}
              <div>
                <div className="grid grid-cols-2 gap-2.5 my-3">
                  <div className="bg-gray-50/90 rounded-xl p-3 border border-gray-100 flex flex-col justify-center items-center text-center">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                      {activeDistrict ? activeDistrict.stats.label1 : "Districts"}
                    </p>
                    <p className="text-base sm:text-lg font-bold text-gray-900 font-serif leading-none">
                      {activeDistrict ? activeDistrict.stats.val1 : "14"}
                    </p>
                  </div>

                  <div className="bg-gray-50/90 rounded-xl p-3 border border-gray-100 flex flex-col justify-center items-center text-center">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                      {activeDistrict ? activeDistrict.stats.label2 : "Coastline"}
                    </p>
                    <p className="text-base sm:text-lg font-bold text-gray-900 font-serif leading-none">
                      {activeDistrict ? activeDistrict.stats.val2 : "590"}
                      {!activeDistrict && <span className="text-[10px] font-bold text-gray-500 ml-0.5">km</span>}
                    </p>
                  </div>

                  <div className="bg-gray-50/90 rounded-xl p-3 border border-gray-100 flex flex-col justify-center items-center text-center">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                      {activeDistrict ? activeDistrict.stats.label3 : "Airports"}
                    </p>
                    <p className="text-base sm:text-lg font-bold text-gray-900 font-serif leading-none">
                      {activeDistrict ? activeDistrict.stats.val3 : "4"}
                      {!activeDistrict && <span className="text-[10px] font-bold text-gray-500 ml-0.5">Intl.</span>}
                    </p>
                  </div>

                  <div className="bg-gray-50/90 rounded-xl p-3 border border-gray-100 flex flex-col justify-center items-center text-center">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                      {activeDistrict ? activeDistrict.stats.label4 : "Forest"}
                    </p>
                    <p className="text-base sm:text-lg font-bold text-gray-900 font-serif leading-none">
                      {activeDistrict ? activeDistrict.stats.val4 : "30%+"}
                    </p>
                  </div>
                </div>

                {/* Plan Trip / Open Dossier CTA Button */}
                <button
                  onClick={() => {
                    if (activeDistrict) {
                      setSelectedId(activeDistrict.id);
                      setIsDossierOpen(true);
                    } else {
                      onOpenPlanModal("Kerala Backwaters & Hills");
                    }
                  }}
                  className="w-full bg-[#111417] hover:bg-[#c59b27] text-white hover:text-black font-semibold text-xs sm:text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer mt-1"
                >
                  <span>
                    {activeDistrict ? `View ${activeDistrict.name.split(" ")[0]} Dossier` : "Plan Kerala Journey"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </aside>

          {/* Mobile Bottom Docked Card (< md screens) */}
          <div className="md:hidden absolute bottom-4 left-4 right-4 z-20 bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/40 text-[#181d21] flex items-center justify-between">
            <div className="flex-1 min-w-0 pr-3">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#a07a16] block truncate">
                {activeDistrict ? `District · ${activeDistrict.zoneName}` : "State Profile"}
              </span>
              <h4 className="font-serif text-lg font-bold text-[#080a0c] leading-tight truncate">
                {activeDistrict ? activeDistrict.name : "God's Own Country"}
              </h4>
              <p className="text-xs text-gray-600 truncate mt-0.5">
                {activeDistrict ? activeDistrict.highlightText : "Tap districts on 3D map to view details"}
              </p>
            </div>

            <button
              onClick={() => {
                if (activeDistrict) {
                  setSelectedId(activeDistrict.id);
                  setIsDossierOpen(true);
                } else {
                  onOpenPlanModal("Kerala Backwaters & Hills");
                }
              }}
              className="bg-[#111417] hover:bg-[#c59b27] text-white hover:text-black p-3 rounded-xl flex-shrink-0 transition-all shadow-md cursor-pointer"
              aria-label="View district dossier"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* 3D District Zoom Dossier Popup Modal (Matches Reference Mockup) */}
      <DistrictDossierModal
        district={selectedId ? KERALA_DISTRICTS[selectedId] || null : null}
        isOpen={isDossierOpen}
        onClose={() => {
          setIsDossierOpen(false);
          setSelectedId(null);
        }}
        onOpenPlanModal={onOpenPlanModal}
      />
    </section>
  );
}
