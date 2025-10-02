// components/CTAButton.tsx
"use client";

import * as React from "react";
import Link, { type LinkProps as NextLinkProps } from "next/link";
import { cn } from "@/lib/utils";

/* =========================
 * Types
 * ========================= */

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg" | "xl";

type BaseProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  // Pour a11y (spinner)
  loadingLabel?: string;
  className?: string;
};

// Bouton
type ButtonOnlyProps = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    href?: never;
  };

// Lien Next.js (client)
type AnchorOnlyProps = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href"> &
  Pick<
    NextLinkProps,
    "href" | "prefetch" | "replace" | "scroll" | "shallow" | "locale"
  > & {
    // Pour simuler disabled côté <a> on utilisera aria-disabled + preventDefault
    disabled?: boolean;
  };

export type CTAButtonProps = ButtonOnlyProps | AnchorOnlyProps;

/* =========================
 * Styles
 * ========================= */

function variantClasses(variant: Variant) {
  switch (variant) {
    case "primary":
      return "bg-gradient-to-r from-emerald-400 to-sky-400 text-slate-900 shadow-[0_0_30px_rgba(34,211,238,0.45)] hover:brightness-110 focus-visible:ring-2 focus-visible:ring-emerald-400 disabled:opacity-60";
    case "secondary":
      return "border border-white/15 bg-white/5 text-slate-100 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-sky-400 disabled:opacity-60";
    case "ghost":
    default:
      return "text-slate-300 hover:text-white hover:bg-white/5 disabled:opacity-60";
  }
}

function sizeClasses(size: Size) {
  switch (size) {
    case "sm":
      return "px-3 py-2 text-xs rounded-xl";
    case "lg":
      return "px-6 py-3 text-base rounded-2xl";
    case "xl":
      return "px-7 py-3.5 text-lg rounded-2xl";
    case "md":
    default:
      return "px-5 py-2.5 text-sm sm:text-base rounded-2xl";
  }
}

/* =========================
 * Component
 * ========================= */

export const CTAButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  CTAButtonProps
>(function CTAButton(props, ref) {
  const {
    variant = "primary",
    size = "md",
    fullWidth,
    leftIcon,
    rightIcon,
    loading = false,
    loadingLabel = "Loading…",
    className,
    children,
    ...rest
  } = props as CTAButtonProps;

  const base = cn(
    "relative inline-flex items-center justify-center font-semibold transition focus:outline-none select-none",
    "focus-visible:outline-none",
    variantClasses(variant),
    sizeClasses(size),
    fullWidth && "w-full",
    className
  );

  // Spinner minimal (sans dépendance)
  const Spinner = (
    <svg className="h-[1em] w-[1em] animate-spin" viewBox="0 0 24 24" aria-hidden="true">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        fill="currentColor"
      />
    </svg>
  );

  // Cas <Link> (AnchorOnlyProps)
  if ("href" in (props as AnchorOnlyProps) && (props as AnchorOnlyProps).href) {
    const {
      href,
      target,
      rel,
      onClick,
      disabled,
      prefetch,
      replace,
      scroll,
      shallow,
      locale,
      ...anchorRest
    } = rest as AnchorOnlyProps;

    // sécurise _blank
    const safeRel = target === "_blank" ? rel ?? "noopener noreferrer" : rel;

    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
      if (disabled || loading) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      onClick?.(e);
    };

    return (
      <Link
        href={href}
        prefetch={prefetch}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        locale={locale}
        className={base}
        target={target}
        rel={safeRel}
        onClick={handleClick}
        aria-disabled={disabled || undefined}
        aria-busy={loading || undefined}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...anchorRest}
      >
        {leftIcon && !loading && <span className="mr-2 inline-flex">{leftIcon}</span>}
        {loading && (
          <span className="mr-2 inline-flex" aria-hidden>
            {Spinner}
          </span>
        )}
        <span>{loading ? loadingLabel : children}</span>
        {rightIcon && !loading && <span className="ml-2 inline-flex">{rightIcon}</span>}
      </Link>
    );
  }

  // Cas <button> natif (ButtonOnlyProps)
  const { type = "button", disabled, onClick, ...btnRest } = rest as ButtonOnlyProps;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={base}
      onClick={onClick}
      ref={ref as React.Ref<HTMLButtonElement>}
      {...btnRest}
    >
      {leftIcon && !loading && <span className="mr-2 inline-flex">{leftIcon}</span>}
      {loading && (
        <span className="mr-2 inline-flex" aria-hidden>
          {Spinner}
        </span>
      )}
      <span>{loading ? loadingLabel : children}</span>
      {rightIcon && !loading && <span className="ml-2 inline-flex">{rightIcon}</span>}
    </button>
  );
});

export default CTAButton;
