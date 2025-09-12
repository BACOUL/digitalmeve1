// components/MobileMenu.tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Portal from "@/components/Portal";
import {
  Users,
  FilePlus2,
  ShieldCheck,
  Tag,
  Info,
  Globe,
  X,
} from "lucide-react";

type Props = { open: boolean; onClose: () => void };

export default function MobileMenu({ open, onClose }: Props) {
  if (!open) return null;

  const panelRef = useRef<HTMLDivElement>(null);

  // Lock scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Focus trap (first focusable)
  useEffect(() => {
    const first = panelRef.current?.querySelector<HTMLElement>(
      "button,[href],input,select,textarea,[tabindex]:not([tabindex='-1'])"
    );
    first?.focus();
  }, []);

  return (
    <Portal>
      {/* overlay cliquable */}
      <div
        aria-hidden
        onClick={onClose}
        className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm"
      />

      {/* panneau clair */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className="fixed inset-0 z-[1000] flex flex-col bg-white transition-transform duration-200"
      >
        {/* barre supérieure */}
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

        {/* contenu scrollable */}
        <nav className="flex-1 overflow-y-auto px-2 pb-8 pt-2 text-slate-700">
          <ul className="space-y-2 px-1 pt-2">
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
            <li>
              <Link
                href="/pricing"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"
              >
                <Tag className="h-5 w-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span>Pricing</span>
              </Link>
            </li>
            <li>
              <Link
                href="/security"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"
              >
                <ShieldCheck className="h-5 w-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span>Security</span>
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"
              >
                <Info className="h-5 w-5 text-sky-600 group-hover:scale-110 transition-transform" />
                <span>About</span>
              </Link>
            </li>
          </ul>

          {/* CTA principal */}
          <div className="px-3 pt-4">
            <Link
              href="/verify"
              onClick={onClose}
              className="inline-flex w-full items-center justify-center rounded-xl border border-transparent bg-gradient-to-r from-emerald-400 to-sky-400 px-4 py-3 text-sm font-semibold text-slate-900 hover:brightness-110"
            >
              Get started
            </Link>
          </div>

          {/* Lang switch */}
          <div className="mt-4 px-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-3 py-1.5 text-xs text-slate-600">
              <Globe className="h-4 w-4" />
              <span className="flex items-center gap-2">
                <Link href="/?lang=en" onClick={onClose} className="hover:text-slate-900">
                  EN
                </Link>
                <span className="text-slate-300">/</span>
                <Link href="/?lang=fr" onClick={onClose} className="hover:text-slate-900">
                  FR
                </Link>
              </span>
            </div>
          </div>

          {/* badge bas de menu */}
          <div className="mt-6 px-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-xs text-slate-600">
              <Users className="h-4 w-4" />
              Private by design · No signup
            </div>
          </div>
        </nav>
      </div>
    </Portal>
  );
              }
