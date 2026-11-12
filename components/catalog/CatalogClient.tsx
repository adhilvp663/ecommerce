"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORY_META, type CatalogCategory } from "@/lib/constants";
import { cn, formatINR } from "@/lib/format";
import {
  CATALOG_PRODUCTS,
  CATALOG_SIZES,
  CATEGORY_COUNTS,
  COLOR_SWATCHES,
  COLORS,
} from "@/lib/products";
import { SIZE_UNITS, convertSize, type SizeUnit } from "@/lib/sizes";

type SortKey = "featured" | "newest" | "price-asc" | "price-desc" | "rating";
type Allocation = "ready" | "archival";

const SORT_OPTIONS: Array<{ value: SortKey; label: string }> = [
  { value: "featured", label: "Curated selection" },
  { value: "newest", label: "Newest arrivals" },
  { value: "price-asc", label: "Price · low to high" },
  { value: "price-desc", label: "Price · high to low" },
  { value: "rating", label: "Client rating" },
];

const categoryKeys = Object.keys(CATEGORY_META) as CatalogCategory[];
const MAX_PRICE = 39990;
const INITIAL_MAX_PRICE = 28000;
const PAGE_SIZE = 8;

function isCategory(value: string | null): value is CatalogCategory {
  return Boolean(value && categoryKeys.includes(value as CatalogCategory));
}

function isSort(value: string | null): value is SortKey {
  return Boolean(value && SORT_OPTIONS.some((option) => option.value === value));
}

type FilterControlsProps = {
  categories: Set<CatalogCategory>;
  sizes: Set<string>;
  colors: Set<string>;
  allocation: Set<Allocation>;
  maxPrice: number;
  unit: SizeUnit;
  search: string;
  resultCount: number;
  onCategory: (category: CatalogCategory) => void;
  onSize: (size: string) => void;
  onColor: (color: string) => void;
  onAllocation: (allocation: Allocation) => void;
  onMaxPrice: (price: number) => void;
  onUnit: (unit: SizeUnit) => void;
  onSearch: (value: string) => void;
  onClear: () => void;
};

