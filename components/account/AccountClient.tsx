"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { CONTACT, waLink } from "@/lib/constants";
import { cn, formatINR } from "@/lib/format";
import { IMAGES, getProduct, getProductsBySlugs } from "@/lib/products";
import { useStore } from "@/lib/store";

type AccountTab = "orders" | "wishlist" | "profile" | "addresses" | "concierge";

const tabs: Array<{ key: AccountTab; label: string; icon: string }> = [
  { key: "orders", label: "Orders & tracking", icon: "package_2" },
  { key: "wishlist", label: "Wishlist", icon: "favorite" },
  { key: "profile", label: "Client profile", icon: "person" },
  { key: "addresses", label: "Address vault", icon: "location_on" },
  { key: "concierge", label: "Concierge", icon: "concierge" },
];

function isTab(value: string | null): value is AccountTab {
  return Boolean(value && tabs.some((tab) => tab.key === value));
}

const orderHistory = [
  {
    id: "SS-2408-018",
    date: "08 Nov 2026",
    status: "In transit",
    statusTone: "gold",
    total: 16990,
    items: [{ slug: "spectre-runner-01", size: "8", color: "Triple Black" }],
    eta: "Expected 12 Nov 2026",
  },
  {
    id: "SS-1809-012",
    date: "18 Sep 2026",
    status: "Delivered",
    statusTone: "muted",
    total: 29190,
    items: [
      { slug: "venetian-suede-loafer", size: "9", color: "Cigar Brown" },
      { slug: "atelier-shoe-preservation-kit", size: "One Size", color: "Triple Black" },
    ],
    eta: "Delivered 23 Sep 2026",
  },
  {
    id: "SS-0208-007",
    date: "02 Aug 2026",
    status: "Delivered",
    statusTone: "muted",
    total: 16200,
    items: [{ slug: "kuro-minimalist-low", size: "9", color: "Triple Black" }],
    eta: "Delivered 06 Aug 2026",
  },
] as const;

const addresses = [
  {
    label: "Primary residence",
    tag: "DEFAULT",
    name: "Adhil V. P.",
    lines: ["14 Marine Vista, Bandra West", "Mumbai, Maharashtra 400050", "India"],
    phone: CONTACT.phoneDisplay,
    icon: "home",
  },
  {
    label: "Milano studio",
    tag: "ATELIER",
    name: "Adhil V. P.",
    lines: ["Via della Spiga 18", "20121 Milano MI", "Italy"],
    phone: "+39 02 7600 1842",
    icon: "apartment",
  },
] as const;

const trackingSteps = [
  { label: "Order confirmed", detail: "08 Nov · 09:42 IST" },
  { label: "Atelier dispatch", detail: "09 Nov · 16:18 IST" },
  { label: "In transit", detail: "10 Nov · 07:26 IST" },
  { label: "Delivered", detail: "Expected 12 Nov" },
];

