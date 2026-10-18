"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Moon,
  Building2,
  Car,
  ArrowRight,
  Search,
  Sparkles,
  MapPin,
  CheckCircle2,
  Users,
  Heart,
  Compass,
  Flame,
  Clock,
  Filter
} from "lucide-react";
import { ALL_PACKAGES, PackageItem } from "@/data/packagesData";

interface PackagesExplorerSectionProps {
  onSelectPackage?: (pkgName: string) => void;
  limit?: number;
}

export default function PackagesExplorerSection({ onSelectPackage, limit }: PackagesExplorerSectionProps) {
  // Main Category Tab (Individual, Group, Senior, North, Special)
  const [activeTab, setActiveTab] = useState<"individual" | "group" | "senior" | "north" | "special">("individual");
  
  // Sub-filter under Individual: Best packages vs State-wise
  const [subCategory, setSubCategory] = useState<"best" | "state">("best");
  
  // State filter under State-wise
  const [selectedState, setSelectedState] = useState<string>("all");
  
  // Search query
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Duration filter: all, short (1-3), medium (4-6), long (7+)
  const [durationFilter, setDurationFilter] = useState<"all" | "short" | "medium" | "long">("all");

  // Filtered packages
  const filteredPackages = useMemo(() => {
    return ALL_PACKAGES.filter((pkg) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = pkg.name.toLowerCase().includes(q);
        const matchesState = pkg.stateLabel.toLowerCase().includes(q);
        const matchesHighlights = pkg.highlights.some((h) => h.toLowerCase().includes(q));
        const matchesId = pkg.id.toLowerCase().includes(q);
        if (!matchesName && !matchesState && !matchesHighlights && !matchesId) return false;
      }

      // 2. Duration filter
      if (durationFilter === "short" && pkg.days > 3) return false;
      if (durationFilter === "medium" && (pkg.days < 4 || pkg.days > 6)) return false;
      if (durationFilter === "long" && pkg.days < 7) return false;

      // 3. Category tabs
      if (activeTab === "north") {
        return pkg.category === "north";
      }
      if (activeTab === "senior") {
        return pkg.category === "senior" || pkg.duration.includes("5 Days") || pkg.description.toLowerCase().includes("relaxed");
      }
      if (activeTab === "special") {
        return pkg.category === "special";
      }
      if (activeTab === "group") {
        return pkg.category === "group" || pkg.isCustomizable;
      }

      // activeTab === "individual"
      if (subCategory === "best") {
        return true; // Best of packages
      }

      // subCategory === "state"
      if (selectedState === "all") return true;
      if (selectedState === "tamilnadu") {
        return pkg.state.includes("tamil") || pkg.stateLabel.toLowerCase().includes("tamil");
      }
      if (selectedState === "kerala") {
        return pkg.state.includes("kerala") || pkg.stateLabel.toLowerCase().includes("kerala");
      }
      if (selectedState === "multi") {
        return pkg.stateLabel.toLowerCase().includes("multi") || pkg.stateLabel.includes("&");
      }
      if (selectedState === "north") {
        return pkg.state.includes("uttar") || pkg.stateLabel.toLowerCase().includes("uttar") || pkg.category === "north";
      }

      return true;
    });
  }, [activeTab, subCategory, selectedState, searchQuery, durationFilter]);

  return (
    <section id="packages" className="py-16 sm:py-24 bg-[#07090b] text-white relative overflow-hidden border-t border-white/10">
      
      {/* Background Ambience Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#c59b27]/6 blur-[200px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#23434d]/10 blur-[180px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#c59b27] mb-3">
            <span className="w-6 h-px bg-[#c59b27]/60" />
            <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
            <span>EXPLORE OUR PACKAGES</span>
            <span className="w-6 h-px bg-[#c59b27]/60" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
            Divine Temple &amp; <span className="text-[#c59b27] italic font-normal">Heritage Tours</span>
          </h2>

          <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
            Over 25+ handpicked pilgrimage itineraries across Tamil Nadu, Kerala, Karnataka, Andhra Pradesh &amp; North India with private AC transport, premium hotels, dedicated chauffeur, and VIP darshan assistance.
          </p>
        </div>

        {/* 1. Main Category Tabs (Matches templestours.com icon navigation) */}
        <div className="flex items-center justify-start sm:justify-center gap-3 sm:gap-6 overflow-x-auto pb-4 mb-8 no-scrollbar">
          
          {/* Individual / Family */}
          <button
            onClick={() => {
              setActiveTab("individual");
              setSubCategory("best");
            }}
            className={`flex flex-col items-center gap-2 p-3 sm:px-5 sm:py-3.5 rounded-2xl transition-all cursor-pointer flex-shrink-0 min-w-[90px] sm:min-w-[130px] border ${
              activeTab === "individual"
                ? "bg-[#141b21] border-[#c59b27] text-white shadow-[0_10px_25px_rgba(197,155,39,0.25)] scale-105"
                : "bg-[#0b1013] border-white/10 text-white/60 hover:text-white hover:border-white/30"
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              activeTab === "individual" ? "bg-[#c59b27] text-black" : "bg-white/5 text-[#c59b27]"
            }`}>
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold whitespace-nowrap">Individual &amp; Family</span>
            {activeTab === "individual" && <span className="w-1.5 h-1.5 rounded-full bg-[#c59b27]" />}
          </button>

          {/* Group Yatras */}
          <button
            onClick={() => setActiveTab("group")}
            className={`flex flex-col items-center gap-2 p-3 sm:px-5 sm:py-3.5 rounded-2xl transition-all cursor-pointer flex-shrink-0 min-w-[90px] sm:min-w-[130px] border ${
              activeTab === "group"
                ? "bg-[#141b21] border-[#c59b27] text-white shadow-[0_10px_25px_rgba(197,155,39,0.25)] scale-105"
                : "bg-[#0b1013] border-white/10 text-white/60 hover:text-white hover:border-white/30"
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              activeTab === "group" ? "bg-[#c59b27] text-black" : "bg-white/5 text-[#c59b27]"
            }`}>
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold whitespace-nowrap">Group Yatras</span>
            {activeTab === "group" && <span className="w-1.5 h-1.5 rounded-full bg-[#c59b27]" />}
          </button>

          {/* Senior Citizen */}
          <button
            onClick={() => setActiveTab("senior")}
            className={`flex flex-col items-center gap-2 p-3 sm:px-5 sm:py-3.5 rounded-2xl transition-all cursor-pointer flex-shrink-0 min-w-[90px] sm:min-w-[130px] border ${
              activeTab === "senior"
                ? "bg-[#141b21] border-[#c59b27] text-white shadow-[0_10px_25px_rgba(197,155,39,0.25)] scale-105"
                : "bg-[#0b1013] border-white/10 text-white/60 hover:text-white hover:border-white/30"
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              activeTab === "senior" ? "bg-[#c59b27] text-black" : "bg-white/5 text-[#c59b27]"
            }`}>
              <Heart className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold whitespace-nowrap">Senior Citizen</span>
            {activeTab === "senior" && <span className="w-1.5 h-1.5 rounded-full bg-[#c59b27]" />}
          </button>

          {/* North India */}
          <button
            onClick={() => setActiveTab("north")}
            className={`flex flex-col items-center gap-2 p-3 sm:px-5 sm:py-3.5 rounded-2xl transition-all cursor-pointer flex-shrink-0 min-w-[90px] sm:min-w-[130px] border ${
              activeTab === "north"
                ? "bg-[#141b21] border-[#c59b27] text-white shadow-[0_10px_25px_rgba(197,155,39,0.25)] scale-105"
                : "bg-[#0b1013] border-white/10 text-white/60 hover:text-white hover:border-white/30"
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              activeTab === "north" ? "bg-[#c59b27] text-black" : "bg-white/5 text-[#c59b27]"
            }`}>
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold whitespace-nowrap">North India</span>
            {activeTab === "north" && <span className="w-1.5 h-1.5 rounded-full bg-[#c59b27]" />}
          </button>

          {/* Special Yatras */}
          <button
            onClick={() => setActiveTab("special")}
            className={`flex flex-col items-center gap-2 p-3 sm:px-5 sm:py-3.5 rounded-2xl transition-all cursor-pointer flex-shrink-0 min-w-[90px] sm:min-w-[130px] border ${
              activeTab === "special"
                ? "bg-[#141b21] border-[#c59b27] text-white shadow-[0_10px_25px_rgba(197,155,39,0.25)] scale-105"
                : "bg-[#0b1013] border-white/10 text-white/60 hover:text-white hover:border-white/30"
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              activeTab === "special" ? "bg-[#c59b27] text-black" : "bg-white/5 text-[#c59b27]"
            }`}>
              <Flame className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold whitespace-nowrap">Special Yatras</span>
            {activeTab === "special" && <span className="w-1.5 h-1.5 rounded-full bg-[#c59b27]" />}
          </button>

        </div>

        {/* 2. Sub-Category Toggle (under Individual/Family): Best Packages vs State-wise */}
        {activeTab === "individual" && (
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="inline-flex items-center bg-[#0b1013] p-1.5 rounded-2xl border border-white/10 mb-5 shadow-lg">
              <button
                onClick={() => setSubCategory("best")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  subCategory === "best"
                    ? "bg-[#c59b27] text-black shadow-md font-bold"
                    : "text-white/65 hover:text-white"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Best Packages of Temple Tours</span>
              </button>

              <button
                onClick={() => setSubCategory("state")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  subCategory === "state"
                    ? "bg-[#c59b27] text-black shadow-md font-bold"
                    : "text-white/65 hover:text-white"
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>State-wise Tours</span>
              </button>
            </div>

            {/* State filter chips when State-wise is selected */}
            {subCategory === "state" && (
              <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
                {[
                  { id: "all", label: "All States", count: ALL_PACKAGES.length },
                  { id: "tamilnadu", label: "Tamil Nadu", count: ALL_PACKAGES.filter(p => p.state.includes("tamil") || p.stateLabel.toLowerCase().includes("tamil")).length },
                  { id: "kerala", label: "Kerala", count: ALL_PACKAGES.filter(p => p.state.includes("kerala") || p.stateLabel.toLowerCase().includes("kerala")).length },
                  { id: "multi", label: "Multi-State Circuits", count: ALL_PACKAGES.filter(p => p.stateLabel.toLowerCase().includes("multi") || p.stateLabel.includes("&")).length },
                  { id: "north", label: "Uttar Pradesh & North", count: ALL_PACKAGES.filter(p => p.state.includes("uttar") || p.category === "north").length },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedState(s.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedState === s.id
                        ? "bg-white/20 text-white border border-[#c59b27]"
                        : "bg-white/5 text-white/60 hover:text-white border border-white/5"
                    }`}
                  >
                    <span>{s.label}</span>
                    <span className="text-[10px] text-[#c59b27] font-mono">({s.count})</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. Search and Duration Quick Bar */}
        <div className="bg-[#0b1013] border border-white/10 rounded-2xl p-3 sm:p-4 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search temple, city, or package..."
              className="w-full bg-[#12181d] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#c59b27] transition-colors"
            />
          </div>

          {/* Duration Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold mr-1 hidden sm:inline">
              DURATION:
            </span>
            {[
              { id: "all", label: "All Durations" },
              { id: "short", label: "1-3 Days" },
              { id: "medium", label: "4-6 Days" },
              { id: "long", label: "7+ Days" },
            ].map((dur) => (
              <button
                key={dur.id}
                onClick={() => setDurationFilter(dur.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  durationFilter === dur.id
                    ? "bg-[#c59b27]/20 text-[#e5b94c] border border-[#c59b27]/40"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {dur.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Packages Grid (Matches templestours.com layout, styled with Flynova luxury aesthetic) */}
        {filteredPackages.length === 0 ? (
          <div className="text-center py-16 bg-[#0b1013] rounded-3xl border border-white/10 p-8">
            <p className="text-white/60 text-sm mb-3">No packages found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setDurationFilter("all");
                setSelectedState("all");
                setActiveTab("individual");
                setSubCategory("best");
              }}
              className="text-xs text-[#c59b27] hover:underline font-semibold"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {(limit ? filteredPackages.slice(0, limit) : filteredPackages).map((pkg) => (
                <div
                  key={pkg.id}
                  className="group bg-[#0b1013] rounded-3xl overflow-hidden border border-white/10 hover:border-[#c59b27]/50 shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(197,155,39,0.15)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                >
                  <div>
                    {/* Photo Header (Clickable link to package details) */}
                    <Link href={`/package/${pkg.id}`} className="block relative h-56 sm:h-60 w-full overflow-hidden cursor-pointer">
                      <Image
                        src={pkg.image}
                        alt={pkg.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1013] via-[#0b1013]/30 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                        <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/15 uppercase tracking-wider">
                          {pkg.stateLabel}
                        </span>
                        <span className="bg-[#c59b27] text-black text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                          {pkg.duration}
                        </span>
                      </div>

                      {/* Package ID badge */}
                      <div className="absolute bottom-3 left-3 z-10">
                        <span className="bg-black/70 backdrop-blur-md text-[#e5b94c] font-mono text-[9px] font-bold px-2 py-0.5 rounded border border-[#c59b27]/30 uppercase">
                          {pkg.id.toUpperCase()}
                        </span>
                      </div>
                    </Link>

                    {/* Body Content */}
                    <div className="p-5 sm:p-6">
                      <Link href={`/package/${pkg.id}`}>
                        <h3 className="font-serif text-xl font-bold text-white mb-2 group-hover:text-[#c59b27] transition-colors leading-snug line-clamp-2">
                          {pkg.name}
                        </h3>
                      </Link>

                      <p className="text-xs text-white/60 font-light mb-4 line-clamp-2 leading-relaxed">
                        {pkg.description}
                      </p>

                      {/* Highlights tags */}
                      <div className="space-y-1.5 mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#c59b27] block">
                          KEY HIGHLIGHTS:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {pkg.highlights.slice(0, 3).map((h, i) => (
                            <span
                              key={i}
                              className="text-[11px] bg-white/5 border border-white/10 text-white/80 px-2 py-0.5 rounded-md font-light truncate max-w-[200px]"
                            >
                              {h}
                            </span>
                          ))}
                          {pkg.highlights.length > 3 && (
                            <span className="text-[10px] text-[#c59b27] font-semibold self-center ml-1">
                              +{pkg.highlights.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Features Strip */}
                      <div className="flex items-center flex-wrap gap-2 text-[11px] text-white/60 pt-3 border-t border-white/10">
                        <span className="inline-flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-[#c59b27]" />
                          <span>{pkg.accommodation}</span>
                        </span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1">
                          <Car className="w-3.5 h-3.5 text-[#c59b27]" />
                          <span>{pkg.transport}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Tour Itinerary & Navigation */}
                  <div className="p-5 sm:p-6 pt-3 border-t border-white/10 bg-[#090d10] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#c59b27] uppercase tracking-widest block font-bold leading-none mb-1">
                        TOUR ITINERARY
                      </span>
                      <div className="text-sm sm:text-base font-serif font-bold text-white leading-snug">
                        {pkg.duration}
                      </div>
                      <span className="text-[10px] text-white/50">Custom Quote on Request</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/package/${pkg.id}`}
                        className="group/btn bg-[#182025] hover:bg-[#c59b27] text-white hover:text-black font-semibold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition-all duration-300 shadow-md cursor-pointer border border-white/10"
                      >
                        <span>View Package</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More CTA Button (When limit is provided and more packages exist) */}
            {limit && filteredPackages.length > limit && (
              <div className="mt-12 sm:mt-16 flex flex-col items-center justify-center text-center">
                <Link
                  href="/packages"
                  className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#dcb037] via-[#edd382] to-[#c59b27] text-[#080a0c] font-serif font-bold text-sm sm:text-base px-9 sm:px-12 py-4 rounded-2xl shadow-[0_10px_35px_rgba(220,176,55,0.35)] hover:shadow-[0_15px_45px_rgba(220,176,55,0.55)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <span>View All 28+ Packages</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
                </Link>
                <p className="text-xs text-white/50 mt-3 font-light">
                  Explore complete itineraries, group yatras, senior citizen tours &amp; state-wise circuits
                </p>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}
