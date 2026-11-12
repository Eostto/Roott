import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { isTranslated, loadPage, pageHtml, pageIndex, pageTitle } from "@/lib/legacy";
import { seoMeta } from "@/lib/seo";
import LegacyHtml from "@/components/legacy/LegacyHtml";

/** Secțiuni care pe roott.ru redirecționează spre prima subpagină. */
const REDIRECTS: Record<string, string> = { "/about": "/about/about-us", "/about/laboratory": "/about/about-us", "/stock": "", "/specialist": "/specialist/cases" };
/** Secțiuni scoase (conținut legat de Rusia, dealeri) → pagina cea mai apropiată. */
const PREFIX_REDIRECTS: [string, string][] = [
  ["/dealer", "/ambassador"],
  ["/events", "/sobytiya"],
  ["/specialist/doctors-training-center", "/specialist/cases"],
  ["/stock/", ""],
];
function redirectFor(path: string): string | undefined {
  if (path in REDIRECTS) return REDIRECTS[path];
  return PREFIX_REDIRECTS.find(([p]) => path === p || path.startsWith(p.endsWith("/") ? p : p + "/"))?.[1];
}

type Params = Promise<{ locale: string; rest: string[] }>;

export function generateStaticParams() {
  const paths = Object.keys(pageIndex).filter((p) => !p.startsWith("/catalog/") && p !== "/");
  return locales.flatMap((locale) => paths.map((p) => ({ locale, rest: p.slice(1).split("/") })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, rest } = await params;
  if (!isLocale(locale)) return {};
  const page = await loadPage("/" + rest.join("/"));
  if (!page) return {};
  const path = "/" + rest.map(decodeURIComponent).join("/");
  const title = pageTitle(page, locale);
  const description = (locale === "ro" ? page.descRo : page.desc) || undefined;
  return { title: `${title} | roott.md`, description, ...seoMeta(locale, path, { title, description }) };
}

/** Toate paginile de conținut copiate de pe roott.ru (despre noi, dealeri, știri, evenimente…). */
export default async function LegacyRoute({ params }: { params: Params }) {
  const { locale, rest } = await params;
  if (!isLocale(locale)) notFound();
  const path = "/" + rest.map(decodeURIComponent).join("/");
  const to = redirectFor(path);
  if (to !== undefined) redirect(`/${locale}${to}`);
  const page = await loadPage(path);
  if (!page && /^\/(about\/news|sobytiya)\/[^/]+$/.test(path)) redirect(`/${locale}/${path.split("/").slice(1, -1).join("/")}`);
  if (!page) notFound();
  const t = getDictionary(locale);
  return (
    <main>
      <LegacyHtml html={pageHtml(page, locale)} locale={locale} notice={isTranslated(page, locale) ? undefined : t.common.noticeRu} />
    </main>
  );
}
