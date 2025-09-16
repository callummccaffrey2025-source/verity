"use client";
import Section from "../../../components/section";
import Container from "../../../components/container";
import { useEffect, useState } from "react";

type Item = { topic: string };

export default function WatchlistPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [topic, setTopic] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/watchlist").then(r => r.json()).then(setItems).catch(()=>{});
  }, []);

  async function add() {
    if (!topic.trim()) return;
    setBusy(true);
    await fetch("/api/watchlist", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ topic }) });
    setItems(prev => prev.find(p => p.topic === topic) ? prev : [...prev, { topic }]);
    setTopic(""); setBusy(false);
  }

  async function remove(t: string) {
    setBusy(true);
    await fetch("/api/watchlist", { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ topic: t }) });
    setItems(prev => prev.filter(x => x.topic !== t));
    setBusy(false);
  }

  return (
    <Section className="pt-16 md:pt-24">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-extrabold">Watchlist</h1>
            <p className="mt-2 text-neutral-400">Save searches or topics to follow.</p>
          </div>
          <a href="/api/export/csv?type=watchlist" className="btn-ghost">Download CSV</a>
        </div>

        <div className="mt-6 flex gap-2 max-w-xl">
          <input value={topic} onChange={(e)=>setTopic(e.target.value)} placeholder="e.g. Privacy Act, Migration" className="flex-1 rounded-md border border-white/10 bg-white/5 px-3 py-2"/>
          <button disabled={busy} onClick={add} className="btn-primary">{busy ? "Saving…" : "Save"}</button>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {items.map(i => (
            <div key={i.topic} className="card p-5 flex items-center justify-between">
              <div>
                <div className="text-emerald-300 font-semibold">{i.topic}</div>
                <div className="text-sm text-neutral-400">Daily briefing • Alerts enabled</div>
              </div>
              <button onClick={()=>remove(i.topic)} className="btn-ghost">Remove</button>
            </div>
          ))}
          {items.length === 0 && <div className="text-neutral-400">No items yet.</div>}
        </div>
      </Container>
    </Section>
  );
}