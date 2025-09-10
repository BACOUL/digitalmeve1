// components/Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import MobileMenu from "@/components/MobileMenu";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="DigitalMeve Home">
          <span className="text-lg font-semibold">
            <span className="text-emerald-300">Digital</span>
            <span className="text-sky-300">Meve</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/generate" className="transition hover:text-emerald-400">
            Generate
          </Link>
          <Link href="/verify" className="transition hover:text-emerald-400">
            Verify
          </Link>
          <Link href="/docs" className="transition hover:text-emerald-400">
            Docs
          </Link>
          <Link href="/pro" className="transition hover:text-sky-300">
            For Professionals
          </Link>
          <Link href="/contact" className="transition hover:text-sky-300">
            Contact
          </Link>
          {/* CTA removed on purpose */}
        </nav>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={open}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile full-screen menu */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
