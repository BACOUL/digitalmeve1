// components/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import BrandLogo from './BrandLogo';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/generate', label: 'Generate' },
  { href: '/verify', label: 'Verify' },
  { href: '/docs', label: 'Docs' },
  { href: '/pricing', label: 'Pricing' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="shrink-0">
          <BrandLogo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-slate-300 hover:text-white transition"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/generate" className="btn-primary">
            Generate a proof
          </Link>
        </nav>

        {/* Mobile burger */}
        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-slate-200 md:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden">
          <div className="space-y-1 border-t border-white/10 bg-slate-900/80 px-4 py-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2 text-slate-200 hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/generate"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 w-full text-center"
            >
              Generate a proof
            </Link>
          </div>
        </div>
      )}
    </header>
  );
                                 }
