import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PricingCalculatorClient } from "./PricingCalculatorClient";
import ScrollRevealObserver from "../components/ScrollRevealObserver";
import {
  LOCALE_PATHS,
  PRICING_SEO_KEYWORDS,
  PRICING_LOCALE_PATHS,
  SITE_NAME,
  SITE_URL,
  SUPPORTED_LOCALES,
  type SupportedLocale,
} from "../lib/seo";

type Locale = SupportedLocale;

const TEXT = {
  zh: {
    title: "价格计算器",
    desc: "根据合同年限、并发点餐人数和每日订单量，快速估算一次性费用与月费。",
    back: "返回首页",
    demo: "查看 Demo",
    lang: "语言",
  },
  en: {
    title: "Pricing Calculator",
    desc: "Estimate setup and monthly cost based on contract term, concurrent users, and daily orders.",
    back: "Back to Home",
    demo: "Open Demo",
    lang: "Language",
  },
  fr: {
    title: "Calculateur de prix",
    desc: "Estimez les frais uniques et mensuels selon la durée du contrat, le trafic et les commandes.",
    back: "Retour à l'accueil",
    demo: "Voir la démo",
    lang: "Langue",
  },
  de: {
    title: "Preisrechner",
    desc: "Schätzen Sie Einmalkosten und Monatsgebühr anhand von Vertragslaufzeit, gleichzeitigen Nutzern und Bestellungen.",
    back: "Zurück zur Startseite",
    demo: "Demo ansehen",
    lang: "Sprache",
  },
};

type PageProps = {
  searchParams: Promise<{ lang?: string }>;
};

function resolveLocale(raw?: string): Locale {
  if (!raw) {
    return "en";
  }
  return SUPPORTED_LOCALES.includes(raw as Locale) ? (raw as Locale) : "en";
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const locale = resolveLocale(params.lang);
  const labels = TEXT[locale];
  return {
    title: labels.title,
    description: labels.desc,
    keywords: PRICING_SEO_KEYWORDS[locale],
    alternates: {
      canonical: PRICING_LOCALE_PATHS[locale],
      languages: {
        ...PRICING_LOCALE_PATHS,
        "x-default": PRICING_LOCALE_PATHS.en,
      },
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${PRICING_LOCALE_PATHS[locale]}`,
      title: `${labels.title} | ${SITE_NAME}`,
      description: labels.desc,
      siteName: SITE_NAME,
      images: [
        {
          url: "/profit_calculator.png",
          width: 1200,
          height: 630,
          alt: "OrderLinks pricing calculator preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${labels.title} | ${SITE_NAME}`,
      description: labels.desc,
      images: ["/profit_calculator.png"],
    },
  };
}

export default async function PricingCalculatorPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const locale = resolveLocale(params.lang);
  const labels = TEXT[locale];
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: labels.title,
    description: labels.desc,
    url: `${SITE_URL}${PRICING_LOCALE_PATHS[locale]}`,
    inLanguage: locale,
    keywords: PRICING_SEO_KEYWORDS[locale].join(", "),
    about: [
      "Restaurant website pricing",
      "Online ordering pricing",
      "POS pricing",
      "Online reservation pricing",
      "Swiss restaurant software",
    ],
  };

  return (
    <div className="page-shell min-h-screen px-4 pb-12 pt-4 sm:px-6 lg:px-10">
      <ScrollRevealObserver />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <div
        className="ambient-orb ambient-orb-a"
        aria-hidden
        data-parallax-speed="0.055"
        data-mouse-factor="10"
      />
      <div
        className="ambient-orb ambient-orb-b"
        aria-hidden
        data-parallax-speed="-0.04"
        data-mouse-factor="-12"
      />
      <div
        className="ambient-orb ambient-orb-c"
        aria-hidden
        data-parallax-speed="0.03"
        data-mouse-factor="8"
      />
      <header className="mx-auto max-w-7xl">
        <div className="liquid-glass flex flex-col gap-2 rounded-2xl px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-6">
          <Link href={LOCALE_PATHS[locale]} className="flex items-center gap-2">
            <Image src="/logo.png" alt="OrderLinks logo" width={36} height={36} />
            <span className="text-sm font-semibold tracking-wide">OrderLinks</span>
          </Link>
          <div className="flex w-full items-center gap-2 text-sm sm:w-auto">
            <Link
              className="nav-chip block flex-1 truncate px-3 py-2 text-center text-xs sm:flex-none sm:px-4 sm:py-[0.45rem] sm:text-sm"
              href={LOCALE_PATHS[locale]}
            >
              {labels.back}
            </Link>
            <Link
              className="nav-chip block flex-1 truncate px-3 py-2 text-center text-xs sm:flex-none sm:px-4 sm:py-[0.45rem] sm:text-sm"
              href="https://orderlinks.ch"
              target="_blank"
              rel="noreferrer"
            >
              {labels.demo}
            </Link>
            <details className="lang-switcher relative sm:hidden">
              <summary className="nav-chip block cursor-pointer px-3 py-2 text-center text-xs">
                {locale.toUpperCase()}
              </summary>
              <div className="absolute right-0 top-[calc(100%+0.4rem)] z-20 flex min-w-[132px] flex-col gap-1 rounded-xl border border-black/10 bg-white p-2 shadow-lg">
                {SUPPORTED_LOCALES.map((lang) => (
                  <Link
                    key={`mobile-${lang}`}
                    href={PRICING_LOCALE_PATHS[lang]}
                    className={`lang-chip text-center ${lang === locale ? "lang-chip-active" : ""}`}
                  >
                    {lang.toUpperCase()}
                  </Link>
                ))}
              </div>
            </details>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="hidden text-xs text-[#4a4a4a] sm:inline">{labels.lang}</span>
              {SUPPORTED_LOCALES.map((lang) => (
                <Link
                  key={lang}
                  href={PRICING_LOCALE_PATHS[lang]}
                  className={`lang-chip ${lang === locale ? "lang-chip-active" : ""}`}
                >
                  {lang.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>
      <PricingCalculatorClient locale={locale} />
    </div>
  );
}
