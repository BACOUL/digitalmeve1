import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://digitalmeve.com";
  const paths = [
    "", "generate", "verify", "pricing", "developers",
    "personal", "pro",
    "security", "about", "status", "changelog",
    "contact", "legal", "privacy", "terms", "cookies",
    "login",
  ];
  const now = new Date().toISOString();
  return paths.map((p) => ({
    url: `${base}/${p}`.replace(/\/$/, ""),
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.7,
  }));
}
