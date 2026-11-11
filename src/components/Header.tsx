"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import Logo from "./Logo";
import Messengers from "./Messengers";
import LanguageSwitcher from "./LanguageSwitcher";
import { useUI } from "./UIProvider";
import { useCart } from "./cart/CartProvider";
import { Burger, Cart, Chevron, Close } from "./icons";

type NavItem = Dictionary["nav"][number];
type Child = { label: string; href: string; title?: string; text?: string };

function childrenOf(item: NavItem): Child[] | undefined {
  return "children" in item ? (item.children as Child[]) : undefined;
}

export default function Header({ t, locale }: { t: Dictionary; locale: Locale }) {
  const { openCall } = useUI();
  const cart = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const L = (href: string) => (href.startsWith("/files/") || href.startsWith("http") ? href : `/${locale}${href}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-40 bg-white transition-shadow ${scrolled ? "shadow-[0_2px_12px_rgba(0,0,0,0.08)]" : ""}`}
    >
      <div className="flex h-[70px] items-center gap-6 px-4">
        <Link href={L("")} aria-label="roott.md" className="shrink-0">
          <Logo className="h-[50px] w-[52px]" />
        </Link>

        {/* Navigație desktop */}
        <nav className="hidden flex-1 items-center justify-around xl:flex">
          {t.nav.map((item) => {
            const kids = childrenOf(item);
            const isCatalog = "catalog" in item && item.catalog;
            if (!kids) {
              return (
                <Link
                  key={item.label}
                  href={L(("href" in item && item.href) || "")}
                  className="px-[10px] py-[25px] text-[14px] hover:text-black/60"
                >
                  {item.label}
                </Link>
              );
            }
            return (
              <div key={item.label} className="group relative">
                <button type="button" className="flex items-center gap-1 px-[10px] py-[25px] text-[14px] group-hover:text-black/60">
                  {item.label}
                  
                </button>
                <div
                  className={`invisible absolute left-1/2 top-full -translate-x-1/2 translate-y-2 rounded-[5px] bg-white opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${
                    isCatalog ? "w-[560px] p-6" : "min-w-[220px] py-3"
                  }`}
                >
                  {isCatalog ? (
                    <div className="grid grid-cols-3 gap-4">
                      {kids.map((k) => (
                        <a
                          key={k.label}
                          href={L(k.href)}
                          target={k.href.startsWith("/files/") ? "_blank" : undefined}
                          className="rounded-[5px] bg-mist p-4 transition-colors hover:bg-slate hover:text-white"
                        >
                          <span className="block text-[14px] font-semibold">{k.label}</span>
                          <span className="mt-2 block text-[12px] font-semibold leading-snug">{k.title}</span>
                          {k.text && <span className="mt-1 block text-[11px] leading-snug opacity-70">{k.text}</span>}
                        </a>
                      ))}
                    </div>
                  ) : (
                    kids.map((k) => (
                      <Link
                        key={k.label}
                        href={L(k.href)}
                        className="block whitespace-nowrap px-5 py-2 text-[14px] hover:bg-mist"
                      >
                        {k.label}
                      </Link>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Dreapta: telefon, buton, limbă, coș */}
        <div className="ml-auto flex items-center gap-4 xl:ml-0 xl:gap-5">
          <a href={t.header.phoneHref} className="hidden whitespace-nowrap text-[14px] font-semibold lg:block">
            {t.header.phone}
          </a>
          <Messengers size={20} className="hidden lg:inline-flex" />
          <button type="button" onClick={openCall} className="btn-outline-dark hidden md:inline-flex">
            {t.header.callBtn}
          </button>
          <LanguageSwitcher locale={locale} />
          <button type="button" aria-label={t.header.cart} onClick={() => cart.setOpen(true)} className="relative hover:text-black/60">
            <Cart />
            {cart.count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-lime px-1 text-[10px] font-semibold text-black">
                {cart.count}
              </span>
            )}
          </button>
          <button
            type="button"
            aria-label={t.header.menu}
            onClick={() => setMobileOpen(true)}
            className="xl:hidden"
          >
            <Burger />
          </button>
        </div>
      </div>

      {/* Meniu mobil */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity xl:hidden ${mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setMobileOpen(false)}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-dvh w-full max-w-[420px] flex-col bg-white transition-transform duration-300 xl:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-[72px] items-center justify-between border-b border-black/10 px-5">
          <Logo className="h-[40px] w-[42px]" />
          <button type="button" aria-label={t.header.close} onClick={() => setMobileOpen(false)}>
            <Close />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 py-3">
          {t.nav.map((item, i) => {
            const kids = childrenOf(item);
            if (!kids) {
              return (
                <Link
                  key={item.label}
                  href={L(("href" in item && item.href) || "")}
                  onClick={() => setMobileOpen(false)}
                  className="block border-b border-black/10 py-4 text-[16px]"
                >
                  {item.label}
                </Link>
              );
            }
            const open = openIdx === i;
            return (
              <div key={item.label} className="border-b border-black/10">
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="flex w-full items-center justify-between py-4 text-[16px]"
                >
                  {item.label}
                  <Chevron className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-all ${open ? "grid-rows-[1fr] pb-3" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    {kids.map((k) => (
                      <Link
                        key={k.label}
                        href={L(k.href)}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 pl-3 text-[14px] text-black/70"
                      >
                        {k.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
        <div className="space-y-4 border-t border-black/10 p-5">
          <div className="flex items-center gap-4">
            <a href={t.header.phoneHref} className="block text-[16px] font-semibold">
              {t.header.phone}
            </a>
            <Messengers size={26} />
          </div>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              openCall();
            }}
            className="btn-dark w-full"
          >
            {t.header.callBtn}
          </button>
        </div>
      </aside>
    </header>
  );
}
