"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { X, FilePlus2, ShieldCheck, BookOpen, Briefcase, Mail, Info, Users } from "lucide-react";

type Props = { open: boolean; onClose: () => void };

export function MobileMenu({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div id="mobile-menu" className="fixed inset-0 z-[70] md:hidden">
      {/* Backdrop qui capte le clic */}
      <button
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Panneau latéral sans animation fancy */}
      <div className="absolute right-0 top-0 h-full w-80 max-w-[86%] overflow-y-auto border-l border-white/10 bg-slate-950/95 shadow-2xl">
        {/* Entête du drawer : logo seul (pas de doublon de titre) + bouton fermer */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <Link href="/" onClick={onClose} className="flex items-center">
            <BrandLogo />
            <span className="sr-only">DigitalMeve</span>
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-200 hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Liens */}
        <nav className="px-3 py-4">
          {/* Individuals */}
          <div className="px-2 py-3">
            <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide text-emerald-300/80">
              <Users className="h-4 w-4" /> Individuals
            </p>
            <ul className="space-y-1">
              <li>
                <Link href="/generate" onClick={onClose} className="flex items-center gap-3 rounded-xl px-3 py-2 text-slate-100 hover:bg-white/10">
                  <FilePlus2 className="h-5 w-5" /> Generate
                </Link>
              </li>
              <li>
                <Link href="/verify" onClick={onClose} className="flex items-center gap-3 rounded-xl px-3 py-2 text-slate-100 hover:bg-white/10">
                  <ShieldCheck className="h-5 w-5" /> Verify
                </Link>
              </li>
              <li>
                <Link href="/docs" onClick={onClose} className="flex items-center gap-3 rounded-xl px-3 py-2 text-slate-100 hover:bg-white/10">
                  <BookOpen className="h-5 w-5" /> Docs
                </Link>
              </li>
            </ul>
          </div>

          <div className="my-2 h-px bg-white/10" />

          {/* Pro */}
          <div className="px-2 py-3">
            <p className="mb-2 text-xs uppercase tracking-wide text-sky-300/80">Professionals</p>
            <ul className="space-y-1">
              <li>
                <Link href="/pro" onClick={onClose} className="flex items-center gap-3 rounded-xl px-3 py-2 text-slate-100 hover:bg-white/10">
                  <Briefcase className="h-5 w-5" /> For Professionals
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={onClose} className="flex items-center gap-3 rounded-xl px-3 py-2 text-slate-100 hover:bg-white/10">
                  <Mail className="h-5 w-5" /> Contact
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={onClose} className="flex items-center gap-3 rounded-xl px-3 py-2 text-slate-100 hover:bg-white/10">
                  <Info className="h-5 w-5" /> About
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
