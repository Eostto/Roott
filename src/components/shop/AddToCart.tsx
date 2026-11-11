"use client";

import { useCart, type CartItem } from "../cart/CartProvider";

export default function AddToCart({ item, label, inCart }: { item: Omit<CartItem, "qty">; label: string; inCart: string }) {
  const cart = useCart();
  const already = cart.items.some((x) => x.id === item.id);
  return (
    <button
      type="button"
      onClick={() => cart.add(item)}
      className="mt-2 inline-block min-w-[240px] rounded-[5px] bg-[#8fd15a] px-[60px] py-[13px] text-[15px] font-semibold leading-[18px] text-white transition-opacity hover:opacity-85"
    >
      {already ? inCart : label}
    </button>
  );
}
