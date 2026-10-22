"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TripModal from "@/components/TripModal";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function PrivacyPolicyPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-dark-deep text-white flex flex-col selection:bg-gold-base selection:text-black">
      <Header onOpenPlanModal={() => setModalOpen(true)} />

      {/* Breadcrumb */}
      <div className="border-b border-white/10 bg-dark-surface py-3 px-6 mt-16 sm:mt-20">
        <div className="max-w-[1360px] mx-auto flex items-center gap-2 text-xs text-white/50">
          <Link href="/" className="hover:text-gold-base transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-white/80">Privacy Policy</span>
        </div>
      </div>

      {/* Content */}
      <section className="py-16 sm:py-20 flex-1">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-gold-base block mb-2 font-sans">
            LEGAL &amp; COMPLIANCE
          </span>
          <h1 className="font-serif font-playfair text-3xl sm:text-5xl font-normal text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-xs text-white/50 mb-10 font-sans">
            {SITE_CONFIG.companyName} · Official Privacy Statement
          </p>

          <div className="space-y-8 text-sm sm:text-base text-white/75 font-light leading-relaxed font-sans">
            <div>
              <h2 className="font-serif font-playfair text-xl sm:text-2xl font-normal text-white mb-3">
                1. Overview
              </h2>
              <p>
                {SITE_CONFIG.companyName} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), registered at {SITE_CONFIG.address}, respects your privacy and is committed to protecting the personal information you share with us during your travel enquiries, bookings, and journey planning across India.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-white mb-3">
                2. Information We Collect
              </h2>
              <p>
                When you interact with our website or contact our travel specialists via WhatsApp or phone, we may collect:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1.5 pl-2 text-white/70">
                <li>Your name, phone number, and email address.</li>
                <li>Travel preferences, passenger counts, planned dates, and destination interests.</li>
                <li>Special pilgrimage or dietary requirements shared voluntarily for bespoke itinerary design.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-white mb-3">
                3. How We Use Your Information
              </h2>
              <p>
                Your information is used strictly to curate, coordinate, and fulfill personalized travel experiences, including arranging chauffeur transport, verified hotel accommodations, and temple darshan appointments. We do not sell or rent your personal data to third parties.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-white mb-3">
                4. Data Security &amp; Contact
              </h2>
              <p>
                We apply standard administrative and technical safeguards to keep your communications secure. For questions regarding this privacy policy or your data, contact our lead coordinator {SITE_CONFIG.leadContact} at <a href={`mailto:${SITE_CONFIG.email}`} className="text-gold-base underline">{SITE_CONFIG.email}</a> or call <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="text-gold-base underline">{SITE_CONFIG.phone}</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <TripModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </main>
  );
}
