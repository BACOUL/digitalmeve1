// components/Header.tsx
"use client";

import Link from "next/link";

const links = [
  { href: "/generate", label: "Generate" },
  { href: "/verify",   label: "Verify" },
  { href: "/docs",     label: "Docs" },
  { href: "/pricing",  label: "Pricing" },
  { href: "/contact",  label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 glass">
      <div className="container-max h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-md bg-emerald-400 shadow-[0_0_18px_rgba(16,185,129,0.8)]" />
          <span className="font-semibold tracking-tight text-white">
            Digital<span className="text-emerald-400">Meve</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-white/80 hover:text-white transition"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/generate"
            className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-900
                       bg-gradient-to-r from-emerald-400 to-sky-400 hover:brightness-110
                       shadow-[0_0_30px_rgba(56,189,248,0.35)] transition"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile burger (sans JS additionnel) */}
        <details className="md:hidden relative">
          <summary
            className="list-none rounded-lg p-2 text-white/90 hover:bg-white/5 active:bg-white/10
                       cursor-pointer select-none"
            aria-label="Open menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" className="fill-current">
              <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" />
            </svg>
          </summary>

          <div
            className="absolute right-0 mt-2 w-56 rounded-2xl border border-white/10 bg-slate-900/95
                       backdrop-blur shadow-xl p-2"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block rounded-lg px-3 py-2 text-sm text-white/90 hover:bg-white/5"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/generate"
              className="mt-2 block rounded-xl px-3 py-2 text-center text-sm font-semibold text-slate-900
                         bg-gradient-to-r from-emerald-400 to-sky-400 hover:brightness-110"
            >
              Get Started
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}
