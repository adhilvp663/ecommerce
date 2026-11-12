"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_CART,
  DEFAULT_WISHLIST,
  getProduct,
  type Product,
} from "@/lib/products";

const CART_KEY = "solestore.cart.v1";
const WISHLIST_KEY = "solestore.wishlist.v1";
const MAX_QTY = 9;

export type CartLine = {
  slug: string;
  size: string;
  color: string;
  qty: number;
};

export type CartEntry = CartLine & {
  product: Product;
  lineTotal: number;
};

type ToastMessage = {
  id: number;
  title: string;
  body?: string;
};

type StoreValue = {
  items: CartLine[];
  entries: CartEntry[];
  count: number;
  subtotal: number;
  addItem: (line: Omit<CartLine, "qty"> & { qty?: number }) => void;
  removeItem: (slug: string, size: string, color: string) => void;
  updateQty: (slug: string, size: string, color: string, qty: number) => void;
  clearCart: () => void;
  wishlist: string[];
  wishlistCount: number;
  isWished: (slug: string) => boolean;
  toggleWishlist: (slug: string) => boolean;
  toast: (title: string, body?: string) => void;
  shownToast: ToastMessage | null;
  dismissToast: () => void;
};

const StoreContext = createContext<StoreValue | null>(null);

function readCart(): CartLine[] | null {
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return null;
    return parsed.filter(
      (line) =>
        line &&
        typeof line.slug === "string" &&
        typeof line.size === "string" &&
        typeof line.color === "string" &&
        Number.isFinite(line.qty) &&
        getProduct(line.slug),
    );
  } catch {
    return null;
  }
}

function readWishlist(): string[] | null {
  try {
    const raw = window.localStorage.getItem(WISHLIST_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as string[];
    if (!Array.isArray(parsed)) return null;
    return parsed.filter((slug) => typeof slug === "string" && getProduct(slug));
  } catch {
    return null;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>(DEFAULT_CART);
  const [wishlist, setWishlist] = useState<string[]>(DEFAULT_WISHLIST);
  const [shownToast, setShownToast] = useState<ToastMessage | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const storedCart = readCart();
    const storedWishlist = readWishlist();
    if (storedCart) setItems(storedCart);
    if (storedWishlist) setWishlist(storedWishlist);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const toast = useCallback((title: string, body?: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    const message = { id: Date.now(), title, body };
    setShownToast(message);
    toastTimer.current = setTimeout(() => {
      setShownToast((current) =>
        current && current.id === message.id ? null : current,
      );
    }, 3600);
  }, []);

  const dismissToast = useCallback(() => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setShownToast(null);
  }, []);

  const addItem = useCallback<StoreValue["addItem"]>((line) => {
    setItems((current) => {
      const index = current.findIndex(
        (item) =>
          item.slug === line.slug &&
          item.size === line.size &&
          item.color === line.color,
      );
      const qty = Math.max(1, Math.min(MAX_QTY, line.qty ?? 1));

      if (index === -1) return [...current, { ...line, qty }];

      const next = [...current];
      next[index] = {
        ...next[index],
        qty: Math.min(MAX_QTY, next[index].qty + qty),
      };
      return next;
    });
  }, []);

  const removeItem = useCallback<StoreValue["removeItem"]>(
    (slug, size, color) => {
      setItems((current) =>
        current.filter(
          (item) =>
            !(
              item.slug === slug &&
              item.size === size &&
              item.color === color
            ),
        ),
      );
    },
    [],
  );

  const updateQty = useCallback<StoreValue["updateQty"]>(
    (slug, size, color, qty) => {
      setItems((current) => {
        if (qty <= 0) {
          return current.filter(
            (item) =>
              !(
                item.slug === slug &&
                item.size === size &&
                item.color === color
              ),
          );
        }
        return current.map((item) =>
          item.slug === slug &&
          item.size === size &&
          item.color === color
            ? { ...item, qty: Math.min(MAX_QTY, qty) }
            : item,
        );
      });
    },
    [],
  );

  const clearCart = useCallback(() => setItems([]), []);

  const toggleWishlist = useCallback<StoreValue["toggleWishlist"]>((slug) => {
    let added = false;
    setWishlist((current) => {
      if (current.includes(slug)) {
        return current.filter((item) => item !== slug);
      }
      added = true;
      return [slug, ...current];
    });
    return added;
  }, []);

  const entries = useMemo<CartEntry[]>(
    () =>
      items
        .map((line) => {
          const product = getProduct(line.slug);
          if (!product) return null;
          return {
            ...line,
            product,
            lineTotal: product.price * line.qty,
          };
        })
        .filter((entry): entry is CartEntry => Boolean(entry)),
    [items],
  );

  const value = useMemo<StoreValue>(
    () => ({
      items,
      entries,
      count: items.reduce((total, item) => total + item.qty, 0),
      subtotal: entries.reduce((total, entry) => total + entry.lineTotal, 0),
      addItem,
      removeItem,
      updateQty,
      clearCart,
      wishlist,
      wishlistCount: wishlist.length,
      isWished: (slug) => wishlist.includes(slug),
      toggleWishlist,
      toast,
      shownToast,
      dismissToast,
    }),
    [
      items,
      entries,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      wishlist,
      toggleWishlist,
      toast,
      shownToast,
      dismissToast,
    ],
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
      <ToastViewport toast={shownToast} onDismiss={dismissToast} />
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
}

function ToastViewport({
  toast,
  onDismiss,
}: {
  toast: ToastMessage | null;
  onDismiss: () => void;
}) {
  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-24 left-1/2 z-[90] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 animate-[toast-in_320ms_ease-out] sm:bottom-24 sm:left-auto sm:right-6 sm:translate-x-0"
    >
      <div className="flex items-start gap-4 border border-outline-variant/60 bg-surface-container-high/95 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-tertiary/30 bg-tertiary/10 text-tertiary">
          <span className="material-symbols-outlined text-[18px]">check</span>
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-label-md text-label-md uppercase tracking-[0.14em] text-on-surface">
            {toast.title}
          </p>
          {toast.body ? (
            <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
              {toast.body}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="text-on-surface-variant transition-colors hover:text-on-surface"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </div>
  );
}
