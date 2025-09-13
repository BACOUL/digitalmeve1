// /lib/quotaClient.ts
export type QuotaOk = {
  allowed: true;
  count: number;
  remaining: number;
  resetDayUTC: string;
};

export type QuotaLimit = {
  allowed: false;
  reason: "limit_reached";
  remaining: 0;
  count: number;
  resetDayUTC: string;
};

export async function checkFreeQuota(): Promise<QuotaOk> {
  const r = await fetch("/api/quota/bump", {
    method: "POST",
    cache: "no-store",
  });

  if (r.status === 429) {
    const data = (await r.json()) as QuotaLimit;
    const msg = `Daily free limit reached. (${data.count} used)`;
    const err = new Error(msg) as Error & { quota?: QuotaLimit };
    err.quota = data;
    throw err;
  }

  if (!r.ok) {
    throw new Error(`Quota check failed (${r.status})`);
  }

  return (await r.json()) as QuotaOk;
}
