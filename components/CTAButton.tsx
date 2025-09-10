"use client";

import { cn } from "@/lib/utils";

export interface CTAButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function CTAButton({ children, className, ...props }: CTAButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "relative inline-flex items-center justify-center px-5 py-2.5 rounded-2xl font-semibold text-slate-900",
        "bg-gradient-to-r from-emerald-400 to-sky-400",
        "shadow-[0_0_30px_rgba(34,211,238,0.45)] hover:brightness-110",
        "transition focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2",
        className
      )}
    >
      {children}
    </button>
  );
}

// ✅ On exporte aussi par défaut (si certains fichiers utilisent import CTAButton from …)
export default CTAButton;
