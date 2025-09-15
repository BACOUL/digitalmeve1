"use client";

import { useMemo, useState, ReactNode } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Users,
  Briefcase,
  ShieldCheck,
  Zap,
  Layers,
  HelpCircle,
  Star,
  Upload,
  Fingerprint,
} from "lucide-react";

/** ---------------------------
 * Types & Data
 * -------------------------- */
type Plan = {
  id: string;
  label: string;
  priceMonthly: number;
  priceYearly: number;
  badge?: string;
  tagline: string;
  ctaHref: string;
  ctaLabel: string;
  features: string[];
  limitNotes?: string[];
};

const INDIVIDUALS: Plan[] = [
  {
    id: "free",
    label: "Free",
    priceMonthly: 0,
    priceYearly: 0, // on garde 0 pour ignorer le toggle ici
    tagline: "Forever free, perfect for personal use.",
    ctaHref: "/generate",
    ctaLabel: "Get Started",
    features: ["Up to 5 files/day", "Basic .MEVE proof", "No account required"],
  },
  {
    id: "plus",
    label: "Plus",
    priceMonthly: 4.99,
    priceYearly: 4.99,
    tagline: "For power users who need more volume.",
    ctaHref: "/contact",
    ctaLabel: "Upgrade",
    features: ["Up to 50 files/day", "Priority verification", "Email support"],
  },
  {
    id: "premium",
    label: "Premium",
    priceMonthly: 9.99,
    priceYearly: 9.99,
    tagline: "For freelancers & professionals.",
    ctaHref: "/contact",
    ctaLabel: "Go Premium",
    features: ["Unlimited files", "Advanced proof options", "Priority support"],
  },
];

const BUSINESS: Plan[] = [
  {
    id: "starter",
    label: "Starter",
    priceMonthly: 19,
    priceYearly: 15,
    tagline: "For solo professionals & small teams",
    ctaHref: "/contact",
    ctaLabel: "Get Starter",
    features: [
      "Dashboard (teams & usage)",
      "API/SDK access",
      "Domain / email verification badge",
      "Basic rate limits",
      "Email support",
    ],
    limitNotes: ["Reasonable monthly volume", "Contact for quotas"],
  },
  {
    id: "growth",
    label: "Growth",
    priceMonthly: 79,
    priceYearly: 65,
    badge: "Most Popular",
    tagline: "Scale with confidence",
    ctaHref: "/contact",
    ctaLabel: "Upgrade now",
    features: [
      "Everything in Starter",
      "Higher limits & concurrency",
      "Bulk verification tools",
      "Webhooks & audit logs",
      "Priority support",
    ],
    limitNotes: ["Volume pricing available", "Sandbox & staging keys"],
  },
  {
    id: "enterprise",
    label: "Enterprise",
    priceMonthly: 0,
    priceYearly: 0,
    tagline: "Compliance, security & scale",
    ctaHref: "/contact",
    ctaLabel: "Contact sales",
    features: [
      "Custom SLAs & DPA",
      "SAML/SSO, SCIM",
      "On-prem / region pinning",
      "Security reviews & dedicated support",
      "Roadmap alignment",
    ],
    limitNotes: ["Custom pricing", "PO/Procurement support"],
  },
];

/** ---------------------------
 * Helpers
 * -------------------------- */
function formatPriceUSD(amount: number) {
  if (amount <= 0) return "Free";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
      minimumFractionDigits: amount < 10 ? 2 : 0,
    }).format(amount);
  } catch {
    return `$${amount}`;
  }
}

/** ---------------------------
 * Page
 * -------------------------- */
