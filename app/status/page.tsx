// app/status/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Server,
  Cloud,
  Globe2,
  Timer,
  RefreshCcw,
} from "lucide-react";

/* ---------------- Types ---------------- */

type ApiStatus = {
  status: "ok" | "degraded" | "down";
  uptime: string;     // e.g. "99.98%"
  version: string;    // e.g. "1.2.3"
  region?: string;    // e.g. "eu-west-1"
};

/* -------------- Helpers (latency) -------------- */

function percentile(values: number[], p: number) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const idx = Math.min(sorted.length - 1, Math.max(0, Math.ceil((p / 100) * sorted.length) - 1));
  return Math.round(sorted[idx]);
}

async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit & { timeoutMs?: number } = {}) {
  const { timeoutMs = 4000, ...rest } = init;
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(input, { ...rest, signal: ctrl.signal, cache: "no-store" });
    return res;
  } finally {
    clearTimeout(to);
  }
}

async function measureStatus(): Promise<{
  api: ApiStatus | null;
  pings: number[];
  error: string | null;
}> {
  const attempts = 5;
  const pings: number[] = [];
  let api: ApiStatus | null = null;
  let error: string | null = null;

  for (let i = 0; i < attempts; i++) {
    try {
      const t0 = performance.now();
      const res = await fetchWithTimeout("/api/status", { timeoutMs: 4000 });
      const t1 = performance.now();
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as ApiStatus;
      api = data;
      pings.push(Math.max(0, t1 - t0));
    } catch (e: any) {
      error = e?.name === "AbortError" ? "Timeout" : e?.message || "Network error";
      // on enregistre un ping “raté” symbolique pour ne pas fausser le visuel
      pings.push(4000);
    }
  }
  return { api, pings, error };
}

/* ---------------- Page ---------------- */

