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
  priceMonthly: number;   // prix / mois (facturé mensuel)
  priceYearly: number;    // prix / mois équivalent, facturé annuel
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
    tagline: "For everyone — forever",
    ctaHref: "/generate",
    ctaLabel: "Start free",
    features: [
      "Unlimited personal use",
      "Built-in proof (PDF, DOCX beta, PNG soon)",
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
    priceYearly: 15, // affiché si Yearly = true (equiv /mo)
    tagline: "Solo / small teams",
    ctaHref: "/contact",
    ctaLabel: "Talk to us",
    features: [
      "Dashboard (teams & usage)",
      "API/SDK access",
      "Domain / email verification badge",
      "Basic rate limits",
      "Email support",
    ],
    limitNotes: ["Reasonable monthly volume", "Contact for exact quotas"],
  },
  {
    id: "growth",
    label: "Growth",
    priceMonthly: 79,
    priceYearly: 65,
    badge: "Popular",
    tagline: "Scale with confidence",
    ctaHref: "/contact",
    ctaLabel: "Request access",
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
    tagline: "Security & compliance",
    ctaHref: "/contact",
    ctaLabel: "Contact sales",
    features: [
      "Custom SLAs & DPA",
      "SAML/SSO, SCIM",
      "On-prem / region pinning (roadmap)",
      "Security reviews & support",
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
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
  } catch {
    return `$${amount}`;
  }
}

/** ---------------------------
 * Page
 * -------------------------- */
