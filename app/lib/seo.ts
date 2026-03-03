export const SITE_NAME = "OrderLinks";
export const SITE_URL = "https://orderlinks.ch";

export const SUPPORTED_LOCALES = ["zh", "en", "fr", "de"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_PATHS: Record<SupportedLocale, string> = {
  zh: "/?lang=zh",
  en: "/?lang=en",
  fr: "/?lang=fr",
  de: "/?lang=de",
};

export const PRICING_LOCALE_PATHS: Record<SupportedLocale, string> = {
  zh: "/pricing-calculator?lang=zh",
  en: "/pricing-calculator?lang=en",
  fr: "/pricing-calculator?lang=fr",
  de: "/pricing-calculator?lang=de",
};

export function toAbsoluteUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}
