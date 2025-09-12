// app/login/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // V1: pas d’auth encore – on affiche une notice
    alert("Login is coming soon (V2). For now, DigitalMeve is free without accounts.");
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12 text-gray-900">
      <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
      <p className="mt-2 text-sm text-gray-600">
        Accounts are not required in V1. Individuals can use DigitalMeve for free.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="text-sm text-gray-700">Work email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2.5 text-white font-medium hover:brightness-105"
        >
          Continue
        </button>
      </form>

      <p className="mt-6 text-xs text-gray-500">
        Need help? <Link href="/contact" className="text-sky-600 hover:underline">Contact us</Link>
      </p>
    </main>
  );
}
