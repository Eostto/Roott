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

export type HeroVariant = 1 | 2 | 3;

const IMG = "/images/roott/hero-roott-r.webp";

function Buttons({ t, locale, dark }: { t: Dictionary["home"]; locale: Locale; dark?: boolean }) {
  const { openCall } = useUI();
  return (
    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
      <Link
        href={`/${locale}/catalog`}
        className={
          dark
            ? "group inline-flex items-center justify-center gap-3 rounded-full bg-lime px-8 py-4 text-[15px] font-semibold text-[#0b0d10] shadow-[0_10px_40px_-10px_rgba(142,221,101,0.6)] transition hover:bg-[#a3e77f]"
            : "group inline-flex items-center justify-center gap-3 rounded-full bg-[#0e1525] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(14,21,37,0.6)] transition hover:bg-[#1c2740]"
        }
      >
        {t.shop}
        <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </Link>
      <button
        type="button"
        onClick={openCall}
        className={
          dark
            ? "inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-[15px] font-semibold text-white transition hover:bg-white/10"
            : "inline-flex items-center justify-center rounded-full border border-[#0e1525]/15 bg-white px-8 py-4 text-[15px] font-semibold text-[#0e1525] transition hover:border-[#0e1525]/40"
        }
      >
        {t.call}
      </button>
    </div>
  );
}

function Intro({ t, locale, dark }: { t: Dictionary["home"]; locale: Locale; dark?: boolean }) {
  return (
    <div>
      <span
        className={
          dark
            ? "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-lime backdrop-blur"
            : "inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#3d7f20] shadow-sm backdrop-blur"
        }
      >
        <span className="h-1.5 w-1.5 rounded-full bg-lime" />
        {t.eyebrow}
      </span>
      <h1 className={`mt-6 text-[36px] font-bold leading-[1.06] tracking-[-0.025em] md:text-[56px] ${dark ? "text-white" : "text-[#0e1525]"}`}>{t.title}</h1>
      <p className={`mt-6 max-w-[540px] text-[16px] leading-7 md:text-[18px] md:leading-8 ${dark ? "text-white/65" : "text-[#4a5160]"}`}>{t.lead}</p>
      <Buttons t={t} locale={locale} dark={dark} />
    </div>
  );
}

function Badges({ t, dark }: { t: Dictionary["home"]; dark?: boolean }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {t.badges.map((b, i) => (
        <li
          key={b.title}
          className={
            dark
              ? "flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur"
              : "flex items-center gap-4 rounded-2xl border border-black/5 bg-white/90 p-5 shadow-[0_8px_30px_-20px_rgba(14,21,37,0.4)] backdrop-blur"
          }
        >
          <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${dark ? "bg-lime/10 text-lime" : "bg-lime/15 text-[#3d7f20]"}`}>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              {BADGE_ICONS[i % BADGE_ICONS.length]}
            </svg>
          </span>
          <span>
            <span className={`block text-[15px] font-semibold ${dark ? "text-white" : "text-[#0e1525]"}`}>{b.title}</span>
            <span className={`block text-[13px] ${dark ? "text-white/50" : "text-[#6b7180]"}`}>{b.text}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Eticheta „ROOTT R” de pe poză. */
function SeriesTag() {
  return (
    <div className="absolute left-6 top-6 flex items-center gap-3 rounded-full border border-white/10 bg-black/40 py-1.5 pl-1.5 pr-4 backdrop-blur-md">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime text-[13px] font-bold text-[#0b0d10]">R</span>
      <span className="text-[13px] font-semibold tracking-wide text-white">ROOTT R · Swiss made</span>
    </div>
  );
}

/** Primul ecran — 3 variante (aleasă prin ?v=1|2|3 în previzualizare). */
export default function HomeHero({ t, locale, variant = 1 }: { t: Dictionary["home"]; locale: Locale; variant?: HeroVariant }) {
  /* Varianta 2: ecran împărțit — text pe alb, implantul pe un panou negru până la marginea ecranului */
  if (variant === 2) {
    return (
      <section className="relative overflow-hidden bg-white">
        <div className="grid lg:min-h-[calc(100svh-120px)] lg:grid-cols-2">
          <div className="flex items-center bg-gradient-to-b from-[#f5f8f2] to-white px-4 py-14 lg:py-20 lg:pl-[max(1rem,calc((100vw-1224px)/2+1rem))] lg:pr-14">
            <div className="max-w-[600px]">
              <Intro t={t} locale={locale} />
            </div>
          </div>
          <div className="relative min-h-[460px] overflow-hidden bg-[#121313]">
            <img src={IMG} alt="ROOTT R" fetchPriority="high" className="absolute inset-0 h-full w-full object-contain" />
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#0b0c0c_100%)]" />
            <SeriesTag />
          </div>
        </div>
        <div className="mx-auto max-w-[1224px] px-4 py-10 lg:py-14">
          <Badges t={t} />
        </div>
      </section>
    );
  }

  /* Varianta 3: tot primul ecran pe negru, ca la prezentările de implanturi premium */
  if (variant === 3) {
    return (
      <section className="relative overflow-hidden bg-[#0b0c0d] text-white">
        <div aria-hidden className="pointer-events-none absolute right-[-10%] top-[-20%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.10),transparent_60%)]" />
        <div aria-hidden className="pointer-events-none absolute -left-40 bottom-[-30%] h-[520px] w-[520px] rounded-full bg-lime/10 blur-[140px]" />
        <div className="relative mx-auto grid max-w-[1224px] items-center gap-6 px-4 pt-12 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:pt-10">
          <Intro t={t} locale={locale} dark />
          <div className="relative mx-auto w-full max-w-[520px]">
            <img
              src={IMG}
              alt="ROOTT R"
              fetchPriority="high"
              className="w-full [mask-image:radial-gradient(ellipse_70%_75%_at_50%_48%,#000_55%,transparent_100%)]"
            />
          </div>
        </div>
        <div className="relative mx-auto max-w-[1224px] px-4 pb-14 pt-4 lg:pb-20">
          <Badges t={t} dark />
        </div>
      </section>
    );
  }

  /* Varianta 1: fundal luminos, implantul pe un card negru premium */
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f3f7f0] via-[#f8faf6] to-white">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full bg-lime/20 blur-[120px]" />
      <div className="relative mx-auto grid max-w-[1224px] items-center gap-10 px-4 pb-10 pt-12 md:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:pb-16 lg:pt-20">
        <Intro t={t} locale={locale} />
        <div className="relative mx-auto w-full max-w-[500px]">
          <div aria-hidden className="absolute -inset-6 rounded-[48px] bg-gradient-to-br from-lime/30 via-transparent to-sky/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[36px] bg-[#121313] shadow-[0_50px_100px_-40px_rgba(11,13,16,0.75)] ring-1 ring-black/10">
            <img src={IMG} alt="ROOTT R" fetchPriority="high" className="aspect-[1034/1226] w-full object-cover" />
            <SeriesTag />
          </div>
        </div>
      </div>
      <div className="relative mx-auto max-w-[1224px] px-4 pb-14 lg:pb-20">
        <Badges t={t} />
      </div>
    </section>
  );
}
