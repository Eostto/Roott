"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { useUI } from "./UIProvider";
import { Close } from "./icons";
import Messengers from "./Messengers";
import { COMPANY } from "@/lib/company";
import { sendLead } from "@/lib/sendLead";

export default function CallModal({
  t,
  consent,
}: {
  t: Dictionary["callModal"];
  consent: Dictionary["contact"];
}) {
  const { callOpen, closeCall } = useUI();
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!callOpen) return;
    setSent(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCall();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [callOpen, closeCall]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-hidden={!callOpen}
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-opacity ${
        callOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-black/60" onClick={closeCall} />
      <div
        className={`relative w-full max-w-[480px] rounded-[5px] bg-slate p-8 text-white transition-transform md:p-10 ${
          callOpen ? "translate-y-0" : "translate-y-4"
        }`}
      >
        <button type="button" aria-label="Close" onClick={closeCall} className="absolute right-4 top-4 text-white/70 hover:text-white">
          <Close />
        </button>
        <p className="text-[24px] font-semibold leading-tight">{t.title}</p>
        <p className="mt-2 text-[14px] text-white/70">{t.text}</p>

        {sent ? (
          <p className="mt-8 rounded-[5px] border border-lime/50 bg-lime/10 p-5">{consent.success}</p>
        ) : (
          <form
            className="mt-8 space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await sendLead(e.currentTarget, "call");
                setSent(true);
              } catch {
                alert(document.documentElement.lang === "ru" ? "Не удалось отправить. Позвоните нам: " + COMPANY.phone : "Nu s-a putut trimite. Sunați-ne: " + COMPANY.phone);
              }
            }}
          >
            <input name="name" placeholder={t.name} className="field" />
            <input required name="phone" type="tel" placeholder={t.phone} className="field" />
            <label className="flex items-start gap-3 text-[12px] text-white/70">
              <input required type="checkbox" className="mt-0.5 h-4 w-4 accent-lime" />
              <span>
                {consent.consent} <span className="underline">{consent.privacy}</span>
              </span>
            </label>
            <button type="submit" className="btn-white w-full">
              {t.send}
            </button>
            <div className="flex items-center justify-center gap-3 pt-2 text-[13px] text-white/70">
              <a href={COMPANY.phoneHref} className="hover:text-white">{COMPANY.phone}</a>
              <Messengers size={22} light />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
