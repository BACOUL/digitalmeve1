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
  // gère filename*=UTF-8''... ou filename="..."
  const star = cd.match(/filename\*=(?:UTF-8'')?("?)([^";]+)\1/i);
  if (star?.[2]) return decodeURIComponent(star[2]);
  const std = cd.match(/filename="?([^";]+)"?/i);
  return std?.[1] ?? null;
}

// Évite des caractères interdits dans un filename
function sanitizeFilename(name: string) {
  return name.replace(/[/\\?%*:|"<>]/g, "_");
}

export async function POST(req: NextRequest) {
  try {
    const apiBase = process.env.API_BASE_URL;
    const apiKey = process.env.API_KEY;
    if (!apiBase) {
      return NextResponse.json({ error: "Missing API_BASE_URL" }, { status: 500 });
    }

    const form = await req.formData();
    const file = form.get("file");
    const alsoJson = form.get("also_json"); // "1" si coché côté UI
    const { base, ext } = splitName(file instanceof File ? file.name : undefined);

    // Appel à l'API amont
    const upstream = await fetch(`${apiBase}/generate`, {
      method: "POST",
      body: form,
      headers: { ...(apiKey ? { "X-API-Key": apiKey } : {}) },
    });

    // Gestion des erreurs amont
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

    // Détermination du nom final
    const ctUp = upstream.headers.get("Content-Type") || "";
    const cdUp = upstream.headers.get("Content-Disposition");
    const cdName = filenameFromCD(cdUp);

    const defaultName = ctUp.includes("application/json")
      ? `${base}.${ext}.meve.json`
      : `${base}.meve.${ext}`;

    const finalName = sanitizeFilename(cdName || defaultName);

    // Prépare les en-têtes de sortie
    const headers = new Headers();
    // ⚠️ Forcer le téléchargement : même si upstream renvoie application/json,
    // on met octet-stream pour éviter l'ouverture dans le navigateur.
    const forcedType = ctUp.includes("application/json")
      ? "application/octet-stream"
      : ctUp || "application/octet-stream";

    headers.set("Content-Type", forcedType);
    headers.set("Cache-Control", "no-store");
    headers.set("Content-Disposition", `attachment; filename="${finalName}"`);
    if (alsoJson) headers.set("X-Meve-Also-Json", "1"); // hint facultatif pour le front

    // Stream direct (sans bufferiser en mémoire)
    return new NextResponse(upstream.body, {
      status: upstream.status,
      headers,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: true, message: e?.message ?? "Proxy error" },
      { status: 500 }
    );
  }
}
```0
