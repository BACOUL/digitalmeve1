import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true // active le nouveau App Router (src/app/)
  },
  images: {
    unoptimized: true // pas besoin de l'optimisation Next (on sert juste nos icônes/logo)
  }
};

export default nextConfig;
