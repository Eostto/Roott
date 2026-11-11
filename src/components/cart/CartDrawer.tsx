"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { formatEur, useCart } from "./CartProvider";
import { Close } from "../icons";

export default function CartDrawer({ t, locale }: { t: Dictionary["cart"]; locale: Locale }) {
  const { items, total, open, setOpen, setQty, remove, clear } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[70] bg-black/60 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
      />
      <aside
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-[71] flex h-dvh w-full max-w-[440px] flex-col bg-white transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 pb-4 pt-6">
          <h2 className="text-[24px] font-semibold">{t.title}</h2>
          <div className="flex items-center gap-5">
            {items.length > 0 && (
              <button type="button" onClick={clear} className="text-[14px] text-[#42454a] underline hover:no-underline">
                {t.clear}
              </button>
            )}
            <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="hover:opacity-60">
              <Close />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <p className="py-10 text-[16px] text-[#42454a]">{t.empty}</p>
          ) : (
            <ul className="divide-y divide-mist">
              {items.map((it) => (
                <li key={it.id} className="flex gap-4 py-4">
                  <Link href={it.href} onClick={() => setOpen(false)} className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[5px] bg-mist p-2">
                    {it.image && <img src={it.image} alt={it.name} className="max-h-full max-w-full object-contain" />}
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <Link href={it.href} onClick={() => setOpen(false)} className="text-[15px] font-semibold hover:underline">
                        {it.name}
                      </Link>
                      <button type="button" aria-label={t.remove} onClick={() => remove(it.id)} className="text-[#96979f] hover:text-black">
                        <Close className="h-4 w-4" />
                      </button>
                    </div>
                    {it.caption && <p className="mt-0.5 truncate text-[12px] font-light text-[#42454a]">{it.caption}</p>}
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-[5px] border border-[#96979f]">
                        <button type="button" onClick={() => setQty(it.id, it.qty - 1)} className="h-8 w-8 text-[16px] hover:bg-mist">
                          −
                        </button>
                        <span className="w-8 text-center text-[14px]">{it.qty}</span>
                        <button type="button" onClick={() => setQty(it.id, it.qty + 1)} className="h-8 w-8 text-[16px] hover:bg-mist">
                          +
                        </button>
                      </div>
                      <span className="text-[15px]">{formatEur((it.price ?? 0) * it.qty, locale)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-mist px-6 pb-6 pt-4">
          <div className="flex items-center justify-between text-[16px]">
            <span>{t.total}</span>
            <span className="text-[20px] font-semibold">{formatEur(total, locale) || "0 €"}</span>
          </div>
          <Link
            href={`/${locale}/order`}
            onClick={() => setOpen(false)}
            aria-disabled={items.length === 0}
            className={`mt-4 flex h-11 items-center justify-center rounded-[5px] text-[15px] font-semibold text-white transition-opacity ${
              items.length ? "bg-[#8fd15a] hover:opacity-85" : "pointer-events-none bg-[#c9c9cf]"
            }`}
          >
            {t.checkout}
          </Link>
        </div>
      </aside>
    </>
  );
}
