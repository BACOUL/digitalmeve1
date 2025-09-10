"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { CTAButton } from "@/components/CTAButton";
import { MobileMenu } from "@/components/MobileMenu";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <BrandLogo />
          <span className="font-medium text-slate-100">DigitalMeve</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center space-x-8 md:flex">
          <Link href="/personal" className="hover:text-emerald-400 transition">
            Individuals
          </Link>
          <Link href="/pro" className="hover:text-emerald-400 transition">
            Professionals
          </Link>
          <Link href="/verify" className="hover:text-emerald-400 transition">
            Verify
          </Link>
          <Link href="/generate" className="inline-flex">
            <CTAButton aria-label="Start Free">Start Free</CTAButton>
          </Link>
        </nav>

        {/* Mobile menu */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(true)}
            className="rounded-lg p-2 hover:bg-white/10 transition"
            aria-label="Open menu"
          >
            {/* Icône burger */}
            <svg
              className="h-6 w-6 text-slate-100"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </div>
      </div>
    </header>
  );
}
