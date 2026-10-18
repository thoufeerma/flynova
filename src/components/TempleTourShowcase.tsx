"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, Star, CheckCircle2, MessageCircle, Calendar, Clock, MapPin } from "lucide-react";

interface TempleTourShowcaseProps {
  onOpenPlanModal: (prefillDest?: string) => void;
}

const ITINERARY_DAYS = [
  {
    day: "DAY 01",
    title: "Arrival in Madurai — The Athens of the East",
    route: "Madurai Airport / Railway Station Pick-up · Hotel Check-in · Meenakshi Amman Temple",
    desc: "Warm welcome upon your arrival at Madurai Airport or Railway Station by Flynova's executive chauffeur. Transfer in comfort to your pre-booked premium hotel. In the afternoon, visit the magnificent Thirumalai Nayakar Mahal palace known for its monumental stone pillars. As dusk sets, proceed to the glorious Arulmigu Meenakshi Sundareswarar Temple with its 14 towering, colorfully sculpted Gopurams. Witness the evening prayer rituals and the sacred Golden Lotus tank reflection.",
    darshans: ["Sri Meenakshi Amman Temple", "Lord Sundareswarar Swamy", "Thirumalai Nayakar Palace"],
    stay: "Overnight in Madurai (3★ / 4★ Hotel)",
  },
  {
    day: "DAY 02",
    title: "Madurai to Rameshwaram — Pamban Bridge & 22 Sacred Theerthams",
    route: "Scenic 170 km Highway · Pamban Sea Bridge · Ramanathaswamy Jyotirlinga · Dhanushkodi",
    desc: "After breakfast, scenic drive to the holy island of Rameshwaram. Experience the breathtaking ride across the historic Pamban Sea Bridge overlooking the turquoise ocean waters. Upon arrival and check-in, participate in the holy bath at the 22 Sacred Theerthams (wells) located within the temple premises, followed by peaceful darshan of Lord Ramanathaswamy (one of the 12 sacred Jyotirlingas). In the afternoon, visit Dhanushkodi, the ghost town and the vantage point of Ram Setu (Adam’s Bridge) where the Indian Ocean meets the Bay of Bengal.",
    darshans: ["Agni Theertham Sea Bath", "22 Sacred Well Snanam", "Ramanathaswamy Jyotirlinga (1,212 Pillar Corridor)", "Dhanushkodi Ram Setu Point"],
    stay: "Overnight in Rameshwaram",
  },
  {
    day: "DAY 03",
    title: "Rameshwaram to Kanyakumari — The Triveni Sangam Land’s End",
    route: "Coastal Highway (310 km) · Vivekananda Rock · Thiruvalluvar Statue · Sunset Point",
    desc: "Begin the morning journey to Kanyakumari, India’s southernmost tip where the Arabian Sea, the Indian Ocean, and the Bay of Bengal meet at Triveni Sangam. Check-in to your hotel. Take the ferry to the iconic Vivekananda Rock Memorial and view the towering 133-foot Thiruvalluvar Statue. In the late afternoon, visit the 3000-year-old Kanyakumari Bhagavathy Amman Temple and enjoy the world-famous golden sunset over the triple ocean horizon.",
    darshans: ["Kanyakumari Bhagavathy Amman Temple", "Vivekananda Rock Memorial", "Triveni Sangam Confluence", "Sunset Point"],
    stay: "Overnight in Kanyakumari",
  },
  {
    day: "DAY 04",
    title: "Kanyakumari to Kovalam Beach via Suchindram Temple",
    route: "Suchindram Thanumalayan Temple · Padmanabhapuram Palace · Kovalam Lighthouse Beach",
    desc: "Witness the stunning sunrise over the ocean. After breakfast, head towards the beach paradise of Kovalam in Kerala. En route, stop at the architecturally celebrated Suchindram Thanumalayan Temple, dedicated to the Trinity (Brahma, Vishnu, and Shiva represented in one lingam) featuring musical pillars. Visit the majestic 16th-century wooden Padmanabhapuram Palace. Reach Kovalam by afternoon, check-in to your seaside resort, and spend the evening relaxing by the famous crescent Lighthouse Beach.",
    darshans: ["Suchindram Thanumalayan Trinity Temple & Musical Pillars", "Padmanabhapuram Wooden Palace", "Kovalam Lighthouse Beach"],
    stay: "Overnight in Kovalam / Trivandrum",
  },
  {
    day: "DAY 05",
    title: "Trivandrum Sacred Darshan & Departure",
    route: "Sree Padmanabhaswamy Temple · Attukal Bhagavathy Temple · Departure Transfer",
    desc: "Early morning traditional darshan at the historic Sree Padmanabhaswamy Temple in Trivandrum, renowned globally as one of the holiest Divya Desams and the richest temple in the world, with Lord Vishnu reclining on the multi-headed serpent Anantha (traditional Kerala dhoti/saree dress code adhered). Followed by darshan at Attukal Bhagavathy Temple (Sabari of Women). Return to hotel for breakfast, check out, and Flynova will transfer you to Trivandrum Airport / Railway Station for your onward journey with divine blessings and cherished memories!",
    darshans: ["Sree Padmanabhaswamy Temple (Ananthasayanam posture)", "Attukal Bhagavathy Amman Temple", "Trivandrum City Sightseeing"],
    stay: "Departure Transfer to Trivandrum (TRV) Airport / Railway",
  },
];

