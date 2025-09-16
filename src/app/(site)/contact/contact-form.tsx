"use client";
import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); const [ok, setOk] = useState(false);
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(""); setBusy(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });
      if (!res.ok && res.status !== 202) throw new Error("Failed");
      setOk(true);
    } catch { setErr("Please try again."); }
    finally { setBusy(false); }
  }

  if (ok) return <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">Thanks — we’ll be in touch.</div>;

  return (
    <form className="flex flex-col gap-3" onSubmit={submit}>
      <input className="rounded-md border border-white/10 bg-white/5 px-3 py-2" placeholder="Your name" value={name} onChange={(e)=>setName(e.target.value)} required />
      <input className="rounded-md border border-white/10 bg-white/5 px-3 py-2" placeholder="you@example.com" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
      <textarea className="rounded-md border border-white/10 bg-white/5 px-3 py-2" rows={5} placeholder="How can we help?" value={message} onChange={(e)=>setMessage(e.target.value)} required />
      {/* Honeypot */}
      <input className="hidden" value={website} onChange={(e)=>setWebsite(e.target.value)} placeholder="website" tabIndex={-1} autoComplete="off" />
      <button className="btn-primary disabled:opacity-60" disabled={busy}>{busy ? "Sending…" : "Send"}</button>
      {err && <div className="text-sm text-red-400" role="alert">{err}</div>}
    </form>
  );
}
