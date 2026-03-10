import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED_LOCALES = ["de", "fr", "en", "zh"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

function isSupportedLocale(locale: string): locale is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale);
}

function resolvePreferredLocale(request: NextRequest): SupportedLocale {
  const acceptLanguage = request.headers.get("accept-language");

  if (!acceptLanguage) {
    return "en";
  }

  const candidates = acceptLanguage
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase())
    .filter(Boolean) as string[];

  for (const candidate of candidates) {
    const baseLocale = candidate.split("-")[0];
    if (isSupportedLocale(baseLocale)) {
      return baseLocale;
    }
  }

  return "en";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = resolvePreferredLocale(request);

  if (pathname === "/") {
    if (locale === "en") {
      return NextResponse.next();
    }

    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  if (pathname === "/pricing-calculator") {
    if (locale === "en") {
      return NextResponse.next();
    }

    const url = request.nextUrl.clone();
    url.pathname = `/pricing-calculator/${locale}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/pricing-calculator"],
};
