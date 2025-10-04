// components/Nav.tsx — v1 (sticky, blur, a11y, mobile-ready)
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/#why", label: "Why" },
  { href: "/#how", label: "How it works" },
  {
    href: "/#use-cases",
    label: "Use cases",
    children: [
      { href: "/#creators", label: "Creators" },
      { href: "/#verifiers", label: "Verifiers" },
    ],
  },
  { href: "/security", label: "Security" },
  { href: "https://github.com/BACOUL/Digitalmeve-standard-", label: "Docs", external: true },
  { href: "/pricing", label: "Pricing" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  // Ferme le menu mobile sur "Escape"
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Empêche le scroll du body quand le menu est ouvert
  useEffect(() => {
    if (open) document.documentElement.style.overflow = "hidden";
    else document.documentElement.style.overflow = "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);

  return (
    <header
      role="banner"
      className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/5 bg-white/8 border-b border-white/10"
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-5"
      >
        {/* Logo / Brand */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white font-semibold tracking-tight"
          aria-label="DigitalMeve — Home"
        >
          {/* Petit rond vert en guise de marqueur minimal */}
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-emerald-400 inline-block" />
          <span className="text-[15.5px] sm:text-[16px]">DigitalMeve</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1.5">
          {links.map((l) =>
            l.children ? (
              <div key={l.label} className="group relative">
                <button
                  className="px-3 py-2 text-[14.5px] text-slate-200/90 hover:text-white rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {l.label}
                </button>
                <div
                  role="menu"
                  className="invisible absolute left-0 mt-1 min-w-[200px] rounded-xl border border-white/10 bg-black/70 p-1 opacity-0 backdrop-blur transition-all duration-150 group-hover:visible group-hover:opacity-100"
                >
                  {l.children.map((c) => (
                    <Link
                      key={c.label}
                      href={c.href}
                      className="block rounded-lg px-3 py-2 text-[14px] text-slate-200/90 hover:text-white hover:bg-white/10"
                      role="menuitem"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={l.label}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className="px-3 py-2 text-[14.5px] text-slate-200/90 hover:text-white rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                {l.label}
              </Link>
            )
          )}

          {/* CTA Start */}
          <Link
            href="/generate"
            className="ml-1 inline-flex items-center rounded-full bg-sky-500/90 hover:bg-sky-400 px-4 py-2 text-[14.5px] font-semibold text-slate-900 shadow-[0_0_30px_rgba(56,189,248,.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            aria-label="Start — protect a file"
          >
            Start
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          ref={btnRef}
          type="button"
          onClick={() => setOpen(true)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" aria-hidden />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 z-[60] transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!open}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setOpen(false)}
        />
        {/* Panel */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={`absolute right-0 top-0 h-full w-[84%] max-w-[360px] border-l border-white/10 bg-black/80 backdrop-blur p-4 transition-transform duration-200 ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-white font-semibold">
              <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-emerald-400 inline-block" />
              DigitalMeve
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <nav className="mt-4 space-y-1.5">
            {links.map((l) =>
              l.children ? (
                <div key={l.label} className="rounded-lg border border-white/10">
                  <div className="px-3 py-2 text-[14.5px] text-slate-200/90">{l.label}</div>
                  <div className="px-1 pb-1">
                    {l.children.map((c) => (
                      <Link
                        key={c.label}
                        href={c.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-md px-3 py-2 text-[14px] text-slate-200/90 hover:text-white hover:bg-white/10"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={l.label}
                  href={l.href}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noopener noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg border border-white/10 px-3 py-2 text-[14.5px] text-slate-200/90 hover:text-white hover:bg-white/10"
                >
                  {l.label}
                </Link>
              )
            )}

            <Link
              href="/generate"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-sky-500/90 hover:bg-sky-400 px-4 py-2 text-[15px] font-semibold text-slate-900 shadow-[0_0_30px_rgba(56,189,248,.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              aria-label="Start — protect a file"
            >
              Start
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
                }
