"use client";

import React from "react";
import Image from "next/image";
import { Star, Headphones, ShieldCheck } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import SectionHeading from "@/components/ui/SectionHeading";

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
      desc: "Verified hotel partners and transparent custom quotations.",
    },
  ];

  return (
    <section
      id="about"
      className="bg-gradient-to-b from-[#07110c] via-[#0a1610] to-[#07110c] py-18 sm:py-26 text-white relative overflow-hidden"
    >
      {/* Top Hairline Gold & Emerald Accent Divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#4ade80]/25 to-transparent" />

      {/* Atmospheric Soft Emerald Ambient Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(circle,rgba(34,197,94,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Big Munnar Tour Bus Photo */}
          <div className="lg:col-span-5 relative h-[380px] sm:h-[460px] rounded-3xl overflow-hidden border border-white/15 ring-1 ring-white/5 shadow-[0_25px_60px_rgba(0,0,0,0.75)] group">
            <Image
              src="/images/munnar-tea-bus.jpg"
              alt="Luxury tourist bus touring misty green tea plantations in Munnar Kerala"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07110c]/70 via-transparent to-transparent" />
          </div>

          {/* Right Column: Content & 3 Features */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <SectionEyebrow>WHY CHOOSE FLYNOVA</SectionEyebrow>

            <SectionHeading level={2} highlight="Trip" className="mb-4">
              More Than Just a
            </SectionHeading>

            <p className="font-sans text-sm sm:text-base text-white/75 font-light leading-relaxed max-w-xl mb-10">
              From sacred temple darshans to tranquil backwater retreats, our Kerala-based team coordinates every transfer, booking, and daily itinerary detail so your journey is unhurried, comfortable, and authentic.
            </p>

            {/* 3 Features Row: Modern Tactile Glassmorphic Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 pt-8 border-t border-white/10">
              {features.map((feat) => {
                const IconComponent = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="flex flex-col bg-white/[0.03] hover:bg-white/[0.06] p-5 rounded-2xl border border-white/10 hover:border-[#4ade80]/40 transition-all duration-300 shadow-md group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gold-base/15 border border-gold-base/30 flex items-center justify-center text-gold-base mb-3.5 group-hover:bg-gold-base group-hover:text-black transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-sans text-sm sm:text-base font-semibold text-white mb-1.5 leading-snug">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-white/65 font-light leading-relaxed">
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
