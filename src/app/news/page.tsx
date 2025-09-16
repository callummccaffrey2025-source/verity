import { useEffect, useState } from "react";
type Receipt = { outlet: string; owner: string; ts: string; url: string; note?: string };
type Cluster = { id: string; title: string; time_aest: string; bias_mix?: {left:number;center:number;right:number}; receipts: Receipt[] };
async function loadJSON<T>(path: string): Promise<T> { const r = await fetch(path,{cache:"no-store"}); if(!r.ok) throw new Error(path); return r.json(); }

export default function News() {
  const [clusters, setClusters] = useState<Cluster[]|null>(null);
  const [err, setErr] = useState<string|null>(null);
  useEffect(() => { loadJSON<Cluster[]>("/data/au/news/2025-09-16.json").then(setClusters).catch(e=>setErr(String(e))); }, []);
  if (err) return <div className="text-red-400">Failed to load news: {err}</div>;
  if (!clusters) return <div className="text-neutral-400">Loading news…</div>;
  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      {clusters.map(c => (
        <article key={c.id} className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="font-semibold">{c.title}</h2>
          <div className="text-xs text-neutral-500 mt-1">Updated {c.time_aest} (Australia/Sydney)</div>
          <div className="mt-3 space-y-2 text-sm">
            {c.receipts.map((r,i)=>(
              <div key={i}>
                <span className="font-medium">{r.outlet}</span>
                <span className="text-neutral-400"> — Owner: {r.owner} · {r.ts}</span>
                {" · "}
                <a className="text-green-400 underline" href={r.url} target="_blank" rel="noreferrer">Open source</a>
                {r.note ? <span className="text-neutral-400"> — {r.note}</span> : null}
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
