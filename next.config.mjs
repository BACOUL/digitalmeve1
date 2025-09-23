// next.config.mjs
/** @type {import('next').NextConfig} */
import { withSentryConfig } from "@sentry/nextjs";

/* =============================
   DigitalMeve — Next config (sec hardened)
   - CSP stricte compatible Next 15
   - Stripe (js + checkout + api)
   - Sentry (US + EU)
   - En-têtes sécurité niveau "A"
   ============================= */

// ------------ ENV ------------
const isProd = process.env.NODE_ENV === "production";
const hasSentry = !!process.env.NEXT_PUBLIC_SENTRY_DSN;

// Domaines externes utiles (ajuste au besoin)
const IMG_WHITELIST = [
  "https://images.unsplash.com",
  "https://*.stripe.com",      // logos/iframes Stripe éventuels
];

// Sentry browser + ingest (US/EU)
const SENTRY_SCRIPT = "https://browser.sentry-cdn.com";
const SENTRY_INGEST = [
  "https://*.ingest.sentry.io",
  "https://*.ingest.de.sentry.io",
  "https://sentry.io",
].join(" ");

// Stripe domains
const STRIPE_JS = "https://js.stripe.com";
const STRIPE_CHECKOUT = "https://checkout.stripe.com";
const STRIPE_API = "https://api.stripe.com";

// ------------ CSP ------------
const cspParts = [
  "default-src 'self'",

  // Next hydrate le DOM → 'unsafe-inline' requis; en dev on autorise aussi 'unsafe-eval'
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"} blob: ${STRIPE_JS}${hasSentry ? " " + SENTRY_SCRIPT : ""}`,

  // Autoriser styles inline (tailwind injecte parfois) + fonts locales
  "style-src 'self' 'unsafe-inline'",

  // Images : self, data: (icônes/preview), blob:, et whitelists
  `img-src 'self' data: blob: ${IMG_WHITELIST.join(" ")}`,

  // Fonts locales (si webfonts), data: ok
  "font-src 'self' data:",

  // Connexions sortantes (SSE/WebSocket/Stripe/Sentry)
  `connect-src 'self' https: wss: ${STRIPE_API}${hasSentry ? " " + SENTRY_INGEST : ""}`,

  // Média/Workers (PDF preview, file blobs)
  "media-src 'self' blob:",
  "worker-src 'self' blob:",

  // Encadrements/iframes (Stripe Checkout)
  `frame-src 'self' ${STRIPE_JS} ${STRIPE_CHECKOUT}`,

  // Empêche plugins
  "object-src 'none'",

  // Sécurise base URI et formulaires (Stripe Checkout)
  "base-uri 'self'",
  `form-action 'self' ${STRIPE_CHECKOUT}`,

  // Empêche l’embed du site dans un autre (clickjacking)
  "frame-ancestors 'none'",

  // Optionnel : upgrade HTTP → HTTPS (peut être laissé à HSTS)
  "upgrade-insecure-requests",
];

const csp = cspParts.join("; ");

// ------------ Security Headers ------------
const securityHeaders = [
  // HSTS seulement en prod (évite de gêner dev/tunnels)
  isProd && {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload", // 2 ans
  },
  // Anti-clickjacking
  { key: "X-Frame-Options", value: "DENY" },
  // Anti-MIME sniff
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Référent
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Permissions (durci, on ouvre seulement ce qui sert)
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
      "payment=()", // on utilise checkout Stripe (redir/iframe), pas PaymentRequest API
      "picture-in-picture=(self)",
      "publickey-credentials-get=(self)",
      "screen-wake-lock=()",
      "usb=()",
      "web-share=(self)",
      "xr-spatial-tracking=()",
    ].join(", "),
  },
  // COOP/CORP sûrs par défaut (attention à COEP qui casserait des workers/blobs)
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-site" },

  // CSP construite ci-dessus
  { key: "Content-Security-Policy", value: csp },
].filter(Boolean);

// ------------ Next config ------------
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Si tu utilises <Image>, préfère configurer les domaines plutôt que unoptimized:true.
  // Gardé ici pour éviter les surprises tant que la stack images n'est pas finalisée.
  images: { unoptimized: true },

  // Sentry: sources maps prod (utile si tu veux corréler les erreurs front)
  productionBrowserSourceMaps: true,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

// ➜ IMPORTANT : wrap avec Sentry
export default withSentryConfig(nextConfig, {
  silent: true,
  // Si beaucoup de fichiers client → décommente :
  // widenClientFileUpload: true,
});
