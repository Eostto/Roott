"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/i18n/config";
import { sendLead } from "@/lib/sendLead";

type T = {
  title: string; text: string; name: string; phone: string; email: string; clinic: string; city: string;
  spec: string; specs: string[]; years: string; message: string; consent: string; privacy: string; send: string; ok: string; err: string;
};

const input = "w-full rounded-[5px] bg-white px-5 py-[15px] text-[14px] leading-5 text-[#42454a] outline-none placeholder:text-[#42454a]/70 focus:ring-2 focus:ring-lime";

export default function AmbassadorForm({ t, locale }: { t: T; locale: Locale }) {
  const [state, setState] = useState<"idle" | "sending" | "ok">("idle");
  return (
    <section id="aplica" className="scroll-mt-24 bg-slate px-4 py-16 text-white md:py-24">
      <div className="mx-auto max-w-[640px]">
        <h2 className="text-center text-[26px] font-semibold md:text-[32px]">{t.title}</h2>
        <p className="mx-auto mt-3 max-w-[520px] text-center text-[15px] leading-6 text-white/80">{t.text}</p>
        {state === "ok" ? (
          <p className="mt-10 rounded-[5px] bg-white/10 p-6 text-center text-[16px]">{t.ok}</p>
        ) : (
          <form
            className="mt-8 space-y-[10px]"
            onSubmit={async (e) => {
              e.preventDefault();
              setState("sending");
              try {
                await sendLead(e.currentTarget, "ambassador");
                setState("ok");
              } catch {
                setState("idle");
                alert(t.err);
              }
            }}
          >
            <div className="grid gap-[10px] sm:grid-cols-2">
              <input required name="name" placeholder={t.name} className={input} />
              <input required name="phone" type="tel" placeholder={t.phone} className={input} />
              <input required name="email" type="email" placeholder={t.email} className={input} />
              <input name="clinic" placeholder={t.clinic} className={input} />
              <input name="city" placeholder={t.city} className={input} />
              <input name="experience" placeholder={t.years} className={input} />
            </div>
            <select required name="specialization" defaultValue="" className={`${input} h-[50px] appearance-none`}>
              <option value="" disabled>{t.spec}</option>
              {t.specs.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <textarea name="message" rows={4} placeholder={t.message} className={`${input} resize-none`} />
            <label className="flex items-start gap-3 pt-2 text-[12px] leading-4 text-white/80">
              <input required type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-white" />
              <span>
                {t.consent}{" "}
                <Link href={`/${locale}/privacy-policy`} className="underline">{t.privacy}</Link>
              </span>
            </label>
            <div className="flex justify-center pt-4">
              <button type="submit" disabled={state === "sending"} className="btn-white disabled:opacity-60">{t.send}</button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
