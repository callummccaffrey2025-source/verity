"use client";
import { useState } from "react";

export default function JoinForm() {
  const [status, setStatus] = useState<"idle"|"loading"|"ok"|"err">("idle");
  const [email, setEmail] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !email.includes("@")) { setStatus("err"); return; }
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
    } catch {
      setStatus("err");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-3 max-w-md">
      <input
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        required
        type="email"
        placeholder="you@example.com"
        className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2"
      />
      <div className="flex items-center gap-2">
        <button disabled={status==="loading"} className="btn rounded px-4 py-2 font-medium">
          {status==="loading" ? "Joining…" : "Join waitlist"}
        </button>
        {status==="ok" && <span className="text-emerald-300 text-sm">Thanks — you’re on the list.</span>}
        {status==="err" && <span className="text-red-400 text-sm">Try a valid email.</span>}
      </div>
    </form>
  );
}
