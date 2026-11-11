import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import Breadcrumbs from "@/components/Breadcrumbs";
import OrderForm from "@/components/cart/OrderForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: `${getDictionary(locale).order.title} | roott.md`, robots: { index: false } };
}

export default async function OrderPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  return (
    <main className="mb-[120px]">
      <Breadcrumbs items={[{ label: t.common.home, href: `/${locale}` }, { label: t.common.shop, href: `/${locale}/catalog` }, { label: t.order.title }]} />
      <div className="mx-auto max-w-[1256px] px-4">
        <h1 className="mb-8 text-[24px] font-bold leading-[44px]">{t.order.title}</h1>
        <OrderForm t={t.order} privacy={t.contact} locale={locale} />
      </div>
    </main>
  );
}
