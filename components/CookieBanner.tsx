"use client";
import { useEffect, useState } from "react";

const LS_KEY = "dmv_cookie_consent"; // "all" | "necessary"

export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      if (!stored) setOpen(true);
    } catch {
      // localStorage indisponible (SSR/Strict) -> ne rien faire
    }
  }, []);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      aria-modal="true"
      className="fixed bottom-4 inset-x-0 z-[60] px-4"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-[var(--border,#e5e7eb)] bg-white p-4 text-[var(--fg,#111)] shadow">
        <h2 id="cookie-title" className="sr-only">Cookie consent</h2>
        <p id="cookie-desc" className="text-sm">
          We use only necessary cookies and optional, privacy-friendly analytics (cookieless).
          Read our <a className="underline" href="/cookies">Cookie Policy</a>.
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            className="rounded-xl bg-black px-4 py-2 text-white"
            onClick={() => {
              try { localStorage.setItem(LS_KEY, "all"); } finally {
                window.dispatchEvent(new CustomEvent("dmv-consent-changed", { detail: "all" }));
                setOpen(false);
              }
            }}
          >
            Accept analytics
          </button>
          <button
            className="rounded-xl border px-4 py-2"
            onClick={() => {
              try { localStorage.setItem(LS_KEY, "necessary"); } finally {
                window.dispatchEvent(new CustomEvent("dmv-consent-changed", { detail: "necessary" }));
                setOpen(false);
              }
            }}
          >
            Necessary only
          </button>
        </div>
      </div>
    </div>
  );
}
