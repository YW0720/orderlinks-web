import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollRevealObserver from "./components/ScrollRevealObserver";
import {
  HOME_SEO_KEYWORDS,
  LOCALE_PATHS,
  PRICING_LOCALE_PATHS,
  SITE_NAME,
  SITE_URL,
  SUPPORTED_LOCALES,
  type SupportedLocale,
} from "./lib/seo";

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
    pricingCardTitle: string;
    pricingHighlight: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  section: {
    customWebsiteTitle: string;
    customWebsiteSubtitle: string;
    featureTitle: string;
    featureSubtitle: string;
    faqTitle: string;
    faqSubtitle: string;
  };
  customWebsiteItems: Array<{
    title: string;
    benefit: string;
  }>;
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
      pricingCardTitle: "网站价格",
      pricingHighlight:
        "标准定制网页服务 750 CHF 起；如同时开通预约、在线点餐等附加功能，可享组合优惠。若您已拥有餐厅官网，也可在现有网站基础上接入相关功能，从而节省大量定制费用。系统维护、更新与基础支持费用 19 CHF/月起。欢迎前往价格计算器页面查看详细报价。",
      ctaPrimary: "获取专属价格测算",
      ctaSecondary: "查看产品 Demo",
    },
    section: {
      customWebsiteTitle: "定制网页将为餐厅带来的核心能力",
      customWebsiteSubtitle:
        "在品牌表达、使用体验与增长效率之间建立平衡，让官网不仅“可展示”，更能持续支持获客与转化。",
      featureTitle: "核心功能",
      featureSubtitle:
        "从获客到复购，每个模块都围绕真实经营指标设计，帮助餐厅建立可量化、可复用的增长机制。",
      faqTitle: "常见问题",
      faqSubtitle: "关于上线周期、费用结构、多语能力与支付集成，这里给出明确答案。",
    },
    customWebsiteItems: [
      {
        title: "高质量视觉呈现与交互动效",
        benefit:
          "通过一致的视觉规范与适度动画反馈，强化品牌专业感，提升首次访问的信任度与停留时长。",
      },
      {
        title: "面向不同设备尺寸的界面优化",
        benefit:
          "针对手机、平板与桌面端进行自适配与可读性优化，降低浏览与下单阻力，减少因界面不适配导致的流失。",
      },
      {
        title: "深度 SEO 与 AI 搜索可见性优化",
        benefit:
          "从页面结构、语义信息到检索友好内容进行系统优化，帮助餐厅在传统搜索与 AI 问答场景中获得更稳定的曝光。",
      },
      {
        title: "法语、德语、英语多语言支持",
        benefit:
          "默认覆盖瑞士核心客群语言，并可按业务需要付费扩展更多语种，提升跨区域触达效率与沟通一致性。",
      },
    ],
    faq: [
      {
        q: "OrderLinks 适合哪些餐厅？",
        a: "适合希望快速上线官网、在线点餐、预约与后厨工作流的中小型到连锁餐厅，尤其适合瑞士多语市场。",
      },
      {
        q: "网站需要多少天才能上线?",
        a: "在餐厅资料与素材齐备的情况下，标准项目通常可在 5-10 天内完成上线；如涉及较多定制功能，周期将根据范围做相应评估。",
      },
      {
        q: "支付能力是否集成？",
        a: "支持 Stripe 在线付款能力，并可与餐厅业务流程结合，实现更完整的下单与支付闭环。",
      },
      {
        q: "系统是否支持数据导出和经营分析？",
        a: "是的，当您选择 POS 或在线点餐相关功能后，系统可提供图表化经营数据与历史订单 Excel 导出，便于餐厅进行日常复盘与经营决策。",
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
      pricingCardTitle: "Website Pricing",
      pricingHighlight:
        "Standard custom website delivery starts at CHF 750. Preferential bundled pricing applies when add-ons such as reservations and online ordering are enabled. If your restaurant already has an existing website, the same features can be integrated into your current site, helping you save substantial customization costs. Fees for maintenance, updates, and basic support start at CHF 19/month. You are welcome to visit the pricing calculator page for a detailed quotation.",
      ctaPrimary: "Get Pricing Estimate",
      ctaSecondary: "View Product Demo",
    },
    section: {
      customWebsiteTitle: "What a custom website delivers for your restaurant",
      customWebsiteSubtitle:
        "A balanced foundation across brand expression, user experience, and growth performance.",
      featureTitle: "Core Product Capabilities",
      featureSubtitle:
        "Every module is mapped to real business outcomes: acquisition, conversion, delivery quality, and retention.",
      faqTitle: "Frequently Asked Questions",
      faqSubtitle: "Clear answers on launch timeline, pricing model, multilingual setup, and payment integration.",
    },
    customWebsiteItems: [
      {
        title: "High-quality visual presentation and interaction effects",
        benefit:
          "Consistent design language and restrained motion cues strengthen brand credibility and improve visitor engagement.",
      },
      {
        title: "Interface optimization across device sizes",
        benefit:
          "Responsive tuning for mobile, tablet, and desktop reduces friction during browsing and ordering, helping limit drop-offs.",
      },
      {
        title: "Advanced SEO and AI search visibility optimization",
        benefit:
          "Semantic structure and search-friendly content improve discoverability in both traditional search engines and AI-assisted search journeys.",
      },
      {
        title: "French, German, and English multilingual support",
        benefit:
          "Core Swiss market languages are supported by default, with optional paid expansion to additional languages as needed.",
      },
    ],
    faq: [
      {
        q: "Who is OrderLinks built for?",
        a: "It is designed for independent and multi-location restaurants that need a fast launch for website, ordering, reservation, and operations.",
      },
      {
        q: "How many days does a website launch usually take?",
        a: "When core materials are ready, a standard website project is typically delivered within 5-10 days. If broader custom requirements are included, the timeline is adjusted based on scope.",
      },
      {
        q: "Can online payment be integrated?",
        a: "Stripe-based payment workflow is supported to provide a smoother order-to-payment journey.",
      },
      {
        q: "Do you support data export and analytics?",
        a: "Yes. When POS or online ordering features are enabled, the system provides analytics dashboards and historical order export in Excel to support daily operational reviews and decision-making.",
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
      badge: "Platform moderne pour restaurants suisses",
      title: "Une expérience digitale haut de gamme orientée conversion",
      subtitle:
        "OrderLinks réunit site sur mesure, commande en ligne, réservation, coordination cuisine et analyses dans une seule plateforme performante.",
      pricingCardTitle: "Prix du site web",
      pricingHighlight:
        "Le service standard de site web sur mesure commence à CHF 750, avec un tarif groupé avantageux en cas d'activation de modules comme la réservation et la commande en ligne. Si votre restaurant dispose déjà d'un site, ces fonctionnalités peuvent être intégrées à l'existant afin de réduire les coûts de personnalisation. La maintenance, les mises à jour et le support de base commencent à CHF 19/mois. Consultez le calculateur de prix pour un devis détaillé.",
      ctaPrimary: "Obtenir une estimation",
      ctaSecondary: "Voir la démo produit",
    },
    section: {
      customWebsiteTitle: "Ce qu'un site sur mesure apporte à votre restaurant",
      customWebsiteSubtitle:
        "Une base équilibrée entre image de marque, expérience utilisateur et performance commerciale.",
      featureTitle: "Fonctionnalités principales",
      featureSubtitle:
        "Chaque module cible un objectif business concret : acquisition, conversion, exécution et fidélisation.",
      faqTitle: "Questions fréquentes",
      faqSubtitle: "Réponses précises sur délais, tarification, multilingue et paiements.",
    },
    customWebsiteItems: [
      {
        title: "Presentation visuelle de haute qualite et effets d'interaction",
        benefit:
          "Une identité visuelle cohérente et des animations discrètes renforcent la crédibilité de la marque et la qualité de perception.",
      },
      {
        title: "Optimisation de l'interface pour tous les écrans",
        benefit:
          "L'adaptation mobile, tablette et desktop facilite la navigation et la commande, tout en réduisant les abandons liés à l'ergonomie.",
      },
      {
        title: "SEO approfondi et visibilité dans la recherche IA",
        benefit:
          "La structure sémantique et le contenu optimisé améliorent la présence sur les moteurs classiques et les expériences de recherche assistées par IA.",
      },
      {
        title: "Support multilingue français, allemand et anglais",
        benefit:
          "Les langues principales du marché suisse sont couvertes, avec extension payante vers d'autres langues selon les besoins.",
      },
    ],
    faq: [
      {
        q: "À quels restaurants s'adresse OrderLinks ?",
        a: "La solution convient aux restaurants indépendants et aux chaînes qui veulent lancer rapidement site, commande et réservation.",
      },
      {
        q: "En combien de jours le site peut-il être mis en ligne ?",
        a: "Lorsque les contenus et ressources principaux sont prêts, un projet standard est généralement mis en ligne sous 5-10 jours. En cas de personnalisation étendue, le délai est ajusté selon le périmètre.",
      },
      {
        q: "Le paiement en ligne est-il pris en charge ?",
        a: "Oui, Stripe peut être intégré pour fluidifier le parcours de commande et paiement.",
      },
      {
        q: "Proposez-vous export et analyses ?",
        a: "Oui. Lorsque les fonctionnalités POS ou commande en ligne sont activées, le système propose des tableaux d'analyse ainsi que l'export des commandes historiques en Excel pour faciliter le suivi quotidien et la prise de décision.",
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
      badge: "Moderne Platform für Schweizer Restaurants",
      title: "Premium-Digitalerlebnis mit klarer Conversion-Wirkung",
      subtitle:
        "OrderLinks vereint Website, Online-Bestellung, Reservierung, Küchenprozess und Analyse in einer integrierten Plattform für messbare Ergebnisse.",
      pricingCardTitle: "Website-Preis",
      pricingHighlight:
        "Der Standardservice für eine individuell angepasste Website beginnt bei CHF 750. Bei Aktivierung von Zusatzfunktionen wie Reservierung und Online-Bestellung gelten gebündelte Preisvorteile. Falls Ihr Restaurant bereits eine Website hat, können dieselben Funktionen in die bestehende Seite integriert werden, um Anpassungskosten deutlich zu reduzieren. Wartung, Updates und Basis-Support beginnen bei CHF 19/Monat. Für ein detailliertes Angebot besuchen Sie bitte den Preisrechner.",
      ctaPrimary: "Preisabschätzung erhalten",
      ctaSecondary: "Produktdemo ansehen",
    },
    section: {
      customWebsiteTitle: "Was eine individuelle Website für Ihr Restaurant leistet",
      customWebsiteSubtitle:
        "Eine ausgewogene Grundlage für Markenauftritt, Nutzererlebnis und nachhaltige Wachstumswirkung.",
      featureTitle: "Kernfunktionen",
      featureSubtitle:
        "Jedes Modul zahlt auf konkrete Kennzahlen ein: Akquise, Conversion, Ausführung und Bindung.",
      faqTitle: "Häufige Fragen",
      faqSubtitle: "Klare Informationen zu Rollout, Preisstruktur, Mehrsprachigkeit und Zahlungsintegration.",
    },
    customWebsiteItems: [
      {
        title: "Hochwertige visuelle Darstellung und Interaktionseffekte",
        benefit:
          "Ein konsistenter visueller Auftritt und gezielte Animationen stärken die Markenwirkung und verbessern die Verweildauer.",
      },
      {
        title: "Optimierte Oberfläche für verschiedene Gerätegrößen",
        benefit:
          "Anpassungen für Smartphone, Tablet und Desktop reduzieren Bedienhürden und unterstützen eine reibungsarme Conversion.",
      },
      {
        title: "Vertiefte SEO- und AI-Search-Optimierung",
        benefit:
          "Semantische Seitenstruktur und suchfreundliche Inhalte erhöhen die Sichtbarkeit in klassischen Suchmaschinen und KI-gestützten Suchergebnissen.",
      },
      {
        title: "Mehrsprachigkeit in Französisch, Deutsch und Englisch",
        benefit:
          "Die zentralen Sprachen des Schweizer Marktes sind abgedeckt; weitere Sprachen können bei Bedarf kostenpflichtig erweitert werden.",
      },
    ],
    faq: [
      {
        q: "Für welche Restaurants ist OrderLinks geeignet?",
        a: "Für einzelne Standorte und Ketten, die Website, Bestellung, Reservierung und Betriebsabläufe schnell einführen wollen.",
      },
      {
        q: "In wie vielen Tagen kann die Website live gehen?",
        a: "Wenn alle zentralen Inhalte und Materialien vorliegen, kann ein Standardprojekt in der Regel innerhalb von 5-10 Tagen live gehen. Bei erweitertem Funktionsumfang wird der Zeitplan entsprechend des Umfangs angepasst.",
      },
      {
        q: "Kann Online-Zahlung integriert werden?",
        a: "Ja, Stripe kann in den Bestellprozess eingebunden werden.",
      },
      {
        q: "Gibt es Export und Analyse?",
        a: "Ja. Wenn POS- oder Online-Bestellfunktionen aktiviert sind, stellt das System Analyse-Dashboards sowie den Excel-Export historischer Bestellungen bereit, um die tägliche Auswertung und fundierte Entscheidungen zu unterstützen.",
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
    phone: "Téléphone",
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
    return "en";
  }
  return SUPPORTED_LOCALES.includes(raw as Locale) ? (raw as Locale) : "en";
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
    keywords: HOME_SEO_KEYWORDS[locale],
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
  const localeKeywords = HOME_SEO_KEYWORDS[locale];

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "OrderLinks",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: ["fr", "de", "en", "zh"],
    description: dict.seoDescription,
    keywords: localeKeywords.join(", "),
    offers: {
      "@type": "Offer",
      priceCurrency: "CHF",
      availability: "https://schema.org/InStock",
    },
    audience: {
      "@type": "Audience",
      geographicArea: "Switzerland",
    },
    areaServed: {
      "@type": "Country",
      name: "Switzerland",
    },
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: dict.seoTitle,
    description: dict.seoDescription,
    url: `${SITE_URL}${LOCALE_PATHS[locale]}`,
    inLanguage: locale,
    keywords: localeKeywords.join(", "),
    about: [
      "Restaurant website customization",
      "Online ordering",
      "POS integration",
      "Online reservation",
      "Swiss restaurant market",
    ],
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
    <div className="page-shell relative min-h-svh text-neutral-900">
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <header className="sticky top-0 z-30 px-4 pt-4 sm:px-6 lg:px-10">
        <div className="liquid-glass mx-auto flex w-full max-w-7xl flex-col gap-2 rounded-2xl px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-6">
          <Link href={LOCALE_PATHS[locale]} className="flex items-center gap-2">
            <Image src={withAssetVersion("/logo.png")} alt="OrderLinks logo" width={36} height={36} />
            <span className="text-sm font-semibold tracking-wide">OrderLinks</span>
          </Link>
          <nav className="flex w-full items-center gap-2 text-sm sm:w-auto">
            <Link
              className="nav-chip magnetic magnetic-soft block flex-1 truncate px-3 py-2 text-center text-xs sm:flex-none sm:px-4 sm:py-[0.45rem] sm:text-sm"
              href={PRICING_LOCALE_PATHS[locale]}
              data-magnetic-factor="4"
            >
              <span className="magnetic-layer inline-block" data-magnetic-layer-factor="1.5">
                {dict.nav.calculator}
              </span>
            </Link>
            <Link
              className="nav-chip magnetic magnetic-soft block flex-1 truncate px-3 py-2 text-center text-xs sm:flex-none sm:px-4 sm:py-[0.45rem] sm:text-sm"
              href="https://orderlinksdemo.ch"
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
                    href={LOCALE_PATHS[lang]}
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
                  href={LOCALE_PATHS[lang]}
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
                href={PRICING_LOCALE_PATHS[locale]}
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
                href="https://orderlinksdemo.ch"
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
            className="glass-section hover-lift magnetic magnetic-soft kinetic-shell relative overflow-hidden rounded-2xl border border-black/10 bg-linear-to-br from-white/90 via-white/78 to-neutral-100/65 p-4 shadow-[0_14px_30px_rgba(20,20,20,0.08)] sm:p-5"
            data-reveal
            data-reveal-delay="120"
            data-reveal-direction="left"
            data-magnetic-factor="6"
          >
            <div
              className="magnetic-layer depth-layer-far absolute -right-10 -top-12 h-48 w-48 rounded-full bg-linear-to-br from-neutral-300/35 to-transparent blur-2xl"
              data-magnetic-layer-factor="0.8"
            />
            <div
              className="magnetic-layer depth-layer-far absolute -bottom-16 -left-14 h-52 w-52 rounded-full bg-linear-to-tr from-neutral-400/20 to-transparent blur-2xl"
              data-magnetic-layer-factor="0.85"
            />
            <div
              className="tilt-interactive premium-soft magnetic-layer depth-layer-mid relative flex min-h-[226px] flex-col gap-3 p-1 sm:p-2"
              data-tilt-factor="8"
              data-magnetic-layer-factor="1.1"
            >
              <div
                className="magnetic-layer depth-layer-mid flex items-center gap-3 rounded-xl bg-white/55 p-2.5"
                data-magnetic-layer-factor="1.35"
              >
                <div className="magnetic-layer depth-layer-near relative" data-magnetic-layer-factor="1.8">
                  <div className="absolute -inset-2 rounded-2xl bg-black/10 blur-md" />
                  <Image
                    src={withAssetVersion("/logo.png")}
                    alt="OrderLinks logo"
                    width={60}
                    height={60}
                    className="relative rounded-xl border border-black/10 bg-white p-1.5"
                  />
                </div>
                <div className="magnetic-layer depth-layer-near" data-magnetic-layer-factor="1.45">
                  <p className="section-title text-lg font-semibold tracking-wide">OrderLinks</p>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-neutral-500">Restaurant Operating Platform</p>
                </div>
              </div>
              <div
                className="magnetic-layer depth-layer-mid rounded-xl border border-slate-300/80 bg-slate-100/75 p-4"
                data-magnetic-layer-factor="1.22"
              >
                <div className="mb-1.5 flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600">{dict.hero.pricingCardTitle}</p>
                  <span className="h-2 w-2 rounded-full bg-slate-700/70" />
                </div>
                <p className="border-l-2 border-slate-400/70 pl-3 text-[13px] font-semibold leading-snug text-slate-900 sm:text-sm">
                  {dict.hero.pricingHighlight}
                </p>
              </div>
              <div className="magnetic-layer depth-layer-mid space-y-3" data-magnetic-layer-factor="1.25">
                <div className="grid grid-cols-3 gap-2">
                  <div
                    className="magnetic-layer depth-layer-near rounded-full border border-black/10 bg-white/85 px-3 py-2 text-center text-xs font-semibold tracking-wide transition duration-300 hover:-translate-y-px"
                    data-magnetic-layer-factor="2"
                  >
                    Website
                  </div>
                  <div
                    className="magnetic-layer depth-layer-near rounded-full border border-black/10 bg-white/85 px-3 py-2 text-center text-xs font-semibold tracking-wide transition duration-300 hover:-translate-y-px"
                    data-magnetic-layer-factor="2.15"
                  >
                    Ordering
                  </div>
                  <div
                    className="magnetic-layer depth-layer-near rounded-full border border-black/10 bg-white/85 px-3 py-2 text-center text-xs font-semibold tracking-wide transition duration-300 hover:-translate-y-px"
                    data-magnetic-layer-factor="2.3"
                  >
                    POS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4" data-reveal data-reveal-direction="up">
          <h2 className="section-title text-2xl font-semibold sm:text-3xl">{dict.section.customWebsiteTitle}</h2>
          <p className="max-w-3xl text-neutral-700">{dict.section.customWebsiteSubtitle}</p>
          <div className="grid gap-4 pt-2 md:grid-cols-2">
            {dict.customWebsiteItems.map((item) => (
              <article
                key={item.title}
                className="hover-lift magnetic magnetic-soft rounded-xl border border-black/10 bg-white/70 p-4"
                data-magnetic-factor="5"
                data-reveal
                data-reveal-direction="up"
              >
                <h3 className="text-base font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">{item.benefit}</p>
              </article>
            ))}
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
              href="mailto:contact@orderlinks.ch"
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
                  contact@orderlinks.ch
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
