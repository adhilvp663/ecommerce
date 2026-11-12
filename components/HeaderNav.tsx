"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/format";

function isLinkActive(
  href: string,
  pathname: string,
  searchParams: URLSearchParams,
) {
  const target = new URL(href, "https://solestore.local");
  if (target.pathname !== pathname) return false;
  if (target.hash) return false;

  if (target.pathname === "/catalog") {
    const category = target.searchParams.get("category");
    if (category) return searchParams.get("category") === category;
    if (target.searchParams.get("sort") === "newest") {
      return searchParams.get("sort") === "newest";
    }
    if (target.searchParams.get("sale") === "true") {
      return searchParams.get("sale") === "true";
    }
    return false;
  }

  return true;
}

function navClass(active: boolean, index: number) {
  return cn(
    "relative whitespace-nowrap py-2 font-label-sm text-[9.5px] uppercase tracking-[0.18em] transition-colors",
    index === 5 && "hidden 2xl:block",
    active
      ? "text-tertiary"
      : "text-on-surface-variant hover:text-on-surface",
  );
}

export function HeaderNavLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <nav
      aria-label="Primary"
      className="hidden min-w-0 items-center gap-[clamp(0.85rem,1.55vw,1.8rem)] lg:flex"
    >
      {NAV_LINKS.map((link, index) => {
        const active = isLinkActive(link.href, pathname, searchParams);
        return (
          <Link
            key={link.key}
            href={link.href}
            className={navClass(active, index)}
            aria-current={active ? "page" : undefined}
          >
            {link.label}
            {active ? (
              <span className="absolute inset-x-0 -bottom-0.5 h-px bg-tertiary" />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

export function HeaderNavFallback() {
  return (
    <nav
      aria-label="Primary"
      className="hidden min-w-0 items-center gap-[clamp(0.85rem,1.55vw,1.8rem)] lg:flex"
    >
      {NAV_LINKS.map((link, index) => (
        <Link
          key={link.key}
          href={link.href}
          className={navClass(false, index)}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
