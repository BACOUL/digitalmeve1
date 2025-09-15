// app/sitemap.ts
import type { MetadataRoute } from "next";

const normalize = (base: string, path = "") =>
  `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`.replace(/\/+$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://digitalmeve.com";
  const now = new Date();

  // Pages publiques “principales”
  const topPages = [
    "",               // /
    "generate",
    "verify",
    "pricing",
    "personal",
    "pro",
    "developers",
  ] as const;

  // Pages secondaires / informationnelles
  const infoPages = [
    "security",
    "about",
    "status",
    "changelog",
    "contact",
  ] as const;

  // Légales (moins fréquentes, mais importantes)
  const legalPages = [
    "legal",
    "privacy",
    "terms",
    "cookies",
  ] as const;

  // Pages utilitaires qu’on exclut du sitemap (ou très faible priorité)
  // -> Tu peux les remettre si tu tiens à les indexer.
  const excluded = new Set(["login", "register"]);

  const entries: MetadataRoute.Sitemap = [];

  const pushGroup = (
    paths: readonly string[],
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  ) => {
    for (const p of paths) {
      if (excluded.has(p)) continue;
      entries.push({
        url: normalize(base, p),
        lastModified: now.toISOString(),
        changeFrequency,
        priority,
      });
    }
  };

  // Priorisation
  pushGroup(topPages, 0.9, "weekly");       // pages cœur produit
  pushGroup(infoPages, 0.7, "monthly");     // pages info
  pushGroup(legalPages, 0.5, "yearly");     // pages légales / peu mouvantes

  // Home en priorité maximale
  entries.push({
    url: normalize(base, ""),
    lastModified: now.toISOString(),
    changeFrequency: "weekly",
    priority: 1,
  });

  // Dé-duplication au cas où
  const unique = new Map(entries.map((e) => [e.url, e]));
  return Array.from(unique.values());
}
