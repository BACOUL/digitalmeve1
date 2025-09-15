// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const isProd = process.env.NODE_ENV === "production";
const enableCspReportOnly =
  process.env.NEXT_PUBLIC_CSP_REPORT_ONLY === "1" ||
  process.env.NEXT_PUBLIC_CSP_REPORT_ONLY === "true";

// Construit une URL absolue pour les endpoints de reporting
function absoluteUrl(req: NextRequest, path: string) {
  const origin = req.nextUrl.origin; // ex: https://digitalmeve.com
  return `${origin}${path}`;
}

export const config = {
  // On applique partout sauf assets statiques Next et fichiers publics lourds
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|og/|icons/).*)",
  ],
};

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // --- Identifiant de requête (utile pour corréler logs/erreurs) ---
  const requestId = crypto.randomUUID();
  res.headers.set("X-Request-ID", requestId);

  // --- Security Headers (socle) ---
  // HSTS uniquement en prod (évite de "locker" les environnements locaux)
  if (isProd) {
    res.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    );
  }

  res.headers.set("X-DNS-Prefetch-Control", "on");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-XSS-Protection", "0"); // obsolète mais évite double traitement
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // COOP/Corp/Corb (déjà en grande partie via next.config, on double au cas où)
  res.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  // Si tu passes en COEP=require-corp, le site doit être 100% compatible (risque de casser des intégrations)
  // res.headers.set("Cross-Origin-Embedder-Policy", "require-corp");
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

  // --- CSP Report-Only (optionnel, activable via NEXT_PUBLIC_CSP_REPORT_ONLY=1) ---
  if (enableCspReportOnly) {
    const reportingEndpoint = absoluteUrl(req, "/api/csp-report");
    // Report-To (legacy) + Reporting-Endpoints (nouveau)
    res.headers.set(
      "Report-To",
      JSON.stringify({
        group: "csp-endpoint",
        max_age: 10886400,
        endpoints: [{ url: reportingEndpoint }],
      })
    );
    res.headers.set("Reporting-Endpoints", `csp-endpoint="${reportingEndpoint}"`);

    // Version "light" pour capter les violations sans bloquer (le blocage dur se fait via next.config.mjs → CSP)
    const cspReportOnly = [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline'", // toléré pour Tailwind/inline styles
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https:",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "media-src 'self' blob:",
      "worker-src 'self' blob:",
      "report-to csp-endpoint",
    ].join("; ");

    // On n’écrase PAS la vraie CSP posée par next.config.mjs : ici c’est *Report-Only* pour observabilité
    res.headers.set("Content-Security-Policy-Report-Only", cspReportOnly);
  }

  // --- Exceptions d'iframe si besoin ---
  // Exemple: autoriser l’embed de /status (widget) dans la même origine
  if (req.nextUrl.pathname.startsWith("/status")) {
    res.headers.set("X-Frame-Options", "SAMEORIGIN");
  }

  return res;
}
