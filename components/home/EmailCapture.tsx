"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email.");
      return;
    }
    setSubmitting(true);
    try {
      await fetch("/api/email-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "home_inline" }),
      });
      (window as any).plausible?.("EmailCaptureSubmit", { props: { source: "home" } });
      router.push(`/signup?email=${encodeURIComponent(email)}&src=home_inline`);
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 flex gap-2" aria-label="Get bill alerts">
      <div className="flex-1">
        <label htmlFor="alerts-email" className="sr-only">
          Email for bill alerts
        </label>
        <input
          id="alerts-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email for bill alerts"
          className="w-full rounded-lg border border-zinc-800 bg-black px-4 py-2 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          aria-describedby={error ? "alerts-error" : undefined}
          required
        />
        {error && (
          <p id="alerts-error" className="mt-1 text-sm text-rose-400">
            {error}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-emerald-500/20 px-4 py-2 text-emerald-300 ring-1 ring-emerald-400/30 hover:bg-emerald-500/25 disabled:opacity-60"
        data-cta="email_capture_submit"
      >
        {submitting ? "Sending…" : "Get alerts"}
      </button>
    </form>
  );
}
