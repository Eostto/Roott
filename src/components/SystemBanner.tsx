/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

/** Blocul „Sistemul de implanturi ROOTT R” — fundal #2D3142 cu contururi, text stânga, poză dreapta. */
export default function SystemBanner({ t, locale }: { t: Dictionary["system"]; locale: Locale }) {
  return (
    <section className="relative overflow-hidden bg-slate text-white lg:h-[100svh] lg:max-h-[900px] lg:min-h-[760px]">
      <img
        src="/images/roott/system-bg.svg"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative mx-auto grid h-full max-w-[1224px] items-center gap-x-[60px] gap-y-10 px-4 py-16 lg:grid-cols-2 lg:py-0">
        <div className="text-[14px] leading-5">
          <h2 className="text-[24px] font-semibold leading-[1.2] md:text-[26px]">{t.title}</h2>
          <p className="mt-5">{t.subtitle}</p>
          {t.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="mt-5 text-white/90">
              {p}
            </p>
          ))}
          <Link
            href={`/${locale}/catalog/roott-r-implants-detail`}
            className="mt-8 inline-flex items-center justify-center rounded-[5px] border border-white px-[60px] py-3 text-[14px] font-semibold transition-colors hover:bg-white hover:text-black"
          >
            {t.more}
          </Link>
        </div>
        <img
          src="/images/roott/system.webp"
          alt={t.title}
          className="mx-auto h-auto w-full max-w-[582px]"
        />
      </div>
    </section>
  );
}
