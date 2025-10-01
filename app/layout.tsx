// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter, Sora } from "next/font/google";
import Script from "next/script";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

// NEW: cookie consent + gated analytics (load only on consent)
import CookieBanner from "@/components/CookieBanner";
import AnalyticsGate from "@/components/AnalyticsGate";

// Fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });

// Base URL (no trailing slash)
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://digitalmeve.com").replace(/\/+$/, "");

/** Viewport (mobile + zoom) */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B1220" },
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
  ],
};

// Metadata (EN for global reach)
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DigitalMeve — The .MEVE Standard",
    template: "%s | DigitalMeve",
  },
  description:
    "DigitalMeve provides a privacy-first, on-device proof of authenticity — simple, universal, and free for individuals.",
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
    description:
      "Privacy-first, on-device proof of authenticity. Protect and verify documents instantly. No uploads. No storage.",
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
      "Privacy-first, on-device proof of authenticity. Protect and verify documents instantly. No uploads. No storage.",
    images: ["/og/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  applicationName: "DigitalMeve",
  referrer: "strict-origin-when-cross-origin",
  other: { "theme-color": "#0B1220" },
};

// Theme init before paint (avoid FOUC)
const THEME_INIT = `
(function() {
  try {
    var ls = typeof window !== 'undefined' ? window.localStorage : null;
    var pref = ls ? ls.getItem('dm-theme') : null; // "dark" | "light" | null
    if (pref === 'light') {
      document.documentElement.classList.add('theme-light');
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', '#FFFFFF');
    } else {
      document.documentElement.classList.remove('theme-light');
      var meta2 = document.querySelector('meta[name="theme-color"]');
      if (meta2) meta2.setAttribute('content', '#0B1220');
    }
  } catch (e) {}
})();
`;

// JSON-LD Organization
const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  url: siteUrl,
  name: "DigitalMeve",
  legalName: "DigitalMeve",
  logo: `${siteUrl}/og/og-image.png`,
  sameAs: [],
  contactPoint: [
    { "@type": "ContactPoint", contactType: "customer support", email: "support@digitalmeve.com", availableLanguage: ["en", "fr"] },
    { "@type": "ContactPoint", contactType: "security", email: "security@digitalmeve.com", availableLanguage: ["en", "fr"] },
  ],
};

// JSON-LD WebSite
const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: siteUrl,
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
      {/* Theme init BEFORE interactive to avoid flash */}
      <Script id="dm-theme-init" strategy="beforeInteractive">
        {THEME_INIT}
      </Script>

      <body className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)]">
        {/* Accessibility skip-link */}
        <a href="#main" className="skip-link">Skip to content</a>

        {/* JSON-LD SEO (Organization + WebSite) */}
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

        {/* Everything that needs providers (e.g., session) */}
        <Providers>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>

        {/* Load analytics only if user consented (domain can be your Vercel URL for now) */}
        <AnalyticsGate domain={new URL(siteUrl).host} />
        {/* Cookie consent banner */}
        <CookieBanner />
      </body>
    </html>
  );
}
