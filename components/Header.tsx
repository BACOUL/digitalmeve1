"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import MobileMenu from "@/components/MobileMenu";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[80] w-full border-b border-white/10 bg-slate-900/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold">
            <span className="text-emerald-300">Digital</span>
            <span className="text-sky-300">Meve</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/generate" className="hover:text-emerald-400 transition">Generate</Link>
          <Link href="/verify" className="hover:text-emerald-400 transition">Verify</Link>
          <Link href="/docs" className="hover:text-emerald-400 transition">Docs</Link>
          <Link href="/pro" className="hover:text-emerald-400 transition">Pro</Link>
          <Link href="/contact" className="hover:text-emerald-400 transition">Contact</Link>
        </nav>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Afficher le menu SEULEMENT quand open = true */}
      {open && <MobileMenu open={open} onClose={() => setOpen(false)} />}
    </header>
  );
}
