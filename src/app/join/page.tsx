"use client";
import { useState } from "react";

export default function JoinPage() {
  const [email, setEmail] = useState("");
  const [region, setRegion] = useState("NSW");
  const [status, setStatus] = useState<"idle"|"loading"|"ok"|"err">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, region }),
      });
      if (!res.ok) throw new Error("submit-failed");
      setStatus("ok");
    } catch (_) {
      setStatus("err");
    }
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      <h1 className="text-3xl font-extrabold">Join Verity</h1>
      <p className="text-neutral-100 mt-2">Start for <span className="text-emerald-300 font-semibold">$1/month</span>. Cancel anytime.</p>

      <form onSubmit={submit} className="mt-8 space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <label className="block text-sm">
          <span className="text-neutral-100">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/50"
            placeholder="you@example.com"
          />
        </label>

        <label className="block text-sm">
          <span className="text-neutral-100">State/Territory</span>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            {["NSW","VIC","QLD","WA","SA","TAS","ACT","NT"].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>

        <button
          disabled={status==="loading"}
          className="w-full rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-black hover:bg-emerald-400 disabled:opacity-60"
        >
          {status==="loading" ? "Processing…" : "Create account for $1"}
        </button>

        {status==="ok" && <p className="text-emerald-300 text-sm">Thanks! Check your email for next steps.</p>}
        {status==="err" && <p className="text-red-300 text-sm">Something went wrong. Try again.</p>}
      </form>

      <p className="text-xs text-zinc-500 mt-4">No charge is made here — this posts to a local API route. We’ll connect Stripe later.</p>
    </main>
  );
}
