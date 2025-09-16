// components/Header.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-extrabold bg-gradient-to-r from-emerald-400 to-sky-500 bg-clip-text text-transparent">
          DigitalMeve
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden gap-6 md:flex">
          <Link href="/generate" className="text-slate-700 hover:text-slate-900">Generate</Link>
          <Link href="/verify" className="text-slate-700 hover:text-slate-900">Verify</Link>
          <Link href="/personal" className="text-slate-700 hover:text-slate-900">For Individuals</Link>
          <Link href="/pro" className="text-slate-700 hover:text-slate-900">For Business</Link>
          <Link href="/pricing" className="text-slate-700 hover:text-slate-900">Pricing</Link>
        </nav>

        {/* Bouton mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100"
        >
          <Menu className="h-6 w-6 text-slate-700" />
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="md:hidden bg-white shadow-md border-t border-slate-200">
          <nav className="flex flex-col p-4 space-y-3">
            <Link href="/generate" className="text-slate-700 hover:text-slate-900">Generate</Link>
            <Link href="/verify" className="text-slate-700 hover:text-slate-900">Verify</Link>
            <Link href="/personal" className="text-slate-700 hover:text-slate-900">For Individuals</Link>
            <Link href="/pro" className="text-slate-700 hover:text-slate-900">For Business</Link>
            <Link href="/pricing" className="text-slate-700 hover:text-slate-900">Pricing</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
