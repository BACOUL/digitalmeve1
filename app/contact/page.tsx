// app/contact/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

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
          <p className="mt-1 text-xs text-[var(--fg-muted)]">
            Typical response time: 1–2 business days.
          </p>
        </div>
      </section>

      {/* CONTACT OPTIONS */}
      <section className="section-dark">
        <div className="container-max px-4 py-12 grid gap-6 lg:grid-cols-3">
          {/* Sales */}
          <div className="card p-6">
            <h2 className="h2">Sales &amp; Pro</h2>
            <p className="mt-2 text-[var(--fg-muted)]">For enterprise inquiries, demos, and pricing.</p>
            <a
              href="mailto:sales@digitalmeve.com?subject=DigitalMeve%20Pro%20Inquiry"
              className="btn mt-4"
              aria-label="Contact DigitalMeve sales team"
            >
              sales@digitalmeve.com
            </a>
          </div>

          {/* Partnerships */}
          <div className="card p-6">
            <h2 className="h2">Partnerships</h2>
            <p className="mt-2 text-[var(--fg-muted)]">Collaborate with us on ecosystem, academic, or open-source projects.</p>
            <a
              href="mailto:partners@digitalmeve.com?subject=DigitalMeve%20Partnership"
              className="btn-outline mt-4"
              aria-label="Contact DigitalMeve partnership team"
            >
              partners@digitalmeve.com
            </a>
          </div>

          {/* Press */}
          <div className="card p-6">
            <h2 className="h2">Press &amp; Media</h2>
            <p className="mt-2 text-[var(--fg-muted)]">For interviews, articles, and official statements.</p>
            <a
              href="mailto:press@digitalmeve.com?subject=Press%20Request%20for%20DigitalMeve"
              className="btn-outline mt-4"
              aria-label="Contact DigitalMeve press team"
            >
              press@digitalmeve.com
            </a>
          </div>
        </div>
      </section>

      {/* GENERAL + LIGHT FORM (optional) */}
      <section className="section-dark">
        <div className="container-max px-4 pb-16 grid gap-6 lg:grid-cols-2">
          {/* General info */}
          <div className="card p-6">
            <h2 className="h2">General inquiries</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              Not sure where to start? Write to us at{" "}
              <a
                href="mailto:hello@digitalmeve.com?subject=Hello%20DigitalMeve"
                className="link"
                aria-label="Contact DigitalMeve general support"
              >
                hello@digitalmeve.com
              </a>{" "}
              and we’ll direct your message to the right team.
            </p>
            <ul className="mt-4 text-sm text-[var(--fg-muted)] space-y-1">
              <li>Security reports: <a className="underline" href="mailto:security@digitalmeve.com">security@digitalmeve.com</a></li>
              <li>Privacy/data: <a className="underline" href="mailto:privacy@digitalmeve.com">privacy@digitalmeve.com</a></li>
              <li>Legal: <a className="underline" href="mailto:legal@digitalmeve.com">legal@digitalmeve.com</a></li>
            </ul>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/privacy" className="btn-outline">Privacy Policy</Link>
              <Link href="/terms" className="btn-outline">Terms of Service</Link>
              <Link href="/security" className="btn-outline">Security</Link>
            </div>
          </div>

          {/* Simple form (Formspree placeholder) */}
          <div className="card p-6">
            <h2 className="h2">Send us a message</h2>
            <p className="mt-2 text-[var(--fg-muted)] text-sm">
              Prefer a quick form? Use this — we’ll get back to you shortly.
            </p>

            <form
              action="https://formspree.io/f/your-id" // TODO: replace with your Formspree endpoint or API route
              method="POST"
              className="mt-4 space-y-4"
            >
              {/* Honeypot anti-bot */}
              <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

              <div>
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="mt-1 w-full rounded-xl border px-4 py-3 bg-transparent"
                  aria-required="true"
                />
              </div>

              <div>
                <label htmlFor="topic" className="block text-sm font-medium">Topic</label>
                <select
                  id="topic"
                  name="topic"
                  className="mt-1 w-full rounded-xl border px-4 py-3 bg-transparent"
                  defaultValue="general"
                >
                  <option value="general">General</option>
                  <option value="sales">Sales / Pro</option>
                  <option value="partnerships">Partnerships</option>
                  <option value="press">Press</option>
                  <option value="security">Security</option>
                  <option value="privacy">Privacy</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="How can we help?"
                  className="mt-1 w-full rounded-xl border px-4 py-3 bg-transparent h-36"
                  aria-required="true"
                />
              </div>

              <button type="submit" className="rounded-2xl px-5 py-3 bg-black text-white">
                Send message
              </button>

              <p className="text-xs text-[var(--fg-muted)]">
                By contacting us, you agree to our{" "}
                <Link href="/privacy" className="underline">Privacy Policy</Link>.
                We keep things simple: no ad trackers, no file storage.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
              }
