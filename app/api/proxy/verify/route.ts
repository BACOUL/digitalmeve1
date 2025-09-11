// app/api/proxy/verify/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiBase = process.env.API_BASE_URL;
    const apiKey = process.env.API_KEY;
    if (!apiBase) {
      return NextResponse.json(
        { error: "Missing API_BASE_URL" },
        { status: 500 }
      );
    }

    // On relaye tel quel les fichiers vers l’API /verify
    const form = await req.formData();

    const upstream = await fetch(`${apiBase}/verify`, {
      method: "POST",
      headers: {
        ...(apiKey ? { "X-API-Key": apiKey } : {}),
      },
      body: form,
      // pas de cache
    });

    // Si l’API échoue → renvoyer le message en clair
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

    // On force une réponse JSON (vérif structurée)
    const text = await upstream.text();
    return new NextResponse(text, {
      headers: {
        "Content-Type": upstream.headers.get("Content-Type") || "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      },
      status: upstream.status,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: true, message: e?.message ?? "Proxy error" },
      { status: 500 }
    );
  }
}
