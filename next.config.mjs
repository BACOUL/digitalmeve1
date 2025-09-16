// next.config.mjs
/** @type {import('next').NextConfig} */
import { withSentryConfig } from "@sentry/nextjs";

// ------------ ENV ------------
const isProd = process.env.NODE_ENV === "production";
const hasSentry = !!process.env.NEXT_PUBLIC_SENTRY_DSN;

// Domaines externes utiles (ajuste si besoin)
const IMG_WHITELIST = [
  "https://images.unsplash.com",
];

// Si Sentry activé, on autorise les domaines d’ingest + CDN
const SENTRY_SCRIPT = "https://browser.sentry-cdn.com";
// Autoriser US + EU
const SENTRY_INGEST = [
  "https://*.ingest.sentry.io",
  "https://*.ingest.de.sentry.io",
  "https://sentry.io",
].join(" ");

// ------------ CSP ------------
const cspParts = [
  "default-src 'self'",
  // Next injecte des scripts inline pour l’hydratation
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"} blob:${hasSentry ? " " + SENTRY_SCRIPT : ""}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob:${IMG_WHITELIST.length ? " " + IMG_WHITELIST.join(" ") : ""}`,
  "font-src 'self' data:",
  // Ouvre les connexions nécessaires (SSE/WebSocket/Sentry)
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

  images: { unoptimized: true },

  // utile pour Sentry (source maps)
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

// ➜ IMPORTANT : on wrappe la config avec le plugin Sentry
export default withSentryConfig(nextConfig, {
  // options plugin (facultatives)
  silent: true,
  // widenClientFileUpload: true, // utile si vous avez beaucoup de fichiers client
});
