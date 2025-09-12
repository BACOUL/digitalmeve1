// components/MobileMenu.tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  Users,
  FilePlus2,
  ShieldCheck,
  BookOpen,
  Briefcase,
  Mail,
  Info,
  X,
  CreditCard,
  Scale,
  Activity,
  Clock,
} from "lucide-react";

type Props = { open: boolean; onClose: () => void };

export default function MobileMenu({ open, onClose }: Props) {
  if (!open) return null;

  const panelRef = useRef<HTMLDivElement>(null);

  // Empêcher le scroll en arrière-plan
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // ESC pour fermer
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Focus initial accessible
  useEffect(() => {
    const first = panelRef.current?.querySelector<HTMLElement>(
      "button,[href],input,select,textarea,[tabindex]:not([tabindex='-1'])"
    );
    first?.focus();
  }, []);

  return (
    <>
      {/* overlay cliquable */}
      <div
        aria-hidden
        onClick={onClose}
        className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm"
      />

      {/* panneau clair (plus dans un Portal) */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className="fixed inset-0 z-[1000] flex flex-col bg-white"
      >
        {/* barre supérieure */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <Link href="/" onClick={onClose} className="flex items-center gap-2" aria-label="DigitalMeve Home">
            <span className="text-lg font-semibold tracking-tight">
              <span className="text-emerald-600">Digital</span>
              <span className="text-sky-600">Meve</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          >
            <X className="h-5 w-5 text-slate-700" />
          </button>
        </div>

        {/* contenu scrollable */}
        <nav className="flex-1 overflow-y-auto px-2 pb-8 pt-2 text-slate-700">
          {/* === Produits === */}
          <p className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Products
          </p>
          <ul className="space-y-2 px-1">
            <li>
              <Link
                href="/generate"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"
              >
                <FilePlus2 className="h-5 w-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span>Generate</span>
              </Link>
            </li>
            <li>
              <Link
                href="/verify"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"
              >
                <ShieldCheck className="h-5 w-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span>Verify</span>
              </Link>
            </li>
          </ul>

          <div className="my-4 h-px bg-gray-200" />

          {/* === Solutions === */}
          <p className="px-3 pt-1 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Solutions
          </p>
          <ul className="space-y-2 px-1">
            <li>
              <Link
                href="/personal"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"
              >
                <Users className="h-5 w-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span>For Individuals</span>
              </Link>
            </li>
            <li>
              <Link
                href="/pro"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"
              >
                <Briefcase className="h-5 w-5 text-sky-600 group-hover:scale-110 transition-transform" />
                <span>For Business</span>
              </Link>
            </li>
          </ul>

          <div className="my-4 h-px bg-gray-200" />

          {/* === Pricing (tarifs) === */}
          <p className="px-3 pt-1 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Pricing
          </p>
          <ul className="space-y-2 px-1">
            <li>
              <Link
                href="/pricing"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"
              >
                <CreditCard className="h-5 w-5 text-slate-700 group-hover:scale-110 transition-transform" />
                <span>Pricing</span>
              </Link>
            </li>
          </ul>

          <div className="my-4 h-px bg-gray-200" />

          {/* === Resources === */}
          <p className="px-3 pt-1 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Resources
          </p>
          <ul className="space-y-2 px-1">
            <li>
              <Link
                href="/developers"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"
              >
                <BookOpen className="h-5 w-5 text-slate-700 group-hover:scale-110 transition-transform" />
                <span>Developers</span>
              </Link>
            </li>
            <li>
              <Link
                href="/security"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"
              >
                <ShieldCheck className="h-5 w-5 text-slate-700 group-hover:scale-110 transition-transform" />
                <span>Security</span>
              </Link>
            </li>
            <li>
              <Link
                href="/status"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"
              >
                <Activity className="h-5 w-5 text-slate-700 group-hover:scale-110 transition-transform" />
                <span>Status</span>
              </Link>
            </li>
            <li>
              <Link
                href="/changelog"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"
              >
                <Clock className="h-5 w-5 text-slate-700 group-hover:scale-110 transition-transform" />
                <span>Changelog</span>
              </Link>
            </li>
          </ul>

          <div className="my-4 h-px bg-gray-200" />

          {/* === Company (Entreprise) === */}
          <p className="px-3 pt-1 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Company
          </p>
          <ul className="space-y-2 px-1">
            <li>
              <Link
                href="/about"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"
              >
                <Info className="h-5 w-5 text-slate-700 group-hover:scale-110 transition-transform" />
                <span>About</span>
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"
              >
                <Mail className="h-5 w-5 text-slate-700 group-hover:scale-110 transition-transform" />
                <span>Contact</span>
              </Link>
            </li>
            <li>
              <Link
                href="/legal"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"
              >
                <Scale className="h-5 w-5 text-slate-700 group-hover:scale-110 transition-transform" />
                <span>Legal</span>
              </Link>
            </li>
          </ul>

          {/* CTA bas du menu */}
          <div className="mt-6 px-3">
            <div className="flex gap-3">
              <Link
                href="/generate"
                onClick={onClose}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-600"
              >
                Get Started Free
              </Link>
              <Link
                href="/login"
                onClick={onClose}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl ring-1 ring-gray-200 px-4 py-2.5 text-sm font-medium text-slate-800 hover:bg-gray-50"
              >
                Sign In
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
