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
        <div className="container-max px-4 py-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">About DigitalMeve</h1>
          <p className="mt-2 sub">
            We build invisible proof for visible trust — at consumer and enterprise scale.
          </p>
          <p className="mt-1 text-sm text-[var(--fg-muted)]">
            Private by design • Works in your browser • Readable anywhere
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="section-dark">
        <div className="container-max px-4 py-10 grid gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <h2 className="h2">Our mission</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              Make authenticity effortless. DigitalMeve embeds a portable, invisible proof inside
              everyday files so people and organizations can share with confidence — without changing
              how they work.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="h2">What is .MEVE?</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              <span className="font-semibold">.MEVE</span> is a lightweight proof layer. Your PDF or
              DOCX stays readable in any viewer, while .MEVE carries verifiable evidence — a hash,
              timestamp, and issuer metadata — that anyone can check in seconds.
            </p>
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
              <div>
                <p className="font-medium">Invisible by default</p>
                <p className="mt-1 text-sm text-[var(--fg-muted)]">
                  Proof lives with the file — no overlays, no lock-in.
                </p>
              </div>
              <div>
                <p className="font-medium">Readable anywhere</p>
                <p className="mt-1 text-sm text-[var(--fg-muted)]">
                  Open your files in native apps as usual.
                </p>
              </div>
              <div>
                <p className="font-medium">Portable & open</p>
                <p className="mt-1 text-sm text-[var(--fg-muted)]">
                  Transparent verification, portable evidence.
                </p>
              </div>
              <div>
                <p className="font-medium">Private by design</p>
                <p className="mt-1 text-sm text-[var(--fg-muted)]">
                  Local processing for individuals; strict data-minimization for Pro.
                </p>
              </div>
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
          </div>

          <div className="card p-6">
            <h2 className="h2">Press & partnerships</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              We collaborate with ecosystem partners to advance trusted media and document integrity.
              For press inquiries, collaborations, and speaking opportunities:
            </p>
            <div className="mt-4 flex gap-3">
              <Link href="/contact" className="btn-outline">Get in touch</Link>
              <a href="mailto:press@digitalmeve.com" className="btn">press@digitalmeve.com</a>
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
            <div className="mt-4 flex gap-3">
              <Link href="/careers" className="btn-outline">View roles</Link>
              <a href="mailto:talent@digitalmeve.com" className="btn">talent@digitalmeve.com</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
      }
