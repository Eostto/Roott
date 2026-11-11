/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

/** Banda gri cu implanturile ROOTT, sub header (ca pe roott.ru). */
export default function ProductStrip({
  items,
  locale,
}: {
  items: Dictionary["products"];
  locale: Locale;
}) {
  return (
    <section className="bg-mist">
      <div className="no-scrollbar flex overflow-x-auto">
        {items.map((p) => {
          const key = p.series.toLowerCase();
          return (
            <Link
              key={p.series}
              href={`/${locale}${p.href}`}
              className="group flex h-[150px] min-w-[150px] flex-1 flex-col items-center justify-center md:h-[196px]"
            >
              <img
                src={`/images/roott/product-${key}.png`}
                alt={`${p.name} ${p.series}`}
                className="h-[100px] w-auto object-contain transition-transform duration-300 group-hover:-translate-y-1 md:h-[130px]"
              />
              <img
                src={`/images/roott/product-${key}-txt.png`}
                alt=""
                className="mt-1 h-[13px] w-auto md:h-[15px]"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
