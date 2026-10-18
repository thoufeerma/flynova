"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  Car,
  CheckCircle2,
  XCircle,
  Star,
  ShieldCheck,
  Phone,
  MessageCircle,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Building2,
  Compass,
  Heart,
  Users,
  Award,
  AlertCircle
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TripModal from "@/components/TripModal";
import { PACKAGE_BY_ID, ALL_PACKAGES, PackageItem } from "@/data/packagesData";

export default function DynamicPackageDetailPage() {
  const params = useParams();
  const rawId = (params?.id as string) || "bsi-18";
  const id = rawId.toLowerCase();

  const pkg: PackageItem = PACKAGE_BY_ID[id] || PACKAGE_BY_ID["bsi-18"];

  const [selectedTier, setSelectedTier] = useState<"standard" | "deluxe" | "luxury">("deluxe");
  const [activeDay, setActiveDay] = useState<number>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const whatsappMessage = encodeURIComponent(
    `Hello Flynova Reisen, I am interested in Package ${pkg.id.toUpperCase()}: ${pkg.name} (${selectedTier.toUpperCase()} tier). Please send me a customized quotation and availability for my travel dates.`
  );

  // Suggested packages (other 3 packages)
  const relatedPackages = ALL_PACKAGES.filter((p) => p.id !== pkg.id).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#07090b] text-white flex flex-col selection:bg-[#dcb037] selection:text-black">
      {/* 1. Header Navigation */}
      <Header onOpenPlanModal={() => setModalOpen(true)} />

      {/* Breadcrumbs Bar */}
      <div className="border-b border-white/10 bg-[#090d10] py-3 px-6 mt-16 sm:mt-20">
        <div className="max-w-[1360px] mx-auto flex items-center gap-2 text-xs text-white/50">
          <Link href="/" className="hover:text-[#c59b27] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/packages" className="hover:text-[#c59b27] transition-colors">
            Packages
          </Link>
          <span>/</span>
          <span className="text-white/80 truncate">
            {pkg.name} ({pkg.id.toUpperCase()})
          </span>
        </div>
      </div>

      {/* 2. Hero Package Showcase Section */}
      <section className="relative pt-8 pb-16 lg:pb-24 overflow-hidden border-b border-white/10">
        {/* Background glow effects */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#c59b27]/8 blur-[200px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#23434d]/15 blur-[180px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-[1360px] mx-auto px-6">
          
          {/* Top Badges Row */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-[#c59b27] text-black font-bold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider shadow-[0_0_15px_rgba(197,155,39,0.4)]">
              {pkg.stateLabel}
            </span>
            <span className="bg-white/10 border border-white/15 text-white/90 font-mono text-[11px] px-3 py-1 rounded-full uppercase">
              CODE: {pkg.id.toUpperCase()}
            </span>
            <span className="flex items-center gap-1 bg-[#0f1715] border border-[#c59b27]/30 text-[#e5b94c] text-xs font-semibold px-3 py-1 rounded-full">
              <Star className="w-3.5 h-3.5 fill-[#e5b94c] text-[#e5b94c]" />
              <span>4.9 / 5.0 (850+ Pilgrims Guided)</span>
            </span>
            <span className="text-xs text-white/60 flex items-center gap-1.5 ml-auto hidden sm:flex">
              <ShieldCheck className="w-4 h-4 text-[#c59b27]" />
              <span>Government Registered LLP · 100% Guaranteed Departures</span>
            </span>
          </div>

          {/* Main Title & Subtitle */}
          <div className="max-w-4xl mb-8">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] font-bold text-white tracking-tight leading-[1.15] mb-4">
              {pkg.name}
            </h1>
            <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
              {pkg.description}
            </p>
          </div>

          {/* Key Info Strip Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
            <div className="bg-[#0f1418] border border-white/10 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-[#c59b27]/15 border border-[#c59b27]/30 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-[#c59b27]" />
              </div>
              <div>
                <span className="text-[10px] text-white/40 uppercase tracking-wider block font-bold">DURATION</span>
                <span className="text-sm sm:text-base font-bold text-white">{pkg.duration}</span>
              </div>
            </div>

            <div className="bg-[#0f1418] border border-white/10 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-[#c59b27]/15 border border-[#c59b27]/30 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#c59b27]" />
              </div>
              <div>
                <span className="text-[10px] text-white/40 uppercase tracking-wider block font-bold">REGION</span>
                <span className="text-sm sm:text-base font-bold text-white">{pkg.stateLabel}</span>
              </div>
            </div>

            <div className="bg-[#0f1418] border border-white/10 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-[#c59b27]/15 border border-[#c59b27]/30 flex items-center justify-center flex-shrink-0">
                <Car className="w-5 h-5 text-[#c59b27]" />
              </div>
              <div>
                <span className="text-[10px] text-white/40 uppercase tracking-wider block font-bold">TRANSPORT</span>
                <span className="text-sm sm:text-base font-bold text-white">{pkg.transport}</span>
              </div>
            </div>

            <div className="bg-[#0f1418] border border-white/10 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-[#c59b27]/15 border border-[#c59b27]/30 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-[#c59b27]" />
              </div>
              <div>
                <span className="text-[10px] text-white/40 uppercase tracking-wider block font-bold">TOUR TYPE</span>
                <span className="text-sm sm:text-base font-bold text-white">Private / Customizable</span>
              </div>
            </div>
          </div>

          {/* Interactive Route Trail Visual */}
          <div className="bg-[#0b1013] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-2xl">
            <span className="text-[10px] font-bold text-[#c59b27] uppercase tracking-[0.25em] block mb-3">
              JOURNEY KEY HIGHLIGHTS TRAIL
            </span>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium">
              {pkg.highlights.map((h, i) => (
                <React.Fragment key={i}>
                  <span className="bg-white/10 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#c59b27]" />
                    {h}
                  </span>
                  {i < pkg.highlights.length - 1 && (
                    <span className="text-[#c59b27] font-bold">➔</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3. Main Content: Itinerary & Sticky Booking Sidebar */}
      <section className="py-12 lg:py-16 bg-[#07090b]">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left 8 Columns: Itinerary & Details */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Hotel Tier Selector */}
              <div className="bg-[#0b1013] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c59b27] block mb-1">
                      CHOOSE YOUR ACCOMMODATION CLASS
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                      Curated Hotel Packages
                    </h2>
                  </div>
                  <span className="text-xs text-white/50">All options include Private AC Chauffeur</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Standard */}
                  <button
                    type="button"
                    onClick={() => setSelectedTier("standard")}
                    className={`p-4 rounded-2xl text-left border transition-all cursor-pointer relative ${
                      selectedTier === "standard"
                        ? "bg-[#182025] border-[#c59b27] shadow-[0_0_20px_rgba(197,155,39,0.25)]"
                        : "bg-[#0f1418] border-white/10 hover:border-white/30"
                    }`}
                  >
                    {selectedTier === "standard" && (
                      <span className="absolute -top-2.5 right-3 bg-[#c59b27] text-black text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        SELECTED
                      </span>
                    )}
                    <p className="text-xs font-bold text-white/90 mb-1">Standard 3★ Comfort</p>
                    <p className="text-sm font-semibold text-[#e5b94c] tracking-wide mb-2">
                      Comfort Class
                    </p>
                    <p className="text-[11px] text-white/60 mb-2 leading-snug">Well-appointed 3-star AC Hotels</p>
                    <span className="inline-block text-[10px] bg-white/5 text-white/70 px-2 py-0.5 rounded font-mono">
                      AC Sedan Chauffeur
                    </span>
                  </button>

                  {/* Deluxe */}
                  <button
                    type="button"
                    onClick={() => setSelectedTier("deluxe")}
                    className={`p-4 rounded-2xl text-left border transition-all cursor-pointer relative ${
                      selectedTier === "deluxe"
                        ? "bg-[#182025] border-[#c59b27] shadow-[0_0_20px_rgba(197,155,39,0.25)]"
                        : "bg-[#0f1418] border-white/10 hover:border-white/30"
                    }`}
                  >
                    {selectedTier === "deluxe" && (
                      <span className="absolute -top-2.5 right-3 bg-[#c59b27] text-black text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        MOST POPULAR
                      </span>
                    )}
                    <p className="text-xs font-bold text-white/90 mb-1">Deluxe 4★ Heritage</p>
                    <p className="text-sm font-semibold text-[#e5b94c] tracking-wide mb-2">
                      Heritage Class
                    </p>
                    <p className="text-[11px] text-white/60 mb-2 leading-snug">Handpicked 4-star Heritage Resorts</p>
                    <span className="inline-block text-[10px] bg-white/5 text-white/70 px-2 py-0.5 rounded font-mono">
                      AC Innova / Ertiga
                    </span>
                  </button>

                  {/* Luxury */}
                  <button
                    type="button"
                    onClick={() => setSelectedTier("luxury")}
                    className={`p-4 rounded-2xl text-left border transition-all cursor-pointer relative ${
                      selectedTier === "luxury"
                        ? "bg-[#182025] border-[#c59b27] shadow-[0_0_20px_rgba(197,155,39,0.25)]"
                        : "bg-[#0f1418] border-white/10 hover:border-white/30"
                    }`}
                  >
                    {selectedTier === "luxury" && (
                      <span className="absolute -top-2.5 right-3 bg-[#c59b27] text-black text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        VIP PALACE
                      </span>
                    )}
                    <p className="text-xs font-bold text-white/90 mb-1">Luxury 5★ Palace</p>
                    <p className="text-sm font-semibold text-[#e5b94c] tracking-wide mb-2">
                      Royal VIP Class
                    </p>
                    <p className="text-[11px] text-white/60 mb-2 leading-snug">5-star Signature Palaces / Resorts</p>
                    <span className="inline-block text-[10px] bg-white/5 text-white/70 px-2 py-0.5 rounded font-mono">
                      Innova Crysta VIP
                    </span>
                  </button>
                </div>
              </div>

              {/* Day-by-Day Interactive Detailed Itinerary */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c59b27] block mb-1">
                      DAY BY DAY SCHEDULE
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                      Detailed Tour Itinerary
                    </h2>
                  </div>
                  <span className="text-xs text-white/50 hidden sm:block">{pkg.duration} of Sacred Discovery</span>
                </div>

                {/* Day Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
                  {pkg.itinerary.map((item) => (
                    <button
                      key={item.day}
                      onClick={() => setActiveDay(item.day)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                        activeDay === item.day
                          ? "bg-[#c59b27] text-black font-bold shadow-md"
                          : "bg-[#0f1418] text-white/70 hover:text-white border border-white/10"
                      }`}
                    >
                      <span>Day {item.day}</span>
                    </button>
                  ))}
                </div>

                {/* Active Day Content Card */}
                {(() => {
                  const day = pkg.itinerary.find((d) => d.day === activeDay) || pkg.itinerary[0];
                  return (
                    <div className="bg-[#0b1013] border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300">
                      <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                        <Image
                          src={pkg.image}
                          alt={day.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 65vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1013] via-[#0b1013]/50 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6 z-10">
                          <span className="inline-block bg-[#c59b27] text-black text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider mb-2">
                            DAY {day.day} OF {pkg.days}
                          </span>
                          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                            {day.title}
                          </h3>
                        </div>
                      </div>

                      <div className="p-6 sm:p-8 space-y-6">
                        {/* Route & Distance Info */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-white/60 bg-[#12181d] p-3.5 rounded-xl border border-white/5">
                          <span className="flex items-center gap-1.5 text-white/90 font-medium">
                            <Compass className="w-4 h-4 text-[#c59b27]" />
                            {day.route}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1.5 text-[#e5b94c]">
                            <Car className="w-4 h-4" />
                            {day.distanceTime}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                          {day.description}
                        </p>

                        {/* Highlights checklist */}
                        {day.highlights && day.highlights.length > 0 && (
                          <div>
                            <span className="text-[11px] font-bold text-[#c59b27] uppercase tracking-wider block mb-2.5">
                              TODAY&apos;S KEY HIGHLIGHTS:
                            </span>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {day.highlights.map((h, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-white/85 font-normal">
                                  <CheckCircle2 className="w-4 h-4 text-[#c59b27] flex-shrink-0 mt-0.5" />
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Stay & Meal details */}
                        <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="bg-[#0f1418] p-3 rounded-xl border border-white/5">
                            <span className="text-[10px] text-white/40 uppercase tracking-wider block mb-1">
                              OVERNIGHT STAY
                            </span>
                            <span className="text-white/90 font-medium flex items-center gap-1.5">
                              <Building2 className="w-3.5 h-3.5 text-[#c59b27]" />
                              {day.stay}
                            </span>
                          </div>

                          <div className="bg-[#0f1418] p-3 rounded-xl border border-white/5">
                            <span className="text-[10px] text-white/40 uppercase tracking-wider block mb-1">
                              MEAL PLAN
                            </span>
                            <span className="text-white/90 font-medium flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
                              {day.meals}
                            </span>
                          </div>
                        </div>

                        {/* Navigation buttons */}
                        <div className="flex items-center justify-between pt-2">
                          <button
                            type="button"
                            disabled={day.day === 1}
                            onClick={() => setActiveDay((p) => Math.max(1, p - 1))}
                            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                          >
                            ← Previous Day
                          </button>
                          <button
                            type="button"
                            disabled={day.day === pkg.days}
                            onClick={() => setActiveDay((p) => Math.min(pkg.days, p + 1))}
                            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#c59b27] text-black hover:bg-[#e5b94c] disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer font-bold"
                          >
                            Next Day →
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Inclusions & Exclusions */}
              <div className="bg-[#0b1013] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
                <h2 className="font-serif text-2xl font-bold text-white mb-6">
                  Inclusions &amp; Exclusions
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Inclusions */}
                  <div>
                    <div className="flex items-center gap-2 text-sm font-bold text-[#c59b27] uppercase tracking-wider mb-4 pb-2 border-b border-[#c59b27]/30">
                      <CheckCircle2 className="w-4 h-4 text-[#c59b27]" />
                      <span>What&apos;s Included</span>
                    </div>
                    <ul className="space-y-3">
                      {[
                        `${pkg.nights} Nights luxury accommodation in twin-sharing rooms`,
                        "Daily buffet breakfast at all hotel restaurants",
                        `Dedicated Private AC ${pkg.transport} throughout the tour`,
                        "All interstate permits, toll taxes, fuel charges, parking & driver allowance",
                        "Airport / Railway station pickup and drop transfers",
                        "Comprehensive sightseeing as detailed in daily itinerary",
                        "24/7 Flynova local support and temple coordination"
                      ].map((inc, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-white/80 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exclusions */}
                  <div>
                    <div className="flex items-center gap-2 text-sm font-bold text-rose-400 uppercase tracking-wider mb-4 pb-2 border-b border-rose-400/30">
                      <XCircle className="w-4 h-4 text-rose-400" />
                      <span>What&apos;s Not Included</span>
                    </div>
                    <ul className="space-y-3">
                      {[
                        "Airfare or Train fare to and from tour starting/end points",
                        "Special temple pooja charges or VIP queue tickets (arranged on request)",
                        "Lunches and Dinners unless booked under Luxury tier",
                        "Personal expenses (laundry, room service, telephone)",
                        "Ferry or boat tickets not explicitly included",
                        "Any items not explicitly listed under Inclusions"
                      ].map((exc, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-white/70 leading-relaxed">
                          <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Temple Guidelines */}
              <div className="bg-gradient-to-br from-[#12181d] to-[#0b1013] border border-[#c59b27]/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
                <div className="flex items-center gap-2.5 text-[#c59b27] text-xs font-bold uppercase tracking-wider mb-3">
                  <AlertCircle className="w-4 h-4" />
                  <span>SACRED TEMPLE GUIDELINES &amp; DRESS CODES</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-3">
                  Pilgrimage Etiquette &amp; Tips
                </h3>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-4">
                  South &amp; North Indian temples preserve ancient spiritual protocols. Our private chauffeurs assist you with queue timings and lockers at each shrine.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-black/40 p-4 rounded-xl border border-white/10">
                    <span className="font-bold text-[#c59b27] block mb-1">
                      Temple Attire
                    </span>
                    <p className="text-white/70">
                      Modest traditional attire is recommended. For major Kerala shrines, dhotis (mundu) without shirts are required for men; sarees or modest suits for women.
                    </p>
                  </div>
                  <div className="bg-black/40 p-4 rounded-xl border border-white/10">
                    <span className="font-bold text-[#c59b27] block mb-1">
                      Gadgets &amp; Footwear
                    </span>
                    <p className="text-white/70">
                      Mobile phones and leather articles are restricted inside sanctum sanctorums. Official safe deposit counters are available at temple gates.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQs Accordion */}
              <div className="bg-[#0b1013] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
                <h2 className="font-serif text-2xl font-bold text-white mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {[
                    {
                      q: `Can this ${pkg.duration} tour be customized for families or senior citizens?`,
                      a: "Yes! All Flynova itineraries are 100% private and customizable. We can adjust the pacing, add extra destinations, arrange wheelchair assistance, and select elder-friendly hotels."
                    },
                    {
                      q: "What vehicle is provided for this package?",
                      a: `We provide a dedicated private air-conditioned vehicle (${pkg.transport}) throughout the entire tour with a professional chauffeur experienced in temple routes.`
                    },
                    {
                      q: "How do we confirm our booking with Flynova Reisen LLP?",
                      a: "You can book directly by clicking 'Book / Customize This Tour' or contacting us via WhatsApp. A nominal 25% deposit secures your dates, vehicle, and hotel reservations."
                    }
                  ].map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div
                        key={idx}
                        className="border border-white/10 rounded-2xl overflow-hidden transition-all"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-[#0f1418] hover:bg-[#141b21] transition-all cursor-pointer"
                        >
                          <span className="font-serif text-sm sm:text-base font-bold text-white/90 pr-4">
                            {faq.q}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-[#c59b27] flex-shrink-0 transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="p-4 sm:p-5 bg-[#0b1013] text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/5">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right 4 Columns: Sticky Booking & Inquiry Card */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                
                {/* Bespoke Booking & Inquiry Card */}
                <div className="bg-[#0b1013] border border-[#c59b27]/40 rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
                  
                  {/* Glowing Top Ribbon */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#c59b27] via-[#f5c759] to-[#c59b27]" />

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold text-[#c59b27] uppercase tracking-[0.25em]">
                      PRIVATE JOURNEY
                    </span>
                    <span className="text-[10px] bg-[#c59b27]/15 text-[#e5b94c] px-2.5 py-0.5 rounded-full font-bold">
                      EXCLUSIVE CONCIERGE
                    </span>
                  </div>

                  {/* Bespoke Quote Headline */}
                  <div className="mb-2">
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight block">
                      Custom Quote on Request
                    </span>
                    <span className="text-xs text-[#c59b27] font-medium">Bespoke pricing tailored to your group &amp; dates</span>
                  </div>
                  <p className="text-[11px] text-white/60 mb-5">
                    Includes dedicated private AC chauffeur, verified hotel stays &amp; daily breakfast
                  </p>

                  {/* Selected Tier Summary */}
                  <div className="bg-[#12181d] rounded-2xl p-4 border border-white/10 mb-5">
                    <span className="text-[9px] font-bold text-[#c59b27] uppercase tracking-wider block mb-1">
                      CURRENT SELECTION
                    </span>
                    <p className="text-xs font-bold text-white uppercase">{selectedTier} CLASS</p>
                    <p className="text-[11px] text-white/60 mt-0.5">{pkg.accommodation}</p>
                    <p className="text-[11px] text-[#e5b94c] mt-1 font-mono">{pkg.transport}</p>
                  </div>

                  {/* Primary CTA: Book / Customize */}
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => setModalOpen(true)}
                      className="w-full group bg-gradient-to-r from-[#c59b27] to-[#e5b94c] hover:from-[#dcb037] hover:to-[#ffd56b] text-black font-bold text-sm py-4 rounded-2xl flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(197,155,39,0.35)] hover:shadow-[0_15px_35px_rgba(197,155,39,0.5)] transition-all cursor-pointer"
                    >
                      <span>BOOK / CUSTOMIZE THIS TOUR</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>

                    {/* WhatsApp Direct Specialist CTA */}
                    <a
                      href={`https://wa.me/917994288424?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#1b2b23] hover:bg-[#233b2e] border border-emerald-500/30 text-emerald-300 font-semibold text-xs py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>Chat with Travel Specialist</span>
                    </a>

                    {/* Call Concierge */}
                    <a
                      href="tel:+917994288424"
                      className="w-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs py-3 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/10"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#c59b27]" />
                      <span>Call Concierge: +91 79942 88424</span>
                    </a>
                  </div>

                  {/* Trust guarantees */}
                  <div className="pt-5 mt-5 border-t border-white/10 space-y-2 text-[11px] text-white/60">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#c59b27]" />
                      <span>Zero booking commission &amp; transparent billing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#c59b27]" />
                      <span>TripAdvisor / Google 4.9★ Certified Partner</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-[#c59b27]" />
                      <span>Air-conditioned vehicles with sanitized interiors</span>
                    </div>
                  </div>

                </div>

                {/* Flynova Reisen LLP Company Card */}
                <div className="bg-[#0b1013] border border-white/10 rounded-3xl p-5 shadow-xl text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#c59b27]/10 flex items-center justify-center mb-3">
                    <Heart className="w-5 h-5 text-[#c59b27]" />
                  </div>
                  <h4 className="font-serif text-base font-bold text-white mb-1">
                    Flynova Reisen LLP
                  </h4>
                  <p className="text-[11px] text-white/60 leading-relaxed mb-3">
                    Door No. 37/103-B, Mathirappilly, Kothamangalam, Ernakulam, Kerala - 686691.
                  </p>
                  <span className="text-[10px] text-[#c59b27] font-semibold uppercase tracking-widest block">
                    Govt. of India Registered LLP
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Related Recommended Packages */}
      <section className="py-16 bg-[#05080a] border-t border-white/10">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-[10px] font-bold text-[#c59b27] uppercase tracking-[0.25em] block mb-1">
                MORE SACRED JOURNEYS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                You May Also Like
              </h2>
            </div>
            <Link
              href="/#packages"
              className="text-xs text-[#c59b27] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>View all packages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPackages.map((rel) => (
              <Link
                key={rel.id}
                href={`/package/${rel.id}`}
                className="group bg-[#0b1013] rounded-2xl overflow-hidden border border-white/10 hover:border-[#c59b27]/40 transition-all p-4 flex flex-col justify-between"
              >
                <div className="relative h-44 w-full rounded-xl overflow-hidden mb-3">
                  <Image
                    src={rel.image}
                    alt={rel.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-[10px] font-bold text-white px-2 py-0.5 rounded-full border border-white/20">
                    {rel.duration}
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-white group-hover:text-[#c59b27] transition-colors line-clamp-1 mb-1">
                  {rel.name}
                </h3>
                <p className="text-xs text-white/50 line-clamp-1 mb-3">{rel.highlights.join(" • ")}</p>
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-xs font-semibold text-[#c59b27] uppercase tracking-wider">Bespoke Tour</span>
                  <span className="text-xs text-white/60 flex items-center gap-1 group-hover:text-[#c59b27]">
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <Footer />

      {/* Trip Planner Interactive Modal */}
      <TripModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        prefill={{
          destination: `${pkg.name} (${pkg.id.toUpperCase()})`,
        }}
      />
    </main>
  );
}
