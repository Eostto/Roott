import index from "@/data/pages/_index.json";
import type { Locale } from "@/i18n/config";

export type LegacyPage = {
  path: string;
  key: string;
  title: string;
  desc: string;
  ru: string;
  ro?: string;
  titleRo?: string;
  descRo?: string;
};

/** cale (fără limbă și fără „/” final) → cheia fișierului din src/data/pages */
export const pageIndex = index as Record<string, string>;

export const normalizePath = (p: string) => ("/" + p.replace(/^\/+|\/+$/g, "")).replace(/\/index\.php$/, "") || "/";

export async function loadPage(path: string): Promise<LegacyPage | null> {
  const key = pageIndex[normalizePath(path)];
  if (!key) return null;
  try {
    const m = await import(`@/data/pages/${key}.json`);
    return (m.default ?? m) as LegacyPage;
  } catch {
    return null;
  }
}

export function pageHtml(page: LegacyPage, locale: Locale) {
  const raw = locale === "ro" && page.ro ? page.ro : page.ru;
  return raw.replaceAll("{{L}}", `/${locale}`);
}

export function pageTitle(page: LegacyPage, locale: Locale) {
  const t = locale === "ro" && page.titleRo ? page.titleRo : page.title;
  return t.replace(/TRATE/g, "ROOTT").replace(/в Москве/g, "в Молдове");
}

export const isTranslated = (page: LegacyPage, locale: Locale) => locale === "ru" || !!page.ro;
