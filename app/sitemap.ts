import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://digitalmeve.com";
  const now = new Date().toISOString();

  const routes = [
    { url: "", changeFreq: "weekly" as const, priority: 1.0 },
    { url: "/generate", changeFreq: "weekly" as const, priority: 0.9 },
    { url: "/verify", changeFreq: "weekly" as const, priority: 0.9 },
    { url: "/personal", changeFreq: "monthly" as const, priority: 0.6 },
    { url: "/pro", changeFreq: "monthly" as const, priority: 0.6 },
    { url: "/docs", changeFreq: "monthly" as const, priority: 0.5 },
    { url: "/contact", changeFreq: "yearly" as const, priority: 0.4 },
  ];

  return routes.map((r) => ({
    url: `${base}${r.url}`,
    lastModified: now,
    changeFrequency: r.changeFreq,
    priority: r.priority,
  }));
}