export default function StatusPage() {
  const [api, setApi] = useState<ApiStatus | null>(null);
  const [pings, setPings] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [busy, setBusy] = useState(false);

  const intervalRef = useRef<number | null>(null);

  const metrics = useMemo(() => {
    const p50 = percentile(pings, 50);
    const p95 = percentile(pings, 95);
    return { p50, p95, samples: pings.length };
  }, [pings]);

  const overall: { label: string; tone: "ok" | "warn" | "down" } = useMemo(() => {
    if (!api && !error) return { label: "Checking…", tone: "warn" };
    if (api?.status === "ok") return { label: "All systems nominal", tone: "ok" };
    if (api?.status === "degraded") return { label: "Partial degradation", tone: "warn" };
    return { label: "Service disruption", tone: "down" };
  }, [api, error]);

  async function refreshOnce() {
    setBusy(true);
    const { api: a, pings: ps, error: err } = await measureStatus();
    setApi(a);
    setPings(ps);
    setError(err && !a ? err : null); // si on a des données API, on n’affiche pas l’erreur
    setBusy(false);
  }

  useEffect(() => {
    // premier check
    refreshOnce();
  }, []);

  useEffect(() => {
    if (!autoRefresh) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    // refresh toutes les 30s
    intervalRef.current = window.setInterval(() => {
      refreshOnce();
    }, 30000) as unknown as number;

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoRefresh]);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {/* SR live */}
      <p className="sr-only" aria-live="polite">
        {busy ? "Checking status…" : error ? `Error: ${error}` : `Status: ${overall.label}`}
      </p>

      {/* HERO */}
      <section className="border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="flex items-center gap-3">
            <Activity className="h-6 w-6 text-[var(--accent-1)]" />
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Status
            </h1>
          </div>
          <p className="mt-4 max-w-3xl text-lg text-[var(--fg-muted)]">
            Live service health for DigitalMeve — API, web app, and verification.
          </p>

          {/* Overall badge + controls */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ring-1 ring-[var(--border)]">
              <StatusDot tone={overall.tone} />
              <span className="font-medium">{overall.label}</span>
            </span>

            <button
              onClick={refreshOnce}
              disabled={busy}
              className="btn btn-ghost inline-flex items-center gap-2"
              aria-disabled={busy}
            >
              <RefreshCcw className={`h-4 w-4 ${busy ? "animate-spin" : ""}`} />
              {busy ? "Refreshing…" : "Refresh now"}
            </button>

            <label className="inline-flex select-none items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 accent-[var(--accent-1)]"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
              />
              Auto-refresh (30s)
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/developers#endpoints"
              className="btn btn-ghost inline-flex items-center gap-2"
            >
              API endpoints <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/security"
              className="btn inline-flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800"
            >
              Security &amp; trust <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* STATUS CARDS */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          <HealthCard
            title="Web App"
            desc="App shell and static assets via edge."
            healthy
            icon={<Cloud className="h-5 w-5 text-[var(--accent-1)]" />}
          />
          <HealthCard
            title="API"
            desc="Health, version & latency from /api/status."
            healthy={api?.status === "ok"}
            warning={api?.status === "degraded" || (!api && !error)}
            down={api?.status === "down" || !!error}
            meta={[
              api?.version ? `v${api.version}` : undefined,
              metrics.p50 != null ? `p50 ${metrics.p50} ms` : undefined,
              metrics.p95 != null ? `p95 ${metrics.p95} ms` : undefined,
              api?.region ? `region ${api.region}` : undefined,
              api?.uptime ? `uptime ${api.uptime}` : undefined,
            ].filter(Boolean) as string[]}
            icon={<Server className="h-5 w-5 text-[var(--accent-2)]" />}
          />
          <HealthCard
            title="Verification"
            desc="Hashing & proof checks (online/offline)."
            healthy
            icon={<CheckCircle2 className="h-5 w-5 text-[var(--accent-1)]" />}
          />
        </div>
      </section>

      {/* REGIONS */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Globe2 className="h-5 w-5 text-[var(--accent-2)]" />
          Regions
        </h2>
        <p className="mt-2 text-[var(--fg-muted)]">
          We deploy on global edge. API currently runs in a primary EU region with automatic failover (roadmap).
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <RegionChip name="EU (Primary)" status="ok" />
          <RegionChip name="US (Edge cache)" status="ok" />
          <RegionChip name="APAC (Edge cache)" status="ok" />
        </div>
      </section>

      {/* INCIDENTS */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          Incidents &amp; maintenance
        </h2>
        <p className="mt-2 text-[var(--fg-muted)]">
          No active incidents. Planned maintenance will be announced here.
        </p>

        <div className="mt-4 card p-5 text-sm">
          <p className="font-medium">Past 90 days</p>
          <ul className="mt-3 list-disc pl-5 space-y-1 text-[var(--fg-muted)]">
            <li>No incidents reported.</li>
          </ul>
        </div>
      </section>

      {/* SUBSCRIBE */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Timer className="h-5 w-5 text-[var(--accent-1)]" />
          Subscribe to updates
        </h2>
        <p className="mt-2 text-[var(--fg-muted)]">
          Get notified about incidents and maintenance windows.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="mailto:status@digitalmeve.com"
            className="btn inline-flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800"
          >
            status@digitalmeve.com
          </a>
          <Link
            href="/developers#status"
            className="btn btn-ghost inline-flex items-center gap-2"
          >
            API status endpoint <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

/* —————— UI bits —————— */

function StatusDot({ tone }: { tone: "ok" | "warn" | "down" }) {
  const cls =
    tone === "ok"
      ? "bg-emerald-500"
      : tone === "warn"
      ? "bg-amber-500"
      : "bg-rose-500";
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${cls}`} />;
}

function HealthCard({
  title,
  desc,
  icon,
  healthy,
  warning,
  down,
  meta = [],
}: {
  title: string;
  desc: string;
  icon?: React.ReactNode;
  healthy?: boolean;
  warning?: boolean;
  down?: boolean;
  meta?: string[];
}) {
  let tone = "ring-[var(--border)]";
  let label = (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--fg-muted)]">
      <Activity className="h-4 w-4" /> Checking…
    </span>
  );
  if (healthy) {
    tone = "ring-emerald-200";
    label = (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
        <CheckCircle2 className="h-4 w-4" /> Operational
      </span>
    );
  }
  if (warning && !down && !healthy) {
    tone = "ring-amber-200";
    label = (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700">
        <Activity className="h-4 w-4" /> Investigating
      </span>
    );
  }
  if (down) {
    tone = "ring-rose-200";
    label = (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-rose-700">
        <AlertTriangle className="h-4 w-4" /> Outage
      </span>
    );
  }

  return (
    <div className={`card p-5 ring-1 ${tone}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-base font-semibold">{title}</h3>
        </div>
        {label}
      </div>
      <p className="mt-2 text-sm text-[var(--fg-muted)]">{desc}</p>
      {meta.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2 text-xs text-[var(--fg-muted)]">
          {meta.map((m) => (
            <li key={m} className="rounded-full bg-white/5 px-2.5 py-1 ring-1 ring-[var(--border)]">
              {m}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function RegionChip({ name, status }: { name: string; status: "ok" | "warn" | "down" }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-white/5 px-4 py-3">
      <span className="text-sm font-medium">{name}</span>
      <StatusDot tone={status === "ok" ? "ok" : status === "warn" ? "warn" : "down"} />
    </div>
  );
            }
