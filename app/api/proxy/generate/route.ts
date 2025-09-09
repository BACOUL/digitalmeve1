import { NextRequest, NextResponse } from "next/server";

function inferNames(file?: File | null) {
  const fallbackBase = "file";
  if (!file || !file.name) return { base: fallbackBase, ext: "bin" };
  const m = file.name.match(/^(.+)\.([^.]+)$/);
  if (!m) return { base: file.name, ext: "bin" };
  return { base: m[1], ext: m[2] };
}

export async function POST(req: NextRequest) {
  try {
    const apiBase = process.env.API_BASE_URL;
    const apiKey = process.env.API_KEY;

    if (!apiBase) {
      return NextResponse.json({ error: "Missing API_BASE_URL" }, { status: 500 });
    }

    // Relai tel quel (on ajoute juste la clé)
    const form = await req.formData();
    const file = form.get("file");
    const { base, ext } = inferNames(file instanceof File ? file : null);

    const res = await fetch(`${apiBase}/generate`, {
      method: "POST",
      headers: { ...(apiKey ? { "X-API-Key": apiKey } : {}) },
      body: form,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json({ error: true, details: text }, { status: res.status });
    }

    // L’API peut renvoyer un flux binaire (meve.pdf) ou un JSON (fallback).
    const ct = res.headers.get("Content-Type") || "";
    const cd = res.headers.get("Content-Disposition");

    // 1) Si binaire → on stream tel quel, avec un nom par défaut "name.meve.ext"
    if (!ct.includes("application/json")) {
      const blob = await res.blob();
      const filename =
        cd?.match(/filename="?([^"]+)"?/i)?.[1] ?? `${base}.meve.${ext}`;
      return new NextResponse(blob, {
        headers: {
          "Content-Type": res.headers.get("Content-Type") ?? "application/octet-stream",
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Cache-Control": "no-store",
        },
      });
    }

    // 2) Si JSON → on passe au client (il décidera quoi faire : télécharger .meve.json par ex.)
    const json = await res.text(); // garde tel quel
    return new NextResponse(json, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: true, message: e?.message ?? "Proxy error" },
      { status: 500 }
    );
  }
}
