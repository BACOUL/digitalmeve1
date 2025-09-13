export const dynamic = "force-dynamic"; // évite le cache sur Vercel

type ApiStatus = {
  status: "ok" | "degraded" | "down";
  uptime: string;
  version: string;
  region?: string;
};

export async function GET() {
  const payload: ApiStatus = {
    status: "ok",
    uptime: "99.99%",
    version: process.env.NEXT_PUBLIC_APP_VERSION || "2025.9.0",
    region: process.env.VERCEL_REGION || "eu-1",
  };

  return Response.json(payload, {
    status: 200,
    headers: {
      "cache-control": "no-store, max-age=0",
    },
  });
}
