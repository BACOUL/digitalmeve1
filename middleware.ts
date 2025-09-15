// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  // On applique partout sauf assets statiques Next et fichiers publics lourds
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|og/|icons/).*)",
  ],
};

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // --- Security Headers (socle) ---
  res.headers.set("X-DNS-Prefetch-Control", "on");
  res.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-XSS-Protection", "0"); // obsolète mais évite double traitement
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
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
      "fullscreen=()",
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

  // --- Exceptions d'iframe si besoin ---
  // Exemple: autoriser l’embed de /status dans un autre domaine (widget status)
  if (req.nextUrl.pathname.startsWith("/status")) {
    // Autoriser l’embed en lecture (ajuste ton domaine si tu veux restreindre)
    res.headers.set("X-Frame-Options", "SAMEORIGIN");
  }

  return res;
}
