// components/Header.tsx
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

  // état scroll pour opacité/ombre
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ferme le menu sur changement d’ancre
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  const nav = useMemo(
    () => [
      { href: "/generate", label: "Generate" },
      { href: "/verify", label: "Verify" },
      { href: "/personal", label: "For Individuals" },
      { href: "/pro", label: "For Business" },
      // ❌ Pricing retiré (prix intégrés dans /personal et /pro)
    ],
    []
  );

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only fixed left-3 top-3 z-[1001] rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow outline-none ring-2 ring-emerald-500"
      >
        Skip to content
      </a>

      <header
        role="banner"
        className={[
          "sticky top-0 z-50 w-full border-b transition-all",
          // header dark + blur, plus opaque quand on scroll
          scrolled
            ? "border-white/10 bg-slate-950/90 backdrop-blur supports-[backdrop-filter]:backdrop-blur shadow-[0_6px_24px_rgba(0,0,0,.25)]"
            : "border-white/10 bg-slate-950/60 backdrop-blur-[6px] supports-[backdrop-filter]:backdrop-blur",
        ].join(" ")}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 text-slate-100">
          {/* Logo gradient */}
          <Link
            href="/"
            className="mr-1 -mx-1 rounded-lg px-1 text-[1.25rem] font-extrabold bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent"
            aria-label="DigitalMeve – Home"
          >
            DigitalMeve
          </Link>

          {/* Nav desktop */}
          <nav className="ml-2 hidden items-center gap-6 text-sm md:flex" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={[
                  "px-1 -mx-1 rounded-lg transition",
                  isActive(item.href)
                    ? "text-emerald-300 font-semibold"
                    : "text-slate-300 hover:text-emerald-300",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex-1" />

          {/* CTA desktop */}
          <Link
            href="/personal"
            className="hidden md:inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-3.5 py-2 text-sm font-semibold text-white shadow-[0_0_22px_rgba(56,189,248,.22)] hover:brightness-110"
          >
            Get started
          </Link>

          {/* Burger mobile */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
          >
            <Menu className="h-5 w-5 text-slate-200" />
          </button>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
      <span id="main" className="sr-only" />
    </>
  );
}
