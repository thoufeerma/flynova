"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  ArrowRight, 
  Plane, 
  MapPin, 
  Building2, 
  FileCheck2, 
  Palmtree, 
  Car, 
  Heart, 
  Compass, 
  CheckCircle2, 
  ShieldCheck, 
  Headphones, 
  Sparkles,
  Award
} from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import SectionHeading from "@/components/ui/SectionHeading";

interface ServicesSectionProps {
  onOpenPlanModal: (serviceName?: string) => void;
}

interface ServiceItem {
  id: string;
  title: string;
  category: "transport" | "packages" | "stays";
  badge: string;
  desc: string;
  image: string;
  alt: string;
  icon: React.ElementType;
  perks: string[];
}

const ALL_SERVICES: ServiceItem[] = [
  {
    id: "flights",
    title: "Flight Ticket Booking",
    category: "transport",
    badge: "Instant Air Ticketing",
    desc: "Seamless domestic & international flight reservations with negotiated corporate fares, instant confirmations, and flexible rescheduling.",
    image: "/images/flight-booking.jpg",
    alt: "Commercial passenger aircraft soaring above clouds",
    icon: Plane,
    perks: [
      "Lowest available airfare deals",
      "Domestic & international routes",
      "24/7 rebooking & ticket changes"
    ],
  },
  {
    id: "domestic-packages",
    title: "Domestic Tour Packages",
    category: "packages",
    badge: "Handcrafted Circuits",
    desc: "Curated cultural & temple yatras, hill station retreats, and wildlife expeditions across South and North India tailored to your exact pace.",
    image: "/images/domestic-packages.jpg",
    alt: "Heritage mountain railway scenic train journey across India",
    icon: MapPin,
    perks: [
      "40+ temple & heritage circuits",
      "Private AC vehicles throughout",
      "100% custom day-by-day plans"
    ],
  },
  {
    id: "hotels",
    title: "Hotel Reservations",
    category: "stays",
    badge: "Verified 3★ to 5★ Stays",
    desc: "Comfortable pilgrimage lodges, 4-star city hotels, and 5-star beachfront resorts handpicked for impeccable hygiene, safety, and comfort.",
    image: "/images/hotel-booking.jpg",
    alt: "Luxury resort bedroom suite with modern amenities",
    icon: Building2,
    perks: [
      "Pre-vetted premium properties",
      "Complimentary breakfast included",
      "Exclusive B2B discounted rates"
    ],
  },
  {
    id: "visa",
    title: "Visa Assistance",
    category: "transport",
    badge: "End-to-End Processing",
    desc: "Comprehensive visa consultation, application filing, document attestation, and biometric appointment booking for worldwide travel.",
    image: "/images/visa-assistance.jpg",
    alt: "Indian passport and international travel documents",
    icon: FileCheck2,
    perks: [
      "Tourist & business visa support",
      "Express appointment coordination",
      "Document pre-check & verification"
    ],
  },
  {
    id: "holidays",
    title: "Holiday Packages",
    category: "packages",
    badge: "All-Inclusive Escapes",
    desc: "Complete vacation experiences with premium hotel stays, private transfers, curated sightseeing, and full on-ground support.",
    image: "/images/holiday-packages.jpg",
    alt: "Tropical resort swimming pool and palm trees",
    icon: Palmtree,
    perks: [
      "Family & group leisure getaways",
      "All meals & sightseeing included",
      "Dedicated personal tour coordinator"
    ],
  },
  {
    id: "transportation",
    title: "Transportation & Chauffeur",
    category: "transport",
    badge: "Private AC Fleet",
    desc: "Punctual, climate-controlled sedans, Innova Crysta, and luxury Tempo Travellers driven by courteous, English/regional-speaking chauffeurs.",
    image: "/images/tour-suv.jpg",
    alt: "Private luxury AC tourist vehicle driving along scenic route",
    icon: Car,
    perks: [
      "Clean, sanitized private fleet",
      "Experienced route navigators",
      "Airport & intercity roundtrips"
    ],
  },
  {
    id: "honeymoon",
    title: "Honeymoon Packages",
    category: "packages",
    badge: "Romantic Escapes",
    desc: "Intimate getaways crafted for couples featuring private pool villas, candlelit beach dinners, luxury houseboat cruises, and scenic vistas.",
    image: "/images/kerala-honeymoon.jpg",
    alt: "Romantic sunset view over serene lake with coconut palms",
    icon: Heart,
    perks: [
      "Private villas & honeymoon suites",
      "Complimentary cake & flower bed",
      "Candlelit dinners & sunset cruises"
    ],
  },
  {
    id: "sightseeing",
    title: "Sightseeing Tours",
    category: "stays",
    badge: "Curated Excursions",
    desc: "Immersive guided day excursions with certified local storytellers, VIP temple darshan coordination, and seamless monument access.",
    image: "/images/sightseeing-tours.jpg",
    alt: "Majestic Taj Mahal and Yamuna river guided sightseeing tour",
    icon: Compass,
    perks: [
      "VIP temple darshan assistance",
      "Certified multilingual guides",
      "Customizable half/full day trips"
    ],
  },
];

