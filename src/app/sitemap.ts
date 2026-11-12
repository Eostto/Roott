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
  // fără paginile care doar redirecționează (vezi [...rest]/page.tsx)
  const skip = (p: string) =>
    ["/about", "/about/laboratory", "/stock", "/specialist"].includes(p) ||
    ["/dealer", "/events", "/specialist/doctors-training-center", "/stock/"].some((x) => p === x || p.startsWith(x.endsWith("/") ? x : x + "/"));
  const unique = [...new Set(paths)].filter((p) => !skip(p));
  return unique.flatMap((p) =>
    locales.map((locale) => ({
      url: `${BASE}/${locale}${p}`,
      changeFrequency: (p === "" || p.startsWith("/catalog") ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: p === "" ? 1 : p === "/catalog" || /^\/catalog\/[^/]+$/.test(p) ? 0.9 : p.startsWith("/catalog/") ? 0.7 : 0.5,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${BASE}/${l}${p}`])) },
    })),
  );
}
