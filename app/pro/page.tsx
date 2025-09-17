import Link from "next/link";
import {
  Briefcase,
  ShieldCheck,
  Zap,
  Layers,
  ArrowRight,
  CheckCircle2,
  Lock,
  ServerCog,
  GlobeLock,
  FileCode2,
  LineChart,
} from "lucide-react";

export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {/* Hero */}
      <section className="border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs ring-1 ring-white/10">
            <Briefcase className="h-3.5 w-3.5" />
            For Business
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Scale trust —{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
              at enterprise speed
            </span>
          </h1>
          <p className="mt-4 mx-auto max-w-3xl text-lg text-[var(--fg-muted)]">
            Integrate invisible <strong>.MEVE</strong> proof at scale with APIs, dashboards,
            and compliance controls. Secure, fast, and built for teams of any size.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn btn-primary inline-flex items-center gap-2">
              Contact sales <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/developers" className="btn btn-ghost inline-flex items-center gap-2">
              Explore docs
            </Link>
          </div>

          {/* At-a-glance strip (nouveau) */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3 text-xs text-[var(--fg-muted)]">
            <div className="rounded-xl ring-1 ring-white/10 bg-white/5 px-3 py-2">
              <span className="font-medium text-white">99.9%+ SLA</span> — verification endpoints
            </div>
            <div className="rounded-xl ring-1 ring-white/10 bg-white/5 px-3 py-2">
              <span className="font-medium text-white">&lt; 50 ms</span> typical per-doc processing
            </div>
            <div className="rounded-xl ring-1 ring-white/10 bg-white/5 px-3 py-2">
              <span className="font-medium text-white">Hash-only</span> option (no content)
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="badge">
              <ShieldCheck className="h-4 w-4 text-[var(--accent-2)]" />
              Compliance ready
            </span>
            <span className="badge">
              <Lock className="h-4 w-4 text-[var(--accent-1)]" />
              Hash-only option
            </span>
            <span className="badge">
              <ServerCog className="h-4 w-4 text-[var(--accent-2)]" />
              Webhooks & audit logs
            </span>
            <span className="badge">
              <GlobeLock className="h-4 w-4 text-[var(--accent-1)]" />
              Region pinning / SSO
            </span>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-semibold text-center">Built for teams, developers, and enterprises</h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Feature
            icon={<Briefcase className="h-6 w-6 text-[var(--accent-2)]" />}
            title="Team dashboard"
            desc="Monitor usage, manage roles, track verification at scale."
          />
          <Feature
            icon={<Layers className="h-6 w-6 text-[var(--accent-1)]" />}
            title="APIs & SDKs"
            desc="Clean REST/SDKs, bulk tools, and webhooks to fit your pipeline."
          />
          <Feature
            icon={<Zap className="h-6 w-6 text-amber-400" />}
            title="Fast & concurrent"
            desc="High throughput with safe concurrency for large batches."
          />
          <Feature
            icon={<ShieldCheck className="h-6 w-6 text-[var(--accent-2)]" />}
            title="Security & SSO"
            desc="SAML/SSO, SCIM, audit logs, and scoped keys for least privilege."
          />
          <Feature
            icon={<GlobeLock className="h-6 w-6 text-[var(--accent-1)]" />}
            title="Region pinning"
            desc="Choose cloud regions or on-prem options for sensitive workloads."
          />
          <Feature
            icon={<FileCode2 className="h-6 w-6 text-[var(--accent-2)]" />}
            title="Developer-first"
            desc="Copy-paste starters, examples, and a 5-minute quickstart."
          />
        </div>

        {/* Stats */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <Stat label="< 50 ms" hint="Typical per-doc processing budget in browser or edge." />
          <Stat label="99.9%+" hint="Targeted uptime for verification endpoints." />
          <Stat label="Zero content" hint="Hash-only option keeps your data private." />
        </div>
      </section>

      {/* Build fast */}
      <section className="mx-auto max-w-6xl px-4 py-16 border-t border-[var(--border)]">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h3 className="text-xl font-semibold">Integrate in minutes</h3>
            <p className="mt-2 text-[var(--fg-muted)]">
              Ship a pilot quickly with our SDKs and examples. Add proof, verify anywhere,
              and keep documents readable and portable.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-[var(--accent-1)]" />
                Bulk verification & webhooks
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-[var(--accent-1)]" />
                Sandbox & staging keys
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-[var(--accent-1)]" />
                Hash-only mode (no file upload)
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/developers" className="btn btn-ghost inline-flex items-center gap-2">
                Explore docs
              </Link>
              <Link href="/contact" className="btn inline-flex items-center gap-2">
                Talk to an engineer <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="card p-5">
              <div className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-[var(--accent-2)]" />
                <h4 className="font-semibold">Observability</h4>
              </div>
              <p className="mt-2 text-sm text-[var(--fg-muted)]">
                Track generation/verification, latency percentiles, and error budgets with
                privacy-first analytics. No document content ever leaves your control.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl ring-1 ring-[var(--border)] p-3">
                  <p className="text-xs text-[var(--fg-muted)]">p95 latency</p>
                  <p className="mt-1 text-lg font-semibold">42 ms</p>
                </div>
                <div className="rounded-xl ring-1 ring-[var(--border)] p-3">
                  <p className="text-xs text-[var(--fg-muted)]">tamper rate</p>
                  <p className="mt-1 text-lg font-semibold">0.02%</p>
                </div>
                <div className="rounded-xl ring-1 ring-[var(--border)] p-3">
                  <p className="text-xs text-[var(--fg-muted)]">SLA</p>
                  <p className="mt-1 text-lg font-semibold">99.9%+</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-[var(--fg-muted)]">
                Example metrics. Actual performance depends on file size, network, and region.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Compliance */}
      <section className="mx-auto max-w-6xl px-4 py-16 border-t border-[var(--border)]">
        <h3 className="text-xl font-semibold text-center">Security, privacy, and compliance</h3>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Trust title="SAML/SSO & SCIM" desc="Centralized identity, least-privilege access, and off-boarding at scale." />
          <Trust title="Region pinning" desc="Choose EU/US regions or on-prem deployment options." />
          <Trust title="Audit & webhooks" desc="Immutable audit logs and reliable, signed webhooks." />
          <Trust title="DPA & SLAs" desc="Data Processing Addendum and enterprise-grade SLAs." />
          <Trust title="Key management" desc="Scoped API keys, rotation guidance, and IP allow-lists." />
          <Trust title="No content by default" desc="Hash-only mode keeps your data private by design." />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="business-pricing" className="mx-auto max-w-6xl px-4 py-16 border-t border-[var(--border)]">
        <h2 className="text-2xl font-semibold text-center">Business plans</h2>
        <p className="mt-2 text-center text-[var(--fg-muted)]">
          Choose a plan that fits your organization. Scale as you grow.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <PricingCard
            name="Starter"
            price="$19/mo"
            hint="billed yearly"
            desc="For small teams getting started."
            features={[
              "Dashboard & roles",
              "API & SDK access",
              "Basic rate limits",
              "Email support",
            ]}
            cta="Start now"
            href="/register?plan=starter-business"
          />
          <PricingCard
            name="Growth"
            price="$79/mo"
            hint="billed yearly"
            desc="For growing businesses."
            features={[
              "Higher limits & concurrency",
              "Bulk verification tools",
              "Webhooks & audit logs",
              "Priority support",
            ]}
            cta="Upgrade"
            href="/register?plan=growth-business"
            highlight
          />
          <PricingCard
            name="Enterprise"
            price="Custom"
            desc="For large organizations."
            features={[
              "Custom SLAs & DPA",
              "SAML/SSO & SCIM",
              "On-prem / region pinning",
              "Dedicated support",
            ]}
            cta="Contact sales"
            href="/contact"
          />
        </div>
        <p className="mt-3 text-center text-xs text-[var(--fg-muted)]">
          Prices in USD. Taxes/VAT may apply. Volume pricing available.
        </p>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center border-t border-[var(--border)]">
        <h2 className="text-2xl font-semibold">
          Ready to integrate <span className="text-[var(--accent-1)]">.MEVE</span> into your workflow?
        </h2>
        <p className="mt-2 text-[var(--fg-muted)]">
          From startups to enterprises — scale trust and authenticity in every file.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn btn-primary inline-flex items-center gap-2">
            Contact sales <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="#business-pricing" className="btn btn-ghost inline-flex items-center gap-2">
            View pricing
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ——— UI bits ——— */

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-[var(--fg-muted)]">{desc}</p>
    </div>
  );
}

