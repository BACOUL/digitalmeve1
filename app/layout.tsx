// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Inter, Sora } from "next/font/google";
import Script from "next/script";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers"; // <-- englobe next-auth SessionProvider

// Polices
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });

// Base URL (sans slash final)
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://digitalmeve.com").replace(/\/+$/, "");

// Métadonnées
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "DigitalMeve — The .MEVE Standard",
  description: "DigitalMeve fournit une preuve numérique simple et universelle — gratuite pour les particuliers.",
  alternates: {
    canonical: "/",
    languages: {
      "en": `${siteUrl}/?lang=en`,
      "fr": `${siteUrl}/?lang=fr`,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "DigitalMeve",
    title: "DigitalMeve — The .MEVE Standard",
    description: "DigitalMeve fournit une preuve numérique simple et universelle — gratuite pour les particuliers.",
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
    description: "DigitalMeve fournit une preuve numérique simple et universelle — gratuite pour les particuliers.",
    images: ["/og/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  applicationName: "DigitalMeve",
  referrer: "strict-origin-when-cross-origin",
  // sombre par défaut (aligné avec --bg = #0B1220 dans globals.css)
  other: { "theme-color": "#0B1220" },
};

// Script thème exécuté avant paint (évite le flash clair/sombre)
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
  sameAs: [
    // Renseigne quand tu auras les liens officiels :
    // "https://x.com/…",
    // "https://www.linkedin.com/company/…",
    // "https://github.com/…"
  ],
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

// JSON-LD WebSite (+ SearchAction si tu ajoutes une page /search)
const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: siteUrl,
  name: "DigitalMeve",
  // Décommente si tu implémentes /search
  // potentialAction: {
  //   "@type": "SearchAction",
  //   target: `${siteUrl}/search?q={query}`,
  //   "query-input": "required name=query",
  // },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`antialiased ${inter.variable} ${sora.variable}`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      {/* Init thème AVANT l’interactif pour éviter le FOUC */}
      <Script id="dm-theme-init" strategy="beforeInteractive">
        {THEME_INIT}
      </Script>

      {/* JSON-LD SEO (Organization + WebSite). Google accepte dans le <body>. */}
      <body className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)]">
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

        {/* Tout ce qui consomme useSession est sous Providers */}
        <Providers>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>

        {/* Grain global optionnel si défini dans globals.css */}
        {/* <div aria-hidden className="noise" /> */}
      </body>
    </html>
  );
}
