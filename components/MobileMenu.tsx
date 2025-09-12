// components/MobileMenu.tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Portal from "@/components/Portal";
import {
  PlusSquare,
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
  Cookie,
  X,
  ChevronRight,
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

  // focus first interactive
  useEffect(() => {
    const first = panelRef.current?.querySelector<HTMLElement>(
      "button,[href],input,select,textarea,[tabindex]:not([tabindex='-1'])"
    );
    first?.focus();
  }, []);

  const Row = ({
    href,
    icon,
    label,
    hint,
    onClick,
  }: {
    href: string;
    icon: JSX.Element;
    label: string;
    hint?: string;
    onClick?: () => void;
  }) => (
    <li>
      <Link
        href={href}
        onClick={() => {
          onClick?.();
          onClose();
        }}
        className="group flex items-center justify-between rounded-2xl px-3 py-3.5 hover:bg-gray-50"
      >
        <div className="min-w-0 flex items-center gap-3">
          <span className="shrink-0">{icon}</span>
          <div className="min-w-0">
            <p className="truncate text-base text-gray-900">{label}</p>
            {hint && (
              <p className="truncate text-sm text-gray-500">{hint}</p>
            )}
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-gray-400" />
      </Link>
    </li>
  );

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="px-3">
      <p className="px-1 pt-4 pb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
        {title}
      </p>
      <ul className="space-y-1.5">{children}</ul>
    </div>
  );

  return (
    <Portal>
      {/* overlay */}
      <button
        aria-label="Close menu"
        onClick={onClose}
        className="fixed inset-0 z-[998] bg-black/40 backdrop-blur-sm"
      />
      {/* panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className="fixed inset-0 z-[999] flex flex-col bg-white"
      >
        {/* top bar */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2"
            aria-label="DigitalMeve Home"
          >
            <span className="text-lg font-semibold tracking-tight">
              <span className="text-emerald-600">Digital</span>
              <span className="text-sky-600">Meve</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        {/* content */}
        <nav className="flex-1 overflow-y-auto py-2">
          <Section title="Actions">
            <Row
              href="/generate"
              icon={<PlusSquare className="h-5 w-5 text-emerald-600" />}
              label="Generate"
              hint="Create a certified copy"
            />
            <Row
              href="/verify"
              icon={<ShieldCheck className="h-5 w-5 text-emerald-600" />}
              label="Verify"
              hint="Check a .MEVE document"
            />
          </Section>

          <div className="my-4 h-px bg-gray-200" />

          <Section title="Products">
            <Row
              href="/pricing"
              icon={<Tag className="h-5 w-5 text-sky-600" />}
              label="Pricing"
              hint="Free for individuals"
            />
            <Row
              href="/developers"
              icon={<Code2 className="h-5 w-5 text-sky-600" />}
              label="Developers"
              hint="API — coming soon"
            />
          </Section>

          <div className="my-4 h-px bg-gray-200" />

          <Section title="Company">
            <Row
              href="/security"
              icon={<Shield className="h-5 w-5 text-gray-600" />}
              label="Security"
            />
            <Row
              href="/about"
              icon={<Info className="h-5 w-5 text-gray-600" />}
              label="About"
            />
            <Row
              href="/status"
              icon={<Activity className="h-5 w-5 text-gray-600" />}
              label="Status"
            />
            <Row
              href="/changelog"
              icon={<History className="h-5 w-5 text-gray-600" />}
              label="Changelog"
            />
            <Row
              href="/contact"
              icon={<Mail className="h-5 w-5 text-gray-600" />}
              label="Contact"
            />
          </Section>

          <div className="my-4 h-px bg-gray-200" />

          <Section title="Legal">
            <Row
              href="/privacy"
              icon={<FileText className="h-5 w-5 text-gray-600" />}
              label="Privacy"
            />
            <Row
              href="/terms"
              icon={<Scale className="h-5 w-5 text-gray-600" />}
              label="Terms"
            />
            <Row
              href="/cookies"
              icon={<Cookie className="h-5 w-5 text-gray-600" />}
              label="Cookies"
            />
          </Section>
        </nav>

        {/* bottom badge */}
        <div className="border-t border-gray-200 px-4 py-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-xs text-gray-700">
            <Users className="h-4 w-4" />
            Free for Individuals
          </div>
        </div>
      </div>
    </Portal>
  );
        }
