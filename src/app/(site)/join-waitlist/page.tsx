"use client";
import { useState } from "react";
import Section from "../../../components/section";
import Container from "../../../components/container";

export default function JoinWaitlistPage() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, consent: true, website }),
      });
      if (!res.ok && res.status !== 202) throw new Error("Failed");
      setOk(true);
    } catch {
      setErr("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Section className="pt-16 md:pt-24">
      <Container>
        <h1 className="text-4xl md:text-5xl font-extrabold font-serif">Join the waitlist</h1>
        <p className="mt-2 text-neutral-400">Be the first to know when we launch.</p>

        {ok ? (
          <div className="mt-6 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
            You’re on the list. Check your inbox for a confirmation email.
          </div>
        ) : (
          <form className="mt-6 flex flex-col gap-3 max-w-md" onSubmit={submit}>
            <input
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email"
            />
            {/* Honeypot (hidden) */}
            <input
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Your website"
            />
            <button disabled={busy} className="btn-primary disabled:opacity-60">{busy ? "Joining…" : "Join"}</button>
            {err && <div className="text-sm text-red-400" role="alert">{err}</div>}
          </form>
        )}
      </Container>
    </Section>
  );
}