// app/generate/page.tsx — v2 (Premium UX: mesh + parallax, morphing button, sticky aside)
// - No Issuer (paid-only)
// - Simple wording, consistent with site (subtle visible mark + invisible proof)
// - Original file lightly stamped + invisible proof + HTML certificate
// - Monthly quota (5) with anti-abuse note (anonymous token)
// - PDF/DOCX supported today; others “coming soon” message
// - A11y: aria-live, prefers-reduced-motion guards
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Upload,
  FileDown,
  FileCheck2,
  ShieldCheck,
  Lock,
  Clipboard,
  XCircle,
  CheckCircle2,
  BadgeCheck,
  AlertCircle,
} from "lucide-react";
import FileDropzone from "@/components/FileDropzone";

// Existing libs (PDF/DOCX)
import { addWatermarkPdf } from "@/lib/watermark-pdf";
import { sha256Hex } from "@/lib/meve-xmp";
import { exportHtmlCertificate } from "@/lib/certificate-html";
import { embedInvisibleWatermarkPdf } from "@/lib/wm/pdf";
import { embedInvisibleWatermarkDocx } from "@/lib/wm/docx";

// Quota (monthly)
import LimitModal from "@/components/LimitModal";
import { checkFreeQuota } from "@/lib/quotaClient";

type Kind =
  | "pdf" | "docx" | "pptx" | "xlsx"
  | "png" | "jpg" | "jpeg"
  | "mp4" | "zip"
  | "other";

type GenResult = {
  outBlob?: Blob;
  fileName?: string;
  hash?: string;
  whenISO?: string;
};

type Toast = { type: "success" | "error" | "info"; message: string } | null;

function guessKind(f: File): Kind {
  const name = (f.name || "").toLowerCase();
  const mt = (f.type || "").toLowerCase();
  if (mt === "application/pdf" || name.endsWith(".pdf")) return "pdf";
  if (mt === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || name.endsWith(".docx")) return "docx";
  if (mt === "application/vnd.openxmlformats-officedocument.presentationml.presentation" || name.endsWith(".pptx")) return "pptx";
  if (mt === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || name.endsWith(".xlsx")) return "xlsx";
  if (mt.startsWith("image/png") || name.endsWith(".png")) return "png";
  if (mt.startsWith("image/jpeg") || name.endsWith(".jpg") || name.endsWith(".jpeg")) return "jpeg";
  if (mt.startsWith("video/mp4") || name.endsWith(".mp4")) return "mp4";
  if (mt === "application/zip" || name.endsWith(".zip")) return "zip";
  return "other";
}

