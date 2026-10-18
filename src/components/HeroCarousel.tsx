"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

interface HeroCarouselProps {
  onOpenPlanModal: () => void;
  children?: React.ReactNode;
}

const SLIDES = [
  {
    id: 0,
    title: "Alleppey",
    subtitle: "Backwaters",
    image: "/images/alleppey-hero.jpg",
    location: "ALLEPPEY, KERALA · INDIA",
    alt: "Alleppey Kerala Backwaters Luxury Houseboat Sunset",
  },
  {
    id: 1,
    title: "Munnar",
    subtitle: "Misty Hills",
    image: "/images/munnar-hero.jpg",
    location: "MUNNAR, WESTERN GHATS · INDIA",
    alt: "Munnar Misty Tea Hills and Sunrise",
  },
  {
    id: 2,
    title: "Kashmir",
    subtitle: "Dal Lake & Snow",
    image: "/images/kashmir-hero.jpg",
    location: "DAL LAKE, KASHMIR · INDIA",
    alt: "Kashmir Dal Lake Wooden Shikara and Snow Himalayas",
  },
  {
    id: 3,
    title: "Jaipur",
    subtitle: "Royal Heritage",
    image: "/images/jaipur-hero.jpg",
    location: "JAIPUR, RAJASTHAN · INDIA",
    alt: "Jaipur Rajasthan Royal Palace and Lantern Courtyard",
  },
];

export default function HeroCarousel({ onOpenPlanModal, children }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const total = SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative min-h-[calc(100vh-75px)] lg:h-[calc(100vh-85px)] lg:min-h-[580px] lg:max-h-[820px] w-full flex flex-col justify-between pt-4 sm:pt-6 pb-3 sm:pb-4 overflow-hidden">
      
      {/* Background Cross-fade Slides */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === current ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
            style={{ transitionProperty: "opacity, transform" }}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={idx === 0}
              className="object-cover object-center"
            />
          </div>
        ))}

        {/* Left-to-right dark gradient: ensures text readability on the left without hiding the photo on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080a0c]/92 via-[#080a0c]/60 to-[#080a0c]/20 z-[1]" />
        
        {/* Subtle vertical vignette for seamless depth and ground blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080a0c] via-transparent to-[#080a0c]/40 z-[1]" />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 w-full flex-1 flex flex-col justify-center py-2 sm:py-3">
        <div className="max-w-[780px]">
          
          {/* Eyebrow Breadcrumb: larger with better contrast */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-white mb-2.5 sm:mb-3">
            <span className="text-[#e5b94c] font-bold">FLYNOVA REISEN</span>
            <span className="text-white/40 font-light">/</span>
            <span className="text-white tracking-[0.2em] font-medium">YOUR JOURNEY, OUR PASSION</span>
          </div>

          {/* Master Headline: slightly reduced size, line height 1.15, subtle letter spacing, 'unforgettable' in gold */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.6rem] font-normal text-white leading-[1.15] tracking-[0.01em] mb-2.5 sm:mb-3.5 drop-shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
            The journey is yours.<br />
            We make it <span className="text-[#c59b27] italic font-serif">unforgettable</span>.
          </h1>

          {/* Subtext: shortened to exact one line */}
          <p className="text-sm sm:text-base lg:text-lg text-white/90 font-light leading-relaxed max-w-[640px] mb-5 sm:mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
            Thoughtfully planned journeys across India, from Kerala backwaters to the Himalayas.
          </p>

          {/* CTA Buttons: 'Explore journeys' solid gold primary; 'Plan a trip' ghost button with thin white border and hover fill */}
          <div className="flex items-center gap-3.5 flex-wrap">
            <Link
              href="#destinations"
              className="inline-flex items-center gap-2.5 bg-[#c59b27] hover:bg-[#e5b94c] text-[#080a0c] font-semibold text-xs sm:text-sm px-6 sm:px-7 py-3 rounded shadow-[0_4px_20px_rgba(197,155,39,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(197,155,39,0.5)] cursor-pointer"
            >
              <span>Explore journeys</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={onOpenPlanModal}
              className="inline-flex items-center gap-2.5 border border-white/40 hover:border-white hover:bg-white hover:text-[#080a0c] text-white font-medium text-xs sm:text-sm px-5 sm:px-6 py-3 rounded backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 cursor-pointer shadow-sm group"
            >
              <span>Plan a trip</span>
              <ArrowRight className="w-4 h-4 text-white/70 group-hover:text-[#080a0c] group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>

        </div>
      </div>

      {/* Hero Bottom Area (Thumbnails / Slider controls + Search Card cleanly above the fold) */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 w-full space-y-2.5 sm:space-y-3 pb-1">
        
        {/* Slider Controls Bar with Destination Thumbnails */}
        <div className="pt-2.5 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-white/90">
          
          {/* Active Location Indicator */}
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase">
            <MapPin className="w-3.5 h-3.5 text-[#c59b27]" />
            <span className="transition-opacity duration-300 text-white/90 font-medium">
              {SLIDES[current].location}
            </span>
          </div>

          {/* Interactive Slide Thumbnails & Titles */}
          <div className="hidden md:flex items-center gap-2">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrent(idx)}
                className={`group relative z-20 flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  idx === current
                    ? "bg-white/15 border-[#c59b27] shadow-[0_0_12px_rgba(197,155,39,0.3)] ring-1 ring-[#c59b27]/60"
                    : "bg-black/40 border-white/15 hover:border-white/35 hover:bg-white/5 opacity-70 hover:opacity-100"
                }`}
                aria-label={`Jump to ${slide.title} slide`}
              >
                <div className="relative w-8 h-6 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <span
                  className={`text-xs transition-colors ${
                    idx === current ? "text-[#e5b94c] font-semibold" : "text-white/80 group-hover:text-white font-medium"
                  }`}
                >
                  {slide.title}
                </span>
              </button>
            ))}
          </div>

          {/* Slider Pagination Arrows & Counter */}
          <div className="flex items-center gap-4">
            <div className="text-xs tracking-widest font-mono">
              <span className="text-white font-semibold">
                {String(current + 1).padStart(2, "0")}
              </span>
              <span className="text-white/40 mx-1">/</span>
              <span className="text-white/60">04</span>
            </div>

            {/* Dynamic Progress Fill */}
            <div className="hidden sm:block w-14 h-[2px] bg-white/20 rounded overflow-hidden relative">
              <div
                className="absolute top-0 left-0 h-full bg-[#c59b27] transition-all duration-500"
                style={{ width: `${((current + 1) / total) * 100}%` }}
              />
            </div>

            {/* Arrow Navigation */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prevSlide}
                className="w-8 h-8 rounded-full border border-white/30 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#c59b27] hover:border-[#c59b27] hover:text-black transition-all cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="w-8 h-8 rounded-full border border-white/30 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#c59b27] hover:border-[#c59b27] hover:text-black transition-all cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Search Card Container (Rendered seamlessly above the fold) */}
        {children && (
          <div className="w-full">
            {children}
          </div>
        )}

      </div>

    </section>
  );
}
