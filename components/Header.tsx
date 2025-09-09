"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { CTAButton } from "@/components/CTAButton";
import { MobileMenu } from "@/components/MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <BrandLogo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-200">
          <Link href="/generate" className="hover:text-emerald-400 transition">
            Generate
          </Link>
          <Link href="/verify" className="hover:text-emerald-400 transition">
            Verify
          </Link>
          <Link href="/docs" className="hover:text-emerald-400 transition">
            Docs
          </Link>
          <Link href="/pricing" className="hover:text-emerald-400 transition">
            Pricing
          </Link>
          <Link href="/contact" className="hover:text-emerald-400 transition">
            Contact
          </Link>
        </nav>

        {/* CTA visible seulement en desktop */}
        <div className="hidden md:block">
          <CTAButton>Generate Proof</CTAButton>
        </div>

        {/* Menu Mobile */}
        <MobileMenu />
      </div>
    </header>
  );
}
