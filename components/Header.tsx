// components/Header.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-slate-900">
          Digital<span className="text-sky-500">Meve</span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <Link href="/generate" className="hover:text-sky-500 transition">
            Generate
          </Link>
          <Link href="/verify" className="hover:text-sky-500 transition">
            Verify
          </Link>
          <Link href="/docs" className="hover:text-sky-500 transition">
            Docs
          </Link>
          <Link href="/pricing" className="hover:text-sky-500 transition">
            Pricing
          </Link>
          <Link href="/contact" className="hover:text-sky-500 transition">
            Contact
          </Link>
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            href="/generate"
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 text-slate-900 font-semibold shadow-[0_0_20px_rgba(34,211,238,0.35)] hover:brightness-110 transition"
          >
            Generate Proof
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-slate-700 hover:text-sky-500 focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-2 space-y-2">
          <Link href="/generate" className="block hover:text-sky-500">
            Generate
          </Link>
          <Link href="/verify" className="block hover:text-sky-500">
            Verify
          </Link>
          <Link href="/docs" className="block hover:text-sky-500">
            Docs
          </Link>
          <Link href="/pricing" className="block hover:text-sky-500">
            Pricing
          </Link>
          <Link href="/contact" className="block hover:text-sky-500">
            Contact
          </Link>
        </div>
      )}
    </header>
  );
      }
