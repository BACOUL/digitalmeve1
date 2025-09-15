// app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://digitalmeve.com").replace(/\/+$/, "");

  return {
    name: "DigitalMeve — The .MEVE Standard",
    short_name: "DigitalMeve",
    description: "Invisible, portable proof embedded in your files — free for individuals.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0B1220",
    theme_color: "#0B1220",
    lang: "en",
    dir: "ltr",
    categories: ["productivity", "utilities", "security"],

    icons: [
      // Pense à ajouter ces fichiers dans /public/icons/
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
      // Optionnels si tu veux plus fin :
      // { src: "/icons/icon-256.png", sizes: "256x256", type: "image/png" },
      // { src: "/icons/icon-384.png", sizes: "384x384", type: "image/png" },
    ],

    screenshots: [
      // Optionnel mais top pour l’install prompt sur Android/Chrome
      {
        src: "/og/og-image.png",
        sizes: "1200x630",
        type: "image/png",
        label: "Protect & verify documents with .MEVE",
      },
    ],

    // Protocoles éventuels si un jour tu veux capter des liens meve://
    // protocol_handlers: [{ protocol: "web+meve", url: "/verify?u=%s" }],

    // Rempli si tu ajoutes un mode offline
    // prefer_related_applications: false,
    // related_applications: [],
  };
}
