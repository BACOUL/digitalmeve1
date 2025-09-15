// app/page.tsx
import Link from "next/link";
import {
  Upload,
  BadgeCheck,
  ShieldCheck,
  FileDown,
  ArrowRight,
  Users,
  Briefcase,
  Globe,
  BookOpen,
  Activity,
  Sparkles,
} from "lucide-react";
import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {/* HERO — composant existant */}
      <Hero />

      {/* TRUST STRIP */}
      <section className="section-dark">
        <div className="container-max py-6">
          <ul className="grid gap-3 sm:grid-cols-3">
            {[
              {
                icon: <ShieldCheck className="h-5 w-5 text-[var(--accent-1)]" aria-hidden />,
                title: "No storage",
                desc: "Votre fichier ne quitte jamais votre appareil.",
              },
              {
                icon: <Globe className="h-5 w-5 text-[var(--accent-2)]" aria-hidden />,
                title: "Portable",
                desc: "Lisible partout, vérifiable en quelques secondes.",
              },
              {
                icon: <BadgeCheck className="h-5 w-5 text-[var(--accent-1)]" aria-hidden />,
                title: "Free forever",
                desc: "Usage personnel gratuit, options Pro disponibles.",
              },
            ].map((b) => (
              <li key={b.title} className="card p-4 flex items-center gap-3">
                {b.icon}
                <div>
                  <p className="text-sm font-semibold">{b.title}</p>
                  <p className="text-xs text-[var(--fg-muted)]">{b.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-dark" aria-labelledby="how-it-works">
        <div className="container-max py-14">
          <h2 id="how-it-works" className="h2">How it works</h2>
          <p className="sub mt-2">Three simple steps. No jargon.</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {/* Step 1 */}
            <article className="card p-6 animate-fadeIn" aria-labelledby="step-1-title">
              <div className="flex items-center gap-2 text-sm text-[var(--fg-muted)]">
                <span>Step 1</span>
                <Upload className="h-5 w-5 text-[var(--accent-1)]" aria-hidden />
              </div>
              <h3 id="step-1-title" className="h3 mt-2">Upload your document</h3>
              <p className="mt-2 sub">
                Works with common formats; your file stays on your device.
              </p>
              <Link href="/generate" className="link mt-4 inline-flex items-center gap-2 text-sm">
                Try now <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            </article>

            {/* Step 2 */}
            <article
              className="card p-6 animate-fadeIn"
              style={{ animationDelay: "60ms" }}
              aria-labelledby="step-2-title"
            >
              <div className="flex items-center gap-2 text-sm text-[var(--fg-muted)]">
                <span>Step 2</span>
                <BadgeCheck className="h-5 w-5 text-[var(--accent-1)]" aria-hidden />
              </div>
              <h3 id="step-2-title" className="h3 mt-2">Get your protected copy</h3>
              <p className="mt-2 sub">
                We add a lightweight, invisible proof and prepare your certificate.
              </p>
            </article>

            {/* Step 3 */}
            <article
              className="card p-6 animate-fadeIn"
              style={{ animationDelay: "120ms" }}
              aria-labelledby="step-3-title"
            >
              <div className="flex items-center gap-2 text-sm text-[var(--fg-muted)]">
                <span>Step 3</span>
                <FileDown className="h-5 w-5 text-[var(--accent-1)]" aria-hidden />
              </div>
              <h3 id="step-3-title" className="h3 mt-2">Download & share</h3>
              <p className="mt-2 sub">
                Share your file and certificate. Anyone can check it in seconds.
              </p>
              <Link href="/verify" className="link mt-4 inline-flex items-center gap-2 text-sm">
                Verify a document <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* CTA BAND (sticky-ish section) */}
      <section className="section-dark">
        <div className="container-max">
          <div className="card p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[var(--accent-1)]" aria-hidden />
              <p className="text-sm">
                Add invisible proof to your file —{" "}
                <span className="font-semibold">in seconds</span>.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/generate" className="btn btn-primary-strong btn-glow">
                Protect a file now <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
              <Link href="/verify" className="btn-outline">
                Verify a file <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY DIGITALMEVE */}
      <section className="section-dark" aria-labelledby="why-dm">
        <div className="container-max pb-16">
          <h2 id="why-dm" className="h2">Why DigitalMeve</h2>
          <p className="sub mt-2">
            Designed for everyone — from individuals to enterprises. Simple to use, built for trust.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <ShieldCheck className="h-5 w-5" aria-hidden />,
                title: "Built-in proof",
                desc: "A durable proof lives with the file. No viewer or plugin required.",
              },
              {
                icon: <BadgeCheck className="h-5 w-5" aria-hidden />,
                title: "Readable everywhere",
                desc: "Your files remain clean and portable — open them as usual.",
              },
              {
                icon: <Users className="h-5 w-5" aria-hidden />,
                title: "Free for individuals",
                desc: "Protect personal files at no cost. Pro plans scale your workflows.",
              },
              {
                icon: <FileDown className="h-5 w-5" aria-hidden />,
                title: "No account. No storage.",
                desc: "We never keep your files. Generate and check in seconds.",
              },
            ].map((f) => (
              <div key={f.title} className="card p-6">
                <div className="flex items-center gap-2 text-sm text-[var(--accent-1)]">
                  {f.icon} <span className="font-medium">{f.title}</span>
                </div>
                <p className="mt-2 text-sm text-[var(--fg-muted)]">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/generate" className="btn btn-primary-strong btn-glow">
              Protect a file now
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
            <Link href="/verify" className="btn-outline">
              Verify a file
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* BUILT FOR */}
      <section className="section-dark" aria-labelledby="built-for">
        <div className="container-max pb-16">
          <h2 id="built-for" className="h2">Built for</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="card p-6">
              <span className="chip chip-ok">Individuals</span>
              <h3 className="h3 mt-3">Protect your files in seconds</h3>
              <ul className="list-check mt-3 space-y-2 text-[var(--fg-muted)]">
                <li>Unlimited personal use</li>
                <li>Files remain readable and portable</li>
                <li>Optional human-readable certificate</li>
                <li>No account. No storage.</li>
              </ul>
              <div className="mt-5 flex gap-3">
                <Link href="/personal" className="btn-outline">
                  Explore personal <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
                <Link href="/generate" className="btn btn-primary-strong">
                  Start free <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </div>
            </div>

            <div className="card p-6">
              <span className="chip chip-info">Teams & Business</span>
              <h3 className="h3 mt-3">Scale authenticity across your org</h3>
              <ul className="list-check mt-3 space-y-2 text-[var(--fg-muted)]">
                <li>API & SDKs for automated certification</li>
                <li>Verification at scale & webhooks</li>
                <li>Email/domain checks for a trust badge</li>
                <li>SLA, support & roadmap alignment</li>
              </ul>
              <div className="mt-5 flex gap-3">
                <Link href="/pro" className="btn-outline">
                  Learn more <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
                <Link
                  href="/contact"
                  className="btn bg-sky-500 text-white border-0 hover:brightness-110"
                >
                  Contact sales <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </div>
            </div>

            <div className="card p-6">
              <span className="chip">Developers</span>
              <h3 className="h3 mt-3">Integrate in minutes</h3>
              <ul className="list-check mt-3 space-y-2 text-[var(--fg-muted)]">
                <li>Clean REST, SDKs & examples</li>
                <li>Signed webhooks, audit logs</li>
                <li>Sandbox, rate limits & status API</li>
                <li>Transparent roadmap</li>
              </ul>
              <div className="mt-5 flex gap-3">
                <Link href="/developers" className="btn-outline">
                  Explore docs <BookOpen className="h-5 w-5" aria-hidden />
                </Link>
                <Link href="/status" className="btn-outline">
                  Status <Activity className="h-5 w-5" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / LOGOS */}
      <section className="section-dark" aria-labelledby="trusted-by">
        <div className="container-max pb-14">
          <h2 id="trusted-by" className="h2">Trusted across industries</h2>
          <p className="sub mt-2">Legal, finance, HR, education, creative.</p>

          {/* Placeholder logos (remplace par tes SVG) */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="card p-4 h-16 flex items-center justify-center text-[var(--fg-muted)]"
              >
                <span className="text-xs">Your&nbsp;Logo</span>
              </div>
            ))}
          </div>

          {/* KPIs rapides */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { k: "50K+", v: "files protected/month" },
              { k: "99.9%", v: "uptime target" },
              { k: "< 1s", v: "verification time" },
            ].map((x) => (
              <div key={x.v} className="card p-4 text-center">
                <p className="text-2xl font-extrabold">{x.k}</p>
                <p className="text-xs text-[var(--fg-muted)]">{x.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MINI-FAQ */}
      <section className="section-dark" aria-labelledby="faq">
        <div className="container-max pb-20">
          <h2 id="faq" className="h2">FAQ</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {[
              {
                q: "Do I need an account?",
                a: "No. Everything runs locally in your browser — no signup, no storage.",
              },
              {
                q: "Can anyone verify a .MEVE file?",
                a: "Yes. Files remain valid PDFs/DOCX. Anyone can verify online or offline.",
              },
              {
                q: "Is this a legal proof?",
                a: "It's a technical integrity signal. See Legal/Terms for disclaimers & guidance per jurisdiction.",
              },
            ].map((f) => (
              <div key={f.q} className="card p-5">
                <p className="font-semibold">{f.q}</p>
                <p className="mt-1 text-sm text-[var(--fg-muted)]">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/security" className="link">Security & Trust</Link>
            <span className="mx-2 text-[var(--fg-muted)]">•</span>
            <Link href="/legal" className="link">Legal</Link>
          </div>
        </div>
      </section>

      {/* FINAL CTAs */}
      <section className="section-dark">
        <div className="container-max pb-20">
          <div className="card p-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="h3">Ready to add trust to every file?</p>
              <p className="sub mt-1">Start free, upgrade anytime.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/generate" className="btn btn-primary-strong btn-glow">
                Protect a file now <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
              <Link href="/pro" className="btn-outline">
                For Business <Briefcase className="h-5 w-5" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
                }
