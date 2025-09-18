// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base =
    (process.env.NEXT_PUBLIC_SITE_URL || "https://jeason1.vercel.app").replace(/\/+$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/_next/",
          "/static/private/",
          "/private/",
          "/dashboard",
          "/admin",
          "/server-sitemap.xml",
          "/api/", // bloqué si tu veux que rien en /api ne soit indexé
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
