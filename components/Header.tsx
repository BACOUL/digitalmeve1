"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-tight">
            Digital<span className="text-[var(--accent-1)]">MEVE</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/personal" className="nav-link">For Individuals</Link>
          <Link href="/pro" className="nav-link">For Business</Link>
          <Link href="/generate" className="nav-link">Generate</Link>
          <Link href="/verify" className="nav-link">Verify</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </nav>

        {/* Desktop auth */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className="text-sm font-medium hover:text-[var(--accent-1)]">
            Log in
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow hover:brightness-110"
          >
            Sign up
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="ml-2 rounded-md p-2 text-[var(--fg)] hover:bg-white/5 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && <MobileMenu onClose={() => setOpen(false)} />}
    </header>
  );
}
