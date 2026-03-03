import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollRevealObserver from "./components/ScrollRevealObserver";
import { LOCALE_PATHS, SITE_NAME, SITE_URL, SUPPORTED_LOCALES, type SupportedLocale } from "./lib/seo";

type Locale = SupportedLocale;
const ASSET_VERSION = "20260303-1";

function withAssetVersion(src: string) {
  return `${src}?v=${ASSET_VERSION}`;
}

type Feature = {
  title: string;
  description: string;
  medias: Array<{
    mediaType: "image" | "video";
    src: string;
    alt: string;
    role?: string;
    portrait?: boolean;
  }>;
  soon?: boolean;
};

type Dictionary = {
  seoTitle: string;
  seoDescription: string;
  nav: {
    calculator: string;
    demo: string;
    language: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  section: {
    featureTitle: string;
    featureSubtitle: string;
    faqTitle: string;
    faqSubtitle: string;
  };
  faq: Array<{ q: string; a: string }>;
  features: Feature[];
};

const DICTIONARY: Record<Locale, Dictionary> = {
  zh: {
    seoTitle: "餐厅网站定制 + 在线点餐/预约 + PoS 一体化",
    seoDescription:
      "OrderLinks 帮助瑞士餐厅快速上线四语网站，支持在线点餐、预约、厨房看单、统计分析与支付闭环。",
    nav: {
      calculator: "价格计算器",
      demo: "查看 Demo",
      language: "语言",
    },
    hero: {
      badge: "面向瑞士餐饮市场的全链路数字化平台",
      title: "以品牌级体验，交付可持续增长的餐厅官网与点餐系统",
      subtitle:
        "OrderLinks 将网站定制、在线点餐、预约、后厨协作与经营分析整合为统一方案。在保持品牌质感的同时，确保每个环节都能直接服务订单转化与运营效率。",
      ctaPrimary: "获取专属价格测算",
      ctaSecondary: "查看产品 Demo",
    },
    section: {
      featureTitle: "核心功能",
      featureSubtitle:
        "从获客到复购，每个模块都围绕真实经营指标设计，帮助餐厅建立可量化、可复用的增长机制。",
      faqTitle: "常见问题",
      faqSubtitle: "关于上线周期、费用结构、多语能力与支付集成，这里给出明确答案。",
    },
    faq: [
      {
        q: "OrderLinks 适合哪些餐厅？",
        a: "适合希望快速上线官网、在线点餐、预约与后厨工作流的中小型到连锁餐厅，尤其适合瑞士多语市场。",
      },
      {
        q: "是否支持多语言切换？",
        a: "支持法语、德语、英语和中文，便于面向不同地区顾客提供一致的浏览和下单体验。",
      },
      {
        q: "支付能力是否集成？",
        a: "支持 Stripe 在线付款能力，并可与餐厅业务流程结合，实现更完整的下单与支付闭环。",
      },
      {
        q: "系统是否支持数据导出和经营分析？",
        a: "支持图表化经营数据与历史订单导出 Excel，帮助餐厅进行日常复盘和决策。",
      },
    ],
    features: [
      {
        title: "DeepL 自动翻译",
        description: "输入一次内容，自动同步多语文案，提高菜单与页面维护效率。",
        medias: [
          {
            mediaType: "video",
            src: "/auto_translation_by_deepl.mp4",
            alt: "DeepL API 自动翻译演示视频",
          },
        ],
      },
      {
        title: "管理员菜单管理",
        description: "后台灵活维护分类、价格与上架状态，快速响应日常更新。",
        medias: [
          {
            mediaType: "image",
            src: "/admin_menu.png",
            alt: "管理员菜单管理功能",
          },
        ],
      },
      {
        title: "点餐与厨房协同",
        description: "顾客端完成点餐与菜品查看，员工端在厨房看单并高效处理订单。",
        medias: [
          {
            mediaType: "image",
            src: "/customer_menu_with_detail.webp",
            alt: "顾客在线点餐与菜品详情",
            role: "顾客端",
            portrait: true,
          },
          {
            mediaType: "image",
            src: "/KitchenOrderView.webp",
            alt: "员工厨房看单功能",
            role: "员工端",
          },
        ],
      },
      {
        title: "预约与到店管理",
        description: "顾客在线预约后，员工可快速确认并统一管理预约状态。",
        medias: [
          {
            mediaType: "image",
            src: "/customer_reservation.webp",
            alt: "顾客在线预约功能",
            role: "顾客端",
            portrait: true,
          },
          {
            mediaType: "image",
            src: "/staff_reservation.webp",
            alt: "员工确认预约功能",
            role: "员工端",
          },
        ],
      },
      {
        title: "经营统计与利润测算",
        description: "支持收入可视化统计与利润测算，帮助管理者快速复盘经营表现。",
        medias: [
          {
            mediaType: "image",
            src: "/admin_statis_calcul.webp",
            alt: "管理员查看收入可视化统计和利润计算器功能",
          },
        ],
      },
      {
        title: "历史订单导出 Excel",
        description: "管理员可查看历史订单并一键导出 Excel，方便财务与运营整理。",
        medias: [
          {
            mediaType: "image",
            src: "/excel.webp",
            alt: "管理员查看历史订单并导出 Excel 功能",
          },
        ],
      },
    ],
  },
  en: {
    seoTitle: "Restaurant Website + Online Ordering, Reservation and POS",
    seoDescription:
      "OrderLinks helps Swiss restaurants launch multilingual websites with online ordering, reservation, kitchen workflows and analytics.",
    nav: {
      calculator: "Pricing Calculator",
      demo: "Open Demo",
      language: "Language",
    },
    hero: {
      badge: "End-to-end platform for premium restaurant operations",
      title: "Deliver a brand-grade digital experience that converts",
      subtitle:
        "OrderLinks unifies custom website design, online ordering, reservation flow, kitchen coordination, and analytics. The result is a refined customer journey with measurable commercial impact.",
      ctaPrimary: "Get Pricing Estimate",
      ctaSecondary: "View Product Demo",
    },
    section: {
      featureTitle: "Core Product Capabilities",
      featureSubtitle:
        "Every module is mapped to real business outcomes: acquisition, conversion, delivery quality, and retention.",
      faqTitle: "Frequently Asked Questions",
      faqSubtitle: "Clear answers on launch timeline, pricing model, multilingual setup, and payment integration.",
    },
    faq: [
      {
        q: "Who is OrderLinks built for?",
        a: "It is designed for independent and multi-location restaurants that need a fast launch for website, ordering, reservation, and operations.",
      },
      {
        q: "Does it support multiple languages?",
        a: "Yes. The product supports French, German, English, and Chinese for the Swiss market.",
      },
      {
        q: "Can online payment be integrated?",
        a: "Stripe-based payment workflow is supported to provide a smoother order-to-payment journey.",
      },
      {
        q: "Do you support data export and analytics?",
        a: "Yes. You can view analytics dashboards and export historical orders as Excel files.",
      },
    ],
    features: [
      {
        title: "DeepL Auto Translation",
        description:
          "Create content once and synchronize multilingual copy automatically for faster menu and page updates.",
        medias: [
          {
            mediaType: "video",
            src: "/auto_translation_by_deepl.mp4",
            alt: "DeepL API automatic translation demo",
          },
        ],
      },
      {
        title: "Admin Menu Management",
        description:
          "Update categories, prices, and availability from one dashboard with full operational flexibility.",
        medias: [
          {
            mediaType: "image",
            src: "/admin_menu.png",
            alt: "Admin menu management feature",
          },
        ],
      },
      {
        title: "Ordering and Kitchen Collaboration",
        description:
          "Customers place orders with detailed menu views while kitchen staff process tickets in a synchronized workflow.",
        medias: [
          {
            mediaType: "image",
            src: "/customer_menu_with_detail.webp",
            alt: "Customer online ordering and dish details",
            role: "Customer",
            portrait: true,
          },
          {
            mediaType: "image",
            src: "/KitchenOrderView.webp",
            alt: "Kitchen order management view",
            role: "Staff",
          },
        ],
      },
      {
        title: "Reservation and Staff Confirmation",
        description:
          "Guests book online and staff confirm reservations quickly in one coordinated process.",
        medias: [
          {
            mediaType: "image",
            src: "/customer_reservation.webp",
            alt: "Customer reservation feature",
            role: "Customer",
            portrait: true,
          },
          {
            mediaType: "image",
            src: "/staff_reservation.webp",
            alt: "Staff reservation confirmation feature",
            role: "Staff",
          },
        ],
      },
      {
        title: "Analytics and Profit Insights",
        description:
          "Track revenue and profit visually to review performance and support better decisions.",
        medias: [
          {
            mediaType: "image",
            src: "/admin_statis_calcul.webp",
            alt: "Revenue analytics and profit calculator",
          },
        ],
      },
      {
        title: "Export Orders to Excel",
        description:
          "Review historical orders and export them to Excel in one click for reporting workflows.",
        medias: [
          {
            mediaType: "image",
            src: "/excel.webp",
            alt: "Historical order export to Excel",
          },
        ],
      },
    ],
  },
  fr: {
    seoTitle: "Site restaurant + commande en ligne, réservation et POS",
    seoDescription:
      "OrderLinks aide les restaurants en Suisse à lancer un site multilingue avec commande, réservation, cuisine et analyses.",
    nav: {
      calculator: "Calculateur de prix",
      demo: "Voir la démo",
      language: "Langue",
    },
    hero: {
      badge: "SaaS moderne pour restaurants suisses",
      title: "Une expérience digitale haut de gamme orientée conversion",
      subtitle:
        "OrderLinks réunit site sur mesure, commande en ligne, réservation, coordination cuisine et analyses dans une seule plateforme performante.",
      ctaPrimary: "Obtenir une estimation",
      ctaSecondary: "Voir la demo produit",
    },
    section: {
      featureTitle: "Fonctionnalités principales",
      featureSubtitle:
        "Chaque module cible un objectif business concret : acquisition, conversion, exécution et fidélisation.",
      faqTitle: "Questions fréquentes",
      faqSubtitle: "Réponses précises sur délais, tarification, multilingue et paiements.",
    },
    faq: [
      {
        q: "À quels restaurants s'adresse OrderLinks ?",
        a: "La solution convient aux restaurants indépendants et aux chaînes qui veulent lancer rapidement site, commande et réservation.",
      },
      {
        q: "Le système est-il multilingue ?",
        a: "Oui, il prend en charge le français, l'allemand, l'anglais et le chinois.",
      },
      {
        q: "Le paiement en ligne est-il pris en charge ?",
        a: "Oui, Stripe peut être intégré pour fluidifier le parcours de commande et paiement.",
      },
      {
        q: "Proposez-vous export et analyses ?",
        a: "Oui, avec des graphiques d'activité et l'export des commandes en Excel.",
      },
    ],
    features: [
      {
        title: "Traduction automatique DeepL",
        description:
          "Saisissez votre contenu une seule fois et synchronisez automatiquement les textes multilingues.",
        medias: [
          {
            mediaType: "video",
            src: "/auto_translation_by_deepl.mp4",
            alt: "Démonstration de traduction automatique DeepL",
          },
        ],
      },
      {
        title: "Gestion du menu administrateur",
        description:
          "Modifiez catégories, prix et disponibilités depuis une interface unique et flexible.",
        medias: [
          {
            mediaType: "image",
            src: "/admin_menu.png",
            alt: "Fonction de gestion du menu administrateur",
          },
        ],
      },
      {
        title: "Commande et coordination cuisine",
        description:
          "Les clients commandent en ligne tandis que l'équipe cuisine traite les tickets dans un flux synchronisé.",
        medias: [
          {
            mediaType: "image",
            src: "/customer_menu_with_detail.webp",
            alt: "Commande client avec détails des plats",
            role: "Client",
            portrait: true,
          },
          {
            mediaType: "image",
            src: "/KitchenOrderView.webp",
            alt: "Vue cuisine pour traitement des commandes",
            role: "Équipe",
          },
        ],
      },
      {
        title: "Réservation et confirmation équipe",
        description:
          "Les clients réservent en ligne et le personnel confirme rapidement chaque réservation.",
        medias: [
          {
            mediaType: "image",
            src: "/customer_reservation.webp",
            alt: "Réservation en ligne côté client",
            role: "Client",
            portrait: true,
          },
          {
            mediaType: "image",
            src: "/staff_reservation.webp",
            alt: "Confirmation des réservations côté équipe",
            role: "Équipe",
          },
        ],
      },
      {
        title: "Analytique et rentabilité",
        description:
          "Visualisez revenus et profits pour piloter plus rapidement les décisions de gestion.",
        medias: [
          {
            mediaType: "image",
            src: "/admin_statis_calcul.webp",
            alt: "Statistiques de revenus et calcul de profit",
          },
        ],
      },
      {
        title: "Export Excel des commandes",
        description:
          "Consultez l'historique des commandes puis exportez-le en Excel en un clic.",
        medias: [
          {
            mediaType: "image",
            src: "/excel.webp",
            alt: "Export Excel des commandes historiques",
          },
        ],
      },
    ],
  },
  de: {
    seoTitle: "Restaurant-Website + Online-Bestellung, Reservierung und POS",
    seoDescription:
      "OrderLinks hilft Restaurants in der Schweiz beim schnellen Start einer mehrsprachigen Website mit Bestellung, Reservierung und Analyse.",
    nav: {
      calculator: "Preisrechner",
      demo: "Demo ansehen",
      language: "Sprache",
    },
    hero: {
      badge: "Moderne SaaS für Schweizer Restaurants",
      title: "Premium-Digitalerlebnis mit klarer Conversion-Wirkung",
      subtitle:
        "OrderLinks vereint Website, Online-Bestellung, Reservierung, Küchenprozess und Analyse in einer integrierten Plattform für messbare Ergebnisse.",
      ctaPrimary: "Preisabschätzung erhalten",
      ctaSecondary: "Produktdemo ansehen",
    },
    section: {
      featureTitle: "Kernfunktionen",
      featureSubtitle:
        "Jedes Modul zahlt auf konkrete Kennzahlen ein: Akquise, Conversion, Ausführung und Bindung.",
      faqTitle: "Häufige Fragen",
      faqSubtitle: "Klare Informationen zu Rollout, Preisstruktur, Mehrsprachigkeit und Zahlungsintegration.",
    },
    faq: [
      {
        q: "Für welche Restaurants ist OrderLinks geeignet?",
        a: "Für einzelne Standorte und Ketten, die Website, Bestellung, Reservierung und Betriebsabläufe schnell einführen wollen.",
      },
      {
        q: "Werden mehrere Sprachen unterstützt?",
        a: "Ja, Französisch, Deutsch, Englisch und Chinesisch werden unterstützt.",
      },
      {
        q: "Kann Online-Zahlung integriert werden?",
        a: "Ja, Stripe kann in den Bestellprozess eingebunden werden.",
      },
      {
        q: "Gibt es Export und Analyse?",
        a: "Ja, inklusive Analyse-Dashboard und Excel-Export für historische Bestellungen.",
      },
    ],
    features: [
      {
        title: "DeepL automatische Übersetzung",
        description:
          "Inhalte einmal erfassen und mehrsprachige Texte automatisch für Menüs und Seiten synchronisieren.",
        medias: [
          {
            mediaType: "video",
            src: "/auto_translation_by_deepl.mp4",
            alt: "DeepL automatische Übersetzung Demo",
          },
        ],
      },
      {
        title: "Admin-Menüsteuerung",
        description:
          "Kategorien, Preise und Verfügbarkeit zentral verwalten und schnell aktualisieren.",
        medias: [
          {
            mediaType: "image",
            src: "/admin_menu.png",
            alt: "Admin-Menüsteuerung Funktion",
          },
        ],
      },
      {
        title: "Bestellung und Küchenkoordination",
        description:
          "Gäste bestellen online mit Detailansicht, während das Küchenteam Bestellungen effizient bearbeitet.",
        medias: [
          {
            mediaType: "image",
            src: "/customer_menu_with_detail.webp",
            alt: "Online-Bestellung mit Produktdetails",
            role: "Gast",
            portrait: true,
          },
          {
            mediaType: "image",
            src: "/KitchenOrderView.webp",
            alt: "Küchenansicht für Bestellbearbeitung",
            role: "Team",
          },
        ],
      },
      {
        title: "Reservierung und Team-Bestätigung",
        description:
          "Kunden reservieren online und das Team bestätigt Reservierungen in einem einheitlichen Ablauf.",
        medias: [
          {
            mediaType: "image",
            src: "/customer_reservation.webp",
            alt: "Online-Reservierung für Kunden",
            role: "Gast",
            portrait: true,
          },
          {
            mediaType: "image",
            src: "/staff_reservation.webp",
            alt: "Reservierungsbestätigung durch Mitarbeiter",
            role: "Team",
          },
        ],
      },
      {
        title: "Analyse und Profit-Einblick",
        description:
          "Umsatz und Profit visuell auswerten, um operative Entscheidungen schneller zu treffen.",
        medias: [
          {
            mediaType: "image",
            src: "/admin_statis_calcul.webp",
            alt: "Umsatzanalyse und Profit-Rechner",
          },
        ],
      },
      {
        title: "Excel-Export für Bestellungen",
        description:
          "Historische Bestellungen einsehen und per Klick als Excel für Reporting exportieren.",
        medias: [
          {
            mediaType: "image",
            src: "/excel.webp",
            alt: "Excel-Export historischer Bestellungen",
          },
        ],
      },
    ],
  },
};

const BASE_FEATURES = DICTIONARY.zh.features;
const CONTACT_TEXT: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    hours: string;
    email: string;
    phone: string;
    whatsapp: string;
  }
