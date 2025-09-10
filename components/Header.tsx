"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { MobileMenu } from "@/components/MobileMenu";
import { Menu, Users, Briefcase } from "lucide-react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <BrandLogo />
          <span className="sr-only">DigitalMeve</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {/* Individuals group */}
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-emerald-300" aria-hidden />
            <Link href="/personal" className="hover:text-emerald-400 transition">Individuals</Link>
            <span className="text-slate-600">/</span>
            <Link href="/generate" className="hover:text-emerald-400 transition">Generate</Link>
            <span className="text-slate-600">/</span>
            <Link href="/verify" className="hover:text-emerald-400 transition">Verify</Link>
          </div>

          {/* Professionals group */}
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-sky-300" aria-hidden />
            <Link href="/pro" className="hover:text-emerald-400 transition">Professionals</Link>
            <span className="text-slate-600">/</span>
            <Link href="/pricing" className="hover:text-emerald-400 transition">Pricing</Link>
            <span className="text-slate-600">/</span>
            <Link href="/contact" className="hover:text-emerald-400 transition">Contact</Link>
          </div>

          {/* Docs */}
          <Link href="/docs" className="hover:text-emerald-400 transition">Docs</Link>

          {/* CTA */}
          <Link
            href="/generate"
            className="rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-4 py-2 font-semibold text-slate-900 shadow-[0_0_24px_rgba(34,211,238,0.35)] hover:brightness-110 transition"
            aria-label="Get started free"
          >
            Get Started Free
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(true)}
          className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-100 hover:bg-white/10 md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Drawer menu */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
      }
