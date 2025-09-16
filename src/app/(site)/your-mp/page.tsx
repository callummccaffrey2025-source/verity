"use client";
import Section from "../../../components/section";
import Container from "../../../components/container";
import { useState } from "react";
import { POSTCODE_TO_MPS } from "@/lib/postcodes";

export default function YourMP() {
  const [pc, setPc] = useState("");
  const [mps, setMps] = useState<string[]>([]);
  const [err, setErr] = useState("");

  function lookup() {
    const clean = pc.trim();
    if (!/^\d{4}$/.test(clean)) { setErr("Enter a 4-digit AU postcode"); setMps([]); return; }
    setErr("");
    setMps(POSTCODE_TO_MPS[clean] || []);
  }

  return (
    <Section className="pt-16 md:pt-24">
      <Container>
        <h1 className="text-4xl md:text-5xl font-serif font-extrabold">Your MP</h1>
        <p className="mt-2 text-neutral-400">Find MPs for your postcode.</p>

        <div className="mt-6 flex gap-2 max-w-md">
          <input value={pc} onChange={(e)=>setPc(e.target.value)} placeholder="Postcode (e.g. 2000)" className="flex-1 rounded-md border border-white/10 bg-white/5 px-3 py-2" />
          <button onClick={lookup} className="btn-primary">Lookup</button>
        </div>
        {err && <div className="mt-2 text-red-400 text-sm">{err}</div>}

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {mps.map(id => (
            <a key={id} href={`/mps/${id}`} className="card card-hover p-5 block">
              <div className="text-emerald-300 font-semibold">MP</div>
              <div className="text-neutral-300">{id}</div>
              <div className="text-xs text-neutral-400 mt-1">View profile →</div>
            </a>
          ))}
          {mps.length === 0 && !err && <div className="text-neutral-400">No results yet.</div>}
        </div>
      </Container>
    </Section>
  );
}