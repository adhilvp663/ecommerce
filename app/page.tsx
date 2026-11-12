import Image from "next/image";
import Link from "next/link";
import { CopyCode } from "@/components/home/CopyCode";
import { FeaturedDrops } from "@/components/home/FeaturedDrops";
import { CATEGORY_META, CONTACT, waLink } from "@/lib/constants";
import { formatINR } from "@/lib/format";
import { CATEGORY_COUNTS, IMAGES, getProduct } from "@/lib/products";

const categoryImages = {
  sneakers: IMAGES.catSneakers,
  casual: IMAGES.catCasual,
  sports: IMAGES.catSports,
  formal: IMAGES.catFormal,
} as const;

const categories = (
  Object.keys(CATEGORY_META) as Array<keyof typeof CATEGORY_META>
).map((key) => ({
  key,
  ...CATEGORY_META[key],
  count: CATEGORY_COUNTS[key],
  image: categoryImages[key],
}));

const metrics = [
  { value: "128", label: "Models archived" },
  { value: "34", label: "Atelier partners" },
  { value: "4.9", label: "Client rating" },
  { value: "72H", label: "Worldwide dispatch" },
];

const pillars = [
  {
    icon: "handyman",
    number: "01",
    title: "Hand-finished",
    copy: "Every pair is burnished, edged and inspected by hand in our partner ateliers across Italy and India.",
  },
  {
    icon: "confirmation_number",
    number: "02",
    title: "Numbered editions",
    copy: "Allocations are finite and individually numbered. When an edition closes, it enters the archive permanently.",
  },
  {
    icon: "layers",
    number: "03",
    title: "Archival materials",
    copy: "Tuscan calfskin, Japanese nappa, Margom soles and carbon weave — sourced for how they age, not just how they look.",
  },
  {
    icon: "concierge",
    number: "04",
    title: "Private concierge",
    copy: "A direct line to the atelier for sizing, sourcing and allocation requests, seven days a week.",
  },
];

const instagramImages = [IMAGES.ig1, IMAGES.ig2, IMAGES.ig3, IMAGES.ig4];

