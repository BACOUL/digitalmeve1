// app/sitemap.ts
import type { MetadataRoute } from "next";

/**
 * Production-ready sitemap for DigitalMeve
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://digitalmeve.com").replace(/\/+$/, "");
  const now = new Date().toISOString();

  const routes = [
    "/",
    "/generate",
    "/verify",
    "/individuals",
    "/professionals",
    "/pricing",
    "/docs",
    "/security",
    "/faq",
    "/about",
    "/contact",
    "/legal",
    "/privacy",
    "/terms",
    "/status",
    "/changelog",
    "/partners",
    "/use-cases",
  ];

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1.0 : 0.7,
  }));
}
