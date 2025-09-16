"use client";
import Section from "../../../../components/section";
import Container from "../../../../components/container";
import { useEffect, useState } from "react";

type Key = { id: string; label: string; value: string; createdAt: number; lastUsedAt?: number };

export default function ApiKeys() {
  const [list, setList] = useState<Key[]>([]);
  const [label, setLabel] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => { fetch("/api/keys").then(r=>r.json()).then(setList).catch(()=>{}); }, []);

  async function create() {
    setBusy(true);
    const r = await fetch("/api/keys", { method: "POST", headers: { "content-type":"application/json" }, body: JSON.stringify({ label }) });
    const k = await r.json();
    setList((L) => [k, ...L]); setLabel(""); setBusy(false);
  }
  async function revoke(id: string) {
    setBusy(true);
    await fetch("/api/keys", { method: "DELETE", headers: { "content-type":"application/json" }, body: JSON.stringify({ id }) });
    setList((L) => L.filter(x => x.id !== id)); setBusy(false);
  }

  return (
    <Section className="pt-16 md:pt-24">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-extrabold">API Keys</h1>
            <p className="mt-2 text-neutral-400">Local-only demo. Use keys with endpoints that accept <code className="text-xs">X-Api-Key</code> or <code className="text-xs">?key=</code>.</p>
          </div>
          <a className="btn-ghost" href="/developers">Back to Developers</a>
        </div>

        <div className="mt-6 flex gap-2 max-w-xl">
          <input value={label} onChange={(e)=>setLabel(e.target.value)} placeholder="Label (e.g. newsroom)" className="flex-1 rounded-md border border-white/10 bg-white/5 px-3 py-2" />
          <button disabled={busy} onClick={create} className="btn-primary">{busy ? "Creating…" : "Create key"}</button>
        </div>

        <div className="mt-6 grid gap-3">
          {list.map(k => (
            <div key={k.id} className="card p-5 flex items-center justify-between">
              <div>
                <div className="font-semibold text-neutral-200">{k.label}</div>
                <div className="text-xs text-neutral-500">Created {new Date(k.createdAt).toLocaleString()}</div>
                <div className="mt-1 text-sm"><code>{k.value}</code></div>
              </div>
              <div className="flex gap-2">
                <button className="btn-ghost" onClick={() => navigator.clipboard.writeText(k.value)}>Copy</button>
                <button className="btn-ghost" onClick={() => revoke(k.id)}>Revoke</button>
              </div>
            </div>
          ))}
          {list.length === 0 && <div className="text-neutral-400">No keys yet.</div>}
        </div>

        <div className="mt-8 card p-5">
          <div className="text-emerald-300 font-semibold mb-2">Use in curl</div>
          <pre className="text-xs text-neutral-300 whitespace-pre-wrap">{`curl -sS -H 'X-Api-Key: <YOUR_KEY>' "$BASE/api/export/csv?type=mps"`}</pre>
        </div>
      </Container>
    </Section>
  );
}