export default function TempleTourShowcase({ onOpenPlanModal }: TempleTourShowcaseProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const waText = encodeURIComponent(
    `Hello Flynova Reisen LLP, I am interested in the Madurai - Rameshwaram - Kanyakumari - Kovalam - Trivandrum (4N/5D) Temple Tour Package. Please share customized rates and date availability.`
  );

  return (
    <section id="temple-tours" className="bg-[#080a0c] py-20 lg:py-28 text-white relative">
      <div className="max-w-[1320px] mx-auto px-6">
        
        {/* Banner Card */}
        <div className="relative rounded-lg overflow-hidden border border-[#c59b27]/30 shadow-[0_25px_60px_rgba(0,0,0,0.6)] mb-14">
          <div className="relative h-[360px] sm:h-[420px] lg:h-[460px] w-full">
            <Image
              src="/images/temple-tour-hero.jpg"
              alt="Madurai Meenakshi Temple Potramarai Kulam at twilight"
              fill
              className="object-cover object-center filter brightness-65"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080a0c] via-[#080a0c]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080a0c] via-transparent to-transparent" />
          </div>

          <div className="absolute inset-0 p-6 sm:p-10 lg:p-14 flex flex-col justify-end max-w-[850px]">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="bg-[#c59b27] text-black text-[11px] font-bold tracking-[0.14em] px-3 py-1 rounded uppercase">
                SIGNATURE PILGRIMAGE PACKAGE
              </span>
              <div className="flex items-center gap-1.5 text-xs text-white/90">
                <div className="flex text-[#f7c948]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#f7c948]" />
                  ))}
                </div>
                <span>4.9 / 5 (380+ Devotee Reviews)</span>
              </div>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-[2.6rem] font-normal leading-tight text-white mb-3">
              Madurai, Rameshwaram, Kanyakumari, Kovalam & Trivandrum
            </h2>

            <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed mb-6 hidden sm:block">
              A sacred 5-day spiritual pilgrimage across Tamil Nadu and Kerala. Experience the divine aura of Meenakshi Amman, the holy sea baths & Jyotirlinga at Ramanathaswamy, the sunrise at Vivekananda Rock Memorial, and the world-renowned darshan at Sree Padmanabhaswamy Temple.
            </p>

            {/* Quick Specs Bar */}
            <div className="flex items-center bg-black/60 border border-white/10 rounded p-3 sm:p-4 mb-6 backdrop-blur-md gap-4 sm:gap-6 flex-wrap">
              <div>
                <span className="text-[10px] text-[#e5b94c] uppercase tracking-wider block">Duration</span>
                <span className="text-sm sm:text-base font-semibold text-white">4 Nights / 5 Days</span>
              </div>
              <div className="w-[1px] h-8 bg-white/15" />
              <div>
                <span className="text-[10px] text-[#e5b94c] uppercase tracking-wider block">Tour Type</span>
                <span className="text-sm sm:text-base font-semibold text-white">
                  Private Chauffeur Tour
                </span>
              </div>
              <div className="w-[1px] h-8 bg-white/15 hidden sm:block" />
              <div className="hidden sm:block">
                <span className="text-[10px] text-[#e5b94c] uppercase tracking-wider block">Vehicle</span>
                <span className="text-sm sm:text-base font-semibold text-white">Dedicated AC Sedan / Coach</span>
              </div>
              <div className="w-[1px] h-8 bg-white/15 hidden sm:block" />
              <div className="hidden sm:block">
                <span className="text-[10px] text-[#e5b94c] uppercase tracking-wider block">Stays</span>
                <span className="text-sm sm:text-base font-semibold text-white">Verified 3★ / 4★ Hotels</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <a
                href={`https://wa.me/917306003152?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25d366] hover:bg-[#20ba59] text-white font-semibold text-xs sm:text-sm px-5 sm:px-6 py-3 rounded shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Book via WhatsApp (+91 73060 03152)</span>
              </a>

              <button
                onClick={() => onOpenPlanModal("Sacred South Temple Tour (Madurai - Rameshwaram - Trivandrum)")}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium text-xs sm:text-sm px-5 py-3 rounded backdrop-blur-sm transition-all"
              >
                <span>Customize This Yatra</span>
              </button>
            </div>
          </div>
        </div>

        {/* Day-by-Day Interactive Itinerary Accordion */}
        <div className="bg-[#0f1317] rounded-lg border border-white/10 p-6 sm:p-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-white/10">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-[#c59b27] uppercase block mb-1">
                DAY-BY-DAY SACRED TRAIL
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white">
                Comprehensive 5-Day Detailed Itinerary
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#9fe2bf]">
              <CheckCircle2 className="w-4 h-4 text-[#9fe2bf]" />
              <span>Daily Breakfast · AC Transport · Darshan Guidance</span>
            </div>
          </div>

          <div className="space-y-3.5">
            {ITINERARY_DAYS.map((day, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={day.day}
                  className={`rounded border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-[#c59b27]/50 bg-white/[0.04]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.03]"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-4 sm:p-5 flex items-center gap-4 text-left cursor-pointer"
                  >
                    <span
                      className={`text-xs font-bold tracking-wider px-3 py-1.5 rounded flex-shrink-0 transition-colors ${
                        isOpen
                          ? "bg-[#c59b27] text-black"
                          : "bg-[#171d22] text-[#e5b94c] border border-[#c59b27]/30"
                      }`}
                    >
                      {day.day}
                    </span>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-base sm:text-lg text-white font-normal truncate">
                        {day.title}
                      </h4>
                      <p className="text-xs text-white/50 truncate mt-0.5">{day.route}</p>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-[#c59b27] transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 pt-2 border-t border-white/5 sm:pl-20 text-sm text-white/80 leading-relaxed space-y-4">
                      <p>{day.desc}</p>
                      
                      <div className="bg-black/30 p-4 rounded border border-white/5">
                        <span className="text-[11px] font-bold text-[#e5b94c] uppercase tracking-wider block mb-2">
                          Key Darshans & Highlights
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/90">
                          {day.darshans.map((d) => (
                            <li key={d} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#c59b27]" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-white/60 pt-2 border-t border-dashed border-white/10">
                        <MapPin className="w-3.5 h-3.5 text-[#c59b27]" />
                        <span>{day.stay}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Inclusions / Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-white/10">
            <div className="bg-white/[0.03] p-5 rounded border border-white/10">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#c59b27] mb-3">
                Package Inclusions
              </h5>
              <ul className="space-y-2 text-xs text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#25d366] mt-0.5 flex-shrink-0" />
                  <span>04 Nights accommodation in verified 3★ / 4★ hotels</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#25d366] mt-0.5 flex-shrink-0" />
                  <span>Daily lavish buffet breakfast at all hotels</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#25d366] mt-0.5 flex-shrink-0" />
                  <span>Dedicated AC Sedan / Innova for the entire 5-day tour</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#25d366] mt-0.5 flex-shrink-0" />
                  <span>Experienced polite driver, fuel, tolls, interstate permits & parking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#25d366] mt-0.5 flex-shrink-0" />
                  <span>Temple darshan timings coordination & dress code guidance</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/[0.03] p-5 rounded border border-white/10">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#c59b27] mb-3">
                Custom Upgrades Available
              </h5>
              <ul className="space-y-2 text-xs text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-[#c59b27] font-bold">•</span>
                  <span>VIP Special Darshan tickets facilitation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c59b27] font-bold">•</span>
                  <span>Connecting flight ticket booking from your home city</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c59b27] font-bold">•</span>
                  <span>South Indian traditional pure vegetarian meal plans</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c59b27] font-bold">•</span>
                  <span>Extension to Madurai or Rameshwaram private pooja services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c59b27] font-bold">•</span>
                  <span>Upgrades to 5-star beachfront luxury resorts in Kovalam</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
