// app/pro/page.tsx
import Link from "next/link";
import {
  Briefcase,
  ShieldCheck,
  Zap,
  Layers,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-gray-900">
            For Business —{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500">
              scale with trust
            </span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            Integrate <strong>.MEVE proof</strong> at scale with APIs, dashboards, and compliance tools.  
            Secure, fast, and built for teams of any size.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-700"
            >
              Contact sales <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/developers"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50"
            >
              Explore docs
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-semibold text-center text-gray-900">
          Built for teams, developers, and enterprises
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Feature
            icon={<Briefcase className="h-6 w-6 text-sky-600" />}
            title="Team dashboard"
            desc="Monitor usage, manage members, and keep control of your proofs."
          />
          <Feature
            icon={<Layers className="h-6 w-6 text-emerald-600" />}
            title="API & SDKs"
            desc="Clean integration into your workflows with REST, SDKs, and webhooks."
          />
          <Feature
            icon={<Zap className="h-6 w-6 text-amber-500" />}
            title="Fast & scalable"
            desc="Process hundreds of documents per second, with guaranteed uptime."
          />
          <Feature
            icon={<ShieldCheck className="h-6 w-6 text-sky-600" />}
            title="Compliance ready"
            desc="SAML/SSO, audit logs, and region pinning for security-sensitive teams."
          />
          <Feature
            icon={<CheckCircle2 className="h-6 w-6 text-emerald-600" />}
            title="Support & SLAs"
            desc="Priority support, roadmap alignment, and enterprise-grade SLAs."
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-semibold text-center text-gray-900">
          Business Plans
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Choose the plan that fits your organization. Scale as you grow.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <PricingCard
            name="Starter"
            price="$49/mo"
            desc="For small teams getting started."
            features={[
              "Up to 5,000 proofs/month",
              "Basic dashboard & API",
              "Email support",
            ]}
            cta="Start now"
            href="/pricing"
          />
          <PricingCard
            name="Growth"
            price="$199/mo"
            desc="For growing businesses."
            features={[
              "Up to 50,000 proofs/month",
              "Advanced dashboard & API",
              "Priority support",
              "Audit logs",
            ]}
            cta="Upgrade"
            href="/pricing"
            highlight
          />
          <PricingCard
            name="Enterprise"
            price="Custom"
            desc="For large organizations."
            features={[
              "Unlimited proofs",
              "Dedicated account manager",
              "SAML/SSO & compliance tools",
              "Enterprise SLA",
            ]}
            cta="Contact sales"
            href="/contact"
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center border-t border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-900">
          Ready to integrate .MEVE into your workflow?
        </h2>
        <p className="mt-2 text-gray-600">
          From startups to enterprises — scale trust and authenticity in every file.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-700"
          >
            Contact sales <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50"
          >
            View pricing
          </Link>
        </div>
      </section>
    </main>
  );
}

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
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
    </div>
  );
}

function PricingCard({
  name,
  price,
  desc,
  features,
  cta,
  href,
  highlight,
}: {
  name: string;
  price: string;
  desc: string;
  features: string[];
  cta: string;
  href: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex flex-col rounded-2xl border bg-white p-6 shadow-sm ${
        highlight ? "border-sky-500 ring-2 ring-sky-200" : "border-gray-200"
      }`}
    >
      <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
      <p className="mt-1 text-sm text-gray-600">{desc}</p>
      <p className="mt-4 text-3xl font-bold text-gray-900">{price}</p>

      <ul className="mt-6 flex-1 space-y-2 text-sm text-gray-600">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> {f}
          </li>
        ))}
      </ul>

      <Link
        href={href}
        className={`mt-6 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium ${
          highlight
            ? "bg-sky-600 text-white hover:bg-sky-700"
            : "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
        }`}
      >
        {cta}
      </Link>
    </div>
  );
}
