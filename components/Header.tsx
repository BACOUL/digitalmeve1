"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { CTAButton } from "@/components/CTAButton";
import { MobileMenu } from "@/components/MobileMenu";

export function Header() {
  const [open, setOpen] = useState(false);

  // Nav desktop — version essentielle et claire
  const nav = [
    { href: "/personal", label: "Individuals" },
    { href: "/pro", label: "Professionals" },
    { href: "/verify", label: "Verify" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/60 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <BrandLogo className="h-6 w-6" />
          <span className="font-medium text-slate-100">DigitalMeve</span>
        </Link>

        {/* Desktop nav (essentiel) */}
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-slate-300 hover:text-slate-100 hover:underline hover:decoration-emerald-400/60 underline-offset-4"
            >
              {item.label}
            </Link>
          ))}

          {/* CTA principal — orienté particuliers */}
          <CTAButton as="a" href="/generate" className="ml-2" aria-label="Start Free">
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

      {/* Mobile drawer — déjà structuré Individuals / Professionals dans MobileMenu.tsx */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
      }