function Trust({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-[var(--accent-2)]" />
        <h4 className="font-semibold">{title}</h4>
      </div>
      <p className="mt-2 text-sm text-[var(--fg-muted)]">{desc}</p>
    </div>
  );
}

function Stat({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="rounded-2xl ring-1 ring-[var(--border)] bg-white/5 p-5 text-center">
      <p className="text-2xl font-bold">{label}</p>
      <p className="mt-1 text-xs text-[var(--fg-muted)]">{hint}</p>
    </div>
  );
}

function PricingCard({
  name,
  price,
  hint,
  desc,
  features,
  cta,
  href,
  highlight,
}: {
  name: string;
  price: string;
  hint?: string;
  desc: string;
  features: string[];
  cta: string;
  href: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex flex-col rounded-2xl border bg-white/5 p-6 shadow-sm ${
        highlight ? "border-[var(--accent-2)] ring-2 ring-[var(--accent-2)]/30" : "border-[var(--border)]"
      }`}
    >
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="mt-1 text-sm text-[var(--fg-muted)]">{desc}</p>
      <div className="mt-4 flex items-end gap-2">
        <p className="text-3xl font-bold">{price}</p>
        {hint && <span className="pb-1 text-xs text-[var(--fg-muted)]">{hint}</span>}
      </div>

      <ul className="mt-6 flex-1 space-y-2 text-sm">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[var(--accent-1)]" /> {f}
          </li>
        ))}
      </ul>

      <Link
        href={href}
        className={`mt-6 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium ${
          highlight
            ? "bg-gradient-to-r from-emerald-500 to-sky-500 text-white hover:brightness-105"
            : "ring-1 ring-[var(--border)] hover:bg-white/5"
        }`}
      >
        {cta}
      </Link>
    </div>
  );
          }
