--- a/components/Hero.tsx
+++ b/components/Hero.tsx
@@ -1,6 +1,6 @@
 // components/Hero.tsx — v18 (world-class: a11y, perf, reduced-motion, no global selectors)
 "use client";
 
-import Link from "next/link";
+import Link from "next/link";
 import { useEffect, useMemo, useRef, useState } from "react";
 import { ShieldCheck, Radar, Sparkles, BadgeCheck } from "lucide-react";
 
@@ -63,7 +63,7 @@ export default function Hero() {
       {/* Content */}
       <div className="relative mx-auto max-w-6xl px-4 sm:px-5 pt-20 sm:pt-24 pb-4 text-center">
         {/* Eyebrow */}
         <div
           data-reveal="1"
           data-index="0"
           className="reveal mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-[6px] text-[.68rem] sm:text-[.7rem] font-semibold tracking-wide text-slate-200 backdrop-blur opacity-0 translate-y-3 transition-all duration-500"
           role="note"
         >
           <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
-          THE .MEVE STANDARD · Privacy-first · Certified integrity
+          THE .MEVE STANDARD · Privacy-first · Verifiable integrity
         </div>
 
         {/* Headline */}
         <h1
           data-reveal="1"
           data-index="1"
           className="reveal mt-2 font-extrabold tracking-tight text-white leading-[1.12] text-[clamp(1.72rem,6vw,3.2rem)] sm:leading-[1.06] sm:text-6xl md:text-7xl opacity-0 translate-y-3 transition-all duration-500"
         >
           Protect your documents, effortlessly.
         </h1>
 
         {/* Subheadline (clarifie proposition leader / “unique au monde”) */}
         <p
           data-reveal="1"
           data-index="2"
           className="reveal mx-auto mt-3 max-w-3xl text-[15px] sm:text-lg text-[var(--fg-muted)] opacity-0 translate-y-3 transition-all duration-500"
         >
-          DigitalMeve is the first open, on-device standard that adds a visible watermark
-          and an invisible proof in seconds — private by design, verifiable anywhere.
+          DigitalMeve is the open, on-device standard that adds a visible watermark
+          and an invisible proof in seconds — private by design, verifiable anywhere.
         </p>
 
         {/* Micro-claims */}
         <p
           data-reveal="1"
           data-index="3"
           className="reveal mx-auto mt-2 max-w-xl text-[12.5px] text-slate-400 opacity-0 translate-y-3 transition-all duration-500"
         >
           Open standard · No account · No storage
         </p>
 
         {/* CTAs */}
         <div
           data-reveal="1"
           data-index="4"
           className="reveal mt-4 flex flex-wrap items-center justify-center gap-2.5 opacity-0 translate-y-3 transition-all duration-500"
         >
           <Link
             href="/generate"
             aria-label="Try for free — 5 included per month"
             className="btn btn-primary px-5 h-12 text-[15.5px] font-semibold shadow-[0_0_40px_rgba(56,189,248,.18)] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 max-[360px]:w-full"
           >
             <ShieldCheck aria-hidden className="h-[18px] w-[18px]" />
             Try free (5/month)
           </Link>
 
           <Link
             href="/verify"
             aria-label="Verify a document"
             className="btn btn-outline px-5 h-11 text-[15px] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 max-[360px]:w-full"
           >
             <Radar aria-hidden className="h-[18px] w-[18px]" />
             Verify a document
           </Link>
         </div>
 
         {/* Social proof (aria-live polite pour lecteurs d’écran) */}
-        <div
-          data-reveal="1"
-          data-index="5"
-          className="reveal mx-auto mt-4 flex flex-wrap items-center justify-center gap-2 text-[12px] text-slate-300/90 opacity-0 translate-y-3 transition-all duration-500"
-          aria-live="polite"
-        >
-          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5">
-            {totalDocs} documents protected
-          </span>
-          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5">
-            On-device only
-          </span>
-        </div>
+        {process.env.NEXT_PUBLIC_SHOW_SOCIAL_PROOF === "1" && (
+          <div
+            data-reveal="1"
+            data-index="5"
+            className="reveal mx-auto mt-4 flex flex-wrap items-center justify-center gap-2 text-[12px] text-slate-300/90 opacity-0 translate-y-3 transition-all duration-500"
+            aria-live="polite"
+          >
+            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5">
+              {totalDocs} documents protected
+            </span>
+            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5">
+              On-device only
+            </span>
+          </div>
+        )}
 
         {/* Trust badges */}
         <div
           data-reveal="1"
           data-index="6"
           className="reveal mt-2.5 flex flex-wrap items-center justify-center gap-2 opacity-0 translate-y-3 transition-all duration-500"
         >
           <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-xs text-slate-300/80">
             <Sparkles aria-hidden className="h-3.5 w-3.5 opacity-80" />
-            GDPR & Privacy by design
+            GDPR-ready · Privacy by design
           </span>
           <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-xs text-slate-300/80">
             <BadgeCheck aria-hidden className="h-3.5 w-3.5 opacity-80" />
             Watermark + Proof included
           </span>
         </div>
       </div>
