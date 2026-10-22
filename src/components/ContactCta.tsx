"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Headphones } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

interface ContactCtaProps {
  onOpenPlanModal: () => void;
}

export default function ContactCta({ onOpenPlanModal }: ContactCtaProps) {
  const waUrl =
    `https://wa.me/${SITE_CONFIG.phoneRaw}?text=` +
    encodeURIComponent(
      `Hello ${SITE_CONFIG.leadContact} & ${SITE_CONFIG.companyName}, I would like to plan a bespoke trip with your team. Please share customized package options and itinerary details.`
    );

  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-[#07090e] via-[#0a0d14] to-[#06080b] py-18 sm:py-24 text-white relative overflow-hidden"
    >
      {/* Top Hairline Gold Accent Divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#c59b27]/30 to-transparent" />

      {/* Atmospheric Gold Warmth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-4xl h-56 bg-[radial-gradient(ellipse,rgba(197,155,39,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-6 relative z-10">
        
        {/* Banner Card matching mockup */}
        <div className="relative rounded-3xl overflow-hidden border border-white/15 ring-1 ring-gold-base/20 shadow-[0_25px_60px_rgba(0,0,0,0.85)] p-8 sm:p-12 lg:p-14 bg-gradient-to-r from-[#131824] via-[#0e131b] to-[#0a0d13]">
          
          {/* Panoramic Mountain Landscape Background with Dark Overlay */}
          <div className="absolute inset-0 z-0 opacity-25">
            <Image
              src="/images/munnar-tea-bus.jpg"
              alt="Scenic mountains background"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#131824] via-[#0e131b]/90 to-[#0a0d13]/85" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <SectionEyebrow>READY FOR YOUR NEXT JOURNEY?</SectionEyebrow>
              <h2 className="font-serif font-playfair text-3xl sm:text-4xl lg:text-[2.6rem] font-normal text-white tracking-tight leading-tight">
                Let us <span className="text-[#f3cb6b]">create</span> a memorable trip across India.
              </h2>
            </div>

            {/* Right Buttons: Plan Your Trip & Talk to an Expert */}
            <div className="flex items-center gap-4 flex-wrap justify-center flex-shrink-0">
              <PrimaryButton
                onClick={onOpenPlanModal}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Plan Your Trip
              </PrimaryButton>

              <SecondaryButton
                href={waUrl}
                external
                icon={<Headphones className="w-4 h-4 text-gold-base" />}
              >
                Talk to an Expert
              </SecondaryButton>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
