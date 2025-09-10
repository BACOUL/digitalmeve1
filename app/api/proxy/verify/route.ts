import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiBase = process.env.API_BASE_URL;
    const apiKey = process.env.API_KEY;
    if (!apiBase) {
      return NextResponse.json({ error: "Missing API_BASE_URL" }, { status: 500 });
    }

    const form = await req.formData();
    // Le backend doit accepter:
    //  - "file": soit un fichier avec preuve intégrée (meve_proof), soit un .meve.json
    //  - "original": (optionnel) l’original si "file" est un .meve.json
    const res = await fetch(`${apiBase}/verify`, {
      method: "POST",
      headers: {
        ...(apiKey ? { "X-API-Key": apiKey } : {}),
      },
      body: form,
    });

    const text = await res.text().catch(() => "");
    if (!res.ok) {
      return NextResponse.json({ error: true, details: text || "Verify failed" }, { status: res.status });
    }

    // On force JSON côté front
    return new NextResponse(text, {
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
