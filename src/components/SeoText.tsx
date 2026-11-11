import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { Check } from "./icons";

/** Blocul de text de la finalul paginii (fundal #F4F4F4). */
export default function SeoText({ t, locale }: { t: Dictionary["seo"]; locale: Locale }) {
  const L = (h: string) => `/${locale}${h}`;
  const h2 = "mt-12 text-[22px] font-semibold leading-[1.5] md:text-[28px]";
  const p = "mt-4 text-[15px] leading-[1.9] md:text-[16px] md:leading-[33.6px]";

  return (
    <section className="bg-paper py-14 md:py-20">
      <div className="mx-auto max-w-[1232px] px-4">
        <div className="max-w-[945px]">
          <h1 className="text-[24px] font-semibold leading-[1.5] md:text-[28px]">{t.h1}</h1>
          <p className={p}>{t.intro}</p>
          <h2 className={h2}>{t.typesTitle}</h2>
        </div>

        <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4">
          {t.types.map((ty) => (
            <li key={ty.name} className="border-b border-r border-black/10 px-4 py-[35px] text-[14px] leading-[29.4px] [&:nth-child(4n)]:border-r-0">
              {ty.name === "ROOTT S" ? (
                <span className="text-[18px] font-semibold leading-[37.8px]">{ty.name}</span>
              ) : (
                <Link
                  href={L(`/catalog/${ty.name.toLowerCase().replace(" ", "-")}`)}
                  className="text-[18px] font-semibold leading-[37.8px] underline-offset-4 hover:underline"
                >
                  {ty.name}
                </Link>
              )}
              <p>{ty.text}</p>
            </li>
          ))}
        </ul>

        <div className="max-w-[945px]">
          <h2 className={h2}>{t.catalogTitle}</h2>
          <p className={p}>
            <Link href={L("/catalog")} className="font-semibold underline">
              {t.catalogLink}
            </Link>{" "}
            {t.catalogText}
          </p>

          <h2 className={h2}>{t.advantagesTitle}</h2>
          <ul className="mt-4 space-y-2">
            {t.advantages.map((a) => (
              <li key={a} className="flex items-center gap-3 text-[15px] md:text-[16px]">
                <Check />
                {a}
              </li>
            ))}
          </ul>

          <h2 className={h2}>{t.applicationTitle}</h2>
          <p className={p}>{t.applicationText}</p>

          <h2 className={h2}>{t.trainingTitle}</h2>
          <p className={p}>{t.trainingText}</p>
        </div>
      </div>
    </section>
  );
}
