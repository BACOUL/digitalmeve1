// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const isProd = process.env.NODE_ENV === "production";
const enableCspReportOnly =
  process.env.NEXT_PUBLIC_CSP_REPORT_ONLY === "1" ||
  process.env.NEXT_PUBLIC_CSP_REPORT_ONLY === "true";
const hasSentry = !!process.env.NEXT_PUBLIC_SENTRY_DSN;

const SENTRY_INGEST = [
  "https://*.ingest.sentry.io",
  "https://*.ingest.de.sentry.io",
  "https://sentry.io",
].join(" ");

function absoluteUrl(req: NextRequest, path: string) {
  return `${req.nextUrl.origin}${path}`;
}

export const config = {
  // On applique partout sauf assets statiques / fichiers publics / endpoint de report
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|og/|icons/|api/csp-report).*)",
  ],
};

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // --- Request ID (réutilise si fourni en amont) ---
  const upstreamId = req.headers.get("x-request-id");
  const requestId =
    upstreamId ||
    (typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2));
  res.headers.set("X-Request-ID", requestId);

  // --- Security Headers (socle) ---
  if (isProd) {
    res.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    );
  }

  res.headers.set("X-DNS-Prefetch-Control", "on");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-XSS-Protection", "0");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // ✅ OAuth / popups-friendly
  res.headers.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.headers.set("Cross-Origin-Resource-Policy", "same-site");

  res.headers.set(
    "Permissions-Policy",
    [
      "accelerometer=()",
      "ambient-light-sensor=()",
      "autoplay=()",
      "battery=()",
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
    ].join(", ")
  );

  // --- CSP Report-Only (observabilité sans blocage) ---
  if (enableCspReportOnly) {
    const reportingEndpoint = absoluteUrl(req, "/api/csp-report");

    res.headers.set(
      "Report-To",
      JSON.stringify({
        group: "csp-endpoint",
        max_age: 10886400,
        endpoints: [{ url: reportingEndpoint }],
      })
    );
    res.headers.set("Reporting-Endpoints", `csp-endpoint="${reportingEndpoint}"`);

    const connectSrc = [
      "connect-src 'self' https:",
      hasSentry ? SENTRY_INGEST : "",
    ]
      .filter(Boolean)
      .join(" ");

    const cspReportOnly = [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      connectSrc,
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "media-src 'self' blob:",
      "worker-src 'self' blob:",
      "report-to csp-endpoint",
    ].join("; ");

    res.headers.set("Content-Security-Policy-Report-Only", cspReportOnly);
  }

  // --- Exception d'iframe si besoin ---
  if (req.nextUrl.pathname.startsWith("/status")) {
    res.headers.set("X-Frame-Options", "SAMEORIGIN");
  }

  return res;
}
