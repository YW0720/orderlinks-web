export const SITE_NAME = "OrderLinks";
export const SITE_URL = "https://orderlinks.ch";

export const SUPPORTED_LOCALES = ["de", "fr", "en", "zh"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_PATHS: Record<SupportedLocale, string> = {
  zh: "/zh",
  en: "/",
  fr: "/fr",
  de: "/de",
};

export const PRICING_LOCALE_PATHS: Record<SupportedLocale, string> = {
  zh: "/pricing-calculator/zh",
  en: "/pricing-calculator",
  fr: "/pricing-calculator/fr",
  de: "/pricing-calculator/de",
};

export const HOME_SEO_KEYWORDS: Record<SupportedLocale, string[]> = {
  zh: [
    "餐厅",
    "（餐厅）网站定制",
    "餐厅网站定制",
    "在线点餐",
    "POS",
    "餐厅POS系统",
    "在线预约",
    "瑞士餐厅系统",
    "瑞士多语言餐厅网站",
  ],
  en: [
    "restaurant",
    "custom restaurant website",
    "restaurant website development",
    "online ordering",
    "POS",
    "restaurant POS",
    "online reservation",
    "Swiss restaurant software",
    "multilingual restaurant website Switzerland",
  ],
  fr: [
    "restaurant",
    "site web restaurant sur mesure",
    "création site restaurant",
    "commande en ligne",
    "POS",
    "logiciel POS restaurant",
    "réservation en ligne",
    "solution restaurant Suisse",
    "site restaurant multilingue Suisse",
  ],
  de: [
    "restaurant",
    "maßgeschneiderte restaurant website",
    "restaurant website erstellen",
    "online bestellung",
    "POS",
    "restaurant POS system",
    "online reservierung",
    "restaurant software Schweiz",
    "mehrsprachige restaurant website Schweiz",
  ],
};

export const PRICING_SEO_KEYWORDS: Record<SupportedLocale, string[]> = {
  zh: ["餐厅报价", "餐厅网站定制价格", "在线点餐系统价格", "POS系统费用", "在线预约系统价格", "瑞士餐厅软件价格"],
  en: [
    "restaurant pricing calculator",
    "custom restaurant website cost",
    "online ordering system pricing",
    "POS pricing",
    "online reservation software pricing",
    "Swiss restaurant software pricing",
  ],
  fr: [
    "calculateur prix restaurant",
    "coût site web restaurant sur mesure",
    "tarif commande en ligne",
    "tarif POS restaurant",
    "tarif réservation en ligne",
    "prix logiciel restaurant Suisse",
  ],
  de: [
    "preisrechner restaurant",
    "kosten maßgeschneiderte restaurant website",
    "preise online bestellsystem",
    "preise restaurant POS",
    "preise online reservierung",
    "preise restaurant software Schweiz",
  ],
};

export function toAbsoluteUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}
