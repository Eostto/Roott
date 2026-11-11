/** Trimite un formular către /api/lead (salvat în data/leads + Telegram opțional). */
export async function sendLead(form: HTMLFormElement, name: string) {
  const fields: Record<string, string> = {};
  new FormData(form).forEach((v, k) => {
    if (typeof v === "string" && v.trim()) fields[k] = v.trim();
  });
  const r = await fetch("/api/lead", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ page: location.pathname, form: name, fields }),
  });
  if (!r.ok) throw new Error("lead failed");
}
