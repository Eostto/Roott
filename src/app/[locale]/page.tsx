import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import ProductStrip from "@/components/ProductStrip";
import HeroSlider from "@/components/HeroSlider";
import SystemBanner from "@/components/SystemBanner";
import FeatureStack from "@/components/FeatureStack";
import NewsArticles from "@/components/NewsArticles";
import ContactSection from "@/components/ContactSection";
import SeoText from "@/components/SeoText";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <>
      <main>
        <ProductStrip items={t.products} locale={locale} />
        <HeroSlider t={t.hero} locale={locale} />
        <SystemBanner t={t.system} locale={locale} />
        <FeatureStack t={t.features} locale={locale} />
        <NewsArticles news={t.news} articles={t.articles} locale={locale} />
        <ContactSection t={t.contact} locale={locale} />
        <SeoText t={t.seo} locale={locale} />
      </main>
    </>
  );
}
