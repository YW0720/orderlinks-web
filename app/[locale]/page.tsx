import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomePage, { generateMetadata as generateHomeMetadata } from "../page";
import { SUPPORTED_LOCALES, type SupportedLocale } from "../lib/seo";

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
    return generateHomeMetadata({ searchParams: Promise.resolve({}) });
  }

  return generateHomeMetadata({
    searchParams: Promise.resolve({ lang: locale }),
  });
}

export default async function LocalizedHomePage({ params }: PageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return HomePage({
    searchParams: Promise.resolve({ lang: locale }),
  });
}
