/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { Arrow } from "../icons";

const SERIES_COLOR: Record<string, string> = {
  R: "#8edd65",
  M: "#4aa8e0",
  P: "#e5484d",
  C: "#f2994a",
  CS: "#f2c94c",
  B: "#c9a227",
};

export function SectionHead({ eyebrow, title, text, center = false }: { eyebrow?: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-[680px] text-center" : "max-w-[680px]"}>
      {eyebrow && <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#3d7f20]">{eyebrow}</p>}
      <h2 className="mt-3 text-[30px] font-bold leading-[1.15] tracking-[-0.015em] text-[#0e1525] md:text-[40px]">{title}</h2>
      {text && <p className="mt-4 text-[16px] leading-7 text-[#5a6070]">{text}</p>}
    </div>
  );
}

/** Liniile de implanturi ROOTT — carduri cu poză, descriere și legături. */
export default function ProductLines({ t, locale }: { t: Dictionary["home"]; locale: Locale }) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1224px] px-4">
        <SectionHead eyebrow={t.linesEyebrow} title={t.linesTitle} text={t.linesText} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.lines.map((l) => (
            <article
              key={l.series}
              className="group relative flex flex-col overflow-hidden rounded-[28px] bg-[#f5f6f4] p-6 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_30px_60px_-30px_rgba(14,21,37,0.35)] hover:ring-1 hover:ring-black/5"
            >
              <div className="flex items-center justify-between">
                <span
                  className="inline-flex h-9 min-w-9 items-center justify-center rounded-full px-3 text-[13px] font-bold text-white"
                  style={{ backgroundColor: SERIES_COLOR[l.series] ?? "#0e1525" }}
                >
                  {l.series}
                </span>
                <Link href={`/${locale}${l.shop}`} className="text-[13px] font-semibold text-[#5a6070] transition hover:text-[#0e1525]">
                  {t.lineShop} →
                </Link>
              </div>
              <Link href={`/${locale}${l.href}`} className="relative my-4 flex h-[220px] items-center justify-center">
                <span aria-hidden className="absolute h-[170px] w-[170px] rounded-full opacity-25 blur-2xl transition group-hover:opacity-40" style={{ backgroundColor: SERIES_COLOR[l.series] }} />
                <img src={l.img} alt={l.name} loading="lazy" className="relative h-full w-auto object-contain transition duration-500 group-hover:scale-[1.06]" />
              </Link>
              <h3 className="text-[22px] font-bold text-[#0e1525]">{l.name}</h3>
              <p className="mt-2 flex-1 text-[14px] leading-6 text-[#5a6070]">{l.text}</p>
              <Link href={`/${locale}${l.href}`} className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-[#0e1525]">
                {t.lineMore}
                <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
