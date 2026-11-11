/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

/** Trei blocuri pe tot ecranul: Centrul de instruire, Tehnică dentară, Avantaje. */
export default function FeatureStack({ t, locale }: { t: Dictionary["features"]; locale: Locale }) {
  return (
    <section>
      {t.items.map((f) => (
        <div
          key={f.title}
          className="relative flex h-[100svh] max-h-[900px] min-h-[520px] items-end justify-center overflow-hidden bg-sky text-white"
        >
          <img src={f.image} alt={f.title} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/55" />
          <div className="relative pb-16 text-center md:pb-[110px]">
            <h5 className="text-[26px] font-semibold md:text-[32px]">{f.title}</h5>
            <Link
              href={`/${locale}${f.href}`}
              className="mt-6 inline-flex items-center justify-center rounded-[5px] border border-white px-[60px] py-3 text-[14px] font-semibold transition-colors hover:bg-white hover:text-black"
            >
              {t.more}
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}
