"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { Chevron } from "./icons";
import { sendLead } from "@/lib/sendLead";

const input =
  "w-full rounded-2xl border border-black/10 bg-white px-5 py-[15px] text-[14px] leading-5 text-[#0e1525] outline-none transition placeholder:text-[#6b7180] focus:border-lime focus:ring-4 focus:ring-lime/20";

/** „Aveți întrebări? Scrieți-ne” — poză în stânga, formular pe fundal închis în dreapta. */
export default function ContactSection({ t, locale }: { t: Dictionary["contact"]; locale: Locale }) {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto grid max-w-[1192px] overflow-hidden rounded-[36px] bg-[#f6f7f5] lg:grid-cols-2">
      <div className="relative hidden min-h-[620px] lg:block">
        <img src="/images/roott/contact.png" alt="ROOTT" className="absolute inset-0 h-full w-full object-cover" />
      </div>

      <div className="flex justify-center px-6 py-12 text-[#0e1525] md:px-12 lg:py-16">
        <div className="w-full max-w-[556px]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#3d7f20]">{t.title}</p>
          <p className="mt-3 text-[30px] font-bold leading-tight tracking-[-0.015em] md:text-[40px]">{t.subtitle}</p>

          {sent ? (
            <p className="mt-10 rounded-2xl bg-white p-6 text-center text-[16px] ring-1 ring-black/5">{t.success}</p>
          ) : (
            <form
              className="mt-8 space-y-[10px]"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await sendLead(e.currentTarget, "contact");
                  setSent(true);
                } catch {
                  alert(locale === "ru" ? "Не удалось отправить. Попробуйте ещё раз." : "Nu s-a putut trimite. Încercați din nou.");
                }
              }}
            >
              <div className="relative">
                <select
                  required
                  name="topic"
                  defaultValue=""
                  className="h-[52px] w-full appearance-none rounded-2xl border border-black/10 bg-white px-5 pr-10 text-[14px] text-[#0e1525] outline-none transition focus:border-lime focus:ring-4 focus:ring-lime/20"
                >
                  <option value="" disabled>
                    {t.topicPlaceholder}
                  </option>
                  {t.topics.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                <Chevron className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-black" />
              </div>
              <div className="grid gap-[10px] sm:grid-cols-2">
                <input required name="name" placeholder={t.name} className={input} />
                <input required name="email" type="email" placeholder={t.email} className={input} />
              </div>
              <textarea required name="message" rows={5} placeholder={t.message} className={`${input} resize-none`} />
              <label className="flex items-start gap-3 pt-2 text-[12px] leading-4 text-[#5a6070]">
                <input required type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-[#3d7f20]" />
                <span>
                  {t.consent}{" "}
                  <Link href={`/${locale}/privacy-policy`} className="underline">
                    {t.privacy}
                  </Link>
                </span>
              </label>
              <div className="pt-4">
                <button
                  type="submit"
                  className="rounded-full bg-[#0e1525] px-10 py-4 text-[15px] font-semibold text-white transition hover:bg-[#1c2740]"
                >
                  {t.send}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      </div>
    </section>
  );
}
