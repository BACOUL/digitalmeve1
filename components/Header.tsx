"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/generate", label: "Generate" },
  { href: "/verify", label: "Verify" },
  { href: "/docs", label: "Docs" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Ombre au scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fermer le menu quand la route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Fermer au clic lien
  const closeAndGo = () => setOpen(false);

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all",
        "backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/95",
        scrolled ? "shadow-lg shadow-black/20 border-b border-white/10" : "border-b border-transparent",
      ].join(" ")}
      role="navigation"
      aria-label="Main"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          {/* Logo (texte en attendant le SVG) */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2"
            onClick={closeAndGo}
          >
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-glow" />
            <span className="font-extrabold tracking-tight text-white text-lg">
              DigitalMeve
            </span>
            <span className="text-white/50 group-hover:text-white/70 transition text-xs">
              .MEVE
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "relative text-sm transition",
                    active
                      ? "text-white"
                      : "text-white/70 hover:text-white",
                  ].join(" ")}
                  onClick={closeAndGo}
                >
                  {item.label}
                  {/* soulignement gradient pour le lien actif */}
                  <span
                    className={[
                      "absolute left-0 -bottom-2 h-[2px] w-full rounded",
                      "bg-gradient-to-r from-emerald-400 to-sky-400",
                      active ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/generate"
              className="hidden sm:inline-flex items-center justify-center rounded-2xl px-4 py-2 font-semibold text-slate-900
                         bg-gradient-to-r from-emerald-400 to-sky-400 shadow-glow hover:brightness-110 transition"
              onClick={closeAndGo}
            >
              Generate Proof
            </Link>

            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-xl p-2 border border-white/10 text-white/90 hover:bg-white/10 transition"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {/* icône burger / close */}
              <svg
                className={`h-5 w-5 ${open ? "hidden" : "block"}`}
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <svg
                className={`h-5 w-5 ${open ? "block" : "hidden"}`}
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (slide-down) */}
      <div
        className={[
          "md:hidden overflow-hidden border-t border-white/10",
          open ? "max-h-[60vh] opacity-100" : "max-h-0 opacity-0",
          "transition-all duration-300 ease-out",
          "bg-slate-900/95",
        ].join(" ")}
      >
        <div className="px-4 sm:px-6 py-3 flex flex-col gap-2">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "w-full rounded-xl px-3 py-2 text-sm transition",
                  active
                    ? "text-white bg-white/10"
                    : "text-white/80 hover:text-white hover:bg-white/5",
                ].join(" ")}
                onClick={closeAndGo}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/generate"
            className="mt-1 inline-flex items-center justify-center rounded-2xl px-4 py-2 font-semibold text-slate-900
                       bg-gradient-to-r from-emerald-400 to-sky-400 shadow-glow hover:brightness-110 transition"
            onClick={closeAndGo}
          >
            Generate Proof
          </Link>
        </div>
      </div>
    </header>
  );
              }
