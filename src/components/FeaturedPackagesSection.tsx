"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Moon, Building2, Car, Sparkles } from "lucide-react";

interface FeaturedPackagesProps {
  onSelectPackage: (pkgName: string) => void;
}

const PACKAGES = [
  {
    id: "bsi-18",
    title: "Madurai, Rameshwaram, Kanyakumari, Kovalam & Trivandrum",
    route: "Madurai • Rameshwaram • Kanyakumari • Kovalam • Trivandrum",
    days: "5 Days",
    nights: "4 Nights",
    stay: "Hotel + Chauffeur",
    image: "/images/temple-tour-hero.jpg",
    alt: "Madurai Meenakshi, Rameshwaram, Kanyakumari and Trivandrum Temple Tour",
    href: "/package/bsi-18",
    badge: "BESTSELLER · BSI-18",
  },
  {
    id: "kerala-backwaters",
    title: "Kerala Backwaters Escape",
    route: "Cochin • Munnar • Alleppey",
    days: "4 Days",
    nights: "3 Nights",
    stay: "Houseboat + Hotel",
    image: "/images/alleppey-hero.jpg",
    alt: "Kerala backwaters luxury houseboat holiday",
    badge: "SIGNATURE",
  },
  {
    id: "kashmir-dream",
    title: "Kashmir Dream Getaway",
    route: "Srinagar • Gulmarg • Pahalgam",
    days: "5 Days",
    nights: "4 Nights",
    stay: "Hotel + Shikara",
    image: "/images/kashmir-hero.jpg",
    alt: "Kashmir Dal Lake shikara and snow valley tour",
    badge: "POPULAR",
  },
  {
    id: "goa-beach",
    title: "Goa Beach Holiday",
    route: "North Goa • South Goa",
    days: "4 Days",
    nights: "3 Nights",
    stay: "Resort + Cab",
    image: "/images/goa-coast.jpg",
    alt: "Goa tropical beach and coastal resort package",
    badge: "COASTAL",
  },
];

export default function FeaturedPackagesSection({ onSelectPackage }: FeaturedPackagesProps) {
  return (
    <section id="packages" className="bg-[#fcfbf9] py-16 sm:py-24 text-[#161a1d] relative">
      <div className="max-w-[1360px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#a07c1b] block mb-2.5">
              FEATURED PACKAGES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111417] tracking-tight leading-tight">
              Handpicked Journeys for <span className="text-[#a07c1b] font-serif">Every</span> Traveller
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onSelectPackage("All Flynova Tour Packages")}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#4b5563] hover:text-[#a07c1b] font-medium transition-colors group cursor-pointer"
          >
            <span>View all packages</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4 Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PACKAGES.map((pkg) => {
            const cardInner = (
              <div className="h-full bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group">
                <div>
                  {/* Photo Header */}
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden">
                    <Image
                      src={pkg.image}
                      alt={pkg.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    {/* Badge */}
                    {pkg.badge && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          pkg.id === "bsi-18"
                            ? "bg-[#c59b27] text-black shadow-md font-extrabold"
                            : "bg-black/60 backdrop-blur-md text-white border border-white/20"
                        }`}>
                          {pkg.badge}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5">
                    <h3 className="font-serif text-lg font-bold text-[#111417] mb-1.5 group-hover:text-[#a07c1b] transition-colors leading-snug line-clamp-2">
                      {pkg.title}
                    </h3>

                    <p className="text-xs text-[#6b7280] font-medium mb-3 line-clamp-1">
                      {pkg.route}
                    </p>

                    {/* Badges / Inclusions */}
                    <div className="flex items-center flex-wrap gap-2 text-[11px] text-[#4b5563] pt-3 border-t border-gray-100">
                      <span className="inline-flex items-center gap-1 font-medium">
                        <Calendar className="w-3 h-3 text-[#a07c1b]" />
                        <span>{pkg.days}</span>
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 font-medium">
                        <Moon className="w-3 h-3 text-[#a07c1b]" />
                        <span>{pkg.nights}</span>
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 font-medium">
                        <Building2 className="w-3 h-3 text-[#a07c1b]" />
                        <span>{pkg.stay}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Tour Experience & Arrow Button */}
                <div className="px-4 sm:p-5 pb-4 pt-3 flex items-center justify-between border-t border-gray-100">
                  <div>
                    <div className="text-xs uppercase tracking-widest font-bold text-[#a07c1b] leading-none">
                      BESPOKE JOURNEY
                    </div>
                    <div className="text-[11px] text-[#6b7280] mt-1">
                      Custom quote on request
                    </div>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-[#f4ece1] group-hover:bg-[#dcb037] text-[#a07c1b] group-hover:text-[#12161a] flex items-center justify-center transition-all duration-300 shadow-sm flex-shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );

            if (pkg.href) {
              return (
                <Link key={pkg.id} href={pkg.href} className="block h-full cursor-pointer">
                  {cardInner}
                </Link>
              );
            }

            return (
              <div
                key={pkg.id}
                onClick={() => onSelectPackage(pkg.title)}
                className="block h-full cursor-pointer"
              >
                {cardInner}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
