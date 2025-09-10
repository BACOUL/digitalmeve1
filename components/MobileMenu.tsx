
"use client";

import Link from "next/link";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  FilePlus2,
  ShieldCheck,
  BookOpen,
  Briefcase,
  Mail,
  Info,
  Users,
} from "lucide-react";

type Props = { open: boolean; onClose: () => void };

export function MobileMenu({ open, onClose }: Props) {
  // Don't render at all if closed
  if (!open) return null;

  // Lock scroll while menu is open
  useEffect(() => {
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, []);

  const overlay = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className="fixed inset-0 z-[99999] md:hidden"
    >
      {/* Backdrop */}
      <button
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-black/70"
      />

      {/* Full-screen panel */}
      <div className="absolute inset-0 bg-slate-950 text-slate-100">
        {/* Top bar with only the close button (no title, so no duplicate) */}
        <div className="flex items-center justify-end px-4 py-4 border-b border-white/10">
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Links */}
        <nav className="px-5 py-5 space-y-7">
          {/* INDIVIDUALS */}
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wide text-emerald-300/90">
              <Users className="h-4 w-4" /> Individuals
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/generate"
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-base hover:bg-white/10"
                >
                  <FilePlus2 className="h-5 w-5" /> Generate
                </Link>
              </li>
              <li>
                <Link
                  href="/verify"
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-base hover:bg-white/10"
                >
                  <ShieldCheck className="h-5 w-5" /> Verify
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-base hover:bg-white/10"
                >
                  <BookOpen className="h-5 w-5" /> Docs
                </Link>
              </li>
            </ul>
          </div>

          <div className="h-px bg-white/10" />

          {/* PROFESSIONALS */}
          <div>
            <p className="mb-3 text-xs uppercase tracking-wide text-sky-300/90">
              Professionals
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/pro"
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-base hover:bg-white/10"
                >
                  <Briefcase className="h-5 w-5" /> For Professionals
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-base hover:bg-white/10"
                >
                  <Mail className="h-5 w-5" /> Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-base hover:bg-white/10"
                >
                  <Info className="h-5 w-5" /> About
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );

  // Render outside <header> to avoid any clipping/z-index issues
  return createPortal(overlay, document.body);
}