export default function PricingPage() {
  const [yearly, setYearly] = useState(true);

  const business = useMemo(() => {
    if (!yearly) return BUSINESS;
    return BUSINESS.map((p) =>
      p.priceMonthly && p.priceYearly ? { ...p, priceMonthly: p.priceYearly } : p
    );
  }, [yearly]);

  return (
    <main className="relative min-h-screen bg-[#0a1320] text-white">
      {/* Hero Pricing (light headline kept subtle for contrast) */}
      <section className="relative border-b border-white/10 bg-gradient-to-r from-emerald-500/5 via-white/0 to-sky-500/5">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Invisible proof.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
              Visible trust.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            DigitalMeve adds an invisible proof to your documents and delivers
            an official certificate. They remain identical, always readable, and
            easy to check — no account, no storage.
          </p>

          {/* Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur px-3 py-2 shadow-sm">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-full px-3 py-1 text-sm transition ${
                !yearly ? "bg-emerald-500 text-white shadow" : "text-white/80 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`rounded-full px-3 py-1 text-sm transition ${
                yearly ? "bg-emerald-500 text-white shadow" : "text-white/80 hover:text-white"
              }`}
            >
              Yearly <span className="ml-1 text-emerald-300">– save 20%</span>
            </button>
          </div>

          <p className="mt-3 text-xs text-white/50">Prices in USD. Taxes/VAT may apply.</p>
        </div>
      </section>

      {/* Individuals (dark block per brand) */}
      <section id="individuals" className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-3xl bg-[#0d1726] ring-1 ring-white/10 p-6 sm:p-10">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-500/20 to-sky-500/20 px-3 py-1 text-sm font-semibold text-emerald-300 ring-1 ring-emerald-500/30">
                Digital<span className="text-sky-300">Meve</span>
              </span>
            </div>
            <Link
              href="/generate"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition"
            >
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Protect your documents — <span className="text-emerald-300">free forever</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
              Add an invisible <span className="font-semibold text-emerald-200">.MEVE</span> proof to your files. No account. No storage. 100% private.
            </p>

            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/generate"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
              >
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/verify"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/15 ring-1 ring-white/15"
              >
                Verify a Document
              </Link>
            </div>

            {/* Badges */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/80 ring-1 ring-white/10">
                <ShieldCheck className="h-4 w-4 text-emerald-300" /> No storage
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/80 ring-1 ring-white/10">
                <Layers className="h-4 w-4 text-sky-300" /> Verifiable anywhere
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/80 ring-1 ring-white/10">
                <Zap className="h-4 w-4 text-amber-300" /> Free forever
              </span>
            </div>
          </div>

          {/* Three simple steps */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-white/90 text-center">Three simple steps</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <Step number="1" title="Upload" icon={<Upload className="h-5 w-5" />} desc="Drop your file (PDF, DOCX, PNG soon). Nothing is stored." />
              <Step number="2" title="Generate" icon={<Fingerprint className="h-5 w-5" />} desc="We compute a SHA-256 fingerprint and embed a .MEVE proof." />
              <Step number="3" title="Verify" desc="Anyone can confirm authenticity instantly — anywhere." />
            </div>
          </div>

          {/* Plans for individuals */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-white/90 text-center">Plans for individuals</h3>
            <p className="mt-1 text-center text-white/70">Start free, upgrade anytime for more documents or advanced options.</p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {INDIVIDUALS.map((p) => (
                <PlanCard key={p.id} plan={p} yearly={false} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Business */}
      <section id="business" className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-center justify-center gap-2">
          <Briefcase className="h-6 w-6 text-sky-300" />
          <h2 className="text-3xl font-semibold text-white">For Business</h2>
        </div>
        <p className="mt-2 text-center text-white/70">
          API and dashboard to certify & verify at scale — with enterprise-grade support.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {business.map((p) => (
            <PlanCard
              key={p.id}
              plan={p}
              yearly={yearly}
              highlight={p.badge === "Most Popular"}
            />
          ))}
        </div>

        {/* Reasons */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          <Feature
            icon={<ShieldCheck className="h-6 w-6 text-emerald-300" />}
            title="Built-in, not intrusive"
            desc="Proof lives inside the file, keeping documents readable and portable."
          />
          <Feature
            icon={<Layers className="h-6 w-6 text-sky-300" />}
            title="Easy integration"
            desc="Clean APIs, webhooks, and bulk tools to fit your workflow."
          />
          <Feature
            icon={<Zap className="h-6 w-6 text-amber-300" />}
            title="Fast & private"
            desc="Local hashing in the browser; no upload of your content."
          />
        </div>

        {/* Comparison */}
        <div className="mt-16">
          <ComparisonTable yearly={yearly} />
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col gap-3 sm:flex-row justify-center">
          <Link
            href="/developers"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-sky-300 ring-1 ring-sky-500/30 hover:bg-sky-500/10"
          >
            Explore docs
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-700"
          >
            Contact sales
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="flex items-center justify-center gap-2">
          <HelpCircle className="h-6 w-6 text-white/60" />
          <h2 className="text-3xl font-semibold text-white">FAQ</h2>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <QA
            q="What is the .MEVE marker?"
            a="A built-in proof (date, time, and SHA-256 fingerprint) embedded inside your file — keeping it readable and portable."
          />
          <QA
            q="Do you store my documents?"
            a="No. For individuals, everything runs locally in your browser. For businesses, you choose what to send (hash-only or files)."
          />
          <QA
            q="Can anyone verify my file?"
            a="Yes. The .MEVE file remains a valid PDF/DOCX and can be checked anywhere — with open tools or our Verify page."
          />
          <QA
            q="What if the document changes?"
            a="Even a single-byte change alters the fingerprint. Verification will show it’s been tampered."
          />
        </div>
      </section>
    </main>
  );
}

/** ---------------------------
 * Components
 * -------------------------- */
function PlanCard({
  plan,
  yearly,
  highlight = false,
}: {
  plan: Plan;
  yearly: boolean;
  highlight?: boolean;
}) {
  const isFree = plan.priceMonthly === 0 && plan.priceYearly === 0;
  const displayPrice = isFree ? "Free" : formatPriceUSD(plan.priceMonthly);

  return (
    <div
      className={`relative rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg ${
        highlight ? "border-sky-400 ring-2 ring-sky-200" : "border-gray-200"
      }`}
      aria-labelledby={`${plan.id}-label`}
    >
      {plan.badge && (
        <div className="absolute -top-3 right-4 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 px-2.5 py-1 text-xs font-medium text-white shadow">
          <Star className="h-3.5 w-3.5" />
          {plan.badge}
        </div>
      )}

      <h3 id={`${plan.id}-label`} className="text-lg font-semibold text-gray-900">
        {plan.label}
      </h3>
      <p className="mt-1 text-sm text-gray-600">{plan.tagline}</p>

      <div className="mt-4">
        {isFree ? (
          <p className="text-3xl font-semibold text-gray-900">{displayPrice}</p>
        ) : (
          <div className="flex items-end gap-1">
            <p className="text-3xl font-semibold text-gray-900">{displayPrice}</p>
            <span className="pb-1 text-sm text-gray-500">/mo</span>
            {yearly && <span className="pb-1 text-xs text-emerald-600">billed yearly</span>}
          </div>
        )}
      </div>

      <Link
        href={plan.ctaHref}
        className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
          isFree ? "bg-emerald-500 text-white hover:bg-emerald-600" : "bg-sky-600 text-white hover:bg-sky-700"
        }`}
        aria-label={`${plan.ctaLabel} — ${plan.label}`}
      >
        {plan.ctaLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>

      <ul className="mt-5 space-y-2 text-sm text-gray-700">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {plan.limitNotes && plan.limitNotes.length > 0 && (
        <ul className="mt-4 space-y-1 text-xs text-gray-500">
          {plan.limitNotes.map((n, i) => (
            <li key={i} className="flex items-start gap-2">
              <XCircle className="mt-0.5 h-4 w-4 text-gray-400" />
              <span>{n}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Step({
  number,
  title,
  desc,
  icon,
}: {
  number: string;
  title: string;
  desc: string;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5 text-white">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-sm font-semibold ring-1 ring-white/20">
          {number}
        </span>
        <h4 className="text-base font-semibold">{title}</h4>
        {icon ? <span className="ml-auto opacity-80">{icon}</span> : null}
      </div>
      <p className="mt-2 text-sm text-white/70">{desc}</p>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-2 text-white">
        {icon}
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-white/70">{desc}</p>
    </div>
  );
}

function QA({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm hover:shadow-md transition">
      <h3 className="text-base font-semibold text-white">{q}</h3>
      <p className="mt-2 text-sm text-white/70">{a}</p>
    </div>
  );
}

function ComparisonTable({ yearly }: { yearly: boolean }) {
  const rows = [
    { feature: "API & SDKs", starter: true, growth: true, enterprise: true },
    { feature: "Dashboard & team roles", starter: "Basic", growth: "Advanced", enterprise: "Custom" },
    { feature: "Rate limits / concurrency", starter: "Standard", growth: "Higher", enterprise: "Custom" },
    { feature: "Bulk verification tools", starter: false, growth: true, enterprise: true },
    { feature: "Webhooks & audit logs", starter: false, growth: true, enterprise: true },
    { feature: "Support", starter: "Email", growth: "Priority", enterprise: "Dedicated" },
    { feature: "Security & compliance", starter: "Shared", growth: "Shared", enterprise: "Custom SLAs, DPA, SSO/SCIM" },
    { feature: "Deployment options", starter: "Cloud", growth: "Cloud", enterprise: "On-prem / region pinning" },
  ];

  const headerPrices = BUSINESS.map((p) => {
    const perMonth = yearly ? p.priceYearly : p.priceMonthly;
    return perMonth <= 0 ? "Custom" : formatPriceUSD(perMonth) + "/mo";
  });

  const renderCell = (val: boolean | string) => {
    if (typeof val === "boolean") {
      return val ? (
        <CheckCircle2 className="h-5 w-5 text-emerald-500" aria-label="Included" />
      ) : (
        <XCircle className="h-5 w-5 text-gray-400" aria-label="Not included" />
      );
    }
    return <span className="text-sm text-white/90">{val}</span>;
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-sm">
      <table className="min-w-full divide-y divide-white/10 text-left">
        <thead className="bg-white/5">
          <tr>
            <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-white/70">
              Features
            </th>
            {BUSINESS.map((p, i) => (
              <th key={p.id} className="px-4 py-3">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">{p.label}</span>
                  <span className="text-xs text-white/70">{headerPrices[i]}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {rows.map((r, idx) => (
            <tr key={idx} className="hover:bg-white/5">
              <td className="px-4 py-3 text-sm font-medium text-white">{r.feature}</td>
              <td className="px-4 py-3">{renderCell(r.starter)}</td>
              <td className="px-4 py-3">{renderCell(r.growth)}</td>
              <td className="px-4 py-3">{renderCell(r.enterprise)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-t border-white/10 bg-white/5 px-4 py-3 text-xs text-white/60">
        Prices shown {yearly ? "per month (billed yearly)" : "per month"}. Contact us for custom volume pricing.
      </div>
    </div>
  );
        }
