import { NextResponse } from "next/server";
import { getProduct } from "@/lib/catalog";
import { clean, storeLead } from "@/lib/leads";

type Body = { locale?: string; customer?: Record<string, string>; items?: { id: number; qty: number }[] };

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const c = Object.fromEntries(Object.entries(body.customer ?? {}).slice(0, 12).map(([k, v]) => [clean(k, 40), clean(v, 1000)]));
    if (!c.name || !c.phone) return NextResponse.json({ ok: false, error: "missing" }, { status: 400 });
    // prețurile se recalculează pe server, din catalog
    const items = (body.items ?? []).slice(0, 200).flatMap((it) => {
      const p = getProduct(it.id);
      const qty = Math.max(1, Math.min(999, Math.floor(Number(it.qty) || 1)));
      return p ? [{ id: p.id, name: p.name, line: p.line, qty, price: p.price ?? 0, sum: Math.round((p.price ?? 0) * qty * 100) / 100 }] : [];
    });
    if (!items.length) return NextResponse.json({ ok: false, error: "empty" }, { status: 400 });
    const total = Math.round(items.reduce((a, x) => a + x.sum, 0) * 100) / 100;
    const text =
      `🛒 Comandă nouă (roott.md)\n${c.name} · ${c.phone}${c.email ? " · " + c.email : ""}\n` +
      (c.company ? `Clinică: ${c.company}\n` : "") + (c.city ? `Oraș: ${c.city}\n` : "") + (c.address ? `Adresă: ${c.address}\n` : "") +
      items.map((x) => `• ${x.name} (${x.line}) × ${x.qty} = ${x.sum} €`).join("\n") + `\nTotal: ${total} €` + (c.comment ? `\nComentariu: ${c.comment}` : "");
    await storeLead("order", { locale: clean(body.locale, 5), customer: c, items, total }, text);
    return NextResponse.json({ ok: true, total });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