const CATEGORIES = [
  { id: "all", label: "All Travel Solutions" },
  { id: "transport", label: "Flights & Transport" },
  { id: "packages", label: "Tour & Holiday Packages" },
  { id: "stays", label: "Hotels & Sightseeing" },
];

export default function ServicesSection({ onOpenPlanModal }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredServices = activeCategory === "all"
    ? ALL_SERVICES
    : ALL_SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section
      id="services"
      className="bg-gradient-to-b from-[#080c13] via-[#0c121c] to-[#070b10] py-20 sm:py-28 text-white relative overflow-hidden"
    >
      {/* Top Hairline Gold Divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#c59b27]/30 to-transparent" />

      {/* Ambient Gold Radial Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(197,155,39,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-2xl">
            <SectionEyebrow>COMPREHENSIVE TRAVEL SOLUTIONS</SectionEyebrow>
            <SectionHeading level={2} highlight="Every Journey">
              Complete Services for
            </SectionHeading>
            <p className="mt-3 text-xs sm:text-sm text-white/70 max-w-xl font-light font-sans leading-relaxed">
              From instant flight ticketing and luxury hotel reservations to private AC chauffeurs, honeymoon retreats, and VIP guided sightseeing — Flynova manages every single detail with precision.
            </p>
          </div>

          {/* Right Action Button */}
          <button
            type="button"
            onClick={() => onOpenPlanModal("Complete Travel Assistance")}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#c59b27] to-[#e5b94c] text-black font-medium text-xs sm:text-sm shadow-[0_8px_25px_rgba(197,155,39,0.35)] hover:shadow-[0_12px_32px_rgba(197,155,39,0.5)] transition-all cursor-pointer hover:scale-105 active:scale-95 shrink-0 self-start lg:self-end"
          >
            <span>Request Custom Service</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-10">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#c59b27] text-black shadow-[0_4px_16px_rgba(197,155,39,0.35)] font-semibold"
                    : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 8 Services Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {filteredServices.map((serv) => {
            const IconComponent = serv.icon;
            return (
              <div
                key={serv.id}
                onClick={() => onOpenPlanModal(serv.title)}
                className="group relative bg-[#0e141f]/80 rounded-2xl overflow-hidden border border-white/10 ring-1 ring-white/5 shadow-[0_14px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_45px_rgba(197,155,39,0.2)] hover:border-[#c59b27]/60 transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Top Image Banner */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden">
                    <Image
                      src={serv.image}
                      alt={serv.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e141f] via-transparent to-black/30" />

                    {/* Top Left Floating Badge (clean without icon) */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className="inline-block px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-medium text-white/90 tracking-wide">
                        {serv.badge}
                      </span>
                    </div>

                    {/* Top Right Clean Service Icon (no overlap with border or body) */}
                    <div className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-black/75 backdrop-blur-md border border-white/15 flex items-center justify-center text-[#f3cb6b] group-hover:bg-[#c59b27] group-hover:text-black transition-all duration-300 shadow-md">
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 pt-5">
                    <h3 className="font-serif font-playfair text-xl sm:text-[1.35rem] font-medium text-white group-hover:text-[#f3cb6b] transition-colors mb-2 leading-snug">
                      {serv.title}
                    </h3>
                    <p className="text-xs text-white/70 font-light leading-relaxed mb-4 line-clamp-3">
                      {serv.desc}
                    </p>

                    {/* 3 Key Feature Perks */}
                    <ul className="space-y-1.5 pt-3 border-t border-white/10">
                      {serv.perks.map((perk, pIdx) => (
                        <li key={pIdx} className="flex items-center gap-2 text-[11.5px] text-white/80 font-light">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#c59b27] shrink-0" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="p-5 sm:p-6 pt-0 mt-3">
                  <div className="w-full py-2.5 px-4 rounded-xl bg-white/5 group-hover:bg-[#c59b27] border border-white/10 group-hover:border-[#c59b27] flex items-center justify-between text-xs font-medium text-white/90 group-hover:text-black transition-all duration-300">
                    <span>Inquire / Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust & Assurance Strip */}
        <div className="mt-14 sm:mt-18 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-base/10 border border-gold-base/30 flex items-center justify-center text-[#f3cb6b] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-medium text-white">Govt. Registered LLP</h4>
              <p className="text-[11px] text-white/50 font-light">Verified Ministry of Tourism Partner</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-base/10 border border-gold-base/30 flex items-center justify-center text-[#f3cb6b] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-medium text-white">Best B2B Rates</h4>
              <p className="text-[11px] text-white/50 font-light">Direct hotel & carrier pricing</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-base/10 border border-gold-base/30 flex items-center justify-center text-[#f3cb6b] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-medium text-white">100% Tailored Trips</h4>
              <p className="text-[11px] text-white/50 font-light">Custom pacing & vehicle choices</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-base/10 border border-gold-base/30 flex items-center justify-center text-[#f3cb6b] shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-medium text-white">24/7 Trip Concierge</h4>
              <p className="text-[11px] text-white/50 font-light">Instant WhatsApp & phone support</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
