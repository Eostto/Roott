/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { menu, pick, type Line, type LineItem } from "@/lib/catalog";
import Breadcrumbs from "../Breadcrumbs";
import ShopSidebar from "./ShopSidebar";
import { hasLinePage } from "../legacy/LinePage";
import { SHOW_PRICES } from "@/lib/company";

function Item({ id, item, href, buy, wide }: { id: number; item: LineItem; href: string; buy: string; wide?: boolean }) {
  return (
    <Link
      href={href}
      title={item.name}
      className={`group grid content-start gap-[5px] p-[10px] text-center ${wide ? "w-[116px]" : ""}`}
      data-id={id}
    >
      {item.thumb ? (
        <img src={item.thumb} alt={item.name} loading="lazy" className="mx-auto h-[96px] w-full object-contain transition-transform duration-300 group-hover:scale-105" />
      ) : (
        <span className="h-[96px]" />
      )}
      <span className="text-[14px] leading-5">{item.name}</span>
      <span className="block h-[30px] rounded-[5px] bg-[#add15a] text-[14px] font-semibold leading-[30px] text-white opacity-0 transition-opacity group-hover:opacity-100 max-lg:opacity-100">
        {buy}
      </span>
    </Link>
  );
}

export default function ShopLine({ line, locale, t }: { line: Line; locale: Locale; t: Dictionary }) {
  const href = (id: number) => `/${locale}/catalog/${line.slug}/${id}`;
  const entries = menu.map((m) => ({ line: m.line, slug: m.slug, subs: m.subs.map((s) => ({ t: pick(s.t, locale), anchor: s.anchor, lvl: s.lvl })) }));
  const hero = line.hero;
  let landing = hero?.btn ? hero.btn.replace(/\/$/, "").split("/").pop() || "" : "";
  if (landing && !hasLinePage(landing)) landing = landing.replace("roott-bs-", "roott-b-").replace("roott-cs-", "roott-c-");

  return (
    <main>
      {hero && (
        <section className="relative overflow-hidden bg-black pb-16 pt-16 text-white lg:h-[643px] lg:pb-0 lg:pt-[120px]">
          <div className="relative mx-auto max-w-[1256px] px-4">
            <div className="relative z-10 max-w-[598px]">
              {hero.logo && <img src={hero.logo} alt={line.title} className="mb-[38px] h-[45px] w-auto" />}
              <h1 className="mb-4 text-[22px] font-semibold leading-[30px] md:text-[24px]">{pick(hero.title, locale)}</h1>
              <p className="max-w-[530px] text-[14px] leading-5">{pick(hero.text, locale)}</p>
              {landing && hasLinePage(landing) && (
                <Link
                  href={`/${locale}/catalog/${landing}`}
                  className="mt-10 inline-block rounded-[5px] bg-white px-[60px] py-3 text-[15px] font-semibold leading-5 text-black transition-opacity hover:opacity-85"
                >
                  {t.shop.more}
                </Link>
              )}
            </div>
          </div>
          {hero.img2 && (
            <img
              src={hero.img2}
              alt=""
              aria-hidden
              className="pointer-events-none mx-auto mt-8 w-full max-w-[640px] lg:absolute lg:left-[calc(50%-272px)] lg:top-[-96px] lg:mt-0 lg:w-[1224px] lg:max-w-none"
            />
          )}
        </section>
      )}

      <Breadcrumbs
        items={[
          { label: t.common.home, href: `/${locale}` },
          { label: t.common.shop, href: `/${locale}/catalog` },
          { label: line.title },
        ]}
      />

      <section className="mb-[120px]">
        <div className="mx-auto grid max-w-[1256px] items-start gap-x-5 gap-y-[30px] px-4 lg:grid-cols-[200px_minmax(0,1fr)]">
          <ShopSidebar entries={entries} current={line.slug} locale={locale} title={t.shop.catalogTitle} choose={t.shop.chooseCategory} />

          <div className="min-w-0">
            {line.blocks.map((b, i) => {
              if (b.type === "h1") return <h1 key={i} className="text-[24px] font-bold leading-[44px]">{pick(b.text, locale)}</h1>;
              if (b.type === "h2")
                return (
                  <h2 key={i} id={b.id ?? undefined} className="mb-5 scroll-mt-[90px] text-[19px] leading-9 text-[#5d8d74]">
                    {pick(b.text, locale)}
                  </h2>
                );
              if (b.type === "h3" || b.type === "h4")
                return (
                  <h3 key={i} id={b.id ?? undefined} className="scroll-mt-[90px] text-[16px] leading-[30px]">
                    {pick(b.text, locale)}
                  </h3>
                );
              if (b.type === "p") return <p key={i} className="mb-4 text-[14px] leading-5">{pick(b.text, locale)}</p>;
              if (b.type === "table")
                return (
                  <div key={i} className="mb-[60px] overflow-x-auto">
                    <div className="grid w-max gap-5">
                      <div className="grid items-center text-center text-[16px] font-semibold" style={{ gridTemplateColumns: `60px repeat(${b.lengths.length}, 116px)` }}>
                        <div className="sticky left-0 z-[1] h-full bg-white" />
                        {b.lengths.map((len) => (
                          <div key={len} className="py-5">{len}</div>
                        ))}
                      </div>
                      {b.rows.map((r) => (
                        <div key={r.d} className="grid border-b border-mist" style={{ gridTemplateColumns: `60px repeat(${b.lengths.length}, 116px)` }}>
                          <div className="sticky left-0 z-[1] grid items-center bg-white text-center text-[16px] font-semibold">{r.d}</div>
                          {Array.from({ length: b.lengths.length }, (_, ci) => {
                            const id = r.cells[ci];
                            const item = id != null ? line.items[String(id)] : null;
                            return item && id != null ? (
                              <Item key={ci} id={id} item={item} href={href(id)} buy={t.shop.buy} wide />
                            ) : (
                              <div key={ci} />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              if (b.type === "grid")
                return (
                  <div key={i} className="mb-[60px] grid grid-cols-2 gap-y-5 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8">
                    {b.items.map((id) => {
                      const item = line.items[String(id)];
                      return item ? <Item key={id} id={id} item={item} href={href(id)} buy={t.shop.buy} /> : null;
                    })}
                  </div>
                );
              return null;
            })}
            <p className="text-[13px] font-light text-[#42454a]">{SHOW_PRICES ? t.shop.priceNote : t.shop.priceOnRequestNote}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
