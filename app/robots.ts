// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base =
    (process.env.NEXT_PUBLIC_SITE_URL || "https://digitalmeve.com").replace(/\/+$/, "");

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
          "/api/", // bloque toutes les routes API de l’indexation
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
