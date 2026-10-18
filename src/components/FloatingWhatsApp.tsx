"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const waUrl =
    "https://wa.me/917306003152?text=" +
    encodeURIComponent(
      "Hello Anitha K A & Flynova Reisen LLP, I would like to inquire about tour packages across India."
    );

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 group transition-transform duration-300 hover:scale-105"
      aria-label="Chat on WhatsApp with Anitha K A (+91 73060 03152)"
    >
      <div className="hidden sm:block bg-[#111417] text-white text-xs font-semibold py-2 px-3.5 rounded border border-white/15 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Chat with Anitha (Flynova Lead)
      </div>
      <div className="w-14 h-14 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.45)] hover:bg-[#20ba59] transition-colors">
        <MessageCircle className="w-7 h-7 fill-white" />
      </div>
    </a>
  );
}
