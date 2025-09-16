// app/api/sentry/route.ts
import { NextRequest } from "next/server";

// Tu peux rester en edge (plus rapide) ou passer à "nodejs" si besoin
export const runtime = "edge";

/**
 * Proxy d’ingestion Sentry compatible "envelope".
 * On lit NEXT_PUBLIC_SENTRY_DSN, on en extrait:
 *  - la clé publique (username)
 *  - l’org (oXXXXX) + le projectId
 * Puis on envoie le body tel quel vers l’endpoint officiel avec sentry_key.
 */
export async function POST(req: NextRequest) {
  try {
    const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
    if (!dsn) {
      // Pas de DSN en env → on répond 204 pour ne pas casser ton app
      return new Response("Sentry DSN missing", { status: 204 });
    }

    // Exemple DSN:
    // https://<PUBLIC_KEY>@o4510025820012544.ingest.de.sentry.io/4510025838821456
    const u = new URL(dsn);

    // 1) clé publique
    const publicKey = u.username; // <PUBLIC_KEY>
    if (!publicKey) return new Response("Invalid DSN", { status: 204 });

    // 2) projectId = dernier segment du path
    const pathParts = u.pathname.split("/").filter(Boolean);
    const projectId = pathParts[pathParts.length - 1];
    if (!projectId) return new Response("Invalid DSN", { status: 204 });

    // 3) domaine d’ingest (sans user/pass, sans path)
    //    -> https://oXXXX.ingest[.region].sentry.io
    const origin = `${u.protocol}//${u.host}`;

    // 4) URL finale d’ingestion "envelope"
    const ingestUrl = `${origin}/api/${projectId}/envelope/?sentry_key=${encodeURIComponent(
      publicKey
    )}&sentry_version=7`;

    // On forward le body tel quel (envelope) + content-type
    const body = await req.text();
    const res = await fetch(ingestUrl, {
      method: "POST",
      body,
      headers: {
        "Content-Type":
          req.headers.get("content-type") ??
          "application/x-sentry-envelope",
      },
      // Important sur Edge: pas besoin de credentials/cookies
      redirect: "follow",
    });

    // On renvoie le status de Sentry (200 si ok)
    return new Response(null, { status: res.status });
  } catch (e) {
    // On répond 204 pour rester silencieux côté client si qqch se passe mal
    return new Response(null, { status: 204 });
  }
}

// Optionnel: GET health-check rapide
export function GET() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN ? "ok" : "missing";
  return Response.json({ status: "up", dsn });
}