export default function PricingPage() {
  const [yearly, setYearly] = useState(true);

  // Plans business avec affichage /mo équivalent si yearly = true
  const business = useMemo(() => {
    if (!yearly) return BUSINESS;
    return BUSINESS.map((p) =>
      p.priceMonthly && p.priceYearly
        ? { ...p, priceMonthly: p.priceYearly }
        : p
    );
  }, [yearly]);

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero Pricing */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl text-gray-900">
              Simple pricing.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500">
                Built for everyone.
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Free for individuals. Flexible plans for businesses integrating{" "}
              <span className="font-semibold text-gray-800">.MEVE</span> at scale — with APIs, dashboard, and support.
            </p>
          </div>

          {/* Toggle */}
          <div
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-3 py-2"
            role="tablist"
            aria-label="Billing cycle"
          >
            <button
              role="tab"
              aria-selected={!yearly}
              onClick={() => setYearly(false)}
              className={`rounded-full px-3 py-1 text-sm transition ${
                !yearly ? "bg-white shadow text-gray-900" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Monthly
            </button>
            <button
              role="tab"
              aria-selected={yearly}
              onClick={() => setYearly(true)}
              className={`rounded-full px-3 py-1 text-sm transition ${
                yearly ? "bg-white shadow text-gray-900" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Yearly <span className="text-emerald-600">– save up to 20%</span>
            </button>
          </div>

          <p className="mt-3 text-xs text-gray-500">
            Prices shown in USD. Taxes/VAT may apply at checkout.
          </p>
        </div>
      </section>

      {/* Individuals */}
      <section id="individuals" className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-emerald-600" />
          <h2 className="text-2xl font-semibold text-gray-900">For Individuals</h2>
        </div>
        <p className="mt-2 text-gray-600">
          Protect your documents in seconds — for free, forever.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDIVIDUALS.map((p) => (
            <PlanCard key={p.id} plan={p} yearly={yearly} />
          ))}

          {/* Why free card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-900">Why is it free?</h3>
            <p className="mt-2 text-gray-600 text-sm">
              A basic layer of trust for documents should be universal. DigitalMeve computes a local fingerprint and embeds
              a lightweight marker — your file stays private and fully readable.
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
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
              >
                Get started <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Business */}
      <section id="business" className="mx-auto max-w-6xl px-4 pb-6">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-sky-600" />
          <h2 className="text-2xl font-semibold text-gray-900">For Business</h2>
        </div>
        <p className="mt-2 text-gray-600">
          API and dashboard to certify and verify at scale — with support and controls.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {business.map((p) => (
            <PlanCard key={p.id} plan={p} yearly={yearly} highlight={p.badge === "Popular"} />
          ))}
        </div>

        {/* Reasons to believe */}
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <Feature
            icon={<ShieldCheck className="h-5 w-5 text-emerald-600" />}
            title="Built-in, not intrusive"
            desc="Proof lives inside the file (PDF/DOCX), keeping documents readable and portable."
          />
          <Feature
            icon={<Layers className="h-5 w-5 text-sky-600" />}
            title="Easy integration"
            desc="Clean API/SDKs, webhooks, and bulk tools to fit your workflow."
          />
          <Feature
            icon={<Zap className="h-5 w-5 text-amber-500" />}
            title="Fast & private"
            desc="Local hashing in the browser; no upload of your content for personal use."
          />
        </div>

        {/* Comparison table (big clarity win) */}
        <div className="mt-12">
          <ComparisonTable yearly={yearly} />
        </div>

        {/* CTA bar */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
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
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-gray-500" />
          <h2 className="text-2xl font-semibold text-gray-900">FAQ</h2>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <QA
            q="What exactly is the .MEVE marker?"
            a="A small, built-in proof (date, time, and SHA-256 fingerprint) embedded inside your file — keeping it readable and portable."
          />
          <QA
            q="Do you store my documents?"
            a="No. For individuals, everything runs locally in your browser. For business API, you choose what to send (hash-only or files)."
          />
          <QA
            q="Can anyone verify my file?"
            a="Yes. The .MEVE file remains a valid PDF/DOCX and can be checked on our Verify page or with open tooling."
          />
          <QA
            q="What if the document changes?"
            a="Even a one-byte change will alter the fingerprint. Verification will show it’s been tampered."
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
  const displayPrice = isFree ? "Free" : formatPriceUSD(plan.priceMonthly); // déjà ajusté via parent si yearly=true

  return (
    <div
      className={[
        "relative rounded-2xl border bg-white p-6 shadow-sm",
        highlight ? "border-sky-300" : "border-gray-200",
      ].join(" ")}
      aria-labelledby={`${plan.id}-label`}
    >
      {plan.badge && (
        <div className="absolute -top-3 right-4 inline-flex items-center gap-1 rounded-full bg-sky-600 px-2.5 py-1 text-xs font-medium text-white">
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
        className={[
          "mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition",
          isFree
            ? "bg-emerald-500 text-white hover:bg-emerald-600"
            : "bg-sky-600 text-white hover:bg-sky-700",
        ].join(" ")}
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
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
    </div>
  );
}

function QA({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <h3 className="text-base font-semibold text-gray-900">{q}</h3>
      <p className="mt-2 text-sm text-gray-600">{a}</p>
    </div>
  );
}

/** Comparison table: clarifie les différences clé entre plans Business */
function ComparisonTable({ yearly }: { yearly: boolean }) {
  const rows = [
    { feature: "API & SDKs", starter: true, growth: true, enterprise: true },
    { feature: "Dashboard & team roles", starter: "Basic", growth: "Advanced", enterprise: "Custom" },
    { feature: "Rate limits / concurrency", starter: "Standard", growth: "Higher", enterprise: "Custom" },
    { feature: "Bulk verification tools", starter: false, growth: true, enterprise: true },
    { feature: "Webhooks & audit logs", starter: false, growth: true, enterprise: true },
    { feature: "Support", starter: "Email", growth: "Priority", enterprise: "Dedicated" },
    { feature: "Security & compliance", starter: "Shared", growth: "Shared", enterprise: "Custom SLAs, DPA, SSO/SCIM" },
    { feature: "Deployment options", starter: "Cloud", growth: "Cloud", enterprise: "On-prem / region pinning (roadmap)" },
  ];

  const headerPrices = BUSINESS.map((p) =>
    p.id === "enterprise"
      ? "Custom"
      : yearly
      ? formatPriceUSD(p.priceYearly) + "/mo*"
      : formatPriceUSD(p.priceMonthly) + "/mo"
  );

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
      <table className="w-full text-left text-sm text-gray-800">
        <thead className="whitespace-nowrap bg-gray-50 text-gray-900">
          <tr>
            <th className="px-4 py-3">Feature</th>
            <th className="px-4 py-3">Starter <span className="ml-2 text-xs text-gray-500">{headerPrices[0]}</span></th>
            <th className="px-4 py-3">Growth <span className="ml-2 text-xs text-gray-500">{headerPrices[1]}</span></th>
            <th className="px-4 py-3">Enterprise <span className="ml-2 text-xs text-gray-500">{headerPrices[2]}</span></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.feature} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}>
              <td className="px-4 py-3 font-medium">{r.feature}</td>
              <td className="px-4 py-3">{renderCell(r.starter)}</td>
              <td className="px-4 py-3">{renderCell(r.growth)}</td>
              <td className="px-4 py-3">{renderCell(r.enterprise)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between px-4 py-3 text-xs text-gray-500">
        <span>* Yearly shows equivalent /mo price, billed annually.</span>
        <Link href="/contact" className="inline-flex items-center gap-1 text-sky-700 hover:underline">
          Need a custom quote? <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

function renderCell(val: boolean | string) {
  if (typeof val === "boolean") {
    return val ? (
      <span className="inline-flex items-center gap-1 text-emerald-600">
        <CheckCircle2 className="h-4 w-4" /> Included
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 text-gray-400">
        <XCircle className="h-4 w-4" /> —
      </span>
    );
  }
  return <span className="text-gray-700">{val}</span>;
    }
