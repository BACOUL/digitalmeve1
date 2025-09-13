"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-white">
          Digital<span className="text-emerald-400">Meve</span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden space-x-6 md:flex">
          <Link href="/#how-it-works" className="text-slate-300 hover:text-white">
            How it works
          </Link>
          <Link href="/pricing" className="text-slate-300 hover:text-white">
            Pricing
          </Link>
          <Link href="/security" className="text-slate-300 hover:text-white">
            Security
          </Link>
          <Link href="/verify" className="text-slate-300 hover:text-white">
            Verify
          </Link>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex">
          <Link
            href="/generate"
            className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-slate-300 hover:text-white"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 bg-slate-950/90 md:hidden">
          <nav className="flex flex-col space-y-2 px-4 py-4">
            <Link href="/#how-it-works" className="text-slate-300 hover:text-white" onClick={() => setOpen(false)}>
              How it works
            </Link>
            <Link href="/pricing" className="text-slate-300 hover:text-white" onClick={() => setOpen(false)}>
              Pricing
            </Link>
            <Link href="/security" className="text-slate-300 hover:text-white" onClick={() => setOpen(false)}>
              Security
            </Link>
            <Link href="/verify" className="text-slate-300 hover:text-white" onClick={() => setOpen(false)}>
              Verify
            </Link>
            <Link
              href="/generate"
              className="mt-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
              onClick={() => setOpen(false)}
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
