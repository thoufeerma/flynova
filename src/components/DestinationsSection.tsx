"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

interface DestinationsSectionProps {
  onSelectDestination: (destName: string) => void;
}

const DESTINATIONS = [
  {
    id: "kerala",
    name: "Kerala",
    subtitle: "Backwaters, beaches & lush landscapes",
    image: "/images/alleppey-hero.jpg",
    alt: "Kerala backwaters luxury houseboat sunset",
  },
  {
    id: "kashmir",
    name: "Kashmir",
    subtitle: "Mountains, lakes & alpine beauty",
    image: "/images/kashmir-hero.jpg",
    alt: "Kashmir Dal Lake shikara and snow mountains",
  },
  {
    id: "goa",
    name: "Goa",
    subtitle: "Sun, beaches & vibrant culture",
    image: "/images/goa-coast.jpg",
    alt: "Goa tropical beach and coconut palms",
  },
];

export default function DestinationsSection({ onSelectDestination }: DestinationsSectionProps) {
  return (
    <section id="destinations" className="bg-[#07090b] py-16 sm:py-20 text-white relative">
      <div className="max-w-[1360px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#dcb037] block mb-2.5">
              CURATED DESTINATIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              India, at its most <span className="text-[#dcb037] font-serif italic">unforgettable</span>
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onSelectDestination("All India Destinations")}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-white/70 hover:text-[#dcb037] transition-colors group cursor-pointer"
          >
            <span>View all destinations</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* 3 Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              onClick={() => onSelectDestination(dest.name)}
              className="group relative h-[380px] sm:h-[420px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.6)] cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:border-[#dcb037]/50"
            >
              {/* Background Photo */}
              <Image
                src={dest.image}
                alt={dest.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Bottom Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

              {/* Card Footer Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1 group-hover:text-[#dcb037] transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 font-normal leading-snug">
                    {dest.subtitle}
                  </p>
                </div>

                {/* Circular Arrow Button (matching mockup) */}
                <div className="w-10 h-10 rounded-full bg-black/40 border border-white/25 backdrop-blur-md flex items-center justify-center text-white/90 group-hover:bg-[#dcb037] group-hover:border-[#dcb037] group-hover:text-black transition-all duration-300 flex-shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
