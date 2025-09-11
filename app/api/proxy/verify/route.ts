// app/api/proxy/verify/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiBase = process.env.API_BASE_URL;
    const apiKey = process.env.API_KEY;
    if (!apiBase) {
      return NextResponse.json({ error: true, details: "Missing API_BASE_URL" }, { status: 500 });
    }

    const form = await req.formData();
    const upstream = await fetch(`${apiBase}/verify`, {
      method: "POST",
      body: form,
      headers: { ...(apiKey ? { "X-API-Key": apiKey } : {}) },
    });

    const ct = upstream.headers.get("Content-Type") || "application/json; charset=utf-8";
    const text = await upstream.text().catch(() => "");
    return new NextResponse(text || "{}", {
      status: upstream.status,
      headers: { "Content-Type": ct, "Cache-Control": "no-store" },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: true, details: e?.message ?? "Proxy error" },
      { status: 500 }
    );
  }
}
