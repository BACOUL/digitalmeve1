// app/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About – DigitalMeve",
  description:
    "Who we are, what .MEVE is, and how we build verifiable trust into everyday documents.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {/* HEADER */}
      <section className="border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="container-max px-4 py-14">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium ring-1 ring-[var(--border)]">
              About
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              About DigitalMeve
            </h1>
          </div>
          <p className="mt-2 sub">
            We build invisible proof for visible trust — at consumer and enterprise scale.
          </p>
          <p className="mt-1 text-sm text-[var(--fg-muted)]">
            Private by design • Works in your browser • Readable anywhere
          </p>

          {/* Quick badges */}
          <div className="mt-5 flex flex-wrap gap-2 text-xs">
            <Badge>Privacy by design</Badge>
            <Badge>Zero document storage</Badge>
            <Badge>Built-in proof (PDF/DOCX)</Badge>
            <Badge>Offline verification</Badge>
          </div>
        </div>
      </section>

      {/* MISSION + WHAT IS */}
      <section className="section-dark">
        <div className="container-max px-4 py-10 grid gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <h2 className="h2">Our mission</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              Make authenticity effortless. DigitalMeve embeds a portable, invisible proof inside
              everyday files so people and organizations can share with confidence — without changing
              how they work.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <Stat label="Files protected" value="2M+" />
              <Stat label="Avg verify time" value="&lt; 1s" />
              <Stat label="Countries" value="60+" />
              <Stat label="Data stored" value="0 files" />
            </div>
          </div>

          <div className="card p-6">
            <h2 className="h2">What is .MEVE?</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              <span className="font-semibold">.MEVE</span> is a lightweight proof layer. Your PDF or
              DOCX stays readable in any viewer, while .MEVE carries verifiable evidence — a SHA-256
              fingerprint, timestamp, and issuer metadata — that anyone can check in seconds.
            </p>

            <ul className="mt-4 grid gap-2 text-sm text-[var(--fg)]">
              <li className="flex items-start gap-2">
                <Dot /> Invisible, embedded marker — no plugin required
              </li>
              <li className="flex items-start gap-2">
                <Dot /> Human-readable certificate export (.html)
              </li>
              <li className="flex items-start gap-2">
                <Dot /> Local hashing for individuals (no uploads)
              </li>
              <li className="flex items-start gap-2">
                <Dot /> API & SDKs for high-volume workflows
              </li>
            </ul>

            <div className="mt-5 flex gap-3">
              <Link href="/generate" className="btn btn-primary-strong">Protect a file</Link>
              <Link href="/verify" className="btn-outline">Verify a file</Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS / TRUST */}
      <section className="section-dark">
        <div className="container-max px-4 pb-10 grid gap-6 lg:grid-cols-3">
          <div className="card p-6">
            <h3 className="h2">Simple workflow</h3>
            <p className="mt-2 text-[var(--fg-muted)]">
              1) Upload a file · 2) We add an invisible proof and optional human-readable certificate
              · 3) Share and verify anywhere — no plugin required.
            </p>
            <div className="mt-4 flex gap-3">
              <Link href="/generate" className="btn btn-primary-strong">Protect a file</Link>
              <Link href="/verify" className="btn-outline">Verify a file</Link>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="h2">Trust & privacy</h3>
            <ul className="mt-2 space-y-2 text-[var(--fg-muted)] list-disc pl-5">
              <li>No accounts required for individuals</li>
              <li>No server storage of your files</li>
              <li>Portable proofs: readable in native apps</li>
              <li>Open, documented verification</li>
            </ul>
            <p className="mt-3 text-sm text-[var(--fg-muted)]">
              Learn more in our{" "}
              <Link href="/privacy" className="link">Privacy Policy</Link>.
            </p>
          </div>

          <div className="card p-6">
            <h3 className="h2">For enterprises</h3>
            <p className="mt-2 text-[var(--fg-muted)]">
              APIs, SDKs and dashboard for high-volume certification and verification. Domain/email
              attestation for trust badges, webhooks, SLA and support.
            </p>
            <div className="mt-4 flex gap-3">
              <Link href="/pro" className="btn-outline">Learn more</Link>
              <Link href="/contact" className="btn bg-sky-500 text-white border-0 hover:brightness-110">
                Contact sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="section-dark">
        <div className="container-max px-4 pb-10">
          <div className="card p-6">
            <h2 className="h2">Product principles</h2>
            <div className="mt-3 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Principle title="Invisible by default" desc="Proof lives with the file — no overlays, no lock-in." />
              <Principle title="Readable anywhere" desc="Open your files in native apps as usual." />
              <Principle title="Portable & open" desc="Transparent verification, portable evidence." />
              <Principle title="Private by design" desc="Local processing for individuals; strict data-minimization for Pro." />
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL & CREDIBILITY */}
      <section className="section-dark">
        <div className="container-max px-4 pb-10 grid gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <h2 className="h2">Global footprint</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              DigitalMeve serves customers across industries — legal, finance, HR, education,
              creative — with infrastructure designed for reliability and scale.
            </p>
            <p className="mt-2 text-[var(--fg-muted)]">
              From independent creators to Fortune-level teams, our goal is the same: keep files
              clean, portable, and instantly verifiable.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-[var(--fg-muted)]">
              <Badge>EU primary</Badge>
              <Badge>Global edge</Badge>
              <Badge>API-first</Badge>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="h2">Press & partnerships</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              We collaborate with ecosystem partners to advance trusted media and document integrity.
              For press inquiries, collaborations, and speaking opportunities:
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-outline">Get in touch</Link>
              <a href="mailto:press@digitalmeve.com" className="btn">press@digitalmeve.com</a>
            </div>

            {/* Logos placeholder (optional, accessible fallback) */}
            <div className="mt-6 grid grid-cols-3 gap-4 text-[10px] text-[var(--fg-muted)]">
              <div className="rounded-lg border border-[var(--border)] px-3 py-6 text-center">Partner A</div>
              <div className="rounded-lg border border-[var(--border)] px-3 py-6 text-center">Partner B</div>
              <div className="rounded-lg border border-[var(--border)] px-3 py-6 text-center">Partner C</div>
            </div>
          </div>
        </div>
      </section>

      {/* MILESTONES / TIMELINE */}
      <section className="section-dark">
        <div className="container-max px-4 pb-10">
          <div className="card p-6">
            <h2 className="h2">Milestones</h2>
            <ol className="mt-4 space-y-4">
              {[
                { date: "2024 Q4", title: ".MEVE v1", desc: "Invisible proof in PDF; HTML certificate." },
                { date: "2025 Q1", title: "DOCX support", desc: "Proof embedded in Microsoft Word files." },
                { date: "2025 Q2", title: "Pro APIs", desc: "Dashboard, API & SDKs for teams; webhooks & audit." },
                { date: "2025 Q3", title: "Global edge", desc: "EU primary with global edge caching; reliability SLAs." },
              ].map((m) => (
                <li key={m.title} className="grid gap-1 sm:grid-cols-[120px_1fr]">
                  <span className="text-xs font-medium text-[var(--fg-muted)]">{m.date}</span>
                  <div>
                    <p className="text-sm font-semibold">{m.title}</p>
                    <p className="text-sm text-[var(--fg-muted)]">{m.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* RESPONSIBILITY / ACCESSIBILITY */}
      <section className="section-dark">
        <div className="container-max px-4 pb-16">
          <div className="card p-6">
            <h2 className="h2">Responsibility & accessibility</h2>
            <div className="mt-2 grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-[var(--fg-muted)]">
                  We’re committed to accessible, inclusive products. Our UI follows semantic HTML,
                  sensible focus order, keyboard-friendly interactions, and color-contrast best practices.
                </p>
                <p className="mt-2 text-sm text-[var(--fg-muted)]">
                  If you notice an accessibility issue, please let us know at{" "}
                  <a href="mailto:accessibility@digitalmeve.com" className="link">
                    accessibility@digitalmeve.com
                  </a>.
                </p>
              </div>
              <div>
                <p className="text-[var(--fg-muted)]">
                  We minimize data collection and avoid ad trackers. Individuals can use .MEVE entirely
                  in-browser, with no file uploads. See our{" "}
                  <Link href="/privacy" className="link">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/security" className="link">
                    Security
                  </Link>{" "}
                  pages.
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/security" className="btn btn-ghost">Security</Link>
              <Link href="/status" className="btn btn-ghost">Status</Link>
              <Link href="/terms" className="btn btn-ghost">Terms</Link>
              <Link href="/privacy" className="btn btn-ghost">Privacy</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CAREERS */}
      <section className="section-dark">
        <div className="container-max px-4 pb-16">
          <div className="card p-6">
            <h2 className="h2">Join us</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              We’re building the trust layer for everyday documents. If you care about security,
              usability and open ecosystems, we’d love to talk.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/careers" className="btn-outline">View roles</Link>
              <a href="mailto:talent@digitalmeve.com" className="btn">talent@digitalmeve.com</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------------- UI bits ---------------- */

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium ring-1 ring-[var(--border)]">
      {children}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-white/5 p-3">
      <p className="text-xs text-[var(--fg-muted)]">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}

function Dot() {
  return <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[var(--accent-1)]" aria-hidden />;
}

function Principle({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm text-[var(--fg-muted)]">{desc}</p>
    </div>
  );
      }