> = {
  zh: {
    title: "联系我们",
    subtitle: "欢迎提交您的餐厅经营信息，我们将提供兼顾品牌表达与商业目标的实施建议。",
    hours: "电话接通时间：工作日 18:00-21:00，周末 10:00-22:00",
    email: "邮件咨询",
    phone: "电话咨询",
    whatsapp: "WhatsApp",
  },
  en: {
    title: "Contact Us",
    subtitle: "Share your business context and we will propose a launch plan balancing brand quality and revenue goals.",
    hours: "Phone support hours: Weekdays 18:00-21:00, Weekends 10:00-22:00",
    email: "Email",
    phone: "Phone",
    whatsapp: "WhatsApp",
  },
  fr: {
    title: "Contact",
    subtitle: "Partagez votre contexte business et recevez un plan de lancement alliant image de marque et performance commerciale.",
    hours: "Disponibilité téléphone : jours ouvrables 18:00-21:00, week-end 10:00-22:00",
    email: "E-mail",
    phone: "Telephone",
    whatsapp: "WhatsApp",
  },
  de: {
    title: "Kontakt",
    subtitle: "Teilen Sie Ihren Business-Kontext mit uns, wir liefern einen Launch-Plan mit Fokus auf Marke und Ergebnis.",
    hours: "Telefonzeiten: Werktage 18:00-21:00, Wochenende 10:00-22:00",
    email: "E-Mail",
    phone: "Telefon",
    whatsapp: "WhatsApp",
  },
};

