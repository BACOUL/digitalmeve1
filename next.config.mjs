// next.config.mjs
/** @type {import('next').NextConfig} */
import { withSentryConfig } from "@sentry/nextjs";

/* =============================
   DigitalMeve — Next config (sec hardened)
   - CSP stricte compatible Next 15
   - Stripe (js + checkout + api)
   - Sentry (US + EU)
   - Plausible (cookieless analytics)
   - X-Robots-Tag sur /api & /admin
   ============================= */

const isProd = process.env.NODE_ENV === "production";
const hasSentry = !!process.env.NEXT_PUBLIC_SENTRY_DSN;

// Domaine canonique (si besoin pour redirects)
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://digitalmeve.com").replace(/\/+$/, "");

// Domaines externes utiles (ajuste au besoin)
const IMG_WHITELIST = [
  "https://images.unsplash.com",
  "https://*.stripe.com",
];

// Sentry browser + ingest (US/EU)
const SENTRY_SCRIPT = "https://browser.sentry-cdn.com";
const SENTRY_INGEST = [
  "https://*.ingest.sentry.io",
  "https://*.ingest.de.sentry.io",
  "https://sentry.io",
].join(" ");

// Stripe
const STRIPE_JS = "https://js.stripe.com";
const STRIPE_CHECKOUT = "https://checkout.stripe.com";
const STRIPE_API = "https://api.stripe.com";

// Plausible (cookieless)
const PLAUSIBLE = "https://plausible.io";

// ------------ CSP ------------
const cspParts = [
  "default-src 'self'",

  // Next 15 + Tailwind → inline autorisé. 'unsafe-eval' seulement hors prod.
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"} blob: ${STRIPE_JS}${hasSentry ? " " + SENTRY_SCRIPT : ""} ${PLAUSIBLE}`,

  // Styles inline OK (TW JIT / inline critical)
  "style-src 'self' 'unsafe-inline'",

  // Images (self + data + blob + whitelists)
  `img-src 'self' data: blob: ${IMG_WHITELIST.join(" ")}`,

  // Fonts locales (next/font → self + data:)
  "font-src 'self' data:",

  // Connexions sortantes (APIs, Sentry, Plausible)
  `connect-src 'self' https: wss: ${STRIPE_API}${hasSentry ? " " + SENTRY_INGEST : ""} ${PLAUSIBLE}`,

  // Media/Workers (PDF/Docx processing en local)
  "media-src 'self' blob:",
  "worker-src 'self' blob:",

  // Frames (Stripe Checkout & js.stripe)
  `frame-src 'self' ${STRIPE_JS} ${STRIPE_CHECKOUT}`,

  // Pas de plugins
  "object-src 'none'",

  // Sécurise base et formulaires (Checkout)
  "base-uri 'self'",
  `form-action 'self' ${STRIPE_CHECKOUT}`,

  // Anti-embed (clickjacking)
  "frame-ancestors 'none'",

  // Optionnel (souvent redondant avec HSTS)
  "upgrade-insecure-requests",
];

const csp = cspParts.join("; ");

// ------------ Security Headers ------------
const securityHeaders = [
  isProd && {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "autoplay=()",
      "camera=()",
      "display-capture=()",
      "document-domain=()",
      "encrypted-media=()",
      "fullscreen=(self)",
      "geolocation=()",
      "gyroscope=()",
      "hid=()",
      "idle-detection=()",
      "microphone=()",
      "midi=()",
      "payment=()",
      "picture-in-picture=(self)",
      "publickey-credentials-get=(self)",
      "screen-wake-lock=()",
      "usb=()",
      "web-share=(self)",
      "xr-spatial-tracking=()",
    ].join(", "),
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-site" },
  { key: "Content-Security-Policy", value: csp },
].filter(Boolean);

// ------------ Next config ------------
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Laisse "unoptimized" pour ne rien casser maintenant ;
  // quand tu voudras passer à <Image>, configure "remotePatterns" ci-dessous et enlève "unoptimized".
  images: {
    unoptimized: true,
    remotePatterns: [
      // { protocol: "https", hostname: "images.unsplash.com" },
      // { protocol: "https", hostname: "cdn.digitalmeve.com" },
    ],
  },

  productionBrowserSourceMaps: true, // utile pour Sentry en prod

  async headers() {
    return [
      // Sécurité globale
      { source: "/:path*", headers: securityHeaders },

      // SEO: évite l’indexation de zones techniques
      { source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },

  async redirects() {
    return [
      // (Optionnel) — forcer le host canonique.
      // Exemple: forcer sans "www"
      // {
      //   source: "/:path*",
      //   has: [{ type: "host", value: "www.digitalmeve.com" }],
      //   destination: `${SITE_URL}/:path*`,
      //   permanent: true,
      // },
    ];
  },
};

// Wrap Sentry
export default withSentryConfig(nextConfig, { silent: true });
