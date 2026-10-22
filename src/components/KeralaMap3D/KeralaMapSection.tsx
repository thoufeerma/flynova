"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Plus, Minus, RotateCcw, ArrowRight } from "lucide-react";
import { KERALA_DISTRICTS } from "./keralaData";
import DistrictDossierModal from "./DistrictDossierModal";

// Dynamic import with ssr: false to prevent Three.js SSR execution
const Kerala3DCanvas = dynamic(() => import("./Kerala3DCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[700px] flex flex-col items-center justify-center text-white/50">
      <div className="w-12 h-12 border-4 border-gold-base border-t-transparent rounded-full animate-spin mb-4" />
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

  const [zoomAction, setZoomAction] = useState(0);
  const [zoomOutAction, setZoomOutAction] = useState(0);
  const [resetAction, setResetAction] = useState(0);

  const zoomTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // When a district is selected:
  // 1. Immediately update selectedId so the 3D map begins smooth camera zoom flight toward this district.
  // 2. Wait for the zoom flight to complete (~750ms), then reveal the District Dossier Popup modal.
  const handleSelectDistrict = useCallback((id: string) => {
    if (zoomTimeoutRef.current) {
      clearTimeout(zoomTimeoutRef.current);
    }
    setSelectedId(id);
    setHoveredId(id);

    zoomTimeoutRef.current = setTimeout(() => {
      setIsDossierOpen(true);
    }, 750);
  }, []);

  // When the dossier popup is closed:
  // Immediately close modal and reset selectedId so the 3D map smoothly glides back to original zoom.
  const handleCloseDossier = useCallback(() => {
    if (zoomTimeoutRef.current) {
      clearTimeout(zoomTimeoutRef.current);
    }
    setIsDossierOpen(false);
    setSelectedId(null);
  }, []);

  const handleReset = () => {
    if (zoomTimeoutRef.current) {
      clearTimeout(zoomTimeoutRef.current);
    }
    setSelectedId(null);
    setIsDossierOpen(false);
    setHoveredId(null);
    setResetAction((prev) => prev + 1);
  };

  useEffect(() => {
    return () => {
      if (zoomTimeoutRef.current) {
        clearTimeout(zoomTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      id="kerala-3d"
      className="relative w-full min-h-[700px] lg:h-[calc(100vh-64px)] lg:min-h-[700px] lg:max-h-[860px] bg-[#070b0e] text-white overflow-hidden selection:bg-gold-base selection:text-black flex items-center select-none scroll-mt-20 pt-16 sm:pt-20 lg:pt-16 pb-4 sm:pb-6"
    >
      {/* Top Hairline Gold Accent Divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#c59b27]/30 to-transparent z-30 pointer-events-none" />

      {/* Bottom Hairline Gold Accent Divider */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#c59b27]/25 to-transparent z-30 pointer-events-none" />

      {/* 1. Atmospheric Surrounding Panorama: Palms & Houseboat on Left, Misty Mountains on Right (Matches Reference Mockup) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <Image
          src="/images/kerala-surrounding-clean.jpg"
          alt="Kerala Surrounding Landscape"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-75"
          priority={false}
        />
        {/* Cinematic dusk vignette & gradient blends */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b0e]/70 via-[#070b0e]/35 to-[#070b0e]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b0e] via-transparent to-[#070b0e]/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b0e]/85 via-transparent to-[#070b0e]/70" />
      </div>

      {/* 2. Full-Section Three.js 3D Interactive Canvas Stage */}
      <div className="absolute inset-0 w-full h-full z-10">
        <Kerala3DCanvas
          selectedDistrictId={selectedId}
          hoveredDistrictId={hoveredId}
          activeZoneFilter={null}
          onHoverDistrict={(id) => setHoveredId(id)}
          onSelectDistrict={handleSelectDistrict}
          zoomAction={zoomAction}
          zoomOutAction={zoomOutAction}
          resetAction={resetAction}
        />
      </div>

      {/* 3. Floating Overlay UI (pointer-events-none allows seamless mouse raycasting across map) */}
      <div className="relative z-20 w-full h-full max-w-[1520px] mx-auto px-6 sm:px-8 lg:px-12 pointer-events-none flex flex-col justify-between py-2 sm:py-3">
        
        {/* Top Row: Left Header & Right State Profile Card */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 w-full">
          
          {/* Left Column Text & Zoom Controls */}
          <div className="max-w-[420px] relative pointer-events-auto mt-2 sm:mt-4">
            {/* Eyebrow: — EXPLORE KERALA */}
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="w-6 h-[1.5px] bg-[#dcb037]" />
              <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-[#dcb037] uppercase">
                EXPLORE KERALA
              </span>
            </div>

            {/* Display Headline in Playfair Display 400 */}
            <h2 className="font-serif font-playfair font-normal text-4xl sm:text-5xl lg:text-[54px] text-white leading-[1.06] tracking-tight">
              God&apos;s Own<br />Country.
            </h2>

            {/* Subtitle Description */}
            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-[340px] mt-3 sm:mt-4">
              From the emerald backwaters to the misty Western Ghats, explore Kerala&apos;s 14 diverse districts and timeless experiences.
            </p>

            {/* Floating Vertical Pill Navigation Controls (Desktop alongside headline, exactly matching mockup) */}
            <div className="hidden sm:flex absolute top-1 left-[340px] lg:left-[355px] xl:left-[375px] z-30 w-10 py-2.5 bg-black/60 backdrop-blur-xl border border-white/15 rounded-2xl flex-col items-center gap-2 shadow-2xl">
              <button
                type="button"
                onClick={() => setZoomAction((p) => p + 1)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-all cursor-pointer"
                title="Zoom In"
                aria-label="Zoom In"
              >
                <Plus className="w-4 h-4" />
              </button>
              <div className="w-4 h-[1px] bg-white/15" />
              <button
                type="button"
                onClick={() => setZoomOutAction((p) => p + 1)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-all cursor-pointer"
                title="Zoom Out"
                aria-label="Zoom Out"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="w-4 h-[1px] bg-white/15" />
              <button
                type="button"
                onClick={handleReset}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white/80 hover:text-[#dcb037] hover:bg-white/15 transition-all cursor-pointer"
                title="Reset View"
                aria-label="Reset View"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile fallback vertical pill below text */}
            <div className="sm:hidden flex items-center gap-2 bg-black/60 backdrop-blur-xl border border-white/15 rounded-xl p-1.5 w-fit mt-4">
              <button
                type="button"
                onClick={() => setZoomAction((p) => p + 1)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white/80"
                aria-label="Zoom In"
              >
                <Plus className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-4 bg-white/15" />
              <button
                type="button"
                onClick={() => setZoomOutAction((p) => p + 1)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white/80"
                aria-label="Zoom Out"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-4 bg-white/15" />
              <button
                type="button"
                onClick={handleReset}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white/80"
                aria-label="Reset View"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: STATE PROFILE Luxury Card (Matches Reference Mockup 1:1) */}
          <aside className="w-full sm:w-[390px] lg:w-[410px] xl:w-[430px] flex-shrink-0 pointer-events-auto">
            <div className="bg-gradient-to-b from-[#0e141d]/95 to-[#080c12]/95 backdrop-blur-2xl rounded-3xl p-5 sm:p-6 shadow-[0_30px_80px_rgba(0,0,0,0.9)] border border-white/15 ring-1 ring-white/5 text-white flex flex-col justify-between">
              <div>
                {/* Top Header Row with Title & India Map Silhouette */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0 pr-2">
                    <span className="text-[10px] font-bold text-[#dcb037] tracking-[0.25em] uppercase font-sans block mb-1">
                      STATE PROFILE
                    </span>
                    
                    <h3 className="font-serif font-playfair font-normal text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                      Kerala
                    </h3>

                    <p className="text-xs text-white/65 font-light leading-relaxed mt-2 max-w-[250px]">
                      A land of serene backwaters, lush hill stations, pristine beaches and a rich cultural heritage.
                    </p>
                  </div>

                  {/* India Silhouette SVG with Kerala glowing in gold (Matches Reference Mockup) */}
                  <div className="flex-shrink-0 relative pointer-events-none select-none">
                    <svg
                      viewBox="0 0 100 115"
                      className="w-20 h-24 sm:w-22 sm:h-26 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
                      aria-label="Map of India highlighting Kerala"
                    >
                      <defs>
                        <filter id="kerala-glow" x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      {/* Stylized Silhouette of India Landmass */}
                      <path
                        d="M 38,4 C 42,2 47,2 50,5 C 52,8 52,13 50,16 C 47,19 46,21 48,23 C 51,25 56,25 60,27 C 65,29 70,30 75,32 C 81,34 88,34 91,38 C 93,42 88,46 84,47 C 80,48 76,46 72,49 C 69,52 70,56 67,58 C 63,59 58,59 56,63 C 55,67 56,73 55,79 C 54,85 52,91 49,97 C 46,103 44,108 41,113 C 39,114 38,114 37,112 C 35,106 34,98 33,90 C 31,81 30,73 31,65 C 29,64 25,65 22,63 C 18,60 17,54 20,49 C 24,46 29,48 33,46 C 34,40 31,35 31,30 C 32,25 36,20 37,15 C 38,10 36,6 38,4 Z"
                        fill="rgba(255, 255, 255, 0.08)"
                        stroke="rgba(255, 255, 255, 0.22)"
                        strokeWidth="1.2"
                        strokeLinejoin="round"
                      />

                      {/* Glowing Kerala Highlight along Southwest Coast */}
                      <path
                        d="M 34,87 C 34.5,93 35.5,100 37.5,107 C 38.5,110 39.5,113 40.5,113 C 39.5,113 38,110 36.5,104 C 34.8,98 33.8,91 33.5,87 Z"
                        fill="#dcb037"
                        stroke="#dcb037"
                        strokeWidth="1.8"
                        filter="url(#kerala-glow)"
                      />
                    </svg>
                  </div>
                </div>

                {/* 2x2 Clean Hairline Stat Grid (Matches Reference UI Exactly) */}
                <div className="border-t border-b border-white/10 my-3.5 py-2.5">
                  <div className="grid grid-cols-2 divide-x divide-white/10">
                    {/* Top-Left: DISTRICTS */}
                    <div className="pr-4 pb-2">
                      <span className="text-[9px] font-sans font-medium tracking-[0.2em] text-white/45 uppercase block mb-1">
                        DISTRICTS
                      </span>
                      <p className="font-manrope font-semibold text-2xl sm:text-3xl text-white leading-tight">
                        14
                      </p>
                    </div>

                    {/* Top-Right: COASTLINE */}
                    <div className="pl-4 sm:pl-5 pb-2">
                      <span className="text-[9px] font-sans font-medium tracking-[0.2em] text-white/45 uppercase block mb-1">
                        COASTLINE
                      </span>
                      <p className="font-manrope font-semibold text-2xl sm:text-3xl text-white leading-tight">
                        590 <span className="font-sans font-light text-xs text-white/60 ml-0.5">km</span>
                      </p>
                    </div>

                    {/* Bottom-Left: AIRPORTS */}
                    <div className="pr-4 pt-2 border-t border-white/10">
                      <span className="text-[9px] font-sans font-medium tracking-[0.2em] text-white/45 uppercase block mb-1">
                        AIRPORTS
                      </span>
                      <p className="font-manrope font-semibold text-2xl sm:text-3xl text-white leading-tight">
                        4 <span className="font-sans font-light text-xs text-white/60 ml-0.5">int&apos;l</span>
                      </p>
                    </div>

                    {/* Bottom-Right: FOREST COVER */}
                    <div className="pl-4 sm:pl-5 pt-2 border-t border-white/10">
                      <span className="text-[9px] font-sans font-medium tracking-[0.2em] text-white/45 uppercase block mb-1">
                        FOREST COVER
                      </span>
                      <p className="font-manrope font-semibold text-2xl sm:text-3xl text-white leading-tight">
                        30%+
                      </p>
                    </div>
                  </div>
                </div>

                {/* Full-Width Gold CTA Button (Matches Reference UI) */}
                <button
                  type="button"
                  onClick={() => onOpenPlanModal("Kerala Journey")}
                  className="w-full bg-[#dcb037] hover:bg-[#ebc45a] text-black font-semibold text-xs sm:text-sm tracking-wider py-3.5 px-6 rounded-full flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-gold-base/20 cursor-pointer my-1.5"
                >
                  <span>EXPLORE KERALA JOURNEY</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom Strip: TOP EXPERIENCES with 4 Photo Cards (Matches Reference UI) */}
              <div className="mt-3.5 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#dcb037] uppercase">
                    TOP EXPERIENCES
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenPlanModal("Kerala Experiences")}
                    className="text-[11px] font-sans text-white/50 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {/* Card 1: Backwaters */}
                  <div
                    onClick={() => handleSelectDistrict("alappuzha")}
                    className="flex flex-col cursor-pointer group/exp"
                  >
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10">
                      <Image
                        src="/images/alleppey-hero.jpg"
                        alt="Backwaters"
                        fill
                        sizes="90px"
                        className="object-cover group-hover/exp:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-[11px] font-medium text-white mt-1 truncate">
                      Backwaters
                    </span>
                    <span className="text-[9px] text-white/45 truncate">
                      Serene waters
                    </span>
                  </div>

                  {/* Card 2: Hill Stations */}
                  <div
                    onClick={() => handleSelectDistrict("idukki")}
                    className="flex flex-col cursor-pointer group/exp"
                  >
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10">
                      <Image
                        src="/images/munnar-hero.jpg"
                        alt="Hill Stations"
                        fill
                        sizes="90px"
                        className="object-cover group-hover/exp:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-[11px] font-medium text-white mt-1 truncate">
                      Hill Stations
                    </span>
                    <span className="text-[9px] text-white/45 truncate">
                      Misty mountains
                    </span>
                  </div>

                  {/* Card 3: Beaches */}
                  <div
                    onClick={() => handleSelectDistrict("thiruvananthapuram")}
                    className="flex flex-col cursor-pointer group/exp"
                  >
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10">
                      <Image
                        src="/images/tropical-beach.jpg"
                        alt="Beaches"
                        fill
                        sizes="90px"
                        className="object-cover group-hover/exp:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-[11px] font-medium text-white mt-1 truncate">
                      Beaches
                    </span>
                    <span className="text-[9px] text-white/45 truncate">
                      Golden shores
                    </span>
                  </div>

                  {/* Card 4: Culture */}
                  <div
                    onClick={() => handleSelectDistrict("thrissur")}
                    className="flex flex-col cursor-pointer group/exp"
                  >
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10">
                      <Image
                        src="/images/temple-tour-hero.jpg"
                        alt="Culture"
                        fill
                        sizes="90px"
                        className="object-cover group-hover/exp:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-[11px] font-medium text-white mt-1 truncate">
                      Culture
                    </span>
                    <span className="text-[9px] text-white/45 truncate">
                      Timeless heritage
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* 4. District Dossier Popup Modal (Deep dive when user clicks to explore) */}
      <DistrictDossierModal
        district={selectedId ? KERALA_DISTRICTS[selectedId] || null : null}
        isOpen={isDossierOpen}
        onClose={handleCloseDossier}
        onOpenPlanModal={onOpenPlanModal}
      />
    </section>
  );
}
