import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getLine, LINE_ALIASES, lines, pick } from "@/lib/catalog";
import ShopLine from "@/components/shop/ShopLine";
import LinePage, { hasLinePage, linePageSlugs } from "@/components/legacy/LinePage";
import { loadPage, pageTitle } from "@/lib/legacy";
import { seoMeta } from "@/lib/seo";

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return locales.flatMap((locale) => [
    ...lines.map((l) => ({ locale, slug: l.slug })),
    ...linePageSlugs().map((slug) => ({ locale, slug })),
  ]);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const line = getLine(slug);
  if (line) {
    const title = `${line.title} — ${pick(line.hero?.title, locale)}`;
    const description =
      locale === "ro"
        ? `${line.title}: implanturi, bonturi, componente protetice și instrumente ROOTT în Moldova. Comandă la Dent One Group, Chișinău.`
        : `${line.title}: имплантаты, абатменты, ортопедические компоненты и инструменты ROOTT в Молдове. Заказ в Dent One Group, Кишинёв.`;
    return { title: `${title} | roott.md`, description, ...seoMeta(locale, `/catalog/${slug}`, { title, description, image: line.hero?.img2 }) };
  }
  const page = hasLinePage(slug) ? await loadPage(`/catalog/${slug}`) : null;
  return page ? { title: `${pageTitle(page, locale)} | roott.md`, ...seoMeta(locale, `/catalog/${slug}`, { title: pageTitle(page, locale) }) } : {};
}

export default async function CatalogSlugPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  if (LINE_ALIASES[slug]) redirect(`/${locale}/catalog/${LINE_ALIASES[slug]}`);
  const t = getDictionary(locale);
  const line = getLine(slug);
  if (line) return <ShopLine line={line} locale={locale} t={t} />;
  if (hasLinePage(slug)) return <LinePage slug={slug} locale={locale} />;
  notFound();
}
