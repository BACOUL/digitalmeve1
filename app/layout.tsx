// app/layout.tsx — v4 (Layout 2.0: modern Nav, updated messaging, SEO/OG polished, FOUC-safe theme)

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter, Sora } from "next/font/google";
import Script from "next/script";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

// Cookie consent + analytics conditionnels
import CookieBanner from "@/components/CookieBanner";
import AnalyticsGate from "@/components/AnalyticsGate";

/* =========================
   Host / Canonical base URL
   ========================= */
const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const siteUrl = RAW_SITE_URL.replace(/\/+$/, ""); // strip trailing slash

/* =========================
   Fonts (next/font) self-hosted
   ========================= */
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });

/* =========================
   Viewport
   ========================= */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B1220" },
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
  ],
};

/* =========================
   SEO Metadata
   - Robots indexables uniquement si NEXT_PUBLIC_INDEXABLE !== "false"
   - Canonical propre
   - OpenGraph/Twitter complets
   - Messaging aligné (Hero/Tagline)
   ========================= */
const INDEXABLE = process.env.NEXT_PUBLIC_INDEXABLE !== "false";

const DESCRIPTION =
  "The simplest and safest way to prove a file’s authenticity. Digital proof, simple and private. Generate and verify on your device — no account, no storage, no tracking.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DigitalMeve — The .MEVE Standard",
    template: "%s | DigitalMeve",
  },
  description: DESCRIPTION,
  keywords: [
    ".MEVE",
    "digital proof",
    "document authenticity",
    "invisible watermark",
    "on-device",
    "privacy-first",
    "verification",
    "PDF",
    "DOCX",
    "PNG",
  ],
  applicationName: "DigitalMeve",
  referrer: "strict-origin-when-cross-origin",
  alternates: {
    canonical: "/",
    languages: {
      en: `${siteUrl}/?lang=en`,
      fr: `${siteUrl}/?lang=fr`,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "DigitalMeve",
    title: "DigitalMeve — The .MEVE Standard",
    description: DESCRIPTION,
    images: [
      {
        url: "/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "DigitalMeve — The .MEVE Standard",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DigitalMeve — The .MEVE Standard",
    description: DESCRIPTION,
    images: ["/og/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  robots: INDEXABLE
    ? { index: true, follow: true, googleBot: { index: true, follow: true } }
    : { index: false, follow: false, googleBot: { index: false, follow: false, noimageindex: true } },
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
    url: false,
  },
  other: { "theme-color": "#0B1220" },
};

/* =========================
   Theme before paint (avoid FOUC)
   Respects user preference if no local override
   ========================= */
const THEME_INIT = `
(function() {
  try {
    var ls = typeof window !== 'undefined' ? window.localStorage : null;
    var pref = ls ? ls.getItem('dm-theme') : null; // "dark" | "light" | null
    var prefersLight = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    var isLight = pref === 'light' || (pref === null && prefersLight);
    var el = document.documentElement;

    if (isLight) {
      el.classList.add('theme-light');
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', '#FFFFFF');
    } else {
      el.classList.remove('theme-light');
      var meta2 = document.querySelector('meta[name="theme-color"]');
      if (meta2) meta2.setAttribute('content', '#0B1220');
    }
  } catch (e) {}
})();
`;

/* =========================
   JSON-LD (Organization + WebSite)
   ========================= */
const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  url: siteUrl,
  name: "DigitalMeve",
  legalName: "DigitalMeve",
  logo: `${siteUrl}/og/og-image.png`,
  sameAs: [] as string[],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@digitalmeve.org",
      availableLanguage: ["en", "fr"],
    },
    {
      "@type": "ContactPoint",
      contactType: "security",
      email: "security@digitalmeve.org",
      availableLanguage: ["en", "fr"],
    },
  ],
};

const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: siteUrl,
  name: "DigitalMeve",
};

/* =========================
   Root layout
   ========================= */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`antialiased ${inter.variable} ${sora.variable}`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      {/* Theme before hydration (prevents FOUC) */}
      <Script id="dm-theme-init" strategy="beforeInteractive">
        {THEME_INIT}
      </Script>

      <body className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)]">
        {/* Skip link a11y */}
        <a href="#main" className="skip-link">Skip to content</a>

        {/* JSON-LD SEO */}
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

        {/* Providers (session, theme, etc.) + global layout */}
        <Providers>
          <Nav />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>

        {/* Analytics (after consent) */}
        <AnalyticsGate domain={new URL(siteUrl).host} />

        {/* Cookie banner (consent) */}
        <CookieBanner />
      </body>
    </html>
  );
}
