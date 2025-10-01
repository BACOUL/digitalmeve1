// app/robots.ts
import type { MetadataRoute } from "next";

/**
 * robots.txt configuration for DigitalMeve
 * - Disallows private/admin/api routes
 * - Links to sitemap.xml for indexing
 */
export default function robots(): MetadataRoute.Robots {
  const base =
    (process.env.NEXT_PUBLIC_SITE_URL || "https://jeason1.vercel.app").replace(/\/+$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/_next/",           // assets internes
          "/static/private/",  // éventuels fichiers sensibles
          "/private/",         // dossiers privés
          "/dashboard",        // espace utilisateur
          "/admin",            // espace admin
          "/server-sitemap.xml",
          "/api/",             // empêche l’indexation des endpoints API
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
