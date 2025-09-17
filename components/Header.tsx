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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = useMemo(
    () => [
      { href: "/generate", label: "Generate" },
      { href: "/verify", label: "Verify" },
      { href: "/personal", label: "For Individuals" },
      { href: "/pro", label: "For Business" },
      { href: "/contact", label: "Contact" },
    ],
    []
  );

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : (pathname || "").startsWith(href);

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
          "sticky top-0 z-50 w-full transition-all border-b border-white/10",
          scrolled
            ? "bg-slate-950/90 backdrop-blur supports-[backdrop-filter]:backdrop-blur shadow-[0_8px_32px_rgba(0,0,0,.35)]"
            : "bg-slate-950/60 backdrop-blur-[6px] supports-[backdrop-filter]:backdrop-blur",
        ].join(" ")}
      >
        <div aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 text-slate-100">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-60"
            style={{
              background:
                "radial-gradient(700px 160px at 10% 0%, rgba(16,185,129,.10), transparent 60%), radial-gradient(600px 140px at 90% 0%, rgba(56,189,248,.10), transparent 60%)",
            }}
          />

          {/* Logo identique à la home */}
          <Link
            href="/"
            className="mr-1 -mx-1 rounded-lg px-1 text-[1.25rem] font-extrabold tracking-tight"
            aria-label="DigitalMeve – Home"
          >
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Digital</span>
            <span className="bg-gradient-to-r from-sky-400 to-sky-300 bg-clip-text text-transparent">Meve</span>
          </Link>

          {/* Nav desktop */}
          <nav className="ml-2 hidden items-center gap-1.5 md:flex" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={[
                  "group relative rounded-lg px-3 py-1.5 text-sm transition text-slate-300 hover:text-white",
                  isActive(item.href) ? "text-white" : "",
                ].join(" ")}
              >
                <span
                  className={[
                    "absolute left-3 right-3 -bottom-[2px] h-[2px] rounded-full transition-all",
                    isActive(item.href) ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                  ].join(" ")}
                  style={{ background: "linear-gradient(90deg, rgba(16,185,129,.9), rgba(56,189,248,.9))" }}
                />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex-1" />

          {/* CTA desktop */}
          <Link
            href="/personal"
            className="hidden md:inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-3.5 py-2 text-sm font-semibold text-white shadow-[0_0_22px_rgba(56,189,248,.22)] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
          >
            Get started free
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
