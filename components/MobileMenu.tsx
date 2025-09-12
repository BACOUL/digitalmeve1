// components/MobileMenu.tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Portal from "@/components/Portal";
import {
  FilePlus2,
  ShieldCheck,
  Tag,
  Code2,
  Shield,
  Info,
  Activity,
  History,
  Mail,
  Scale,
  FileText,
  Lock,
  Cookie,
  X,
  Users,
} from "lucide-react";

type Props = { open: boolean; onClose: () => void };

export default function MobileMenu({ open, onClose }: Props) {
  if (!open) return null;

  const panelRef = useRef<HTMLDivElement>(null);

  // lock scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // esc to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // focus first actionable
  useEffect(() => {
    const first = panelRef.current?.querySelector<HTMLElement>(
      "button,[href],input,select,textarea,[tabindex]:not([tabindex='-1'])"
    );
    first?.focus();
  }, []);

  return (
    <Portal>
      {/* overlay */}
      <div
        aria-hidden
        onClick={onClose}
        className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm"
      />

      {/* panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className="fixed inset-0 z-[1000] flex flex-col bg-white"
      >
        {/* top bar */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
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

        {/* scrollable content */}
        <nav className="flex-1 overflow-y-auto px-2 pb-8 pt-2 text-slate-700">
          {/* ACTIONS */}
          <p className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-emerald-600">
            Actions
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

          {/* PRODUITS (roadmap) */}
          <p className="px-3 pt-1 pb-1 text-xs font-semibold uppercase tracking-wide text-sky-600">
            Products
          </p>
          <ul className="space-y-2 px-1">
            <li>
              <Link
                href="/pricing"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"
              >
                <Tag className="h-5 w-5 text-sky-600" />
                <span>Pricing</span>
              </Link>
            </li>
            <li>
              <Link
                href="/developers"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"
              >
                <Code2 className="h-5 w-5 text-sky-600" />
                <span>Developers (coming soon)</span>
              </Link>
            </li>
          </ul>

          <div className="my-4 h-px bg-gray-200" />

          {/* SOCIÉTÉ */}
          <p className="px-3 pt-1 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
            Company
          </p>
          <ul className="space-y-2 px-1">
            <li>
              <Link
                href="/security"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"
              >
                <Shield className="h-5 w-5 text-slate-600" />
                <span>Security</span>
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"
              >
                <Info className="h-5 w-5 text-slate-600" />
                <span>About</span>
              </Link>
            </li>
            <li>
              <Link
                href="/status"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"
              >
                <Activity className="h-5 w-5 text-slate-600" />
                <span>Status</span>
              </Link>
            </li>
            <li>
              <Link
                href="/changelog"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"
              >
                <History className="h-5 w-5 text-slate-600" />
                <span>Changelog</span>
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"
              >
                <Mail className="h-5 w-5 text-slate-600" />
                <span>Contact</span>
              </Link>
            </li>
          </ul>

          <div className="my-4 h-px bg-gray-200" />

          {/* LÉGAL */}
          <p className="px-3 pt-1 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
            Legal
          </p>
          <ul className="space-y-2 px-1">
            <li>
              <Link
                href="/terms"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"
              >
                <FileText className="h-5 w-5 text-slate-600" />
                <span>Terms</span>
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"
              >
                <Lock className="h-5 w-5 text-slate-600" />
                <span>Privacy</span>
              </Link>
            </li>
            <li>
              <Link
                href="/cookies"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"
              >
                <Cookie className="h-5 w-5 text-slate-600" />
                <span>Cookies</span>
              </Link>
            </li>
            <li>
              <Link
                href="/legal"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"
              >
                <Scale className="h-5 w-5 text-slate-600" />
                <span>Imprint / Legal</span>
              </Link>
            </li>
          </ul>

          {/* badge bas de menu */}
          <div className="mt-6 px-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-xs text-slate-600">
              <Users className="h-4 w-4" />
              Private by design · No storage
            </div>
          </div>
        </nav>
      </div>
    </Portal>
  );
              }
