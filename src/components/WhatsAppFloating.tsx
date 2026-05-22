"use client";

import Link from "next/link";
import { MessageCircleMore } from "lucide-react";

const DEFAULT_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999";

const DEFAULT_MESSAGE = encodeURIComponent(
  "Hi, I would like to know more about your programs.",
);

export default function WhatsAppFloating() {
  const waUrl = `https://wa.me/${DEFAULT_NUMBER}?text=${DEFAULT_MESSAGE}`;

  return (
    <Link
      href={waUrl}
      target="_blank"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      {/* Glow Layer */}
      <div className="absolute inset-0 rounded-full bg-emerald-500/40 blur-2xl scale-110 opacity-70 group-hover:scale-125 transition-all duration-500" />

      {/* Main Button */}
      <div className="relative flex items-center justify-center w-16 h-16 rounded-full overflow-hidden border border-white/10 backdrop-blur-xl bg-gradient-to-br from-[#25D366] via-[#1ebe5d] to-[#128C7E] shadow-[0_12px_40px_rgba(18,140,126,0.45)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
        {/* Premium glass shine */}
        <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.28),rgba(255,255,255,0.02))]" />

        {/* Inner ring */}
        <div className="absolute inset-[3px] rounded-full border border-white/10" />

        {/* Icon */}
        <MessageCircleMore
          size={30}
          strokeWidth={2.2}
          className="relative z-10 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
        />

        {/* Tiny notification dot */}
        <span className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full bg-white/90 animate-pulse" />
      </div>
    </Link>
  );
}
