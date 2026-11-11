import type { Locale } from "@/i18n/config";
import LegacyEnhancer from "./LegacyEnhancer";

/** Afișează conținutul original roott.ru cu stilurile lui (izolate sub .legacy). */
export default function LegacyHtml({ html, locale, notice }: { html: string; locale: Locale; notice?: string }) {
  return (
    <>
      <link rel="stylesheet" href="/legacy/roott.css" precedence="default" />
      {notice && (
        <div className="mx-auto max-w-[1256px] px-4 pt-5">
          <p className="rounded-[5px] bg-mist px-4 py-3 text-[13px] text-[#42454a]">{notice}</p>
        </div>
      )}
      <div className="legacy" dangerouslySetInnerHTML={{ __html: html }} />
      <LegacyEnhancer locale={locale} />
    </>
  );
}
