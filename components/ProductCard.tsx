"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn, formatINR } from "@/lib/format";
import type { Product } from "@/lib/products";
import { useStore } from "@/lib/store";

const badgeTone = {
  solid: "bg-on-surface text-background",
  muted: "bg-surface-container-highest text-on-surface",
  gold: "border border-tertiary/40 bg-tertiary/15 text-tertiary backdrop-blur",
} as const;

export function ProductCard({
  product,
  priority = false,
  sizePicker = false,
  className,
}: {
  product: Product;
  priority?: boolean;
  sizePicker?: boolean;
  className?: string;
}) {
  const { addItem, toast, isWished, toggleWishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const wished = isWished(product.slug);
  const firstColor = product.colors[0];

  function quickAdd() {
    addItem({
      slug: product.slug,
      size: selectedSize,
      color: firstColor?.name ?? "Signature",
      qty: 1,
    });
    toast(
      "Added to bag",
      `${product.name} · ${selectedSize} · ${firstColor?.name ?? "Signature"}`,
    );
  }

  function wish() {
    const added = toggleWishlist(product.slug);
    toast(
      added ? "Saved to your wishlist" : "Removed from wishlist",
      added ? product.name : undefined,
    );
  }

  return (
    <article className={cn("group relative flex min-w-0 flex-col", className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-container-lowest">
        <Link
          href={`/product/${product.slug}`}
          aria-label={product.name}
          className="absolute inset-0 z-10"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-5 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] sm:p-7"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </Link>

        {product.badge ? (
          <span
            className={cn(
              "absolute left-3 top-3 z-20 px-2.5 py-1.5 font-label-sm text-[8px] uppercase leading-none tracking-[0.18em]",
              badgeTone[product.badge.tone],
            )}
          >
            {product.badge.label}
          </span>
        ) : null}

        <button
          type="button"
          onClick={wish}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          className={cn(
            "absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center border transition-all duration-300",
            wished
              ? "border-tertiary/50 bg-tertiary/15 text-tertiary"
              : "border-outline-variant/40 bg-background/40 text-on-surface-variant backdrop-blur hover:border-tertiary/60 hover:text-tertiary",
          )}
        >
          <span
            className="material-symbols-outlined text-[18px]"
            style={{ fontVariationSettings: wished ? '"FILL" 1' : undefined }}
          >
            favorite
          </span>
        </button>

        <div className="absolute inset-x-3 bottom-3 z-20 translate-y-3 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100">
          {sizePicker ? (
            <div className="mb-2 flex gap-1 overflow-x-auto bg-background/75 p-1.5 backdrop-blur-md scrollbar-none">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "flex h-6 min-w-7 shrink-0 items-center justify-center px-1.5 font-label-sm text-[8px] tracking-[0.05em] transition-colors",
                    selectedSize === size
                      ? "bg-on-surface text-background"
                      : "text-on-surface-variant hover:text-on-surface",
                  )}
                >
                  {size === "One Size" ? "OS" : size}
                </button>
              ))}
            </div>
          ) : null}
          <button
            type="button"
            onClick={quickAdd}
            className="flex w-full items-center justify-between gap-2 bg-on-surface px-3 py-2.5 font-label-sm text-[9px] uppercase tracking-[0.15em] text-background transition-colors hover:bg-tertiary hover:text-on-tertiary sm:px-4"
          >
            <span className="truncate">
              {sizePicker ? "Add to bag" : "Quick add"} ·{" "}
              {selectedSize === "One Size" ? "One Size" : `UK ${selectedSize}`}
            </span>
            <span className="material-symbols-outlined text-[17px]">
              add
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-label-sm text-[8.5px] uppercase tracking-[0.19em] text-on-surface-variant">
              {product.line}
            </p>
            <h3 className="mt-1.5 font-headline-sm text-[16px] leading-[1.25] tracking-[-0.015em] text-on-surface sm:text-[17px]">
              <Link
                href={`/product/${product.slug}`}
                className="transition-colors hover:text-tertiary"
              >
                {product.name}
              </Link>
            </h3>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-label-lg text-[12px] leading-none tracking-[0.04em] text-on-surface">
              {formatINR(product.price)}
            </p>
            {product.compareAt ? (
              <p className="mt-1 font-label-sm text-[9px] tracking-[0.04em] text-on-surface-variant line-through">
                {formatINR(product.compareAt)}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center gap-1.5">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color.id}
                title={color.name}
                className="h-2.5 w-2.5 rounded-full border border-outline-variant/80"
                style={{ backgroundColor: color.hex }}
              />
            ))}
            {product.colors.length > 4 ? (
              <span className="font-label-sm text-[8px] text-on-surface-variant">
                +{product.colors.length - 4}
              </span>
            ) : null}
          </div>
          <span className="flex items-center gap-1 font-label-sm text-[9px] text-on-surface-variant">
            <span
              className="material-symbols-outlined text-[13px] text-tertiary"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              star
            </span>
            {product.rating.toFixed(1)}
            <span className="text-on-surface-variant/50">
              ({product.reviews})
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}
