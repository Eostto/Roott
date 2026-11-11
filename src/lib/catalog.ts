import catalogData from "@/data/catalog/catalog.json";
import productsData from "@/data/catalog/products.json";
import type { Locale } from "@/i18n/config";

export type T = { ru: string; ro: string };
export const pick = (t: T | null | undefined, locale: Locale) => (t ? t[locale] || t.ru : "");

export type Block =
  | { type: "h1" | "h2" | "h3" | "h4" | "p"; text: T; id: string | null }
  | { type: "table"; lengths: string[]; rows: { d: string; cells: (number | null)[] }[] }
  | { type: "grid"; items: number[] };

export type LineItem = { name: string; caption: T; thumb: string | null };
export type Line = {
  slug: string;
  title: string;
  hero: { logo: string | null; img1: string | null; img2: string | null; title: T; text: T; btn: string | null } | null;
  blocks: Block[];
  items: Record<string, LineItem>;
};
export type MenuEntry = { line: string; slug: string; subs: { t: T; anchor: string; lvl: number }[] };

export type Product = {
  id: number;
  line: string;
  lines: string[];
  name: string;
  price: number | null;
  props: { l: T; v: T }[];
  sizes: { n: string; id: number }[];
  image: string | null;
  thumb: string | null;
  caption: T;
  d: number | null;
  p: number | null;
  video: string | null;
  related: { anchor: string; img: string | null; t: T }[];
};

const catalog = catalogData as unknown as { menu: MenuEntry[]; lines: Line[] };
const products = productsData as unknown as {
  texts: { details: { ru: string[]; ro: string[] }; packaging: { ru: string[]; ro: string[] } };
  products: Record<string, Product>;
};

export const menu = catalog.menu;
export const lines = catalog.lines;
export const getLine = (slug: string) => lines.find((l) => l.slug === slug);
export const getProduct = (id: number | string) => products.products[String(id)];
export const allProducts = () => Object.values(products.products);
export const detailsHtml = (i: number | null, locale: Locale) => (i == null ? "" : products.texts.details[locale][i] ?? products.texts.details.ru[i]);
export const packagingHtml = (i: number | null, locale: Locale) => (i == null ? "" : products.texts.packaging[locale][i] ?? products.texts.packaging.ru[i]);

/** Aliasuri de pe roott.ru: /catalog/roott-c-cs/ → roott-c etc. */
export const LINE_ALIASES: Record<string, string> = { "roott-c-cs": "roott-c", "roott-b-bs": "roott-b" };

export function formatPrice(eur: number | null, locale: Locale) {
  if (eur == null) return "";
  return new Intl.NumberFormat(locale === "ro" ? "ro-RO" : "ru-RU", { style: "currency", currency: "EUR", currencyDisplay: "narrowSymbol", minimumFractionDigits: eur % 1 ? 2 : 0 }).format(eur);
}
