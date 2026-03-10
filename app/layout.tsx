import type { Metadata } from "next";
import { Geist_Mono, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "./lib/seo";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Restaurant Website, Online Ordering, Reservation and POS`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "OrderLinks helps Swiss restaurants launch multilingual websites with online ordering, reservation, kitchen display, analytics, and POS integration.",
  keywords: [
    "餐厅",
    "（餐厅）网站定制",
    "餐厅网站定制",
    "在线点餐",
    "POS",
    "在线预约",
    "restaurant",
    "custom restaurant website",
    "online ordering",
    "online reservation",
    "restaurant POS",
    "Swiss restaurant software",
    "site web restaurant sur mesure",
    "commande en ligne",
    "réservation en ligne",
    "restaurant software Schweiz",
    "mehrsprachige restaurant website Schweiz",
    "restaurant website builder",
    "restaurant reservation system",
    "multilingual restaurant website",
    "restaurant analytics dashboard",
    "kitchen order view",
    "Stripe restaurant payment",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${SITE_NAME} | Restaurant Website, Online Ordering, Reservation and POS`,
    description:
      "Launch a multilingual restaurant website with online ordering, reservations, analytics, and POS tools.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "OrderLinks product preview",
      },
    ],
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Restaurant Website + Ordering + Reservation + POS`,
    description:
      "Modern SaaS for Swiss restaurants: multilingual website, online ordering, reservation and POS workflow.",
    images: ["/logo.png"],
  },
  category: "restaurant software",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jakartaSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
