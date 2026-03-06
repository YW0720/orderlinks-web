import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/**",
      },
      {
        pathname: "/**",
        search: "?v=*",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "query", key: "lang", value: "de" }],
        destination: "/de",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "query", key: "lang", value: "fr" }],
        destination: "/fr",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "query", key: "lang", value: "en" }],
        destination: "/",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "query", key: "lang", value: "zh" }],
        destination: "/zh",
        permanent: true,
      },
      {
        source: "/en",
        destination: "/",
        permanent: true,
      },
      {
        source: "/pricing-calculator",
        has: [{ type: "query", key: "lang", value: "de" }],
        destination: "/pricing-calculator/de",
        permanent: true,
      },
      {
        source: "/pricing-calculator",
        has: [{ type: "query", key: "lang", value: "fr" }],
        destination: "/pricing-calculator/fr",
        permanent: true,
      },
      {
        source: "/pricing-calculator",
        has: [{ type: "query", key: "lang", value: "en" }],
        destination: "/pricing-calculator",
        permanent: true,
      },
      {
        source: "/pricing-calculator",
        has: [{ type: "query", key: "lang", value: "zh" }],
        destination: "/pricing-calculator/zh",
        permanent: true,
      },
      {
        source: "/pricing-calculator/en",
        destination: "/pricing-calculator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
