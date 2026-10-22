"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ArrowRight, MapPin, Calendar, Sparkles, Mountain, Users, Trees } from "lucide-react";
import { DistrictData, DISTRICT_DOSSIERS } from "./keralaData";
import PrimaryButton from "@/components/ui/PrimaryButton";

interface DistrictDossierModalProps {
  district: DistrictData | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenPlanModal: (destinationName: string) => void;
}

export default function DistrictDossierModal({
  district,
  isOpen,
  onClose,
  onOpenPlanModal,
}: DistrictDossierModalProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  // Smooth mount and entrance/exit transition lifecycle
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isOpen && district) {
      setMounted(true);
      // Double requestAnimationFrame ensures initial off-screen styles are applied before transition begins
      const frameId = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true);
        });
      });
      return () => cancelAnimationFrame(frameId);
    } else {
      setVisible(false);
      timer = setTimeout(() => {
        setMounted(false);
      }, 350); // Matches exit transition duration
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen, district]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted || !district) return null;

  const dossier = DISTRICT_DOSSIERS[district.id] || {
    geography: "2,500 km²",
    population: "20.5 Lakhs",
    hotspots: "15+ Sites",
    image: "/images/hero-kerala.jpg",
    tagline: "God's Own Country",
  };

  const handleActionClick = () => {
    onClose();
    onOpenPlanModal(`${district.name} Curated Tour`);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dossier-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
    >
      {/* Dark Blurred Backdrop with smooth fade */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-all duration-400 ease-out cursor-pointer ${
          visible ? "opacity-100" : "opacity-0 backdrop-blur-none"
        }`}
      />

      {/* Smooth Spring-Deceleration Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative z-10 w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-[#0b1013] border border-gold-base/40 shadow-[0_30px_100px_rgba(0,0,0,0.95)] flex flex-col md:flex-row will-change-transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-8 pointer-events-none"
        }`}
      >
        {/* Prominent Floating Close Button (Always visible on mobile & desktop at top right) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-40 w-10 h-10 rounded-full bg-black/85 hover:bg-black text-white hover:text-[#dcb037] border border-white/25 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all active:scale-95 cursor-pointer"
          aria-label="Close dossier modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Half: Scenic Photography Hero Column */}
        <div className="relative w-full md:w-[45%] h-56 sm:h-64 md:h-auto min-h-[220px] md:min-h-[480px] overflow-hidden flex flex-col justify-end p-6 sm:p-8 select-none">
          {/* Background Scenic Image */}
          <Image
            src={dossier.image}
            alt={district.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover object-center transition-transform duration-700 hover:scale-105"
          />

          {/* Luxury Gradient Vignettes */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1013] via-[#0b1013]/40 to-black/30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0b1013]/80 hidden md:block pointer-events-none" />

          {/* Overlaid Editorial Text */}
          <div className="relative z-10 animate-fadeInSlide">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-gold-base mb-1.5 drop-shadow-md">
              DISCOVER
            </span>
            <h2 className="font-serif font-playfair text-3xl sm:text-4xl font-normal text-white leading-tight mb-2 drop-shadow-lg">
              {district.name.split(" ")[0]}
            </h2>
            <div className="w-12 h-[2px] bg-gold-base mb-3 shadow-[0_0_8px_rgba(197,155,39,0.5)]" />
            <p className="text-xs text-white/85 font-light italic leading-relaxed line-clamp-2">
              &ldquo;{dossier.tagline}&rdquo;
            </p>
          </div>

          {/* Top Zone Tag */}
          <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
            <span className="text-[10px] font-semibold text-white/90 uppercase tracking-widest flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: district.zoneColor || "var(--color-gold-base)" }}
              />
              {district.zoneName}
            </span>
          </div>
        </div>

        {/* Right Half: District Dossier & Stats Details */}
        <div className="w-full md:w-[55%] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[calc(90vh-100px)] md:max-h-[560px]">
          <div>
            {/* Top Bar: Badge & Close Button */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <div className="inline-flex items-center gap-2 bg-gold-base/15 border border-gold-base/30 px-3 py-1 rounded-full">
                <Sparkles className="w-3 h-3 text-gold-base" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-base font-sans">
                  DISTRICT DOSSIER
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
                aria-label="Close dossier modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* District Title & Subtitle */}
            <div className="mb-4">
              <div className="flex items-center gap-1.5 text-xs text-white/50 mb-1">
                <MapPin className="w-3.5 h-3.5 text-gold-base" />
                <span className="uppercase tracking-widest text-[11px] font-medium font-sans">KERALA STATE, INDIA</span>
              </div>
              <h3
                id="dossier-title"
                className="font-serif font-playfair text-2xl sm:text-3xl font-normal text-white tracking-tight leading-tight"
              >
                {district.name}
              </h3>
              {district.alias && (
                <p className="text-xs font-medium text-gold-base mt-1">
                  {district.alias}
                </p>
              )}
            </div>

            {/* 3 Stat Cards Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
              {/* Stat 1: Geography */}
              <div className="bg-dark-elevated rounded-2xl p-3 border border-white/10 flex flex-col justify-center items-center text-center">
                <div className="flex items-center gap-1 text-[9px] font-bold text-white/45 uppercase tracking-wider mb-1 font-sans">
                  <Mountain className="w-3 h-3 text-gold-base" />
                  <span>GEOGRAPHY</span>
                </div>
                <p className="font-manrope text-sm sm:text-base font-bold text-white leading-none">
                  {dossier.geography}
                </p>
                <span className="text-[8px] text-white/40 tracking-wider uppercase mt-1">Total Area</span>
              </div>

              {/* Stat 2: Population */}
              <div className="bg-dark-elevated rounded-2xl p-3 border border-white/10 flex flex-col justify-center items-center text-center">
                <div className="flex items-center gap-1 text-[9px] font-bold text-white/45 uppercase tracking-wider mb-1 font-sans">
                  <Users className="w-3 h-3 text-gold-base" />
                  <span>POPULATION</span>
                </div>
                <p className="font-manrope text-sm sm:text-base font-bold text-white leading-none">
                  {dossier.population}
                </p>
                <span className="text-[8px] text-white/40 tracking-wider uppercase mt-1">Census Metric</span>
              </div>

              {/* Stat 3: Hotspots */}
              <div className="bg-dark-elevated rounded-2xl p-3 border border-white/10 flex flex-col justify-center items-center text-center">
                <div className="flex items-center gap-1 text-[9px] font-bold text-white/45 uppercase tracking-wider mb-1 font-sans">
                  <Trees className="w-3 h-3 text-gold-base" />
                  <span>HOTSPOTS</span>
                </div>
                <p className="font-manrope text-sm sm:text-base font-bold text-white leading-none">
                  {dossier.hotspots}
                </p>
                <span className="text-[8px] text-white/40 tracking-wider uppercase mt-1">Curated Sites</span>
              </div>
            </div>

            {/* Editorial Description */}
            <div className="space-y-3 mb-5">
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                {district.description}
              </p>

              {/* Best Season Badge */}
              <div className="flex items-center gap-2 text-xs text-white/60 pt-1">
                <Calendar className="w-3.5 h-3.5 text-gold-base" />
                <span className="text-white/50">Optimal Visiting Season:</span>
                <span className="font-semibold text-white/90">{district.bestSeason}</span>
              </div>

              {/* Key Attractions Chips */}
              {district.keySpots && district.keySpots.length > 0 && (
                <div className="pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/45 block mb-1.5 font-sans">
                    KEY DISTRICT HIGHLIGHTS:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {district.keySpots.map((spot) => (
                      <span
                        key={spot}
                        className="text-[11px] bg-white/5 border border-white/10 text-white/80 px-2.5 py-1 rounded-lg font-light"
                      >
                        {spot}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action CTA Button & Mobile Close Button */}
          <div className="pt-3 border-t border-white/10 space-y-2">
            <PrimaryButton
              onClick={handleActionClick}
              className="w-full py-3.5"
              icon={<ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />}
            >
              PLAN A TRIP TO {district.name.split(" ")[0].toUpperCase()}
            </PrimaryButton>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 text-xs text-white/60 hover:text-white transition-colors text-center font-medium md:hidden cursor-pointer"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
