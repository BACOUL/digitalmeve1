"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { CTAButton } from "@/components/CTAButton";
import { MobileMenu } from "@/components/MobileMenu";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-block h-6 w-6">
            <BrandLogo />
          </span>
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
          <CTAButton as="a" href="/generate" aria-label="Start Free">
            Start Free
          </CTAButton>
        </nav>

        {/* Mobile: open button */}
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center rounded-lg border border-white/10 p-2 text-slate-200 hover:bg-white/10 md:hidden"
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          <Menu className="h-5 w-5" aria-hidden />
        </button>
      </div>

      {/* Mobile drawer (props requis) */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
