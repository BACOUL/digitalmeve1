"use client";

import { useMemo, useState } from "react";
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
    id: "free-individual",
    label: "Free",
    priceMonthly: 0,
    priceYearly: 0,
    tagline: "Universal trust — at zero cost",
    ctaHref: "/generate",
    ctaLabel: "Start free",
    features: [
      "Unlimited personal use",
      "Built-in proof (PDF, DOCX, PNG soon)",
      "No account, no storage",
      "Local SHA-256 fingerprinting",
      "Human-readable certificate (.html)",
    ],
    limitNotes: ["Max 10 MB per file", "Fair-usage: 5 files/day"],
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
      maximumFractionDigits: 0,
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
      p.priceMonthly && p.priceYearly
        ? { ...p, priceMonthly: p.priceYearly }
        : p
    );
  }, [yearly]);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-800">
      {/* Hero Pricing */}
      <section className="relative border-b border-gray-200 bg-gradient-to-r from-emerald-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Proof of trust,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500">
              for everyone.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Free for individuals. Powerful plans for teams & enterprises —
            with APIs, dashboards, and global compliance.
          </p>

          {/* Toggle */}
          <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white/70 backdrop-blur px-3 py-2 shadow-sm">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-full px-3 py-1 text-sm transition ${
                !yearly
                  ? "bg-emerald-500 text-white shadow"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`rounded-full px-3 py-1 text-sm transition ${
                yearly
                  ? "bg-emerald-500 text-white shadow"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Yearly <span className="ml-1 text-emerald-600">– save 20%</span>
            </button>
          </div>

          <p className="mt-3 text-xs text-gray-500">
            Prices in USD. Taxes/VAT may apply.
          </p>
        </div>
      </section>

      {/* Individuals */}
      <section id="individuals" className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-center justify-center gap-2">
          <Users className="h-6 w-6 text-emerald-600" />
          <h2 className="text-3xl font-semibold text-gray-900">
            For Individuals
          </h2>
        </div>
        <p className="mt-2 text-center text-gray-600">
          Protect your documents in seconds — free, private, forever.
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {INDIVIDUALS.map((p) => (
            <PlanCard key={p.id} plan={p} yearly={yearly} />
          ))}

          {/* Why free card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-900">Why free?</h3>
            <p className="mt-2 text-sm text-gray-600">
              Trust should be universal. DigitalMeve computes a local
              fingerprint and embeds a marker — your file stays private,
              portable, and verifiable.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
                No accounts, no storage
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
                Verifiable anywhere
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
                Human-readable certificate
              </li>
            </ul>
            <div className="mt-4">
              <Link
                href="/generate"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 transition"
              >
                Get started <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Business */}
      <section id="business" className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-center justify-center gap-2">
          <Briefcase className="h-6 w-6 text-sky-600" />
          <h2 className="text-3xl font-semibold text-gray-900">For Business</h2>
        </div>
        <p className="mt-2 text-center text-gray-600">
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
            icon={<ShieldCheck className="h-6 w-6 text-emerald-600" />}
            title="Built-in, not intrusive"
            desc="Proof lives inside the file, keeping documents readable and portable."
          />
          <Feature
            icon={<Layers className="h-6 w-6 text-sky-600" />}
            title="Easy integration"
            desc="Clean APIs, webhooks, and bulk tools to fit your workflow."
          />
          <Feature
            icon={<Zap className="h-6 w-6 text-amber-500" />}
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
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-sky-700 ring-1 ring-sky-200 hover:bg-sky-50"
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
          <HelpCircle className="h-6 w-6 text-gray-500" />
          <h2 className="text-3xl font-semibold text-gray-900">FAQ</h2>
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
            <p className="text-3xl font-semibold text-gray-900">
              {displayPrice}
            </p>
            <span className="pb-1 text-sm text-gray-500">/mo</span>
            {yearly && (
              <span className="pb-1 text-xs text-emerald-600">billed yearly</span>
            )}
          </div>
        )}
      </div>

      <Link
        href={plan.ctaHref}
        className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
          isFree
            ? "bg-emerald-500 text-white hover:bg-emerald-600"
            : "bg-sky-600 text-white hover:bg-sky-700"
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

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-2">{icon}<h3 className="text-base font-semibold text-gray-900">{title}</h3></div>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
    </div>
  );
}

function QA({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition">
      <h3 className="text-base font-semibold text-gray-900">{q}</h3>
      <p className="mt-2 text-sm text-gray-600">{a}</p>
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

  const headerPrices = BUSINESS.map((p) =>
    p.id
