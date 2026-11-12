"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { NAV_LINKS, waLink } from "@/lib/constants";
import { cn } from "@/lib/format";
import { HeaderNavFallback, HeaderNavLinks } from "@/components/HeaderNav";
import {
  CATALOG_PRODUCTS,
  HOME_FEATURED_SLUGS,
  getProduct,
} from "@/lib/products";
import { useStore } from "@/lib/store";

function Logo() {
  return (
    <Link
      href="/"
      aria-label="SOLE STORE home"
      className="group flex shrink-0 items-center gap-3"
    >
      <span className="flex h-9 w-9 items-center justify-center border border-tertiary/45 bg-tertiary/5 transition-colors group-hover:bg-tertiary/10">
        <span className="material-symbols-outlined text-[19px] text-tertiary">
          footprint
        </span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[19px] font-semibold tracking-[0.2em] text-on-surface">
          SOLE STORE
        </span>
        <span className="mt-1.5 font-label-sm text-[8px] uppercase tracking-[0.32em] text-on-surface-variant">
          Archive &amp; Atelier
        </span>
      </span>
    </Link>
  );
}

function CountBadge({ count }: { count: number }) {
  return (
    <span className="absolute -right-2 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-tertiary px-1 font-label-sm text-[9px] leading-none text-on-tertiary">
      {count > 9 ? "9+" : count}
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const { count, wishlistCount } = useStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    const timer = window.setTimeout(() => searchInput.current?.focus(), 40);
    return () => window.clearTimeout(timer);
  }, [searchOpen]);

  useEffect(() => {
    const locked = searchOpen || mobileOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen, mobileOpen]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return HOME_FEATURED_SLUGS.slice(0, 4).map(getProduct).filter(Boolean);
    return CATALOG_PRODUCTS.filter((product) =>
      [product.name, product.line, product.category, product.description]
        .join(" ")
        .toLowerCase()
        .includes(term),
    ).slice(0, 6);
  }, [query]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-24 border-b border-outline-variant/35 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-full max-w-[1680px] items-center justify-between gap-6 px-5 sm:px-8 xl:px-12">
          <Logo />

          <Suspense fallback={<HeaderNavFallback />}>
            <HeaderNavLinks />
          </Suspense>

          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search the archive"
              className="group relative flex h-10 w-10 items-center justify-center text-on-surface-variant transition-colors hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[21px]">search</span>
            </button>
            <Link
              href="/account"
              aria-label="Account"
              className="hidden h-10 w-10 items-center justify-center text-on-surface-variant transition-colors hover:text-on-surface sm:flex"
            >
              <span className="material-symbols-outlined text-[21px]">
                person
              </span>
            </Link>
            <Link
              href="/account?tab=wishlist"
              aria-label={`Wishlist, ${wishlistCount} items`}
              className="relative flex h-10 w-10 items-center justify-center text-on-surface-variant transition-colors hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[21px]">
                favorite
              </span>
              {wishlistCount > 0 ? <CountBadge count={wishlistCount} /> : null}
            </Link>
            <Link
              href="/cart"
              aria-label={`Bag, ${count} items`}
              className="relative flex h-10 w-10 items-center justify-center text-on-surface-variant transition-colors hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[21px]">
                shopping_bag
              </span>
              {count > 0 ? <CountBadge count={count} /> : null}
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center text-on-surface-variant transition-colors hover:text-on-surface lg:hidden"
            >
              <span className="material-symbols-outlined text-[23px]">menu</span>
            </button>
          </div>
        </div>
      </header>

      {searchOpen ? (
        <div className="fixed inset-0 z-[80] flex flex-col bg-background/85 backdrop-blur-md">
          <button
            type="button"
            aria-label="Close search"
            className="absolute inset-0 cursor-default"
            onClick={() => setSearchOpen(false)}
          />
          <div className="relative mx-auto mt-24 w-full max-w-3xl px-5 sm:px-8">
            <div className="border border-outline-variant/50 bg-surface-container-low shadow-2xl shadow-black/60">
              <div className="flex items-center gap-4 border-b border-outline-variant/40 px-5 py-5">
                <span className="material-symbols-outlined text-[24px] text-tertiary">
                  search
                </span>
                <input
                  ref={searchInput}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search silhouettes, ateliers, editions…"
                  aria-label="Search products"
                  className="min-w-0 flex-1 bg-transparent font-body-lg text-body-lg text-on-surface outline-none placeholder:text-on-surface-variant/60"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="font-label-sm text-label-sm uppercase tracking-[0.16em] text-on-surface-variant transition-colors hover:text-on-surface"
                >
                  Esc
                </button>
              </div>

              <div className="max-h-[58vh] overflow-y-auto scrollbar-none">
                <p className="px-5 pb-2 pt-5 font-label-sm text-label-sm uppercase tracking-[0.2em] text-on-surface-variant">
                  {query.trim() ? "Search results" : "Trending in the archive"}
                </p>
                {results.length > 0 ? (
                  <div className="p-2">
                    {results.map((product) =>
                      product ? (
                        <Link
                          key={product.slug}
                          href={`/product/${product.slug}`}
                          onClick={() => setSearchOpen(false)}
                          className="group flex items-center gap-4 p-3 transition-colors hover:bg-surface-container"
                        >
                          <span className="relative h-16 w-14 shrink-0 overflow-hidden bg-surface-container-lowest">
                            <Image
                              src={product.image}
                              alt=""
                              fill
                              sizes="56px"
                              className="object-contain p-1 transition-transform duration-500 group-hover:scale-105"
                            />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-headline-sm text-[15px] leading-tight tracking-[-0.01em] text-on-surface">
                              {product.name}
                            </span>
                            <span className="mt-1 block font-label-sm text-[9px] uppercase tracking-[0.18em] text-on-surface-variant">
                              {product.line} · {product.category}
                            </span>
                          </span>
                          <span className="material-symbols-outlined text-[18px] text-on-surface-variant transition-transform group-hover:translate-x-1 group-hover:text-tertiary">
                            arrow_outward
                          </span>
                        </Link>
                      ) : null,
                    )}
                  </div>
                ) : (
                  <div className="px-5 pb-8 pt-3">
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      No silhouettes match “{query}”. Try “sneakers”, “loafer”
                      or a colour.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-outline-variant/40 px-5 py-3">
                <span className="font-label-sm text-[9px] uppercase tracking-[0.18em] text-on-surface-variant">
                  <span className="text-on-surface">⌘K</span> to open · ESC to
                  close
                </span>
                <Link
                  href="/catalog"
                  onClick={() => setSearchOpen(false)}
                  className="font-label-sm text-[9px] uppercase tracking-[0.18em] text-tertiary hover:text-on-surface"
                >
                  Browse all 128 models
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div
        className={cn(
          "fixed inset-0 z-[70] lg:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMobileOpen(false)}
        />
        <aside
          className={cn(
            "absolute right-0 top-0 flex h-full w-[min(88vw,420px)] flex-col border-l border-outline-variant/40 bg-surface-container-lowest transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            mobileOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex h-24 items-center justify-between border-b border-outline-variant/40 px-6">
            <Logo />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-6 py-7" aria-label="Mobile">
            {NAV_LINKS.map((link, index) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="group flex items-baseline justify-between border-b border-outline-variant/25 py-4"
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-label-sm text-[8px] text-tertiary/70">
                    0{index + 1}
                  </span>
                  <span className="font-headline-sm text-headline-sm uppercase tracking-[0.06em] text-on-surface">
                    {link.label}
                  </span>
                </span>
                <span className="material-symbols-outlined text-[17px] text-on-surface-variant transition-transform group-hover:translate-x-1">
                  arrow_outward
                </span>
              </Link>
            ))}
            <Link
              href="/account"
              onClick={() => setMobileOpen(false)}
              className="mt-6 flex items-center gap-3 font-label-md text-label-md uppercase tracking-[0.16em] text-on-surface-variant"
            >
              <span className="material-symbols-outlined text-[20px]">
                person
              </span>
              My Account
            </Link>
            <Link
              href="/cart"
              onClick={() => setMobileOpen(false)}
              className="mt-4 flex items-center gap-3 font-label-md text-label-md uppercase tracking-[0.16em] text-on-surface-variant"
            >
              <span className="material-symbols-outlined text-[20px]">
                shopping_bag
              </span>
              Bag ({count})
            </Link>
          </nav>
          <div className="border-t border-outline-variant/40 p-6">
            <a
              href={waLink("Hi SOLE STORE, I'd like some help with my order.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-3 bg-tertiary px-5 py-4 font-label-md text-label-md uppercase tracking-[0.16em] text-on-tertiary transition-colors hover:bg-tertiary/90"
            >
              <span className="material-symbols-outlined text-[19px]">
                chat
              </span>
              Concierge on WhatsApp
            </a>
            <p className="mt-4 text-center font-label-sm text-[9px] uppercase tracking-[0.18em] text-on-surface-variant">
              Mumbai · Milano · Worldwide
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
