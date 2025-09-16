import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json().catch(() => null);
    console.error("[errlog]", json); // visible dans les logs Vercel
  } catch (e) {
    console.error("[errlog] parse error", e);
  }
  return new Response(null, { status: 204 });
}
