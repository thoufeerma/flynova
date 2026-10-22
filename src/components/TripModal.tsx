"use client";

import React, { useState, useEffect } from "react";
import { X, Send, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

interface TripModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefill?: {
    destination?: string;
    dates?: string;
    travellers?: string;
  };
}

export default function TripModal({ isOpen, onClose, prefill }: TripModalProps) {
  const [destination, setDestination] = useState("");
  const [tripType, setTripType] = useState("Family Holiday");
  const [travellers, setTravellers] = useState("2 Travellers");
  const [dates, setDates] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (prefill?.destination) setDestination(prefill.destination);
    if (prefill?.dates) setDates(prefill.dates);
    if (prefill?.travellers) setTravellers(prefill.travellers);
  }, [prefill]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const waText = 
`*NEW TRIP ENQUIRY — ${SITE_CONFIG.companyName.toUpperCase()}*
----------------------------------------
*Guest Name:* ${name || "Guest"}
*Phone / WhatsApp:* ${phone}
*Destination:* ${destination || "Custom Itinerary"}
*Trip Style:* ${tripType}
*Travellers:* ${travellers}
*Travel Dates:* ${dates || "Upcoming Season"}
*Special Requests:* ${notes || "None"}
----------------------------------------
_Inquiry submitted via ${SITE_CONFIG.companyName} official website for ${SITE_CONFIG.leadContact}._`;

    const encoded = encodeURIComponent(waText);
    const waUrl = `https://wa.me/${SITE_CONFIG.phoneRaw}?text=${encoded}`;

    window.open(waUrl, "_blank");
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-[620px] bg-dark-surface border border-gold-base/40 rounded-2xl p-6 sm:p-9 text-white shadow-[0_25px_60px_rgba(0,0,0,0.85)] max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-gold-base text-black mx-auto flex items-center justify-center">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-serif font-playfair text-2xl text-white font-normal">Connecting With {SITE_CONFIG.leadContact}</h3>
            <p className="font-sans text-sm text-white/70 max-w-sm mx-auto">
              Your inquiry has been formatted and opened on WhatsApp ({SITE_CONFIG.phone}). Our lead travel architect will get back to you shortly!
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-gold-base" />
                <SectionEyebrow as="span" className="mb-0">
                  BESPOKE TRIP ARCHITECT
                </SectionEyebrow>
              </div>
              <h3 className="font-serif font-playfair text-2xl sm:text-3xl text-white font-normal mb-1">
                Plan Your Tailored Journey
              </h3>
              <p className="text-xs sm:text-sm text-white/60 font-light">
                Share your travel vision with {SITE_CONFIG.leadContact} &amp; the Flynova team for an instant personalized itinerary &amp; quote.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold tracking-wider text-white/80 uppercase mb-1">
                    Destination
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/15 rounded p-2.5 text-sm text-white focus:border-gold-base outline-none"
                  >
                    <option value="" disabled className="bg-dark-surface">Select destination</option>
                    <option value="Kerala & the backwaters" className="bg-dark-surface">Kerala (Alleppey, Munnar, Kovalam)</option>
                    <option value="Sacred South Temple Tour (Madurai - Rameshwaram - Trivandrum)" className="bg-dark-surface">
                      Sacred South Temple Tour (Madurai, Rameshwaram, Trivandrum)
                    </option>
                    <option value="Goa & the coast" className="bg-dark-surface">Goa (Beaches & Resorts)</option>
                    <option value="Kashmir & Manali" className="bg-dark-surface">Kashmir & Manali (Snow & Valleys)</option>
                    <option value="Jaipur & Royal Rajasthan" className="bg-dark-surface">Royal Rajasthan (Jaipur, Udaipur)</option>
                    <option value="Lakshadweep Archipelago" className="bg-dark-surface">Lakshadweep Coral Islands</option>
                    <option value="Flight & Hotel Booking Only" className="bg-dark-surface">Flight & Hotel Booking Only</option>
                    <option value="Other Custom Destination" className="bg-dark-surface">Other Custom Destination</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold tracking-wider text-white/80 uppercase mb-1">
                    Trip Style
                  </label>
                  <select
                    value={tripType}
                    onChange={(e) => setTripType(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded p-2.5 text-sm text-white focus:border-gold-base outline-none"
                  >
                    <option value="Family Holiday" className="bg-dark-surface">Family Vacation</option>
                    <option value="Sacred Pilgrimage / Temple Yatra" className="bg-dark-surface">Sacred Pilgrimage / Temple Yatra</option>
                    <option value="Romantic Honeymoon" className="bg-dark-surface">Romantic Honeymoon</option>
                    <option value="Group Pilgrimage / Senior Citizens" className="bg-dark-surface">Group Tour / Senior Citizens</option>
                    <option value="Solo Leisure & Wellness" className="bg-dark-surface">Solo Leisure & Wellness</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold tracking-wider text-white/80 uppercase mb-1">
                    Number of Guests
                  </label>
                  <input
                    type="text"
                    value={travellers}
                    onChange={(e) => setTravellers(e.target.value)}
                    placeholder="e.g. 2 Adults, 1 Child"
                    required
                    className="w-full bg-white/5 border border-white/15 rounded p-2.5 text-sm text-white focus:border-gold-base outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold tracking-wider text-white/80 uppercase mb-1">
                    Travel Dates / Season
                  </label>
                  <input
                    type="text"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                    placeholder="e.g. Next month, Nov 15-20"
                    required
                    className="w-full bg-white/5 border border-white/15 rounded p-2.5 text-sm text-white focus:border-gold-base outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold tracking-wider text-white/80 uppercase mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="w-full bg-white/5 border border-white/15 rounded p-2.5 text-sm text-white focus:border-gold-base outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold tracking-wider text-white/80 uppercase mb-1">
                    WhatsApp / Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 9876543210"
                    required
                    className="w-full bg-white/5 border border-white/15 rounded p-2.5 text-sm text-white focus:border-gold-base outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold tracking-wider text-white/80 uppercase mb-1">
                  Special Requests (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Diet preferences, senior citizen care, hotel category preference, flight assistance..."
                  className="w-full bg-white/5 border border-white/15 rounded p-2.5 text-sm text-white focus:border-gold-base outline-none resize-none"
                />
              </div>

              <PrimaryButton
                type="submit"
                className="w-full py-3.5 mt-2"
                icon={<Send className="w-4 h-4" />}
              >
                Submit &amp; Connect on WhatsApp →
              </PrimaryButton>
            </form>
          </>
        )}

      </div>
    </div>
  );
}
