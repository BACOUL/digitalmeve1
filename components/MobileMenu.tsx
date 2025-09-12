// components/MobileMenu.tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Portal from "@/components/Portal";
import {
  PlusSquare,
  ShieldCheck,
  Users,
  Building2,
  DollarSign,
  Code2,
  Shield,
  Activity,
  History,
  Info,
  Mail,
  Gavel,
  ChevronRight,
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

  // Focus first element
  useEffect(() => {
    const first = panelRef.current?.querySelector<HTMLElement>(
      "button,[href],input,select,textarea,[tabindex]:not([tabindex='-1'])"
    );
    first?.focus();
  }, []);

  return (
    <Portal>
      {/* backdrop */}
      <div
        aria-hidden
        onClick={onClose}
        className="fixed inset-0 z-[999] bg-black/30 backdrop-blur-sm"
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
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2 text-xl font-semibold text-gray-900"
          >
            <span className="text-emerald-600">Digital</span>
            <span className="text-sky-600">Meve</span>
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        {/* scrollable content */}
        <nav className="flex-1 overflow-y-auto px-2 pb-24 pt-2 text-gray-800">
          {/* PRODUCTS */}
          <Section title="PRODUCTS">
            <Row href="/generate" onClick={onClose} icon={<PlusSquare className="h-5 w-5 text-emerald-600" />}>
              <span className="font-medium text-gray-900">Generate</span>
              <span className="block text-sm text-gray-500">Create a .MEVE file</span>
            </Row>
            <Row href="/verify" onClick={onClose} icon={<ShieldCheck className="h-5 w-5 text-emerald-600" />}>
              <span className="font-medium text-gray-900">Verify</span>
              <span className="block text-sm text-gray-500">Check a .MEVE file</span>
            </Row>
          </Section>

          {/* SOLUTIONS */}
          <Section title="SOLUTIONS">
            <Row href="/personal" onClick={onClose} icon={<Users className="h-5 w-5 text-sky-600" />}>
              <span className="font-medium text-gray-900">For Individuals</span>
              <span className="block text-sm text-gray-500">Free, no storage</span>
            </Row>
            <Row href="/pro" onClick={onClose} icon={<Building2 className="h-5 w-5 text-sky-600" />}>
              <span className="font-medium text-gray-900">For Business</span>
              <span className="block text-sm text-gray-500">API & domain-verified issuer</span>
            </Row>
          </Section>

          {/* PRICING */}
          <Section title="PRICING">
            <Row href="/pricing" onClick={onClose} icon={<DollarSign className="h-5 w-5 text-gray-700" />}>
              <span className="font-medium text-gray-900">Pricing</span>
              <span className="block text-sm text-gray-500">Free for individuals</span>
            </Row>
          </Section>

          {/* RESOURCES */}
          <Section title="RESOURCES">
            <Row href="/developers" onClick={onClose} icon={<Code2 className="h-5 w-5 text-gray-700" />}>
              <span className="font-medium text-gray-900">Developers</span>
              <span className="block text-sm text-gray-500">API — coming soon</span>
            </Row>
            <Row href="/security" onClick={onClose} icon={<Shield className="h-5 w-5 text-gray-700" />}>
              <span className="font-medium text-gray-900">Security</span>
            </Row>
            <Row href="/status" onClick={onClose} icon={<Activity className="h-5 w-5 text-gray-700" />}>
              <span className="font-medium text-gray-900">Status</span>
            </Row>
            <Row href="/changelog" onClick={onClose} icon={<History className="h-5 w-5 text-gray-700" />}>
              <span className="font-medium text-gray-900">Changelog</span>
            </Row>
          </Section>

          {/* COMPANY */}
          <Section title="COMPANY">
            <Row href="/about" onClick={onClose} icon={<Info className="h-5 w-5 text-gray-700" />}>
              <span className="font-medium text-gray-900">About</span>
            </Row>
            <Row href="/contact" onClick={onClose} icon={<Mail className="h-5 w-5 text-gray-700" />}>
              <span className="font-medium text-gray-900">Contact</span>
            </Row>
            <Row href="/legal" onClick={onClose} icon={<Gavel className="h-5 w-5 text-gray-700" />}>
              <span className="font-medium text-gray-900">Legal</span>
            </Row>
          </Section>
        </nav>

        {/* bottom CTA bar */}
        <div className="pointer-events-auto fixed bottom-0 left-0 right-0 z-[1001] border-t border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
          <div className="mx-auto flex max-w-7xl gap-3 px-4 py-3">
            <Link
              href="/generate"
              onClick={onClose}
              className="flex-1 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2.5 text-white font-medium shadow-sm hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              onClick={onClose}
              className="w-[42%] inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </Portal>
  );
}

/* ---------- subcomponents ---------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-3">
      <p className="px-3 pb-2 text-xs font-semibold tracking-wide text-gray-600">{title}</p>
      <ul className="divide-y divide-gray-200 rounded-2xl border border-gray-200 overflow-hidden bg-white">
        {children}
      </ul>
    </div>
  );
}

function Row({
  href,
  onClick,
  icon,
  children,
}: {
  href: string;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className="group flex items-center justify-between gap-3 px-3 py-3.5 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
      >
        <div className="flex min-w-0 items-start gap-3">
          <div className="mt-0.5">{icon}</div>
          <div className="min-w-0">
            {/* title + optional description */}
            <div className="truncate leading-5">{children}</div>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-gray-600" />
      </Link>
    </li>
  );
}
