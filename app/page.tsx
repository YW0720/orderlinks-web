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
        "标准定制网页服务 750 CHF；如同时开通预约、在线点餐等附加功能，可享组合优惠。若您已拥有餐厅官网，也可在此基础上接入相关功能，从而节省大量定制费用。系统维护、更新与基础支持费用 19 CHF/月起。欢迎前往价格计算器页面查看详细报价。",
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
      {
        title: "长期维护与持续优化",
        benefit:
          "提供稳定的长期维护与内容迭代支持，持续进行性能、兼容性与转化细节优化，确保网站在不同运营阶段都能保持专业体验与业务价值。",
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
        q: "网页内容更新频率是怎样的？",
        a: "基础支持包含每月 1 次免费更新。若需要更高频率，可在价格计算器选择“更新服务支持”：每周更新或每日更新。",
      },
      {
        q: "支付能力是否集成？",
        a: "支持 Stripe 在线付款能力，并可与餐厅业务流程结合，实现更完整的下单与支付闭环。",
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
        "Standard custom website delivery is CHF 750. Preferential bundled pricing applies when add-ons such as reservations and online ordering are enabled. If your restaurant already has an existing website, the same features can be integrated into your current site, helping you save substantial customization costs. Fees for maintenance, updates, and basic support start at CHF 19/month. You are welcome to visit the pricing calculator page for a detailed quotation.",
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
      {
        title: "Long-term maintenance and continuous optimization",
        benefit:
          "Ongoing maintenance and iterative improvements keep your site reliable while continuously refining performance, compatibility, and conversion details as your business evolves.",
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
        q: "How often can website content be updated?",
        a: "Base support includes one free content update per month. If you need a higher frequency, choose \"Update Service Support\" in the pricing calculator: weekly updates or daily updates.",
      },
      {
        q: "Can online payment be integrated?",
        a: "Stripe-based payment workflow is supported to provide a smoother order-to-payment journey.",
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
      badge: "Plateforme moderne pour restaurants suisses",
      title: "Une expérience digitale haut de gamme orientée conversion",
      subtitle:
        "OrderLinks réunit site sur mesure, commande en ligne, réservation, coordination cuisine et analyses dans une seule plateforme performante.",
      pricingCardTitle: "Prix du site web",
      pricingHighlight:
        "Le service standard de site web sur mesure est de CHF 750, avec un tarif groupé avantageux en cas d'activation de modules comme la réservation et la commande en ligne. Si votre restaurant dispose déjà d'un site, ces fonctionnalités peuvent être intégrées à l'existant afin de réduire les coûts de personnalisation. La maintenance, les mises à jour et le support de base commencent à CHF 19/mois. Consultez le calculateur de prix pour un devis détaillé.",
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
        title: "Présentation visuelle de haute qualité et effets d'interaction",
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
      {
        title: "Maintenance à long terme et optimisation continue",
        benefit:
          "Une maintenance durable et des améliorations régulières garantissent la fiabilité du site, avec des optimisations continues de performance, compatibilité et conversion selon l'évolution de votre activité.",
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
        q: "À quelle fréquence le contenu du site peut-il être mis à jour ?",
        a: "Le support de base inclut 1 mise à jour gratuite par mois. Si vous avez besoin d’une fréquence plus élevée, choisissez l’option « Support de mise à jour » dans le calculateur : mise à jour hebdomadaire ou quotidienne.",
      },
      {
        q: "Le paiement en ligne est-il pris en charge ?",
        a: "Oui, Stripe peut être intégré pour fluidifier le parcours de commande et paiement.",
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
      badge: "Moderne Plattform für Schweizer Restaurants",
      title: "Premium-Digitalerlebnis mit klarer Conversion-Wirkung",
      subtitle:
        "OrderLinks vereint Website, Online-Bestellung, Reservierung, Küchenprozess und Analyse in einer integrierten Plattform für messbare Ergebnisse.",
      pricingCardTitle: "Website-Preis",
      pricingHighlight:
        "Der Standardservice für eine individuell angepasste Website beträgt CHF 750. Bei Aktivierung von Zusatzfunktionen wie Reservierung und Online-Bestellung gelten gebündelte Preisvorteile. Falls Ihr Restaurant bereits eine Website hat, können dieselben Funktionen in die bestehende Seite integriert werden, um Anpassungskosten deutlich zu reduzieren. Wartung, Updates und Basis-Support beginnen bei CHF 19/Monat. Für ein detailliertes Angebot besuchen Sie bitte den Preisrechner.",
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
      {
        title: "Langfristige Wartung und kontinuierliche Optimierung",
        benefit:
          "Durch laufende Wartung und fortlaufende Verbesserungen bleibt die Website stabil, während Performance, Kompatibilität und Conversion-Details über alle Betriebsphasen hinweg gezielt optimiert werden.",
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
        q: "Wie oft können Website-Inhalte aktualisiert werden?",
        a: "Im Basissupport ist 1 kostenloses Inhaltsupdate pro Monat enthalten. Falls Sie häufigere Updates brauchen, wählen Sie im Preisrechner „Aktualisierungsservice“: wöchentliche Updates oder tägliche Updates.",
      },
      {
        q: "Kann Online-Zahlung integriert werden?",
        a: "Ja, Stripe kann in den Bestellprozess eingebunden werden.",
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

const HERO_STATS: Record<
  Locale,
  Array<{
    value: string;
    label: string;
  }>
> = {
  zh: [
    { value: "3+", label: "支持语言" },
    { value: "5-10", label: "天上线周期" },
    { value: "CHF 550+", label: "网站交付起价" },
    { value: "CHF 19/月+", label: "维护与支持起价" },
  ],
  en: [
    { value: "3+", label: "Languages" },
    { value: "5-10", label: "Days to launch" },
    { value: "CHF 550+", label: "Website delivery" },
    { value: "CHF 19/mo+", label: "Maintenance & support" },
  ],
  fr: [
    { value: "3+", label: "Langues" },
    { value: "5-10", label: "Jours de mise en ligne" },
    { value: "CHF 550+", label: "Prix de départ du site" },
    { value: "CHF 19/mois+", label: "Maintenance et support" },
  ],
  de: [
    { value: "3+", label: "Sprachen" },
    { value: "5-10", label: "Tage bis Go-Live" },
    { value: "CHF 550+", label: "Website ab" },
    { value: "CHF 19/Monat+", label: "Wartung und Support" },
  ],
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
  const heroStats = HERO_STATS[locale];
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
    <div className={`page-shell homepage-apple homepage-locale-${locale} relative min-h-svh text-neutral-900`}>
      <ScrollRevealObserver />
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

      <header className="sticky top-0 z-30 px-4 pt-3 sm:px-6 lg:px-10">
        <div className="liquid-glass home-nav mx-auto flex w-full max-w-7xl flex-col gap-2 rounded-2xl px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-6">
          <Link href={LOCALE_PATHS[locale]} className="home-nav-brand flex items-center gap-2">
            <Image src={withAssetVersion("/logo.png")} alt="OrderLinks logo" width={36} height={36} />
            <span className="text-sm font-semibold tracking-wide">OrderLinks</span>
          </Link>
          <nav className="home-nav-links flex w-full items-center gap-2 text-sm sm:w-auto">
            <Link
              className="home-nav-link nav-chip magnetic magnetic-soft block flex-1 truncate px-3 py-2 text-center text-xs sm:flex-none sm:px-4 sm:py-[0.45rem] sm:text-sm"
              href={PRICING_LOCALE_PATHS[locale]}
              data-magnetic-factor="4"
            >
              <span className="magnetic-layer inline-block" data-magnetic-layer-factor="1.5">
                {dict.nav.calculator}
              </span>
            </Link>
            <Link
              className="home-nav-link nav-chip magnetic magnetic-soft block flex-1 truncate px-3 py-2 text-center text-xs sm:flex-none sm:px-4 sm:py-[0.45rem] sm:text-sm"
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
            <div className="home-lang-list hidden items-center gap-2 sm:flex">
              <span className="home-lang-label hidden text-xs text-neutral-600 sm:inline">{dict.nav.language}</span>
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

      <main className="home-main mx-auto flex w-full max-w-7xl flex-col gap-14 px-4 pb-20 pt-10 sm:px-6 lg:px-10">
        <section className="hero-section" data-reveal data-reveal-direction="up">
          <div className="hero-top space-y-6" data-reveal data-reveal-delay="40" data-reveal-direction="up">
            <p className="hero-badge inline-flex rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium tracking-wide text-neutral-700">
              {dict.hero.badge}
            </p>
            <h1 className="display-title hero-title text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {dict.hero.title}
            </h1>
            <p className="hero-subtitle max-w-3xl text-base leading-relaxed text-neutral-700 sm:text-lg">
              {dict.hero.subtitle}
            </p>
            <div className="hero-cta-row flex flex-wrap items-center gap-3">
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
          <div className="hero-visual-wrap" data-reveal data-reveal-delay="120" data-reveal-direction="up">
            <div
              className="glass-section hero-pricing-card hover-lift magnetic magnetic-soft relative overflow-hidden rounded-2xl border border-black/10 bg-linear-to-br from-white/90 via-white/78 to-neutral-100/65 p-4 shadow-[0_14px_30px_rgba(20,20,20,0.08)] sm:p-5"
              data-magnetic-factor="6"
            >
              <div
                className="deco-glow magnetic-layer depth-layer-far absolute -right-10 -top-12 h-48 w-48 rounded-full bg-linear-to-br from-neutral-300/35 to-transparent blur-2xl"
                data-magnetic-layer-factor="0.8"
              />
              <div
                className="deco-glow magnetic-layer depth-layer-far absolute -bottom-16 -left-14 h-52 w-52 rounded-full bg-linear-to-tr from-neutral-400/20 to-transparent blur-2xl"
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
              </div>
            </div>
          </div>
          <div className="hero-highlights" data-reveal data-reveal-delay="180" data-reveal-direction="up">
            {heroStats.map((item, index) => (
              <article
                key={`${item.value}-${item.label}`}
                className={`hero-highlight-item ${index === heroStats.length - 1 ? "hero-highlight-item-wide" : "hero-highlight-item-compact"}`}
              >
                <p className="hero-highlight-value">{item.value}</p>
                <p className="hero-highlight-label">{item.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="benefits-section space-y-4" data-reveal data-reveal-direction="up">
          <h2 className="section-title home-section-title text-2xl font-semibold sm:text-3xl">{dict.section.customWebsiteTitle}</h2>
          <p className="home-section-subtitle max-w-3xl text-neutral-700">{dict.section.customWebsiteSubtitle}</p>
          <div className="benefits-grid grid gap-4 pt-2 md:grid-cols-2">
            {dict.customWebsiteItems.map((item, index) => (
              <article
                key={item.title}
                className={`benefit-card hover-lift magnetic magnetic-soft rounded-xl border border-black/10 bg-white/70 p-4 ${
                  index === 0 ? "benefit-card-emphasis md:col-span-2" : ""
                }`}
                data-magnetic-factor="5"
                data-reveal
                data-reveal-direction="up"
              >
                <p className="mb-2 text-xs font-semibold tracking-[0.12em] text-neutral-500">
                  {(index + 1).toString().padStart(2, "0")}
                </p>
                <h3 className="text-base font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">{item.benefit}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="features-section space-y-3" data-reveal data-reveal-direction="up">
          <h2 className="section-title home-section-title text-2xl font-semibold sm:text-3xl">{dict.section.featureTitle}</h2>
          <p className="home-section-subtitle max-w-3xl text-neutral-700">{dict.section.featureSubtitle}</p>
          <div className="feature-showcase-stack pt-4">
            {dict.features.map((feature, index) => {
              const hasDevicePairLayout =
                feature.medias.length === 2 && feature.medias.some((item) => item.portrait) && feature.medias.some((item) => !item.portrait);
              const spotlight = index < 2;

              return (
                <article
                  key={feature.title}
                  className={`feature-card product-card magnetic magnetic-soft ${spotlight ? "feature-card-spotlight" : ""}`}
                  data-magnetic-factor="6"
                  data-reveal
                  data-reveal-direction="up"
                  data-reveal-delay={String((index % 6) * 60)}
                >
                  <div className="feature-headline magnetic-layer depth-layer-mid mb-5 space-y-2" data-magnetic-layer-factor="1.12">
                    <h3 className="magnetic-layer depth-layer-near text-[1.35rem] font-semibold leading-tight tracking-tight sm:text-[1.55rem]" data-magnetic-layer-factor="1.3">
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
                    <p className="magnetic-layer depth-layer-far text-sm leading-relaxed text-neutral-700 sm:text-[0.95rem]" data-magnetic-layer-factor="1.05">
                      {feature.description}
                    </p>
                  </div>
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
                        className={`product-media magnetic-layer depth-layer-near relative overflow-hidden rounded-xl border border-black/10 bg-[#f8f8f8] ${
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
                </article>
              );
            })}
          </div>
        </section>

        <section
          className="glass-section faq-section space-y-3 rounded-2xl p-6 sm:p-8"
          data-reveal
          data-reveal-direction="up"
        >
          <h2 className="section-title home-section-title text-2xl font-semibold sm:text-3xl">{dict.section.faqTitle}</h2>
          <p className="home-section-subtitle text-neutral-700">{dict.section.faqSubtitle}</p>
          <div className="faq-list pt-2">
            {dict.faq.map((item) => (
              <details
                key={item.q}
                className="faq-card faq-item hover-lift magnetic magnetic-soft rounded-xl border border-black/10 bg-[#fafafa] p-0"
                data-magnetic-factor="4"
                data-reveal
                data-reveal-delay="80"
                data-reveal-direction="up"
              >
                <summary className="faq-trigger flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-left">
                  <h3 className="text-base font-semibold">{item.q}</h3>
                  <span aria-hidden className="faq-plus text-lg leading-none text-neutral-500">
                    +
                  </span>
                </summary>
                <div className="faq-content border-t border-black/8 px-4 pb-4 pt-3">
                  <p className="text-sm leading-relaxed text-neutral-700">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section
          className="glass-section contact-section space-y-3 rounded-2xl p-6 sm:p-8"
          data-reveal
          data-reveal-direction="up"
        >
          <h2 className="section-title home-section-title text-2xl font-semibold sm:text-3xl">{contact.title}</h2>
          <p className="home-section-subtitle text-neutral-700">{contact.subtitle}</p>
          <div className="contact-panel pt-2">
            <div className="contact-quick-links">
              <a className="contact-inline-link" href="mailto:contact@orderlinks.ch">
                <span className="contact-inline-label">{contact.email}</span>
                <span className="contact-inline-value">contact@orderlinks.ch</span>
              </a>
              <a className="contact-inline-link" href="tel:+41782495983">
                <span className="contact-inline-label">{contact.phone}</span>
                <span className="contact-inline-value">+41 78 249 59 83</span>
              </a>
              <a className="contact-inline-link" href="https://wa.me/41782495983" target="_blank" rel="noreferrer">
                <span className="contact-inline-label">{contact.whatsapp}</span>
                <span className="contact-inline-value">+41 78 249 59 83</span>
              </a>
            </div>
          </div>
          <p className="text-sm text-neutral-700">{contact.hours}</p>
        </section>
      </main>
    </div>
  );
}