function resolveLocale(raw?: string): Locale {
  if (!raw) {
    return "zh";
  }
  return SUPPORTED_LOCALES.includes(raw as Locale) ? (raw as Locale) : "zh";
}

function getDictionary(locale: Locale): Dictionary {
  const dict = DICTIONARY[locale];
  if (dict.features.length === 0) {
    return { ...dict, features: BASE_FEATURES };
  }
  return dict;
}

type PageProps = {
  searchParams: Promise<{ lang?: string }>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const locale = resolveLocale(params.lang);
  const dict = getDictionary(locale);
  return {
    title: dict.seoTitle,
    description: dict.seoDescription,
    alternates: {
      canonical: LOCALE_PATHS[locale],
      languages: {
        ...LOCALE_PATHS,
        "x-default": LOCALE_PATHS.en,
      },
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${LOCALE_PATHS[locale]}`,
      title: `${dict.seoTitle} | ${SITE_NAME}`,
      description: dict.seoDescription,
      siteName: SITE_NAME,
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} product preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${dict.seoTitle} | ${SITE_NAME}`,
      description: dict.seoDescription,
      images: ["/logo.png"],
    },
  };
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const locale = resolveLocale(params.lang);
  const dict = getDictionary(locale);
  const contact = CONTACT_TEXT[locale];

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "OrderLinks",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: ["fr", "de", "en", "zh"],
    description: dict.seoDescription,
    offers: {
      "@type": "Offer",
      priceCurrency: "CHF",
      availability: "https://schema.org/InStock",
    },
    audience: {
      "@type": "Audience",
      geographicArea: "Switzerland",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="page-shell relative min-h-screen text-neutral-900">
      <ScrollRevealObserver />
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className="sticky top-0 z-30 px-4 pt-4 sm:px-6 lg:px-10">
        <div className="liquid-glass mx-auto flex w-full max-w-7xl flex-col gap-2 rounded-2xl px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-6">
          <Link href={`/?lang=${locale}`} className="flex items-center gap-2">
            <Image src={withAssetVersion("/logo.png")} alt="OrderLinks logo" width={36} height={36} />
            <span className="text-sm font-semibold tracking-wide">OrderLinks</span>
          </Link>
          <nav className="flex w-full items-center gap-2 text-sm sm:w-auto">
            <Link
              className="nav-chip magnetic magnetic-soft block flex-1 truncate px-3 py-2 text-center text-xs sm:flex-none sm:px-4 sm:py-[0.45rem] sm:text-sm"
              href={`/pricing-calculator?lang=${locale}`}
              data-magnetic-factor="4"
            >
              <span className="magnetic-layer inline-block" data-magnetic-layer-factor="1.5">
                {dict.nav.calculator}
              </span>
            </Link>
            <Link
              className="nav-chip magnetic magnetic-soft block flex-1 truncate px-3 py-2 text-center text-xs sm:flex-none sm:px-4 sm:py-[0.45rem] sm:text-sm"
              href="https://orderlinks.ch"
              target="_blank"
              rel="noreferrer"
              data-magnetic-factor="4"
            >
              <span className="magnetic-layer inline-block" data-magnetic-layer-factor="1.5">
                {dict.nav.demo}
              </span>
            </Link>
            <details className="lang-switcher relative sm:hidden">
              <summary className="nav-chip block cursor-pointer px-3 py-2 text-center text-xs">
                {locale.toUpperCase()}
              </summary>
              <div className="absolute right-0 top-[calc(100%+0.4rem)] z-20 flex min-w-[132px] flex-col gap-1 rounded-xl border border-black/10 bg-white p-2 shadow-lg">
                {SUPPORTED_LOCALES.map((lang) => (
                  <Link
                    key={`mobile-${lang}`}
                    href={`/?lang=${lang}`}
                    className={`lang-chip text-center ${lang === locale ? "lang-chip-active" : ""}`}
                  >
                    {lang.toUpperCase()}
                  </Link>
                ))}
              </div>
            </details>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="hidden text-xs text-neutral-600 sm:inline">{dict.nav.language}</span>
              {SUPPORTED_LOCALES.map((lang) => (
                <Link
                  key={lang}
                  href={`/?lang=${lang}`}
                  className={`lang-chip ${lang === locale ? "lang-chip-active" : ""}`}
                >
                  {lang.toUpperCase()}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-4 pb-20 pt-10 sm:px-6 lg:px-10">
        <section
          className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
          data-reveal
          data-reveal-direction="up"
        >
          <div className="space-y-6" data-reveal data-reveal-delay="40" data-reveal-direction="up">
            <p className="inline-flex rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium tracking-wide text-neutral-700">
              {dict.hero.badge}
            </p>
            <h1 className="display-title text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {dict.hero.title}
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-neutral-700 sm:text-lg">
              {dict.hero.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/pricing-calculator?lang=${locale}`}
                className="group cta-primary magnetic magnetic-soft"
                data-magnetic-factor="7"
              >
                <span className="magnetic-layer inline-flex items-center gap-1" data-magnetic-layer-factor="1.6">
                  <span>{dict.hero.ctaPrimary}</span>
                  <span aria-hidden className="text-sm transition group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </Link>
              <Link
                href="https://orderlinks.ch"
                target="_blank"
                rel="noreferrer"
                className="group cta-secondary magnetic magnetic-soft"
                data-magnetic-factor="7"
              >
                <span className="magnetic-layer inline-flex items-center gap-1" data-magnetic-layer-factor="1.6">
                  <span>{dict.hero.ctaSecondary}</span>
                  <span aria-hidden className="text-sm">
                    ↗
                  </span>
                </span>
              </Link>
            </div>
          </div>
          <div
            className="glass-section hover-lift magnetic magnetic-soft kinetic-shell relative rounded-2xl p-5 sm:p-6"
            data-reveal
            data-reveal-delay="120"
            data-reveal-direction="left"
            data-magnetic-factor="6"
          >
            <div
              className="magnetic-layer depth-layer-far absolute -right-10 -top-10 h-44 w-44 rounded-full bg-black/6 blur-2xl"
              data-magnetic-layer-factor="0.8"
            />
            <div
              className="magnetic-layer depth-layer-far absolute -bottom-12 -left-10 h-40 w-40 rounded-full bg-neutral-400/20 blur-2xl"
              data-magnetic-layer-factor="0.85"
            />
            <div
              className="magnetic-layer depth-layer-mid absolute right-6 top-6 h-20 w-20 rounded-full border border-black/12"
              data-magnetic-layer-factor="1.25"
            />
            <div
              className="magnetic-layer depth-layer-near absolute right-10 top-10 h-12 w-12 rounded-full border border-black/10"
              data-magnetic-layer-factor="1.5"
            />
            <div
              className="magnetic-layer depth-layer-mid absolute left-6 top-[46%] h-px w-[72%] bg-linear-to-r from-black/10 to-transparent"
              data-magnetic-layer-factor="1.15"
            />
            <div
              className="tilt-interactive premium-soft magnetic-layer depth-layer-mid relative flex min-h-[260px] flex-col justify-between rounded-xl p-5"
              data-tilt-factor="8"
              data-magnetic-layer-factor="1.1"
            >
              <div className="magnetic-layer depth-layer-mid flex items-center gap-4" data-magnetic-layer-factor="1.35">
                <div className="magnetic-layer depth-layer-near relative" data-magnetic-layer-factor="1.8">
                  <div className="absolute -inset-2 rounded-2xl bg-black/8 blur-md" />
                  <Image
                    src={withAssetVersion("/logo.png")}
                    alt="OrderLinks logo"
                    width={72}
                    height={72}
                    className="relative rounded-xl border border-black/10 bg-white p-1.5"
                  />
                </div>
                <div className="magnetic-layer depth-layer-near" data-magnetic-layer-factor="1.45">
                  <p className="section-title text-lg font-semibold tracking-wide">OrderLinks</p>
                  <p className="text-xs text-neutral-600">Restaurant Operating Platform</p>
                </div>
              </div>
              <div className="magnetic-layer depth-layer-mid space-y-3" data-magnetic-layer-factor="1.25">
                <div className="flex items-center gap-2">
                  <span className="magnetic-layer depth-layer-near h-2 w-2 rounded-full bg-neutral-900" data-magnetic-layer-factor="1.9" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-500">
                    Swiss-ready, multilingual, conversion focused
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div
                    className="magnetic-layer depth-layer-near rounded-lg border border-black/10 bg-white px-3 py-2 text-center text-xs font-semibold tracking-wide transition duration-300 hover:-translate-y-px"
                    data-magnetic-layer-factor="2"
                  >
                    Website
                  </div>
                  <div
                    className="magnetic-layer depth-layer-near rounded-lg border border-black/10 bg-white px-3 py-2 text-center text-xs font-semibold tracking-wide transition duration-300 hover:-translate-y-px"
                    data-magnetic-layer-factor="2.15"
                  >
                    Ordering
                  </div>
                  <div
                    className="magnetic-layer depth-layer-near rounded-lg border border-black/10 bg-white px-3 py-2 text-center text-xs font-semibold tracking-wide transition duration-300 hover:-translate-y-px"
                    data-magnetic-layer-factor="2.3"
                  >
                    POS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-3" data-reveal data-reveal-direction="up">
          <h2 className="section-title text-2xl font-semibold sm:text-3xl">{dict.section.featureTitle}</h2>
          <p className="max-w-3xl text-neutral-700">{dict.section.featureSubtitle}</p>
          <div className="grid gap-5 pt-4 lg:grid-cols-2">
            {dict.features.map((feature, index) => {
              const hasDevicePairLayout =
                feature.medias.length === 2 && feature.medias.some((item) => item.portrait) && feature.medias.some((item) => !item.portrait);

              return (
                <article
                  key={feature.title}
                  className="feature-card magnetic magnetic-soft"
                  data-magnetic-factor="6"
                  data-reveal
                  data-reveal-direction="up"
                  data-reveal-delay={String((index % 6) * 60)}
                >
                  <div
                    className={`magnetic-layer depth-layer-mid grid gap-3 ${
                      feature.medias.length > 1
                        ? hasDevicePairLayout
                          ? "sm:grid-cols-12"
                          : "sm:grid-cols-2"
                        : "grid-cols-1"
                    }`}
                    data-magnetic-layer-factor="1.2"
                  >
                    {feature.medias.map((media, mediaIndex) => (
                      <div
                        key={`${feature.title}-${media.src}-${mediaIndex}`}
                        className={`magnetic-layer depth-layer-near relative overflow-hidden rounded-xl border border-black/10 bg-[#f8f8f8] ${
                          feature.medias.length > 1
                            ? "flex h-[360px] items-center justify-center p-3 sm:h-[400px] lg:h-[430px]"
                            : ""
                        } ${hasDevicePairLayout ? (media.portrait ? "sm:col-span-5" : "sm:col-span-7") : ""}`}
                        data-magnetic-layer-factor={String(1.45 + mediaIndex * 0.15)}
                      >
                        {media.role ? (
                          <span
                            className="magnetic-layer depth-layer-near absolute left-2 top-2 z-10 rounded-full border border-black/10 bg-white/90 px-2 py-1 text-[11px] font-semibold text-neutral-700"
                            data-magnetic-layer-factor="2"
                          >
                            {media.role}
                          </span>
                        ) : null}
                        {media.mediaType === "video" ? (
                          <video
                            className="aspect-video w-full object-cover"
                            src={withAssetVersion(media.src)}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                          />
                        ) : (
                          <Image
                            className={
                              feature.medias.length > 1
                                ? media.portrait
                                  ? "h-full w-auto object-contain"
                                  : "h-full w-full object-contain"
                                : "h-auto w-full"
                            }
                            src={withAssetVersion(media.src)}
                            alt={media.alt}
                            width={1800}
                            height={1000}
                            sizes={
                              feature.medias.length > 1
                                ? hasDevicePairLayout
                                  ? "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 22vw"
                                  : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 24vw"
                                : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            }
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="magnetic-layer depth-layer-mid mt-5 space-y-3" data-magnetic-layer-factor="1.15">
                    <h3 className="magnetic-layer depth-layer-near text-lg font-semibold leading-snug" data-magnetic-layer-factor="1.55">
                      {feature.title}
                      {feature.soon ? (
                        <span
                          className="magnetic-layer ml-2 rounded-full bg-neutral-900 px-2 py-0.5 text-xs font-medium text-white"
                          data-magnetic-layer-factor="2.05"
                        >
                          Soon
                        </span>
                      ) : null}
                    </h3>
                    <p className="magnetic-layer depth-layer-far text-sm leading-relaxed text-neutral-700" data-magnetic-layer-factor="1.05">
                      {feature.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section
          className="glass-section space-y-3 rounded-2xl p-6 sm:p-8"
          data-reveal
          data-reveal-direction="up"
        >
          <h2 className="section-title text-2xl font-semibold sm:text-3xl">{dict.section.faqTitle}</h2>
          <p className="text-neutral-700">{dict.section.faqSubtitle}</p>
          <div className="grid gap-4 pt-2 md:grid-cols-2">
            {dict.faq.map((item) => (
              <article
                key={item.q}
                className="hover-lift magnetic magnetic-soft kinetic-shell rounded-xl border border-black/10 bg-[#fafafa] p-0"
                data-magnetic-factor="5"
                data-reveal
                data-reveal-delay="80"
                data-reveal-direction="up"
              >
                <div
                  className="tilt-interactive magnetic-layer depth-layer-mid premium-soft rounded-xl p-4"
                  data-tilt-factor="6"
                  data-magnetic-layer-factor="1.2"
                >
                  <h3 className="magnetic-layer depth-layer-near text-base font-semibold" data-magnetic-layer-factor="1.55">
                    {item.q}
                  </h3>
                  <p className="magnetic-layer depth-layer-far mt-2 text-sm leading-relaxed text-neutral-700" data-magnetic-layer-factor="1.05">
                    {item.a}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="glass-section space-y-3 rounded-2xl p-6 sm:p-8"
          data-reveal
          data-reveal-direction="up"
        >
          <h2 className="section-title text-2xl font-semibold sm:text-3xl">{contact.title}</h2>
          <p className="text-neutral-700">{contact.subtitle}</p>
          <div className="grid gap-3 pt-2 sm:grid-cols-2 lg:grid-cols-3">
            <a
              className="group magnetic kinetic-shell rounded-xl border border-[#121212]/15 bg-[#121212]/3 p-0 transition hover:border-[#121212]/35 hover:bg-[#121212]/6"
              href="mailto:order.links.26@gmail.com"
              data-magnetic-factor="5"
            >
              <div className="tilt-interactive rounded-xl p-4" data-tilt-factor="5">
                <div className="flex items-center gap-2">
                  <span
                    className="magnetic-layer flex h-7 w-7 items-center justify-center rounded-full bg-[#121212] text-white"
                    data-magnetic-layer-factor="1.9"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5 fill-none stroke-current">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3.75 7.5 12 13.25 20.25 7.5" />
                      <rect x="3.75" y="5.25" width="16.5" height="13.5" rx="2.25" strokeWidth="1.8" />
                    </svg>
                  </span>
                  <p className="magnetic-layer text-xs font-semibold uppercase tracking-wide text-[#121212]/70" data-magnetic-layer-factor="1.3">
                    {contact.email}
                  </p>
                </div>
                <p
                  className="magnetic-layer mt-2 break-all text-sm font-semibold text-[#121212] underline-offset-4 group-hover:underline"
                  data-magnetic-layer-factor="1.1"
                >
                  order.links.26@gmail.com
                </p>
              </div>
            </a>
            <a
              className="group magnetic kinetic-shell rounded-xl border border-[#121212]/15 bg-[#121212]/3 p-0 transition hover:border-[#121212]/35 hover:bg-[#121212]/6"
              href="tel:+41782495983"
              data-magnetic-factor="5"
            >
              <div className="tilt-interactive rounded-xl p-4" data-tilt-factor="5">
                <div className="flex items-center gap-2">
                  <span
                    className="magnetic-layer flex h-7 w-7 items-center justify-center rounded-full bg-[#121212] text-white"
                    data-magnetic-layer-factor="1.9"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5 fill-none stroke-current">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M4.8 6.2a2 2 0 0 1 2.08-1.1l2.2.44a2 2 0 0 1 1.6 1.58l.27 1.34a2 2 0 0 1-.58 1.86l-1.06 1.06a14.2 14.2 0 0 0 4.3 4.3l1.06-1.06a2 2 0 0 1 1.86-.58l1.34.27a2 2 0 0 1 1.58 1.6l.44 2.2a2 2 0 0 1-1.1 2.08l-1.19.6c-.78.39-1.67.44-2.48.13a19.2 19.2 0 0 1-11.9-11.9 2.9 2.9 0 0 1 .13-2.48l.6-1.19Z"
                      />
                    </svg>
                  </span>
                  <p className="magnetic-layer text-xs font-semibold uppercase tracking-wide text-[#121212]/70" data-magnetic-layer-factor="1.3">
                    {contact.phone}
                  </p>
                </div>
                <p
                  className="magnetic-layer mt-2 text-sm font-semibold text-[#121212] underline-offset-4 group-hover:underline"
                  data-magnetic-layer-factor="1.1"
                >
                  +41 78 249 59 83
                </p>
              </div>
            </a>
            <a
              className="group magnetic kinetic-shell rounded-xl border border-[#121212]/15 bg-[#121212]/3 p-0 transition hover:border-[#121212]/35 hover:bg-[#121212]/6 sm:col-span-2 lg:col-span-1"
              href="https://wa.me/41782495983"
              target="_blank"
              rel="noreferrer"
              data-magnetic-factor="5"
            >
              <div className="tilt-interactive rounded-xl p-4" data-tilt-factor="5">
                <div className="flex items-center gap-2">
                  <span
                    className="magnetic-layer flex h-7 w-7 items-center justify-center rounded-full bg-[#121212] text-white"
                    data-magnetic-layer-factor="1.9"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5 fill-current">
                      <path d="M12 4a8 8 0 0 0-6.95 11.95L4 20l4.2-1.02A8 8 0 1 0 12 4Zm0 14.5a6.45 6.45 0 0 1-3.3-.9l-.24-.14-2.5.61.62-2.43-.16-.25A6.5 6.5 0 1 1 12 18.5Zm3.57-4.2c-.2-.1-1.16-.57-1.35-.64-.18-.06-.31-.1-.45.1-.13.2-.5.64-.61.76-.11.12-.22.14-.41.05a5.3 5.3 0 0 1-1.56-.96 5.95 5.95 0 0 1-1.1-1.37c-.11-.2-.01-.3.08-.4.09-.09.2-.22.3-.33.1-.12.13-.2.2-.34.07-.13.03-.24-.02-.34-.05-.1-.45-1.07-.61-1.47-.16-.38-.33-.33-.45-.34h-.38a.73.73 0 0 0-.53.25c-.18.2-.69.68-.69 1.66 0 .97.71 1.91.8 2.04.1.13 1.4 2.13 3.4 2.99.47.2.84.31 1.13.4.47.15.9.13 1.24.08.38-.06 1.16-.47 1.33-.92.16-.45.16-.84.11-.92-.05-.08-.18-.13-.38-.23Z" />
                    </svg>
                  </span>
                  <p className="magnetic-layer text-xs font-semibold uppercase tracking-wide text-[#121212]/70" data-magnetic-layer-factor="1.3">
                    {contact.whatsapp}
                  </p>
                </div>
                <p
                  className="magnetic-layer mt-2 text-sm font-semibold text-[#121212] underline-offset-4 group-hover:underline"
                  data-magnetic-layer-factor="1.1"
                >
                  +41 78 249 59 83
                </p>
              </div>
            </a>
          </div>
          <p className="text-sm text-neutral-700">{contact.hours}</p>
        </section>
      </main>
    </div>
  );
}
