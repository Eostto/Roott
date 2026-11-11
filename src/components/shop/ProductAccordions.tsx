"use client";

import { useEffect, useState } from "react";
import { Close } from "../icons";

type Panel = { key: string; label: string; title: string; html: string };

/** „Detalii” / „Ambalare și conținut” — se deschid într-o fereastră, ca pe roott.ru. */
export default function ProductAccordions({ panels }: { panels: Panel[] }) {
  const [open, setOpen] = useState<Panel | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!panels.length) return null;
  return (
    <>
      <div className="mt-[39px]">
        {panels.map((p) => (
          <div key={p.key}>
            <button type="button" onClick={() => setOpen(p)} className="flex w-full items-center justify-between py-[9px] text-left text-[14px] font-semibold leading-5 text-[#393c41] hover:opacity-70">
              {p.label}
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="mb-2 h-px bg-mist" />
          </div>
        ))}
      </div>

      <div className={`fixed inset-0 z-[80] flex items-center justify-center p-4 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}>
        <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(null)} />
        <div className="relative max-h-[85vh] w-full max-w-[720px] overflow-y-auto rounded-[5px] bg-white p-8 md:p-10">
          <button type="button" aria-label="Close" onClick={() => setOpen(null)} className="absolute right-4 top-4 hover:opacity-60">
            <Close />
          </button>
          {open && (
            <>
              <p className="pr-8 text-[22px] font-semibold leading-tight">{open.title}</p>
              <div className="rich mt-5 text-[14px] leading-6 text-[#42454a]" dangerouslySetInnerHTML={{ __html: open.html }} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
