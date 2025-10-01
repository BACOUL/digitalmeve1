// app/verify/metadata.ts
import type { Metadata } from "next";

// On centralise l'URL du site (sans slash final)
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://digitalmeve.com").replace(/\/+$/, "");
const pageUrl = `${siteUrl}/verify`;
const ogImage = `${siteUrl}/og/verify-og.png`; // ⚠️ Ajoute ce fichier (1200×630) dans /public/og/

const title = "Verify a .MEVE file — DigitalMeve";
const description =
  "World-first invisible proof for documents. Drop a .MEVE PDF or DOCX and verify authenticity in seconds — on-device, no uploads, privacy by design.";

const keywords = [
  "DigitalMeve",
  ".MEVE",
  "MEVE",
  "verify document",
  "document authenticity",
  "tamper detection",
  "invisible watermark",
  "PDF verification",
  "DOCX verification",
  "SHA-256",
  "digital proof",
  "proof of authenticity",
  "on-device verification",
  "privacy by design",
];

const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords,
  applicationName: "DigitalMeve",
  alternates: {
    canonical: "/verify",
    languages: {
      en: `${pageUrl}?lang=en`,
      fr: `${pageUrl}?lang=fr`,
    },
  },
  openGraph: {
    type: "website",
    url: pageUrl,
    siteName: "DigitalMeve",
    title,
    description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "DigitalMeve — Verify .MEVE file",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
    // creator: "@digitalmeve", // décommente si/qd tu as un compte X
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      // on laisse Google prévisualiser correctement les extraits/aperçus
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Petits bonus utiles
  referrer: "strict-origin-when-cross-origin",
  other: {
    "og:locale": "en_US",
  },
};

export default metadata;
