"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";

interface ExperiencesSectionProps {
  onOpenPlanModal: () => void;
}

export default function ExperiencesSection({ onOpenPlanModal }: ExperiencesSectionProps) {
  return (
    <section id="experiences" className="bg-[#faf8f5] py-20 lg:py-28 text-[#181d21]">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Side */}
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-[#c59b27] uppercase block mb-3">
              CURATED EXPERIENCES
            </span>
            
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#111417] leading-[1.18] mb-6">
              Moments that linger long after you return.
            </h2>
            
            <p className="text-base text-[#4b5563] leading-relaxed font-light mb-8">
              At Flynova Reisen, travel is not merely about visiting places; it is about feelings, aromas, morning mists, and shared smiles. Whether it is sipping freshly brewed cardamom tea in Munnar overlooking emerald peaks or watching the golden oil lamps light up the sacred temple corridors of Madurai, our team crafts memories that stay with you forever.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 py-6 border-y border-[#e3dcce] mb-8">
              <div>
                <span className="font-serif text-3xl sm:text-4xl font-semibold text-[#a07a16] block leading-none mb-1">
                  100%
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-[#6b7280] uppercase tracking-wider">
                  Tailored Itineraries
                </span>
              </div>

              <div>
                <span className="font-serif text-3xl sm:text-4xl font-semibold text-[#a07a16] block leading-none mb-1">
                  4.9★
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-[#6b7280] uppercase tracking-wider">
                  Satisfaction Score
                </span>
              </div>

              <div>
                <span className="font-serif text-3xl sm:text-4xl font-semibold text-[#a07a16] block leading-none mb-1">
                  24/7
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-[#6b7280] uppercase tracking-wider">
                  Senior Concierge
                </span>
              </div>
            </div>

            <button
              onClick={onOpenPlanModal}
              className="inline-flex items-center gap-2 bg-[#111417] hover:bg-[#c59b27] text-white hover:text-black font-semibold text-sm px-7 py-3.5 rounded transition-all duration-300 shadow-md group"
            >
              <span>Design My Journey</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right Media Stack */}
          <div className="relative h-[420px] sm:h-[480px]">
            {/* Main Image */}
            <div className="absolute top-0 left-0 w-[78%] h-[370px] rounded overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.18)]">
              <Image
                src="/images/alleppey-hero.jpg"
                alt="Alleppey Backwater Cruise"
                fill
                className="object-cover"
              />
            </div>

            {/* Sub Image (Offset & Overlapping) */}
            <div className="absolute bottom-0 right-0 w-[58%] h-[270px] rounded overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.25)] border-4 sm:border-8 border-[#faf8f5]">
              <Image
                src="/images/munnar-hero.jpg"
                alt="Munnar Tea Hills Plantation"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating Luxury Tag */}
            <div className="absolute bottom-6 left-6 z-10 bg-[#111417] text-white px-4 py-2.5 rounded shadow-xl flex items-center gap-2 border border-white/10">
              <Star className="w-4 h-4 text-[#c59b27] fill-[#c59b27]" />
              <span className="text-xs font-semibold tracking-wide">
                Flynova Premium Kerala Care
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