export default function HomePage() {
  const heroProduct = getProduct("spectre-runner-01");

  return (
    <>
      <section className="relative overflow-hidden border-b border-outline-variant/35 bg-surface-container-lowest">
        <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-[1680px] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="order-2 flex flex-col justify-center px-5 py-14 sm:px-8 lg:order-1 lg:py-24 lg:pl-12 lg:pr-16 xl:pl-16">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-tertiary/65" />
              <p className="font-label-sm text-[9px] uppercase tracking-[0.28em] text-tertiary">
                SS26 / Archive 018
              </p>
            </div>

            <h1 className="mt-7 font-display text-[clamp(3.4rem,7.2vw,7.4rem)] font-semibold uppercase leading-[0.86] tracking-[-0.055em] text-on-surface">
              Footwear
              <br />
              for the
              <br />
              <span className="text-tertiary">few.</span>
            </h1>

            <p className="mt-7 max-w-md font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
              Architectural silhouettes, hand-finished in limited allocations.
              Engineered for presence. Reserved for the collectors who move
              first.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/catalog"
                className="group flex items-center gap-4 bg-on-surface px-6 py-4 font-label-md text-label-md uppercase tracking-[0.16em] text-background transition-colors hover:bg-tertiary hover:text-on-tertiary"
              >
                Explore the archive
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="/catalog?sort=newest"
                className="flex items-center gap-3 border border-outline-variant/60 px-6 py-4 font-label-md text-label-md uppercase tracking-[0.16em] text-on-surface transition-colors hover:border-on-surface hover:bg-surface-container"
              >
                New releases
                <span className="material-symbols-outlined text-[17px]">
                  north_east
                </span>
              </Link>
            </div>

            <div className="mt-12 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5 border-t border-outline-variant/35 pt-7 sm:grid-cols-4 lg:mt-16">
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="font-display text-[24px] font-medium leading-none tracking-[-0.02em] text-on-surface">
                    {metric.value}
                  </p>
                  <p className="mt-2 font-label-sm text-[8px] uppercase leading-[1.5] tracking-[0.16em] text-on-surface-variant">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative order-1 min-h-[52vh] overflow-hidden border-b border-outline-variant/35 lg:order-2 lg:min-h-full lg:border-b-0 lg:border-l">
            <Image
              src={IMAGES.hero}
              alt="SOLE STORE architectural footwear editorial"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/20 lg:bg-gradient-to-r lg:from-background/55 lg:via-transparent lg:to-background/15" />
            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 sm:p-8">
              <span className="border border-on-surface/20 bg-background/35 px-3 py-2 font-label-sm text-[8px] uppercase tracking-[0.2em] text-on-surface backdrop-blur-md">
                Hand-finished in Italy
              </span>
              <span className="hidden font-label-sm text-[8px] uppercase tracking-[0.24em] text-on-surface/75 sm:block">
                Edition 018 / 2026
              </span>
            </div>

            <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8">
              <Link
                href={`/product/${heroProduct?.slug ?? "spectre-runner-01"}`}
                className="group flex items-end justify-between gap-6 border border-on-surface/15 bg-background/55 p-4 backdrop-blur-xl transition-colors hover:border-tertiary/50 sm:p-5"
              >
                <div className="min-w-0">
                  <p className="font-label-sm text-[8px] uppercase tracking-[0.22em] text-tertiary">
                    Featured allocation
                  </p>
                  <p className="mt-2 truncate font-headline-sm text-headline-sm text-on-surface">
                    Spectre Runner 01
                  </p>
                  <p className="mt-1 font-label-sm text-[9px] uppercase tracking-[0.16em] text-on-surface-variant">
                    Triple Obsidian · {formatINR(heroProduct?.price ?? 16990)}
                  </p>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-on-surface/25 text-on-surface transition-colors group-hover:border-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary">
                  <span className="material-symbols-outlined text-[20px]">
                    arrow_outward
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Atelier figures" className="border-b border-outline-variant/35 bg-background">
        <div className="mx-auto grid max-w-[1680px] grid-cols-2 divide-x divide-outline-variant/30 px-0 sm:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="px-5 py-6 sm:px-8 sm:py-7">
              <p className="font-display text-[20px] font-medium leading-none tracking-[-0.02em] text-tertiary">
                {metric.value}
              </p>
              <p className="mt-2 font-label-sm text-[8px] uppercase tracking-[0.18em] text-on-surface-variant">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="collections" className="border-b border-outline-variant/35">
        <div className="mx-auto max-w-[1680px] px-5 py-16 sm:px-8 lg:py-24 xl:px-12">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-label-md text-label-md uppercase tracking-[0.2em] text-tertiary">
                Shop by silhouette
              </p>
              <h2 className="mt-3 font-headline-lg text-headline-lg-mobile uppercase tracking-[-0.035em] text-on-surface sm:text-headline-lg">
                Four disciplines.
                <br className="hidden sm:block" /> One standard.
              </h2>
            </div>
            <p className="max-w-sm font-body-sm text-body-sm text-on-surface-variant">
              From deconstructed runners to hand-welted derbies, every
              silhouette is held to the same archival criteria.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
            {categories.map((category, index) => (
              <Link
                key={category.key}
                href={`/catalog?category=${category.key}`}
                className="group relative aspect-[4/5] overflow-hidden bg-surface-container-lowest"
              >
                <Image
                  src={category.image}
                  alt={category.label}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover opacity-80 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] group-hover:opacity-100"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                <span className="absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-5">
                  <span className="font-label-sm text-[8px] uppercase tracking-[0.2em] text-on-surface/65">
                    0{index + 1}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center border border-on-surface/25 bg-background/20 text-on-surface opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                    <span className="material-symbols-outlined text-[17px]">
                      arrow_outward
                    </span>
                  </span>
                </span>
                <span className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <span className="block font-label-sm text-[8px] uppercase tracking-[0.2em] text-tertiary">
                    {category.count} models
                  </span>
                  <span className="mt-2 block font-headline-sm text-[17px] uppercase leading-tight tracking-[-0.01em] text-on-surface sm:text-headline-sm">
                    {category.nav}
                  </span>
                  <span className="mt-1.5 hidden font-body-sm text-body-sm text-on-surface-variant sm:block">
                    {category.blurb}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-outline-variant/35 bg-surface-container-lowest">
        <div className="mx-auto max-w-[1680px] px-5 py-16 sm:px-8 lg:py-24 xl:px-12">
          <FeaturedDrops />
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-outline-variant/35 bg-tertiary">
        <div className="absolute -right-24 -top-28 font-display text-[290px] font-bold leading-none tracking-[-0.08em] text-on-tertiary/[0.055] sm:text-[420px]">
          15
        </div>
        <div className="relative mx-auto grid max-w-[1680px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:py-20 xl:px-12">
          <div>
            <p className="font-label-md text-label-md uppercase tracking-[0.22em] text-on-tertiary/65">
              Invitation only
            </p>
            <h2 className="mt-4 max-w-3xl font-headline-lg text-headline-lg-mobile uppercase leading-[0.92] tracking-[-0.045em] text-on-tertiary sm:text-[clamp(2.7rem,5vw,5.5rem)]">
              Your first pair,
              <br />
              <span className="text-on-tertiary/55">with our compliments.</span>
            </h2>
            <p className="mt-5 max-w-md font-body-md text-body-md text-on-tertiary/70">
              Use the private client code below for 15% off your first order.
              Valid on full-price archive pieces. One use per client.
            </p>
          </div>
          <div className="lg:pb-2">
            <CopyCode code="SOLEVIP" />
            <p className="mt-3 text-right font-label-sm text-[8px] uppercase tracking-[0.18em] text-on-tertiary/55">
              Applied at bag · Excludes collaborations
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-outline-variant/35">
        <div className="mx-auto max-w-[1680px] px-5 py-16 sm:px-8 lg:py-24 xl:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="font-label-md text-label-md uppercase tracking-[0.2em] text-tertiary">
                The atelier standard
              </p>
              <h2 className="mt-3 font-headline-lg text-headline-lg-mobile uppercase tracking-[-0.035em] text-on-surface sm:text-headline-lg">
                Made slowly.
                <br />
                <span className="text-on-surface-variant">Worn forever.</span>
              </h2>
              <p className="mt-6 max-w-sm font-body-md text-body-md text-on-surface-variant">
                We do not chase seasons. Each silhouette is developed over
                months, produced in a single allocation, then retired into the
                archive.
              </p>
              <Link
                href="/catalog?sale=true"
                className="group mt-8 inline-flex items-center gap-3 border-b border-on-surface/40 pb-2 font-label-sm text-[9px] uppercase tracking-[0.18em] text-on-surface transition-colors hover:border-tertiary hover:text-tertiary"
              >
                Enter the sale archive
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </Link>
            </div>

            <div className="grid gap-px overflow-hidden border border-outline-variant/35 bg-outline-variant/30 sm:grid-cols-2">
              {pillars.map((pillar) => (
                <div
                  key={pillar.number}
                  className="group bg-background p-6 transition-colors hover:bg-surface-container-low sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="material-symbols-outlined text-[26px] font-light text-tertiary">
                      {pillar.icon}
                    </span>
                    <span className="font-label-sm text-[8px] tracking-[0.18em] text-on-surface-variant/50">
                      / {pillar.number}
                    </span>
                  </div>
                  <h3 className="mt-8 font-headline-sm text-[18px] uppercase tracking-[0.02em] text-on-surface">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 font-body-sm text-body-sm text-on-surface-variant">
                    {pillar.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="editorial" className="border-b border-outline-variant/35 bg-surface-container-lowest">
        <div className="mx-auto max-w-[1680px] px-5 py-16 sm:px-8 lg:py-24 xl:px-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-label-md text-label-md uppercase tracking-[0.2em] text-tertiary">
                From the atelier
              </p>
              <h2 className="mt-3 font-headline-lg text-headline-lg-mobile uppercase tracking-[-0.035em] text-on-surface sm:text-headline-lg">
                Worn in the wild
              </h2>
            </div>
            <a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 font-label-sm text-[9px] uppercase tracking-[0.18em] text-on-surface-variant transition-colors hover:text-tertiary"
            >
              <span className="material-symbols-outlined text-[17px]">
                photo_camera
              </span>
              @{CONTACT.instagram}
              <span className="material-symbols-outlined text-[15px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                north_east
              </span>
            </a>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
            {instagramImages.map((image, index) => (
              <a
                key={image}
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden bg-surface-container"
                aria-label={`SOLE STORE on Instagram, image ${index + 1}`}
              >
                <Image
                  src={image}
                  alt="SOLE STORE editorial"
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-background/45 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex h-11 w-11 items-center justify-center border border-on-surface/40 text-on-surface">
                    <span className="material-symbols-outlined text-[19px]">
                      photo_camera
                    </span>
                  </span>
                </span>
                <span className="absolute bottom-3 left-3 font-label-sm text-[8px] uppercase tracking-[0.18em] text-on-surface/75">
                  Archive / 0{index + 1}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-outline-variant/35">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(224,194,152,0.09),transparent_58%)]" />
        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-28">
          <span className="material-symbols-outlined text-[30px] font-light text-tertiary">
            concierge
          </span>
          <p className="mt-5 font-label-md text-label-md uppercase tracking-[0.24em] text-tertiary">
            Private client concierge
          </p>
          <h2 className="mt-5 font-headline-lg text-headline-lg-mobile uppercase leading-[0.94] tracking-[-0.04em] text-on-surface sm:text-[clamp(2.6rem,5vw,4.8rem)]">
            A direct line
            <br />
            <span className="text-on-surface-variant">to the atelier.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg font-body-md text-body-md text-on-surface-variant">
            Sizing counsel, allocation requests, gifting or aftercare — our
            concierge answers personally, seven days a week.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={waLink(
                "Hi SOLE STORE, I'd like to speak with the private client concierge.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-3 bg-tertiary px-6 py-4 font-label-md text-label-md uppercase tracking-[0.16em] text-on-tertiary transition-colors hover:bg-tertiary/90 sm:w-auto"
            >
              <span className="material-symbols-outlined text-[19px]">
                chat
              </span>
              WhatsApp concierge
            </a>
            <a
              href={`tel:+${CONTACT.whatsapp}`}
              className="flex w-full items-center justify-center gap-3 border border-outline-variant/60 px-6 py-4 font-label-md text-label-md uppercase tracking-[0.16em] text-on-surface transition-colors hover:border-on-surface sm:w-auto"
            >
              <span className="material-symbols-outlined text-[19px]">
                call
              </span>
              {CONTACT.phoneDisplay}
            </a>
          </div>
          <p className="mt-6 font-label-sm text-[8px] uppercase tracking-[0.2em] text-on-surface-variant/60">
            Mon–Sun · 09:00–21:00 IST · {CONTACT.email}
          </p>
        </div>
      </section>

      <div className="overflow-hidden border-b border-outline-variant/35 bg-surface-container-lowest py-4">
        <div className="flex w-max animate-[marquee_38s_linear_infinite] items-center gap-10 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, group) => (
            <div key={group} className="flex items-center gap-10">
              {[
                "HAND-FINISHED IN ITALY",
                "NUMBERED ALLOCATIONS",
                "COMPLIMENTARY WORLDWIDE SHIPPING",
                "NFC AUTHENTICATED",
                "PRIVATE CLIENT CONCIERGE",
                "ARCHIVE & ATELIER",
              ].map((text) => (
                <span
                  key={`${group}-${text}`}
                  className="flex items-center gap-10 font-label-sm text-[9px] uppercase tracking-[0.24em] text-on-surface-variant/65"
                >
                  {text}
                  <span className="text-tertiary/55">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
