// app/sitemap.ts
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base =
    (process.env.NEXT_PUBLIC_SITE_URL || "https://jeason1.vercel.app").replace(/\/+$/, "");

  // Liste des pages statiques de ton site
  const staticPaths = [
    "",            // page d’accueil
    "/security",
    "/trust",
    "/developers",
    "/pricing",
    "/status",
  ];

  const urls: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7, // priorité plus forte sur la home
  }));

  return urls;
}
