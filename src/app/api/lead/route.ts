import { NextResponse } from "next/server";
import { clean, storeLead } from "@/lib/leads";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { page?: string; form?: string; fields?: Record<string, string> };
    const fields = Object.fromEntries(Object.entries(body.fields ?? {}).slice(0, 30).map(([k, v]) => [clean(k, 60), clean(v, 2000)]));
    if (fields.comment) return NextResponse.json({ ok: true }); // câmp-capcană anti-spam (ascuns pe roott.ru)
    const text = `📩 Cerere nouă (roott.md)\nPagina: ${clean(body.page)}\n` + Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join("\n");
    await storeLead("lead", { page: clean(body.page), form: clean(body.form), fields }, text);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
