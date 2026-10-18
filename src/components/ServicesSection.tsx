"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";

interface ServicesSectionProps {
  onOpenPlanModal: (serviceName?: string) => void;
}

const SERVICES = [
  {
    id: "flights",
    title: "Flight Ticket Booking",
    desc: "Best fares, hassle-free bookings for domestic travel.",
    image: "/images/flight-booking.jpg",
    alt: "Commercial passenger airplane soaring above sunrise clouds",
  },
  {
    id: "hotels",
    title: "Hotel Reservations",
    desc: "Comfortable stays across India's top destinations.",
    image: "/images/hotel-booking.jpg",
    alt: "Luxury 5-star resort hotel suite bedroom",
  },
  {
    id: "packages",
    title: "Tour Packages",
    desc: "Customized holiday, honeymoon and group packages.",
    image: "/images/tour-suv.jpg",
    alt: "Luxury 4x4 SUV traveller vehicle driving through scenic nature",
  },
];

export default function ServicesSection({ onOpenPlanModal }: ServicesSectionProps) {
  return (
    <section id="services" className="bg-[#07090b] py-16 sm:py-24 text-white relative border-t border-white/5">
      <div className="max-w-[1360px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#dcb037] block mb-2.5">
              OUR SERVICES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Complete Travel <span className="text-[#dcb037]">Solutions</span>
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onOpenPlanModal("Travel Services Inquiry")}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-white/70 hover:text-[#dcb037] transition-colors group cursor-pointer"
          >
            <span>Explore all services</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* 3 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {SERVICES.map((serv) => (
            <div
              key={serv.id}
              onClick={() => onOpenPlanModal(serv.title)}
              className="group relative h-[340px] sm:h-[380px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.6)] cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:border-[#dcb037]/50"
            >
              {/* Card Photo */}
              <Image
                src={serv.image}
                alt={serv.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

              {/* Card Content & Action Button */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between gap-4">
                <div className="max-w-[80%]">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight mb-1.5 group-hover:text-[#dcb037] transition-colors">
                    {serv.title}
                  </h3>
                  <p className="text-xs text-white/75 font-normal leading-relaxed">
                    {serv.desc}
                  </p>
                </div>

                {/* Circle Gold Arrow Button */}
                <div className="w-10 h-10 rounded-full bg-black/40 border border-white/20 backdrop-blur-md flex items-center justify-center text-white/90 group-hover:bg-[#dcb037] group-hover:border-[#dcb037] group-hover:text-black transition-all duration-300 flex-shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
