"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X, ArrowRight, Users, ShieldCheck, FilePlus2, HelpCircle, Briefcase
} from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

type Props = { open: boolean; onClose: () => void };

export function MobileMenu({ open, onClose }: Props) {
  const pathname = usePathname();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Scroll lock + Focus & ESC
  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("overflow-hidden");
    const t = setTimeout(() => firstLinkRef.current?.focus(), 80);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.documentElement.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  // 🔹 Menu ESSENTIEL, différencié Particuliers / Pros, sans 404
  const groups: {
    title: string;
    items: { href: string; label: string; icon: JSX.Element }[];
  }[] = [
    {
      title: "Individuals",
      items: [
        { href: "/", label: "Home", icon: <Users className="h-5 w-5" aria-hidden /> },
        { href: "/#how-it-works", label: "How it works", icon: <HelpCircle className="h-5 w-5" aria-hidden /> },
        { href: "/personal#examples", label: "Examples", icon: <Users className="h-5 w-5" aria-hidden /> },
        { href: "/personal#faq", label: "FAQ", icon: <HelpCircle className="h-5 w-5" aria-hidden /> },
        { href: "/generate", label: "Generate (Start free)", icon: <FilePlus2 className="h-5 w-5" aria-hidden /> },
        { href: "/verify", label: "Verify a document", icon: <ShieldCheck className="h-5 w-5" aria-hidden /> },
      ],
    },
    {
      title: "Professionals",
      items: [
        { href: "/pro", label: "Overview", icon: <Briefcase className="h-5 w-5" aria-hidden /> },
        { href: "/pro#pricing", label: "Pricing", icon: <Briefcase className="h-5 w-5" aria-hidden /> },
        { href: "/pro#contact", label: "Contact Sales", icon: <ArrowRight className="h-5 w-5" aria-hidden /> },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Mobile menu">
      {/* Overlay */}
      <button
        aria-label="Close menu"
        className="absolute inset-0 bg-gradient-to-br from-black/70 via-slate-950/65 to-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel glass + glow */}
      <div
        className="absolute right-0 top-0 h-full w-80 max-w-[86%] overflow-y-auto border-l border-white/10
        bg-[radial-gradient(120%_120%_at_100%_0%,rgba(16,185,129,0.14),rgba(56,189,248,0.10)_45%,rgba(2,6,23,0.92)_70%)]
        shadow-[0_0_50px_rgba(34,211,238,0.18)] backdrop-blur-xl animate-[slidein_.22s_ease] will-change-transform"
      >
        {/* Brand + Close */}
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <BrandLogo className="h-6 w-6" />
            <span className="font-medium text-slate-100">DigitalMeve</span>
          </Link>
          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 p-2 text-slate-300 hover:bg-white/10"
            aria-label="Close"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        {/* Groups */}
        <nav className="mt-2 px-2 pb-6">
          {groups.map((group) => (
            <div key={group.title} className="mb-5">
              <div className="px-3 pb-2 text-xs uppercase tracking-wide text-slate-400/80">
                {group.title}
              </div>
              <ul className="space-y-1">
                {group.items.map((item, i) => {
                  const active =
                    pathname === item.href ||
                    (item.href.includes("#") && pathname === item.href.split("#")[0]);
                  return (
                    <li key={item.href}>
                      <Link
                        ref={i === 0 ? firstLinkRef : undefined}
                        href={item.href}
                        onClick={onClose}
                        className={`group flex items-center justify-between rounded-xl px-3 py-3 text-base outline-none transition
                          ${active ? "bg-white/10 text-slate-100" : "text-slate-200 hover:bg-white/5 focus:bg-white/10"}`}
                      >
                        <span className="flex items-center gap-3">
                          {item.icon}
                          {item.label}
                        </span>
                        <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-slate-200" aria-hidden />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* CTA en bas — Individuals d’abord */}
          <div className="mt-6 px-1">
            <Link
              href="/generate"
              onClick={onClose}
              className="block rounded-2xl px-4 py-3 text-center text-slate-900 font-medium
              bg-gradient-to-r from-emerald-400 to-sky-400 shadow-[0_0_36px_rgba(34,211,238,0.28)] hover:brightness-110 transition"
            >
              Start now — it’s free
            </Link>
            <p className="mt-2 text-center text-xs text-slate-500">No signup · Instant proof</p>
          </div>
        </nav>
      </div>

      <style jsx>{`
        @keyframes slidein {
          from { transform: translateX(22%); opacity: 0.6; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
    }
