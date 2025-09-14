// app/page.tsx
import {
  Upload,
  BadgeCheck,
  ShieldCheck,
  FileDown,
  ArrowRight,
  Users,
  Briefcase,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import Hero from "@/components/Hero"; // default export

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {/* HERO — already styled inside components/Hero.tsx */}
      <Hero />

      {/* HOW IT WORKS */}
      <section className="section-dark">
        <div className="container-max py-14">
          <h2 className="h2">How it works</h2>
          <p className="sub mt-2">Three simple steps. No jargon.</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {/* Step 1 */}
            <div className="card p-6 animate-fadeIn">
              <div className="flex items-center gap-2 text-sm text-[var(--fg-muted)]">
                <span>Step 1</span>
                <Upload className="h-5 w-5 text-[var(--accent-1)]" aria-hidden />
              </div>
              <h3 className="h3 mt-2">Upload your document</h3>
              <p className="mt-2 sub">
                Works with common formats; your file stays on your device.
              </p>
              <Link href="/generate" className="link mt-4 inline-flex items-center gap-2 text-sm">
                Try now <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            </div>

            {/* Step 2 */}
            <div className="card p-6 animate-fadeIn" style={{ animationDelay: "60ms" }}>
              <div className="flex items-center gap-2 text-sm text-[var(--fg-muted)]">
                <span>Step 2</span>
                <BadgeCheck className="h-5 w-5 text-[var(--accent-1)]" aria-hidden />
              </div>
              <h3 className="h3 mt-2">Get your protected copy</h3>
              <p className="mt-2 sub">
                We add a lightweight, invisible proof and prepare your certificate.
              </p>
            </div>

            {/* Step 3 */}
            <div className="card p-6 animate-fadeIn" style={{ animationDelay: "120ms" }}>
              <div className="flex items-center gap-2 text-sm text-[var(--fg-muted)]">
                <span>Step 3</span>
                <FileDown className="h-5 w-5 text-[var(--accent-1)]" aria-hidden />
              </div>
              <h3 className="h3 mt-2">Download & share</h3>
              <p className="mt-2 sub">
                Share your file and certificate. Anyone can check it in seconds.
              </p>
              <Link href="/verify" className="link mt-4 inline-flex items-center gap-2 text-sm">
                Verify a document <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY DIGITALMEVE */}
      <section className="section-dark">
        <div className="container-max pb-16">
          <h2 className="h2">Why DigitalMeve</h2>
          <p className="sub mt-2">
            Designed for everyone — from individuals to enterprises. Simple to use, built for trust.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* 1 */}
            <div className="card p-6">
              <div className="flex items-center gap-2 text-sm text-[var(--accent-1)]">
                <ShieldCheck className="h-5 w-5" aria-hidden />
                <span className="font-medium">Built-in proof</span>
              </div>
              <p className="mt-2 text-sm text-[var(--fg-muted)]">
                A durable proof lives with the file. No viewer or plugin required.
              </p>
            </div>

            {/* 2 */}
            <div className="card p-6">
              <div className="flex items-center gap-2 text-sm text-[var(--accent-1)]">
                <BadgeCheck className="h-5 w-5" aria-hidden />
                <span className="font-medium">Readable everywhere</span>
              </div>
              <p className="mt-2 text-sm text-[var(--fg-muted)]">
                Your files remain clean and portable — open them as usual.
              </p>
            </div>

            {/* 3 */}
            <div className="card p-6">
              <div className="flex items-center gap-2 text-sm text-[var(--accent-1)]">
                <Users className="h-5 w-5" aria-hidden />
                <span className="font-medium">Free for individuals</span>
              </div>
              <p className="mt-2 text-sm text-[var(--fg-muted)]">
                Protect personal files at no cost. Pro plans scale your workflows.
              </p>
            </div>

            {/* 4 */}
            <div className="card p-6">
              <div className="flex items-center gap-2 text-sm text-[var(--accent-1)]">
                <FileDown className="h-5 w-5" aria-hidden />
                <span className="font-medium">No account. No storage.</span>
              </div>
              <p className="mt-2 text-sm text-[var(--fg-muted)]">
                We never keep your files. Generate and check in seconds.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/generate"
              className="btn btn-primary-strong btn-glow"
            >
              Protect a file now
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
            <Link
              href="/verify"
              className="btn-outline"
            >
              Verify a file
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* INDIVIDUALS vs PROFESSIONALS */}
      <section className="section-dark">
        <div className="container-max pb-20">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Individuals */}
            <div className="card p-6">
              <span className="chip chip-ok">
                <Users className="h-4 w-4" aria-hidden />
                For Individuals — Free
              </span>
              <h3 className="h3 mt-3">Protect your files in seconds</h3>
              <ul className="list-check mt-3 space-y-2 text-[var(--fg-muted)]">
                <li>Unlimited personal use</li>
                <li>Files remain readable and portable</li>
                <li>Optional human-readable certificate</li>
                <li>No account. No storage.</li>
              </ul>
              <div className="mt-5 flex gap-3">
                <Link href="/pricing#individuals" className="btn-outline">
                  Explore personal <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
                <Link href="/generate" className="btn btn-primary-strong">
                  Start free <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </div>
            </div>

            {/* Professionals */}
            <div className="card p-6">
              <span className="chip chip-info">
                <Briefcase className="h-4 w-4" aria-hidden />
                For Businesses — API &amp; Dashboard
              </span>
              <h3 className="h3 mt-3">Integrate .MEVE into your workflow</h3>
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
                <Link href="/contact" className="btn bg-sky-500 text-white border-0 hover:brightness-110">
                  Contact sales <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </div>
              <p className="mt-3 text-xs text-[var(--fg-muted)]">
                Note: “Official” tier is not part of the current offering.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
      }
