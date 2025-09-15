/** @type {import('next').NextConfig} */

// ------------ ENV ------------
const isProd = process.env.NODE_ENV === "production";
const hasSentry = !!process.env.NEXT_PUBLIC_SENTRY_DSN;

// Domaines externes utiles (ajuste si besoin)
const IMG_WHITELIST = [
  "https://images.unsplash.com", // exemple
  // Ajoute ici tes autres domaines d’images si nécessaire
];

// Si Sentry activé, on autorise les domaines d’ingest + CDN
const SENTRY_SCRIPT = "https://browser.sentry-cdn.com";
const SENTRY_INGEST =
  "https://o450.ingest.sentry.io https://o450*.ingest.sentry.io https://sentry.io";

// ------------ CSP ------------
/**
 * Remarques importantes :
 * - On autorise 'unsafe-inline' en `script-src` : Next injecte des scripts inline pour l'hydratation.
 *   (alternative avancée : nonces/hashes — mais plus complexe à mettre en place partout)
 * - On autorise `blob:` pour les scripts/workers (Next 15 & web workers).
 * - On ouvre `connect-src` vers `https:` et `wss:` (SSE/WebSocket, Sentry, API externes).
 */
const cspParts = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"} blob:${hasSentry ? " " + SENTRY_SCRIPT : ""}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob:${IMG_WHITELIST.length ? " " + IMG_WHITELIST.join(" ") : ""}`,
  "font-src 'self' data:",
  `connect-src 'self' https: wss:${hasSentry ? " " + SENTRY_INGEST : ""}`,
  "media-src 'self' blob:",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
];

const csp = cspParts.join("; ");

// ------------ Security Headers ------------
const securityHeaders = [
  // HSTS uniquement en prod
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

  // Laisse simple pour l’instant ; si tu veux le loader <Image />, retire `unoptimized`
  images: { unoptimized: true },

  // Utile pour Sentry et debug de prod
  productionBrowserSourceMaps: true,

  async headers() {
    return [
      {
        // On applique ces headers partout (y compris app/route)
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
