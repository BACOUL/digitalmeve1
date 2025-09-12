import Link from "next/link";

export default function ProPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-gray-900">For Business</h1>
      <p className="mt-2 text-gray-600">
        Prepare your integration: API & SDKs, issuer checks (domain/email), verification at scale, SLA.
      </p>
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5">
        <p className="text-gray-700">
          Pro is coming soon. Tell us about your use case and get early access.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-flex rounded-xl bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
        >
          Contact sales
        </Link>
      </div>
    </main>
  );
}
