"use client";

import Link from "next/link";
import {
  ShieldCheck,
  BadgeCheck,
  Lock,
  Github,
  Twitter,
  Linkedin,
  Globe,
  Shield,
  Activity,
  Server,
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="text-gray-700 dark:text-slate-300">
      {/* ===== TOP CTA — BANDEAU BLANC ===== */}
      <div className="border-t border-gray-200 bg-white text-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-base font-semibold">Invisible proof. Visible trust.</p>
              <p className="text-sm text-gray-600">
                Add a unique proof to your files. No signup. No storage. Easy to check.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/generate"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-medium text-white shadow hover:brightness-105 hover:scale-[1.02] transition focus-ring"
              >
                Get started free
              </Link>
              <Link
                href="/verify"
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 hover:scale-[1.02] transition focus-ring"
              >
                Verify a document
              </Link>
            </div>
          </div>

          {/* Trust chips (fond blanc) */}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-600">
            <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-1">
              <Lock className="h-4 w-4 text-emerald-600" />
              No storage
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-1">
              <ShieldCheck className="h-4 w-4 text-sky-600" />
              Portable & readable
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-1">
              <BadgeCheck className="h-4 w-4 text-emerald-600" />
              Free for individuals
            </span>
          </div>
        </div>
      </div>

      {/* ===== STRIP DATA & TRUST — SOMBRE (crédibilité) ===== */}
      <div className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 text-xs text-slate-400">
            <li className="inline-flex items-center gap-2">
              <Server className="h-4 w-4 text-emerald-400" />
              No file uploads — processed locally
            </li>
            <li className="inline-flex items-center gap-2">
              <Shield className="h-4 w-4 text-sky-400" />
              GDPR-friendly, privacy by design
            </li>
            <li className="inline-flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-emerald-400" />
              Human-readable certificate provided
            </li>
            <li className="inline-flex items-center gap-2">
              <Activity className="h-4 w-4 text-sky-400" />
              <Link href="/status" className="hover:text-slate-200 focus-ring rounded">
                Status: all systems normal
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* ===== LIENS — SECTION SOMBRE ===== */}
      <div className="border-t border-slate-800 bg-slate-950 text-slate-300">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {/* Brand */}
            <div className="space-y-3 lg:col-span-2">
              <div className="text-lg font-semibold tracking-tight text-slate-100">
                <span className="text-emerald-400">Digital</span>
                <span className="text-sky-400">Meve</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                DigitalMeve adds a unique proof to your documents. Files remain clean,
                readable, and simple to check — no account, no storage.
              </p>

              {/* Socials (external links) */}
              <div className="mt-4 flex items-center gap-3">
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10 focus-ring"
                >
                  <Twitter className="h-4 w-4 text-slate-100" />
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10 focus-ring"
                >
                  <Linkedin className="h-4 w-4 text-slate-100" />
                </a>
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10 focus-ring"
                >
                  <Github className="h-4 w-4 text-slate-100" />
                </a>
              </div>
            </div>

            {/* Products */}
            <nav aria-labelledby="footer-products">
              <h3 id="footer-products" className="text-sm font-semibold text-slate-200">
                Products
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link className="hover:text-emerald-300 focus-ring rounded" href="/generate">Generate</Link></li>
                <li><Link className="hover:text-emerald-300 focus-ring rounded" href="/verify">Verify</Link></li>
                <li><Link className="hover:text-emerald-300 focus-ring rounded" href="/pricing">Pricing</Link></li>
                <li><Link className="hover:text-emerald-300 focus-ring rounded" href="/developers">Developers</Link></li>
              </ul>
            </nav>

            {/* Solutions */}
            <nav aria-labelledby="footer-solutions">
              <h3 id="footer-solutions" className="text-sm font-semibold text-slate-200">
                Solutions
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link className="hover:text-sky-300 focus-ring rounded" href="/personal">For Individuals</Link></li>
                <li><Link className="hover:text-sky-300 focus-ring rounded" href="/pro">For Business</Link></li>
                <li><Link className="hover:text-sky-300 focus-ring rounded" href="/security">Security</Link></li>
              </ul>
            </nav>

            {/* Company / Legal */}
            <nav aria-labelledby="footer-company">
              <h3 id="footer-company" className="text-sm font-semibold text-slate-200">
                Company
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link className="hover:text-white focus-ring rounded" href="/about">About</Link></li>
                <li><Link className="hover:text-white focus-ring rounded" href="/contact">Contact</Link></li>
                <li><Link className="hover:text-white focus-ring rounded" href="/changelog">Changelog</Link></li>
                <li><Link className="hover:text-white focus-ring rounded" href="/status">Status</Link></li>
              </ul>

              <h3 className="mt-6 text-sm font-semibold text-slate-200">Legal</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link className="hover:text-white focus-ring rounded" href="/privacy">Privacy</Link></li>
                <li><Link className="hover:text-white focus-ring rounded" href="/terms">Terms</Link></li>
                <li><Link className="hover:text-white focus-ring rounded" href="/cookies">Cookies</Link></li>
              </ul>
            </nav>
          </div>
        </div>

        {/* ===== BARRE LÉGALE — BANDEAU BLANC ===== */}
        <div className="border-t border-gray-200 bg-white text-gray-600">
          <div className="mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-4 px-4 py-5 text-xs sm:flex-row">
            <p>© {year} DigitalMeve. All rights reserved.</p>

            <div className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-3 py-1">
              <Globe className="h-4 w-4 text-emerald-600" />
              <Link href="/?lang=en" className="hover:text-gray-900 focus-ring rounded">EN</Link>
              <span className="text-gray-300">/</span>
              <Link href="/?lang=fr" className="hover:text-gray-900 focus-ring rounded">FR</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
