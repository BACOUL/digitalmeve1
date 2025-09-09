"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { CTAButton } from "@/components/CTAButton";
import { MobileMenu } from "@/components/MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <BrandLogo />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center space-x-8 md:flex">
          <Link href="/generate" className="hover:text-emerald-400 transition">
            Generate
          </Link>
          <Link href="/verify" className="hover:text-emerald-400 transition">
            Verify
          </Link>
          <Link href="/docs" className="hover:text-emerald-400 transition">
            Docs
          </Link>
          <Link href="/pro" className="hover:text-emerald-400 transition">
            Pro
          </Link>
          <Link href="/contact" className="hover:text-emerald-400 transition">
            Contact
          </Link>
          <CTAButton aria-label="Generate your proof">Generate Proof</CTAButton>
        </nav>

        {/* Mobile menu */}
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
