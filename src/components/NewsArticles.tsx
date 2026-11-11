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
  const h2 = "text-[24px] font-semibold leading-tight text-[#222222] md:text-[28px]";

  return (
    <section className="bg-white py-12 md:py-[60px]">
      <div className="mx-auto grid max-w-[1224px] px-4 lg:grid-cols-[1fr_300px] lg:px-0">
        <div className="lg:pr-10">
          {/* Noutăți */}
          <h2 className={h2}>{news.title}</h2>
          <div className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {news.items.map((n) => (
              <Link key={n.href} href={L(n.href)} className="group flex gap-[15px]">
                <img
                  src={n.image}
                  alt={n.title}
                  className="h-[90px] w-[90px] shrink-0 rounded-[5px] bg-mist object-cover"
                />
                <span className="pt-1">
                  <span className="block text-[14px] leading-5 text-black group-hover:underline">{n.title}</span>
                  <span className="mt-2 block text-[12px] text-muted">{n.date}</span>
                </span>
              </Link>
            ))}
          </div>

          {/* Articole */}
          <h2 className={`${h2} mt-14`}>{articles.title}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {articles.items.map((a) => (
              <article key={a.href} className="flex flex-col rounded-[5px] border border-mist bg-white">
                <img
                  src={a.image}
                  alt={a.title}
                  className="h-[158px] w-full rounded-t-[5px] bg-mist object-cover"
                />
                <div className="flex flex-1 flex-col p-[10px]">
                  <div className="flex justify-between text-[11px] text-muted">
                    <span>{a.date}</span>
                    <span>{articles.tag}</span>
                  </div>
                  <h3 className="mt-2 flex-1 text-[13px] leading-[18px]">{a.title}</h3>
                  <Link
                    href={L(a.href)}
                    className="mt-4 flex items-center justify-center rounded-[5px] border border-black py-[9px] text-[13px] font-semibold transition-colors hover:bg-black hover:text-white"
                  >
                    {articles.read}
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <Link
            href={L("/articles")}
            className="mt-6 inline-flex items-center justify-center rounded-[5px] bg-coal px-[60px] py-[11px] text-[14px] font-semibold leading-5 text-white transition-opacity hover:opacity-80"
          >
            {articles.all}
          </Link>
        </div>

        {/* Rețele sociale */}
        <aside className="mt-12 border-black/10 lg:mt-0 lg:border-l lg:pl-6">
          <p className="text-[20px] font-semibold text-[#222222]">{news.socialTitle}</p>
          <p className="mt-3 max-w-[200px] text-[14px] leading-5">{news.socialText}</p>
          <div className="mt-5">
            <SocialRow />
          </div>
        </aside>
      </div>
    </section>
  );
}
