"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

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
  {
    id: 2,
    quote:
      "The Kashmir itinerary organized by Flynova was unforgettable. The Dal Lake houseboat and Gulmarg snow cab arrangements were punctual and truly luxurious.",
    author: "Rohit & Meera K",
    trip: "Kashmir Getaway – Jan 2025",
    avatar: "/images/aparna-avatar.jpg",
    stars: 5,
    photo: "/images/couple-mountains.jpg",
    photoAlt: "Travel couple in mountains",
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

  const active = TESTIMONIALS[currentIdx];

  return (
    <section id="reviews" className="bg-[#07090b] py-16 sm:py-24 text-white relative border-t border-white/5">
      <div className="max-w-[1360px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#dcb037] block mb-2.5">
              TRAVELLER STORIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              What Our Customers <span className="text-[#dcb037]">Says</span>
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-[#dcb037] hover:border-[#dcb037] hover:text-black flex items-center justify-center transition-all cursor-pointer"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-[#dcb037] hover:border-[#dcb037] hover:text-black flex items-center justify-center transition-all cursor-pointer"
              aria-label="Next story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2-Part Grid: Couple Photo on Left, Testimonial Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Column: Photo of Couple Overlooking Mountain Vista */}
          <div className="lg:col-span-5 relative min-h-[320px] sm:min-h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
            <Image
              src={active.photo}
              alt={active.photoAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          {/* Right Column: Dark Quote Card */}
          <div className="lg:col-span-7 bg-[#101418] border border-white/10 rounded-2xl p-7 sm:p-10 lg:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between">
            
            {/* Top Large Gold Quote Icon */}
            <div>
              <span className="font-serif text-5xl sm:text-6xl text-[#dcb037] leading-none block mb-3 font-normal opacity-90">
                “
              </span>

              {/* Review Quote Text */}
              <p className="font-serif text-lg sm:text-2xl text-white/95 font-normal leading-relaxed italic mb-8">
                &ldquo;{active.quote}&rdquo;
              </p>
            </div>

            {/* Author Footer: Avatar + Name + Trip + 5 Stars */}
            <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#dcb037]/40 flex-shrink-0">
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
                  <p className="text-xs text-white/50 mt-0.5">
                    {active.trip}
                  </p>
                </div>
              </div>

              {/* 5 Gold Stars */}
              <div className="flex items-center gap-1 text-[#dcb037]">
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
