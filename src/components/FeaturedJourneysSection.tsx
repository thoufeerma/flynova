"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";

interface FeaturedJourneysSectionProps {
  onSelectPackage?: (pkgName: string) => void;
}

const JOURNEYS = [
  {
    id: "bsi-18",
    region: "TAMIL NADU & KERALA",
    title: "Madurai, Rameshwaram, Kanyakumari & Trivandrum",
    duration: "5 NIGHTS / 6 DAYS",
    image: "/images/pamban-bridge-rameshwaram.jpg",
    alt: "Pamban Bridge Rameshwaram, Kanyakumari & Trivandrum Temple Tour",
    href: "/package/bsi-18",
  },
  {
    id: "bsi-5",
    region: "TAMIL NADU",
    title: "Arupadai Veedu Murugan Tour",
    duration: "4 NIGHTS / 5 DAYS",
    image: "/images/murugan-temple.jpg",
    alt: "Arupadai Veedu Murugan Temple atop hill at sunset",
    href: "/package/bsi-5",
  },
  {
    id: "bsi-3",
    region: "TAMIL NADU & ANDHRA",
    title: "Tirupati & Kanchipuram",
    duration: "3 NIGHTS / 4 DAYS",
    image: "/images/tirupati-temple.jpg",
    alt: "Tirupati Balaji Temple and Kanchipuram Silk & Temple Tour",
    href: "/package/bsi-3",
  },
  {
    id: "bsi-8",
    region: "TAMIL NADU",
    title: "Thanjavur, Trichy & Sacred Tamil Nadu Circuit",
    duration: "4 NIGHTS / 5 DAYS",
    image: "/images/thanjavur-temple.jpg",
    alt: "Brihadeeswarar Temple Thanjavur & Sacred Tamil Nadu Tour",
    href: "/package/bsi-8",
  },
  {
    id: "bsi-1",
    region: "TAMIL NADU",
    title: "Sacred Rameshwaram & Dhanushkodi Yatra",
    duration: "3 NIGHTS / 4 DAYS",
    image: "/images/rameshwaram-temple.jpg",
    alt: "Ramanathaswamy Temple 22 Theerthams and Pamban Bridge",
    href: "/package/bsi-1",
  },
  {
    id: "bsi-14",
    region: "KERALA & TAMIL NADU",
    title: "Kovalam, Kanyakumari & Padmanabhaswamy Yatra",
    duration: "4 NIGHTS / 5 DAYS",
    image: "/images/trivandrum-padmanabhaswamy.jpg",
    alt: "Padmanabhaswamy Temple & Kanyakumari Triveni Sangam",
    href: "/package/bsi-14",
  },
];

