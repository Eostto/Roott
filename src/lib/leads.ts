import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Salvează cererile (formulare, comenzi) în folderul data/leads/ al proiectului
 * și, dacă sunt setate variabilele TELEGRAM_BOT_TOKEN și TELEGRAM_CHAT_ID,
 * trimite și un mesaj în Telegram.
 */
export async function storeLead(kind: "lead" | "order", payload: Record<string, unknown>, text: string) {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const dir = path.join(process.cwd(), "data", "leads");
  try {
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, `${stamp}-${kind}.json`), JSON.stringify({ kind, at: new Date().toISOString(), ...payload }, null, 2));
  } catch (e) {
    console.error("[leads] nu s-a putut salva:", e);
  }
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (token && chat) {
    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chat_id: chat, text: text.slice(0, 4000) }),
      });
    } catch (e) {
      console.error("[leads] Telegram:", e);
    }
  }
}

export const clean = (v: unknown, max = 500) => String(v ?? "").replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max);
