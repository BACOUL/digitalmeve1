// app/sitemap.ts
import type { MetadataRoute } from "next";

/**
 * Sitemap — production-ready (Next.js App Router)
 * - Base URL issue de NEXT_PUBLIC_SITE_URL, fallback domaine public
 * - Couvre les routes stables de la V1 (home + pages clés)
 * - lastModified dynamique, changefreq/priority cohérents
 * - Facile à étendre si on ajoute des pages ensuite
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://digitalmeve.com").replace(/\/+$/, "");
  const now = new Date();

  const pages: Array<{
    path: string;
    changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
    priority?: number;
  }> = [
    // Core
    { path: "/",                changefreq: "daily",  priority: 1.0 },
    { path: "/generate",        changefreq: "weekly", priority: 0.9 },
    { path: "/verify",          changefreq: "weekly", priority: 0.9 },

    // Positionnement produit (deux audiences)
    { path: "/individuals",     changefreq: "weekly", priority: 0.9 },
    { path: "/professionals",   changefreq: "weekly", priority: 0.9 },

    // Conversion & preuve
    { path: "/pricing",         changefreq: "weekly", priority: 0.8 },
    { path: "/security",        changefreq: "monthly", priority: 0.7 },
    { path: "/docs",            changefreq: "monthly", priority: 0.7 },

    // Confiance / corporate
    { path: "/about",           changefreq: "yearly", priority: 0.5 },
    { path: "/contact",         changefreq: "yearly", priority: 0.5 },
    { path: "/legal",           changefreq: "yearly", priority: 0.4 },

    // Statut / mise à jour (si présents)
    { path: "/status",          changefreq: "daily",   priority: 0.4 },
    { path: "/changelog",       changefreq: "weekly",  priority: 0.5 },

    // Partenaires (phase d’early design)
    { path: "/partners",        changefreq: "monthly", priority: 0.6 },

    // Développeurs (si page active)
    { path: "/developers",      changefreq: "monthly", priority: 0.5 },
  ];

  return pages.map(({ path, changefreq, priority }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: changefreq,
    priority,
  }));
}
