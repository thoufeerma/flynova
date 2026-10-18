"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#05070a] border-t border-white/10 text-white pt-16 pb-8">
      <div className="max-w-[1360px] mx-auto px-6">
        
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

            {/* Social Icons matching mockup */}
            <div className="flex items-center gap-3">
              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#cc181e] flex items-center justify-center text-white hover:opacity-85 transition-opacity"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white hover:opacity-85 transition-opacity"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#0077b5] flex items-center justify-center text-white hover:opacity-85 transition-opacity"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* Pinterest */}
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#bd081c] flex items-center justify-center text-white hover:opacity-85 transition-opacity"
                aria-label="Pinterest"
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
                <Link href="/#hero" className="hover:text-[#dcb037] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#destinations" className="hover:text-[#dcb037] transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-[#dcb037] transition-colors">
                  All Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-[#dcb037] transition-colors inline-flex items-center gap-1.5 text-white/90 font-medium">
                  <span>Temple Yatras</span>
                  <span className="bg-[#c59b27] text-black text-[9px] font-bold px-1.5 py-0.2 rounded font-sans uppercase">28 Circuits</span>
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
                <Link href="#services" className="hover:text-[#dcb037] transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-[#dcb037] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-[#dcb037] transition-colors">
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
                <Phone className="w-4 h-4 text-[#dcb037] flex-shrink-0" />
                <a href="tel:+917306003152" className="hover:text-[#dcb037] transition-colors font-mono">
                  +91 7306003152
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#dcb037] flex-shrink-0" />
                <a href="mailto:flynovareisen@gmail.com" className="hover:text-[#dcb037] transition-colors">
                  flynovareisen@gmail.com
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#dcb037] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  NO.102, Travancore Twinkle, Ayyappankavu Road, Ayyappankavu, Ernakulam, Kerala, India, 682018
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© 2025 Flynova Reisen LLP. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span>|</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms & Conditions</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
