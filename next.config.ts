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
};

export default nextConfig;
