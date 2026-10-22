"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight, MapPin, Calendar, Users, ChevronDown } from "lucide-react";
import PrimaryButton from "@/components/ui/PrimaryButton";

interface HeroSectionProps {
  onOpenPlanModal: (destName?: string) => void;
  onSearch: (params: { destination: string; dates: string; travellers: string }) => void;
}

const SLIDES = [
  {
    id: "india",
    title: "INDIA",
    titleClass: "text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] xl:text-[11.6rem] tracking-[0.16em] sm:tracking-[0.22em] md:tracking-[0.26em]",
    subtitle: "Discover India, Your Way",
    cta: "Explore Our Journeys",
    target: "Bespoke India Tour",
    image: "/images/hero-india.jpg",
    alt: "Majestic Taj Mahal framed by an ancient ivy-covered stone archway at sunrise",
    location: "Agra · Golden Triangle",
  },
  {
    id: "kerala",
    title: "KERALA",
    titleClass: "text-5xl sm:text-7xl md:text-8xl lg:text-[8.4rem] xl:text-[9.4rem] tracking-[0.12em] sm:tracking-[0.16em] md:tracking-[0.20em]",
    subtitle: "Discover Kerala, Your Way",
    cta: "Explore Kerala Journeys",
    target: "Kerala Backwaters & Munnar",
    image: "/images/hero-kerala.jpg",
    alt: "Kerala backwaters luxury houseboat gliding under tropical palm stone archway at sunset",
    location: "Alleppey · God's Own Country",
  },
  {
    id: "kashmir",
    title: "KASHMIR",
    titleClass: "text-4xl sm:text-6xl md:text-7xl lg:text-[7.2rem] xl:text-[8.2rem] tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.15em]",
    subtitle: "Discover Kashmir, Your Way",
    cta: "Explore Kashmir Journeys",
    target: "Kashmir & Dal Lake Retreat",
    image: "/images/hero-kashmir.jpg",
    alt: "Kashmir Dal Lake shikara framed through ornate wooden jharokha with snow mountains",
    location: "Srinagar · Dal Lake & Himalayas",
  },
  {
    id: "lakshadweep",
    title: "LAKSHADWEEP",
    titleClass: "text-3xl sm:text-5xl md:text-6xl lg:text-[5.4rem] xl:text-[6.4rem] tracking-[0.06em] sm:tracking-[0.09em] md:tracking-[0.12em]",
    subtitle: "Discover Lakshadweep, Your Way",
    cta: "Explore Island Retreats",
    target: "Lakshadweep Coral Islands",
    image: "/images/hero-lakshadweep.jpg",
    alt: "Lakshadweep turquoise lagoon and catamaran framed under curved palm trunk archway at sunset",
    location: "Agatti & Bangaram · Coral Paradise",
  },
  {
    id: "goa",
    title: "GOA",
    titleClass: "text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[12.4rem] tracking-[0.18em] sm:tracking-[0.24em] md:tracking-[0.28em]",
    subtitle: "Discover Goa, Your Way",
    cta: "Explore Coastal Getaways",
    target: "Goa Luxury Beach & Heritage",
    image: "/images/hero-goa.jpg",
    alt: "Goa sunset beach and boat framed through historic Portuguese stone archway with bougainvillea",
    location: "Palolem & Panaji · Coastal Sunshine",
  },
];

// Infinite loop slides array: [Clone of last, ...SLIDES, Clone of first]
const EXTENDED_SLIDES = [
  SLIDES[SLIDES.length - 1], // Clone of Goa (idx 0)
  ...SLIDES,                  // Real: India (1), Kerala (2), Kashmir (3), Lakshadweep (4), Goa (5)
  SLIDES[0],                  // Clone of India (idx 6)
];

const SLIDE_DURATION = 4500; // 4.5 seconds per slide
const TRANSITION_DURATION = 800; // 800ms smooth cubic-bezier glide

