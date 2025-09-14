"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import * as React from "react";

type Variants = "primary" | "secondary" | "ghost";

type BaseProps = {
  children: React.ReactNode;
  variant?: Variants;
  className?: string;
};

// Cas 1: bouton (onClick, type="button|submit")
type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

// Cas 2: lien (href)
type LinkProps = BaseProps & {
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  target?: string;
  rel?: string;
};

export type CTAButtonProps = ButtonProps | LinkProps;

export function CTAButton(props: CTAButtonProps) {
  const variant = props.variant ?? "primary";

  const classes = cn(
    "relative inline-flex items-center justify-center rounded-2xl font-semibold transition focus:outline-none",
    "px-5 py-2.5 text-sm sm:text-base",
    variant === "primary" &&
      "bg-gradient-to-r from-emerald-400 to-sky-400 text-slate-900 shadow-[0_0_30px_rgba(34,211,238,0.45)] hover:brightness-110 focus:ring-2 focus:ring-emerald-400",
    variant === "secondary" &&
      "border border-white/15 bg-white/5 text-slate-100 hover:bg-white/10 focus:ring-2 focus:ring-sky-400",
    variant === "ghost" && "text-slate-300 hover:text-white hover:bg-white/5",
    (props as any).className
  );

  // Rend un <Link> si href est fourni, sinon un <button>
  if ("href" in props && props.href) {
    const { href, children, className, variant: _v, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { children, className, variant: _v, ...rest } = props as ButtonProps;
  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}

export default CTAButton;
