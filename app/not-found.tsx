// app/not-found.tsx
import Link from "next/link";
import { ArrowRight, Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main
      role="main"
      aria-labelledby="nf-title"
      className="min-h-[70vh] bg-[var(--bg)] text-[var(--fg)] grid place-items-center px-4"
    >
      <section className="max-w-2xl text-center">
        {/* Eyebrow */}
        <div
          aria-hidden="true"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
        >
          <Compass className="h-4 w-4 text-[var(--accent-1)]" />
          404 — Page not found
        </div>

        {/* Title */}
        <h1
          id="nf-title"
          className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight"
        >
          We couldn’t find that page
        </h1>

        {/* Copy */}
        <p className="mt-3 text-[var(--fg-muted)]">
          The link may be broken or the page may have been moved. Try one of
          the options below, or head back to the homepage.
        </p>

        {/* Primary actions */}
        <nav
          aria-label="404 shortcuts"
          className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/generate"
            className="btn btn-primary-strong btn-glow inline-flex items-center gap-2"
          >
            Protect a file <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/verify"
            className="btn-outline inline-flex items-center gap-2"
          >
            Verify a file <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-white/10"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
        </nav>

        {/* Helpful links */}
        <ul className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 text-sm text-[var(--fg-muted)]">
          <li>
            <Link href="/pricing" className="underline hover:opacity-90">
              Pricing
            </Link>
          </li>
          <li>•</li>
          <li>
            <Link href="/security" className="underline hover:opacity-90">
              Security
            </Link>
          </li>
          <li>•</li>
          <li>
            <Link href="/contact" className="underline hover:opacity-90">
              Contact
            </Link>
          </li>
        </ul>

        {/* Broken link hint */}
        <p className="mt-3 text-xs text-[var(--fg-muted)]">
          Found a broken link? Let us know at{" "}
          <a
            href="mailto:hello@digitalmeve.com?subject=Broken%20link%20on%20DigitalMeve"
            className="underline hover:opacity-90"
          >
            hello@digitalmeve.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
