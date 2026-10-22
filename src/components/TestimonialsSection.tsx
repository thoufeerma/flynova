"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import SectionHeading from "@/components/ui/SectionHeading";

// Verified customer reviews with real authentic imagery.
// Note: Second entry (Rohit & Meera K) was flagged and hidden because it duplicated Aparna S's avatar and photo.
// To restore, supply an authentic photo and avatar asset.
const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Our Kerala trip was perfectly planned by Flynova. The stays, transport and local experiences were all seamless. Highly recommended!",
    author: "Aparna S",
    trip: "Kerala Trip – Dec 2024",
    avatar: "/images/aparna-avatar.jpg",
    stars: 5,
    photo: "/images/couple-mountains.jpg",
    photoAlt: "Happy couple looking over scenic misty Kerala mountain valley",
  },
];

export default function TestimonialsSection() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prev = () => {
    setCurrentIdx((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const active = TESTIMONIALS[currentIdx] || TESTIMONIALS[0];

  return (
    <section
      id="reviews"
      className="bg-gradient-to-b from-[#0a0d14] via-[#0e121b] to-[#080b11] py-18 sm:py-26 text-white relative overflow-hidden"
    >
      {/* Top Hairline Gold Accent Divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#c59b27]/30 to-transparent" />

      {/* Atmospheric Warm Amber Radial Glow behind Quote Card */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(197,155,39,0.07),transparent_70%)] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <SectionEyebrow>TRAVELLER STORIES</SectionEyebrow>
            <SectionHeading level={2} highlight="Say">
              What Our Customers
            </SectionHeading>
          </div>

          {/* Navigation Arrows (rendered when multiple reviews exist) */}
          {TESTIMONIALS.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-gold-base hover:border-gold-base hover:text-black flex items-center justify-center transition-all cursor-pointer"
                aria-label="Previous story"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={next}
                className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-gold-base hover:border-gold-base hover:text-black flex items-center justify-center transition-all cursor-pointer"
                aria-label="Next story"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* 2-Part Grid: Couple Photo on Left, Testimonial Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Column: Photo of Couple Overlooking Mountain Vista */}
          <div className="lg:col-span-5 relative min-h-[320px] sm:min-h-[400px] rounded-2xl overflow-hidden border border-white/15 ring-1 ring-white/5 shadow-[0_20px_45px_rgba(0,0,0,0.7)]">
            <Image
              src={active.photo}
              alt={active.photoAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          {/* Right Column: Elevated Dark Quote Card */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#131824] to-[#0c1017] border border-white/15 ring-1 ring-white/5 rounded-2xl p-7 sm:p-10 lg:p-12 shadow-[0_22px_55px_rgba(0,0,0,0.65)] flex flex-col justify-between">
            
            {/* Top Large Gold Quote Icon */}
            <div>
              <span className="font-serif font-playfair text-5xl sm:text-6xl text-[#f3cb6b] leading-none block mb-3 font-normal opacity-90">
                “
              </span>

              {/* Review Quote Text */}
              <p className="font-serif font-playfair text-lg sm:text-2xl text-white/95 font-normal leading-relaxed italic mb-8">
                {active.quote}
              </p>
            </div>

            {/* Author Footer: Avatar + Name + Trip + 5 Stars */}
            <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gold-base/40 flex-shrink-0">
                  <Image
                    src={active.avatar}
                    alt={active.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-white text-base leading-tight">
                    {active.author}
                  </h3>
                  <p className="font-sans text-xs text-white/50 mt-0.5">
                    {active.trip}
                  </p>
                </div>
              </div>

              {/* 5 Gold Stars */}
              <div className="flex items-center gap-1 text-gold-light">
                {[...Array(active.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
