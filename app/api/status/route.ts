import { NextRequest } from "next/server";

export const runtime = "edge";

type ApiStatus = {
  status: "ok" | "degraded" | "down";
  uptime: string;
  version: string;
  region?: string;
};

const startTs = Date.now();
const VERSION =
  process.env.NEXT_PUBLIC_COMMIT_SHA?.slice(0, 7) ||
  process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ||
  "dev";
const REGION =
  process.env.VERCEL_REGION ||
  process.env.FLY_REGION ||
  process.env.AWS_REGION ||
  undefined;

export async function GET(_req: NextRequest) {
  // Ici tu peux ajouter de vrais checks (DB, fetch interne, disque, etc.)
  // Pour l’instant on renvoie toujours OK (et on pourra dégrader si un check échoue).
  const ok = true;

  const uptimeMs = Date.now() - startTs;
  const uptime = formatUptime(uptimeMs);

  const body: ApiStatus = {
    status: ok ? "ok" : "degraded",
    uptime,
    version: VERSION,
    region: REGION,
  };

  return Response.json(body, {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function formatUptime(ms: number) {
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const parts = [];
  if (d) parts.push(`${d}d`);
  if (h) parts.push(`${h}h`);
  if (m) parts.push(`${m}m`);
  parts.push(`${sec}s`);
  return parts.join(" ");
}
