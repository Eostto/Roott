"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { formatEur, useCart } from "./CartProvider";
import { SHOW_PRICES } from "@/lib/company";

const input = "w-full rounded-[5px] border border-[#e8e8e8] bg-white px-5 py-[14px] text-[14px] outline-none transition-colors focus:border-[#42454a]";

export default function OrderForm({ t, privacy, locale }: { t: Dictionary["order"]; privacy: Dictionary["contact"]; locale: Locale }) {
  const cart = useCart();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  if (state === "done")
    return (
      <div className="rounded-[5px] bg-mist p-10 text-center">
        <p className="text-[24px] font-semibold">{t.successTitle}</p>
        <p className="mt-3 text-[16px] text-[#42454a]">{t.successText}</p>
        <Link href={`/${locale}/catalog`} className="mt-8 inline-block rounded-[5px] bg-black px-[60px] py-3 text-[14px] font-semibold text-white">
          {t.goShop}
        </Link>
      </div>
    );

  if (!cart.items.length)
    return (
      <div className="rounded-[5px] bg-mist p-10 text-center">
        <p className="text-[16px]">{t.empty}</p>
        <Link href={`/${locale}/catalog`} className="mt-6 inline-block rounded-[5px] bg-black px-[60px] py-3 text-[14px] font-semibold text-white">
          {t.goShop}
        </Link>
      </div>
    );

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("sending");
    const customer = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    try {
      const r = await fetch("/api/order", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ locale, customer, items: cart.items.map((x) => ({ id: x.id, qty: x.qty })) }),
      });
      if (!r.ok) throw new Error();
      cart.clear();
      setState("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setState("error");
    }
  };

  return (
    <form onSubmit={submit} className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
      <div>
        <p className="mb-5 text-[19px] text-[#5d8d74]">{t.contactTitle}</p>
        <div className="grid gap-[10px] sm:grid-cols-2">
          <input required name="name" placeholder={t.name} className={input} />
          <input required name="phone" type="tel" placeholder={t.phone} className={input} />
          <input required name="email" type="email" placeholder={t.email} className={input} />
          <input name="company" placeholder={t.company} className={input} />
          <input name="city" placeholder={t.city} className={input} />
          <input name="address" placeholder={t.address} className={input} />
          <textarea name="comment" rows={4} placeholder={t.comment} className={`${input} resize-none sm:col-span-2`} />
        </div>
        <label className="mt-4 flex items-start gap-3 text-[12px] leading-4 text-[#42454a]">
          <input required type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-black" />
          <span>
            {privacy.consent}{" "}
            <Link href={`/${locale}/privacy-policy`} className="underline">
              {privacy.privacy}
            </Link>
          </span>
        </label>
        <p className="mt-6 max-w-[560px] text-[13px] leading-5 text-[#42454a]">{t.note}</p>
        {state === "error" && <p className="mt-4 text-[14px] text-[#ec2256]">{t.error}</p>}
      </div>

      <aside className="rounded-[5px] bg-mist p-6">
        <p className="mb-4 text-[19px] font-semibold">{t.summary}</p>
        <ul className="divide-y divide-white">
          {cart.items.map((it) => (
            <li key={it.id} className="flex items-center gap-3 py-3">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[5px] bg-white p-1">
                {it.image && <img src={it.image} alt={it.name} className="max-h-full max-w-full object-contain" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-semibold">{it.name}</span>
                <span className="block truncate text-[12px] font-light text-[#42454a]">{it.caption}</span>
              </span>
              <span className="text-[13px] text-[#42454a]">× {it.qty}</span>
              {SHOW_PRICES && <span className="w-[72px] text-right text-[14px]">{formatEur((it.price ?? 0) * it.qty, locale)}</span>}
            </li>
          ))}
        </ul>
        {SHOW_PRICES ? (
          <div className="mt-4 flex items-center justify-between border-t border-white pt-4">
            <span className="text-[16px]">{t.total}</span>
            <span className="text-[22px] font-semibold">{formatEur(cart.total, locale)}</span>
          </div>
        ) : (
          <p className="mt-4 border-t border-white pt-4 text-[13px] leading-5 text-[#42454a]">{t.noPrices}</p>
        )}
        <button
          type="submit"
          disabled={state === "sending"}
          className="mt-5 h-11 w-full rounded-[5px] bg-[#8fd15a] text-[15px] font-semibold text-white transition-opacity hover:opacity-85 disabled:opacity-60"
        >
          {state === "sending" ? t.sending : t.submit}
        </button>
      </aside>
    </form>
  );
}
