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
        <Link href="/" className="flex items-center gap-2" aria-label="DigitalMeve Home">
          <span className="text-lg font-semibold">
            <span className="text-emerald-300">Digital</span>
            <span className="text-sky-300">Meve</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/generate" className="hover:text-emerald-400 transition">Generate</Link>
          <Link href="/verify" className="hover:text-emerald-400 transition">Verify</Link>
          <Link href="/docs" className="hover:text-emerald-400 transition">Docs</Link>
          <Link href="/pro" className="hover:text-sky-300 transition">For Professionals</Link>
          <Link href="/contact" className="hover:text-sky-300 transition">Contact</Link>
          <Link
            href="/generate"
            className="rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-5 py-2.5 font-semibold text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.45)] hover:brightness-110 transition"
          >
            Start Free
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={open}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
