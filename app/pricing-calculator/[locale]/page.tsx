import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PricingCalculatorPage, { generateMetadata as generatePricingMetadata } from "../page";
import { SUPPORTED_LOCALES, type SupportedLocale } from "../../lib/seo";

type Params = {
  locale: string;
};

type PageProps = {
  params: Promise<Params>;
};

function isSupportedLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    return generatePricingMetadata({ searchParams: Promise.resolve({}) });
  }

  return generatePricingMetadata({
    searchParams: Promise.resolve({ lang: locale }),
  });
}

export default async function LocalizedPricingPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return PricingCalculatorPage({
    searchParams: Promise.resolve({ lang: locale }),
  });
}
