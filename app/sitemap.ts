import type { MetadataRoute } from "next";
import { LOCALE_PATHS, PRICING_LOCALE_PATHS, SITE_URL, toAbsoluteUrl } from "./lib/seo";

function toLanguageAlternates(paths: Record<string, string>) {
  return Object.fromEntries(Object.entries(paths).map(([locale, path]) => [locale, toAbsoluteUrl(path)]));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
      alternates: {
        languages: toLanguageAlternates(LOCALE_PATHS),
      },
    },
    {
      url: toAbsoluteUrl("/pricing-calculator"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: toLanguageAlternates(PRICING_LOCALE_PATHS),
      },
    },
  ];
}