export default function GeneratePage() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<number>(0); // UI-only progress (morph)
  const [res, setRes] = useState<GenResult>({});

  // Quota (monthly)
  const [limitOpen, setLimitOpen] = useState(false);
  const [quotaCount, setQuotaCount] = useState<number | undefined>();
  const [quotaResetDay, setQuotaResetDay] = useState<string | undefined>();
  const [quotaRemaining, setQuotaRemaining] = useState<number | undefined>();

  // UX bits
  const [toast, setToast] = useState<Toast>(null);
  const [dragOver, setDragOver] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);

  const cancelRef = useRef(false);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const kind = useMemo<Kind>(() => (file ? guessKind(file) : "other"), [file]);

  // Mesh parallax (scroll)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      document.documentElement.style.setProperty("--parallax-y1", `${Math.min(12, y * 0.04)}px`);
      document.documentElement.style.setProperty("--parallax-y2", `${Math.min(18, y * 0.08)}px`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection animations (stagger) — respect reduced motion
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const i = Number(el.getAttribute("data-io") || 0);
            el.style.transitionDelay = `${80 + i * 90}ms`;
            el.classList.add("io-in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll<HTMLElement>(".io").forEach((el, i) => {
      el.setAttribute("data-io", String(i));
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Skeleton if heavy processing (>300ms)
  useEffect(() => {
    if (!busy) { setShowSkeleton(false); return; }
    const id = setTimeout(() => setShowSkeleton(true), 300);
    return () => clearTimeout(id);
  }, [busy]);

  // Dropzone hover handlers
  const onDZEnter = () => setDragOver(true);
  const onDZLeave = () => setDragOver(false);

  function humanError(e: unknown) {
    const msg = (e as any)?.message || "";
    if (/pdf|docx|type/i.test(msg)) return "Only PDF or DOCX are supported right now. Other formats are coming soon.";
    if (/size|10 ?mb/i.test(msg)) return "Max size is 10 MB.";
    return "Something went wrong while generating the certificate.";
  }

  function toCertifiedName(name: string, ext: "pdf" | "docx") {
    const m = name.match(/^(.+)\.([^.]+)$/);
    const base = m ? m[1] : name;
    return `${base}.certified.${ext}`;
  }

  async function onGenerate() {
    if (!file || busy) return;
    setBusy(true);
    setToast(null);
    setProgress(0);
    cancelRef.current = false;

    const end = (opts?: Toast) => {
      setBusy(false);
      setProgress(100);
      if (opts) setToast(opts);
      if (opts) setTimeout(() => setToast(null), 3500);
      // return focus to the button for a11y
      try {
        const btn = document.getElementById("btn-protect");
        btn?.focus();
      } catch {}
    };

    // UI progress ticker (fake but pleasing)
    const progId = window.setInterval(() => {
      setProgress((p) => {
        if (!busy) return p;
        // slow approach to ~85% until completion
        const next = p < 85 ? p + Math.max(1, (85 - p) * 0.08) : p + 0.5;
        return Math.min(95, next);
      });
    }, 120);

    try {
      // Monthly quota (5) — server sees only an anonymous token, never your file
      try {
        const q = await checkFreeQuota();
        setQuotaRemaining(q.remaining);
        setQuotaCount(q.count);
        setQuotaResetDay(q.resetDayUTC);
      } catch (err: any) {
        if (err?.quota?.reason === "limit_reached") {
          setQuotaCount(err.quota.count);
          setQuotaResetDay(err.quota.resetDayUTC);
          setLimitOpen(true);
          window.clearInterval(progId);
          return end();
        }
      }

      if (cancelRef.current) {
        window.clearInterval(progId);
        return end({ type: "info", message: "Cancelled." });
      }

      const k = kind;
      const t0 = performance.now();
      const hash = await sha256Hex(file);
      const whenISO = new Date().toISOString();

      if (cancelRef.current) {
        window.clearInterval(progId);
        return end({ type: "info", message: "Cancelled." });
      }

      let outBlob: Blob | undefined;
      let outName = file.name;

      if (k === "pdf") {
        // Visible watermark + Invisible proof (hash + DM key)
        const watermarkedAB = await addWatermarkPdf(file);
        const watermarkedBlob = new Blob([watermarkedAB], { type: "application/pdf" });

        if (cancelRef.current) {
          window.clearInterval(progId);
          return end({ type: "info", message: "Cancelled." });
        }

        outBlob = await embedInvisibleWatermarkPdf(watermarkedBlob, {
          hash,
          ts: whenISO,
          // issuer reserved for paid → not included here
        });
        outName = toCertifiedName(file.name, "pdf");
      } else if (k === "docx") {
        outBlob = await embedInvisibleWatermarkDocx(file, {
          hash,
          ts: whenISO,
        });
        outName = toCertifiedName(file.name, "docx");
      } else {
        window.clearInterval(progId);
        return end({
          type: "info",
          message: "This file type will be supported soon (PNG, JPEG, MP4, ZIP, PPTX, XLSX). Try PDF or DOCX for now.",
        });
      }

      setRes({ outBlob, fileName: outName, hash, whenISO });

      const elapsed = performance.now() - t0;
      const pretty = elapsed < 1000 ? `${Math.round(elapsed)} ms` : `${(elapsed / 1000).toFixed(1)} s`;

      window.clearInterval(progId);
      setProgress(100);
      end({ type: "success", message: `Certificate ready in ${pretty}` });
    } catch (e) {
      console.error(e);
      window.clearInterval(progId);
      end({ type: "error", message: humanError(e) });
    }
  }

  function onCancel() {
    if (!busy) return;
    cancelRef.current = true;
    setToast({ type: "info", message: "Cancelling…" });
    setTimeout(() => setToast(null), 2000);
  }

  function downloadFile() {
    if (!res.outBlob || !res.fileName) return;
    const url = URL.createObjectURL(res.outBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = res.fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    const revoke = () => URL.revokeObjectURL(url);
    (window as any).requestIdleCallback ? (window as any).requestIdleCallback(revoke) : setTimeout(revoke, 15000);
  }

  function downloadCert() {
    if (!res.fileName || !res.hash || !res.whenISO) return;
    const base = res.fileName.replace(/\.(pdf|docx)$/i, "");
    // 4th argument = issuer (free tier: empty string)
    exportHtmlCertificate(base, res.hash!, res.whenISO!, "");
  }

  const headerBadges = (
    <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs io">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
        <Lock className="h-4 w-4 text-emerald-300" />
        On-device · No storage
      </span>
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
        <ShieldCheck className="h-4 w-4 text-sky-300" />
        Certificate included (HTML)
      </span>
      {typeof quotaRemaining === "number" && (
        <span
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5"
          title={quotaResetDay ? `Resets on ${quotaResetDay}` : undefined}
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-300" />
          {quotaRemaining} free left this month
        </span>
      )}
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 relative" aria-busy={busy}>
      {/* Background mesh + parallax */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="mesh-layer layer1" />
        <div className="mesh-layer layer2" />
        <div className="vignette" />
      </div>

      {/* Header block */}
      <section className="border-b border-white/10">
        <div ref={headerRef} className="mx-auto max-w-6xl px-4 py-16 sm:py-20 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl io">
            Protect your file & get a{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-sky-400">
              DigitalMeve certificate
            </span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-300/90 io">
            We add a subtle visible mark and an invisible proof. Your file stays fully readable. You also receive a
            <span className="font-semibold"> portable HTML certificate</span>. Everything runs on your device.
          </p>
          {headerBadges}
        </div>
      </section>

      {/* Main grid */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
          {/* Left — main card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 sm:p-6 backdrop-blur io">
            <h2 className="text-lg font-semibold">1) Choose your file</h2>
            <p className="mt-1 text-sm text-slate-400">
              Today: <strong>PDF</strong> & <strong>DOCX</strong>.{" "}
              <span className="opacity-80">Coming soon: PNG, JPEG, MP4, ZIP, PPTX, XLSX.</span>
            </p>

            <div className={`mt-4 rounded-xl border ${dragOver ? "border-emerald-400/60 shadow-[0_0_0_3px_rgba(16,185,129,.15)]" : "border-white/10"} transition-all`}>
              <FileDropzone
                onSelected={setFile}
                label={dragOver ? "Drop to protect" : "Drag & drop or click to select"}
                maxSizeMB={10}
                hint="Max 10 MB"
                accept={[
                  ".pdf","application/pdf",
                  ".docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  // accept shows more to educate, but we guard in logic:
                  ".pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation",
                  ".xlsx","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                  ".png","image/png",
                  ".jpg",".jpeg","image/jpeg",
                  ".mp4","video/mp4",
                  ".zip","application/zip",
                ].join(",")}
                role="button"
                tabIndex={0}
                onDragEnter={onDZEnter}
                onDragLeave={onDZLeave}
                onDrop={onDZLeave}
              />
            </div>

            {!!file && (
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs">
                <FileCheck2 className="h-4 w-4 text-emerald-300" />
                {kind !== "other" ? `${kind.toUpperCase()} detected` : "File selected"}
              </div>
            )}

            <h2 className="mt-6 text-lg font-semibold">2) Protect & certify</h2>
            <p className="mt-1 text-sm text-slate-400">
              We lightly stamp your file and add an invisible proof. You also get a shareable HTML certificate.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <button
                id="btn-protect"
                onClick={onGenerate}
                disabled={!file || busy}
                className={`relative btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden`}
                aria-disabled={!file || busy}
                aria-label="Protect file & generate certificate"
              >
                {/* Progress bar top (morph) */}
                {busy && (
                  <span
                    className="absolute left-0 top-0 h-[2px] bg-white/70"
                    style={{ width: `${Math.max(2, Math.min(100, progress))}%` }}
                    aria-hidden
                  />
                )}
                {/* Icon + Label morph */}
                <span className="inline-flex items-center gap-2">
                  {busy ? (
                    <>
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
                      Working…
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5" />
                      Protect file & generate certificate
                    </>
                  )}
                </span>
              </button>

              <button
                onClick={onCancel}
                disabled={!busy}
                className="btn btn-ghost"
                aria-disabled={!busy}
                aria-label="Cancel"
              >
                <XCircle className="h-5 w-5" />
                Cancel
              </button>
            </div>

            {/* Skeleton while processing (if >300ms) */}
            {busy && showSkeleton && !res.outBlob && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="skeleton h-4 w-40" />
                <div className="mt-3 space-y-2">
                  <div className="skeleton h-3 w-3/5" />
                  <div className="skeleton h-3 w-2/5" />
                  <div className="skeleton h-3 w-4/5" />
                </div>
              </div>
            )}

            {/* Result card */}
            {res.outBlob && res.fileName && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 io">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">
                  <BadgeCheck className="h-4 w-4" />
                  Certificate ready
                </div>

                <h3 className="text-base font-semibold">Certificate & Integrity</h3>

                <dl className="mt-3 grid gap-y-2 text-sm">
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    <dt className="text-slate-400">File</dt>
                    <dd className="col-span-2 sm:col-span-3 break-words">{res.fileName}</dd>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    <dt className="text-slate-400">Date / Time</dt>
                    <dd className="col-span-2 sm:col-span-3">
                      {new Date(res.whenISO!).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" })} —{" "}
                      {new Date(res.whenISO!).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    <dt className="text-slate-400">SHA-256</dt>
                    <dd className="col-span-2 sm:col-span-3 break-words">
                      <div className="flex items-center gap-2 flex-wrap">
                        <code className="text-xs break-all font-mono">{res.hash}</code>
                        <button
                          onClick={() => {
                            if (res.hash) {
                              navigator.clipboard.writeText(res.hash);
                              setToast({ type: "info", message: "SHA-256 copied to clipboard" });
                              setTimeout(() => setToast(null), 2000);
                            }
                          }}
                          className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-white/5 ring-1 ring-white/10 hover:bg-white/10"
                          aria-label="Copy SHA-256 to clipboard"
                        >
                          <Clipboard className="h-3.5 w-3.5" /> Copy
                        </button>
                        <Link href={`/verify?hash=${encodeURIComponent(res.hash || "")}`} className="btn btn-ghost text-xs">
                          Verify now →
                        </Link>
                      </div>
                    </dd>
                  </div>
                </dl>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button onClick={downloadFile} className="btn" aria-label="Download certified file">
                    <FileDown className="h-4 w-4 text-emerald-300" />
                    Download certified file
                  </button>
                  <button onClick={downloadCert} className="btn" aria-label="Download HTML certificate">
                    <FileCheck2 className="h-4 w-4 text-sky-300" />
                    Download certificate (.html)
                  </button>
                </div>

                <p className="mt-3 text-xs text-slate-400">
                  Your file stays fully readable. The HTML certificate is a tiny, portable summary you can share.
                </p>

                {/* Decorative ribbon */}
                <div aria-hidden className="pointer-events-none absolute -right-2 top-2 rotate-12">
                  <span className="inline-block rounded px-2 py-0.5 text-[10px] font-semibold text-emerald-300/90 ring-1 ring-emerald-400/30 bg-emerald-400/10">
                    .MEVE inside
                  </span>
                </div>
              </div>
            )}

            {/* Error helper (inline) */}
            {!busy && !res.outBlob && file && kind === "other" && (
              <div className="mt-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5" />
                  <p>Only PDF or DOCX are supported today. PNG, JPEG, MP4, ZIP, PPTX and XLSX are coming soon.</p>
                </div>
              </div>
            )}
          </div>

          {/* Right — side info / trust panel */}
          <aside className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 sm:p-6 backdrop-blur h-fit lg:sticky lg:top-24 io">
            <h3 className="text-base font-semibold">What you’ll get</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300/90">
              {[
                "Your original file, lightly stamped",
                "An invisible proof inside (privacy-first)",
                "A portable HTML certificate",
                "Verification in seconds — anywhere",
              ].map((t, i) => (
                <li key={t} className="flex items-start gap-2 io" data-io={i}>
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <h4 className="mt-6 text-sm font-semibold">Free plan</h4>
            <p className="mt-2 text-sm text-slate-400">
              Up to <strong>5 files/month</strong>, no account required. We use a small anonymous token to prevent abuse — your files never leave your device.
            </p>

            <div className="mt-4 text-sm">
              <Link href="/pricing" className="underline decoration-dotted underline-offset-4 hover:opacity-90">
                Need more? See plans →
              </Link>
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs text-slate-400">
                For named certificates (your name/email) or company-issued certificates (private key + DNS),
                upgrade to a paid plan.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Toasts */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-4 left-1/2 -translate-x-1/2 z-[60]"
      >
        {toast && (
          <div
            role="status"
            className={`rounded-md px-3 py-2 text-white text-sm shadow-lg ${
              toast.type === "error" ? "bg-rose-600/90" : toast.type === "success" ? "bg-emerald-600/90" : "bg-sky-600/90"
            }`}
          >
            {toast.message}
          </div>
        )}
      </div>

      <LimitModal open={Boolean(limitOpen)} onClose={() => setLimitOpen(false)} count={quotaCount} resetDayUTC={quotaResetDay} />

      {/* Local styles (mesh, parallax, skeleton, IO transitions) */}
      <style jsx global>{`
        .mesh-layer {
          position: absolute;
          inset: 0;
          background-size: 200% 200%;
          filter: blur(30px);
          opacity: 0.55;
          will-change: transform, background-position;
          animation: meshMove 20s ease-in-out infinite alternate;
        }
        .layer1 {
          background-image:
            radial-gradient(50% 60% at 10% 0%, rgba(16,185,129,0.12), transparent 55%),
            radial-gradient(40% 50% at 90% 20%, rgba(56,189,248,0.10), transparent 55%);
          transform: translateY(var(--parallax-y1, 0px));
        }
        .layer2 {
          background-image:
            radial-gradient(45% 55% at 20% 80%, rgba(16,185,129,0.08), transparent 60%),
            radial-gradient(35% 45% at 80% 70%, rgba(56,189,248,0.08), transparent 60%);
          transform: translateY(var(--parallax-y2, 0px));
          mix-blend-mode: screen;
        }
        .vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(80% 80% at 50% 20%, transparent 0%, transparent 55%, rgba(0,0,0,0.35) 100%);
        }
        @keyframes meshMove {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mesh-layer { animation: none !important; }
        }

        .skeleton { background: linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.12), rgba(255,255,255,0.06)); background-size: 200% 100%; animation: sk 1.2s ease-in-out infinite; border-radius: 8px; }
        @keyframes sk { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        .io { opacity: 0; transform: translateY(18px); transition: opacity .7s ease, transform .7s ease, filter .7s ease; }
        .io-in { opacity: 1; transform: translateY(0); }
      `}</style>
    </main>
  );
          }
