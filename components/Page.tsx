*** a/app/page.tsx
--- b/app/page.tsx
@@
-import Link from "next/link";
-import {
-  ArrowRight,
-  CheckCircle2,
-  Users,
-  Briefcase,
-  ShieldCheck,
-  BadgeCheck,
-  FileDown,
-  Upload,
-  Sparkles,
-} from "lucide-react";
-import Hero from "@/components/Hero";           // ✅ déjà en charte
-import HowItWorks from "@/components/HowItWorks"; // ✅ 3 étapes en charte
-
-export default function HomePage() {
-  return (
-    <main className="min-h-screen bg-slate-950 text-slate-100">
-
-      {/* ================= HERO ================= */}
-      <Hero />
-
-      {/* ======== BANG FOR BUCK / PROOF BAR (sombre) ======== */}
-      <section className="mx-auto max-w-6xl px-4 py-6">
-        <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
-          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
-            <BadgeCheck className="h-4 w-4 text-emerald-400" />
-            Free for individuals
-          </span>
-          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
-            <ShieldCheck className="h-4 w-4 text-sky-400" />
-            No account · No storage
-          </span>
-          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
-            <Sparkles className="h-4 w-4 text-emerald-400" />
-            Certificate included
-          </span>
-        </div>
-      </section>
-
-      {/* ================= HOW IT WORKS ================= */}
-      <HowItWorks />
-
-      {/* ============== USE-CASES (INDIVIDUALS) ============== */}
-      <section className="mx-auto max-w-6xl px-4 pb-4">
-        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
-          <div className="flex items-center gap-2">
-            <Users className="h-5 w-5 text-emerald-400" />
-            <h2 className="text-xl sm:text-2xl font-semibold">For Individuals</h2>
-            <span className="ml-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-300">
-              Free
-            </span>
-          </div>
-          <p className="mt-2 text-slate-300">
-            Protect your everyday documents in seconds. Your files stay the same, you get
-            an official certificate to share when needed.
-          </p>
-          ...
-        </div>
-      </section>
-
-      {/* ============== USE-CASES (BUSINESS) ============== */}
-      <section className="mx-auto max-w-6xl px-4 pb-16">
-        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
-          ...
-        </div>
-      </section>
-
-      {/* ================= WHY DIGITALMEVE ================= */}
-      <section className="mx-auto max-w-6xl px-4 pb-10">
-        <h2 className="text-2xl font-semibold">Why DigitalMeve</h2>
-        <p className="mt-2 text-slate-400">
-          Designed for everyone — simple to use, built for trust.
-        </p>
-        ...
-      </section>
-
-      {/* ================= DEVELOPERS / SAMPLE ================= */}
-      <section className="mx-auto max-w-6xl px-4 pb-20">
-        ...
-      </section>
-
-      {/* ======= MINI-FAQ (court, grand public) ======= */}
-      <section className="mx-auto max-w-6xl px-4 pb-16">
-        ...
-      </section>
-    </main>
-  );
-}
+import Link from "next/link";
+import { ArrowRight, CheckCircle2 } from "lucide-react";
+import Hero from "@/components/Hero";
+import HowItWorks from "@/components/HowItWorks";
+import WhyDigitalMeve from "@/components/WhyDigitalMeve";
+import FAQ from "@/components/FAQ";
+
+export default function HomePage() {
+  return (
+    <main className="min-h-screen bg-slate-950 text-slate-100">
+      {/* 1) HERO (inchangé) */}
+      <Hero />
+
+      {/* 2) HOW IT WORKS (3 étapes) */}
+      <HowItWorks />
+
+      {/* 3) WHY DIGITALMEVE (4 bénéfices, pas de redites ailleurs) */}
+      <WhyDigitalMeve />
+
+      {/* 4) BUILT FOR (condensé, inline — pas d’autres imports) */}
+      <section className="mx-auto max-w-6xl px-4 pb-12">
+        <h2 className="text-2xl font-semibold">Built for</h2>
+        <div className="mt-6 grid gap-6 lg:grid-cols-2">
+          {/* Individuals */}
+          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
+            <h3 className="text-lg font-semibold">Individuals</h3>
+            <ul className="mt-3 space-y-2 text-sm text-slate-300">
+              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400"/>{' '}Unlimited personal use</li>
+              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400"/>{' '}Files stay readable & portable</li>
+              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400"/>{' '}Optional human-readable certificate</li>
+            </ul>
+            <div className="mt-5 flex flex-wrap gap-3">
+              <Link href="/generate" className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-5 py-2.5 font-semibold text-slate-900 shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:brightness-110 transition">
+                Start free <ArrowRight className="h-5 w-5" />
+              </Link>
+              <Link href="/personal" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 font-semibold hover:bg-white/10 transition">
+                Explore personal <ArrowRight className="h-5 w-5" />
+              </Link>
+            </div>
+          </div>
+
+          {/* Business */}
+          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
+            <h3 className="text-lg font-semibold">Teams & Business</h3>
+            <ul className="mt-3 space-y-2 text-sm text-slate-300">
+              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400"/>{' '}APIs & SDKs for automation</li>
+              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400"/>{' '}Verification at scale & webhooks</li>
+              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400"/>{' '}Email/domain checks for a trust badge</li>
+            </ul>
+            <div className="mt-5 flex flex-wrap gap-3">
+              <Link href="/pro" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 font-semibold hover:bg-white/10 transition">
+                Learn more <ArrowRight className="h-5 w-5" />
+              </Link>
+              <Link href="/contact" className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-5 py-2.5 font-semibold text-white hover:bg-sky-600 transition">
+                Contact sales <ArrowRight className="h-5 w-5" />
+              </Link>
+            </div>
+          </div>
+        </div>
+      </section>
+
+      {/* 5) FAQ (composant existant) */}
+      <FAQ />
+    </main>
+  );
+}
