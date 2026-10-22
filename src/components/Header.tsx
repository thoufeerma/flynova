"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";

interface HeaderProps {
  onOpenPlanModal: () => void;
  onSearchClick?: () => void;
}

export default function Header({ onOpenPlanModal, onSearchClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  interface NavLink {
    label: string;
    href: string;
    badge?: string;
  }

  const navLinks: NavLink[] = [
    { label: "About", href: "/#about" },
    { label: "Destinations", href: "/#destinations" },
    { label: "Packages", href: "/packages" },
    { label: "Kerala", href: "/#kerala-3d" },
    { label: "Reviews", href: "/#reviews" },
    { label: "Gallery", href: "/#gallery" },
  ];

  const mobileMenuContent = (
    <div
      className={`fixed inset-0 w-screen h-screen z-[9999] lg:hidden transition-all duration-300 ${
        mobileMenuOpen ? "opacity-100 pointer-events-auto visible" : "opacity-0 pointer-events-none invisible"
      }`}
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, width: "100vw", height: "100vh" }}
    >
      <div className="absolute inset-0 bg-[#05070a] w-full h-full p-6 flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Top Bar with Brand Logo and Close Button */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <div className="relative h-10 w-36">
              <Image
                src="/images/logo-clean.png"
                alt="Flynova Reisen LLP"
                fill
                className="object-contain"
              />
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col py-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif font-playfair text-xl font-normal text-white/90 hover:text-[#f3cb6b] transition-colors py-3 border-b border-white/5 flex items-center justify-between"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="bg-[#c59b27] text-black text-[10px] font-sans font-bold px-2 py-0.5 rounded-full uppercase">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenPlanModal();
            }}
            className="w-full bg-[#c59b27] hover:bg-[#dcb037] text-black font-serif font-playfair font-semibold text-xs tracking-[0.12em] uppercase py-3.5 rounded-full flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer active:scale-95"
          >
            <span>Plan Your Trip</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <div className="text-xs text-white/50 text-center font-mono">
            {SITE_CONFIG.phoneDisplay}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#05070a]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
            : "bg-[#05070a] lg:bg-gradient-to-b lg:from-black/80 lg:via-black/40 lg:to-transparent border-b border-white/10 lg:border-transparent py-3.5 lg:py-5"
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-6 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="inline-flex items-center group">
            <div className="relative h-10 w-36 sm:h-11 sm:w-44 transition-transform duration-300 group-hover:-translate-y-0.5">
              <Image
                src="/images/logo-clean.png"
                alt="Flynova Reisen LLP"
                fill
                priority
                className="object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links (Playfair Display matching reference mockup) */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-serif font-playfair text-[15px] sm:text-base font-normal tracking-wide text-[#f7f5f0]/95 hover:text-[#f3cb6b] transition-colors py-1 inline-flex items-center gap-2 group"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="bg-[#c59b27] group-hover:bg-[#dcb037] text-black text-[9px] font-sans font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider transition-colors shadow-sm">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right CTA Button & Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenPlanModal}
              className="hidden sm:inline-flex bg-[#c59b27] hover:bg-[#dcb037] text-black font-serif font-playfair font-semibold text-xs tracking-[0.12em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 shadow-[0_4px_18px_rgba(197,155,39,0.35)] hover:shadow-[0_6px_22px_rgba(197,155,39,0.55)] items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>Plan Your Trip</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-white hover:text-[#dcb037] transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </header>

      {/* Render mobile full-screen overlay outside <header> using portal to avoid backdrop-filter/fixed clipping */}
      {mounted && typeof document !== "undefined"
        ? createPortal(mobileMenuContent, document.body)
        : null}
    </>
  );
}
