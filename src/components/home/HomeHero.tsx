"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { useUI } from "../UIProvider";
import { Arrow } from "../icons";

const BADGE_ICONS = [
  // scut (garanție)
  <path key="a" d="M12 3 5 6v5c0 4.4 3 8.3 7 9.5 4-1.2 7-5.1 7-9.5V6l-7-3Zm-3 9 2 2 4-4" />,
  // certificat
  <path key="b" d="M8 3h8l3 3v15H5V3h3Zm1 7h6M9 14h6M9 18h3" />,
  // cruce elvețiană
  <path key="c" d="M4 4h16v16H4V4Zm6 4h4v2h2v4h-2v2h-4v-2H8v-4h2V8Z" />,
  // camion
  <path key="d" d="M3 6h11v10H3V6Zm11 4h4l3 3v3h-7v-6ZM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />,
];

/** Primul ecran: titlu, apel la acțiune și sistemul ROOTT pe fundal luminos. */
export default function HomeHero({ t, locale }: { t: Dictionary["home"]; locale: Locale }) {
  const { openCall } = useUI();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f3f7f0] via-[#f8faf6] to-white">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full bg-lime/25 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-sky/20 blur-[110px]" />

      <div className="relative mx-auto grid max-w-[1224px] items-center gap-10 px-4 pb-10 pt-12 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pb-16 lg:pt-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#3d7f20] shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            {t.eyebrow}
          </span>
          <h1 className="mt-6 text-[36px] font-bold leading-[1.08] tracking-[-0.02em] text-[#0e1525] md:text-[54px]">{t.title}</h1>
          <p className="mt-6 max-w-[540px] text-[16px] leading-7 text-[#4a5160] md:text-[18px] md:leading-8">{t.lead}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/${locale}/catalog`}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#0e1525] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(14,21,37,0.6)] transition hover:bg-[#1c2740]"
            >
              {t.shop}
              <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <button
              type="button"
              onClick={openCall}
              className="inline-flex items-center justify-center rounded-full border border-[#0e1525]/15 bg-white px-8 py-4 text-[15px] font-semibold text-[#0e1525] transition hover:border-[#0e1525]/40"
            >
              {t.call}
            </button>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[540px]">
          <div className="absolute inset-[6%] rounded-full bg-white shadow-[0_40px_120px_-40px_rgba(14,21,37,0.35)] ring-1 ring-black/5" />
          <div className="absolute inset-[16%] rounded-full bg-gradient-to-br from-[#f1f8ec] to-white" />
          <img src="/images/roott/system.webp" alt="ROOTT" className="relative h-full w-full object-contain p-[9%]" fetchPriority="high" />
        </div>
      </div>

      <div className="relative mx-auto max-w-[1224px] px-4 pb-14 lg:pb-20">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {t.badges.map((b, i) => (
            <li key={b.title} className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white/90 p-5 shadow-[0_8px_30px_-20px_rgba(14,21,37,0.4)] backdrop-blur">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime/15 text-[#3d7f20]">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  {BADGE_ICONS[i % BADGE_ICONS.length]}
                </svg>
              </span>
              <span>
                <span className="block text-[15px] font-semibold text-[#0e1525]">{b.title}</span>
                <span className="block text-[13px] text-[#6b7180]">{b.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
