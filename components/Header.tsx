"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { MobileMenu } from "@/components/MobileMenu";
import { Menu } from "lucide-react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <BrandLogo />
          <span className="sr-only">DigitalMeve</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center space-x-8 md:flex">
          <Link href="/generate" className="hover:text-emerald-400 transition">
            Generate
          </Link>
          <Link href="/verify" className="hover:text-emerald-400 transition">
            Verify
          </Link>
          <Link href="/docs" className="hover:text-emerald-400 transition">
            Docs
          </Link>
          <Link href="/pro" className="hover:text-emerald-400 transition">
            Pro
          </Link>
          <Link href="/contact" className="hover:text-emerald-400 transition">
            Contact
          </Link>

          {/* CTA simple en <a> pour éviter les soucis de props */}
          <a
            href="/generate"
            aria-label="Start Free"
            className="relative inline-flex items-center justify-center rounded-2xl px-5 py-2.5 font-semibold text-slate-900
                       bg-gradient-to-r from-emerald-400 to-sky-400 shadow-[0_0_30px_rgba(34,211,238,0.45)]
                       hover:brightness-110 transition focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
          >
            Start Free
          </a>
        </nav>

        {/* Mobile menu trigger */}
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="md:hidden inline-flex items-center rounded-xl border border-white/10 bg-white/5 p-2 text-slate-200 hover:bg-white/10"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Drawer mobile */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
