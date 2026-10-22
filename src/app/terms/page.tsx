"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TripModal from "@/components/TripModal";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function TermsPage() {
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
          <span className="text-white/80">Terms &amp; Conditions</span>
        </div>
      </div>

      {/* Content */}
      <section className="py-16 sm:py-20 flex-1">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-gold-base block mb-2 font-sans">
            LEGAL &amp; COMPLIANCE
          </span>
          <h1 className="font-serif font-playfair text-3xl sm:text-5xl font-normal text-white mb-6">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs text-white/50 mb-10 font-sans">
            {SITE_CONFIG.companyName} · Terms of Service
          </p>

          <div className="space-y-8 text-sm sm:text-base text-white/75 font-light leading-relaxed font-sans">
            <div>
              <h2 className="font-serif font-playfair text-xl sm:text-2xl font-normal text-white mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By requesting an itinerary quotation, making a travel reservation, or utilizing services provided by {SITE_CONFIG.companyName}, you agree to abide by these terms and conditions.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-white mb-3">
                2. Quotations &amp; Custom Itineraries
              </h2>
              <p>
                All itineraries and personalized quotations provided by {SITE_CONFIG.companyName} are tailored based on requested dates, accommodation category, and group size. Bookings are subject to hotel room and private transport availability at the time of final confirmation and advance deposit.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-white mb-3">
                3. Temple Darshans &amp; Local Regulations
              </h2>
              <p>
                Certain temples and heritage shrines in South India enforce traditional dress codes and entry guidelines (e.g. Sree Padmanabhaswamy Temple in Trivandrum). Our chauffeurs and concierges advise guests on proper protocol, but entry remains governed by temple devaswom boards and local shrine authorities.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-white mb-3">
                4. Cancellations &amp; Rescheduling
              </h2>
              <p>
                Cancellation terms vary based on hotel partner policies and seasonal peak dates. Customized cancellation and refund terms are clearly detailed in your individual booking confirmation voucher.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-white mb-3">
                5. Registered Office &amp; Contact
              </h2>
              <p>
                {SITE_CONFIG.companyName} is registered under the Ministry of Corporate Affairs at {SITE_CONFIG.address}. For questions, inquiries, or support, reach us at <a href={`mailto:${SITE_CONFIG.email}`} className="text-gold-base underline">{SITE_CONFIG.email}</a> or <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="text-gold-base underline">{SITE_CONFIG.phone}</a>.
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
