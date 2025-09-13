import { cookies } from "next/headers";
import { QUOTA_COOKIE, MAX_FREE_PER_DAY, todayUTC, verifyCookieValue, makeCookieValue } from "@/lib/quota";
import crypto from "node:crypto";

export const dynamic = "force-dynamic";

export async function POST() {
  const secret = process.env.QUOTA_SECRET;
  if (!secret) {
    return Response.json({ error: "Server misconfigured: QUOTA_SECRET missing" }, { status: 500 });
  }

  const jar = cookies();
  const raw = jar.get(QUOTA_COOKIE)?.value;
  const today = todayUTC();

  // Lire ou initialiser le payload
  let payload =
    (raw && verifyCookieValue(raw, secret)) ||
    null;

  // Reset si jour différent ou payload invalide
  if (!payload || payload.d !== today) {
    payload = { d: today, c: 0, id: payload?.id || crypto.randomUUID() };
  }

  // Si on a atteint la limite
  if (payload.c >= MAX_FREE_PER_DAY) {
    // Rafraîchir le cookie (même payload) pour prolonger la durée
    const cookieVal = makeCookieValue(payload, secret);
    jar.set(QUOTA_COOKIE, cookieVal, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 jours
    });
    return Response.json(
      { allowed: false, reason: "limit_reached", remaining: 0, count: payload.c, resetDayUTC: payload.d },
      { status: 429 }
    );
  }

  // Incrément
  payload.c += 1;
  const remaining = Math.max(0, MAX_FREE_PER_DAY - payload.c);

  // Écrire le cookie signé
  const cookieVal = makeCookieValue(payload, secret);
  jar.set(QUOTA_COOKIE, cookieVal, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return Response.json({
    allowed: true,
    count: payload.c,
    remaining,
    resetDayUTC: payload.d,
  });
}
