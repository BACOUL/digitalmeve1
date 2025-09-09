import { NextRequest, NextResponse } from "next/server";

function splitName(name?: string) {
  if (!name) return { base: "file", ext: "bin" };
  const m = name.match(/^(.+)\.([^.]+)$/);
  return m ? { base: m[1], ext: m[2] } : { base: name, ext: "bin" };
}

export async function POST(req: NextRequest) {
  try {
    const apiBase = process.env.API_BASE_URL;
    const apiKey = process.env.API_KEY;
    if (!apiBase) return NextResponse.json({ error: "Missing API_BASE_URL" }, { status: 500 });

    const form = await req.formData();
    const file = form.get("file");
    const alsoJson = form.get("also_json"); // "1" si coché côté UI
    const { base, ext } = splitName(file instanceof File ? file.name : undefined);

    // 1) Appel principal : doit renvoyer name.meve.ext (binaire)
    const res = await fetch(`${apiBase}/generate`, {
      method: "POST",
      headers: { ...(apiKey ? { "X-API-Key": apiKey } : {}) },
      body: form
    });

    if (!res.ok) {
      const t = await res.text().catch(() => "");
      return NextResponse.json({ error: true, details: t }, { status: res.status });
    }

    const ct = res.headers.get("Content-Type") || "";
    const cd = res.headers.get("Content-Disposition");
    const primaryName = cd?.match(/filename="?([^"]+)"?/i)?.[1] ?? `${base}.meve.${ext}`;

    // Si l'API renvoie déjà du binaire (le cas cible) → on stream tel quel
    if (!ct.includes("application/json")) {
      const blob = await res.blob();

      // Si l'utilisateur veut aussi un sidecar JSON, on ajoute un header indicatif
      const headers: Record<string, string> = {
        "Content-Type": res.headers.get("Content-Type") ?? "application/octet-stream",
        "Content-Disposition": `attachment; filename="${primaryName}"`,
        "Cache-Control": "no-store"
      };
      if (alsoJson) headers["X-Meve-Also-Json"] = "1"; // hint pour le front (facultatif)
      return new NextResponse(blob, { headers });
    }

    // Si (temporairement) l'API renvoie JSON -> on renvoie la preuve "sidecar" .meve.json
    const text = await res.text();
    return new NextResponse(text, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": `attachment; filename="${base}.${ext}.meve.json"`,
        "Cache-Control": "no-store"
      }
    });
  } catch (e: any) {
    return NextResponse.json({ error: true, message: e?.message ?? "Proxy error" }, { status: 500 });
  }
}
