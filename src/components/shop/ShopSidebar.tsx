"use client";

import Link from "next/link";
import { useState } from "react";
import { Chevron } from "../icons";

type Entry = { line: string; slug: string; subs: { t: string; anchor: string; lvl: number }[] };

type Sub = { t: string; anchor: string; lvl: number };

function SubTree({ subs, slug, locale, onPick }: { subs: Sub[]; slug: string; locale: string; onPick: () => void }) {
  // subcategoriile de nivel 2 stau sub categoria de nivel 1 dinaintea lor
  const tree: { item: Sub; kids: Sub[] }[] = [];
  for (const s of subs) {
    if (s.lvl > 1 && tree.length) tree[tree.length - 1].kids.push(s);
    else tree.push({ item: s, kids: [] });
  }
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const link = (s: Sub, cls: string) => (
    <Link href={`/${locale}/catalog/${slug}#${s.anchor}`} onClick={onPick} className={`inline-block py-[10px] text-[16px] leading-5 text-[#6b6b6b] hover:text-black ${cls}`}>
      {s.t}
    </Link>
  );
  return (
    <ul className="pb-1">
      {tree.map((n, i) => (
        <li key={n.item.anchor}>
          <div className="flex items-center justify-between">
            {link(n.item, "pl-[10px]")}
            {n.kids.length > 0 && (
              <button type="button" aria-label={n.item.t} onClick={() => setOpenIdx(openIdx === i ? null : i)} className="p-1 text-[#6b6b6b]">
                <Chevron className={`h-3 w-3 -rotate-90 transition-transform ${openIdx === i ? "rotate-0" : ""}`} />
              </button>
            )}
          </div>
          {openIdx === i && (
            <ul>
              {n.kids.map((k) => (
                <li key={k.anchor}>{link(k, "pl-[26px] text-[15px]")}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

/** Meniul „Catalog” din stânga paginii de magazin (ca pe roott.ru). */
export default function ShopSidebar({
  entries,
  current,
  locale,
  title,
  choose,
}: {
  entries: Entry[];
  current: string;
  locale: string;
  title: string;
  choose: string;
}) {
  const [openLine, setOpenLine] = useState<string | null>(current);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <aside className="lg:sticky lg:top-[90px] lg:mt-[60px] lg:max-h-[calc(100vh-110px)] lg:overflow-y-auto">
      <p className="mb-5 hidden text-[21px] font-bold leading-5 lg:block">{title}</p>
      <button
        type="button"
        onClick={() => setMobileOpen((v) => !v)}
        className="flex h-[50px] w-full items-center justify-between rounded-[5px] bg-mist px-4 text-[16px] lg:hidden"
      >
        {choose}
        <Chevron className={`h-4 w-4 transition-transform ${mobileOpen ? "rotate-180" : ""}`} />
      </button>
      <ul className={`${mobileOpen ? "block" : "hidden"} mt-2 lg:mt-0 lg:block`}>
        {entries.map((e) => {
          const open = openLine === e.slug;
          return (
            <li key={e.slug}>
              <div className="flex items-center justify-between py-[10px] text-[16px] leading-5">
                <Link href={`/${locale}/catalog/${e.slug}`} className={e.slug === current ? "font-semibold" : "hover:opacity-60"}>
                  {e.line}
                </Link>
                {e.subs.length > 0 && (
                  <button type="button" aria-label={e.line} onClick={() => setOpenLine(open ? null : e.slug)} className="p-1">
                    <Chevron className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                )}
              </div>
              {open && <SubTree subs={e.subs} slug={e.slug} locale={locale} onPick={() => setMobileOpen(false)} />}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
