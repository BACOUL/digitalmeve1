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
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-300">
      {/* Top CTA / Trust bar */}
      <div className="glass border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-base font-semibold text-white">
                Invisible proof. Visible trust.
              </p>
              <p className="text-sm text-slate-400">
                Add a unique proof to your files — no account, no storage. Check in seconds.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/generate"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow-glow hover:brightness-110 transition"
              >
                Get started free
              </Link>
              <Link
                href="/verify"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10 transition"
              >
                Verify a document
              </Link>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1">
              <Lock className="h-4 w-4 text-emerald-400" />
              No storage
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1">
              <ShieldCheck className="h-4 w-4 text-sky-400" />
              Verifiable anywhere
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1">
              <BadgeCheck className="h-4 w-4 text-emerald-400" />
              Free for individuals
            </span>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="space-y-3 lg:col-span-2">
            <div className="text-lg font-semibold tracking-tight text-white">
              <span className="text-emerald-400">Digital</span>
              <span className="text-sky-400">Meve</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              DigitalMeve adds a unique proof to your documents (date, time, fingerprint).
              Files stay readable and simple to check.
            </p>

            {/* Socials */}
            <div className="mt-4 flex items-center gap-3">
              <Link
                href="https://twitter.com/"
                aria-label="Twitter"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10 hover:scale-110"
              >
                <Twitter className="h-4 w-4 text-sky-400" />
              </Link>
              <Link
                href="https://www.linkedin.com/"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10 hover:scale-110"
              >
                <Linkedin className="h-4 w-4 text-sky-400" />
              </Link>
              <Link
                href="https://github.com/"
                aria-label="GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10 hover:scale-110"
              >
                <Github className="h-4 w-4 text-slate-200" />
              </Link>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Products</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link className="text-slate-400 hover:text-emerald-300" href="/generate">Generate</Link></li>
              <li><Link className="text-slate-400 hover:text-emerald-300" href="/verify">Verify</Link></li>
              <li><Link className="text-slate-400 hover:text-emerald-300" href="/pricing">Pricing</Link></li>
              <li><Link className="text-slate-400 hover:text-emerald-300" href="/developers">Developers</Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-semibold text-slate-2 00">Solutions</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link className="text-slate-400 hover:text-sky-300" href="/personal">For Individuals</Link></li>
              <li><Link className="text-slate-400 hover:text-sky-300" href="/pro">For Business</Link></li>
              <li><Link className="text-slate-400 hover:text-sky-300" href="/security">Security</Link></li>
            </ul>
          </div>

          {/* Company / Legal */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Company</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link className="text-slate-400 hover:text-white" href="/about">About</Link></li>
              <li><Link className="text-slate-400 hover:text-white" href="/contact">Contact</Link></li>
              <li><Link className="text-slate-400 hover:text-white" href="/changelog">Changelog</Link></li>
              <li><Link className="text-slate-400 hover:text-white" href="/status">Status</Link></li>
            </ul>

            <h3 className="mt-6 text-sm font-semibold text-slate-200">Legal</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link className="text-slate-400 hover:text-white" href="/privacy">Privacy</Link></li>
              <li><Link className="text-slate-400 hover:text-white" href="/terms">Terms</Link></li>
              <li><Link className="text-slate-400 hover:text-white" href="/cookies">Cookies</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col-reverse items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row">
          <p>© {year} DigitalMeve. All rights reserved.</p>

          {/* Lang switcher */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
            <Globe className="h-4 w-4 text-emerald-400" />
            <Link href="/?lang=en" className="hover:text-white">EN</Link>
            <span className="text-slate-600">/</span>
            <Link href="/?lang=fr" className="hover:text-white">FR</Link>
          </div>
        </div>
      </div>
    </footer>
  );
              }
