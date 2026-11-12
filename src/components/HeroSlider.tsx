"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { useUI } from "./UIProvider";

/**
 * Primele două blocuri mari de pe roott.ru:
 * 1) bannerul „Medic-ambasador ROOTT” (umple restul primului ecran)
 * 2) „Sistem elvețian de implanturi…” pe tot ecranul
 */
export default function HeroSlider({ t, locale }: { t: Dictionary["hero"]; locale: Locale }) {
  const { openCall } = useUI();

  return (
    <>
      {/* 1. Dealer */}
      <section className="relative h-[calc(100svh-305px)] min-h-[520px] overflow-hidden bg-[#3b4140] text-white">
        <img
          src="/images/roott/hero-system.jpg"
          alt={t.dealer.title}
          className="absolute inset-0 h-full w-full object-cover object-[center_70%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
        <div className="relative flex h-full items-end justify-center px-4 pb-10 text-center md:pb-14">
          <div className="max-w-[768px]">
            <h2 className="mb-5 text-[28px] font-semibold leading-[1.2] md:text-[38px]">{t.dealer.title}</h2>
            <p className="text-[14px] font-semibold leading-6 md:text-[16px]">{t.dealer.text}</p>
            <ul className="mt-5 flex flex-wrap justify-center gap-[7px] text-[14px] font-semibold md:text-[16px]">
              {t.dealer.tags.map((tag) => (
                <li key={tag} className="flex items-center gap-[7px] before:content-['•']">
                  {tag}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={`/${locale}/ambassador`}
                className="inline-flex w-[300px] items-center justify-center rounded-[5px] border border-white bg-white p-[10px] text-[14px] font-semibold text-black transition-colors hover:bg-transparent hover:text-white"
              >
                {t.dealer.primary}
              </Link>
              <Link
                href={`/${locale}/ambassador#aplica`}
                className="inline-flex w-[300px] items-center justify-center rounded-[5px] border border-white p-[10px] text-[14px] font-semibold text-white transition-colors hover:bg-white hover:text-black"
              >
                {t.dealer.secondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Sistem elvețian */}
      <section className="relative h-[100svh] max-h-[900px] min-h-[560px] overflow-hidden bg-[#2a2c30] text-white">
        <img
          src="/images/roott/hero-ambassador.jpg"
          alt={t.system.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/30 to-black/80" />
        <div className="relative flex h-full items-end justify-center px-4 pb-16 text-center md:pb-[110px]">
          <div className="max-w-[800px]">
            <h5 className="text-[24px] font-semibold leading-[1.375] md:text-[32px]">{t.system.title}</h5>
            <p className="mt-5 text-[14px] font-semibold md:text-[16px]">{t.system.text}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={`/${locale}/contacts`}
                className="inline-flex items-center justify-center rounded-[5px] bg-white px-[60px] py-3 text-[14px] font-semibold text-black transition-opacity hover:opacity-85"
              >
                {t.system.primary}
              </Link>
              <button
                type="button"
                onClick={openCall}
                className="inline-flex items-center justify-center rounded-[5px] border border-white px-[60px] py-[11px] text-[14px] font-semibold text-white transition-colors hover:bg-white hover:text-black"
              >
                {t.system.secondary}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
