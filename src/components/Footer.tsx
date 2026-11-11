"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { useUI } from "./UIProvider";
import { COMPANY } from "@/lib/company";
import { sendLead } from "@/lib/sendLead";

/** Chat-uri din footer: WhatsApp / Telegram pe numărul firmei */
const chats = [
  { name: "Telegram", href: COMPANY.telegram, icon: "/images/roott/icon-telegram-footer.svg" },
  { name: "WhatsApp", href: COMPANY.whatsapp, icon: "/images/roott/icon-whatsapp-footer.svg" },
];

export default function Footer({ t, locale }: { t: Dictionary; locale: Locale }) {
  const { openCall } = useUI();
  const [subscribed, setSubscribed] = useState(false);
  const f = t.footer;
  const L = (h: string) => `/${locale}${h}`;

  return (
    <footer className="text-white">
      <div className="bg-coal pb-[37px] pt-[43px]">
        {/* rândul de sus: logo / telefon + buton */}
        <div className="flex flex-wrap items-center justify-between gap-6 px-4">
          <Link href={L("")} aria-label="roott.md">
            <Logo />
          </Link>
          <div className="flex flex-wrap items-center gap-6 md:gap-[60px] md:pr-[60px]">
            <a href={t.header.phoneHref} className="text-[14px]">
              {t.header.phone}
            </a>
            <button
              type="button"
              onClick={openCall}
              className="rounded-[5px] border border-white px-10 py-3 text-[14px] transition-colors hover:bg-white hover:text-black"
            >
              {t.header.callBtn}
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-10 px-4 md:grid-cols-2 lg:grid-cols-[minmax(0,330px)_1fr_1fr_1fr] lg:gap-x-[80px]">
          {/* abonare, chat-uri, căutare */}
          <div>
            <p className="text-[20px] leading-[29px] md:text-[23px]">{f.subscribeTitle}</p>
            <p className="mt-2 max-w-[230px] text-[14px] leading-5 text-white/80">{f.subscribeText}</p>
            {subscribed ? (
              <p className="mt-6 text-[14px] text-lime">✓</p>
            ) : (
              <form
                className="mt-6 max-w-[314px]"
                onSubmit={async (e) => {
                  e.preventDefault();
                  await sendLead(e.currentTarget, "newsletter").catch(() => {});
                  setSubscribed(true);
                }}
              >
                <div className="flex items-center border-b border-white/40 focus-within:border-white">
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder={f.emailPlaceholder}
                    className="w-full bg-transparent py-3 text-[14px] outline-none placeholder:text-white/50"
                  />
                  <button type="submit" aria-label="Subscribe" className="shrink-0 hover:opacity-70">
                    <img src="/images/roott/icon-arrow-circle.svg" alt="" className="h-[46px] w-[46px]" />
                  </button>
                </div>
                <label className="mt-3 flex items-start gap-2 text-[11px] leading-4 text-white/50">
                  <input required type="checkbox" className="mt-0.5 shrink-0 accent-white" />
                  <span>
                    {f.consent}{" "}
                    <Link href={L("/privacy-policy")} className="underline">
                      {t.contact.privacy}
                    </Link>
                  </span>
                </label>
              </form>
            )}

            <div className="mt-8 flex items-center gap-3 text-[14px]">
              <span>{f.chats}</span>
              {chats.map((c) => (
                <a key={c.name} href={c.href} target="_blank" rel="noopener noreferrer" aria-label={c.name} className="hover:opacity-70">
                  <img src={c.icon} alt={c.name} className="h-[30px] w-[30px]" />
                </a>
              ))}
            </div>

            <div className="mt-8 flex max-w-[314px] items-center rounded-[5px] bg-white/10 pl-4">
              <input
                placeholder={f.search}
                className="w-full bg-transparent py-3 text-[14px] outline-none placeholder:text-white/50"
              />
              <button type="button" aria-label={f.search} className="shrink-0 hover:opacity-70">
                <img src="/images/roott/icon-search.svg" alt="" className="h-12 w-12" />
              </button>
            </div>
          </div>

          {f.columns.map((col) => (
            <div key={col.title}>
              <p className="py-[7.5px] text-[16px] font-semibold leading-[22px]">{col.title}</p>
              <ul className="mt-3 space-y-[14px]">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={L(l.href)} className="text-[14px] text-white transition-opacity hover:opacity-60">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-black">
        <div className="flex flex-wrap items-center gap-x-[60px] gap-y-3 px-4 py-6 text-[12px] text-white md:text-[14px]">
          <span>
            {f.copyright} · {COMPANY.name}, {COMPANY.address[locale]}
          </span>
          <Link href={L("/privacy-policy")} className="hover:opacity-60">
            {f.privacy}
          </Link>
          <Link href={L("/impressum")} className="hover:opacity-60">
            {f.impressum}
          </Link>
          <span className="ml-auto">
            <LanguageSwitcher locale={locale} light />
          </span>
        </div>
      </div>
    </footer>
  );
}
