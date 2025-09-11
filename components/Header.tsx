// components/Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import MobileMenu from "@/components/MobileMenu";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="DigitalMeve Home">
          <span className="text-lg font-semibold tracking-tight">
            <span className="text-emerald-600">Digital</span>
            <span className="text-sky-600">Meve</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/generate" className="text-slate-700 hover:text-emerald-700 transition-colors">
            Generate
          </Link>
          <Link href="/verify" className="text-slate-700 hover:text-emerald-700 transition-colors">
            Verify
          </Link>
          <Link href="/docs" className="text-slate-700 hover:text-emerald-700 transition-colors">
            Docs
          </Link>
          <Link href="/pro" className="text-slate-700 hover:text-sky-700 transition-colors">
            For Professionals
          </Link>
          <Link href="/contact" className="text-slate-700 hover:text-sky-700 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={open}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
        >
          <Menu className="h-5 w-5 text-slate-700" />
        </button>
      </div>

      {/* Mobile full-screen menu */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
