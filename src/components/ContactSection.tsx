"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { Chevron } from "./icons";
import { sendLead } from "@/lib/sendLead";

const input =
  "w-full rounded-[5px] bg-white px-5 py-[15px] text-[14px] leading-5 text-[#42454a] outline-none placeholder:text-[#42454a]/70 focus:ring-2 focus:ring-lime";

/** „Aveți întrebări? Scrieți-ne” — poză în stânga, formular pe fundal închis în dreapta. */
export default function ContactSection({ t, locale }: { t: Dictionary["contact"]; locale: Locale }) {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="grid bg-slate lg:grid-cols-2">
      <div className="relative hidden min-h-[667px] bg-white lg:block">
        <img src="/images/roott/contact.png" alt="ROOTT" className="absolute inset-0 h-full w-full object-cover" />
      </div>

      <div className="flex justify-center px-4 pb-[80px] pt-[80px] text-white lg:pb-[114px] lg:pt-[129px]">
        <div className="w-full max-w-[556px]">
          <p className="text-center text-[14px]">{t.title}</p>
          <p className="mt-1 text-center text-[24px] font-semibold md:text-[28px]">{t.subtitle}</p>

          {sent ? (
            <p className="mt-10 rounded-[5px] bg-white/10 p-6 text-center text-[16px]">{t.success}</p>
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
                  className="h-12 w-full appearance-none rounded-[5px] bg-white px-[15px] pr-10 text-[14px] text-black outline-none focus:ring-2 focus:ring-lime"
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
              <label className="flex items-start gap-3 pt-2 text-[12px] leading-4 text-white/80">
                <input required type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-white" />
                <span>
                  {t.consent}{" "}
                  <Link href={`/${locale}/privacy-policy`} className="underline">
                    {t.privacy}
                  </Link>
                </span>
              </label>
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="rounded-[5px] border border-black bg-black px-[50px] py-3 text-[14px] leading-[18px] text-white transition-colors hover:border-white hover:bg-white hover:text-black"
                >
                  {t.send}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
