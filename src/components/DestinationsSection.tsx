"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Sparkles, MapPin } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import SectionHeading from "@/components/ui/SectionHeading";

interface DestinationsSectionProps {
  onSelectDestination: (destName: string) => void;
}

const DESTINATIONS = [
  {
    id: "kerala",
    name: "Kerala",
    badge: "God's Own Country",
    subtitle: "Backwaters, palm-fringed beaches & mist-clad Munnar tea hills",
    image: "/images/alleppey-hero.jpg",
    alt: "Kerala backwaters luxury houseboat sunset",
  },
  {
    id: "karnataka",
    name: "Karnataka",
    badge: "Cradle of Heritage",
    subtitle: "Royal Mysore palaces, Hampi boulder ruins & Coorg coffee hills",
    image: "/images/karnataka-hampi.jpg",
    alt: "Hampi UNESCO ruins and Mysore Royal Heritage Karnataka",
  },
  {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    badge: "Land of Majestic Temples",
    subtitle: "Towering Dravidian gopurams, coastal shrines & UNESCO monuments",
    image: "/images/tamilnadu-shore.jpg",
    alt: "Mahabalipuram Shore Temple and Tamil Nadu heritage",
  },
  {
    id: "kashmir",
    name: "Kashmir",
    badge: "Paradise on Earth",
    subtitle: "Alpine peaks, Dal Lake shikaras & snow valleys of Gulmarg",
    image: "/images/kashmir-hero.jpg",
    alt: "Kashmir Dal Lake shikara and snow mountains",
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    badge: "City of Nizams",
    subtitle: "Illuminated Charminar, Golconda fortresses & legendary royal biryani",
    image: "/images/hyderabad-charminar.jpg",
    alt: "Charminar illuminated at night Hyderabad Telangana",
  },
  {
    id: "lakshadweep",
    name: "Lakshadweep",
    badge: "Untouched Coral Atolls",
    subtitle: "Pristine turquoise lagoons, Agatti sandbars & coral scuba reefs",
    image: "/images/lakshadweep-islands.jpg",
    alt: "Agatti Island turquoise coral lagoon Lakshadweep",
  },
  {
    id: "delhi",
    name: "Delhi",
    badge: "Heart of Imperial India",
    subtitle: "India Gate, historic Mughal architecture & bustling heritage bazaars",
    image: "/images/delhi-india-gate.jpg",
    alt: "India Gate evening illuminated New Delhi",
  },
  {
    id: "goa",
    name: "Goa",
    badge: "Sun, Sand & Heritage",
    subtitle: "Golden beaches, Portuguese heritage villas & luxury coastal resorts",
    image: "/images/goa-coast.jpg",
    alt: "Goa tropical beach and coconut palms",
  },
];

export default function DestinationsSection({ onSelectDestination }: DestinationsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Manual nudge functions for previous and next
  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Duplicate items 3 times for a seamless infinite loop
  const displayItems = [...DESTINATIONS, ...DESTINATIONS, ...DESTINATIONS];

  return (
    <section
      id="destinations"
      className="bg-gradient-to-b from-[#05070a] via-[#090d15] to-[#070b10] py-20 sm:py-28 text-white relative overflow-hidden select-none"
    >
      {/* Top Hairline Gold Accent Divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#c59b27]/30 to-transparent" />

      {/* Atmospheric Ambient Gold Warmth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-56 bg-[radial-gradient(ellipse_at_top,rgba(197,155,39,0.07),transparent_70%)] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <SectionEyebrow>CURATED DESTINATIONS</SectionEyebrow>
            <SectionHeading level={2} highlight={<span className="italic">unforgettable</span>}>
              India, at its most
            </SectionHeading>
            <p className="mt-3 text-xs sm:text-sm text-white/70 max-w-xl font-light font-sans">
              From the palm backwaters of Kerala and Nizami palaces of Hyderabad to the turquoise coral lagoons of Lakshadweep — explore handpicked destinations crafted for discerning travellers.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              aria-label="Scroll destinations left"
              className="w-11 h-11 rounded-full border border-white/20 bg-black/40 hover:border-gold-base text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              aria-label="Scroll destinations right"
              className="w-11 h-11 rounded-full border border-white/20 bg-black/40 hover:border-gold-base text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onSelectDestination("All India Destinations")}
              className="hidden lg:inline-flex items-center gap-1.5 ml-3 px-4 py-2.5 rounded-full border border-gold-base/40 bg-gold-base/10 text-xs text-[#f3cb6b] hover:bg-gold-base/20 transition-all font-sans font-medium"
            >
              <span>Custom Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Infinite Scrolling Cards Track */}
      <div className="relative w-full overflow-hidden">
        {/* Soft edge fade masks on left and right */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-r from-[#05070a] via-[#05070a]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-l from-[#05070a] via-[#05070a]/80 to-transparent z-20 pointer-events-none" />

        {/* Scrollable Container with Marquee Animation */}
        <div 
          ref={scrollRef}
          className="overflow-x-auto no-scrollbar scroll-smooth py-4"
        >
          <div className="animate-infinite-scroll flex gap-6 sm:gap-7 px-6">
            {displayItems.map((dest, idx) => (
              <div
                key={`${dest.id}-${idx}`}
                onClick={() => onSelectDestination(dest.name)}
                className="group relative w-[290px] sm:w-[340px] md:w-[370px] h-[400px] sm:h-[440px] rounded-2xl overflow-hidden border border-white/15 ring-1 ring-white/5 shadow-[0_18px_45px_rgba(0,0,0,0.7)] cursor-pointer flex-shrink-0 transition-all duration-500 hover:-translate-y-2 hover:border-gold-base/70 hover:shadow-[0_24px_55px_rgba(197,155,39,0.22)]"
              >
                {/* Background Authentic Photo */}
                <Image
                  src={dest.image}
                  alt={dest.alt}
                  fill
                  sizes="380px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Dark Vignette Overlay for Text Clarity */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10" />

                {/* Top Badge (Clean without left icon) */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="inline-block px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-medium tracking-wide text-white/90">
                    {dest.badge}
                  </span>
                </div>

                {/* Card Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex items-end justify-between gap-4">
                  <div className="max-w-[78%]">
                    <div className="flex items-center gap-1.5 text-xs text-[#f3cb6b] font-medium mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Explore Destination</span>
                    </div>
                    <h3 className="font-serif font-playfair text-2xl sm:text-3xl font-normal text-white tracking-tight mb-1.5 group-hover:text-[#f3cb6b] transition-colors">
                      {dest.name}
                    </h3>
                    <p className="font-sans text-xs sm:text-[13px] text-white/75 font-light leading-snug line-clamp-2">
                      {dest.subtitle}
                    </p>
                  </div>

                  {/* Circular Gold Arrow Button */}
                  <div className="w-11 h-11 rounded-full bg-black/50 border border-white/25 backdrop-blur-md flex items-center justify-center text-white/90 group-hover:bg-gold-base group-hover:border-gold-base group-hover:text-black transition-all duration-300 flex-shrink-0 group-hover:scale-105">
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="text-center mt-6 text-xs text-white/40 font-light flex items-center justify-center gap-2">
        <span className="w-8 h-px bg-white/15" />
        <span>Click any card to explore & customize itinerary</span>
        <span className="w-8 h-px bg-white/15" />
      </div>

    </section>
  );
}
