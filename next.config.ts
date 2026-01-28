import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    cacheComponents: true,
  },
  reactCompiler: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
