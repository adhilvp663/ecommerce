export const CONTACT = {
  whatsapp: "919072366663",
  phoneDisplay: "+91 9072366663",
  phoneRaw: "9072366663",
  email: "adilvp64@gmail.com",
  instagram: "solest0re_",
  instagramUrl: "https://instagram.com/solest0re_",
} as const;

export function waLink(message?: string) {
  const base = `https://wa.me/${CONTACT.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const NAV_LINKS = [
  { label: "NEW RELEASES", href: "/catalog?sort=newest", key: "new-releases" },
  { label: "SNEAKERS", href: "/catalog?category=sneakers", key: "sneakers" },
  { label: "CASUAL", href: "/catalog?category=casual", key: "casual" },
  { label: "SPORTS", href: "/catalog?category=sports", key: "sports" },
  { label: "FORMAL", href: "/catalog?category=formal", key: "formal" },
  { label: "EDITORIAL ARCHIVE", href: "/#editorial", key: "editorial-archive" },
  { label: "SALE", href: "/catalog?sale=true", key: "sale" },
] as const;

export const CATEGORY_META = {
  sneakers: {
    label: "Sneakers & Grails",
    nav: "SNEAKERS",
    blurb: "Deconstructed silhouettes & scarce deadstock allocations.",
  },
  casual: {
    label: "Casual Loafers & Mules",
    nav: "CASUAL",
    blurb: "Minimalist leather craftsmanship & everyday architectural icons.",
  },
  sports: {
    label: "Sports Performance",
    nav: "SPORTS",
    blurb: "Carbon-fiber propulsion & responsive nitrogen-infused cushioning.",
  },
  formal: {
    label: "Formal Derby & Boots",
    nav: "FORMAL",
    blurb: "Hand-burnished Derbies, Oxfords, and chiselled penny loafers.",
  },
} as const;

export type CatalogCategory = keyof typeof CATEGORY_META;
