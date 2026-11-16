/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { Arrow } from "../icons";
import { SectionHead } from "./ProductLines";

/** „Sistemul de implanturi ROOTT” — poză luminoasă din fabrică + text. */
export function AboutSystem({ t, locale }: { t: Dictionary["system"]; locale: Locale }) {
  return (
    <section className="bg-[#f6f7f5] py-16 md:py-24">
      <div className="mx-auto grid max-w-[1224px] items-center gap-10 px-4 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <div className="overflow-hidden rounded-[32px] shadow-[0_40px_80px_-40px_rgba(14,21,37,0.45)]">
            <img src="/images/roott/feature-advantages.png" alt={t.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 left-6 rounded-2xl bg-white px-5 py-4 shadow-[0_20px_40px_-20px_rgba(14,21,37,0.4)] ring-1 ring-black/5 md:left-auto md:right-8">
            <p className="text-[28px] font-bold leading-none text-[#0e1525]">ISO 13485</p>
            <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#3d7f20]">MDR · CE 2797</p>
          </div>
        </div>
        <div className="pt-6 lg:pt-0">
          <SectionHead eyebrow="Swiss made" title={t.title} text={t.subtitle} />
          <div className="mt-6 space-y-4 text-[15px] leading-7 text-[#4a5160]">
            {t.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <Link
            href={`/${locale}/catalog/roott-r-implants-detail`}
            className="group mt-8 inline-flex items-center gap-3 rounded-full border border-[#0e1525]/15 bg-white px-7 py-3.5 text-[15px] font-semibold text-[#0e1525] transition hover:border-[#0e1525]/40"
          >
            {t.more}
            <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Programul „Medic-ambasador ROOTT”. */
export function AmbassadorBand({ t, eyebrow, locale }: { t: Dictionary["hero"]["dealer"]; eyebrow: string; locale: Locale }) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1224px] px-4">
        <div className="grid overflow-hidden rounded-[36px] bg-[#0e1525] text-white lg:grid-cols-2">
          <div className="relative min-h-[300px] lg:order-2">
            <img src="/images/roott/hero-system.jpg" alt={t.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1525]/60 to-transparent lg:bg-gradient-to-r lg:from-[#0e1525] lg:via-[#0e1525]/10" />
          </div>
          <div className="relative p-8 md:p-12 lg:p-16">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-lime">{eyebrow}</p>
            <h2 className="mt-4 text-[30px] font-bold leading-[1.15] tracking-[-0.015em] md:text-[40px]">{t.title}</h2>
            <p className="mt-5 text-[16px] leading-7 text-white/75">{t.text}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {t.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[13px] font-medium text-white/90">
                  {tag}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={`/${locale}/ambassador#aplica`} className="inline-flex items-center justify-center rounded-full bg-lime px-8 py-4 text-[15px] font-semibold text-[#0e1525] transition hover:bg-[#a3e77f]">
                {t.secondary}
              </Link>
              <Link href={`/${locale}/ambassador`} className="inline-flex items-center justify-center rounded-full border border-white/25 px-8 py-4 text-[15px] font-semibold text-white transition hover:bg-white/10">
                {t.primary}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Resurse: biblioteci digitale, avantaje, evenimente. */
export function Resources({ title, features, events, locale }: { title: string; features: Dictionary["features"]; events: string; locale: Locale }) {
  const items = [
    ...features.items.filter((f) => f.href !== "/ambassador").map((f) => ({ ...f, image: f.href.includes("advances") ? "/images/roott/hero-ambassador.jpg" : f.image })),
    { title: events, href: "/sobytiya", image: "/images/roott/feature-training.jpg" },
  ];
  return (
    <section className="bg-[#f6f7f5] py-16 md:py-24">
      <div className="mx-auto max-w-[1224px] px-4">
        <SectionHead title={title} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((f) => (
            <Link key={f.href} href={`/${locale}${f.href}`} className="group relative block overflow-hidden rounded-[28px] bg-white">
              <img src={f.image} alt={f.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="flex items-center justify-between gap-4 p-6">
                <h3 className="text-[18px] font-semibold leading-6 text-[#0e1525]">{f.title}</h3>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f1f3ef] text-[#0e1525] transition group-hover:bg-[#0e1525] group-hover:text-white">
                  <Arrow className="h-5 w-5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
