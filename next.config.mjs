/** @type {import('next').NextConfig} */

// On considère production si Vercel/Node en "production"
const isProd = process.env.NODE_ENV === "production";

// Domaines externes (ajuste selon ton stack)
const SENTRY_JS = "https://browser.sentry-cdn.com";
const SENTRY_INGEST = "https://o450.ingest.sentry.io https://o450*.ingest.sentry.io https://sentry.io";
const IMG_WHITELIST = "https://images.unsplash.com"; // exemple si tu en utilises

// CSP PROD (sans inline/eval côté scripts)
const cspProd = [
  "default-src 'self'",
  // plus d'inline : on a déplacé le script thème en /js/theme-init.js
  `script-src 'self' ${SENTRY_JS}`,
  // Tailwind/Next peuvent injecter des styles => on garde 'unsafe-inline' pour STYLE UNIQUEMENT
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${IMG_WHITELIST}`,
  "font-src 'self' data:",
  `connect-src 'self' ${SENTRY_INGEST}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "media-src 'self' blob:",
  "worker-src 'self' blob:",
].join("; ");

// CSP DEV (on tolère 'unsafe-eval' pour le tooling Next/React en local)
const cspDev = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' http://localhost:* ws://localhost:* https:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "media-src 'self' blob:",
  "worker-src 'self' blob:",
].join("; ");

const securityHeaders = [
  // HSTS seulement en prod (sinon gênant en local ou preview custom)
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
  // ⚠️ CSP finale
  { key: "Content-Security-Policy", value: isProd ? cspProd : cspDev },
].filter(Boolean);

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Si tu veux garder <Image /> sans optimisation côté Vercel :
  images: { unoptimized: true },
  // Sinon, commente la ligne au-dessus et configure tes remotePatterns :
  // images: {
  //   remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  // },

  // Sourcemaps prod (utile pour Sentry/diagnostic)
  productionBrowserSourceMaps: true,

  async headers() {
    return [
      {
        // On sert les headers sur tout (hors assets Next qui gèrent déjà bien leurs headers)
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