export default function FeaturedJourneysSection({ onSelectPackage }: FeaturedJourneysSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % JOURNEYS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + JOURNEYS.length) % JOURNEYS.length);
  };

  // Get 3 visible cards starting from currentIndex
  const visibleCards = [0, 1, 2].map((offset) => {
    return JOURNEYS[(currentIndex + offset) % JOURNEYS.length];
  });

  return (
    <section
      id="packages"
      className="bg-gradient-to-b from-[#080d15] via-[#0c121d] to-[#090d16] py-20 sm:py-28 text-white relative overflow-hidden select-none"
    >
      {/* Top Hairline Gold Accent Divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#c59b27]/35 to-transparent" />

      {/* Atmospheric Warm Temple Gold Radial Ambience */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(218,165,32,0.06),transparent_70%)] pointer-events-none" />

      {/* Background Ambience: Subtle atmospheric gopuram silhouette watermark on the right */}
      <div className="absolute top-0 right-0 w-[55%] h-[500px] pointer-events-none overflow-hidden select-none opacity-20 mix-blend-screen hidden lg:block">
        <Image
          src="/images/temple-tour-hero.jpg"
          alt=""
          fill
          className="object-cover object-top filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0c121d]/70 to-[#0c121d]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c121d] via-transparent to-[#0c121d]/70" />
      </div>

      <div className="relative z-10 max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          
          {/* Left Title & Eyebrow */}
          <div className="max-w-2xl">
            {/* Eyebrow: — FEATURED JOURNEYS — */}
            <div className="inline-flex items-center gap-2.5 mb-3.5">
              <span className="w-7 h-[1px] bg-[#dcb037]" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-[#dcb037] uppercase font-sans">
                FEATURED JOURNEYS
              </span>
              <span className="w-7 h-[1px] bg-[#dcb037]" />
            </div>

            {/* Master Headline: Sacred Journeys Across South India */}
            <h2 className="font-serif font-normal text-3xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] text-white leading-[1.12] tracking-tight">
              Sacred Journeys <br />
              <span className="text-[#f3cb6b] font-serif font-normal">
                Across South India
              </span>
            </h2>
          </div>

          {/* Right Subtitle & Carousel Arrows */}
          <div className="flex flex-col sm:flex-row sm:items-end lg:items-center justify-between lg:justify-end gap-6 sm:gap-10">
            {/* Subtitle */}
            <p className="font-sans text-xs sm:text-sm lg:text-[15px] text-white/70 font-light leading-relaxed max-w-sm sm:max-w-md">
              Explore timeless temples, vibrant cultures and breathtaking landscapes with our carefully crafted itineraries.
            </p>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Prev Button: Outline */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous journey"
                className="w-12 h-12 rounded-full border border-white/20 bg-black/40 hover:border-gold-base/60 text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              {/* Next Button: Solid Gold */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next journey"
                className="w-12 h-12 rounded-full bg-[#f3cb6b] hover:bg-[#ffe082] text-black flex items-center justify-center shadow-[0_4px_20px_rgba(243,203,107,0.35)] transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* 3 Luxury Journey Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {visibleCards.map((pkg, idx) => (
            <div
              key={`${pkg.id}-${idx}`}
              className="relative rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#121824] to-[#0c1018] hover:border-[#f3cb6b]/50 transition-all duration-500 flex flex-col justify-between group shadow-[0_20px_50px_rgba(0,0,0,0.75)] hover:shadow-[0_25px_60px_rgba(197,155,39,0.14)] hover:-translate-y-1.5 ring-1 ring-white/5"
            >
              {/* Top Photo with Seamless Bottom Fade */}
              <Link
                href={pkg.href}
                className="relative h-[290px] sm:h-[320px] w-full overflow-hidden block cursor-pointer"
              >
                <Image
                  src={pkg.image}
                  alt={pkg.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Smooth Dark Vignette: image bottom smoothly melts into solid dark card base */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-[#121824]/45 to-transparent" />
              </Link>

              {/* Card Body Content */}
              <div className="px-6 sm:px-7 pb-6 pt-1 flex-1 flex flex-col justify-between -mt-6 relative z-10">
                <div>
                  {/* Region Eyebrow with gold line: — TAMIL NADU & KERALA */}
                  <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-[#dcb037] mb-2.5 font-sans">
                    <span className="w-5 h-px bg-[#dcb037]" />
                    <span>{pkg.region}</span>
                  </div>

                  {/* Title in Playfair Display */}
                  <Link href={pkg.href}>
                    <h3 className="font-serif font-normal text-xl sm:text-2xl text-white group-hover:text-[#f3cb6b] transition-colors leading-snug line-clamp-2 mb-6">
                      {pkg.title}
                    </h3>
                  </Link>
                </div>

                {/* Footer Bar: Duration on left, 'Explore Journey (->)' on right */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 text-white">
                  {/* Duration */}
                  <span className="text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase text-white/70 font-manrope">
                    {pkg.duration}
                  </span>

                  {/* Explore Journey with Circle Arrow Icon */}
                  <Link
                    href={pkg.href}
                    className="inline-flex items-center gap-2.5 text-xs sm:text-sm text-white/90 group-hover:text-[#f3cb6b] transition-colors font-sans group/btn"
                  >
                    <span className="underline underline-offset-4 decoration-white/30 group-hover/btn:decoration-[#f3cb6b] transition-colors font-medium">
                      Explore Journey
                    </span>
                    <div className="w-8 h-8 rounded-full border border-white/30 group-hover/btn:border-[#f3cb6b] group-hover/btn:bg-[#f3cb6b] group-hover/btn:text-black flex items-center justify-center transition-all duration-300 flex-shrink-0">
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subtle Bottom Bar with link to all packages */}
        <div className="mt-12 sm:mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#f3cb6b] animate-pulse" />
            <span>All journeys include verified 3★/4★ hotels, dedicated AC chauffeur &amp; VIP temple darshan assistance.</span>
          </div>
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-[#f3cb6b] hover:text-[#ffe082] font-semibold tracking-wider uppercase text-xs transition-colors group"
          >
            <span>View All {SITE_CONFIG.packageCount} Tour Circuits</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}
