// components/Header.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/generate", label: "Generate" },
  { href: "/verify", label: "Verify" },
  { href: "/docs", label: "Docs" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Lock body scroll when mobile menu is open
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={[
        "sticky top-0 z-50",
        "backdrop-blur-md bg-white/[0.04] border-b border-white/10",
        elevated ? "shadow-[0_2px_30px_rgba(0,0,0,0.35)]" : "shadow-none",
      ].join(" ")}
      role="banner"
    >
      <nav
        className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main"
      >
        {/* Logo (wordmark temporaire) */}
        <Link
          href="/"
          className="font-extrabold tracking-tight text-slate-100"
          aria-label="DigitalMeve — Home"
        >
          <span className="text-white">Digital</span>
          <span className="text-emerald-400">Meve</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-slate-200/80 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/generate"
            className="inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold text-slate-900
                       bg-gradient-to-r from-emerald-400 to-sky-400 shadow-[0_0_30px_rgba(34,211,238,0.25)]
                       hover:brightness-110 active:scale-[0.98] transition"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-200/80 hover:text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
          aria-label="Open menu"
          aria-controls="mobile-menu"
          aria-expanded={open}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 md:hidden"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          {/* panel */}
          <div className="absolute top-0 right-0 h-full w-[88%] max-w-[360px] bg-[#0B1220] border-l border-white/10 shadow-2xl">
            <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
              <span className="font-extrabold text-white">Digital<span className="text-emerald-400">Meve</span></span>
              <button
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-lg p-2 text-slate-200/80 hover:text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
                aria-label="Close menu"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="px-5 py-4 flex flex-col gap-1" role="menu">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  className="rounded-xl px-3 py-3 text-base text-slate-200/90 hover:text-white hover:bg-white/5 active:bg-white/10 transition"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/generate"
                role="menuitem"
                className="mt-2 inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold text-slate-900
                           bg-gradient-to-r from-emerald-400 to-sky-400 shadow-[0_0_30px_rgba(34,211,238,0.25)]
                           hover:brightness-110 active:scale-[0.98] transition"
                onClick={() => setOpen(false)}
              >
                Get Started
              </Link>

              <p className="mt-4 text-xs text-slate-400/80 px-1">
                Open standard · No file storage · Privacy-first
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
            }
