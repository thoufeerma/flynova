"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, Car, Star, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PackagesExplorerSection from "@/components/PackagesExplorerSection";
import TripModal from "@/components/TripModal";

export default function PackagesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [prefillDest, setPrefillDest] = useState("");

  const handleOpenModal = (pkgName?: string) => {
    setPrefillDest(pkgName || "South India Temple Tour Package");
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#07090b] text-white flex flex-col selection:bg-[#dcb037] selection:text-black">
      {/* 1. Header with updated navigation ("Packages") */}
      <Header onOpenPlanModal={() => handleOpenModal()} />

      {/* Breadcrumbs */}
      <div className="border-b border-white/10 bg-[#090d10] py-3 px-6 mt-16 sm:mt-20">
        <div className="max-w-[1360px] mx-auto flex items-center gap-2 text-xs text-white/50">
          <Link href="/" className="hover:text-[#c59b27] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#c59b27] font-medium">Tour Packages</span>
        </div>
      </div>

      {/* 2. Top Banner Header (Matches templestours.com/#packages theme) */}
      <section className="relative pt-10 pb-8 sm:pt-14 sm:pb-12 bg-gradient-to-b from-[#0b1013] to-[#07090b] border-b border-white/10">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c59b27]/15 border border-[#c59b27]/30 text-[#e5b94c] text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>28 Handcrafted Circuits · 100% Private & Customizable</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.15] mb-4">
              Tour Packages
            </h1>
            <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed mb-6">
              Explore our comprehensive collection of pilgrimage yatras, heritage circuits, and holiday retreats across South &amp; North India. Select any package below to inspect the day-by-day itinerary, hotel tiers, and request a personalized quotation.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-white/60">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#c59b27]" />
                <span>Govt. Registered LLP</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Car className="w-4 h-4 text-[#c59b27]" />
                <span>Private AC Chauffeur Included</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-[#c59b27] text-[#c59b27]" />
                <span>4.9/5 Rating (50,000+ Devotees)</span>
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
