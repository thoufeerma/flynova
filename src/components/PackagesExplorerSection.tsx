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
import { SITE_CONFIG } from "@/data/siteConfig";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import SectionHeading from "@/components/ui/SectionHeading";
import PrimaryButton from "@/components/ui/PrimaryButton";

interface PackagesExplorerSectionProps {
  onSelectPackage?: (pkgName: string) => void;
  limit?: number;
}

export default function PackagesExplorerSection({ onSelectPackage, limit }: PackagesExplorerSectionProps) {
  // Main Category Tab (Individual, Group, Senior, North, Special)
  const [activeTab, setActiveTab] = useState<"individual" | "group" | "senior" | "north" | "special" | "kerala" | "hillstation">("individual");
  
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
        return pkg.category === "group";
      }
      if (activeTab === "kerala") {
        return pkg.category === "kerala" || pkg.state === "kerala";
      }
      if (activeTab === "hillstation") {
        return pkg.category === "hillstation";
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
      if (selectedState === "karnataka") {
        return pkg.state.includes("karnataka") || pkg.stateLabel.toLowerCase().includes("karnataka");
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
    <section id="packages" className="py-16 sm:py-24 bg-dark-deep text-white relative overflow-hidden border-t border-white/10">
      
      {/* Background Ambience Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gold-base/5 blur-[200px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#23434d]/10 blur-[180px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-gold-base/60" />
            <SectionEyebrow as="span" className="mb-0 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-base" />
              EXPLORE OUR PACKAGES
            </SectionEyebrow>
            <span className="w-6 h-px bg-gold-base/60" />
          </div>

          <SectionHeading level={2} highlight={<span className="italic font-normal">Heritage Tours</span>} className="mb-4">
            Divine Temple &amp;
          </SectionHeading>

          <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
            {SITE_CONFIG.packageCount} handpicked pilgrimage itineraries across Tamil Nadu, Kerala, Karnataka, Andhra Pradesh &amp; North India with private AC transport, premium hotels, dedicated chauffeur, and VIP darshan assistance.
          </p>
        </div>

        {/* 1. Main Category Tabs (Matches reference design) */}
        <div className="flex items-center justify-start lg:justify-center gap-2.5 sm:gap-3.5 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          {[
            {
              id: "individual" as const,
              label: "Individual & Family",
              onClick: () => {
                setActiveTab("individual");
                setSubCategory("best");
              },
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-5.5 sm:h-5.5">
                  <circle cx="8.5" cy="8" r="3.2" />
                  <path d="M2.8 18.5c0-3.3 2.6-5.4 5.7-5.4 1.8 0 3.3.7 4.3 1.9" />
                  <circle cx="16" cy="10" r="2.4" />
                  <path d="M13.8 18.5c0-2.2 1.6-3.7 3.7-3.7 1.4 0 2.5.6 3.2 1.6" />
                </svg>
              ),
            },
            {
              id: "group" as const,
              label: "Group Yatras",
              onClick: () => setActiveTab("group"),
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-5.5 sm:h-5.5">
                  <circle cx="8.5" cy="8" r="3.2" />
                  <path d="M2.8 18.5c0-3.3 2.6-5.4 5.7-5.4 1.8 0 3.3.7 4.3 1.9" />
                  <circle cx="16" cy="10" r="2.4" />
                  <path d="M13.8 18.5c0-2.2 1.6-3.7 3.7-3.7 1.4 0 2.5.6 3.2 1.6" />
                </svg>
              ),
            },
            {
              id: "senior" as const,
              label: "Senior Citizens",
              onClick: () => setActiveTab("senior"),
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-5.5 sm:h-5.5">
                  <path d="M19.5 13.572l-7.5 7.428l-7.5-7.428A5 5 0 1 1 12 6.586a5 5 0 1 1 7.5 6.986Z" />
                </svg>
              ),
            },
            {
              id: "north" as const,
              label: "North India",
              onClick: () => setActiveTab("north"),
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-5.5 sm:h-5.5">
                  <line x1="12" y1="3" x2="12" y2="5.5" />
                  <circle cx="12" cy="5.5" r="0.8" fill="currentColor" />
                  <path d="M12 6.2c-2.8 2-4 4.5-4 6.8h8c0-2.3-1.2-4.8-4-6.8Z" />
                  <line x1="10" y1="9" x2="10" y2="13" />
                  <line x1="14" y1="9" x2="14" y2="13" />
                  <path d="M5.5 14h2.5v6H5.5z" />
                  <path d="M16 14h2.5v6H16z" />
                  <path d="M8 13h8v7H8z" />
                  <path d="M10.5 20v-3a1.5 1.5 0 0 1 3 0v3" />
                  <line x1="4" y1="20" x2="20" y2="20" />
                </svg>
              ),
            },
            {
              id: "special" as const,
              label: "Special Yatras",
              onClick: () => setActiveTab("special"),
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-5.5 sm:h-5.5">
                  <path d="M12 4.5C8.8 8.5 7.8 12 8.2 15c.5 1.6 2 2.3 3.8 2.3s3.3-.7 3.8-2.3c.4-3-.6-6.5-3.8-10.5Z" />
                  <line x1="12" y1="4.5" x2="12" y2="19.5" />
                  <line x1="10" y1="17.2" x2="14" y2="17.2" />
                </svg>
              ),
            },
            {
              id: "kerala" as const,
              label: "Kerala Tours",
              onClick: () => setActiveTab("kerala"),
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-5.5 sm:h-5.5">
                  <line x1="12" y1="11" x2="12" y2="20.5" />
                  <line x1="10.5" y1="20.5" x2="13.5" y2="20.5" />
                  <path d="M12 11c-2.5-3-6-3-8.5-1.5" />
                  <path d="M12 12c-3.5-1-6.5.5-8 3" />
                  <path d="M12 13c-2 1-4.5 1.5-6.5 4" />
                  <path d="M12 11c2.5-3 6-3 8.5-1.5" />
                  <path d="M12 12c3.5-1 6.5.5 8 3" />
                  <path d="M12 13c2 1 4.5 1.5 6.5 4" />
                </svg>
              ),
            },
            {
              id: "hillstation" as const,
              label: "Hill Stations",
              onClick: () => setActiveTab("hillstation"),
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-5.5 sm:h-5.5">
                  <path d="M12 6L7.5 13L12 18L16.5 13L12 6Z" />
                  <path d="M2.5 19L5.5 11.5L7.5 13" />
                  <path d="M21.5 19L18.5 11.5L16.5 13" />
                  <line x1="12" y1="18" x2="12" y2="20.5" />
                </svg>
              ),
            },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={tab.onClick}
                className={`group relative flex flex-col items-center justify-center gap-2.5 px-3 py-3 sm:px-4 sm:py-3.5 rounded-2xl transition-all duration-300 cursor-pointer flex-shrink-0 min-w-[102px] sm:min-w-[122px] md:min-w-[130px] border ${
                  isActive
                    ? "bg-[#14120e]/95 border-[#e5a93c] text-white shadow-[0_8px_30px_rgba(229,169,60,0.18)]"
                    : "bg-[#0f1116]/80 border-white/10 text-white/70 hover:text-white hover:border-white/25 hover:bg-[#151821]/80"
                }`}
              >
                {/* Icon Squircle Box */}
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-b from-[#e5a93c] via-[#dcb037] to-[#c59324] text-[#141008] shadow-[0_4px_16px_rgba(220,176,55,0.4)]"
                      : "bg-[#181920]/80 border border-[#e5a93c]/25 text-[#e5a93c] group-hover:border-[#e5a93c]/50 group-hover:bg-white/[0.05]"
                  }`}
                >
                  {tab.icon}
                </div>

                {/* Text Label */}
                <span
                  className={`text-xs sm:text-[13px] whitespace-nowrap tracking-tight transition-colors ${
                    isActive ? "text-white font-medium" : "text-[#a1a1aa] group-hover:text-white font-normal"
                  }`}
                >
                  {tab.label}
                </span>

                {/* Active Pill Indicator on Bottom Edge */}
                {isActive && (
                  <span className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-10 sm:w-12 h-[3px] bg-gradient-to-r from-[#dcb037] via-[#f3cb6b] to-[#dcb037] rounded-full shadow-[0_0_10px_rgba(229,169,60,0.8)] pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>

        {/* 2. Sub-Category Toggle (under Individual/Family): Best Packages vs State-wise */}
        {(activeTab === "individual") && (
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="inline-flex items-center bg-dark-surface p-1.5 rounded-2xl border border-white/10 mb-5 shadow-lg">
              <button
                onClick={() => setSubCategory("best")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  subCategory === "best"
                    ? "bg-gold-base text-black shadow-md font-bold"
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
                    ? "bg-gold-base text-black shadow-md font-bold"
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
                  { id: "karnataka", label: "Karnataka", count: ALL_PACKAGES.filter(p => p.state.includes("karnataka") || p.stateLabel.toLowerCase().includes("karnataka")).length },
                  { id: "multi", label: "Multi-State Circuits", count: ALL_PACKAGES.filter(p => p.stateLabel.toLowerCase().includes("multi") || p.stateLabel.includes("&")).length },
                  { id: "north", label: "Uttar Pradesh & North", count: ALL_PACKAGES.filter(p => p.state.includes("uttar") || p.category === "north").length },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedState(s.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedState === s.id
                        ? "bg-white/20 text-white border border-gold-base"
                        : "bg-white/5 text-white/60 hover:text-white border border-white/5"
                    }`}
                  >
                    <span>{s.label}</span>
                    <span className="text-[10px] text-gold-base font-manrope font-semibold">({s.count})</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. Search and Duration Quick Bar */}
        <div className="bg-dark-surface border border-white/10 rounded-2xl p-3 sm:p-4 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search temple, city, or package..."
              className="w-full bg-dark-elevated border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-gold-base transition-colors"
            />
          </div>

          {/* Duration Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold mr-1 hidden sm:inline font-sans">
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
                    ? "bg-gold-base/20 text-gold-light border border-gold-base/40"
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
          <div className="text-center py-16 bg-dark-surface rounded-3xl border border-white/10 p-8">
            <p className="text-white/60 text-sm mb-3">No packages found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setDurationFilter("all");
                setSelectedState("all");
                setActiveTab("individual" as const);
                setSubCategory("best");
              }}
              className="text-xs text-gold-base hover:underline font-semibold"
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
                  className="group bg-dark-surface rounded-3xl overflow-hidden border border-white/10 hover:border-gold-base/50 shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(197,155,39,0.15)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
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
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-dark-surface/30 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                        <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/15 uppercase tracking-wider">
                          {pkg.stateLabel}
                        </span>
                        <span className="bg-gold-base text-black text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md font-manrope">
                          {pkg.duration}
                        </span>
                      </div>

                      {/* Package ID badge */}
                      <div className="absolute bottom-3 left-3 z-10">
                        <span className="bg-black/70 backdrop-blur-md text-gold-light font-mono text-[9px] font-bold px-2 py-0.5 rounded border border-gold-base/30 uppercase">
                          {pkg.id.toUpperCase()}
                        </span>
                      </div>
                    </Link>

                    {/* Body Content */}
                    <div className="p-5 sm:p-6">
                      <Link href={`/package/${pkg.id}`}>
                        <h3 className="font-serif font-playfair text-xl sm:text-[1.3rem] font-normal text-white mb-2 group-hover:text-[#f3cb6b] transition-colors leading-snug line-clamp-2">
                          {pkg.name}
                        </h3>
                      </Link>

                      <p className="text-xs text-white/60 font-light mb-4 line-clamp-2 leading-relaxed">
                        {pkg.description}
                      </p>

                      {/* Highlights tags */}
                      <div className="space-y-1.5 mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gold-base block font-sans">
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
                            <span className="text-[10px] text-gold-base font-semibold self-center ml-1">
                              +{pkg.highlights.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Features Strip */}
                      <div className="flex items-center flex-wrap gap-2 text-[11px] text-white/60 pt-3 border-t border-white/10">
                        <span className="inline-flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-gold-base" />
                          <span>{pkg.accommodation}</span>
                        </span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1">
                          <Car className="w-3.5 h-3.5 text-gold-base" />
                          <span>{pkg.transport}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Tour Itinerary & Navigation */}
                  <div className="p-5 sm:p-6 pt-3 border-t border-white/10 bg-dark-elevated flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gold-base uppercase tracking-widest block font-bold leading-none mb-1 font-sans">
                        TOUR ITINERARY
                      </span>
                      <div className="text-sm sm:text-base font-serif font-playfair font-normal text-white leading-snug">
                        {pkg.duration}
                      </div>
                      <span className="text-[10px] text-white/50 font-sans">Custom Quote on Request</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/package/${pkg.id}`}
                        className="group/btn bg-dark-highlight hover:bg-gold-base text-white hover:text-black font-semibold text-xs py-2 px-3.5 sm:px-4 rounded-full flex items-center gap-1.5 transition-all duration-300 shadow-md cursor-pointer border border-white/10"
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
                <PrimaryButton
                  href="/packages"
                  className="px-9 sm:px-12 py-4"
                  icon={<ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />}
                >
                  View All {SITE_CONFIG.packageCount} Packages
                </PrimaryButton>
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
