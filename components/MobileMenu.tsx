"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import {
  X,
  Users,
  FilePlus2,
  ShieldCheck,
  HelpCircle,
  ListChecks,
  Briefcase,
  CreditCard,
  Mail,
  BookOpen,
  Github,
  Sparkles,
} from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: Props) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => closeBtnRef.current?.focus(), 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="Mobile navigation" className="fixed inset-0 z-[60]">
      {/* Overlay */}
      <button aria-label="Close menu" onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      {/* Drawer */}
      <div
        className="
          absolute right-0 top-0 h-full w-80 max-w-[86%] overflow-y-auto
          border-l border-white/10
          bg-[radial-gradient(120%_120%_at_100%_0%,rgba(16,185,129,0.14),rgba(56,189,248,0.10)_45%,rgba(2,6,23,0.92)_70%)]
          shadow-[0_0_50px_rgba(34,211,238,0.18)] backdrop-blur-xl
          animate-[slidein_.22s_ease] will-change-transform
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <BrandLogo />
            <span className="sr-only">DigitalMeve</span>
          </Link>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close"
            className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-200 hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="px-2 pb-8">
          {/* Individuals */}
          <div className="px-2 pt-2 pb-3">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
              <Users className="h-4 w-4" />
              Individuals
            </div>
            <Link href="/generate" onClick={onClose} className="flex items-center gap-3 rounded-xl px-3 py-2 text-slate-100 hover:bg-white/10">
              <FilePlus2 className="h-5 w-5 text-emerald-300" />
              Generate
            </Link>
            <Link href="/verify" onClick={onClose} className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2 text-slate-100 hover:bg-white/10">
              <ShieldCheck className="h-5 w-5 text-sky-300" />
              Verify
            </Link>
            <Link href="/personal" onClick={onClose} className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2 text-slate-100 hover:bg-white/10">
              <ListChecks className="h-5 w-5 text-emerald-300" />
              How it works
            </Link>
            <Link href="/faq" onClick={onClose} className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2 text-slate-100 hover:bg-white/10">
              <HelpCircle className="h-5 w-5 text-slate-300" />
              FAQ
            </Link>
          </div>

          <hr className="my-3 border-white/10" />

          {/* Professionals */}
          <div className="px-2 pt-2 pb-3">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
              <Briefcase className="h-4 w-4" />
              Professionals
            </div>
            <Link href="/pro" onClick={onClose} className="flex items-center gap-3 rounded-xl px-3 py-2 text-slate-100 hover:bg-white/10">
              <Sparkles className="h-5 w-5 text-sky-300" />
              Overview
            </Link>
            <Link href="/pricing" onClick={onClose} className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2 text-slate-100 hover:bg-white/10">
              <CreditCard className="h-5 w-5 text-emerald-300" />
              Pricing
            </Link>
            <Link href="/contact" onClick={onClose} className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2 text-slate-100 hover:bg-white/10">
              <Mail className="h-5 w-5 text-slate-300" />
              Contact sales
            </Link>
          </div>

          <hr className="my-3 border-white/10" />

          {/* Resources */}
          <div className="px-2 pt-2 pb-3">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
              <BookOpen className="h-4 w-4" />
              Resources
            </div>
            <Link href="/docs" onClick={onClose} className="flex items-center gap-3 rounded-xl px-3 py-2 text-slate-100 hover:bg-white/10">
              <BookOpen className="h-5 w-5 text-sky-300" />
              Docs
            </Link>
            <a
              href="https://github.com/BACOUL/digitalmeve"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2 text-slate-100 hover:bg-white/10"
              onClick={onClose}
            >
              <Github className="h-5 w-5 text-slate-300" />
              GitHub
            </a>
          </div>

          {/* CTA bottom */}
          <div className="mt-4 px-2">
            <Link
              href="/generate"
              onClick={onClose}
              className="block rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-4 py-3 text-center font-semibold text-slate-900 shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:brightness-110"
              aria-label="Get started free"
            >
              Get Started Free
            </Link>
          </div>
        </nav>
      </div>

      <style jsx>{`
        @keyframes slidein {
          from { transform: translateX(100%); }
          to   { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
}
