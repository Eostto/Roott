# roott.md

Site-ul **roott.md** — distribuitorul ROOTT AG în Republica Moldova (Dent One Group SRL).
Next.js 15 (App Router) + React 19 + Tailwind CSS 4, în **română** (`/ro`) și **rusă** (`/ru`).

## Pornire locală

```bash
npm install
npm run dev          # http://localhost:3000 → redirecționează la /ro sau /ru
npm run build        # build de producție (~900 de pagini statice)
npm start
```

## Publicare (Vercel)

Proiectul se publică automat pe Vercel la fiecare `git push` pe `main`.
Variabile de mediu (Vercel → Settings → Environment Variables), vezi `.env.example`:

| Variabilă | Rol |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://roott.md` (sitemap, robots.txt) |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | cererile din formulare și comenzile vin ca mesaj în Telegram |

Domeniul `roott.md` folosește nameserverele `ns1.vercel-dns.com` și `ns2.vercel-dns.com`.

## Structură

```
src/
  app/[locale]/page.tsx                 prima pagină
  app/[locale]/ambassador/              programul „Medic-ambasador ROOTT”
  app/[locale]/catalog/                 magazinul (linii, produse, prețuri în €)
  app/[locale]/order/                   finalizarea comenzii
  app/[locale]/[...rest]/               paginile de conținut (despre noi, noutăți, articole, cazuri clinice…)
  app/api/lead, app/api/order           formulare și comenzi → Telegram (+ data/leads local)
  components/                           Header, Footer, coș, formulare, componente pagini
  i18n/dictionaries/ro.ts, ru.ts        textele interfeței
  lib/company.ts                        datele firmei, telefon, WhatsApp, Telegram
  data/catalog/                         produsele și prețurile (EUR)
  data/pages/                           conținutul paginilor (ru + ro)
  data/_i18n/tm.json                    memoria de traducere RU → RO
public/
  images/roott/                         pozele site-ului
  files/                                cataloagele PDF
  legacy/roott.css                      stilurile paginilor de conținut
scripts/                                scripturi de import/traducere/localizare (nu rulează pe server)
```

## Editare conținut

- **Telefon, adresă, WhatsApp/Telegram**: `src/lib/company.ts` + dicționarele din `src/i18n/dictionaries/`.
- **Texte meniu / prima pagină / footer**: `src/i18n/dictionaries/ro.ts` și `ru.ts`.
- **Pagini de conținut**: `src/data/pages/*.json` (câmpurile `ru` și `ro`).
- **Produse și prețuri**: `src/data/catalog/products.json` (prețuri în EUR).
