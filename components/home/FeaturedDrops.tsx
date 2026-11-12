"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/format";
import {
  HOME_FEATURED_SLUGS,
  getProductsBySlugs,
  type ProductCategory,
} from "@/lib/products";

const filters: Array<{ label: string; value: "all" | ProductCategory }> = [
  { label: "ALL", value: "all" },
  { label: "SNEAKERS", value: "sneakers" },
  { label: "CASUAL", value: "casual" },
  { label: "SPORTS", value: "sports" },
  { label: "FORMAL", value: "formal" },
];

export function FeaturedDrops() {
  const [active, setActive] = useState<"all" | ProductCategory>("all");
  const products = useMemo(() => getProductsBySlugs(HOME_FEATURED_SLUGS), []);

  const visible = useMemo(
    () =>
      active === "all"
        ? products
        : products.filter((product) => product.category === active),
    [active, products],
  );

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-outline-variant/35 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-label-md text-label-md uppercase tracking-[0.2em] text-tertiary">
            The current drop
          </p>
          <h2 className="mt-3 max-w-xl font-headline-lg text-headline-lg-mobile uppercase tracking-[-0.035em] text-on-surface sm:text-headline-lg">
            Twelve objects.
            <br />
            <span className="text-on-surface-variant">No restocks.</span>
          </h2>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <div className="flex flex-wrap gap-1.5">
            {filters.map((filter) => {
              const count =
                filter.value === "all"
                  ? products.length
                  : products.filter(
                      (product) => product.category === filter.value,
                    ).length;
              if (count === 0) return null;
              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActive(filter.value)}
                  className={cn(
                    "flex items-center gap-1.5 border px-3 py-2 font-label-sm text-[9px] uppercase tracking-[0.16em] transition-all",
                    active === filter.value
                      ? "border-tertiary bg-tertiary text-on-tertiary"
                      : "border-outline-variant/50 text-on-surface-variant hover:border-on-surface-variant hover:text-on-surface",
                  )}
                >
                  {filter.label}
                  <span
                    className={cn(
                      "text-[8px]",
                      active === filter.value
                        ? "text-on-tertiary/65"
                        : "text-on-surface-variant/45",
                    )}
                  >
                    {String(count).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
          <Link
            href="/catalog"
            className="group flex items-center gap-2 font-label-sm text-[9px] uppercase tracking-[0.18em] text-on-surface-variant transition-colors hover:text-tertiary"
          >
            View the full archive
            <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4">
        {visible.map((product, index) => (
          <ProductCard
            key={product.slug}
            product={product}
            priority={index < 4}
            sizePicker
          />
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-center font-body-md text-body-md text-on-surface-variant">
          No pieces in this category for the current drop.
        </p>
      ) : null}
    </div>
  );
}
