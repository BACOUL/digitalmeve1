import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiBase = process.env.API_BASE_URL;
    const apiKey = process.env.API_KEY;

    if (!apiBase || !apiKey) {
      return NextResponse.json(
        { error: "API is not configured. Missing API_BASE_URL or API_KEY." },
        { status: 500 }
      );
    }

    const formData = await req.formData();

    const res = await fetch(`${apiBase}/generate`, {
      method: "POST",
      headers: { "X-API-Key": apiKey },
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: true, details: text }, { status: res.status });
    }

    // On renvoie le flux binaire (le .meve.json)
    const blob = await res.blob();
    return new NextResponse(blob, {
      headers: {
        "Content-Type": res.headers.get("Content-Type") ?? "application/json",
        "Content-Disposition": res.headers.get("Content-Disposition") ?? "attachment; filename=\"proof.meve.json\"",
        "Cache-Control": "no-store",
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: true, message: e?.message ?? "Proxy error" }, { status: 500 });
  }
}
