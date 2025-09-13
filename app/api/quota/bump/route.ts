// app/api/quota/bump/route.ts
import { cookies } from "next/headers";

const QUOTA_COOKIE = "dm_quota";
const ONE_YEAR = 60 * 60 * 24 * 365;

function todayUTC() {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(
    d.getUTCDate()
  ).padStart(2, "0")}`;
}

type Payload = {
  d: string;   // YYYY-MM-DD (UTC)
  n: number;   // count for the day
};

export async function POST() {
  // ⚠️ Next 15 : cookies() → Promise => on attend
  const store = await cookies();

  const raw = store.get(QUOTA_COOKIE)?.value;
  const today = todayUTC();

  // Lire l'état courant
  let payload: Payload = { d: today, n: 0 };
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Payload;
      if (parsed && parsed.d === today && typeof parsed.n === "number") {
        payload = parsed;
      }
    } catch (_) {
      // ignore / reset
    }
  }

  // Incrémenter
  payload.n += 1;

  // Ecrire le nouveau cookie (HTTPOnly pour éviter les bidouilles côté client)
  store.set(QUOTA_COOKIE, JSON.stringify(payload), {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: ONE_YEAR,
  });

  return new Response(
    JSON.stringify({ ok: true, date: payload.d, count: payload.n }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
