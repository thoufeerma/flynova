"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface LoadingScreenProps {
  minDuration?: number; // Minimum display time in ms (default 1400)
}

export default function LoadingScreen({ minDuration = 1400 }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [statusText, setStatusText] = useState("Curating Kerala Backwaters & Munnar Hills...");

  useEffect(() => {
    // Lock body scroll while loading screen is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const startTime = Date.now();
    let animationFrameId: number;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / minDuration) * 100));

      setProgress(rawProgress);

      if (rawProgress < 35) {
        setStatusText("Curating Kerala Backwaters & Munnar Hills...");
      } else if (rawProgress < 70) {
        setStatusText("Preparing Sacred South Temple Yatras...");
      } else if (rawProgress < 95) {
        setStatusText("Discover Incredible India, Your Way...");
      } else {
        setStatusText("Welcome to Flynova Reisen");
      }

      if (rawProgress < 100) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        // Reached 100% - brief pause then trigger smooth luxury exit
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsDone(true);
            document.body.style.overflow = originalOverflow || "";
          }, 700); // 700ms matches exit transition
        }, 180);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = originalOverflow || "";
    };
  }, [minDuration]);

  if (isDone) return null;

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsDone(true);
      document.body.style.overflow = "";
    }, 400);
  };

  return (
    <div
      role="status"
      aria-label="Loading Flynova Reisen"
      className={`fixed inset-0 z-[99999] bg-dark-deep flex flex-col items-center justify-center select-none overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExiting
          ? "opacity-0 scale-105 pointer-events-none filter blur-sm"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Background ambient gold aura */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-[radial-gradient(circle,rgba(220,176,55,0.12)_0%,rgba(197,155,39,0.04)_45%,transparent_70%)] rounded-full animate-pulse-gold" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,var(--color-dark-deep)_95%)]" />
      </div>

      {/* Decorative hairline corner borders */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-gold-base/30 pointer-events-none" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-gold-base/30 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-gold-base/30 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-gold-base/30 pointer-events-none" />

      {/* Skip button for quick bypass */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute top-6 right-16 text-white/30 hover:text-white/80 text-[11px] tracking-widest font-sans uppercase transition-colors px-2 py-1 rounded cursor-pointer z-10"
      >
        Skip
      </button>

      {/* Central Brand Emblem & Loading Experience */}
      <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
        
        {/* Animated concentric gold rings */}
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 mb-8 flex items-center justify-center">
          
          {/* Outer slow-spinning compass ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-gold-base/25 animate-[spin_18s_linear_infinite]" />
          
          {/* Inner reverse-spinning golden ring with indicator notches */}
          <div className="absolute inset-2 rounded-full border border-gold-base/40 border-t-transparent border-b-transparent animate-[spin_10s_linear_infinite_reverse]" />
          
          {/* Glowing central pulse disc */}
          <div className="absolute inset-5 rounded-full bg-gradient-to-tr from-gold-base/20 via-gold-light/10 to-transparent backdrop-blur-sm animate-pulse" />

          {/* Golden cardinal points */}
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gold-base rounded-full shadow-[0_0_8px_var(--color-gold-base)]" />
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gold-base rounded-full shadow-[0_0_8px_var(--color-gold-base)]" />
          <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-1.5 h-1.5 bg-gold-base rounded-full shadow-[0_0_8px_var(--color-gold-base)]" />
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 bg-gold-base rounded-full shadow-[0_0_8px_var(--color-gold-base)]" />

          {/* Crisp Centered Flynova Logo */}
          <div className="relative w-20 h-10 sm:w-24 sm:h-12 z-10 drop-shadow-[0_2px_16px_rgba(197,155,39,0.45)]">
            <Image
              src="/images/logo-clean.png"
              alt="Flynova Reisen"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Brand Name in Playfair Display */}
        <h2 className="font-serif text-2xl sm:text-3xl text-white tracking-[0.28em] uppercase font-normal mb-1.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          Flynova Reisen
        </h2>

        {/* Subtitle / Location */}
        <p className="font-serif italic text-xs sm:text-sm text-gold-light tracking-[0.2em] uppercase mb-8">
          Incredible India · Bespoke Journeys
        </p>

        {/* Sleek Hairline Progress Bar */}
        <div className="w-56 sm:w-64 flex flex-col items-center gap-3">
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark transition-all duration-150 ease-out shadow-[0_0_12px_rgba(220,176,55,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Progress Percent & Dynamic Status */}
          <div className="w-full flex items-center justify-between text-[11px] font-sans tracking-widest text-white/50">
            <span className="text-gold-base font-mono font-medium">
              {progress.toString().padStart(2, "0")}%
            </span>
            <span className="text-white/40 uppercase tracking-widest text-[9px]">
              Loading
            </span>
          </div>

          {/* Cycling Status Label */}
          <p className="text-[11px] sm:text-xs text-white/60 font-serif italic tracking-wide h-4 transition-all duration-300">
            {statusText}
          </p>
        </div>

      </div>

      {/* Bottom Footer Note */}
      <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
        <p className="text-[10px] tracking-[0.25em] text-white/25 uppercase font-sans">
          Flynova Reisen LLP · India
        </p>
      </div>
    </div>
  );
}
