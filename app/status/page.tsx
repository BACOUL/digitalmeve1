"use client";

import { useEffect, useMemo, useState } from "react";
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
} from "lucide-react";

type ApiStatus = {
  status: "ok" | "degraded" | "down";
  uptime: string;
  version: string;
  region?: string;
};

export default function StatusPage() {
  const [api, setApi] = useState<ApiStatus | null>(null);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Ping the API status endpoint
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const t0 = performance.now();
        const res = await fetch("/api/status", { cache: "no-store" });
        const t1 = performance.now();
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as ApiStatus;
        if (!cancelled) {
          setApi(data);
          setLatencyMs(Math.round(t1 - t0));
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message || "Unable to reach /api/status");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const overall: { label: string; tone: "ok" | "warn" | "down" } = useMemo(() => {
    if (!api) return { label: "Checking…", tone: "warn" };
    if (api.status === "ok") return { label: "All systems nominal", tone: "ok" };
    if (api.status === "degraded") return { label: "Partial degradation", tone: "warn" };
    return { label: "Service disruption", tone: "down" };
  }, [api]);

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* HERO */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="flex items-center gap-3">
            <Activity className="h-6 w-6 text-emerald-600" />
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl text-gray-900">
              Status
            </h1>
          </div>
          <p className="mt-4 max-w-3xl text-lg text-gray-600">
            Live service health for DigitalMeve — API, web app, and verification.
          </p>

          {/* Overall badge */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ring-1 ring-gray-200">
            <StatusDot tone={overall.tone} />
            <span className="font-medium">{overall.label}</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/developers#endpoints"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-sky-700 ring-1 ring-sky-200 hover:bg-sky-50"
            >
              API endpoints <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/security"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Security & trust <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* STATUS CARDS */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          <HealthCard
            title="Web App"
            desc="App shell and static assets via Vercel edge."
            healthy
            icon={<Cloud className="h-5 w-5 text-emerald-600" />}
          />
          <HealthCard
            title="API"
            desc={`Health, version & latency from /api/status.`}
            healthy={api?.status === "ok"}
            warning={api?.status === "degraded" || (!api && !error)}
            down={api?.status === "down" || !!error}
            meta={[
              api?.version ? `v${api.version}` : undefined,
              typeof latencyMs === "number" ? `${latencyMs} ms` : undefined,
              api?.region ? `region ${api.region}` : undefined,
            ].filter(Boolean) as string[]}
            icon={<Server className="h-5 w-5 text-emerald-600" />}
          />
          <HealthCard
            title="Verification"
            desc="Hashing & proof checks (online/offline)."
            healthy
            icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />}
          />
        </div>
      </section>

      {/* REGIONS */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          <Globe2 className="h-5 w-5 text-sky-600" />
          Regions
        </h2>
        <p className="mt-2 text-gray-600">
          We deploy on global edge. API currently runs in a primary EU region with automatic failover (roadmap).
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <RegionChip name="EU (Primary)" status="ok" />
          <RegionChip name="US (Edge cache)" status="ok" />
          <RegionChip name="APAC (Edge cache)" status="ok" />
        </div>
      </section>

      {/* INCIDENTS (placeholder, ready to wire) */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          Incidents & maintenance
        </h2>
        <p className="mt-2 text-gray-600">
          No active incidents. Planned maintenance will be announced here.
        </p>

        <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 text-sm text-gray-700">
          <p className="text-gray-800 font-medium">Past 90 days</p>
          <ul className="mt-3 list-disc pl-5 space-y-1">
            <li className="text-gray-500">No incidents reported.</li>
          </ul>
        </div>
      </section>

      {/* SUBSCRIBE */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          <Timer className="h-5 w-5 text-emerald-600" />
          Subscribe to updates
        </h2>
        <p className="mt-2 text-gray-600">
          Get notified about incidents and maintenance windows.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="mailto:status@digitalmeve.com"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            status@digitalmeve.com
          </a>
          <Link
            href="/developers#status"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-sky-700 ring-1 ring-sky-200 hover:bg-sky-50"
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
  let tone = "text-gray-700 ring-gray-200";
  if (healthy) tone = "text-emerald-700 ring-emerald-200";
  if (warning) tone = "text-amber-700 ring-amber-200";
  if (down) tone = "text-rose-700 ring-rose-200";

  return (
    <div className={`rounded-2xl bg-white p-5 ring-1 ${tone}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        </div>
        {healthy ? (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
            <CheckCircle2 className="h-4 w-4" /> Operational
          </span>
        ) : down ? (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-rose-700">
            <AlertTriangle className="h-4 w-4" /> Outage
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700">
            <Activity className="h-4 w-4" /> Checking…
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-gray-700">{desc}</p>
      {meta.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2 text-xs text-gray-600">
          {meta.map((m) => (
            <li key={m} className="rounded-full bg-gray-50 px-2.5 py-1 ring-1 ring-gray-200">
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
    <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3">
      <span className="text-sm font-medium text-gray-900">{name}</span>
      <StatusDot tone={status === "ok" ? "ok" : status === "warn" ? "warn" : "down"} />
    </div>
  );
}
