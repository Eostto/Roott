import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import HomeHero from "@/components/home/HomeHero";
import ProductLines from "@/components/home/ProductLines";
import NewLine from "@/components/home/NewLine";
import { AboutSystem, AmbassadorBand, Resources } from "@/components/home/HomeSections";
import NewsArticles from "@/components/NewsArticles";
import ContactSection from "@/components/ContactSection";
import SeoText from "@/components/SeoText";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <>
      <main>
        <HomeHero t={t.home} locale={locale} />
        <ProductLines t={t.home} locale={locale} />
        <NewLine t={t.home} locale={locale} />
        <AboutSystem t={t.system} locale={locale} />
        <AmbassadorBand t={t.hero.dealer} eyebrow={t.home.ambEyebrow} locale={locale} />
        <Resources title={t.home.featuresTitle} features={t.features} events={t.nav.find((n) => "href" in n && n.href === "/sobytiya")?.label ?? "Evenimente"} locale={locale} />
        <NewsArticles news={t.news} articles={t.articles} locale={locale} />
        <ContactSection t={t.contact} locale={locale} />
        <SeoText t={t.seo} locale={locale} />
      </main>
    </>
  );
}
