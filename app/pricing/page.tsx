// app/pricing/page.tsx
import WaitlistForm from "@/components/WaitlistForm";
import Link from "next/link";

export const metadata = {
  title: "Pricing — DigitalMeve",
  description:
    "Free for individuals. Pro plan with API, verified issuer and SLA coming soon.",
};

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Pricing</h1>
      <p className="mt-2 text-gray-600">
        Free for Individuals. Pro for teams and workflows — join the waitlist.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Individuals — Free */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Individuals</h2>
          <p className="mt-1 text-sm text-gray-600">Free forever.</p>
          <ul className="mt-4 space-y-2 text-gray-700 text-sm">
            <li>• Readable files with built-in proof (PDF/PNG)</li>
            <li>• Optional .meve.html certificate</li>
            <li>• No account, no storage</li>
            <li>• Local verification</li>
          </ul>
          <div className="mt-5">
            <Link href="/generate" className="btn btn-primary">Get started</Link>
          </div>
        </section>

        {/* Pro — Coming soon */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Pro</h2>
          <p className="mt-1 text-sm text-gray-600">For Business — coming soon.</p>
          <ul className="mt-4 space-y-2 text-gray-700 text-sm">
            <li>• API & SDKs</li>
            <li>• Verified issuer (domain & key)</li>
            <li>• Team dashboard & audit</li>
            <li>• SLA & support</li>
          </ul>
          {/* Client-side form embedded without passing handlers from server */}
          <WaitlistForm />
          <p className="mt-3 text-xs text-gray-500">
            We’ll contact you when Pro is available.
          </p>
        </section>
      </div>
    </main>
  );
}
