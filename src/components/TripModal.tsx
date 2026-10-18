"use client";

import React, { useState, useEffect } from "react";
import { X, Send, Sparkles } from "lucide-react";

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
`*NEW TRIP ENQUIRY — FLYNOVA REISEN LLP*
----------------------------------------
*Guest Name:* ${name || "Guest"}
*Phone / WhatsApp:* ${phone}
*Destination:* ${destination || "Custom Itinerary"}
*Trip Style:* ${tripType}
*Travellers:* ${travellers}
*Travel Dates:* ${dates || "Upcoming Season"}
*Special Requests:* ${notes || "None"}
----------------------------------------
_Inquiry submitted via Flynova Reisen official website for Anitha K A._`;

    const encoded = encodeURIComponent(waText);
    const waUrl = `https://wa.me/917306003152?text=${encoded}`;

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
      <div className="relative z-10 w-full max-w-[620px] bg-[#0f1317] border border-[#c59b27]/40 rounded-lg p-6 sm:p-9 text-white shadow-[0_25px_60px_rgba(0,0,0,0.85)] max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#c59b27] text-black mx-auto flex items-center justify-center">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl text-white">Connecting With Anitha K A</h3>
            <p className="text-sm text-white/70 max-w-sm mx-auto">
              Your inquiry has been formatted and opened on WhatsApp (+91 73060 03152). Our lead travel architect will get back to you shortly!
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#c59b27] uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>BESPOKE TRIP ARCHITECT</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-1">
                Plan Your Tailored Journey
              </h3>
              <p className="text-xs sm:text-sm text-white/60 font-light">
                Share your travel vision with Anitha & the Flynova team for an instant personalized itinerary & quote.
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
                    className="w-full bg-white/5 border border-white/15 rounded p-2.5 text-sm text-white focus:border-[#c59b27] outline-none"
                  >
                    <option value="" disabled className="bg-[#0f1317]">Select destination</option>
                    <option value="Kerala & the backwaters" className="bg-[#0f1317]">Kerala (Alleppey, Munnar, Kovalam)</option>
                    <option value="Sacred South Temple Tour (Madurai - Rameshwaram - Trivandrum)" className="bg-[#0f1317]">
                      Sacred South Temple Tour (Madurai, Rameshwaram, Trivandrum)
                    </option>
                    <option value="Goa & the coast" className="bg-[#0f1317]">Goa (Beaches & Resorts)</option>
                    <option value="Kashmir & Manali" className="bg-[#0f1317]">Kashmir & Manali (Snow & Valleys)</option>
                    <option value="Jaipur & Royal Rajasthan" className="bg-[#0f1317]">Royal Rajasthan (Jaipur, Udaipur)</option>
                    <option value="Lakshadweep Archipelago" className="bg-[#0f1317]">Lakshadweep Coral Islands</option>
                    <option value="Flight & Hotel Booking Only" className="bg-[#0f1317]">Flight & Hotel Booking Only</option>
                    <option value="Other Custom Destination" className="bg-[#0f1317]">Other Custom Destination</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold tracking-wider text-white/80 uppercase mb-1">
                    Trip Style
                  </label>
                  <select
                    value={tripType}
                    onChange={(e) => setTripType(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded p-2.5 text-sm text-white focus:border-[#c59b27] outline-none"
                  >
                    <option value="Family Holiday" className="bg-[#0f1317]">Family Vacation</option>
                    <option value="Sacred Pilgrimage / Temple Yatra" className="bg-[#0f1317]">Sacred Pilgrimage / Temple Yatra</option>
                    <option value="Romantic Honeymoon" className="bg-[#0f1317]">Romantic Honeymoon</option>
                    <option value="Group Pilgrimage / Senior Citizens" className="bg-[#0f1317]">Group Tour / Senior Citizens</option>
                    <option value="Solo Leisure & Wellness" className="bg-[#0f1317]">Solo Leisure & Wellness</option>
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
                    className="w-full bg-white/5 border border-white/15 rounded p-2.5 text-sm text-white focus:border-[#c59b27] outline-none"
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
                    className="w-full bg-white/5 border border-white/15 rounded p-2.5 text-sm text-white focus:border-[#c59b27] outline-none"
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
                    className="w-full bg-white/5 border border-white/15 rounded p-2.5 text-sm text-white focus:border-[#c59b27] outline-none"
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
                    className="w-full bg-white/5 border border-white/15 rounded p-2.5 text-sm text-white focus:border-[#c59b27] outline-none"
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
                  className="w-full bg-white/5 border border-white/15 rounded p-2.5 text-sm text-white focus:border-[#c59b27] outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#c59b27] hover:bg-[#e5b94c] text-black font-semibold text-sm py-3.5 rounded flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(197,155,39,0.3)] transition-all cursor-pointer mt-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit & Connect on WhatsApp →</span>
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}
