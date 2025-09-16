"use client";
import { useState } from "react";

export default function ContactForm() {
  const [ok, setOk] = useState(false);

  if (ok) {
    return (
      <div className="mt-6 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
        Thanks—we’ll be in touch.
      </div>
    );
  }

  return (
    <form className="mt-6 space-y-3" onSubmit={(e) => { e.preventDefault(); setOk(true); }}>
      <input className="input" placeholder="Your name" required />
      <input className="input" type="email" placeholder="you@example.com" required />
      <textarea className="input min-h-32" placeholder="How can we help?" required />
      <button className="btn w-full">Send</button>
    </form>
  );
}
