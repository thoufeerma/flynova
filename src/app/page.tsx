"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DestinationsSection from "@/components/DestinationsSection";
import KeralaMapSection from "@/components/KeralaMap3D/KeralaMapSection";
import PackagesExplorerSection from "@/components/PackagesExplorerSection";
import WhyFlynova from "@/components/WhyFlynova";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TravelGallery from "@/components/TravelGallery";
import ContactCta from "@/components/ContactCta";
import Footer from "@/components/Footer";
import TripModal from "@/components/TripModal";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [prefillData, setPrefillData] = useState<{
    destination?: string;
    dates?: string;
    travellers?: string;
  }>({});

  const handleOpenPlanModal = (prefillDest?: string) => {
    setPrefillData({
      destination: prefillDest || "",
    });
    setModalOpen(true);
  };

  const handleSearch = (params: {
    destination: string;
    dates: string;
    travellers: string;
  }) => {
    setPrefillData({
      destination: params.destination,
      dates: params.dates,
      travellers: params.travellers,
    });
    setModalOpen(true);
  };

  const handleSearchIconClick = () => {
    const heroSearch = document.getElementById("hero");
    if (heroSearch) {
      heroSearch.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-[#07090b] text-white flex flex-col relative selection:bg-[#dcb037] selection:text-black">
      {/* 1. Header / Navbar matching mockup */}
      <Header
        onOpenPlanModal={() => handleOpenPlanModal()}
        onSearchClick={handleSearchIconClick}
      />

      {/* 2. Hero Section: Discover Incredible India + Floating Search Bar */}
      <HeroSection
        onOpenPlanModal={handleOpenPlanModal}
        onSearch={handleSearch}
      />

      {/* 3. Curated Destinations: India, at its most unforgettable (Kerala, Kashmir, Goa) */}
      <DestinationsSection
        onSelectDestination={(destName) => handleOpenPlanModal(destName)}
      />

      {/* 4. 3D Interactive Kerala Map Section: 3D EXPERIENCE Explore Kerala */}
      <KeralaMapSection onOpenPlanModal={handleOpenPlanModal} />

      {/* 5. Packages Explorer: Divine Temple & Heritage Tours (Shows max 6 packages + Show More CTA) */}
      <PackagesExplorerSection
        limit={6}
        onSelectPackage={(pkgName) => handleOpenPlanModal(pkgName)}
      />

      {/* 6. Why Choose Flynova: More Than Just a Trip (Munnar bus image + 3 features) */}
      <WhyFlynova />

      {/* 7. Our Services: Complete Travel Solutions (Flights, Hotels, Packages) */}
      <ServicesSection onOpenPlanModal={handleOpenPlanModal} />

      {/* 8. Traveller Stories: What Our Customers Says (Couple photo + Aparna S review) */}
      <TestimonialsSection />

      {/* 9. Travel Gallery: Moments from Our Journeys (4 photo cards) */}
      <TravelGallery />

      {/* 10. Call to Action Banner: Ready for your next journey? Let us create a memorable trip */}
      <ContactCta onOpenPlanModal={() => handleOpenPlanModal()} />

      {/* 11. Footer: 4-Column layout with social icons & Ernakulam LLP address */}
      <Footer />

      {/* Trip Planner Interactive Modal */}
      <TripModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        prefill={prefillData}
      />

      {/* Floating 1-Click WhatsApp Concierge */}
      <FloatingWhatsApp />
    </main>
  );
}
