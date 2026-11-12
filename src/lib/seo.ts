import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";
import { COMPANY } from "@/lib/company";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://roott.md";

/** Canonical + hreflang (ro/ru/x-default) + Open Graph pentru o pagină. `path` fără limbă, ex. "/catalog/roott-r". */
export function seoMeta(locale: Locale, path: string, opts: { title?: string; description?: string; image?: string | null } = {}): Metadata {
  const p = path === "/" ? "" : path;
  return {
    alternates: {
      canonical: `/${locale}${p}`,
      languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}${p}`])), "x-default": `/ro${p}` },
    },
    openGraph: {
      type: "website",
      siteName: "ROOTT Moldova — roott.md",
      locale: locale === "ro" ? "ro_MD" : "ru_MD",
      url: `/${locale}${p}`,
      ...(opts.title ? { title: opts.title } : {}),
      ...(opts.description ? { description: opts.description } : {}),
      images: [opts.image || "/images/roott/hero-system.jpg"],
    },
  };
}

/** Date structurate (schema.org) pentru firmă — apar în rezultatele Google (adresă, telefon, hartă). */
export function organizationJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: "ROOTT Moldova — Dent One Group SRL",
    legalName: COMPANY.name,
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/icons/icon-512.png`,
    image: `${SITE_URL}/images/roott/hero-system.jpg`,
    description:
      locale === "ro"
        ? "Distribuitorul oficial al implanturilor dentare elvețiene ROOTT în Republica Moldova: implanturi, componente protetice, multi-unit și instrumente chirurgicale."
        : "Официальный дистрибьютор швейцарских дентальных имплантатов ROOTT в Республике Молдова: имплантаты, ортопедические компоненты, мультиюниты и хирургические инструменты.",
    email: COMPANY.email,
    telephone: "+37379660008",
    address: {
      "@type": "PostalAddress",
      streetAddress: locale === "ro" ? "str. Nicolai Zelinski 7/1" : "ул. Николая Зелинского, 7/1",
      addressLocality: locale === "ro" ? "Chișinău" : "Кишинёв",
      postalCode: "MD-2072",
      addressCountry: "MD",
    },
    areaServed: { "@type": "Country", name: "Moldova" },
    brand: { "@type": "Brand", name: "ROOTT" },
    sameAs: ["https://roott.dental", COMPANY.telegram, COMPANY.whatsapp],
    contactPoint: [{ "@type": "ContactPoint", telephone: "+37379660008", contactType: "sales", availableLanguage: ["Romanian", "Russian"] }],
  };
}

export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
