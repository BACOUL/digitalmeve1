// components/WaitlistForm.tsx
"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState<null | "success" | "error">(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOk(null);
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setOk("error");
      return;
    }
    setLoading(true);

    try {
      // V1: stub — on stockera via API/CRM en V2
      await new Promise((r) => setTimeout(r, 600));
      setOk("success");
      setEmail("");
    } catch {
      setOk("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 flex w-full gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="input"
        aria-label="Work email"
      />
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary"
        aria-label="Join the waitlist"
      >
        {loading ? "Sending…" : "Join the waitlist"}
      </button>

      {ok === "success" && (
        <p className="sr-only" role="status">Thanks! You’re on the list.</p>
      )}
      {ok === "error" && (
        <p className="sr-only" role="status">Please enter a valid email.</p>
      )}
    </form>
  );
}
