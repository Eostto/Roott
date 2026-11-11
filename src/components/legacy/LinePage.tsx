import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { isTranslated, loadPage, pageHtml, pageIndex } from "@/lib/legacy";
import LegacyHtml from "./LegacyHtml";

export const hasLinePage = (slug: string) => !!pageIndex[`/catalog/${slug}`];
export const linePageSlugs = () => Object.keys(pageIndex).filter((p) => /^\/catalog\/[^/]+-implants-detail$/.test(p)).map((p) => p.split("/")[2]);

/** Paginile de prezentare a liniilor: /catalog/roott-r-implants-detail etc. */
export default async function LinePage({ slug, locale }: { slug: string; locale: Locale }) {
  const page = await loadPage(`/catalog/${slug}`);
  if (!page) return null;
  const t = getDictionary(locale);
  return (
    <main>
      <LegacyHtml html={pageHtml(page, locale)} locale={locale} notice={isTranslated(page, locale) ? undefined : t.common.noticeRu} />
    </main>
  );
}
