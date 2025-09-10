"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { CTAButton } from "@/components/CTAButton";
import { MobileMenu } from "@/components/MobileMenu";
import { Menu } from "lucide-react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <BrandLogo />
          <span className="sr-only">DigitalMeve</span>
        </Link>

        <nav className="hidden items-center space-x-6 md:flex">
          <Link href="/generate" className="hover:text-emerald-400 transition">Generate</Link>
          <Link href="/verify" className="hover:text-emerald-400 transition">Verify</Link>
          <Link href="/docs" className="hover:text-emerald-400 transition">Docs</Link>
          <Link href="/pro" className="hover:text-emerald-400 transition">Pro</Link>
          <Link href="/contact" className="hover:text-emerald-400 transition">Contact</Link>
          <CTAButton aria-label="Start Free">Get Started</CTAButton>
        </nav>

        <button
          type="button"
          aria-label="Open menu"
          aria-controls="mobile-menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
          className="md:hidden rounded-xl border border-white/10 bg-white/5 p-2 text-slate-100 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Renders via portal; not clipped by the header */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
