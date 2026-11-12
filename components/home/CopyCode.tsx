"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";

export function CopyCode({ code }: { code: string }) {
  const { toast } = useStore();
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast("Code copied", `${code} · 15% off your first pair`);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      toast("Copy this code", code);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group flex w-full max-w-sm items-center justify-between gap-5 border border-dashed border-tertiary/45 bg-background/20 px-5 py-4 text-left transition-colors hover:border-tertiary hover:bg-background/35"
    >
      <span>
        <span className="block font-label-sm text-[8px] uppercase tracking-[0.2em] text-on-surface-variant">
          Private client code
        </span>
        <span className="mt-1 block font-display text-[22px] font-semibold tracking-[0.18em] text-tertiary">
          {code}
        </span>
      </span>
      <span className="flex items-center gap-2 font-label-sm text-[9px] uppercase tracking-[0.16em] text-on-surface-variant transition-colors group-hover:text-on-surface">
        {copied ? "Copied" : "Copy"}
        <span className="material-symbols-outlined text-[18px]">
          {copied ? "check" : "content_copy"}
        </span>
      </span>
    </button>
  );
}
