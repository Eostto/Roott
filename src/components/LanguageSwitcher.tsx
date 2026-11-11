"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

export default function LanguageSwitcher({
  locale,
  light = false,
}: {
  locale: Locale;
  light?: boolean;
}) {
  const pathname = usePathname() || `/${locale}`;
  const rest = pathname.replace(/^\/(ro|ru)(?=\/|$)/, "");

  return (
    <div className="flex items-center gap-1 text-[13px] font-semibold uppercase">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className={light ? "text-white/40" : "text-black/30"}>/</span>}
          <Link
            href={`/${l}${rest}`}
            aria-current={l === locale ? "true" : undefined}
            className={
              l === locale
                ? light
                  ? "text-white"
                  : "text-black"
                : light
                  ? "text-white/50 hover:text-white"
                  : "text-black/40 hover:text-black"
            }
          >
            {l}
          </Link>
        </span>
      ))}
    </div>
  );
}
