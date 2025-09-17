// components/Footer.tsx
"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--bg)] text-[var(--fg)] border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Grille centrale (dark) */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Branding */}
          <div>
            <Link
              href="/"
              className="text-xl font-extrabold tracking-tight"
              aria-label="DigitalMeve – Home"
            >
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                Digital
              </span>
              <span className="bg-gradient-to-r from-sky-400 to-sky-300 bg-clip-text text-transparent">
                Meve
              </span>
            </Link>
            <p className="mt-3 text-sm text-slate-400">
              Proof your documents in seconds. Invisible, portable, secure.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              No storage • In-browser • Verifiable anywhere
            </p>
          </div>

          {/* Explore (évite la redite avec le header) */}
          <div>
            <h4 className="text-sm font-semibold text-white">Explore</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/generate" className="hover:text-white">
                  Protect a file
                </Link>
              </li>
              <li>
                <Link href="/verify" className="hover:text-white">
                  Verify a document
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-white">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/use-cases" className="hover:text-white">
                  Use cases
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white">Resources</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/developers" className="hover:text-white">
                  Developers
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-white">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/status" className="hover:text-white">
                  Status
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="hover:text-white">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company + Legal (sans doublon) */}
          <div>
            <h4 className="text-sm font-semibold text-white">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>

            <h4 className="mt-6 text-sm font-semibold text-white">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white">
                  Cookies
                </Link>
              </li>
            </ul>

            {/* Support direct */}
            <p className="mt-4 text-xs text-slate-500">
              Support:{" "}
              <a
                href="mailto:support@digitalmeve.com"
                className="underline hover:text-white"
              >
                support@digitalmeve.com
              </a>
            </p>
          </div>
        </div>

        {/* Badge blanc premium en bas */}
        <div className="mt-12 flex justify-center">
          <div className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-slate-900 shadow-sm">
            © {new Date().getFullYear()} DigitalMeve
          </div>
        </div>
      </div>
    </footer>
  );
}
