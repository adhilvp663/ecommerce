"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { CONTACT, waLink } from "@/lib/constants";
import { cn, formatINR } from "@/lib/format";
import {
  CART_SUGGESTION_SLUGS,
  getProduct,
  getProductsBySlugs,
} from "@/lib/products";
import { useStore } from "@/lib/store";

const PROMO_CODE = "SOLEVIP";
const PROMO_RATE = 0.15;
const ADD_ON_SLUG = "nanotech-waterproof-spray";

function formatTime(total: number) {
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function CartClient() {
  const {
    entries,
    items,
    count,
    subtotal,
    updateQty,
    removeItem,
    addItem,
    toast,
  } = useStore();
  const [seconds, setSeconds] = useState(599);
  const [codeInput, setCodeInput] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const suggestions = useMemo(
    () => getProductsBySlugs(CART_SUGGESTION_SLUGS),
    [],
  );
  const addOn = getProduct(ADD_ON_SLUG);
  const hasAddOn = items.some((line) => line.slug === ADD_ON_SLUG);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSeconds((current) => (current > 0 ? current - 1 : 0));
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const discount = promoApplied ? Math.round(subtotal * PROMO_RATE) : 0;
  const total = Math.max(0, subtotal - discount);

  function applyPromo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (codeInput.trim().toUpperCase() === PROMO_CODE) {
      setPromoApplied(true);
      setCodeInput("");
      toast("SOLEVIP applied", "15% private client discount added to your bag.");
    } else {
      toast(
        "Code not recognised",
        "Check the private client code and try again.",
      );
    }
  }

  function toggleAddOn() {
    if (!addOn) return;
    if (hasAddOn) {
      removeItem(addOn.slug, addOn.sizes[0], addOn.colors[0]?.name ?? "Black");
      toast("Add-on removed", addOn.name);
      return;
    }
    addItem({
      slug: addOn.slug,
      size: addOn.sizes[0],
      color: addOn.colors[0]?.name ?? "Black",
      qty: 1,
    });
    toast("Add-on added", `${addOn.name} · ${formatINR(addOn.price)}`);
  }

  function removeLine(line: (typeof entries)[number]) {
    removeItem(line.slug, line.size, line.color);
    toast("Removed from bag", line.product.name);
  }

  const whatsappMessage = [
    "Hi SOLE STORE, I'd like to place an order.",
    "",
    ...entries.map(
      (entry, index) =>
        `${index + 1}. ${entry.product.name} — ${entry.size} / ${entry.color} × ${entry.qty} — ${formatINR(entry.lineTotal)}`,
    ),
    "",
    `Subtotal: ${formatINR(subtotal)}`,
    promoApplied ? `SOLEVIP discount (15%): -${formatINR(discount)}` : null,
    `Total: ${formatINR(total)}`,
    "",
    "Please confirm availability and share the secure payment link.",
    "Name:",
    "Delivery address:",
  ]
    .filter((line) => line !== null)
    .join("\n");

  if (entries.length === 0) {
    return (
      <>
        <section className="border-b border-outline-variant/35 bg-surface-container-lowest">
          <div className="mx-auto max-w-[1680px] px-5 pb-9 pt-10 sm:px-8 sm:pb-12 sm:pt-14 xl:px-12">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 font-label-sm text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/60"
            >
              <Link href="/" className="hover:text-on-surface">
                Home
              </Link>
              <span className="text-outline-variant">/</span>
              <span className="text-on-surface-variant">Bag</span>
            </nav>
            <h1 className="mt-6 font-display text-[clamp(2.6rem,5vw,4.6rem)] font-semibold uppercase leading-[0.9] tracking-[-0.045em] text-on-surface">
              Your bag.
            </h1>
          </div>
        </section>
        <section className="mx-auto flex min-h-[52vh] max-w-2xl flex-col items-center justify-center px-5 py-20 text-center">
          <span className="flex h-16 w-16 items-center justify-center border border-outline-variant/50 text-on-surface-variant">
            <span className="material-symbols-outlined text-[28px]">
              shopping_bag
            </span>
          </span>
          <h2 className="mt-6 font-headline-md text-headline-md uppercase text-on-surface">
            The bag is empty
          </h2>
          <p className="mt-3 max-w-sm font-body-md text-body-md text-on-surface-variant">
            No allocations reserved. Explore the current drop and select your
            size to begin.
          </p>
          <Link
            href="/catalog"
            className="mt-7 bg-tertiary px-6 py-3.5 font-label-md text-[10px] uppercase tracking-[0.16em] text-on-tertiary transition-colors hover:bg-tertiary/90"
          >
            Enter the archive
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="border-b border-outline-variant/35 bg-surface-container-lowest">
        <div className="mx-auto max-w-[1680px] px-5 pb-9 pt-10 sm:px-8 sm:pb-12 sm:pt-14 xl:px-12">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-label-sm text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/60"
          >
            <Link href="/" className="hover:text-on-surface">
              Home
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="text-on-surface-variant">Bag</span>
          </nav>
          <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-label-md text-label-md uppercase tracking-[0.22em] text-tertiary">
                {String(count).padStart(2, "0")} pairs reserved
              </p>
              <h1 className="mt-3 font-display text-[clamp(2.5rem,5vw,4.6rem)] font-semibold uppercase leading-[0.9] tracking-[-0.045em] text-on-surface">
                Your bag.
              </h1>
            </div>
            <div
              className={cn(
                "flex items-center gap-3 border px-4 py-3",
                seconds > 0
                  ? "border-tertiary/30 bg-tertiary/5"
                  : "border-outline-variant/50 bg-surface-container",
              )}
            >
              <span className="material-symbols-outlined text-[18px] text-tertiary">
                timer
              </span>
              <div>
                <p className="font-label-sm text-[8px] uppercase tracking-[0.15em] text-on-surface-variant">
                  {seconds > 0
                    ? "Allocation held for"
                    : "Allocation reservation expired"}
                </p>
                <p className="mt-1 font-label-md text-[12px] tracking-[0.12em] text-on-surface">
                  {seconds > 0 ? formatTime(seconds) : "00:00"}
                </p>
              </div>
              {seconds === 0 ? (
                <button
                  type="button"
                  onClick={() => setSeconds(599)}
                  className="ml-2 font-label-sm text-[8px] uppercase tracking-[0.12em] text-tertiary underline underline-offset-4 hover:text-on-surface"
                >
                  Extend
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1680px] px-5 py-10 sm:px-8 lg:py-14 xl:px-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_390px] xl:grid-cols-[minmax(0,1fr)_430px] xl:gap-16">
          <div>
            <div className="hidden border-b border-outline-variant/35 pb-3 font-label-sm text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/55 sm:grid sm:grid-cols-[1fr_140px_120px] sm:gap-4">
              <span>Object</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Total</span>
            </div>

            <div>
              {entries.map((entry) => (
                <article
                  key={`${entry.slug}-${entry.size}-${entry.color}`}
                  className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 border-b border-outline-variant/35 py-5 sm:grid-cols-[1fr_140px_120px] sm:items-center sm:gap-4 sm:py-6"
                >
                  <div className="contents sm:hidden">
                    <Link
                      href={`/product/${entry.product.slug}`}
                      className="relative aspect-[4/5] overflow-hidden bg-surface-container-lowest"
                    >
                      <Image
                        src={entry.product.image}
                        alt={entry.product.name}
                        fill
                        sizes="96px"
                        className="object-contain p-1.5"
                      />
                    </Link>
                    <div className="min-w-0">
                      <p className="font-label-sm text-[7.5px] uppercase tracking-[0.16em] text-on-surface-variant">
                        {entry.product.line}
                      </p>
                      <Link
                        href={`/product/${entry.product.slug}`}
                        className="mt-1.5 block font-headline-sm text-[16px] leading-tight text-on-surface hover:text-tertiary"
                      >
                        {entry.product.name}
                      </Link>
                      <p className="mt-1.5 font-label-sm text-[8.5px] uppercase tracking-[0.1em] text-on-surface-variant">
                        {entry.size === "One Size" ? "One Size" : `UK ${entry.size}`}{" "}
                        · {entry.color}
                      </p>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="flex items-center border border-outline-variant/45">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() =>
                              updateQty(
                                entry.slug,
                                entry.size,
                                entry.color,
                                entry.qty - 1,
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center text-on-surface-variant hover:text-on-surface"
                          >
                            <span className="material-symbols-outlined text-[15px]">
                              remove
                            </span>
                          </button>
                          <span className="w-6 text-center font-label-sm text-[9px] text-on-surface">
                            {entry.qty}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() =>
                              updateQty(
                                entry.slug,
                                entry.size,
                                entry.color,
                                entry.qty + 1,
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center text-on-surface-variant hover:text-on-surface"
                          >
                            <span className="material-symbols-outlined text-[15px]">
                              add
                            </span>
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-label-md text-[11px] text-on-surface">
                            {formatINR(entry.lineTotal)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeLine(entry)}
                            aria-label={`Remove ${entry.product.name}`}
                            className="text-on-surface-variant hover:text-error"
                          >
                            <span className="material-symbols-outlined text-[17px]">
                              delete
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:flex sm:items-center sm:gap-5">
                    <Link
                      href={`/product/${entry.product.slug}`}
                      className="relative h-[132px] w-[108px] shrink-0 overflow-hidden bg-surface-container-lowest"
                    >
                      <Image
                        src={entry.product.image}
                        alt={entry.product.name}
                        fill
                        sizes="108px"
                        className="object-contain p-2 transition-transform duration-500 hover:scale-105"
                      />
                    </Link>
                    <div className="min-w-0">
                      <p className="font-label-sm text-[7.5px] uppercase tracking-[0.17em] text-on-surface-variant">
                        {entry.product.line}
                      </p>
                      <Link
                        href={`/product/${entry.product.slug}`}
                        className="mt-1.5 block font-headline-sm text-[17px] leading-tight text-on-surface transition-colors hover:text-tertiary"
                      >
                        {entry.product.name}
                      </Link>
                      <p className="mt-2 font-label-sm text-[8px] uppercase tracking-[0.13em] text-on-surface-variant">
                        {entry.size === "One Size" ? "One Size" : `UK ${entry.size}`}{" "}
                        · {entry.color}
                      </p>
                      <p className="mt-1 font-label-sm text-[8px] uppercase tracking-[0.1em] text-on-surface-variant/55">
                        Unit {formatINR(entry.product.price)}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeLine(entry)}
                        className="mt-3 flex items-center gap-1.5 font-label-sm text-[8px] uppercase tracking-[0.12em] text-on-surface-variant/65 transition-colors hover:text-error"
                      >
                        <span className="material-symbols-outlined text-[13px]">
                          delete
                        </span>
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="hidden justify-center sm:flex">
                    <div className="flex items-center border border-outline-variant/45">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() =>
                          updateQty(
                            entry.slug,
                            entry.size,
                            entry.color,
                            entry.qty - 1,
                          )
                        }
                        className="flex h-9 w-8 items-center justify-center text-on-surface-variant transition-colors hover:text-on-surface"
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          remove
                        </span>
                      </button>
                      <span className="w-7 text-center font-label-sm text-[9px] text-on-surface">
                        {entry.qty}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() =>
                          updateQty(
                            entry.slug,
                            entry.size,
                            entry.color,
                            entry.qty + 1,
                          )
                        }
                        className="flex h-9 w-8 items-center justify-center text-on-surface-variant transition-colors hover:text-on-surface"
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          add
                        </span>
                      </button>
                    </div>
                  </div>

                  <p className="hidden text-right font-label-md text-[12px] tracking-[0.04em] text-on-surface sm:block">
                    {formatINR(entry.lineTotal)}
                  </p>
                </article>
              ))}
            </div>

            <Link
              href="/catalog"
              className="group mt-6 inline-flex items-center gap-2 font-label-sm text-[9px] uppercase tracking-[0.15em] text-on-surface-variant transition-colors hover:text-tertiary"
            >
              <span className="material-symbols-outlined text-[16px] transition-transform group-hover:-translate-x-1">
                arrow_back
              </span>
              Continue exploring
            </Link>

            {addOn ? (
              <div className="mt-10 border border-outline-variant/40 bg-surface-container-low p-4 sm:p-5">
                <div className="flex items-center gap-4">
                  <Link
                    href={`/product/${addOn.slug}`}
                    className="relative h-20 w-16 shrink-0 bg-surface-container-lowest"
                  >
                    <Image
                      src={addOn.image}
                      alt={addOn.name}
                      fill
                      sizes="64px"
                      className="object-contain p-1"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <p className="font-label-sm text-[7.5px] uppercase tracking-[0.17em] text-tertiary">
                      Recommended add-on
                    </p>
                    <p className="mt-1 truncate font-headline-sm text-[15px] text-on-surface">
                      {addOn.name}
                    </p>
                    <p className="mt-1 font-body-sm text-[11px] text-on-surface-variant">
                      {addOn.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={toggleAddOn}
                    aria-pressed={hasAddOn}
                    className={cn(
                      "flex shrink-0 items-center gap-2 border px-3 py-2.5 font-label-sm text-[8px] uppercase tracking-[0.12em] transition-colors",
                      hasAddOn
                        ? "border-tertiary bg-tertiary/10 text-tertiary"
                        : "border-outline-variant/55 text-on-surface hover:border-tertiary hover:text-tertiary",
                    )}
                  >
                    {hasAddOn ? (
                      <>
                        <span className="material-symbols-outlined text-[14px]">
                          check
                        </span>
                        Added
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[14px]">
                          add
                        </span>
                        {formatINR(addOn.price)}
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <aside>
            <div className="border border-outline-variant/45 bg-surface-container-low p-5 sm:p-6 lg:sticky lg:top-28">
              <div className="flex items-center justify-between border-b border-outline-variant/35 pb-4">
                <h2 className="font-headline-sm text-headline-sm uppercase tracking-[0.02em] text-on-surface">
                  Order summary
                </h2>
                <span className="font-label-sm text-[8px] uppercase tracking-[0.14em] text-on-surface-variant">
                  {String(count).padStart(2, "0")} items
                </span>
              </div>

              <div className="mt-5 space-y-3.5 font-body-sm text-body-sm">
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant">Subtotal</span>
                  <span className="text-on-surface">{formatINR(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant">
                    Express shipping
                  </span>
                  <span className="text-tertiary">Complimentary</span>
                </div>
                {promoApplied ? (
                  <div className="flex items-center justify-between text-tertiary">
                    <span className="flex items-center gap-2">
                      SOLEVIP · 15%
                      <button
                        type="button"
                        onClick={() => setPromoApplied(false)}
                        aria-label="Remove promo code"
                        className="text-tertiary/60 hover:text-tertiary"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          close
                        </span>
                      </button>
                    </span>
                    <span>-{formatINR(discount)}</span>
                  </div>
                ) : null}
                <div className="flex items-center justify-between border-t border-outline-variant/35 pt-4">
                  <span className="font-label-md text-[10px] uppercase tracking-[0.14em] text-on-surface">
                    Total
                  </span>
                  <div className="text-right">
                    <p className="font-display text-[24px] font-medium leading-none tracking-[-0.02em] text-on-surface">
                      {formatINR(total)}
                    </p>
                    <p className="mt-1 font-label-sm text-[7px] uppercase tracking-[0.1em] text-on-surface-variant/60">
                      Inclusive of all taxes
                    </p>
                  </div>
                </div>
              </div>

              {!promoApplied ? (
                <form onSubmit={applyPromo} className="mt-5">
                  <label
                    htmlFor="promo"
                    className="font-label-sm text-[8px] uppercase tracking-[0.16em] text-on-surface-variant"
                  >
                    Private client code
                  </label>
                  <div className="mt-2 flex border border-outline-variant/50 focus-within:border-tertiary/60">
                    <input
                      id="promo"
                      value={codeInput}
                      onChange={(event) => setCodeInput(event.target.value)}
                      placeholder="Enter code"
                      className="min-w-0 flex-1 bg-transparent px-3 py-3 font-label-sm text-[9px] uppercase tracking-[0.12em] text-on-surface outline-none placeholder:normal-case placeholder:tracking-normal placeholder:text-on-surface-variant/45"
                    />
                    <button
                      type="submit"
                      className="border-l border-outline-variant/50 px-4 font-label-sm text-[8px] uppercase tracking-[0.12em] text-on-surface transition-colors hover:bg-surface-container-highest hover:text-tertiary"
                    >
                      Apply
                    </button>
                  </div>
                </form>
              ) : null}

              <div className="mt-6 space-y-2.5">
                <a
                  href={waLink(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-between gap-3 bg-tertiary px-5 py-4 font-label-md text-label-md uppercase tracking-[0.14em] text-on-tertiary transition-colors hover:bg-tertiary/90"
                >
                  Checkout via WhatsApp
                  <span className="material-symbols-outlined text-[19px] transition-transform group-hover:translate-x-0.5">
                    chat
                  </span>
                </a>
                <button
                  type="button"
                  onClick={() =>
                    toast(
                      "Secure gateway arriving",
                      "Card checkout is being finalised. Complete your order via WhatsApp concierge for now.",
                    )
                  }
                  className="flex w-full items-center justify-center gap-2 border border-outline-variant/55 px-5 py-3.5 font-label-md text-[9px] uppercase tracking-[0.14em] text-on-surface transition-colors hover:border-on-surface"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    lock
                  </span>
                  Secure card checkout
                </button>
              </div>

              <div className="mt-5 space-y-2 border-t border-outline-variant/35 pt-4">
                {[
                  ["verified_user", "Insured, atelier-sealed delivery"],
                  ["published_with_changes", "14-day returns & exchanges"],
                  ["support_agent", `Concierge · ${CONTACT.phoneDisplay}`],
                ].map(([icon, label]) => (
                  <p
                    key={label}
                    className="flex items-center gap-2 font-label-sm text-[8px] uppercase tracking-[0.1em] text-on-surface-variant/70"
                  >
                    <span className="material-symbols-outlined text-[14px] text-tertiary/80">
                      {icon}
                    </span>
                    {label}
                  </p>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <section className="border-t border-outline-variant/35 bg-surface-container-lowest">
        <div className="mx-auto max-w-[1680px] px-5 py-14 sm:px-8 lg:py-20 xl:px-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-label-md text-label-md uppercase tracking-[0.2em] text-tertiary">
                Complete the order
              </p>
              <h2 className="mt-3 font-headline-lg text-headline-lg-mobile uppercase tracking-[-0.035em] text-on-surface sm:text-headline-lg">
                Curated additions
              </h2>
            </div>
            <Link
              href="/catalog"
              className="group flex items-center gap-2 font-label-sm text-[9px] uppercase tracking-[0.16em] text-on-surface-variant hover:text-tertiary"
            >
              View all 128 models
              <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4">
            {suggestions.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
