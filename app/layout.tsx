// app/layout.tsx — Global layout (world-class: SEO, a11y, performance-safe)
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter, Sora } from "next/font/google";
import Script from "next/script";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

// ---------------- Fonts ----------------
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });

// ---------------- Site base URL ----------------
// Fallback sécurisé si la var n'est pas définie (pas de / final).
const RAW_BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://digitalmeve.com";
const SITE_URL = RAW_BASE.replace(/\/+$/, "");

// ---------------- Viewport ----------------
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B1220" },
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
  ],
};

// ---------------- Metadata (SEO) ----------------
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "DigitalMeve",
  title: {
    default: "DigitalMeve — The .MEVE Standard",
    template: "%s · DigitalMeve",
  },
  description:
    "Protect any file with an invisible, universal proof — private by design, verifiable anywhere. Free for individuals.",
  alternates: {
    canonical: "/",
    languages: {
      en: `${SITE_URL}/?lang=en`,
      fr: `${SITE_URL}/?lang=fr`,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "DigitalMeve",
    title: "DigitalMeve — The .MEVE Standard",
    description:
      "Protect any file with an invisible, universal proof — private by design, verifiable anywhere.",
    images: [
      {
        url: "/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "DigitalMeve — The .MEVE Standard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DigitalMeve — The .MEVE Standard",
    description:
      "Protect any file with an invisible, universal proof — private by design, verifiable anywhere.",
    images: ["/og/og-image.png"],
    creator: "@digitalmeve",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  referrer: "strict-origin-when-cross-origin",
};

// ---------------- Pre-hydration theme script ----------------
// Appliqué avant le paint pour éviter le flash de thème.
const THEME_INIT = `
(function() {
  try {
    var ls = typeof window !== 'undefined' ? window.localStorage : null;
    var pref = ls ? ls.getItem('dm-theme') : null; // 'dark' | 'light' | null
    var el = document.documentElement;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (pref === 'light') {
      el.classList.add('theme-light');
      if (meta) meta.setAttribute('content', '#FFFFFF');
    } else {
      el.classList.remove('theme-light');
      if (meta) meta.setAttribute('content', '#0B1220');
    }
  } catch (_) {}
})();
`;

// ---------------- JSON-LD ----------------
const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  url: SITE_URL,
  name: "DigitalMeve",
  legalName: "DigitalMeve",
  logo: `${SITE_URL}/og/og-image.png`,
  sameAs: [],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@digitalmeve.com",
      availableLanguage: ["en", "fr"],
    },
    {
      "@type": "ContactPoint",
      contactType: "security",
      email: "security@digitalmeve.com",
      availableLanguage: ["en", "fr"],
    },
  ],
};

const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: SITE_URL,
  name: "DigitalMeve",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`antialiased ${inter.variable} ${sora.variable}`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      {/* Init theme BEFORE hydration */}
      <Script id="dm-theme-init" strategy="beforeInteractive">
        {THEME_INIT}
      </Script>

      {/* JSON-LD (afterInteractive pour éviter de bloquer le TTI) */}
      <Script
        id="ld-org"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
      />
      <Script
        id="ld-website"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSONLD) }}
      />

      <body className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)]">
        {/* Skip link (a11y) */}
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        {/* Providers englobe next-auth & autres contextes */}
        <Providers>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
        }
