"use client";

import { waLink } from "@/lib/constants";

export function WhatsAppFab() {
  return (
    <a
      href={waLink(
        "Hi SOLE STORE, I'd like to speak with the concierge about a pair.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with the SOLE STORE concierge on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-tertiary/35 bg-surface-container-high/90 text-tertiary shadow-xl shadow-black/50 backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:border-tertiary hover:bg-tertiary hover:text-on-tertiary sm:bottom-7 sm:right-7"
    >
      <span className="material-symbols-outlined text-[23px]">chat</span>
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap border border-outline-variant/40 bg-surface-container-high px-3 py-2 font-label-sm text-[9px] uppercase tracking-[0.16em] text-on-surface opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 lg:block">
        Concierge
      </span>
    </a>
  );
}
