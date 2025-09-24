// components/Header.tsx — v9.8 (sticky, glass, a11y, zero-overflow, aligned routes)
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import MobileMenu from "@/components/MobileMenu";

const NAV: { href: string; label: string }[] = [
  { href: "/generate", label: "Generate" },
  { href: "/verify", label: "Verify" },
  { href: "/individuals", label: "Individuals" },
  { href: "/professionals", label: "Professionals" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/security", label: "Security" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Glass + shadow après scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu mobile en cas de resize vers desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-[900] w-full border-b transition-colors",
        scrolled ? "border-white/10 bg-slate-950/70 backdrop-blur supports-[backdrop-filter]:bg-slate-950/55" : "border-transparent bg-transparent",
      ].join(" ")}
      style={{ contain: "layout paint", overscrollBehaviorX: "none" }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between gap-3 lg:h-16">
          {/* Logo */}
          <div className="min-w-0">
            <Link href="/" className="inline-flex items-center gap-2 text-[15px] font-semibold leading-none">
              <span className="text-emerald-400">Digital</span>
              <span className="text-sky-400">Meve</span>
              <span className="sr-only">— Home</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-2">
              {NAV.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={[
                        "inline-flex items-center rounded-lg px-2.5 py-1.5 text-[15px] transition",
                        active
                          ? "bg-white/10 text-white"
                          : "text-slate-200 hover:bg-white/5 hover:text-white",
                      ].join(" ")}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* CTAs (desktop) */}
          <div className="hidden min-w-0 items-center gap-2 lg:flex">
            <Link
              href="/verify"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-medium text-slate-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Verify
            </Link>
            <Link
              href="/generate"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-3.5 py-2 text-sm font-semibold text-white shadow-[0_0_24px_rgba(56,189,248,.22)] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              Generate
            </Link>
          </div>

          {/* Mobile toggler */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
            >
              <Menu className="h-5 w-5 text-slate-200" />
            </button>
          </div>
        </div>
      </div>

      {/* Drawer mobile (déjà full a11y dans MobileMenu.tsx) */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  // Ex: /docs/... doit marquer Docs comme actif
  return pathname === href || pathname.startsWith(href + "/");
}
