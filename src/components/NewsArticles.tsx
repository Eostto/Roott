/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { COMPANY } from "@/lib/company";

/** Contact rapid: Telegram / WhatsApp pe numărul firmei */
export const socialLinks = [
  { name: "Telegram", href: COMPANY.telegram, icon: "/images/roott/social-tg.svg" },
  { name: "WhatsApp", href: COMPANY.whatsapp, icon: "/images/roott/tpl/assets/img/social/wa.svg" },
];

export function SocialRow() {
  return (
    <div className="flex flex-wrap gap-[10px]">
      {socialLinks.map((s) => (
        <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" title={s.name} aria-label={s.name} className="transition-opacity hover:opacity-70">
          <img src={s.icon} alt={s.name} className="h-9 w-9" />
        </a>
      ))}
    </div>
  );
}

export default function NewsArticles({
  news,
  articles,
  locale,
}: {
  news: Dictionary["news"];
  articles: Dictionary["articles"];
  locale: Locale;
}) {
  const L = (h: string) => `/${locale}${h}`;
  const h2 = "text-[28px] font-bold leading-tight tracking-[-0.015em] text-[#0e1525] md:text-[36px]";

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto grid max-w-[1224px] px-4 lg:grid-cols-[1fr_300px] lg:px-0">
        <div className="lg:pr-10">
          {/* Noutăți */}
          <h2 className={h2}>{news.title}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {news.items.map((n) => (
              <Link key={n.href} href={L(n.href)} className="group flex gap-4 rounded-2xl p-3 transition hover:bg-[#f6f7f5]">
                <img
                  src={n.image}
                  alt={n.title}
                  className="h-[96px] w-[96px] shrink-0 rounded-xl bg-mist object-cover"
                />
                <span className="pt-1">
                  <span className="block text-[15px] font-semibold leading-6 text-[#0e1525]">{n.title}</span>
                  <span className="mt-2 block text-[13px] text-[#8a8f9a]">{n.date}</span>
                </span>
              </Link>
            ))}
          </div>

          {/* Articole */}
          <h2 className={`${h2} mt-16`}>{articles.title}</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {articles.items.map((a) => (
              <article key={a.href} className="group flex flex-col overflow-hidden rounded-[24px] bg-[#f6f7f5] transition hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(14,21,37,0.45)]">
                <img
                  src={a.image}
                  alt={a.title}
                  className="h-[180px] w-full bg-mist object-cover"
                />
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex justify-between text-[12px] text-[#8a8f9a]">
                    <span>{a.date}</span>
                    <span>{articles.tag}</span>
                  </div>
                  <h3 className="mt-2 flex-1 text-[16px] font-semibold leading-6 text-[#0e1525]">{a.title}</h3>
                  <Link
                    href={L(a.href)}
                    className="mt-5 inline-flex items-center justify-center self-start rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-[#0e1525] ring-1 ring-black/10 transition group-hover:bg-[#0e1525] group-hover:text-white"
                  >
                    {articles.read}
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <Link
            href={L("/articles")}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#0e1525] px-8 py-4 text-[15px] font-semibold text-white transition hover:bg-[#1c2740]"
          >
            {articles.all}
          </Link>
        </div>

        {/* Rețele sociale */}
        <aside className="mt-12 self-start rounded-[24px] bg-[#f6f7f5] p-7 lg:mt-0">
          <p className="text-[20px] font-bold text-[#0e1525]">{news.socialTitle}</p>
          <p className="mt-3 max-w-[220px] text-[14px] leading-6 text-[#5a6070]">{news.socialText}</p>
          <div className="mt-5">
            <SocialRow />
          </div>
        </aside>
      </div>
    </section>
  );
}
