/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { allProducts, detailsHtml, formatPrice, getLine, getProduct, packagingHtml, pick } from "@/lib/catalog";
import Breadcrumbs from "@/components/Breadcrumbs";
import AddToCart from "@/components/shop/AddToCart";
import ProductAccordions from "@/components/shop/ProductAccordions";

type Params = Promise<{ locale: string; slug: string; id: string }>;

export function generateStaticParams() {
  return locales.flatMap((locale) => allProducts().map((p) => ({ locale, slug: p.line, id: String(p.id) })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, id } = await params;
  const p = getProduct(id);
  if (!p || !isLocale(locale)) return {};
  const caption = pick(p.caption, locale);
  return { title: `${p.name}${caption ? " " + caption : ""} — ROOTT ${getLine(p.line)?.title.replace("ROOTT ", "") ?? ""} | roott.md` };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { locale, slug, id } = await params;
  if (!isLocale(locale)) notFound();
  const p = getProduct(id);
  if (!p) notFound();
  if (slug !== p.line && !p.lines.includes(slug)) redirect(`/${locale}/catalog/${p.line}/${p.id}`);
  const t = getDictionary(locale);
  const line = getLine(p.line)!;

  const panels = [
    ...(p.d != null && detailsHtml(p.d, locale)
      ? [{ key: "d", label: t.shop.detailsTitle, title: `${t.shop.detailsTitle} ${p.name}`, html: detailsHtml(p.d, locale) }]
      : []),
    ...(p.p != null && packagingHtml(p.p, locale)
      ? [{ key: "p", label: t.shop.packagingTitle, title: `${t.shop.packagingModal} ${p.name}`, html: packagingHtml(p.p, locale) }]
      : []),
  ];
  const caption = pick(p.caption, locale);
  const href = `/${locale}/catalog/${p.line}/${p.id}`;

  return (
    <main>
      <Breadcrumbs
        items={[
          { label: t.common.home, href: `/${locale}` },
          { label: t.common.shop, href: `/${locale}/catalog` },
          { label: line.title, href: `/${locale}/catalog/${line.slug}` },
          { label: p.name },
        ]}
      />

      <section className="mb-20 grid lg:grid-cols-2">
        <div className="relative flex min-h-[260px] items-center justify-center bg-mist p-8 lg:min-h-[480px] lg:items-start">
          {p.image && (
            <div className="flex w-full justify-center lg:sticky lg:top-28 lg:pt-12">
              <img src={p.image} alt={`${p.name} ${caption}`} className="h-auto max-h-[220px] w-auto max-w-[70%] object-contain lg:max-h-[340px] lg:max-w-[380px]" />
            </div>
          )}
        </div>

        <div className="px-4 pt-10 lg:max-w-[618px] lg:pl-[46px] lg:pr-4 lg:pt-[60px]">
          <div className="flex items-baseline justify-between gap-4">
            <h1 className="text-[26px] font-semibold leading-[30px]">{p.name}</h1>
            {p.price != null && <div className="whitespace-nowrap text-right text-[16px] font-light leading-5">{formatPrice(p.price, locale)}</div>}
          </div>
          <div className="mb-[7px] mt-[17px] h-px bg-mist" />

          <div className="mt-3">
            {p.props.map((pr, i) => (
              <div key={i} className="my-[5px] flex gap-2 text-[14px] leading-5">
                <span>{pick(pr.l, locale)}:</span>
                <span className="font-light text-[#42454a]">{pick(pr.v, locale)}</span>
              </div>
            ))}
          </div>

          {p.sizes.length > 1 && (
            <>
              <div className="mb-[7px] mt-[17px] h-px bg-mist" />
              <p className="text-[16px] leading-5">{t.shop.sizes}</p>
              <div className="mb-[30px] mt-[13px] flex flex-wrap gap-[5px]">
                {p.sizes.map((s) =>
                  s.id === p.id ? (
                    <span key={s.id} className="rounded-[5px] border border-[#96979f] bg-[#42454a] px-[10px] py-[10px] text-[14px] font-light leading-[18px] text-white">
                      {s.n}
                    </span>
                  ) : (
                    <Link
                      key={s.id}
                      href={`/${locale}/catalog/${getProduct(s.id)?.line ?? p.line}/${s.id}`}
                      className="rounded-[5px] border border-[#96979f] bg-white px-[10px] py-[10px] text-[14px] font-light leading-[18px] text-[#42454a] transition-colors hover:bg-[#42454a] hover:text-white"
                    >
                      {s.n}
                    </Link>
                  ),
                )}
              </div>
            </>
          )}

          <AddToCart
            item={{ id: p.id, name: p.name, caption, price: p.price, image: p.thumb ?? p.image, href }}
            label={t.shop.addToCart}
            inCart={t.shop.inCart}
          />

          <ProductAccordions panels={panels} />

          {p.video && (
            <div className="mt-2 aspect-video w-full max-w-[500px]">
              <iframe
                src={p.video}
                title={p.name}
                className="h-full w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </section>

      {p.related.length > 0 && (
        <section className="mb-[143px]">
          <h3 className="mx-auto mb-5 max-w-[1256px] px-4 text-[21px] font-semibold leading-[30px]">{t.shop.related}</h3>
          <div className="grid grid-cols-2 gap-px md:grid-cols-3 lg:grid-cols-5">
            {p.related.map((r) => (
              <Link key={r.anchor} href={`/${locale}/catalog/${p.line}#${r.anchor}`} className="group flex flex-col gap-3">
                <span className="flex aspect-square items-center justify-center bg-mist p-[18%] transition-colors group-hover:bg-[#e6e6ea]">
                  {r.img && <img src={r.img} alt={pick(r.t, locale)} loading="lazy" className="max-h-full max-w-full object-contain" />}
                </span>
                <span className="ml-[30px] text-[14px] leading-5">{pick(r.t, locale)}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
