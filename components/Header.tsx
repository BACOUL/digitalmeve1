"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const BuildChip = () => (
    <span className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
      <span>Build</span>
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
      <time>{new Date().toISOString().slice(0, 19).replace("T", " ")}</time>
    </span>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      {/* Barre translucide */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mt-4 rounded-2xl border border-white/10 bg-[rgba(12,18,32,0.55)] backdrop-blur-md">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-md bg-emerald-400 inline-block" />
              <span className="font-semibold tracking-tight text-white">
                Digital<span className="text-emerald-300">Meve</span>
              </span>
            </Link>

            {/* Nav desktop */}
            <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
              <Link href="/generate" className="hover:text-white">Generate</Link>
              <Link href="/verify" className="hover:text-white">Verify</Link>
              <Link href="/docs" className="hover:text-white">Docs</Link>
              <Link href="/pricing" className="hover:text-white">Pricing</Link>
              <Link href="/contact" className="hover:text-white">Contact</Link>

              <BuildChip />

              <Link
                href="/generate"
                className="ml-2 inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold text-slate-900
                           bg-gradient-to-r from-emerald-400 to-sky-400 shadow-[0_0_28px_rgba(34,211,238,0.25)]
                           hover:brightness-110 transition"
              >
                Get Started
              </Link>
            </nav>

            {/* Burger mobile */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/80"
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Drawer mobile */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute right-0 top-0 h-full w-[78%] max-w-[320px] bg-[#0B1220] border-l border-white/10 p-6">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="h-9 w-9 inline-flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/80"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 grid gap-4 text-white/90">
              <Link href="/generate" onClick={() => setOpen(false)}>Generate</Link>
              <Link href="/verify" onClick={() => setOpen(false)}>Verify</Link>
              <Link href="/docs" onClick={() => setOpen(false)}>Docs</Link>
              <Link href="/pricing" onClick={() => setOpen(false)}>Pricing</Link>
              <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>

              <Link
                href="/generate"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-center rounded-xl px-4 py-3 font-semibold text-slate-900
                           bg-gradient-to-r from-emerald-400 to-sky-400 shadow-[0_0_24px_rgba(34,211,238,0.25)]"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
          }
