/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { lines, pick } from "@/lib/catalog";
import Breadcrumbs from "@/components/Breadcrumbs";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: `${getDictionary(locale).shop.title} — roott.md` };
}

/** /catalog — lista liniilor de produse (pe roott.ru pagina nu există, aici e un index util). */
export default async function CatalogIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  return (
    <main className="mb-[120px]">
      <Breadcrumbs items={[{ label: t.common.home, href: `/${locale}` }, { label: t.common.shop }]} />
      <div className="mx-auto max-w-[1256px] px-4">
        <h1 className="mb-8 text-[24px] font-bold leading-[44px]">{t.shop.linesTitle}</h1>
        <div className="grid gap-px bg-mist sm:grid-cols-2 lg:grid-cols-4">
          {lines.map((l) => (
            <Link key={l.slug} href={`/${locale}/catalog/${l.slug}`} className="group flex flex-col bg-white p-6 transition-colors hover:bg-[#fafafa]">
              <span className="flex h-[220px] items-center justify-center overflow-hidden rounded-[5px] bg-black">
                {l.hero?.img2 && <img src={l.hero.img2} alt={l.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />}
              </span>
              <span className="mt-4 text-[18px] font-semibold">{l.title}</span>
              <span className="mt-1 text-[14px] font-light leading-5 text-[#42454a]">{pick(l.hero?.title, locale)}</span>
              <span className="mt-4 text-[13px] text-[#42454a]">{Object.keys(l.items).length} →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
