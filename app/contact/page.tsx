// app/contact/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — DigitalMeve",
  description: "Reach out for Pro, partnership and official inquiries.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {/* HEADER */}
      <section className="border-b border-[var(--border)]">
        <div className="container-max px-4 py-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Contact DigitalMeve
          </h1>
          <p className="mt-2 sub">
            We’d love to hear from you — whether you’re an individual, a partner, or a global enterprise.
          </p>
        </div>
      </section>

      {/* CONTACT OPTIONS */}
      <section className="section-dark">
        <div className="container-max px-4 py-12 grid gap-6 lg:grid-cols-3">
          {/* Sales */}
          <div className="card p-6">
            <h2 className="h2">Sales & Pro</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              For enterprise inquiries, demos, and pricing.
            </p>
            <a
              href="mailto:sales@digitalmeve.com"
              className="btn mt-4"
              aria-label="Contact DigitalMeve sales team"
            >
              sales@digitalmeve.com
            </a>
          </div>

          {/* Partnerships */}
          <div className="card p-6">
            <h2 className="h2">Partnerships</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              Collaborate with us on ecosystem, academic, or open-source projects.
            </p>
            <a
              href="mailto:partners@digitalmeve.com"
              className="btn-outline mt-4"
              aria-label="Contact DigitalMeve partnership team"
            >
              partners@digitalmeve.com
            </a>
          </div>

          {/* Press */}
          <div className="card p-6">
            <h2 className="h2">Press & Media</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              For interviews, articles, and official statements.
            </p>
            <a
              href="mailto:press@digitalmeve.com"
              className="btn-outline mt-4"
              aria-label="Contact DigitalMeve press team"
            >
              press@digitalmeve.com
            </a>
          </div>
        </div>
      </section>

      {/* GENERAL */}
      <section className="section-dark">
        <div className="container-max px-4 pb-16">
          <div className="card p-6">
            <h2 className="h2">General inquiries</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              Not sure where to start? Write to us at{" "}
              <a
                href="mailto:hello@digitalmeve.com"
                className="link"
                aria-label="Contact DigitalMeve general support"
              >
                hello@digitalmeve.com
              </a>{" "}
              and we’ll direct your message to the right team.
            </p>
            <p className="mt-3 text-sm text-[var(--fg-muted)]">
              We usually reply within 1–2 business days.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
              }
