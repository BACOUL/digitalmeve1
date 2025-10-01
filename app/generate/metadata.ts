// app/generate/metadata.ts
import type { Metadata } from "next";

// Base URL (sans slash final)
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://digitalmeve.com").replace(/\/+$/, "");
const pageUrl = `${siteUrl}/generate`;
const ogImage = `${siteUrl}/og/generate-og.png`; // ⚠️ ajoute ce visuel (1200×630) dans /public/og/

const title = "Generate a .MEVE proof — DigitalMeve";
const description =
  "Embed an invisible .MEVE proof into your PDF or DOCX in seconds. On-device, no uploads, privacy by design. Optional human-readable certificate included.";

const keywords = [
  "DigitalMeve",
  ".MEVE",
  "MEVE",
  "generate proof",
  "document proof",
  "invisible watermark",
  "PDF watermark",
  "DOCX watermark",
  "tamper evident",
  "SHA-256",
  "digital certificate",
  "on-device processing",
  "privacy by design",
];

const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords,
  applicationName: "DigitalMeve",
  alternates: {
    canonical: "/generate",
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
        alt: "DigitalMeve — Generate .MEVE proof",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
    // creator: "@digitalmeve", // décommente quand tu as le handle
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  referrer: "strict-origin-when-cross-origin",
  other: { "og:locale": "en_US" },
};

export default metadata;
