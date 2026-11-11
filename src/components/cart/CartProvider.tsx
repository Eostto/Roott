"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: number;
  name: string;
  caption?: string;
  price: number | null;
  image: string | null;
  href: string;
  qty: number;
};

type Cart = {
  items: CartItem[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (id: number, qty: number) => void;
  remove: (id: number) => void;
  clear: () => void;
  lastAdded: number | null;
};

const KEY = "roott-cart-v1";
const CartContext = createContext<Cart | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, loaded]);

  const add = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.id === item.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], ...item, qty: next[i].qty + qty };
        return next;
      }
      return [...prev, { ...item, qty }];
    });
    setLastAdded(item.id);
    setOpen(true);
  }, []);

  const setQty = useCallback((id: number, qty: number) => {
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, qty: Math.max(1, Math.min(999, qty)) } : x)));
  }, []);
  const remove = useCallback((id: number) => setItems((prev) => prev.filter((x) => x.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<Cart>(() => {
    const count = items.reduce((a, x) => a + x.qty, 0);
    const total = Math.round(items.reduce((a, x) => a + (x.price ?? 0) * x.qty, 0) * 100) / 100;
    return { items, count, total, open, setOpen, add, setQty, remove, clear, lastAdded };
  }, [items, open, add, setQty, remove, clear, lastAdded]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

export function formatEur(v: number | null | undefined, locale: string) {
  if (v == null) return "";
  return new Intl.NumberFormat(locale === "ro" ? "ro-RO" : "ru-RU", {
    style: "currency",
    currency: "EUR",
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: v % 1 ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(v);
}
