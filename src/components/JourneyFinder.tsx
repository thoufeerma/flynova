"use client";

import React, { useState } from "react";
import { MapPin, Calendar, Users, ArrowRight, ChevronDown } from "lucide-react";

interface JourneyFinderProps {
  onSearch: (params: { destination: string; dates: string; travellers: string }) => void;
}

export default function JourneyFinder({ onSearch }: JourneyFinderProps) {
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [travellers, setTravellers] = useState("2 Travellers");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ destination, dates, travellers });
  };
  return (
    <div className="relative z-30 w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-black/10 flex flex-col lg:flex-row overflow-hidden transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)]"
      >
        {/* Field 1: Destination */}
        <div className="flex-1 flex items-center gap-3 p-3 sm:p-3.5 hover:bg-[#faf9f6] transition-colors relative border-b lg:border-b-0 lg:border-r border-black/5">
          <div className="w-5 h-5 text-[#111417] flex-shrink-0">
            <MapPin className="w-full h-full stroke-[1.8]" />
          </div>
          <div className="flex-1 flex flex-col">
            <label htmlFor="finder-dest" className="text-[11px] font-bold tracking-wider text-[#1a1e22] uppercase mb-0.5">
              Destination
            </label>
            <select
              id="finder-dest"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="text-sm text-[#4a545e] bg-transparent outline-none cursor-pointer appearance-none w-full pr-6 font-normal"
            >
              <option value="">Where would you like to go?</option>
              <option value="Kerala & Backwaters">Kerala (Alleppey, Munnar, Kovalam)</option>
              <option value="Sacred South Temple Tour">Sacred Temple Tour (Madurai, Rameshwaram, Trivandrum)</option>
              <option value="Goa Coast & Heritage">Goa (South Goa, Panaji, Heritage)</option>
              <option value="Kashmir & Manali">Kashmir & Manali (Snow Valleys, Gulmarg)</option>
              <option value="Jaipur & Royal Rajasthan">Royal Rajasthan (Jaipur, Udaipur, Forts)</option>
              <option value="Lakshadweep Islands">Lakshadweep (Turquoise Coral Lagoons)</option>
              <option value="Karnataka & Coorg">Karnataka & Coorg Hills</option>
              <option value="Delhi & Golden Triangle">Delhi & Golden Triangle</option>
            </select>
          </div>
          <ChevronDown className="w-4 h-4 text-[#88929b] pointer-events-none absolute right-4" />
        </div>

        {/* Field 2: Travel dates */}
        <div className="flex-1 flex items-center gap-3 p-3 sm:p-3.5 hover:bg-[#faf9f6] transition-colors relative border-b lg:border-b-0 lg:border-r border-black/5">
          <div className="w-5 h-5 text-[#111417] flex-shrink-0">
            <Calendar className="w-full h-full stroke-[1.8]" />
          </div>
          <div className="flex-1 flex flex-col">
            <label htmlFor="finder-dates" className="text-[11px] font-bold tracking-wider text-[#1a1e22] uppercase mb-0.5">
              Travel dates
            </label>
            <select
              id="finder-dates"
              value={dates}
              onChange={(e) => setDates(e.target.value)}
              className="text-sm text-[#4a545e] bg-transparent outline-none cursor-pointer appearance-none w-full pr-6 font-normal"
            >
              <option value="">Select dates / season</option>
              <option value="Immediate / This Month">This Month (Immediate Departure)</option>
              <option value="Next Month">Next Month</option>
              <option value="Winter Holiday Season">Nov – Feb (Winter Peak Season)</option>
              <option value="Summer Holidays">Mar – May (Summer Holidays)</option>
              <option value="Monsoon & Ayurveda">Jun – Aug (Monsoon & Ayurveda Season)</option>
              <option value="Custom Dates">Custom Dates</option>
            </select>
          </div>
          <ChevronDown className="w-4 h-4 text-[#88929b] pointer-events-none absolute right-4" />
        </div>

        {/* Field 3: Travellers */}
        <div className="flex-1 flex items-center gap-3 p-3 sm:p-3.5 hover:bg-[#faf9f6] transition-colors relative">
          <div className="w-5 h-5 text-[#111417] flex-shrink-0">
            <Users className="w-full h-full stroke-[1.8]" />
          </div>
          <div className="flex-1 flex flex-col">
            <label htmlFor="finder-travellers" className="text-[11px] font-bold tracking-wider text-[#1a1e22] uppercase mb-0.5">
              Travellers
            </label>
            <select
              id="finder-travellers"
              value={travellers}
              onChange={(e) => setTravellers(e.target.value)}
              className="text-sm text-[#4a545e] bg-transparent outline-none cursor-pointer appearance-none w-full pr-6 font-normal"
            >
              <option value="2 Travellers">2 Travellers (Couple / Duo)</option>
              <option value="Solo Explorer">Solo Explorer</option>
              <option value="Family (3-5 Guests)">Family (3–5 Guests)</option>
              <option value="Pilgrimage Group (6-15)">Pilgrimage Group (6–15 Devotees)</option>
              <option value="Corporate / Large Group">Large Group (15+)</option>
            </select>
          </div>
          <ChevronDown className="w-4 h-4 text-[#88929b] pointer-events-none absolute right-4" />
        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="bg-[#15191d] hover:bg-[#c59b27] text-white hover:text-black font-semibold text-xs sm:text-sm px-7 py-3 sm:py-3.5 flex items-center justify-center gap-2.5 transition-all duration-300 group flex-shrink-0 cursor-pointer"
        >
          <span>Find your journey</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </form>
    </div>
  );
}
