// app/sitemap.ts
import type { MetadataRoute } from "next";

/**
 * Generates sitemap.xml for Next.js App Router
 * - Uses NEXT_PUBLIC_SITE_URL when defined, falls back to your Vercel URL
 * - Includes key static pages with sensible changeFrequency & priority
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://jeason1.vercel.app").replace(/\/+$/, "");
  const now = new Date();

  // Add every important static route here
  const staticPaths: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "",              changeFrequency: "daily",  priority: 1.0 }, // Home
    { path: "/pricing",      changeFrequency: "weekly", priority: 0.8 },
    { path: "/trust",        changeFrequency: "weekly", priority: 0.8 },
    { path: "/security",     changeFrequency: "weekly", priority: 0.7 },
    { path: "/developers",   changeFrequency: "weekly", priority: 0.6 },
    { path: "/status",       changeFrequency: "weekly", priority: 0.6 },
    // Legal & support
    { path: "/privacy",      changeFrequency: "monthly", priority: 0.6 },
    { path: "/cookies",      changeFrequency: "monthly", priority: 0.6 },
    { path: "/terms",        changeFrequency: "monthly", priority: 0.6 },
    { path: "/contact",      changeFrequency: "monthly", priority: 0.5 },
  ];

  return staticPaths.map(({ path, changeFrequency, priority }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
