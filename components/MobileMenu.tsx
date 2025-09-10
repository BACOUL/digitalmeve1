"use client";

import Link from "next/link";
import { useEffect } from "react";
import { X, Users, ShieldCheck, FileText, Briefcase, HelpCircle, Mail } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";

// Si ton BrandLogo n'accepte pas className, on l'affiche sans prop.
import { BrandLogo } from "@/components/BrandLogo";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: Props) {
  // Empêche le scroll derrière le menu et nettoie à la fermeture
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] md:hidden"
    >
      {/* Overlay */}
      <button
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Drawer */}
      <div
        className="
          absolute right-0 top-0 h-full w-80 max-w-[86%] overflow-y-auto
          border-l border-white/10
          bg-[radial-gradient(120%_120%_at_100%_0%,rgba(16,185,129,0.14),rgba(56,189,248,0.10)_45%,rgba(2,6,23,0.92)_70%)]
          shadow-[0_0_50px_rgba(34,211,238,0.18)] backdrop-blur-xl
          animate-[slidein_.22s_ease] will-change-transform
        "
        style={{
          // petite animation d’entrée
          // @ts-ignore – keyframes utilitaires
          "--tw-translate-x": "0",
        } as any}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <BrandLogo />
            <span className="font-medium text-slate-100">DigitalMeve</span>
          </Link>
          <button
            aria-label="Close"
            onClick={onClose}
            className="rounded-xl border border-white/10 p-2 text-slate-300 hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sections */}
        <nav className="px-3 pb-6">
          {/* Individuals */}
          <div className="px-1 py-2 text-xs uppercase tracking-wide text-slate-400">
            Individuals
          </div>
          <ul className="space-y-1">
            <li>
              <Link
                href="/generate"
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/10"
              >
                <FileText className="h-5 w-5 text-emerald-300" />
                <span>Generate</span>
              </Link>
            </li>
            <li>
              <Link
                href="/verify"
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/10"
              >
                <ShieldCheck className="h-5 w-5 text-sky-300" />
                <span>Verify</span>
              </Link>
            </li>
            <li>
              <Link
                href="/personal"
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/10"
              >
                <Users className="h-5 w-5 text-emerald-300" />
                <span>For Individuals</span>
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/10"
              >
                <HelpCircle className="h-5 w-5 text-slate-300" />
                <span>FAQ</span>
              </Link>
            </li>
          </ul>

          {/* Professionals */}
          <div className="mt-5 px-1 py-2 text-xs uppercase tracking-wide text-slate-400">
            Professionals
          </div>
          <ul className="space-y-1">
            <li>
              <Link
                href="/pro"
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/10"
              >
                <Briefcase className="h-5 w-5 text-sky-300" />
                <span>Overview</span>
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/10"
              >
                <Mail className="h-5 w-5 text-slate-300" />
                <span>Contact</span>
              </Link>
            </li>
          </ul>

          {/* CTA */}
          <div className="mt-6 space-y-2 px-1">
            <Link href="/generate" onClick={onClose} className="inline-flex w-full">
              <CTAButton aria-label="Start Free" className="w-full justify-center">
                Start Free
              </CTAButton>
            </Link>
            <Link
              href="/pro"
              onClick={onClose}
              className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm hover:bg-white/10"
            >
              For Professionals
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
