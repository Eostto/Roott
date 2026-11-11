import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { allProducts, lines } from "@/lib/catalog";
import { pageIndex } from "@/lib/legacy";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://roott.md";

/** Toate paginile site-ului, în ambele limbi (cu legături hreflang între ele). */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/catalog",
    "/ambassador",
    ...lines.map((l) => `/catalog/${l.slug}`),
    ...allProducts().map((p) => `/catalog/${p.line}/${p.id}`),
    ...Object.keys(pageIndex).filter((p) => p !== "/"),
  ];
  const unique = [...new Set(paths)];
  return unique.flatMap((p) =>
    locales.map((locale) => ({
      url: `${BASE}/${locale}${p}`,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${BASE}/${l}${p}`])) },
    })),
  );
}
