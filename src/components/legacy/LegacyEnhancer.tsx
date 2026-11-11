"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useState } from "react";
import { useUI } from "../UIProvider";
import { Arrow, ArrowLeft, Close } from "../icons";

const MSG = {
  ro: { ok: "Mulțumim! Mesajul a fost trimis. Vă vom contacta în curând.", err: "Nu s-a putut trimite. Încercați din nou." },
  ru: { ok: "Спасибо! Сообщение отправлено. Мы скоро с вами свяжемся.", err: "Не удалось отправить. Попробуйте ещё раз." },
};

/**
 * Comportamentele interactive ale paginilor copiate de pe roott.ru
 * (pe original le face jQuery/Webflow): ferestre modale, puncte de pe imagini,
 * galerii foto, slidere, formulare.
 */
export default function LegacyEnhancer({ locale }: { locale: "ro" | "ru" }) {
  const { openCall } = useUI();
  const [gallery, setGallery] = useState<{ items: string[]; i: number } | null>(null);

  const closeModal = useCallback((m: Element) => {
    m.classList.remove("hystmodal--active", "hystmodal--moved");
    document.documentElement.style.overflow = "";
  }, []);

  useEffect(() => {
    const root = () => document.querySelectorAll(".legacy");

    // filtrul și căutarea din listele de știri/articole (pe original: AJAX Bitrix)
    const filterNews = (from: Element) => {
      const scope = from.closest(".news") || from.closest(".legacy");
      if (!scope) return;
      const checked = scope.querySelector<HTMLInputElement>('input[name="arrFilter_pf[TYPE]"]:checked');
      const label = checked ? scope.querySelector(`label[for="${checked.id}"]`)?.textContent?.trim() : "";
      const q = (scope.querySelector<HTMLInputElement>(".news__filter__search__input")?.value || "").trim().toLowerCase();
      scope.querySelectorAll<HTMLElement>(".news__grid > .news__item").forEach((card) => {
        const type = card.querySelector(".news__item__type")?.textContent?.trim();
        const ok = (!checked?.value || type === label) && (!q || (card.textContent || "").toLowerCase().includes(q));
        card.style.display = ok ? "" : "none";
      });
    };
    const onInput = (e: Event) => {
      const el = e.target as HTMLElement;
      if (el.closest?.(".legacy") && el.matches(".news__filter__search__input")) filterNews(el);
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !target.closest(".legacy")) return;

      // „Copiază linkul”
      const copy = target.closest<HTMLElement>(".keys_detail__use__copy, a:has(> img[src*='copy-icon'])");
      if (copy) {
        e.preventDefault();
        navigator.clipboard?.writeText(location.href).then(() => {
          copy.dataset.copied = "1";
          copy.style.borderColor = "#62b83f";
          setTimeout(() => { copy.style.borderColor = ""; delete copy.dataset.copied; }, 1500);
        }).catch(() => {});
        return;
      }

      // butonul de filtre pe mobil
      const fBtn = target.closest("#filter-btn-news, #filter-btn-news-exit");
      if (fBtn) {
        e.preventDefault();
        fBtn.closest("form")?.querySelector(".news__filter__btns")?.classList.toggle("active", fBtn.id === "filter-btn-news");
        return;
      }

      // ferestre modale (hystmodal)
      const opener = target.closest<HTMLElement>("[data-hystmodal]");
      if (opener) {
        e.preventDefault();
        const id = opener.getAttribute("data-hystmodal") || "";
        if (id === "#order-call" || id === "#become-dealer") return openCall();
        const m = document.querySelector(`.legacy ${id}`);
        if (m) {
          m.classList.add("hystmodal--active", "hystmodal--moved");
          document.documentElement.style.overflow = "hidden";
        }
        return;
      }
      if (target.closest("[data-hystclose]") || target.classList.contains("hystmodal__wrap") || target.classList.contains("hystmodal")) {
        const m = target.closest(".hystmodal");
        if (m) { e.preventDefault(); closeModal(m); }
        return;
      }

      // puncte pe imaginile implanturilor
      const hot = target.closest<HTMLElement>(".implant-details-info-button[data-button]");
      if (hot) {
        const id = hot.getAttribute("data-button")!;
        const box = hot.parentElement!;
        const label = box.querySelector<HTMLElement>(`[id="${id}"]`);
        const willOpen = !hot.classList.contains("active");
        box.querySelectorAll(".implant-details-info-button.active, .implant-details-info-label.active").forEach((x) => x.classList.remove("active"));
        if (willOpen) { hot.classList.add("active"); label?.classList.add("active"); }
        return;
      }
      const hotClose = target.closest<HTMLElement>(".implant-details-info-button__close");
      if (hotClose) {
        const label = hotClose.closest(".implant-details-info-label");
        label?.classList.remove("active");
        label?.parentElement?.querySelector(`[data-button="${label.id}"]`)?.classList.remove("active");
        return;
      }
      const li = target.closest<HTMLElement>(".implant_details_info__grid__txt__li");
      if (li) {
        li.parentElement?.querySelectorAll(".active").forEach((x) => x.classList.remove("active"));
        li.classList.add("active");
        return;
      }

      // galerie foto
      const fancy = target.closest<HTMLAnchorElement>("a[data-fancybox]");
      if (fancy) {
        e.preventDefault();
        const group = fancy.getAttribute("data-fancybox");
        const links = [...document.querySelectorAll<HTMLAnchorElement>(`.legacy a[data-fancybox="${group}"]`)];
        setGallery({ items: links.map((a) => a.getAttribute("href") || ""), i: Math.max(0, links.indexOf(fancy)) });
        return;
      }

      // butoane prev/next ale sliderelor
      const nav = target.closest<HTMLElement>(".swiper-button-prev, .swiper-button-next, [class*='__prev'], [class*='__next'], [class*='-prev'], [class*='-next']");
      if (nav) {
        let scope: HTMLElement | null = nav.parentElement;
        let wrapper: HTMLElement | null = null;
        while (scope && !wrapper) { wrapper = scope.querySelector(".swiper-wrapper"); scope = scope.parentElement; }
        if (wrapper) {
          e.preventDefault();
          const dir = /prev/.test(nav.className) ? -1 : 1;
          wrapper.scrollBy({ left: dir * wrapper.clientWidth * 0.8, behavior: "smooth" });
        }
        return;
      }

      // acordeoane: .js__accordion + următorul element
      const acc = target.closest<HTMLElement>(".js__accordion");
      if (acc) {
        const open = !acc.classList.contains("open");
        acc.classList.toggle("open", open);
        const panel = acc.nextElementSibling as HTMLElement | null;
        if (panel) panel.style.display = open ? "block" : "none";
        return;
      }

      // tab-uri simple: <ul class="js-tabs-btn"><li> + <ul class="js-tabs-content"><li>
      const tabLi = target.closest<HTMLElement>(".js-tabs-btn > li");
      if (tabLi) {
        const btns = tabLi.parentElement!;
        const idx = [...btns.children].indexOf(tabLi);
        let content = btns.nextElementSibling;
        while (content && !content.classList.contains("js-tabs-content")) content = content.nextElementSibling;
        [...btns.children].forEach((x, i) => x.classList.toggle("active", i === idx));
        if (content) [...content.children].forEach((x, i) => x.classList.toggle("active", i === idx));
        return;
      }

      // tab-uri Webflow
      const tab = target.closest<HTMLElement>(".w-tab-link");
      if (tab) {
        e.preventDefault();
        const name = tab.getAttribute("data-w-tab");
        const tabs = tab.closest(".w-tabs");
        tabs?.querySelectorAll(".w-tab-link").forEach((x) => x.classList.toggle("w--current", x === tab));
        tabs?.querySelectorAll<HTMLElement>(".w-tab-pane").forEach((p) => p.classList.toggle("w--tab-active", p.getAttribute("data-w-tab") === name));
      }
    };

    const onSubmit = async (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement;
      if (!form.closest(".legacy")) return;
      e.preventDefault();
      if (form.matches(".news-filter, .news__filter__search")) return filterNews(form);
      const fields: Record<string, string> = {};
      new FormData(form).forEach((v, k) => {
        if (/^(bxajaxid|AJAX_CALL|sessid|captcha_|sender_subscription|set_filter|web_form_submit|WEB_FORM_ID)/.test(k)) return;
        if (typeof v === "string" && v.trim()) fields[k] = v;
      });
      try {
        const r = await fetch("/api/lead", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ page: location.pathname, form: form.className || form.id, fields }),
        });
        if (!r.ok) throw new Error();
        form.innerHTML = `<p style="padding:24px 0;font-size:16px;line-height:1.5">${MSG[locale].ok}</p>`;
      } catch {
        alert(MSG[locale].err);
      }
    };

    // lista de verificare de pe pagina „Garanție și schimb”
    const onChange = (e: Event) => {
      const el = e.target as HTMLInputElement;
      if (el.closest?.(".legacy") && el.name === "arrFilter_pf[TYPE]") {
        el.closest(".news__filter__btns")?.classList.remove("active");
        return filterNews(el);
      }
      const box = (e.target as HTMLElement).closest(".guarantee-section-1-tab-2__checkbox");
      if (!box) return;
      const all = box.querySelectorAll<HTMLInputElement>("input[type=checkbox]");
      const done = [...all].filter((x) => x.checked).length;
      const state = done === 0 ? 0 : done < all.length ? 1 : 2;
      const scope = box.closest("li") || document;
      const titles = scope.querySelectorAll(".guarantee-section-1-tab-2__title > li");
      titles.forEach((li, i) => li.classList.toggle("active", i === state));
      const h = titles[1]?.querySelector("h3");
      if (h) h.textContent = h.textContent!.replace(/\d+/, String(all.length - done));
      scope.querySelectorAll(".guarantee-section-1-tab-2__ul > li").forEach((li, i) => li.classList.toggle("active", i === state));
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      document.querySelectorAll(".legacy .hystmodal--active").forEach(closeModal);
    };

    // butoane de distribuire (pe original: widget Yandex)
    root().forEach((r) => r.querySelectorAll<HTMLElement>(".ya-share2").forEach((box) => {
      if (box.childElementCount) return;
      const u = encodeURIComponent(location.href), t = encodeURIComponent(document.title);
      const links: [string, string, string][] = [
        ["Telegram", "TG", `https://t.me/share/url?url=${u}&text=${t}`],
        ["WhatsApp", "WA", `https://wa.me/?text=${t}%20${u}`],
        ["Facebook", "FB", `https://www.facebook.com/sharer/sharer.php?u=${u}`],
      ];
      box.style.cssText = "display:flex;gap:6px;flex-wrap:nowrap;align-items:center";
      box.innerHTML = links.map(([n, a, h]) => `<a href="${h}" target="_blank" rel="noopener" title="${n}" aria-label="${n}" style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#2f2f2f;color:#fff;font-size:11px;font-weight:600;text-decoration:none;flex-shrink:0">${a}</a>`).join("");
    }));

    // imagini „lazy” cu data-src
    root().forEach((r) => r.querySelectorAll<HTMLImageElement>("img[data-src]").forEach((img) => { if (!img.getAttribute("src")) img.src = img.dataset.src!; }));

    document.addEventListener("click", onClick);
    document.addEventListener("submit", onSubmit);
    document.addEventListener("change", onChange);
    document.addEventListener("input", onInput);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("submit", onSubmit);
      document.removeEventListener("change", onChange);
      document.removeEventListener("input", onInput);
      window.removeEventListener("keydown", onKey);
    };
  }, [locale, openCall, closeModal]);

  useEffect(() => {
    if (!gallery) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setGallery(null);
      if (e.key === "ArrowRight") setGallery((g) => g && { ...g, i: (g.i + 1) % g.items.length });
      if (e.key === "ArrowLeft") setGallery((g) => g && { ...g, i: (g.i - 1 + g.items.length) % g.items.length });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gallery]);

  if (!gallery) return null;
  const src = gallery.items[gallery.i];
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90" onClick={() => setGallery(null)}>
      <img src={src} alt="" className="max-h-[88vh] max-w-[92vw] object-contain" onClick={(e) => e.stopPropagation()} />
      <button type="button" aria-label="Close" className="absolute right-5 top-5 text-white" onClick={() => setGallery(null)}>
        <Close className="h-8 w-8" />
      </button>
      {gallery.items.length > 1 && (
        <>
          <button type="button" aria-label="Prev" className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/50 p-3 text-white" onClick={(e) => { e.stopPropagation(); setGallery((g) => g && { ...g, i: (g.i - 1 + g.items.length) % g.items.length }); }}>
            <ArrowLeft />
          </button>
          <button type="button" aria-label="Next" className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/50 p-3 text-white" onClick={(e) => { e.stopPropagation(); setGallery((g) => g && { ...g, i: (g.i + 1) % g.items.length }); }}>
            <Arrow />
          </button>
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[14px] text-white/80">{gallery.i + 1} / {gallery.items.length}</span>
        </>
      )}
    </div>
  );
}
