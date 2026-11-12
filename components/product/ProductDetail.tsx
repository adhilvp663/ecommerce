"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { CONTACT, waLink } from "@/lib/constants";
import { cn, formatINR } from "@/lib/format";
import {
  PDP_RECOMMENDATION_SLUGS,
  getProductsBySlugs,
  type Product,
} from "@/lib/products";
import { SIZE_UNITS, convertSize, sizeLabel, type SizeUnit } from "@/lib/sizes";
import { useStore } from "@/lib/store";

const sizeGuideRows = [
  ["6", "39", "7", "24.0"],
  ["6.5", "39.5", "7.5", "24.5"],
  ["7", "40.5", "8", "25.0"],
  ["7.5", "41", "8.5", "25.5"],
  ["8", "42", "9", "26.0"],
  ["8.5", "42.5", "9.5", "26.5"],
  ["9", "43", "10", "27.0"],
  ["9.5", "44", "10.5", "27.5"],
  ["10", "44.5", "11", "28.0"],
  ["10.5", "45", "11.5", "28.5"],
  ["11", "46", "12", "29.0"],
  ["12", "47", "13", "30.0"],
];

export function ProductDetail({ product }: { product: Product }) {
  const { addItem, toast, isWished, toggleWishlist } = useStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [unit, setUnit] = useState<SizeUnit>("UK");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const recommendations = useMemo(
    () => getProductsBySlugs(PDP_RECOMMENDATION_SLUGS),
    [],
  );
  const wished = isWished(product.slug);

  useEffect(() => {
    if (!sizeGuideOpen && !zoomOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSizeGuideOpen(false);
        setZoomOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [sizeGuideOpen, zoomOpen]);

  const accordions = [
    {
      title: "Construction & materials",
      body: product.story,
    },
    {
      title: "Sizing & fit",
      body:
        product.sizes[0] === "One Size"
          ? "One size. Designed to fit most footwear sizes UK 6–12. Each piece is finished by hand, so slight variation is expected."
          : "True to size. The last is built for a close, architectural fit; if you are between sizes or wear thick socks, take the next half size up. Complimentary size exchanges are available within 14 days.",
    },
    {
      title: "Shipping & returns",
      body:
        "Complimentary express dispatch across India and worldwide delivery within 3–7 business days. Every order is atelier-sealed and fully insured. Returns and exchanges are accepted within 14 days in unworn condition with all original packaging.",
    },
    {
      title: "Authentication & care",
      body:
        "Each pair carries an atelier authentication record and care card. Store with the supplied dust bags and cedar trees, away from direct sunlight. For suede and technical uppers, use the SOLE STORE preservation kit.",
    },
  ];

  function addToBag() {
    addItem({
      slug: product.slug,
      size: selectedSize,
      color: selectedColor?.name ?? "Signature",
      qty: 1,
    });
    toast(
      "Added to your bag",
      `${product.name} · ${sizeLabel(selectedSize, "UK")} · ${selectedColor?.name ?? "Signature"}`,
    );
  }

  function wish() {
    const added = toggleWishlist(product.slug);
    toast(
      added ? "Saved to your wishlist" : "Removed from wishlist",
      added ? product.name : undefined,
    );
  }

  async function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast("Link copied", product.name);
      }
    } catch {
      toast("Copy the link", url);
    }
  }

  const whatsappMessage = `Hi SOLE STORE, I'd like to enquire about the ${product.name} in ${selectedColor?.name ?? "the signature colour"}, ${sizeLabel(selectedSize, unit)}. Is this allocation available?`;

  return (
    <>
      <div className="border-b border-outline-variant/35 bg-surface-container-lowest">
        <div className="mx-auto max-w-[1680px] px-5 py-4 sm:px-8 xl:px-12">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 font-label-sm text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/60"
          >
            <Link href="/" className="hover:text-on-surface">
              Home
            </Link>
            <span className="text-outline-variant">/</span>
            <Link href="/catalog" className="hover:text-on-surface">
              Archive
            </Link>
            <span className="text-outline-variant">/</span>
            <Link
              href={`/catalog?category=${product.category}`}
              className="capitalize hover:text-on-surface"
            >
              {product.category}
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="max-w-[48vw] truncate text-on-surface-variant">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <section className="mx-auto max-w-[1680px] px-5 py-8 sm:px-8 lg:py-12 xl:px-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(380px,0.92fr)] lg:gap-14 xl:gap-20">
          <div className="flex min-w-0 flex-col-reverse gap-3 sm:flex-row">
            <div className="flex shrink-0 gap-2 overflow-x-auto scrollbar-none sm:w-[82px] sm:flex-col">
              {product.gallery.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  aria-label={`View image ${index + 1}`}
                  className={cn(
                    "relative aspect-square w-[68px] shrink-0 overflow-hidden border bg-surface-container-lowest transition-colors sm:w-full",
                    selectedImage === index
                      ? "border-tertiary"
                      : "border-outline-variant/30 hover:border-on-surface-variant",
                  )}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="82px"
                    className="object-contain p-1"
                  />
                </button>
              ))}
            </div>

            <div className="group relative aspect-[4/5] min-w-0 flex-1 overflow-hidden bg-surface-container-lowest">
              <Image
                src={product.gallery[selectedImage] ?? product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-contain p-6 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035] sm:p-10 lg:p-14"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
              {product.badge ? (
                <span className="absolute left-4 top-4 border border-tertiary/40 bg-background/55 px-3 py-2 font-label-sm text-[8px] uppercase tracking-[0.18em] text-tertiary backdrop-blur">
                  {product.badge.label}
                </span>
              ) : null}
              <div className="absolute right-4 top-4 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setZoomOpen(true)}
                  aria-label="Expand image"
                  className="flex h-9 w-9 items-center justify-center border border-on-surface/15 bg-background/45 text-on-surface backdrop-blur transition-colors hover:border-tertiary hover:text-tertiary"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    zoom_in
                  </span>
                </button>
                <button
                  type="button"
                  onClick={share}
                  aria-label="Share product"
                  className="flex h-9 w-9 items-center justify-center border border-on-surface/15 bg-background/45 text-on-surface backdrop-blur transition-colors hover:border-tertiary hover:text-tertiary"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    ios_share
                  </span>
                </button>
              </div>
              <span className="absolute bottom-4 left-4 font-label-sm text-[8px] uppercase tracking-[0.2em] text-on-surface-variant/70">
                {String(selectedImage + 1).padStart(2, "0")} /{" "}
                {String(product.gallery.length).padStart(2, "0")}
              </span>
              <span className="absolute bottom-4 right-4 hidden items-center gap-1.5 font-label-sm text-[8px] uppercase tracking-[0.15em] text-on-surface-variant/65 sm:flex">
                <span className="material-symbols-outlined text-[13px] text-tertiary">
                  zoom_in
                </span>
                Click to inspect
              </span>
            </div>
          </div>

          <div className="min-w-0 lg:max-w-[560px]">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="font-label-sm text-[8.5px] uppercase tracking-[0.24em] text-tertiary">
                  {product.line}
                </p>
                <h1 className="mt-4 font-display text-[clamp(2rem,3.4vw,3.15rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-on-surface">
                  {product.name}
                </h1>
              </div>
              <button
                type="button"
                onClick={wish}
                aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={wished}
                className={cn(
                  "mt-1 flex h-11 w-11 shrink-0 items-center justify-center border transition-colors",
                  wished
                    ? "border-tertiary bg-tertiary/10 text-tertiary"
                    : "border-outline-variant/50 text-on-surface-variant hover:border-tertiary hover:text-tertiary",
                )}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: wished ? '"FILL" 1' : undefined }}
                >
                  favorite
                </span>
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="flex items-center gap-1.5">
                <span className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      key={index}
                      className="material-symbols-outlined text-[15px] text-tertiary"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      star
                    </span>
                  ))}
                </span>
                <span className="font-label-sm text-[9px] tracking-[0.06em] text-on-surface">
                  {product.rating.toFixed(1)}
                </span>
                <span className="font-label-sm text-[9px] tracking-[0.04em] text-on-surface-variant">
                  ({product.reviews} reviews)
                </span>
              </span>
              <span className="h-3 w-px bg-outline-variant/60" />
              <span className="flex items-center gap-1.5 font-label-sm text-[8px] uppercase tracking-[0.14em] text-on-surface-variant">
                <span className="material-symbols-outlined text-[14px] text-tertiary">
                  verified
                </span>
                Atelier authenticated
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-end gap-4 border-y border-outline-variant/35 py-5">
              <p className="font-display text-[28px] font-medium leading-none tracking-[-0.02em] text-on-surface">
                {formatINR(product.price)}
              </p>
              {product.compareAt ? (
                <>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-through">
                    {formatINR(product.compareAt)}
                  </p>
                  <p className="mb-0.5 bg-tertiary/15 px-2 py-1 font-label-sm text-[8px] uppercase tracking-[0.12em] text-tertiary">
                    Save {formatINR(product.compareAt - product.price)}
                  </p>
                </>
              ) : null}
              <p className="ml-auto font-label-sm text-[8px] uppercase tracking-[0.12em] text-on-surface-variant/65">
                Taxes included
              </p>
            </div>

            <p className="mt-6 font-body-md text-body-md leading-relaxed text-on-surface-variant">
              {product.description}
            </p>

            <div className="mt-7">
              <div className="flex items-center justify-between">
                <p className="font-label-sm text-[9px] uppercase tracking-[0.18em] text-on-surface-variant">
                  Colour ·{" "}
                  <span className="text-on-surface">
                    {selectedColor?.name ?? "Signature"}
                  </span>
                </p>
                <span className="font-label-sm text-[8px] uppercase tracking-[0.12em] text-on-surface-variant/55">
                  {product.colors.length} colourways
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {product.colors.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    aria-label={color.name}
                    aria-pressed={selectedColor?.id === color.id}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all",
                      selectedColor?.id === color.id
                        ? "border-tertiary"
                        : "border-outline-variant/45 hover:border-on-surface-variant",
                    )}
                  >
                    <span
                      className="h-6 w-6 rounded-full border border-white/10"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7">
              <div className="flex items-center justify-between">
                <p className="font-label-sm text-[9px] uppercase tracking-[0.18em] text-on-surface-variant">
                  Select size
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex border border-outline-variant/45">
                    {SIZE_UNITS.map((sizeUnit) => (
                      <button
                        key={sizeUnit}
                        type="button"
                        onClick={() => setUnit(sizeUnit)}
                        className={cn(
                          "px-2 py-1 font-label-sm text-[8px] tracking-[0.08em] transition-colors",
                          unit === sizeUnit
                            ? "bg-on-surface text-background"
                            : "text-on-surface-variant hover:text-on-surface",
                        )}
                      >
                        {sizeUnit}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSizeGuideOpen(true)}
                    className="font-label-sm text-[8px] uppercase tracking-[0.1em] text-on-surface-variant underline decoration-outline-variant underline-offset-4 hover:text-tertiary"
                  >
                    Size guide
                  </button>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
                    className={cn(
                      "flex h-10 items-center justify-center border font-label-sm text-[10px] tracking-[0.05em] transition-colors",
                      selectedSize === size
                        ? "border-tertiary bg-tertiary text-on-tertiary"
                        : "border-outline-variant/45 text-on-surface-variant hover:border-on-surface-variant hover:text-on-surface",
                    )}
                  >
                    {size === "One Size"
                      ? "One Size"
                      : convertSize(size, unit)}
                  </button>
                ))}
              </div>
              <p className="mt-3 flex items-center gap-1.5 font-label-sm text-[8px] uppercase tracking-[0.12em] text-on-surface-variant/70">
                <span className="h-1.5 w-1.5 rounded-full bg-tertiary" />
                {product.stock <= 3
                  ? `Only ${product.stock} pairs remain in this allocation`
                  : "In stock · ready to dispatch"}
              </p>
            </div>

            <div className="mt-7 flex gap-2.5">
              <button
                type="button"
                onClick={addToBag}
                className="group flex flex-1 items-center justify-between gap-4 bg-on-surface px-5 py-4 font-label-md text-label-md uppercase tracking-[0.15em] text-background transition-colors hover:bg-tertiary hover:text-on-tertiary"
              >
                Add to bag
                <span className="material-symbols-outlined text-[19px] transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
              <a
                href={waLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enquire on WhatsApp"
                className="flex h-[52px] w-[52px] shrink-0 items-center justify-center border border-outline-variant/55 text-on-surface transition-colors hover:border-tertiary hover:text-tertiary"
              >
                <span className="material-symbols-outlined text-[21px]">
                  chat
                </span>
              </a>
            </div>

            <div className="mt-3 grid grid-cols-3 divide-x divide-outline-variant/30 border border-outline-variant/35 py-3.5">
              {[
                ["local_shipping", "Free dispatch"],
                ["published_with_changes", "14-day returns"],
                ["nfc", "NFC verified"],
              ].map(([icon, label]) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 px-1 text-center"
                >
                  <span className="material-symbols-outlined text-[18px] text-tertiary">
                    {icon}
                  </span>
                  <span className="font-label-sm text-[7.5px] uppercase leading-tight tracking-[0.1em] text-on-surface-variant">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-7 border-t border-outline-variant/35">
              {accordions.map((accordion, index) => {
                const open = openAccordion === index;
                return (
                  <div
                    key={accordion.title}
                    className="border-b border-outline-variant/35"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenAccordion(open ? null : index)}
                      aria-expanded={open}
                      className="flex w-full items-center justify-between gap-4 py-4 text-left"
                    >
                      <span className="font-label-md text-[10px] uppercase tracking-[0.15em] text-on-surface">
                        {accordion.title}
                      </span>
                      <span
                        className={cn(
                          "material-symbols-outlined text-[18px] text-on-surface-variant transition-transform duration-300",
                          open && "rotate-45",
                        )}
                      >
                        add
                      </span>
                    </button>
                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-out",
                        open
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-5 pr-5 font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
                          {accordion.body}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-5 flex items-center justify-center gap-2 font-label-sm text-[8px] uppercase tracking-[0.14em] text-on-surface-variant/60">
              <span className="material-symbols-outlined text-[14px]">
                lock
              </span>
              Secure checkout · Concierge support · {CONTACT.phoneDisplay}
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-outline-variant/35 bg-surface-container-lowest">
        <div className="mx-auto grid max-w-[1680px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:py-20 xl:px-12">
          <div>
            <p className="font-label-md text-label-md uppercase tracking-[0.2em] text-tertiary">
              The atelier note
            </p>
            <h2 className="mt-3 font-headline-lg text-headline-lg-mobile uppercase tracking-[-0.035em] text-on-surface sm:text-headline-lg">
              An object,
              <br />
              <span className="text-on-surface-variant">not a product.</span>
            </h2>
          </div>
          <div className="grid gap-7 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="font-display text-[clamp(1.35rem,2.2vw,1.85rem)] font-medium leading-[1.35] tracking-[-0.02em] text-on-surface">
                “{product.story}”
              </p>
              <p className="mt-5 font-label-sm text-[8px] uppercase tracking-[0.2em] text-on-surface-variant">
                SOLE STORE Atelier · Edition record {product.arrival}
              </p>
            </div>
            <div className="flex gap-6 sm:flex-col sm:gap-4 sm:border-l sm:border-outline-variant/35 sm:pl-8">
              <div>
                <p className="font-display text-[22px] leading-none text-tertiary">
                  {product.rating.toFixed(1)}
                </p>
                <p className="mt-1.5 font-label-sm text-[7.5px] uppercase tracking-[0.15em] text-on-surface-variant">
                  Client rating
                </p>
              </div>
              <div>
                <p className="font-display text-[22px] leading-none text-tertiary">
                  {product.reviews}
                </p>
                <p className="mt-1.5 font-label-sm text-[7.5px] uppercase tracking-[0.15em] text-on-surface-variant">
                  Verified reviews
                </p>
              </div>
              <div>
                <p className="font-display text-[22px] leading-none text-tertiary">
                  {String(product.stock).padStart(2, "0")}
                </p>
                <p className="mt-1.5 font-label-sm text-[7.5px] uppercase tracking-[0.15em] text-on-surface-variant">
                  Pairs remaining
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1680px] px-5 py-14 sm:px-8 lg:py-20 xl:px-12">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="font-label-md text-label-md uppercase tracking-[0.2em] text-tertiary">
              Curated with
            </p>
            <h2 className="mt-3 font-headline-lg text-headline-lg-mobile uppercase tracking-[-0.035em] text-on-surface sm:text-headline-lg">
              Complete the silhouette
            </h2>
          </div>
          <Link
            href="/catalog"
            className="hidden items-center gap-2 font-label-sm text-[9px] uppercase tracking-[0.16em] text-on-surface-variant transition-colors hover:text-tertiary sm:flex"
          >
            View archive
            <span className="material-symbols-outlined text-[16px]">
              arrow_forward
            </span>
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-3">
          {recommendations.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>

      {sizeGuideOpen ? (
        <div className="fixed inset-0 z-[85] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close size guide"
            onClick={() => setSizeGuideOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <div className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto border border-outline-variant/45 bg-surface-container-low p-6 shadow-2xl scrollbar-none sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-label-sm text-[8px] uppercase tracking-[0.18em] text-tertiary">
                  Fit reference
                </p>
                <h2 className="mt-2 font-headline-sm text-headline-sm text-on-surface">
                  Size guide
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSizeGuideOpen(false)}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="mt-3 font-body-sm text-body-sm text-on-surface-variant">
              {product.name} is built on an architectural last. Select your
              usual size; take a half size up for a relaxed fit.
            </p>
            <div className="mt-5 overflow-hidden border border-outline-variant/35">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-surface-container-highest">
                    {["UK", "EU", "US", "CM"].map((heading) => (
                      <th
                        key={heading}
                        className="px-3 py-2.5 font-label-sm text-[8px] uppercase tracking-[0.14em] text-on-surface-variant"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeGuideRows.map((row) => (
                    <tr
                      key={row[0]}
                      className={cn(
                        "border-t border-outline-variant/25",
                        product.sizes.includes(row[0]) &&
                          "bg-tertiary/8 text-tertiary",
                      )}
                    >
                      {row.map((cell, index) => (
                        <td
                          key={`${row[0]}-${index}`}
                          className={cn(
                            "px-3 py-2 font-body-sm text-[12px]",
                            index === 0
                              ? "text-on-surface"
                              : "text-on-surface-variant",
                          )}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 font-label-sm text-[8px] uppercase leading-relaxed tracking-[0.12em] text-on-surface-variant/65">
              Between sizes? WhatsApp the concierge for a personal fitting
              recommendation.
            </p>
          </div>
        </div>
      ) : null}

      {zoomOpen ? (
        <div className="fixed inset-0 z-[85] flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm">
          <button
            type="button"
            aria-label="Close image"
            onClick={() => setZoomOpen(false)}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-outline-variant/50 text-on-surface hover:border-tertiary hover:text-tertiary"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="relative h-[82vh] w-full max-w-5xl">
            <Image
              src={product.gallery[selectedImage] ?? product.image}
              alt={product.name}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
