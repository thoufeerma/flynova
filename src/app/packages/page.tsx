"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Car, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PackagesExplorerSection from "@/components/PackagesExplorerSection";
import TripModal from "@/components/TripModal";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function PackagesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [prefillDest, setPrefillDest] = useState("");

  const handleOpenModal = (pkgName?: string) => {
    setPrefillDest(pkgName || "South India Temple Tour Package");
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-dark-deep text-white flex flex-col selection:bg-gold-base selection:text-black">
      {/* 1. Header with updated navigation ("Packages") */}
      <Header onOpenPlanModal={() => handleOpenModal()} />

      {/* Breadcrumbs */}
      <div className="border-b border-white/10 bg-dark-surface py-3 px-6 mt-16 sm:mt-20">
        <div className="max-w-[1360px] mx-auto flex items-center gap-2 text-xs text-white/50">
          <Link href="/" className="hover:text-gold-base transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gold-base font-medium">Tour Packages</span>
        </div>
      </div>

      {/* 2. Top Banner Header with Clean Atmospheric Temple Background */}
      <section className="relative pt-12 pb-12 sm:pt-16 sm:pb-16 overflow-hidden border-b border-white/10 bg-[#07090e]">
        {/* Background Image Container with Professional Vignettes */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <Image
            src="/images/packages-hero-bg.jpg"
            alt="Ancient Indian Temple Heritage"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%] opacity-40 scale-105"
          />
          {/* Deep dark horizontal gradient from left so text is 100% legible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#06080e]/95 via-[#06080e]/85 to-[#06080e]/40" />
          {/* Top and bottom subtle blending gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-deep via-transparent to-black/50" />
          {/* Subtle gold ambient glow in bottom corner */}
          <div className="absolute -bottom-10 left-1/4 w-[500px] h-[300px] bg-gold-base/5 blur-[160px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-[1360px] mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="font-serif font-playfair text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.15] mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
              Tour Packages
            </h1>
            <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Explore our comprehensive collection of pilgrimage yatras, heritage circuits, and holiday retreats across South &amp; North India. Select any package below to inspect the day-by-day itinerary, hotel tiers, and request a personalized quotation.
            </p>

            {/* Trust Badges with Frosted Glass Backdrop */}
            <div className="inline-flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-white/80 bg-black/45 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10 shadow-lg">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gold-base" />
                <span>Govt. Registered LLP</span>
              </div>
              <span className="text-white/20 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <Car className="w-4 h-4 text-gold-base" />
                <span>Private AC Chauffeur Included</span>
              </div>
              <span className="text-white/20 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-gold-base text-gold-base" />
                <span>4.9/5 Rating ({SITE_CONFIG.ratingLabel})</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Packages Explorer Section (Interactive filters, tabs, search, 28 package cards) */}
      <PackagesExplorerSection onSelectPackage={handleOpenModal} />

      {/* 4. Footer */}
      <Footer />

      {/* Trip Planner Interactive Modal */}
      <TripModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        prefill={{
          destination: prefillDest,
        }}
      />
    </main>
  );
}
