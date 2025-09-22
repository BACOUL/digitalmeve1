// app/pricing/page.tsx — Canonical Pricing (Free / Individuals / Professionals)
// Aligned with GitHub docs, Stripe, country-based pricing, refund policy

"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ArrowRight, Info, ShieldCheck, Globe2, CreditCard } from "lucide-react";
import { useSearchParams } from "next/navigation";

type Billing = "monthly" | "yearly";

export default function PricingPage() {
  const qp = useSearchParams();
  const initial = (qp.get("billing") as Billing) || "monthly";
  const [billing, setBilling] = useState<Billing>(initial);

  // pour ancrage #individual / #professional avec toggle correct
  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (hash === "#individual") {
      document.getElementById("card-individual")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (hash === "#professional") {
      document.getElementById("card-professional")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const plans = useMemo(
    () => [
      {
        id: "free",
        name: "Free",
        price: billing === "monthly" ? "€0" : "€0",
        sub: billing === "monthly" ? "forever" : "forever",
        badge: undefined as string | undefined,
        desc: "Evaluate the standard. No account required.",
        features: [
          "5 files / month",
          "Visible watermark",
          "Invisible SHA-256 + DigitalMeve key",
          "On-device processing · No storage",
        ],
        cta: { href: "/generate", label: "Get started free", variant: "outline" as const },
      },
      {
        id: "individual",
        name: "Individuals",
        price: billing === "monthly" ? "€9.90" : "€99",
        sub: billing === "monthly" ? "/ month" : "/ year",
        badge: "Most popular",
        desc: "Unlimited certifications with named certificates.",
        features: [
          "Unlimited files",
          "Name/email in certificate",
          "Visible watermark · Invisible SHA-256 + DM key",
          "Priority support",
        ],
        cta: { href: "/checkout?plan=individual&billing="+billing, label: "Subscribe", variant: "primary" as const },
      },
      {
        id: "professional",
        name: "Professionals",
        price: billing === "monthly" ? "€29.90" : "€299",
        sub: billing === "monthly" ? "/ month" : "/ year",
        badge: "Recommended",
        desc: "Enterprise identity with private key and DNS binding.",
        features: [
          "Unlimited files · Priority checks",
          "Enterprise private key (per org)",
          "DNS binding (domain-level trust)",
          "Certificates naming your company (HTML)",
          "Optional branded watermark",
          "Support & onboarding",
        ],
        cta: { href: "/checkout?plan=professional&billing="+billing, label: "Subscribe", variant: "primary" as const },
      },
    ],
    [billing]
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* HERO */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Simple pricing —{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-sky-400">
              privacy-first by design
            </span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-300/90">
            Start free. Upgrade anytime. Secure payments via Stripe. Pricing adapts by country.
          </p>

          {/* Billing toggle */}
          <div
            className="mt-6 inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1"
            role="tablist"
            aria-label="Billing period"
          >
            <button
              role="tab"
              aria-selected={billing === "monthly"}
              className={[
                "px-3 py-1.5 text-sm rounded-lg transition",
                billing === "monthly" ? "bg-slate-900 text-white" : "text-slate-300 hover:text-white",
              ].join(" ")}
              onClick={() => setBilling("monthly")}
            >
              Monthly
            </button>
            <button
              role="tab"
              aria-selected={billing === "yearly"}
              className={[
                "px-3 py-1.5 text-sm rounded-lg transition",
                billing === "yearly" ? "bg-slate-900 text-white" : "text-slate-300 hover:text-white",
              ].join(" ")}
              onClick={() => setBilling("yearly")}
            >
              Yearly <span className="ml-1 text-emerald-300/90">(save ~17%)</span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              Certificate included (HTML)
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <Globe2 className="h-4 w-4 text-sky-300" />
              Country-based pricing
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <CreditCard className="h-4 w-4 text-emerald-300" />
              Stripe · PCI DSS / PSD2
            </span>
          </div>
        </div>
      </section>

      {/* CARDS */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {plans.map((p) => (
            <article
              key={p.id}
              id={`card-${p.id}`}
              className={`relative rounded-2xl border p-6 ${
                p.id === "free"
                  ? "border-white/10 bg-white/5"
                  : p.id === "professional"
                  ? "border-emerald-400/40 bg-white/5 shadow-[0_0_30px_rgba(16,185,129,.08)]"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {p.badge && (
                <span className="absolute -top-3 right-4 inline-flex items-center rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 px-2.5 py-1 text-xs font-medium text-white shadow">
                  {p.badge}
                </span>
              )}
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-1 text-3xl font-bold">
                {p.price}{" "}
                <span className="ml-1 align-middle text-sm font-normal text-slate-400">{p.sub}</span>
              </p>
              <p className="mt-2 text-sm text-slate-400">{p.desc}</p>
              <ul className="mt-4 space-y-1 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                href={p.cta.href}
                className={`mt-6 inline-flex w-full justify-center rounded-xl px-4 py-2 text-sm font-medium transition ${
                  p.cta.variant === "primary"
                    ? "bg-gradient-to-r from-emerald-500 to-sky-500 text-white hover:brightness-105"
                    : "ring-1 ring-white/10 hover:bg-white/5 text-slate-100"
                }`}
              >
                {p.cta.label}
              </Link>
            </article>
          ))}
        </div>

        {/* Legal notes under cards */}
        <p className="mt-6 text-center text-xs text-slate-500">
          Secure payments via Stripe · Pricing adapts by country and taxes · Cancel anytime ·{" "}
          <Link href="/refunds" className="underline hover:opacity-90">
            Refund Policy
          </Link>
        </p>
      </section>

      {/* COMPARISON TABLE */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-xl font-semibold text-center">Compare plans</h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-[720px] w-full border-collapse text-sm">
            <thead>
              <tr className="bg-white/5 text-left">
                <th className="px-4 py-3 font-semibold">Feature</th>
                <th className="px-4 py-3 font-semibold">Free</th>
                <th className="px-4 py-3 font-semibold">Individuals</th>
                <th className="px-4 py-3 font-semibold">Professionals</th>
              </tr>
            </thead>
            <tbody className="[&_tr:not(:last-child)]:border-b [&_tr:not(:last-child)]:border-white/10">
              {[
                ["Monthly quota", "5 files", "Unlimited", "Unlimited"],
                ["Certificate (HTML)", "Included", "Included", "Included"],
                ["Visible watermark", "Yes", "Yes", "Yes (brandable)"],
                ["Invisible SHA-256", "Yes", "Yes", "Yes"],
                ["Invisible DigitalMeve key", "Yes", "Yes", "Yes"],
                ["Named issuer", "—", "Name/email", "Company name"],
                ["Enterprise private key", "—", "—", "Included"],
                ["DNS binding", "—", "—", "Included"],
                ["Support", "Community", "Priority", "Priority + Onboarding"],
              ].map(([feat, free, ind, pro]) => (
                <tr key={feat} className="bg-white/[0.02] hover:bg-white/[0.04] transition">
                  <td className="px-4 py-3 text-slate-200">{feat}</td>
                  <td className="px-4 py-3">{free}</td>
                  <td className="px-4 py-3">{ind}</td>
                  <td className="px-4 py-3">{pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
          <Info className="h-4 w-4" aria-hidden /> Prices shown in EUR. Final price varies by country and tax rules.
        </div>
      </section>

      {/* FAQ (pricing-focused) */}
      <section className="mx-auto max-w-6xl px-4 pb-24 border-t border-white/10 pt-12">
        <h2 className="text-xl font-semibold text-center">Pricing FAQ</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {[
            {
              q: "Can I change billing period?",
              a: "Yes. You can switch between monthly and yearly at any time; changes apply to the next cycle.",
            },
            {
              q: "How does country-based pricing work?",
              a: "Stripe applies localized pricing and taxes based on your country and billing address. The final amount is shown at checkout.",
            },
            {
              q: "Do you store my files?",
              a: "No. All processing runs in the browser; we do not collect or store your files.",
            },
            {
              q: "What is included in the certificate?",
              a: "A visible watermark, an invisible SHA-256 fingerprint, and an invisible DigitalMeve key. Individuals can add name/email; businesses have company-named certificates.",
            },
            {
              q: "How do refunds work?",
              a: "We follow global standards and Stripe policies. See our Refund Policy for details and eligibility.",
            },
            {
              q: "Is payment secure?",
              a: "Yes. Payments are handled by Stripe and compliant with PCI DSS and PSD2. Card data never touches our servers.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-base font-semibold">{q}</h3>
              <p className="mt-2 text-sm text-slate-300/90">{a}</p>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="mt-10 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3">
            <Link href={`/checkout?plan=individual&billing=${billing}`} className="btn btn-primary inline-flex items-center gap-2">
              Choose Individuals <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={`/checkout?plan=professional&billing=${billing}`} className="btn btn-outline inline-flex items-center gap-2">
              Choose Professionals
            </Link>
            <Link href="/generate" className="btn btn-outline inline-flex items-center gap-2">
              Start free
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
        }
