"use client";
import { useEffect, useState } from "react";
import Script from "next/script";

type Props = {
  domain: string; // ex: "digitalmeve.com" ou ton domaine Vercel
  src?: string;   // plausible CDN par défaut
};

const LS_KEY = "dmv_cookie_consent";

export default function AnalyticsGate({ domain, src = "https://plausible.io/js/script.js" }: Props) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    // Etat initial
    try { setAllowed(localStorage.getItem(LS_KEY) === "all"); } catch {}
    // Ecoute les changements (depuis la bannière)
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setAllowed(detail === "all");
    };
    window.addEventListener("dmv-consent-changed", onChange as EventListener);
    return () => window.removeEventListener("dmv-consent-changed", onChange as EventListener);
  }, []);

  if (!allowed) return null;

  // Chargement cookieless de Plausible après consentement
  return (
    <Script
      id="plausible"
      defer
      data-domain={domain}
      src={src}
      strategy="afterInteractive"
    />
  );
}