export default function HeroSection({ onOpenPlanModal, onSearch }: HeroSectionProps) {
  // Start at index 1 (the first real slide: India)
  const [currentIndex, setCurrentIndex] = useState(1);
  const [withTransition, setWithTransition] = useState(true);

  // Search form state
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [travellers, setTravellers] = useState("2 travellers");

  // Refs for state and timer management
  const currentIndexRef = useRef(currentIndex);
  currentIndexRef.current = currentIndex;

  const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const boundaryResetTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastActionTimeRef = useRef<number>(0);

  // Touch tracking
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // Compute active real slide index (0 to 2) safely for all index values
  const displayIndex = ((currentIndex - 1) % SLIDES.length + SLIDES.length) % SLIDES.length;
  const active = SLIDES[displayIndex];

  // Core slide mover function
  const moveToSlide = useCallback((targetIndex: number) => {
    // Clamp to valid range so it never translates to non-existent indices
    const clampedIndex = Math.max(0, Math.min(targetIndex, EXTENDED_SLIDES.length - 1));

    // Clear any pending boundary reset timers
    if (boundaryResetTimerRef.current) {
      clearTimeout(boundaryResetTimerRef.current);
      boundaryResetTimerRef.current = null;
    }

    setWithTransition(true);
    setCurrentIndex(clampedIndex);

    // If targetIndex is a clone boundary, silently snap to real counterpart after transition
    if (clampedIndex === 0) {
      boundaryResetTimerRef.current = setTimeout(() => {
        setWithTransition(false);
        setCurrentIndex(SLIDES.length); // real Kashmir (index 3)
        // Re-enable transition for subsequent slides
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setWithTransition(true);
          });
        });
      }, TRANSITION_DURATION + 30);
    } else if (clampedIndex === EXTENDED_SLIDES.length - 1) {
      boundaryResetTimerRef.current = setTimeout(() => {
        setWithTransition(false);
        setCurrentIndex(1); // real India (index 1)
        // Re-enable transition for subsequent slides
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setWithTransition(true);
          });
        });
      }, TRANSITION_DURATION + 30);
    }
  }, []);

  // Advance to next slide
  const nextSlide = useCallback(() => {
    const now = Date.now();
    if (now - lastActionTimeRef.current < 500) return; // prevent rapid double clicks
    lastActionTimeRef.current = now;
    const curr = currentIndexRef.current;
    if (curr >= EXTENDED_SLIDES.length - 1) {
      // If at clone India (4), jump to real India (1) first and glide to Kerala (2)
      setWithTransition(false);
      setCurrentIndex(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          moveToSlide(2);
        });
      });
      return;
    }
    moveToSlide(curr + 1);
  }, [moveToSlide]);

  // Go to previous slide
  const prevSlide = useCallback(() => {
    const now = Date.now();
    if (now - lastActionTimeRef.current < 500) return;
    lastActionTimeRef.current = now;
    const curr = currentIndexRef.current;
    if (curr <= 0) {
      // If at clone Kashmir (0), jump to real Kashmir (3) first and glide to Kerala (2)
      setWithTransition(false);
      setCurrentIndex(SLIDES.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          moveToSlide(SLIDES.length - 1);
        });
      });
      return;
    }
    moveToSlide(curr - 1);
  }, [moveToSlide]);

  // Jump to specific slide via dot indicator
  const goToSlide = (slideIdx: number) => {
    const now = Date.now();
    if (now - lastActionTimeRef.current < 400) return;
    lastActionTimeRef.current = now;
    moveToSlide(slideIdx + 1);
    resetAutoSlideTimer();
  };

  // Restart the auto-slide timer whenever user interacts
  const resetAutoSlideTimer = useCallback(() => {
    if (autoSlideTimerRef.current) {
      clearInterval(autoSlideTimerRef.current);
    }
    autoSlideTimerRef.current = setInterval(() => {
      moveToSlide(currentIndexRef.current + 1);
    }, SLIDE_DURATION);
  }, [moveToSlide]);

  // Start auto-slide timer on mount
  useEffect(() => {
    autoSlideTimerRef.current = setInterval(() => {
      moveToSlide(currentIndexRef.current + 1);
    }, SLIDE_DURATION);

    return () => {
      if (autoSlideTimerRef.current) clearInterval(autoSlideTimerRef.current);
      if (boundaryResetTimerRef.current) clearTimeout(boundaryResetTimerRef.current);
    };
  }, [moveToSlide]);

  // Keyboard navigation (Left / Right arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
        resetAutoSlideTimer();
      } else if (e.key === "ArrowRight") {
        nextSlide();
        resetAutoSlideTimer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide, resetAutoSlideTimer]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = touchStartXRef.current - e.changedTouches[0].clientX;
    const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      resetAutoSlideTimer();
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const handleManualNext = () => {
    nextSlide();
    resetAutoSlideTimer();
  };

  const handleManualPrev = () => {
    prevSlide();
    resetAutoSlideTimer();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      destination: destination || active.target,
      dates: dates || "Winter Peak Season",
      travellers,
    });
  };

  return (
    <>
      {/* 1. Fullscreen Hero Section with Smooth Horizontal Sliding Carousel */}
      <section
        id="hero"
        aria-label="Flynova Curated India Hero Slides"
        className="relative w-full h-screen min-h-[640px] flex flex-col justify-between overflow-hidden bg-dark-deep select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Horizontal Slider Track */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className="flex w-full h-full will-change-transform"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: withTransition
                ? `transform ${TRANSITION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`
                : "none",
            }}
          >
            {EXTENDED_SLIDES.map((slide, idx) => {
              const isCurrent = idx === currentIndex;
              return (
                <div
                  key={`${slide.id}-${idx}`}
                  className="w-full h-full shrink-0 relative flex flex-col justify-between overflow-hidden bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                  }}
                >
                  {/* Background Image with Archway Framing */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      priority={true}
                      unoptimized={true}
                      sizes="100vw"
                      className={`object-cover object-center transition-transform duration-[7000ms] ease-out ${
                        isCurrent ? "scale-105" : "scale-100"
                      }`}
                    />

                    {/* Dark Vignettes & Atmospheric Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/65" />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>

                  {/* Top spacer (to offset fixed transparent header) */}
                  <div className="h-28 sm:h-32 relative z-10 pointer-events-none" />

                  {/* Center: Destination Title optically framed inside the archway */}
                  <div className="relative z-10 w-full max-w-[94vw] sm:max-w-[88vw] lg:max-w-[80vw] mx-auto px-4 flex flex-col items-center justify-center my-auto overflow-hidden pointer-events-none">
                    <div className="w-full flex items-center justify-center overflow-hidden">
                      <h1
                        className={`font-serif font-playfair font-normal text-[#f7f5f0] leading-none text-center select-none whitespace-nowrap drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] ${slide.titleClass}`}
                      >
                        {slide.title}
                      </h1>
                    </div>
                  </div>

                  {/* Bottom spacer to reserve space for bottom controls */}
                  <div className="h-28 sm:h-36 relative z-10 pointer-events-none" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Fixed Bottom Bar: Tagline, Slider Controls & CTA Button */}
        <div className="absolute bottom-0 left-0 right-0 z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 pb-8 sm:pb-12 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 pointer-events-auto">
          
          {/* Bottom Left: Supporting Tagline in Playfair Display */}
          <div className="text-center sm:text-left min-h-[36px] flex items-center">
            <p
              key={active.subtitle}
              className="font-serif font-playfair text-xl sm:text-2xl md:text-3xl lg:text-[2rem] text-[#f7f5f0]/95 font-normal tracking-wide animate-fadeInSlide drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]"
            >
              {active.subtitle}
            </p>
          </div>

          {/* Slider Controls: Subtle Pagination & Navigation Arrows */}
          <div className="flex items-center gap-4 order-last sm:order-none bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
            <button
              type="button"
              onClick={handleManualPrev}
              aria-label="Previous destination"
              className="w-9 h-9 rounded-full border border-white/20 bg-black/40 flex items-center justify-center text-white/80 hover:text-white hover:border-[#dcb037] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Pagination Indicators */}
            <div className="flex items-center gap-2 px-1">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`transition-all duration-300 cursor-pointer ${
                    idx === displayIndex
                      ? "w-8 h-1.5 bg-[#dcb037] rounded-full shadow-[0_0_8px_rgba(220,176,55,0.8)]"
                      : "w-2.5 h-1.5 bg-white/30 hover:bg-white/60 rounded-full"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleManualNext}
              aria-label="Next destination"
              className="w-9 h-9 rounded-full border border-white/20 bg-black/40 flex items-center justify-center text-white/80 hover:text-white hover:border-[#dcb037] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Right: Thin White/Gold Outlined Rectangle CTA Button in Playfair Display */}
          <div>
            <button
              type="button"
              onClick={() => onOpenPlanModal(active.target)}
              className="border border-white/70 hover:border-[#dcb037] bg-black/30 hover:bg-[#dcb037] text-white hover:text-black font-serif font-playfair font-normal text-xs sm:text-sm tracking-widest px-8 sm:px-10 py-3 sm:py-3.5 transition-all duration-300 cursor-pointer rounded-none backdrop-blur-xs shadow-xl group"
            >
              <span className="group-hover:tracking-[0.18em] transition-all duration-300">{active.cta}</span>
            </button>
          </div>

        </div>

      </section>

      {/* 2. Floating / Integrated Trip Finder Search Bar (Right under Fullscreen Hero) */}
      <section id="trip-finder" className="bg-dark-deep relative z-30 py-6 sm:py-8 border-b border-white/10">
        <div className="max-w-[1360px] mx-auto px-6">
          <form
            onSubmit={handleSearchSubmit}
            className="bg-dark-elevated/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 sm:p-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2 text-white"
          >
            {/* Field 1: Destination */}
            <div className="flex-1 flex items-center gap-3.5 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors relative cursor-pointer group">
              <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gold-base flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex-1 flex flex-col min-w-0">
                <span className="text-[10px] font-bold tracking-wider text-white/50 uppercase">
                  Destination
                </span>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="text-xs sm:text-sm text-white font-medium bg-transparent outline-none cursor-pointer appearance-none w-full pr-5 truncate"
                >
                  <option value="" className="bg-dark-surface text-white">Where do you want to go?</option>
                  <option value="Kerala & Backwaters" className="bg-dark-surface text-white">Kerala (Alleppey, Munnar, Kovalam)</option>
                  <option value="Kashmir Dream Getaway" className="bg-dark-surface text-white">Kashmir & Dal Lake (Gulmarg, Pahalgam)</option>
                  <option value="Goa Beach Holiday" className="bg-dark-surface text-white">Goa (North Goa, South Goa)</option>
                  <option value="Sacred South Temple Tour" className="bg-dark-surface text-white">Sacred South Temple Tour</option>
                  <option value="Royal Rajasthan" className="bg-dark-surface text-white">Jaipur & Royal Rajasthan</option>
                  <option value="Lakshadweep Islands" className="bg-dark-surface text-white">Lakshadweep Coral Lagoons</option>
                </select>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors pointer-events-none" />
            </div>

            <div className="hidden lg:block w-[1px] h-8 bg-white/10" />

            {/* Field 2: Travel dates */}
            <div className="flex-1 flex items-center gap-3.5 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors relative cursor-pointer group">
              <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gold-base flex-shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="flex-1 flex flex-col min-w-0">
                <span className="text-[10px] font-bold tracking-wider text-white/50 uppercase">
                  Travel dates
                </span>
                <select
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  className="text-xs sm:text-sm text-white font-medium bg-transparent outline-none cursor-pointer appearance-none w-full pr-5 truncate"
                >
                  <option value="" className="bg-dark-surface text-white">Add dates</option>
                  <option value="Immediate Departure" className="bg-dark-surface text-white">This Month (Immediate Departure)</option>
                  <option value="Next Month" className="bg-dark-surface text-white">Next Month</option>
                  <option value="Winter Holiday Season" className="bg-dark-surface text-white">Nov – Feb (Winter Peak Season)</option>
                  <option value="Summer Holidays" className="bg-dark-surface text-white">Mar – May (Summer Holidays)</option>
                  <option value="Monsoon & Ayurveda" className="bg-dark-surface text-white">Jun – Aug (Monsoon Season)</option>
                </select>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors pointer-events-none" />
            </div>

            <div className="hidden lg:block w-[1px] h-8 bg-white/10" />

            {/* Field 3: Travellers */}
            <div className="flex-1 flex items-center gap-3.5 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors relative cursor-pointer group">
              <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gold-base flex-shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div className="flex-1 flex flex-col min-w-0">
                <span className="text-[10px] font-bold tracking-wider text-white/50 uppercase">
                  Travellers
                </span>
                <select
                  value={travellers}
                  onChange={(e) => setTravellers(e.target.value)}
                  className="text-xs sm:text-sm text-white font-medium bg-transparent outline-none cursor-pointer appearance-none w-full pr-5 truncate"
                >
                  <option value="2 travellers" className="bg-dark-surface text-white">2 travellers</option>
                  <option value="1 traveller (Solo)" className="bg-dark-surface text-white">1 traveller (Solo)</option>
                  <option value="3-5 travellers (Family)" className="bg-dark-surface text-white">3–5 travellers (Family)</option>
                  <option value="6-15 travellers (Group)" className="bg-dark-surface text-white">6–15 travellers (Group)</option>
                  <option value="15+ travellers" className="bg-dark-surface text-white">15+ travellers</option>
                </select>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors pointer-events-none" />
            </div>

            {/* Action Submit Button */}
            <PrimaryButton
              type="submit"
              className="rounded-xl px-7 py-3.5 flex-shrink-0"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Find a Trip
            </PrimaryButton>
          </form>
        </div>
      </section>
    </>
  );
}
