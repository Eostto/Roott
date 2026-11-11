"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useRef } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { Arrow, ArrowLeft } from "./icons";

/** Sliderul cu promoții: câte 2 pe ecran, 480px înălțime. */
const PROMO_SLUGS = [
  "roott-green-dent-spetsialnoe-predlozhenie-na-oborudovanie-i-implantaty",
  "akciya-roott-hirurgicheskij-nabor-i-obuchenie-v-podarok",
  "oborudovanie-dlya-kliniki-implantaty-roott-v-podarok",
  "dvukhdnevnyy-prodvinutyy-kurs-v-klinike-novichenko-v-podarok-anapa",
  "vebinar-ot-vedushchikh-spikerov-vpodarok",
];

export default function Promotions({ t, locale }: { t: Dictionary["promos"]; locale: Locale }) {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * (el.clientWidth / (el.clientWidth >= 768 ? 2 : 1)), behavior: "smooth" });
  };

  const arrow =
    "absolute top-1/2 z-10 flex h-[45px] w-[45px] -translate-y-1/2 items-center justify-center rounded-full border border-white/70 text-white transition-colors hover:bg-white hover:text-black";

  return (
    <section className="relative bg-black">
      <div ref={track} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto">
        {t.items.map((p, i) => (
          <article
            key={p.title}
            className="relative flex h-[400px] w-full shrink-0 snap-start items-end justify-center overflow-hidden text-white md:h-[480px] md:w-1/2"
          >
            <img src={p.image} alt={p.title} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/45" />
            <div className="relative px-6 pb-[60px] text-center">
              {p.tag && (
                <span className="mb-4 inline-block rounded-[5px] bg-black/70 px-3 py-1.5 text-[12px] font-semibold">
                  {p.tag}
                </span>
              )}
              <h3 className="mx-auto max-w-[420px] text-[20px] font-semibold leading-[1.3] md:text-[24px]">{p.title}</h3>
              <Link
                href={`/${locale}/stock/${PROMO_SLUGS[i] ?? ""}`}
                className="mt-6 inline-flex items-center justify-center rounded-[5px] border border-white px-[60px] py-3 text-[14px] font-semibold transition-colors hover:bg-white hover:text-black"
              >
                {t.more}
              </Link>
            </div>
          </article>
        ))}
      </div>
      <button type="button" aria-label="Prev" onClick={() => scroll(-1)} className={`${arrow} left-[30px]`}>
        <ArrowLeft className="h-5 w-5" />
      </button>
      <button type="button" aria-label="Next" onClick={() => scroll(1)} className={`${arrow} right-[30px]`}>
        <Arrow className="h-5 w-5" />
      </button>
    </section>
  );
}
