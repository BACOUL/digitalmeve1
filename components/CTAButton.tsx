"use client";

import { cn } from "@/lib/utils";

export interface CTAButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}

export function CTAButton({
  children,
  className,
  variant = "primary",
  disabled,
  ...props
}: CTAButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(
        "relative inline-flex items-center justify-center rounded-2xl font-semibold transition focus:outline-none",
        // tailles par défaut
        "px-5 py-2.5 text-sm sm:text-base",
        // variantes
        variant === "primary" &&
          "bg-gradient-to-r from-emerald-400 to-sky-400 text-slate-900 shadow-[0_0_30px_rgba(34,211,238,0.45)] hover:brightness-110 focus:ring-2 focus:ring-emerald-400",
        variant === "secondary" &&
          "border border-white/15 bg-white/5 text-slate-100 hover:bg-white/10 focus:ring-2 focus:ring-sky-400",
        variant === "ghost" &&
          "text-slate-300 hover:text-white hover:bg-white/5",
        // états disabled
        disabled &&
          "opacity-50 cursor-not-allowed shadow-none hover:brightness-100 hover:bg-inherit",
        className
      )}
    >
      {children}
    </button>
  );
}

export default CTAButton;