function FilterControls({
  categories,
  sizes,
  colors,
  allocation,
  maxPrice,
  unit,
  search,
  resultCount,
  onCategory,
  onSize,
  onColor,
  onAllocation,
  onMaxPrice,
  onUnit,
  onSearch,
  onClear,
}: FilterControlsProps) {
  const filtersActive =
    categories.size > 0 ||
    sizes.size > 0 ||
    colors.size > 0 ||
    maxPrice < MAX_PRICE ||
    allocation.size !== 2 ||
    search.trim().length > 0;

  return (
    <div>
      <div className="flex items-center justify-between border-b border-outline-variant/35 pb-4">
        <p className="font-label-md text-label-md uppercase tracking-[0.18em] text-on-surface">
          Refine
        </p>
        <div className="flex items-center gap-3">
          <span className="font-label-sm text-[9px] uppercase tracking-[0.12em] text-on-surface-variant">
            {resultCount} models
          </span>
          {filtersActive ? (
            <button
              type="button"
              onClick={onClear}
              className="font-label-sm text-[9px] uppercase tracking-[0.12em] text-tertiary underline decoration-tertiary/35 underline-offset-4 hover:text-on-surface"
            >
              Clear
            </button>
          ) : null}
        </div>
      </div>

      <div className="border-b border-outline-variant/35 py-5">
        <label
          htmlFor="catalog-search"
          className="mb-3 block font-label-sm text-[8.5px] uppercase tracking-[0.2em] text-on-surface-variant"
        >
          Search
        </label>
        <div className="flex items-center gap-2 border border-outline-variant/45 bg-surface-container-lowest px-3 focus-within:border-tertiary/60">
          <span className="material-symbols-outlined text-[17px] text-on-surface-variant">
            search
          </span>
          <input
            id="catalog-search"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Silhouette, line, colour…"
            className="min-w-0 flex-1 bg-transparent py-3 font-body-sm text-body-sm text-on-surface outline-none placeholder:text-on-surface-variant/45"
          />
          {search ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => onSearch("")}
              className="text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[16px]">
                close
              </span>
            </button>
          ) : null}
        </div>
      </div>

      <div className="border-b border-outline-variant/35 py-5">
        <p className="mb-1 font-label-sm text-[8.5px] uppercase tracking-[0.2em] text-on-surface-variant">
          Category
        </p>
        {categoryKeys.map((key) => {
          const selected = categories.has(key);
          return (
            <button
              key={key}
              type="button"
              aria-pressed={selected}
              onClick={() => onCategory(key)}
              className="group flex w-full items-center justify-between py-2.5 text-left"
            >
              <span className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-4 w-4 items-center justify-center border transition-colors",
                    selected
                      ? "border-tertiary bg-tertiary text-on-tertiary"
                      : "border-outline-variant/70 text-transparent group-hover:border-on-surface-variant",
                  )}
                >
                  <span className="material-symbols-outlined text-[12px]">
                    check
                  </span>
                </span>
                <span
                  className={cn(
                    "font-body-sm text-body-sm transition-colors",
                    selected
                      ? "text-on-surface"
                      : "text-on-surface-variant group-hover:text-on-surface",
                  )}
                >
                  {CATEGORY_META[key].label}
                </span>
              </span>
              <span className="font-label-sm text-[9px] tracking-[0.08em] text-on-surface-variant/55">
                {String(CATEGORY_COUNTS[key]).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      <div className="border-b border-outline-variant/35 py-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-label-sm text-[8.5px] uppercase tracking-[0.2em] text-on-surface-variant">
            Size
          </p>
          <div className="flex border border-outline-variant/45">
            {SIZE_UNITS.map((sizeUnit) => (
              <button
                key={sizeUnit}
                type="button"
                onClick={() => onUnit(sizeUnit)}
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
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {CATALOG_SIZES.map((size) => {
            const selected = sizes.has(size);
            return (
              <button
                key={size}
                type="button"
                aria-pressed={selected}
                onClick={() => onSize(size)}
                className={cn(
                  "flex h-8 items-center justify-center border font-label-sm text-[9px] tracking-[0.05em] transition-colors",
                  selected
                    ? "border-tertiary bg-tertiary text-on-tertiary"
                    : "border-outline-variant/45 text-on-surface-variant hover:border-on-surface-variant hover:text-on-surface",
                )}
              >
                {convertSize(size, unit)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-b border-outline-variant/35 py-5">
        <p className="mb-4 font-label-sm text-[8.5px] uppercase tracking-[0.2em] text-on-surface-variant">
          Colour
        </p>
        <div className="flex flex-wrap gap-2.5">
          {COLOR_SWATCHES.map((color) => {
            const selected = colors.has(color.id);
            return (
              <button
                key={color.id}
                type="button"
                title={color.name}
                aria-label={color.name}
                aria-pressed={selected}
                onClick={() => onColor(color.id)}
                className={cn(
                  "relative flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all",
                  selected
                    ? "border-tertiary"
                    : "border-transparent hover:border-outline-variant",
                )}
              >
                <span
                  className="h-5 w-5 rounded-full border border-white/10"
                  style={{ backgroundColor: color.hex }}
                />
                {selected ? (
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-tertiary text-on-tertiary">
                    <span className="material-symbols-outlined text-[9px]">
                      check
                    </span>
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
        {colors.size > 0 ? (
          <p className="mt-3 font-label-sm text-[8px] uppercase leading-relaxed tracking-[0.12em] text-on-surface-variant">
            {Array.from(colors)
              .map((id) => COLORS[id]?.name)
              .filter(Boolean)
              .join(" · ")}
          </p>
        ) : null}
      </div>

      <div className="border-b border-outline-variant/35 py-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-label-sm text-[8.5px] uppercase tracking-[0.2em] text-on-surface-variant">
            Max price
          </p>
          <span className="font-label-sm text-[10px] tracking-[0.04em] text-tertiary">
            {formatINR(maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min={5000}
          max={MAX_PRICE}
          step={500}
          value={maxPrice}
          onChange={(event) => onMaxPrice(Number(event.target.value))}
          aria-label="Maximum price"
          className="w-full cursor-pointer"
          style={{
            background: `linear-gradient(to right, #e0c298 0%, #e0c298 ${((maxPrice - 5000) / (MAX_PRICE - 5000)) * 100}%, #353438 ${((maxPrice - 5000) / (MAX_PRICE - 5000)) * 100}%, #353438 100%)`,
          }}
        />
        <div className="mt-2 flex justify-between font-label-sm text-[8px] tracking-[0.08em] text-on-surface-variant/55">
          <span>₹5,000</span>
          <span>₹39,990</span>
        </div>
      </div>

      <div className="py-5">
        <p className="mb-2 font-label-sm text-[8.5px] uppercase tracking-[0.2em] text-on-surface-variant">
          Allocation status
        </p>
        {(
          [
            ["ready", "Ready to dispatch"],
            ["archival", "Archival allocation"],
          ] as Array<[Allocation, string]>
        ).map(([value, label]) => {
          const selected = allocation.has(value);
          return (
            <button
              key={value}
              type="button"
              aria-pressed={selected}
              onClick={() => onAllocation(value)}
              className="group flex w-full items-center justify-between py-2.5 text-left"
            >
              <span className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-4 w-4 items-center justify-center border transition-colors",
                    selected
                      ? "border-tertiary bg-tertiary text-on-tertiary"
                      : "border-outline-variant/70 text-transparent group-hover:border-on-surface-variant",
                  )}
                >
                  <span className="material-symbols-outlined text-[12px]">
                    check
                  </span>
                </span>
                <span
                  className={cn(
                    "font-body-sm text-body-sm transition-colors",
                    selected
                      ? "text-on-surface"
                      : "text-on-surface-variant group-hover:text-on-surface",
                  )}
                >
                  {label}
                </span>
              </span>
              <span className="font-label-sm text-[9px] text-on-surface-variant/55">
                {value === "ready" ? "IN STOCK" : "ARCHIVE"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function CatalogClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [categories, setCategories] = useState<Set<CatalogCategory>>(
    () =>
      new Set(
        isCategory(initialCategory) ? [initialCategory] : [],
      ),
  );
  const [sizes, setSizes] = useState<Set<string>>(() => new Set(["8", "9"]));
  const [colors, setColors] = useState<Set<string>>(() => new Set());
  const [allocation, setAllocation] = useState<Set<Allocation>>(
    () => new Set(["ready"]),
  );
  const [maxPrice, setMaxPrice] = useState(INITIAL_MAX_PRICE);
  const [unit, setUnit] = useState<SizeUnit>("UK");
  const [sort, setSort] = useState<SortKey>(() => {
    const value = searchParams.get("sort");
    return isSort(value) ? value : "featured";
  });
  const [sale, setSale] = useState(searchParams.get("sale") === "true");
  const [search, setSearch] = useState(() => searchParams.get("q") ?? "");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [dense, setDense] = useState(false);

  const paramsString = searchParams.toString();

  useEffect(() => {
    const params = new URLSearchParams(paramsString);
    const category = params.get("category");
    setCategories(
      isCategory(category) ? new Set([category]) : new Set<CatalogCategory>(),
    );
    const sortParam = params.get("sort");
    setSort(isSort(sortParam) ? sortParam : "featured");
    setSale(params.get("sale") === "true");
    setSearch(params.get("q") ?? "");
    setVisible(PAGE_SIZE);
    // The URL is the source of truth when navigation supplies new filters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsString]);

  useEffect(() => {
    document.body.style.overflow = mobileFilters ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFilters]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [categories, sizes, colors, allocation, maxPrice, sort, sale, search]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const result = CATALOG_PRODUCTS.filter((product) => {
      if (
        categories.size > 0 &&
        !categories.has(product.category as CatalogCategory)
      ) {
        return false;
      }
      if (sizes.size > 0 && !product.sizes.some((size) => sizes.has(size))) {
        return false;
      }
      if (
        colors.size > 0 &&
        !product.colors.some((color) => colors.has(color.id))
      ) {
        return false;
      }
      if (product.price > maxPrice) return false;
      if (allocation.size > 0 && !allocation.has(product.releaseStatus)) {
        return false;
      }
      if (sale && !product.compareAt) return false;
      if (
        term &&
        ![product.name, product.line, product.category, product.description]
          .join(" ")
          .toLowerCase()
          .includes(term)
      ) {
        return false;
      }
      return true;
    });

    return result.sort((a, b) => {
      if (sort === "newest") return b.arrival - a.arrival;
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") {
        return b.rating - a.rating || b.reviews - a.reviews;
      }
      return a.featured - b.featured;
    });
  }, [allocation, categories, colors, maxPrice, sale, search, sizes, sort]);

  const shown = filtered.slice(0, visible);

  function toggleCategory(category: CatalogCategory) {
    setCategories((current) => {
      const next = new Set(current);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  }

  function toggleSize(size: string) {
    setSizes((current) => {
      const next = new Set(current);
      if (next.has(size)) next.delete(size);
      else next.add(size);
      return next;
    });
  }

  function toggleColor(color: string) {
    setColors((current) => {
      const next = new Set(current);
      if (next.has(color)) next.delete(color);
      else next.add(color);
      return next;
    });
  }

  function toggleAllocation(value: Allocation) {
    setAllocation((current) => {
      const next = new Set(current);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }

  function clearAll() {
    setCategories(new Set());
    setSizes(new Set());
    setColors(new Set());
    setAllocation(new Set(["ready", "archival"]));
    setMaxPrice(MAX_PRICE);
    setSearch("");
    setSale(false);
    setSort("featured");
    setVisible(PAGE_SIZE);
  }

  const activePills: Array<{ key: string; label: string; onRemove: () => void }> =
    [];
  categories.forEach((category) =>
    activePills.push({
      key: `cat-${category}`,
      label: CATEGORY_META[category].nav,
      onRemove: () => toggleCategory(category),
    }),
  );
  sizes.forEach((size) =>
    activePills.push({
      key: `size-${size}`,
      label: `UK ${size}`,
      onRemove: () => toggleSize(size),
    }),
  );
  colors.forEach((color) =>
    activePills.push({
      key: `color-${color}`,
      label: COLORS[color]?.name ?? color,
      onRemove: () => toggleColor(color),
    }),
  );
  if (maxPrice < MAX_PRICE) {
    activePills.push({
      key: "price",
      label: `Under ${formatINR(maxPrice)}`,
      onRemove: () => setMaxPrice(MAX_PRICE),
    });
  }
  if (allocation.size !== 2) {
    allocation.forEach((status) =>
      activePills.push({
        key: `status-${status}`,
        label: status === "ready" ? "Ready to dispatch" : "Archival allocation",
        onRemove: () => toggleAllocation(status),
      }),
    );
  }
  if (sale) {
    activePills.push({
      key: "sale",
      label: "Sale archive",
      onRemove: () => setSale(false),
    });
  }
  if (search.trim()) {
    activePills.push({
      key: "search",
      label: `“${search.trim()}”`,
      onRemove: () => setSearch(""),
    });
  }

  const controlsProps: FilterControlsProps = {
    categories,
    sizes,
    colors,
    allocation,
    maxPrice,
    unit,
    search,
    resultCount: filtered.length,
    onCategory: toggleCategory,
    onSize: toggleSize,
    onColor: toggleColor,
    onAllocation: toggleAllocation,
    onMaxPrice: setMaxPrice,
    onUnit: setUnit,
    onSearch: setSearch,
    onClear: clearAll,
  };

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
            <span className="text-on-surface-variant">Footwear archive</span>
          </nav>
          <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-label-md text-label-md uppercase tracking-[0.22em] text-tertiary">
                All footwear · {String(CATEGORY_COUNTS.all).padStart(3, "0")} models
              </p>
              <h1 className="mt-3 font-display text-[clamp(2.5rem,5vw,4.6rem)] font-semibold uppercase leading-[0.9] tracking-[-0.045em] text-on-surface">
                The footwear
                <br />
                <span className="text-on-surface-variant">archive.</span>
              </h1>
            </div>
            <p className="max-w-sm font-body-sm text-body-sm text-on-surface-variant md:pb-2">
              A complete index of current and archival silhouettes. Filter by
              silhouette, size, colour and allocation.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1680px] px-5 py-8 sm:px-8 lg:py-10 xl:px-12">
        <div className="grid gap-8 lg:grid-cols-[248px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[272px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-[7.5rem] max-h-[calc(100vh-9rem)] overflow-y-auto border-t border-outline-variant/35 pr-1 pt-5 scrollbar-none">
              <FilterControls {...controlsProps} />
            </div>
          </aside>

          <div className="min-w-0">
            <div className="sticky top-24 z-30 -mx-5 border-y border-outline-variant/35 bg-background/92 px-5 py-3 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:mx-0 lg:rounded-none lg:border-t-0 lg:bg-background/92 lg:px-0">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setMobileFilters(true)}
                    className="flex items-center gap-2 border border-outline-variant/50 px-3 py-2 font-label-sm text-[9px] uppercase tracking-[0.12em] text-on-surface lg:hidden"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      tune
                    </span>
                    Filter
                  </button>
                  <p className="truncate font-label-sm text-[9px] uppercase tracking-[0.14em] text-on-surface-variant">
                    <span className="text-on-surface">{filtered.length}</span>{" "}
                    models
                  </p>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                  <label htmlFor="sort" className="sr-only">
                    Sort products
                  </label>
                  <div className="relative">
                    <select
                      id="sort"
                      value={sort}
                      onChange={(event) =>
                        setSort(event.target.value as SortKey)
                      }
                      className="appearance-none border border-outline-variant/45 bg-transparent py-2 pl-3 pr-8 font-label-sm text-[9px] uppercase tracking-[0.1em] text-on-surface outline-none transition-colors hover:border-on-surface-variant"
                    >
                      {SORT_OPTIONS.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                          className="bg-surface-container text-on-surface"
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[16px] text-on-surface-variant">
                      expand_more
                    </span>
                  </div>
                  <div className="hidden items-center border border-outline-variant/45 sm:flex">
                    <button
                      type="button"
                      onClick={() => setDense(false)}
                      aria-label="Comfortable grid"
                      aria-pressed={!dense}
                      className={cn(
                        "flex h-8 w-8 items-center justify-center transition-colors",
                        !dense
                          ? "bg-on-surface text-background"
                          : "text-on-surface-variant hover:text-on-surface",
                      )}
                    >
                      <span className="material-symbols-outlined text-[17px]">
                        view_agenda
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDense(true)}
                      aria-label="Dense grid"
                      aria-pressed={dense}
                      className={cn(
                        "flex h-8 w-8 items-center justify-center transition-colors",
                        dense
                          ? "bg-on-surface text-background"
                          : "text-on-surface-variant hover:text-on-surface",
                      )}
                    >
                      <span className="material-symbols-outlined text-[17px]">
                        grid_view
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {activePills.length > 0 ? (
                <div className="mt-3 flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
                  {activePills.map((pill) => (
                    <button
                      key={pill.key}
                      type="button"
                      onClick={pill.onRemove}
                      className="group flex shrink-0 items-center gap-1.5 border border-outline-variant/45 bg-surface-container px-2.5 py-1.5 font-label-sm text-[8px] uppercase tracking-[0.1em] text-on-surface-variant transition-colors hover:border-tertiary/50 hover:text-on-surface"
                    >
                      {pill.label}
                      <span className="material-symbols-outlined text-[12px] text-on-surface-variant/60 group-hover:text-tertiary">
                        close
                      </span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={clearAll}
                    className="shrink-0 px-2.5 py-1.5 font-label-sm text-[8px] uppercase tracking-[0.1em] text-tertiary underline decoration-tertiary/35 underline-offset-4 hover:text-on-surface"
                  >
                    Clear all
                  </button>
                </div>
              ) : null}
            </div>

            {shown.length > 0 ? (
              <>
                <div
                  className={cn(
                    "mt-7 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5",
                    dense
                      ? "lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
                      : "lg:grid-cols-3 2xl:grid-cols-4",
                  )}
                >
                  {shown.map((product, index) => (
                    <ProductCard
                      key={product.slug}
                      product={product}
                      priority={index < 4}
                    />
                  ))}
                </div>

                <div className="mt-12 flex flex-col items-center gap-5 border-t border-outline-variant/35 pt-8">
                  <p className="font-label-sm text-[9px] uppercase tracking-[0.16em] text-on-surface-variant">
                    Showing{" "}
                    <span className="text-on-surface">{shown.length}</span> of{" "}
                    <span className="text-on-surface">{filtered.length}</span>{" "}
                    models
                  </p>
                  <div className="h-px w-full max-w-xs bg-outline-variant/30">
                    <div
                      className="h-px bg-tertiary transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (shown.length / filtered.length) * 100)}%`,
                      }}
                    />
                  </div>
                  {shown.length < filtered.length ? (
                    <button
                      type="button"
                      onClick={() =>
                        setVisible((count) =>
                          Math.min(filtered.length, count + PAGE_SIZE),
                        )
                      }
                      className="mt-1 flex items-center gap-4 border border-outline-variant/55 px-7 py-3.5 font-label-md text-[10px] uppercase tracking-[0.16em] text-on-surface transition-colors hover:border-tertiary hover:text-tertiary"
                    >
                      Load more
                      <span className="material-symbols-outlined text-[17px]">
                        add
                      </span>
                    </button>
                  ) : (
                    <p className="font-label-sm text-[8px] uppercase tracking-[0.16em] text-on-surface-variant/55">
                      End of the current archive
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="flex min-h-[440px] flex-col items-center justify-center border-b border-outline-variant/25 px-5 py-20 text-center">
                <span className="flex h-14 w-14 items-center justify-center border border-outline-variant/45 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[25px]">
                    search_off
                  </span>
                </span>
                <h2 className="mt-6 font-headline-sm text-headline-sm uppercase text-on-surface">
                  No models in this allocation
                </h2>
                <p className="mt-3 max-w-sm font-body-sm text-body-sm text-on-surface-variant">
                  The current filters are too specific. Widen your size, colour
                  or price selection to re-enter the archive.
                </p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="mt-7 bg-tertiary px-6 py-3.5 font-label-md text-[10px] uppercase tracking-[0.16em] text-on-tertiary transition-colors hover:bg-tertiary/90"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileFilters ? (
        <div className="fixed inset-0 z-[75] lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setMobileFilters(false)}
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
          />
          <aside className="absolute right-0 top-0 flex h-full w-[min(91vw,390px)] flex-col border-l border-outline-variant/45 bg-surface-container-lowest">
            <div className="flex items-center justify-between border-b border-outline-variant/40 px-5 py-5">
              <p className="font-headline-sm text-headline-sm text-on-surface">
                Filters
              </p>
              <button
                type="button"
                onClick={() => setMobileFilters(false)}
                aria-label="Close filters"
                className="flex h-9 w-9 items-center justify-center text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 pb-6 scrollbar-none">
              <FilterControls {...controlsProps} />
            </div>
            <div className="border-t border-outline-variant/40 p-4">
              <button
                type="button"
                onClick={() => setMobileFilters(false)}
                className="w-full bg-tertiary px-5 py-4 font-label-md text-label-md uppercase tracking-[0.15em] text-on-tertiary transition-colors hover:bg-tertiary/90"
              >
                Show {filtered.length} models
              </button>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
