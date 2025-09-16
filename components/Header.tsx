// components/Header.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* LOGO */}
        <Link href="/" aria-label="Accueil DigitalMeve">
          <span className="text-2xl font-extrabold bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">
            DigitalMeve
          </span>
        </Link>

        {/* NAVIGATION (desktop) */}
        <nav className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
          <Link href="/generate" className="hover:text-emerald-600 transition">
            Generate
          </Link>
          <Link href="/verify" className="hover:text-emerald-600 transition">
            Verify
          </Link>
          <Link href="/personal" className="hover:text-emerald-600 transition">
            For Individuals
          </Link>
          <Link href="/pro" className="hover:text-emerald-600 transition">
            For Business
          </Link>
          <Link href="/pricing" className="hover:text-emerald-600 transition">
            Pricing
          </Link>
        </nav>

        {/* MENU MOBILE */}
        <button
          aria-label="Ouvrir le menu"
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 md:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
