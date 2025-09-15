// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://digitalmeve.com").replace(/\/+$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",           // assets internes Next
          "/static/private/",  // si tu as des assets privés
          "/private/",
          "/dashboard",
          "/admin",
          "/server-sitemap.xml", // si jamais présent
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
