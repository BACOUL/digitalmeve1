"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Portal from "@/components/Portal";
import { X, ChevronRight, BadgePlus, ShieldCheck, Code2, Building2, Users, DollarSign, Info } from "lucide-react";

type Props = { open: boolean; onClose: () => void };

export default function MobileMenu({ open, onClose }: Props) {
  if (!open) return null;

  const panelRef = useRef<HTMLDivElement>(null);

  // no scroll behind
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

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="py-3">
      <h2 className="px-4 pb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">{title}</h2>
      <ul className="divide-y divide-gray-100 bg-white">{children}</ul>
    </div>
  );

  const Row = ({
    href,
    label,
    sub,
    icon,
  }: {
    href: string;
    label: string;
    sub?: string;
    icon?: React.ReactNode;
  }) => (
    <li>
      <Link
        href={href}
        onClick={onClose}
        className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-gray-50"
      >
        <span className="shrink-0">{icon}</span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium">{label}</p>
          {sub && <p className="truncate text-sm text-gray-500">{sub}</p>}
        </div>
        <ChevronRight className="h-5 w-5 text-gray-300" aria-hidden />
      </Link>
    </li>
  );

  return (
    <Portal>
      {/* overlay */}
      <div aria-hidden onClick={onClose} className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm" />

      {/* panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className="fixed inset-0 z-[1000] flex flex-col bg-white"
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
          <Link href="/" onClick={onClose} className="flex items-center gap-2" aria-label="DigitalMeve">
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
            <X className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        {/* content */}
        <nav className="flex-1 overflow-y-auto pb-24">
          <Section title="Products">
            <Row href="/generate" label="Generate" sub="Create a .MEVE file" icon={<BadgePlus className="h-5 w-5 text-emerald-600" />} />
            <Row href="/verify" label="Verify" sub="Check a .MEVE file" icon={<ShieldCheck className="h-5 w-5 text-emerald-600" />} />
          </Section>

          <Section title="Solutions">
            <Row href="/personal" label="For Individuals" sub="Free, no storage" icon={<Users className="h-5 w-5 text-sky-600" />} />
            <Row href="/pro" label="For Business" sub="API & domain-verified issuer" icon={<Building2 className="h-5 w-5 text-sky-600" />} />
          </Section>

          <Section title="Pricing">
            <Row href="/pricing" label="Pricing" sub="Free for individuals" icon={<DollarSign className="h-5 w-5 text-gray-400" />} />
          </Section>

          <Section title="Resources">
            <Row href="/developers" label="Developers" sub="API — coming soon" icon={<Code2 className="h-5 w-5 text-gray-400" />} />
            <Row href="/security" label="Security" sub="Private by design" icon={<ShieldCheck className="h-5 w-5 text-gray-400" />} />
            <Row href="/status" label="Status" sub="App • Verify • API" icon={<Info className="h-5 w-5 text-gray-400" />} />
            <Row href="/changelog" label="Changelog" sub="Releases & updates" icon={<Info className="h-5 w-5 text-gray-400" />} />
          </Section>

          <Section title="Company">
            <Row href="/about" label="About" icon={<Info className="h-5 w-5 text-gray-400" />} />
            <Row href="/contact" label="Contact" icon={<Info className="h-5 w-5 text-gray-400" />} />
            <Row href="/legal" label="Legal" icon={<Info className="h-5 w-5 text-gray-400" />} />
          </Section>
        </nav>

        {/* bottom sticky CTA bar */}
        <div className="pointer-events-auto fixed inset-x-0 bottom-0 z-[1001] border-t border-gray-200 bg-white/95 p-3 backdrop-blur">
          <div className="mx-auto flex max-w-7xl gap-3 px-1">
            <Link
              href="/generate"
              onClick={onClose}
              className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-3 text-center font-medium text-white shadow-sm hover:brightness-105"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-center font-medium text-gray-800 hover:bg-gray-50"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </Portal>
  );
}
