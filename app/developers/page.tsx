// app/developers/page.tsx — Developers hub (level 9.5+), aligned with GitHub & product today
"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Lock, Puzzle, Globe, BookOpenText, Code2, CheckCircle2, Cpu } from "lucide-react";

export default function DevelopersPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* HERO */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Build on the{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-sky-400">
              DigitalMeve standard
            </span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-300/90">
            Invisible proof, visible trust — embedded locally. Files keep their original format (PDF, DOCX, JPG, PNG, MP4).
            Certificates are plain <strong>HTML</strong>. Verification runs in the browser.
          </p>
          <div className="mt-8 inline-flex flex-wrap justify-center gap-3">
            <Link href="/docs" className="btn btn-primary inline-flex items-center gap-2">
              Read the Standard <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/security" className="btn btn-outline inline-flex items-center gap-2">
              Security model
            </Link>
            <a
              href="https://github.com/BACOUL/Digitalmeve-standard-"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline inline-flex items-center gap-2"
            >
              GitHub
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <Lock className="h-4 w-4 text-emerald-300" />
              On-device · No storage
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <ShieldCheck className="h-4 w-4 text-sky-300" />
              Certificate included (HTML)
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <Cpu className="h-4 w-4 text-emerald-300" />
              SHA-256 + DigitalMeve key (invisible)
            </span>
          </div>
        </div>
      </section>

      {/* QUICK START */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-semibold text-center">Quick start</h2>
        <ol className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Protect",
              desc:
                "Use /generate. We compute SHA-256 in the browser, embed an invisible DigitalMeve key, and add a visible watermark. A portable HTML certificate is produced.",
            },
            {
              step: "2",
              title: "Share",
              desc:
                "Deliver the original file (PDF/DOCX/…) plus the HTML certificate if you want. No server dependency, no account required for recipients.",
            },
            {
              step: "3",
              title: "Verify",
              desc:
                "Anyone can drag & drop your file at /verify. Validation runs client-side: integrity and issuer details are shown in seconds.",
            },
          ].map(({ step, title, desc }) => (
            <li key={step} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-sm font-semibold">
                {step}
              </div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-slate-300/90">{desc}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 text-center text-sm">
          <Link href="/verify" className="underline decoration-dotted underline-offset-4 hover:opacity-90">
            Open the verifier
          </Link>{" "}
          <span className="text-slate-500">·</span>{" "}
          <Link href="/docs" className="underline decoration-dotted underline-offset-4 hover:opacity-90">
            Read the full Standard
          </Link>
        </div>
      </section>

      {/* INTEGRATION PATTERNS */}
      <section className="mx-auto max-w-6xl px-4 py-16 border-t border-white/10">
        <h2 className="text-2xl font-semibold text-center">Integration patterns</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: <Code2 className="h-7 w-7 text-emerald-300" />,
              title: "Deep-link to the verifier",
              desc:
                "Link to /verify from your portal, emails, or PDFs. Add return URLs via query string if needed (e.g., ?back=/orders/123).",
              pill: "No SDK required",
            },
            {
              icon: <Puzzle className="h-7 w-7 text-sky-300" />,
              title: "“Verified by” badge",
              desc:
                "Place a small badge next to downloadable assets that links to /verify. Keep files in their native format; no conversion.",
              pill: "UX trust signal",
            },
            {
              icon: <Globe className="h-7 w-7 text-emerald-300" />,
              title: "DNS-bound verification (Pro)",
              desc:
                "Publish a public record under your domain so clients can verify against your DNS. Works without central servers.",
              pill: "For businesses",
            },
          ].map(({ icon, title, desc, pill }) => (
            <article key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3">{icon}</div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-slate-300/90">{desc}</p>
              {pill && (
                <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" /> {pill}
                </p>
              )}
            </article>
          ))}
        </div>

        <div className="mt-8 text-center text-sm">
          Learn more in{" "}
          <Link href="/professionals" className="underline decoration-dotted underline-offset-4 hover:opacity-90">
            Professionals
          </Link>{" "}
          and{" "}
          <Link href="/security" className="underline decoration-dotted underline-offset-4 hover:opacity-90">
            Security
          </Link>
          .
        </div>
      </section>

      {/* WHAT’S INSIDE EACH FILE */}
      <section className="mx-auto max-w-6xl px-4 py-16 border-t border-white/10">
        <h2 className="text-2xl font-semibold text-center">What’s embedded in each file</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "Visible watermark",
              desc: "Human-readable trust mark on the page or within the asset. Brandable for businesses.",
            },
            {
              title: "Invisible SHA-256",
              desc: "Integrity fingerprint computed locally and embedded without altering how the file is rendered.",
            },
            {
              title: "Invisible DigitalMeve key",
              desc: "Private, verifiable marker enabling independent checks. No external storage required.",
            },
          ].map(({ title, desc }) => (
            <article key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
              <h3 className="text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-slate-300/90">{desc}</p>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-sm">
          Certificates are exported as <strong>HTML</strong> for portability. See{" "}
          <Link href="/docs" className="underline decoration-dotted underline-offset-4 hover:opacity-90">
            the Standard
          </Link>{" "}
          and{" "}
          <Link href="/security" className="underline decoration-dotted underline-offset-4 hover:opacity-90">
            Security model
          </Link>
          .
        </p>
      </section>

      {/* FOR BUSINESSES (KEY + DNS) */}
      <section className="mx-auto max-w-6xl px-4 py-16 border-t border-white/10">
        <h2 className="text-2xl font-semibold text-center">For businesses</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold">Enterprise private key</h3>
            <p className="mt-2 text-sm text-slate-300/90">
              Your organization receives a private key to issue certificates that name your company as the issuer.
              Keys are generated and stored client-side. Rotation/revocation supported.
            </p>
            <p className="mt-3 text-sm">
              Get started:{" "}
              <Link href="/professionals" className="underline decoration-dotted underline-offset-4 hover:opacity-90">
                Professional plan
              </Link>{" "}
              (€29.90/month · €299/year)
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold">DNS binding</h3>
            <p className="mt-2 text-sm text-slate-300/90">
              Publish a public record under your domain (e.g., <code>_meve.company.com</code>) so anyone can verify
              against your DNS — independently of our servers.
            </p>
            <p className="mt-3 text-sm">
              Details in{" "}
              <Link href="/docs" className="underline decoration-dotted underline-offset-4 hover:opacity-90">
                the Standard
              </Link>
              .
            </p>
          </article>
        </div>
      </section>

      {/* ROADMAP FOR DEVS */}
      <section className="mx-auto max-w-6xl px-4 py-16 border-t border-white/10">
        <h2 className="text-2xl font-semibold text-center">Roadmap for developers</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "v1 — Today",
              points: [
                "Protect & Verify apps (web)",
                "HTML certificate export",
                "On-device processing (no storage)",
              ],
            },
            {
              title: "v2 — Coming",
              points: ["Enterprise dashboard", "API endpoints", "Audit logs & webhooks"],
            },
            {
              title: "v3 — R&D",
              points: [".meve native container (optional)", "Post-quantum crypto", "Anchors (optional)"],
            },
          ].map(({ title, points }) => (
            <article key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-base font-semibold">{title}</h3>
              <ul className="mt-3 space-y-1 text-sm">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" /> {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-sm">
          Full details in the{" "}
          <Link href="/roadmap" className="underline decoration-dotted underline-offset-4 hover:opacity-90">
            public Roadmap
          </Link>
          .
        </p>
      </section>

      {/* RESOURCES */}
      <section className="mx-auto max-w-6xl px-4 py-16 border-t border-white/10">
        <h2 className="text-2xl font-semibold text-center">Resources</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-4">
          {[
            { title: "Standard", desc: "Official spec for certificates & verification.", href: "/docs", icon: <BookOpenText className="h-6 w-6 text-emerald-300" /> },
            { title: "Security", desc: "Threat model, crypto choices, compliance.", href: "/security", icon: <ShieldCheck className="h-6 w-6 text-sky-300" /> },
            { title: "Professionals", desc: "DNS binding and enterprise keys.", href: "/professionals", icon: <Globe className="h-6 w-6 text-emerald-300" /> },
            { title: "GitHub", desc: "Open docs, issues, governance.", href: "https://github.com/BACOUL/Digitalmeve-standard-", external: true, icon: <Code2 className="h-6 w-6 text-sky-300" /> },
          ].map(({ title, desc, href, icon, external }) =>
            external ? (
              <a
                key={title}
                href={href as string}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
              >
                <div>{icon}</div>
                <h3 className="mt-3 text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-slate-300/90">{desc}</p>
              </a>
            ) : (
              <Link
                key={title}
                href={href as string}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
              >
                <div>{icon}</div>
                <h3 className="mt-3 text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-slate-300/90">{desc}</p>
              </Link>
            )
          )}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-8">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-sky-500/10 p-6 text-center">
          <h3 className="text-xl font-semibold">Integrate trust in minutes</h3>
          <p className="mt-1 text-sm text-slate-300/90">
            Link to the verifier, show a “Verified by DigitalMeve” badge, or bind verification to your DNS domain.
          </p>
          <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-3">
            <Link href="/verify" className="btn btn-primary inline-flex items-center gap-2">
              Open the verifier <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/professionals" className="btn btn-outline inline-flex items-center gap-2">
              For businesses
            </Link>
            <Link href="/docs" className="btn btn-outline inline-flex items-center gap-2">
              Read the Standard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
      }
