import crypto from "node:crypto";

export const QUOTA_COOKIE = "dm_qv1"; // nom du cookie
export const MAX_FREE_PER_DAY = 5;    // plafond invité/jour (tu peux ajuster)

type QuotaPayload = {
  d: string; // YYYY-MM-DD (UTC)
  c: number; // count for the day
  id: string; // client id (stable)
};

function b64url(data: Buffer | string) {
  return (typeof data === "string" ? Buffer.from(data) : data)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

export function sign(input: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(input).digest("base64url");
}

export function encodePayload(p: QuotaPayload) {
  return b64url(JSON.stringify(p));
}

export function decodePayload(s: string): QuotaPayload | null {
  try {
    const json = Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
    const obj = JSON.parse(json);
    if (!obj || typeof obj.d !== "string" || typeof obj.c !== "number" || typeof obj.id !== "string") {
      return null;
    }
    return obj as QuotaPayload;
  } catch {
    return null;
  }
}

export function todayUTC(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

export function makeCookieValue(payload: QuotaPayload, secret: string) {
  const body = encodePayload(payload);
  const sig = sign(body, secret);
  return `${body}.${sig}`;
}

export function verifyCookieValue(value: string, secret: string): QuotaPayload | null {
  const [body, sig] = value.split(".");
  if (!body || !sig) return null;
  const expected = sign(body, secret);
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  return decodePayload(body);
}
