"use client";

import Link from "next/link";
import { useState } from "react";
import { CONTACT, NAV_LINKS, waLink } from "@/lib/constants";
import { useStore } from "@/lib/store";

const columns = [
  {
    title: "THE ARCHIVE",
    links: [
      { label: "All Footwear", href: "/catalog" },
      { label: "New Releases", href: "/catalog?sort=newest" },
      { label: "Sneakers", href: "/catalog?category=sneakers" },
      { label: "Formal Atelier", href: "/catalog?category=formal" },
      { label: "Sale Archive", href: "/catalog?sale=true" },
    ],
  },
  {
    title: "CLIENT CARE",
    links: [
      { label: "Order Tracking", href: "/account" },
      { label: "Shipping & Delivery", href: "/account?tab=orders" },
      { label: "Returns & Exchanges", href: "/account?tab=profile" },
      { label: "Size Guide", href: "/catalog" },
      { label: "Contact Concierge", href: waLink("Hi SOLE STORE, I need assistance.") },
    ],
  },
];

export function Footer() {
  const { toast } = useStore();
  const [email, setEmail] = useState("");

  function subscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast("Enter a valid email", "The archive list requires an email address.");
      return;
    }
    toast("You're on the list", "Private drops and atelier notes will arrive first.");
    setEmail("");
  }

  return (
    <footer className="border-t border-outline-variant/35 bg-surface-container-lowest">
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 xl:px-12">
        <div className="grid gap-12 border-b border-outline-variant/30 py-14 lg:grid-cols-[1.2fr_0.45fr_0.7fr_1fr] lg:gap-8 lg:py-20">
          <div className="max-w-xs">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center border border-tertiary/45 bg-tertiary/5">
                <span className="material-symbols-outlined text-[21px] text-tertiary">
                  footprint
                </span>
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-[21px] font-semibold tracking-[0.2em] text-on-surface">
                  SOLE STORE
                </span>
                <span className="mt-1.5 font-label-sm text-[8px] uppercase tracking-[0.3em] text-on-surface-variant">
                  Archive &amp; Atelier
                </span>
              </span>
            </Link>
            <p className="mt-6 font-body-md text-body-md text-on-surface-variant">
              Architectural footwear, released in limited allocations.
              Hand-finished in Italy and dispatched worldwide from our Mumbai
              atelier.
            </p>
            <div className="mt-7 flex gap-2">
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center border border-outline-variant/50 text-on-surface-variant transition-colors hover:border-tertiary hover:text-tertiary"
              >
                <span className="material-symbols-outlined text-[18px]">
                  photo_camera
                </span>
              </a>
              <a
                href={waLink("Hi SOLE STORE, I'd like to enquire.")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center border border-outline-variant/50 text-on-surface-variant transition-colors hover:border-tertiary hover:text-tertiary"
              >
                <span className="material-symbols-outlined text-[18px]">
                  chat
                </span>
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center border border-outline-variant/50 text-on-surface-variant transition-colors hover:border-tertiary hover:text-tertiary"
              >
                <span className="material-symbols-outlined text-[18px]">
                  mail
                </span>
              </a>
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="font-label-md text-label-md uppercase tracking-[0.18em] text-tertiary">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => {
                  const external = link.href.startsWith("http");
                  return (
                    <li key={link.label}>
                      {external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body-sm text-body-sm text-on-surface-variant transition-colors hover:text-on-surface"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="font-body-sm text-body-sm text-on-surface-variant transition-colors hover:text-on-surface"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-label-md text-label-md uppercase tracking-[0.18em] text-tertiary">
              THE PRIVATE LIST
            </h3>
            <p className="mt-5 font-body-sm text-body-sm text-on-surface-variant">
              First access to archival editions, restocks and atelier notes. No
              noise.
            </p>
            <form onSubmit={subscribe} className="mt-5">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <div className="flex border-b border-outline-variant focus-within:border-tertiary">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="EMAIL ADDRESS"
                  className="min-w-0 flex-1 bg-transparent py-3 font-label-sm text-[10px] uppercase tracking-[0.16em] text-on-surface outline-none placeholder:text-on-surface-variant/55"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="px-3 text-on-surface-variant transition-colors hover:text-tertiary"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </form>
            <div className="mt-7 space-y-2">
              <a
                href={`tel:+${CONTACT.whatsapp}`}
                className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant transition-colors hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[16px] text-tertiary">
                  call
                </span>
                {CONTACT.phoneDisplay}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2 break-all font-body-sm text-body-sm text-on-surface-variant transition-colors hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[16px] text-tertiary">
                  alternate_email
                </span>
                {CONTACT.email}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-label-sm text-[9px] uppercase tracking-[0.18em] text-on-surface-variant/70">
            © {new Date().getFullYear()} SOLE STORE. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href="/account"
              className="font-label-sm text-[9px] uppercase tracking-[0.18em] text-on-surface-variant/70 transition-colors hover:text-on-surface"
            >
              Privacy
            </Link>
            <Link
              href="/account"
              className="font-label-sm text-[9px] uppercase tracking-[0.18em] text-on-surface-variant/70 transition-colors hover:text-on-surface"
            >
              Terms
            </Link>
            <span className="font-label-sm text-[9px] uppercase tracking-[0.18em] text-on-surface-variant/70">
              Secure payments · India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
