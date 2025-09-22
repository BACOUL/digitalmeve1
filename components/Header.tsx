// components/Header.tsx — v2 (aligned nav, dark glass, proper a11y)
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Fermer le menu mobile quand on change de hash/route
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  // Navigation principale (EN) — EXACTEMENT ce qu’on a validé
  const nav = useMemo(
    () => [
      { href: "/docs", label: "Standard" },
      { href: "/security", label: "Security" },
      { href: "/pricing", label: "Pricing" },
      { href: "/roadmap", label: "Roadmap" },
      { href: "/faq", label: "FAQ" },
      // GitHub externe (mets l’URL de ton repo)
      { href: "https://github.com/BACOUL/Digitalmeve-standard-", label: "GitHub", external: true },
    ],
    []
  );

  // CTAs persistants (droite)
  const ctas = useMemo(
    () => [
      { href: "/verify", label: "Verify a file", variant: "primary" as const },
      { href: "/generate", label: "Protect a file", variant: "outline" as const },
    ],
    []
  );

  const isActive = (href: string) => {
    if (!pathname || href.startsWith("http")) return false;
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  return (
    <>
      {/* Skip link a11y */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only fixed left-3 top-3 z-[1001] rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow outline-none ring-2 ring-emerald-500"
      >
        Skip to content
      </a>

      <header
        role="banner"
        className={`sticky top-0 z-50 w-full border-b transition-all
          ${scrolled ? "backdrop-blur supports-[backdrop-filter]:bg-slate-950/70" : "backdrop-blur-0 bg-slate-950/60"}
          border-white/10`}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 text-slate-100">
          {/* Logo */}
          <Link
            href="/"
            className="mr-1 -mx-1 rounded-lg px-1 text-[1.15rem] font-extrabold bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent"
            aria-label="DigitalMeve – Home"
          >
            DigitalMeve
          </Link>

          {/* Nav desktop */}
          <nav className="ml-3 hidden items-center gap-5 text-sm md:flex" aria-label="Primary">
            {nav.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-1 -mx-1 rounded-lg text-slate-200 hover:text-emerald-300 transition"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`px-1 -mx-1 rounded-lg transition ${
                    isActive(item.href)
                      ? "text-emerald-300 font-semibold"
                      : "text-slate-200 hover:text-emerald-300"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex-1" />

          {/* CTAs desktop */}
          <div className="hidden items-center gap-2 md:flex">
            {ctas.map((c) =>
              c.variant === "primary" ? (
                <Link
                  key={c.href}
                  href={c.href}
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-3.5 py-2 text-sm font-medium text-white shadow-[0_0_24px_rgba(56,189,248,.22)] hover:brightness-105"
                >
                  {c.label}
                </Link>
              ) : (
                <Link
                  key={c.href}
                  href={c.href}
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-medium text-slate-100 hover:bg-white/10"
                >
                  {c.label}
                </Link>
              )
            )}
          </div>

          {/* Burger mobile */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 md:hidden"
          >
            <Menu className="h-5 w-5 text-slate-100" />
          </button>
        </div>
      </header>

      {/* Menu mobile — assure-toi que MobileMenu lise les mêmes items */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
      <span id="main" className="sr-only" />
    </>
  );
}
