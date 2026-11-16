/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { Arrow, Check } from "../icons";

const TILES = [
  { src: "/images/roott/n-series/N2A45.webp", alt: "N2A45" },
  { src: "/images/roott/n-series/NGFM2.webp", alt: "NGFM2" },
  { src: "/images/roott/n-series/N1A60.webp", alt: "N1A60" },
  { src: "/images/roott/n-series/NTOM.webp", alt: "NTOM" },
];

/** Noutatea lunii: multi-unit N / NS. */
export default function NewLine({ t, locale }: { t: Dictionary["home"]; locale: Locale }) {
  return (
    <section className="bg-white pb-16 md:pb-24">
      <div className="mx-auto max-w-[1224px] px-4">
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#eef6e8] via-[#f6f8f3] to-[#eaf4f9] p-6 md:p-12 lg:p-16">
          <div aria-hidden className="absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full bg-white/60 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <span className="inline-flex items-center rounded-full bg-[#0e1525] px-3.5 py-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-lime">{t.newBadge}</span>
              <h2 className="mt-5 text-[30px] font-bold leading-[1.12] tracking-[-0.015em] text-[#0e1525] md:text-[44px]">{t.newTitle}</h2>
              <p className="mt-5 text-[16px] leading-7 text-[#4a5160]">{t.newText}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {t.newPoints.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-[14px] font-medium text-[#0e1525]">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#3d7f20] shadow-sm">
                      <Check className="h-4 w-4" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}/catalog/roott-r#multi-unit-n`}
                className="group mt-9 inline-flex items-center gap-3 rounded-full bg-[#0e1525] px-8 py-4 text-[15px] font-semibold text-white transition hover:bg-[#1c2740]"
              >
                {t.newBtn}
                <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {TILES.map((tile, i) => (
                <div
                  key={tile.src}
                  className={`flex aspect-square items-center justify-center rounded-[28px] bg-white/85 p-6 shadow-[0_20px_50px_-30px_rgba(14,21,37,0.45)] ring-1 ring-black/5 ${i % 2 === 1 ? "translate-y-6" : ""}`}
                >
                  <img src={tile.src} alt={tile.alt} loading="lazy" className="h-full w-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
