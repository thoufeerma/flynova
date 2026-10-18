"use client";

import React from "react";
import Image from "next/image";
import { Star, Headphones, ShieldCheck } from "lucide-react";

export default function WhyFlynova() {
  const features = [
    {
      icon: Star,
      title: "Personalized Itineraries",
      desc: "Trips tailored to your interests and travel style.",
    },
    {
      icon: Headphones,
      title: "Expert Support",
      desc: "Talk to a travel expert anytime during your journey.",
    },
    {
      icon: ShieldCheck,
      title: "Trusted & Reliable",
      desc: "Verified partners and transparent pricing.",
    },
  ];

  return (
    <section id="about" className="bg-[#07090b] py-16 sm:py-24 text-white relative border-t border-white/5">
      <div className="max-w-[1360px] mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Big Munnar Tour Bus Photo */}
          <div className="lg:col-span-5 relative h-[380px] sm:h-[460px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] group">
            <Image
              src="/images/munnar-tea-bus.jpg"
              alt="Luxury tourist bus touring misty green tea plantations in Munnar Kerala"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          {/* Right Column: Content & 3 Features */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#dcb037] block mb-2.5">
              WHY CHOOSE FLYNOVA
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
              More Than Just a <span className="text-[#dcb037]">Trip</span>
            </h2>

            <p className="text-sm sm:text-base text-white/75 font-normal leading-relaxed max-w-xl mb-10">
              We combine local expertise, personalized planning and reliable support to make every journey smooth, safe and memorable.
            </p>

            {/* 3 Features Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
              {features.map((feat) => {
                const IconComponent = feat.icon;
                return (
                  <div key={feat.title} className="flex flex-col">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-[#dcb037]/30 flex items-center justify-center text-[#dcb037] mb-3.5">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-sans text-sm sm:text-base font-semibold text-white mb-1.5 leading-snug">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-white/60 font-light leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
