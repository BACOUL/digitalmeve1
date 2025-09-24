// app/robots.ts
import type { MetadataRoute } from "next";

/**
 * Robots.txt — production-ready
 * - Base URL issue de NEXT_PUBLIC_SITE_URL, avec fallback domaine public
 * - Autorise l'index de tout le contenu public
 * - Désindexe les zones privées/sensibles (dashboard, admin, api, etc.)
 * - Référence le sitemap unique (app/sitemap.ts)
 */
export default function robots(): MetadataRoute.Robots {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://digitalmeve.com").replace(/\/+$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // Next internals et assets privés
          "/_next/", "/static/private/", "/private/",
          // Zones d'app restreintes
          "/dashboard", "/admin", "/login", "/register",
          // Endpoints techniques (non pertinents pour l’index)
          "/api/",
          // Sitemaps internes générés côté serveur si présents
          "/server-sitemap.xml",
        ],
      },
    ],
    // Déclare le sitemap public (app/sitemap.ts)
    sitemap: `${base}/sitemap.xml`,
  };
}
