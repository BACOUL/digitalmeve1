// app/api/proxy/generate/route.ts
import { NextRequest, NextResponse } from "next/server";

// Sépare nom/extension de façon robuste
function splitName(name?: string) {
  if (!name) return { base: "file", ext: "bin" };
  const m = name.match(/^(.+)\.([^.]+)$/);
  return m ? { base: m[1], ext: m[2] } : { base: name, ext: "bin" };
}

// Récupère le filename d'un Content-Disposition si présent
function filenameFromCD(cd: string | null): string | null {
  if (!cd) return null;
  const m = cd.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i);
  return m?.[1] ? decodeURIComponent(m[1]) : null;
}

// Évite des caractères bizarres dans un filename (fallback)
function sanitizeFilename(name: string) {
  return name.replace(/[/\\?%*:|"<>]/g, "_");
}

export async function POST(req: NextRequest) {
  try {
    // ⚠️ Choisis l’une des deux options d’ENV et reste cohérent :
    // - API_BASE_URL (server-only) -> 👍 recommandé
    // - OU NEXT_PUBLIC_API_BASE_URL (exposé au client) -> ❌ évite pour un endpoint privé
    const apiBase = process.env.API_BASE_URL;
    const apiKey = process.env.API_KEY;
    if (!apiBase) {
      return NextResponse.json(
        { error: "Missing API_BASE_URL" },
        { status: 500 }
      );
    }

    const form = await req.formData();
    const file = form.get("file");
    const alsoJson = form.get("also_json"); // "1" si coché côté UI
    const { base, ext } = splitName(file instanceof File ? file.name : undefined);

    // Appel API
    const upstream = await fetch(`${apiBase}/generate`, {
      method: "POST",
      body: form,
      headers: {
        ...(apiKey ? { "X-API-Key": apiKey } : {}),
      },
      // IMPORTANT: pas de "cache" ici
    });

    // Si erreur upstream → renvoyer JSON clair
    if (!upstream.ok) {
      let details = "";
      try {
        details = await upstream.text();
      } catch {
        /* noop */
      }
      return NextResponse.json(
        { error: true, status: upstream.status, details },
        { status: upstream.status }
      );
    }

    // Propage types & nom propre
    const ct = upstream.headers.get("Content-Type") || "";
    const cdUp = upstream.headers.get("Content-Disposition");
    const cdName = filenameFromCD(cdUp);
    const defaultName = ct.includes("application/json")
      ? `${base}.${ext}.meve.json`
      : `${base}.meve.${ext}`;
    const finalName = sanitizeFilename(cdName || defaultName);

    // Prépare les headers de sortie
    const headers = new Headers();
    headers.set("Content-Type", ct || "application/octet-stream");
    headers.set("Cache-Control", "no-store");
    headers.set("Content-Disposition", `attachment; filename="${finalName}"`);

    // Hint facultatif pour le front (si tu veux déclencher un 2e download .json après)
    if (alsoJson) {
      headers.set("X-Meve-Also-Json", "1");
    }

    // ⚡ Stream la réponse sans tout charger en mémoire
    const body = upstream.body; // ReadableStream<Uint8Array> | null
    return new NextResponse(body, { status: upstream.status, headers });
  } catch (e: any) {
    return NextResponse.json(
      { error: true, message: e?.message ?? "Proxy error" },
      { status: 500 }
    );
  }
       }
