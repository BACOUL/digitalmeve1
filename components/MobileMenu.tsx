"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Portal from "@/components/Portal";
import { Users, FilePlus2, ShieldCheck, BookOpen, Briefcase, Mail, Info, X } from "lucide-react";

type Props = { open: boolean; onClose: () => void };

export default function MobileMenu({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  if (!open) return null;

  // 🔒 Lock scroll pendant l’ouverture + cleanup sûr
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prevOverflow; };
  }, []);

  // ESC pour fermer
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Focus initial (soft, sans trap agressif)
  useEffect(() => {
    panelRef.current?.querySelector<HTMLElement>("button,[href]")?.focus?.();
  }, []);

  const close = () => onClose();

  return (
    <Portal>
      {/* Overlay cliquable */}
      <div
        aria-hidden
        onClick={close}
        className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm"
      />
      {/* Panneau */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className="fixed inset-0 z-[1000] flex flex-col bg-white"
      >
        {/* Barre supérieure */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <Link href="/" onClick={close} className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tight">
              <span className="text-emerald-600">Digital</span>
              <span className="text-sky-600">Meve</span>
            </span>
          </Link>
          <button
            onClick={close}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          >
            <X className="h-5 w-5 text-slate-700" />
          </button>
        </div>

        {/* Liens (scrollable) */}
        <nav className="flex-1 overflow-y-auto px-2 pb-24 pt-2 text-slate-700" aria-label="Mobile">
          {/* PRODUCTS */}
          <p className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Products</p>
          <ul className="space-y-2 px-1">
            <li>
              <Link href="/generate" onClick={close} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50">
                <FilePlus2 className="h-5 w-5 text-emerald-600" /> <span>Generate</span>
              </Link>
            </li>
            <li>
              <Link href="/verify" onClick={close} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50">
                <ShieldCheck className="h-5 w-5 text-emerald-600" /> <span>Verify</span>
              </Link>
            </li>
          </ul>

          <div className="my-4 h-px bg-gray-200" />

          {/* SOLUTIONS */}
          <p className="px-3 pt-1 pb-1 text-xs font-semibold uppercase tracking-wide text-sky-600">Solutions</p>
          <ul className="space-y-2 px-1">
            <li>
              <Link href="/personal" onClick={close} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50">
                <Users className="h-5 w-5 text-sky-600" /> <span>For Individuals</span>
              </Link>
            </li>
            <li>
              <Link href="/pro" onClick={close} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50">
                <Briefcase className="h-5 w-5 text-sky-600" /> <span>For Business</span>
              </Link>
            </li>
          </ul>

          <div className="my-4 h-px bg-gray-200" />

          {/* RESOURCES */}
          <p className="px-3 pt-1 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Resources</p>
          <ul className="space-y-2 px-1">
            <li><Link href="/pricing" onClick={close} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"><BookOpen className="h-5 w-5 text-slate-600" /> <span>Pricing</span></Link></li>
            <li><Link href="/developers" onClick={close} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"><BookOpen className="h-5 w-5 text-slate-600" /> <span>Developers</span></Link></li>
            <li><Link href="/security" onClick={close} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"><ShieldCheck className="h-5 w-5 text-slate-600" /> <span>Security</span></Link></li>
            <li><Link href="/status" onClick={close} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"><Info className="h-5 w-5 text-slate-600" /> <span>Status</span></Link></li>
            <li><Link href="/changelog" onClick={close} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"><BookOpen className="h-5 w-5 text-slate-600" /> <span>Changelog</span></Link></li>
          </ul>

          <div className="my-4 h-px bg-gray-200" />

          {/* COMPANY */}
          <p className="px-3 pt-1 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Company</p>
          <ul className="space-y-2 px-1">
            <li><Link href="/about" onClick={close} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"><Info className="h-5 w-5 text-slate-600" /> <span>About</span></Link></li>
            <li><Link href="/contact" onClick={close} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"><Mail className="h-5 w-5 text-slate-600" /> <span>Contact</span></Link></li>
            <li><Link href="/legal" onClick={close} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50"><BookOpen className="h-5 w-5 text-slate-600" /> <span>Legal</span></Link></li>
          </ul>

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
