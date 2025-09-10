// components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import MobileMenu from "@/components/MobileMenu";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  // Ombre au scroll pour un look premium
  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/70 backdrop-blur-md transition-shadow",
        elevated ? "shadow-[0_8px_30px_rgba(2,6,23,0.35)]" : "",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight">
            <span className="text-emerald-300">Digital</span>
            <span className="text-sky-300">Meve</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {/* Espace particuliers */}
          <Link href="/generate" className="hover:text-emerald-400 transition">
            Generate
          </Link>
          <Link href="/verify" className="hover:text-emerald-400 transition">
            Verify
          </Link>
          <Link href="/docs" className="hover:text-emerald-400 transition">
            Docs
          </Link>

          {/* Espace pro */}
          <Link href="/pro" className="hover:text-sky-400 transition">
            Pro
          </Link>
          <Link href="/contact" className="hover:text-sky-400 transition">
            Contact
          </Link>

          {/* CTA principal */}
          <Link
            href="/generate"
            className="ml-2 inline-flex items-center justify-center rounded-2xl px-4 py-2 font-medium text-slate-900 bg-gradient-to-r from-emerald-400 to-sky-400 shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:brightness-110 transition"
            aria-label="Start free"
          >
            Start free
          </Link>
        </nav>

        {/* Mobile trigger */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
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
