import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogClient } from "@/components/catalog/CatalogClient";

export const metadata: Metadata = {
  title: "The Footwear Archive",
  description:
    "Browse 128 architectural footwear models — sneakers, casual loafers, performance runners and formal derbies. Filter by size, colour, price and allocation.",
};

function CatalogFallback() {
  return (
    <div className="mx-auto max-w-[1680px] px-5 py-16 sm:px-8 xl:px-12">
      <p className="font-label-md text-label-md uppercase tracking-[0.2em] text-tertiary">
        Opening the archive
      </p>
      <div className="mt-6 h-16 w-2/3 animate-pulse bg-surface-container" />
      <div className="mt-10 grid gap-6 lg:grid-cols-[260px_1fr]">
        <div className="hidden h-[520px] animate-pulse bg-surface-container-low lg:block" />
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="aspect-[4/5] animate-pulse bg-surface-container-low"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<CatalogFallback />}>
      <CatalogClient />
    </Suspense>
  );
}
