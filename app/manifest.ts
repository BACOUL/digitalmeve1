// app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  const name = "DigitalMeve — The .MEVE Standard";
  const short_name = "DigitalMeve";
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://digitalmeve.com";

  return {
    name,
    short_name,
    description:
      "DigitalMeve provides a universal, simple digital proof — free for individuals.",
    lang: "en", // langue principale
    dir: "ltr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: ["standalone", "minimal-ui"],
    orientation: "any",
    background_color: "#0B1220",
    theme_color: "#0B1220",
    categories: ["productivity", "utilities", "security"],
    id: base,

    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-192-maskable.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icons/icon-192-mono.png", sizes: "192x192", type: "image/png", purpose: "monochrome" },
      { src: "/icons/icon-512-mono.png", sizes: "512x512", type: "image/png", purpose: "monochrome" },
    ],

    shortcuts: [
      {
        name: "Protect a file",
        short_name: "Protect",
        url: "/generate",
        icons: [{ src: "/icons/shortcut-generate.png", sizes: "96x96", type: "image/png" }],
      },
      {
        name: "Verify a file",
        short_name: "Verify",
        url: "/verify",
        icons: [{ src: "/icons/shortcut-verify.png", sizes: "96x96", type: "image/png" }],
      },
    ],

    screenshots: [
      { src: "/screenshots/home-dark.png", sizes: "1280x720", type: "image/png", form_factor: "wide" },
      { src: "/screenshots/home-mobile.png", sizes: "720x1280", type: "image/png", form_factor: "narrow" },
    ],

    prefer_related_applications: false,
  };
}
