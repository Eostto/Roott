import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { UIProvider } from "@/components/UIProvider";
import CallModal from "@/components/CallModal";
import CookieBanner from "@/components/CookieBanner";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/cart/CartProvider";
import CartDrawer from "@/components/cart/CartDrawer";

const openSans = Open_Sans({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    title: t.meta.title,
    description: t.meta.description,
    metadataBase: new URL("https://roott.md"),
    alternates: { languages: { ro: "/ro", ru: "/ru" } },
    icons: { icon: "/icons/logo.svg" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <html lang={locale} className={openSans.variable}>
      <body>
        <UIProvider>
          <CartProvider>
            <TopBar t={t.topBar} />
            <Header t={t} locale={locale} />
            {children}
            <Footer t={t} locale={locale} />
            <CallModal t={t.callModal} consent={t.contact} />
            <CartDrawer t={t.cart} locale={locale} />
            <CookieBanner t={t.cookie} locale={locale} />
          </CartProvider>
        </UIProvider>
      </body>
    </html>
  );
}
