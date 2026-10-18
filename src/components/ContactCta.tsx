"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Headphones, PhoneCall } from "lucide-react";

interface ContactCtaProps {
  onOpenPlanModal: () => void;
}

export default function ContactCta({ onOpenPlanModal }: ContactCtaProps) {
  const waUrl =
    "https://wa.me/917306003152?text=" +
    encodeURIComponent(
      "Hello Flynova Reisen LLP, I would like to plan a trip with your team. Please share customized package options and pricing."
    );

  return (
    <section id="contact" className="bg-[#07090b] py-16 sm:py-20 text-white relative">
      <div className="max-w-[1360px] mx-auto px-6">
        
        {/* Banner Card matching mockup */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-8 sm:p-12 lg:p-14 bg-gradient-to-r from-[#11171d] via-[#0d1318] to-[#0a0f12]">
          
          {/* Panoramic Mountain Landscape Background with Dark Overlay */}
          <div className="absolute inset-0 z-0 opacity-30">
            <Image
              src="/images/munnar-tea-bus.jpg"
              alt="Scenic mountains background"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d1318] via-[#0d1318]/90 to-[#0a0f12]/80" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#dcb037] block mb-2.5">
                READY FOR YOUR NEXT JOURNEY?
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-white tracking-tight leading-tight">
                Let us <span className="text-[#dcb037]">create</span> a memorable trip across India.
              </h2>
            </div>

            {/* Right Buttons: Plan Your Trip & Talk to an Expert */}
            <div className="flex items-center gap-4 flex-wrap justify-center flex-shrink-0">
              <button
                type="button"
                onClick={onOpenPlanModal}
                className="inline-flex items-center gap-2 bg-[#dcb037] hover:bg-[#eec149] text-[#12161a] font-semibold text-xs sm:text-sm px-6 sm:px-7 py-3.5 rounded shadow-[0_4px_20px_rgba(220,176,55,0.35)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Plan Your Trip</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-black/40 hover:bg-white/10 text-white border border-white/25 hover:border-white/50 font-medium text-xs sm:text-sm px-6 py-3.5 rounded backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                <Headphones className="w-4 h-4 text-[#dcb037]" />
                <span>Talk to an Expert</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
