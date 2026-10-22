"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function Footer() {
  return (
    <footer className="bg-[#05070a] border-t border-white/10 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Top Hairline Gold Accent Divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#c59b27]/30 to-transparent pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-6 relative z-10">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          
          {/* Col 1: Brand Info & Socials (span 4) */}
          <div className="lg:col-span-4">
            <div className="relative h-11 w-44 mb-4">
              <Image
                src="/images/logo-clean.png"
                alt="Flynova Reisen LLP"
                fill
                className="object-contain"
              />
            </div>

            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed mb-6 max-w-sm">
              Your Trusted Travel Partner in India.
            </p>

            {/* Verified Social Channels */}
            <div className="flex items-center gap-3">
              {/* YouTube */}
              <a
                href={SITE_CONFIG.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#cc181e] flex items-center justify-center text-white hover:opacity-85 transition-opacity"
                aria-label="Flynova Reisen YouTube Channel"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#0077b5] flex items-center justify-center text-white hover:opacity-85 transition-opacity"
                aria-label="Flynova Reisen LinkedIn"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* Pinterest */}
              <a
                href={SITE_CONFIG.social.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#bd081c] flex items-center justify-center text-white hover:opacity-85 transition-opacity"
                aria-label="Flynova Reisen Pinterest"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.057.241-.188.293-.434.177-1.619-.753-2.63-3.122-2.63-5.025 0-4.093 2.974-7.854 8.578-7.854 4.504 0 8.004 3.21 8.004 7.5 0 4.477-2.822 8.08-6.738 8.08-1.316 0-2.553-.684-2.977-1.492l-.811 3.094c-.293 1.127-1.087 2.54-1.618 3.407 1.206.372 2.487.575 3.816.575 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (span 2) */}
          <div className="lg:col-span-2">
            <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/70 font-light">
              <li>
                <Link href="/#hero" className="hover:text-gold-base transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#destinations" className="hover:text-gold-base transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-gold-base transition-colors">
                  All Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-gold-base transition-colors inline-flex items-center gap-1.5 text-white/90 font-medium">
                  <span>Temple Yatras</span>
                  <span className="bg-gold-base text-black text-[9px] font-bold px-1.5 py-0.2 rounded uppercase font-manrope">{SITE_CONFIG.packageCount} Circuits</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Our Company (span 2) */}
          <div className="lg:col-span-2">
            <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-white mb-4">
              Our Company
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/70 font-light">
              <li>
                <Link href="/#services" className="hover:text-gold-base transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-gold-base transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-gold-base transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info (span 4) */}
          <div className="lg:col-span-4">
            <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-white mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-white/75 font-light">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold-base flex-shrink-0" />
                <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="hover:text-gold-base transition-colors font-manrope font-semibold tracking-wider">
                  {SITE_CONFIG.phone}
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold-base flex-shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-gold-base transition-colors">
                  {SITE_CONFIG.email}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-base flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {SITE_CONFIG.address}
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© <span className="font-manrope">{new Date().getFullYear()}</span> {SITE_CONFIG.companyName}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
