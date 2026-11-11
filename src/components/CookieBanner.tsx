"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

const KEY = "roott-cookie-ok";

export default function CookieBanner({ t, locale }: { t: Dictionary["cookie"]; locale: Locale }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      setShow(localStorage.getItem(KEY) !== "1");
    } catch {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-32px)] max-w-[620px] -translate-x-1/2 items-center gap-4 rounded-[5px] bg-white px-5 py-4 text-[12px] shadow-[0_6px_30px_rgba(0,0,0,0.18)]">
      <p className="flex-1 leading-snug">
        {t.text}{" "}
        <Link href={`/${locale}/privacy-policy`} className="underline">
          {t.link}
        </Link>
      </p>
      <button
        type="button"
        onClick={() => {
          try {
            localStorage.setItem(KEY, "1");
          } catch {}
          setShow(false);
        }}
        className="rounded-[5px] bg-black px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-black/80"
      >
        {t.ok}
      </button>
    </div>
  );
}