export function AccountClient() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab");
  const [tab, setTab] = useState<AccountTab>(() =>
    isTab(initialTab) ? initialTab : "orders",
  );
  const { wishlist, addItem, toast } = useStore();
  const wishlistProducts = useMemo(
    () => getProductsBySlugs(wishlist),
    [wishlist],
  );
  const [dropAlerts, setDropAlerts] = useState(true);
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);

  useEffect(() => {
    if (isTab(initialTab)) setTab(initialTab);
  }, [initialTab]);

  const activeOrder = orderHistory[0];

  function reorder(order: (typeof orderHistory)[number]) {
    order.items.forEach((item) => {
      addItem({
        slug: item.slug,
        size: item.size,
        color: item.color,
        qty: 1,
      });
    });
    toast("Added to bag", `${order.items.length} archived pieces from ${order.id}`);
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
            <span className="text-on-surface-variant">Client account</span>
          </nav>

          <div className="mt-7 flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-full border border-tertiary/35 sm:h-[88px] sm:w-[88px]">
                <Image
                  src={IMAGES.accountAvatar}
                  alt="Adhil V. P."
                  fill
                  priority
                  sizes="88px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-label-sm text-[8px] uppercase tracking-[0.22em] text-tertiary">
                  Member 0042 · SOLEVIP tier II
                </p>
                <h1 className="mt-2 font-display text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-on-surface">
                  Good evening, Adhil.
                </h1>
                <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
                  Client since 2023 · {CONTACT.email}
                </p>
              </div>
            </div>

            <div className="flex gap-6 border-t border-outline-variant/35 pt-5 sm:border-0 sm:pt-0">
              <div>
                <p className="font-display text-[24px] leading-none text-on-surface">
                  14
                </p>
                <p className="mt-1.5 font-label-sm text-[7.5px] uppercase tracking-[0.14em] text-on-surface-variant">
                  Orders
                </p>
              </div>
              <div>
                <p className="font-display text-[24px] leading-none text-on-surface">
                  {wishlist.length}
                </p>
                <p className="mt-1.5 font-label-sm text-[7.5px] uppercase tracking-[0.14em] text-on-surface-variant">
                  Saved
                </p>
              </div>
              <div>
                <p className="font-display text-[24px] leading-none text-tertiary">
                  2,840
                </p>
                <p className="mt-1.5 font-label-sm text-[7.5px] uppercase tracking-[0.14em] text-on-surface-variant">
                  Atelier points
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1680px] px-5 py-8 sm:px-8 lg:py-12 xl:px-12">
        <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[270px_minmax(0,1fr)]">
          <aside>
            <div className="flex gap-1.5 overflow-x-auto border-b border-outline-variant/35 pb-3 scrollbar-none lg:sticky lg:top-28 lg:block lg:border-b-0 lg:pb-0">
              <p className="mb-3 hidden font-label-sm text-[8px] uppercase tracking-[0.2em] text-on-surface-variant/55 lg:block">
                Client dossier
              </p>
              {tabs.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setTab(item.key)}
                  aria-current={tab === item.key ? "page" : undefined}
                  className={cn(
                    "flex shrink-0 items-center gap-3 border px-3 py-3 text-left transition-colors lg:mb-1 lg:w-full lg:border-0 lg:border-l-2 lg:px-4",
                    tab === item.key
                      ? "border-tertiary bg-tertiary/8 text-tertiary lg:bg-transparent"
                      : "border-outline-variant/45 text-on-surface-variant hover:border-on-surface-variant hover:text-on-surface lg:border-transparent",
                  )}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {item.icon}
                  </span>
                  <span className="whitespace-nowrap font-label-sm text-[9px] uppercase tracking-[0.12em]">
                    {item.label}
                  </span>
                  {item.key === "wishlist" ? (
                    <span className="ml-auto hidden font-label-sm text-[8px] text-on-surface-variant/60 lg:block">
                      {String(wishlist.length).padStart(2, "0")}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>

            <div className="mt-6 hidden border border-outline-variant/35 bg-surface-container-low p-4 lg:block">
              <p className="font-label-sm text-[7.5px] uppercase tracking-[0.16em] text-tertiary">
                Private client line
              </p>
              <p className="mt-2 font-body-sm text-[11px] leading-relaxed text-on-surface-variant">
                Allocation requests, sizing counsel and aftercare — answered
                personally.
              </p>
              <a
                href={waLink("Hi SOLE STORE, this is Adhil from my client account.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-2 font-label-sm text-[8px] uppercase tracking-[0.12em] text-on-surface hover:text-tertiary"
              >
                <span className="material-symbols-outlined text-[15px] text-tertiary">
                  chat
                </span>
                Message concierge
              </a>
            </div>
          </aside>

          <section className="min-w-0">
            {tab === "orders" ? (
              <div>
                <div className="flex flex-col gap-4 border-b border-outline-variant/35 pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="font-label-sm text-[8px] uppercase tracking-[0.18em] text-tertiary">
                      Live allocation · {activeOrder.id}
                    </p>
                    <h2 className="mt-2 font-headline-lg text-headline-lg-mobile uppercase tracking-[-0.03em] text-on-surface sm:text-headline-lg">
                      In transit.
                    </h2>
                  </div>
                  <p className="font-label-sm text-[9px] uppercase tracking-[0.12em] text-on-surface-variant">
                    {activeOrder.eta}
                  </p>
                </div>

                <div className="mt-7 border border-outline-variant/40 bg-surface-container-low">
                  <div className="flex flex-col gap-5 border-b border-outline-variant/35 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      {activeOrder.items.slice(0, 1).map((item) => {
                        const product = getProduct(item.slug);
                        if (!product) return null;
                        return (
                          <Link
                            key={item.slug}
                            href={`/product/${product.slug}`}
                            className="relative h-[88px] w-[72px] shrink-0 overflow-hidden bg-surface-container-lowest"
                          >
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="72px"
                              className="object-contain p-1.5"
                            />
                          </Link>
                        );
                      })}
                      <div>
                        <p className="font-headline-sm text-[16px] text-on-surface">
                          {getProduct(activeOrder.items[0].slug)?.name}
                        </p>
                        <p className="mt-1.5 font-label-sm text-[8px] uppercase tracking-[0.12em] text-on-surface-variant">
                          UK {activeOrder.items[0].size} ·{" "}
                          {activeOrder.items[0].color} · Qty 1
                        </p>
                        <p className="mt-2 font-label-sm text-[9px] tracking-[0.06em] text-tertiary">
                          {formatINR(activeOrder.total)}
                        </p>
                      </div>
                    </div>
                    <a
                      href={waLink(
                        `Hi SOLE STORE, I'd like an update on order ${activeOrder.id}.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 border border-outline-variant/55 px-4 py-2.5 font-label-sm text-[8px] uppercase tracking-[0.12em] text-on-surface transition-colors hover:border-tertiary hover:text-tertiary"
                    >
                      <span className="material-symbols-outlined text-[15px]">
                        chat
                      </span>
                      Track with concierge
                    </a>
                  </div>

                  <div className="p-5 sm:p-7">
                    <div className="relative">
                      <div className="absolute left-[13px] top-4 h-[calc(100%-2rem)] w-px bg-outline-variant/45 sm:left-0 sm:top-[13px] sm:h-px sm:w-full" />
                      <div
                        className="absolute left-[13px] top-4 h-[calc((100%-2rem)*0.66)] w-px bg-tertiary sm:left-0 sm:top-[13px] sm:h-px sm:w-[66%]"
                        aria-hidden
                      />
                      <ol className="relative grid gap-6 sm:grid-cols-4 sm:gap-2">
                        {trackingSteps.map((step, index) => {
                          const complete = index < 2;
                          const current = index === 2;
                          return (
                            <li
                              key={step.label}
                              className="flex items-start gap-4 sm:block"
                            >
                              <span
                                className={cn(
                                  "relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-surface-container-low",
                                  complete || current
                                    ? "border-tertiary text-tertiary"
                                    : "border-outline-variant/60 text-on-surface-variant/45",
                                )}
                              >
                                <span className="material-symbols-outlined text-[13px]">
                                  {complete ? "check" : current ? "local_shipping" : "circle"}
                                </span>
                                {current ? (
                                  <span className="absolute inset-0 animate-ping rounded-full border border-tertiary/40" />
                                ) : null}
                              </span>
                              <div className="sm:mt-3">
                                <p
                                  className={cn(
                                    "font-label-sm text-[8px] uppercase tracking-[0.12em]",
                                    complete || current
                                      ? "text-on-surface"
                                      : "text-on-surface-variant/55",
                                  )}
                                >
                                  {step.label}
                                </p>
                                <p className="mt-1 font-body-sm text-[10px] text-on-surface-variant/65">
                                  {step.detail}
                                </p>
                              </div>
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <div className="flex items-center justify-between border-b border-outline-variant/35 pb-4">
                    <h3 className="font-headline-sm text-[18px] uppercase tracking-[0.02em] text-on-surface">
                      Order history
                    </h3>
                    <span className="font-label-sm text-[8px] uppercase tracking-[0.14em] text-on-surface-variant">
                      Last 12 months
                    </span>
                  </div>

                  <div className="divide-y divide-outline-variant/30">
                    {orderHistory.map((order) => (
                      <article
                        key={order.id}
                        className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:gap-5"
                      >
                        <div className="flex -space-x-3">
                          {order.items.slice(0, 2).map((item) => {
                            const product = getProduct(item.slug);
                            if (!product) return null;
                            return (
                              <Link
                                key={item.slug}
                                href={`/product/${product.slug}`}
                                className="relative h-16 w-14 shrink-0 overflow-hidden border border-background bg-surface-container-lowest"
                              >
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  sizes="56px"
                                  className="object-contain p-1"
                                />
                              </Link>
                            );
                          })}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-label-md text-[10px] tracking-[0.1em] text-on-surface">
                              {order.id}
                            </p>
                            <span
                              className={cn(
                                "px-2 py-1 font-label-sm text-[7px] uppercase tracking-[0.12em]",
                                order.statusTone === "gold"
                                  ? "bg-tertiary/15 text-tertiary"
                                  : "bg-surface-container-highest text-on-surface-variant",
                              )}
                            >
                              {order.status}
                            </span>
                          </div>
                          <p className="mt-1 font-body-sm text-[11px] text-on-surface-variant">
                            {order.date} · {order.items.length}{" "}
                            {order.items.length === 1 ? "object" : "objects"} ·{" "}
                            {formatINR(order.total)}
                          </p>
                          <p className="mt-0.5 font-label-sm text-[8px] uppercase tracking-[0.1em] text-on-surface-variant/55">
                            {order.eta}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => reorder(order)}
                            className="border border-outline-variant/50 px-3 py-2 font-label-sm text-[8px] uppercase tracking-[0.1em] text-on-surface-variant transition-colors hover:border-on-surface hover:text-on-surface"
                          >
                            Reorder
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              toast(
                                "Order record opened",
                                `${order.id} · ${order.status}`,
                              )
                            }
                            className="border border-outline-variant/50 px-3 py-2 font-label-sm text-[8px] uppercase tracking-[0.1em] text-on-surface transition-colors hover:border-tertiary hover:text-tertiary"
                          >
                            Details
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {tab === "wishlist" ? (
              <div>
                <div className="flex items-end justify-between gap-4 border-b border-outline-variant/35 pb-5">
                  <div>
                    <p className="font-label-sm text-[8px] uppercase tracking-[0.18em] text-tertiary">
                      Saved allocations
                    </p>
                    <h2 className="mt-2 font-headline-lg text-headline-lg-mobile uppercase tracking-[-0.03em] text-on-surface sm:text-headline-lg">
                      The wishlist.
                    </h2>
                  </div>
                  <span className="font-label-sm text-[9px] uppercase tracking-[0.12em] text-on-surface-variant">
                    {String(wishlistProducts.length).padStart(2, "0")} saved
                  </span>
                </div>

                {wishlistProducts.length > 0 ? (
                  <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 xl:grid-cols-3">
                    {wishlistProducts.map((product) => (
                      <ProductCard key={product.slug} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="flex min-h-[360px] flex-col items-center justify-center border-b border-outline-variant/25 text-center">
                    <span className="material-symbols-outlined text-[34px] text-on-surface-variant/60">
                      favorite
                    </span>
                    <p className="mt-4 font-headline-sm text-[18px] text-on-surface">
                      Nothing saved yet
                    </p>
                    <p className="mt-2 max-w-xs font-body-sm text-body-sm text-on-surface-variant">
                      Save pieces from the archive to keep an eye on allocations
                      and restocks.
                    </p>
                    <Link
                      href="/catalog"
                      className="mt-6 bg-tertiary px-5 py-3 font-label-sm text-[9px] uppercase tracking-[0.14em] text-on-tertiary"
                    >
                      Explore the archive
                    </Link>
                  </div>
                )}
              </div>
            ) : null}

            {tab === "profile" ? (
              <div>
                <div className="border-b border-outline-variant/35 pb-5">
                  <p className="font-label-sm text-[8px] uppercase tracking-[0.18em] text-tertiary">
                    Personal record
                  </p>
                  <h2 className="mt-2 font-headline-lg text-headline-lg-mobile uppercase tracking-[-0.03em] text-on-surface sm:text-headline-lg">
                    Client profile.
                  </h2>
                </div>

                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    toast(
                      "Profile updated",
                      "Your client dossier has been saved.",
                    );
                  }}
                  className="mt-7 max-w-2xl"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    {[
                      {
                        id: "first-name",
                        label: "First name",
                        defaultValue: "Adhil",
                        type: "text",
                      },
                      {
                        id: "last-name",
                        label: "Last name",
                        defaultValue: "V. P.",
                        type: "text",
                      },
                      {
                        id: "email",
                        label: "Email address",
                        defaultValue: CONTACT.email,
                        type: "email",
                      },
                      {
                        id: "phone",
                        label: "WhatsApp number",
                        defaultValue: CONTACT.phoneDisplay,
                        type: "tel",
                      },
                      {
                        id: "birthday",
                        label: "Birthday",
                        defaultValue: "1994-06-18",
                        type: "date",
                      },
                      {
                        id: "city",
                        label: "Home city",
                        defaultValue: "Mumbai",
                        type: "text",
                      },
                    ].map((field) => (
                      <div key={field.id}>
                        <label
                          htmlFor={field.id}
                          className="font-label-sm text-[8px] uppercase tracking-[0.16em] text-on-surface-variant"
                        >
                          {field.label}
                        </label>
                        <input
                          id={field.id}
                          type={field.type}
                          defaultValue={field.defaultValue}
                          className="mt-2 w-full border border-outline-variant/45 bg-surface-container-lowest px-3.5 py-3 font-body-sm text-body-sm text-on-surface outline-none transition-colors focus:border-tertiary/60"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 border-t border-outline-variant/35 pt-6">
                    <p className="font-label-md text-[10px] uppercase tracking-[0.16em] text-on-surface">
                      Communication preferences
                    </p>
                    {[
                      {
                        label: "Private drop alerts",
                        description:
                          "First access to numbered editions and restocks.",
                        value: dropAlerts,
                        set: setDropAlerts,
                      },
                      {
                        label: "WhatsApp order updates",
                        description:
                          "Dispatch and delivery notices via concierge.",
                        value: whatsappUpdates,
                        set: setWhatsappUpdates,
                      },
                    ].map((preference) => (
                      <div
                        key={preference.label}
                        className="mt-4 flex items-center justify-between gap-5 border-b border-outline-variant/25 pb-4"
                      >
                        <div>
                          <p className="font-body-sm text-body-sm text-on-surface">
                            {preference.label}
                          </p>
                          <p className="mt-0.5 font-body-sm text-[11px] text-on-surface-variant">
                            {preference.description}
                          </p>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={preference.value}
                          onClick={() => preference.set(!preference.value)}
                          className={cn(
                            "relative h-6 w-11 shrink-0 rounded-full border transition-colors",
                            preference.value
                              ? "border-tertiary bg-tertiary/25"
                              : "border-outline-variant/60 bg-surface-container",
                          )}
                        >
                          <span
                            className={cn(
                              "absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full transition-all",
                              preference.value
                                ? "left-[22px] bg-tertiary"
                                : "left-1 bg-on-surface-variant/60",
                            )}
                          />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="mt-7 bg-on-surface px-6 py-3.5 font-label-md text-[10px] uppercase tracking-[0.15em] text-background transition-colors hover:bg-tertiary hover:text-on-tertiary"
                  >
                    Save client dossier
                  </button>
                </form>
              </div>
            ) : null}

            {tab === "addresses" ? (
              <div>
                <div className="flex flex-col gap-4 border-b border-outline-variant/35 pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="font-label-sm text-[8px] uppercase tracking-[0.18em] text-tertiary">
                      Delivery records
                    </p>
                    <h2 className="mt-2 font-headline-lg text-headline-lg-mobile uppercase tracking-[-0.03em] text-on-surface sm:text-headline-lg">
                      Address vault.
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      toast(
                        "Address request noted",
                        "The concierge will contact you to add a new delivery address.",
                      )
                    }
                    className="flex items-center gap-2 border border-outline-variant/50 px-4 py-2.5 font-label-sm text-[8px] uppercase tracking-[0.12em] text-on-surface transition-colors hover:border-tertiary hover:text-tertiary"
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      add
                    </span>
                    Add address
                  </button>
                </div>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {addresses.map((address) => (
                    <div
                      key={address.label}
                      className="relative border border-outline-variant/40 bg-surface-container-low p-5"
                    >
                      <div className="flex items-start justify-between">
                        <span className="material-symbols-outlined text-[22px] text-tertiary">
                          {address.icon}
                        </span>
                        <span className="border border-outline-variant/45 px-2 py-1 font-label-sm text-[7px] uppercase tracking-[0.15em] text-on-surface-variant">
                          {address.tag}
                        </span>
                      </div>
                      <p className="mt-6 font-label-sm text-[8px] uppercase tracking-[0.16em] text-tertiary">
                        {address.label}
                      </p>
                      <p className="mt-2 font-headline-sm text-[16px] text-on-surface">
                        {address.name}
                      </p>
                      <div className="mt-2 space-y-0.5">
                        {address.lines.map((line) => (
                          <p
                            key={line}
                            className="font-body-sm text-body-sm text-on-surface-variant"
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                      <p className="mt-3 font-body-sm text-[11px] text-on-surface-variant/65">
                        {address.phone}
                      </p>
                      <div className="mt-5 flex gap-4 border-t border-outline-variant/30 pt-4">
                        <button
                          type="button"
                          onClick={() =>
                            toast("Address selected", address.label)
                          }
                          className="font-label-sm text-[8px] uppercase tracking-[0.12em] text-on-surface hover:text-tertiary"
                        >
                          Use address
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            toast("Edit request sent", address.label)
                          }
                          className="font-label-sm text-[8px] uppercase tracking-[0.12em] text-on-surface-variant hover:text-on-surface"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-5 font-label-sm text-[8px] uppercase leading-relaxed tracking-[0.12em] text-on-surface-variant/55">
                  For security, address amendments are confirmed by the
                  concierge before dispatch.
                </p>
              </div>
            ) : null}

            {tab === "concierge" ? (
              <div>
                <div className="border-b border-outline-variant/35 pb-5">
                  <p className="font-label-sm text-[8px] uppercase tracking-[0.18em] text-tertiary">
                    Private client line
                  </p>
                  <h2 className="mt-2 font-headline-lg text-headline-lg-mobile uppercase tracking-[-0.03em] text-on-surface sm:text-headline-lg">
                    The concierge.
                  </h2>
                </div>

                <div className="mt-7 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="border border-outline-variant/40 bg-surface-container-low p-6 sm:p-8">
                    <span className="material-symbols-outlined text-[30px] text-tertiary">
                      concierge
                    </span>
                    <h3 className="mt-5 font-headline-sm text-headline-sm uppercase tracking-[0.02em] text-on-surface">
                      A direct line to the atelier.
                    </h3>
                    <p className="mt-3 font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
                      Sizing counsel, allocation requests, gifting and aftercare
                      — our private client team answers personally, seven days
                      a week.
                    </p>
                    <div className="mt-6 space-y-3">
                      <a
                        href={waLink(
                          "Hi SOLE STORE, this is Adhil. I'd like concierge assistance.",
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-4 border-b border-outline-variant/35 pb-3 transition-colors hover:text-tertiary"
                      >
                        <span className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-[18px] text-tertiary">
                            chat
                          </span>
                          <span>
                            <span className="block font-label-sm text-[8px] uppercase tracking-[0.14em] text-on-surface-variant">
                              WhatsApp
                            </span>
                            <span className="mt-1 block font-body-sm text-body-sm text-on-surface">
                              {CONTACT.phoneDisplay}
                            </span>
                          </span>
                        </span>
                        <span className="material-symbols-outlined text-[16px]">
                          arrow_outward
                        </span>
                      </a>
                      <a
                        href={`mailto:${CONTACT.email}`}
                        className="flex items-center justify-between gap-4 border-b border-outline-variant/35 pb-3 transition-colors hover:text-tertiary"
                      >
                        <span className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-[18px] text-tertiary">
                            mail
                          </span>
                          <span>
                            <span className="block font-label-sm text-[8px] uppercase tracking-[0.14em] text-on-surface-variant">
                              Email
                            </span>
                            <span className="mt-1 block break-all font-body-sm text-body-sm text-on-surface">
                              {CONTACT.email}
                            </span>
                          </span>
                        </span>
                        <span className="material-symbols-outlined text-[16px]">
                          arrow_outward
                        </span>
                      </a>
                      <a
                        href={CONTACT.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-4 transition-colors hover:text-tertiary"
                      >
                        <span className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-[18px] text-tertiary">
                            photo_camera
                          </span>
                          <span>
                            <span className="block font-label-sm text-[8px] uppercase tracking-[0.14em] text-on-surface-variant">
                              Instagram
                            </span>
                            <span className="mt-1 block font-body-sm text-body-sm text-on-surface">
                              @{CONTACT.instagram}
                            </span>
                          </span>
                        </span>
                        <span className="material-symbols-outlined text-[16px]">
                          arrow_outward
                        </span>
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between border border-outline-variant/40 bg-surface-container-lowest p-6">
                    <div>
                      <p className="font-label-sm text-[8px] uppercase tracking-[0.18em] text-tertiary">
                        Hours
                      </p>
                      <p className="mt-3 font-headline-sm text-[17px] text-on-surface">
                        Mon–Sun
                        <br />
                        09:00–21:00 IST
                      </p>
                      <p className="mt-4 font-body-sm text-body-sm text-on-surface-variant">
                        Replies typically within 20 minutes during atelier
                        hours.
                      </p>
                    </div>
                    <div className="mt-8 border-t border-outline-variant/35 pt-5">
                      <p className="font-label-sm text-[8px] uppercase tracking-[0.14em] text-on-surface-variant">
                        Client tier
                      </p>
                      <p className="mt-2 font-display text-[22px] text-tertiary">
                        SOLEVIP II
                      </p>
                      <p className="mt-1 font-body-sm text-[11px] text-on-surface-variant">
                        2,840 / 4,000 points to tier III
                      </p>
                      <div className="mt-3 h-px bg-outline-variant/40">
                        <div className="h-px w-[71%] bg-tertiary" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </>
  );
}
