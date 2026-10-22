"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, X } from "lucide-react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import SectionHeading from "@/components/ui/SectionHeading";

const GALLERY_IMAGES = [
  {
    id: 1,
    title: "Nilgiri Mountain Railway",
    location: "Western Ghats, Tamil Nadu & Kerala",
    image: "/images/hill-train.jpg",
    alt: "Heritage blue mountain train crossing viaduct in green tea hills",
  },
  {
    id: 2,
    title: "Sunset Houseboat Cruise",
    location: "Vembanad Lake, Alleppey, Kerala",
    image: "/images/alleppey-hero.jpg",
    alt: "Kerala backwaters luxury houseboat sunset",
  },
  {
    id: 3,
    title: "Palolem Tropical Sands",
    location: "South Goa Coastlines",
    image: "/images/tropical-beach.jpg",
    alt: "Pristine white sand beach with leaning coconut palms and ocean view",
  },
  {
    id: 4,
    title: "Dal Lake Shikara Morning",
    location: "Srinagar, Kashmir",
    image: "/images/kashmir-hero.jpg",
    alt: "Kashmir shikara boat with snowy Himalayan peaks",
  },
];

export default function TravelGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section
      id="gallery"
      className="bg-gradient-to-b from-[#080b11] via-[#0b0f17] to-[#07090e] py-18 sm:py-26 text-white relative overflow-hidden"
    >
      {/* Top Hairline Gold Accent Divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#c59b27]/30 to-transparent" />

      {/* Atmospheric Subtle Indigo Radial Glow */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[350px] bg-[radial-gradient(ellipse,rgba(56,189,248,0.04),transparent_70%)] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <SectionEyebrow>TRAVEL GALLERY</SectionEyebrow>
            <SectionHeading level={2} highlight="Journeys">
              Moments from Our
            </SectionHeading>
          </div>

          <button
            type="button"
            onClick={() => setSelectedImage(GALLERY_IMAGES[0].image)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-white/70 hover:text-gold-base transition-colors group cursor-pointer font-sans"
          >
            <span>Browse Full Screen</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4 Photo Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {GALLERY_IMAGES.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item.image)}
              className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/15 ring-1 ring-white/5 shadow-[0_18px_40px_rgba(0,0,0,0.65)] cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:border-gold-base/60"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <h3 className="font-serif font-playfair text-base sm:text-lg font-normal text-white group-hover:text-[#f3cb6b] tracking-wide leading-snug transition-colors">
                  {item.title}
                </h3>
                <p className="font-sans text-[10px] sm:text-[11px] text-[#dcb037] font-semibold tracking-wider uppercase mt-1">
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-gold-base hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative w-full h-[60vh]">
              <Image
                src={selectedImage}
                alt="Enlarged gallery view"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
