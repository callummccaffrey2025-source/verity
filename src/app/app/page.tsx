'use client';
import { useState } from 'react';

export default function AppPage() {
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string>('');
  const [sources, setSources] = useState<string[]>([]);

  const ask = async () => {
    setLoading(true);
    setAnswer('');
    setSources([]);
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ q, pageSize: 3 })
      });
      const json = await res.json();
      setAnswer(json.answer || '');
      setSources(json.sources || []);
    } finally { setLoading(false); }
  };

  return (
    <main className="p-8 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Verity — Ask</h1>
      <div className="flex gap-2">
        <input className="flex-1 border rounded px-3 py-2"
               placeholder="e.g. NSW energy rebate 2024–25"
               value={q} onChange={(e) => setQ(e.target.value)} />
        <button onClick={ask} className="px-4 py-2 rounded border" disabled={loading || !q.trim()}>
          {loading ? 'Thinking…' : 'Ask'}
        </button>
      </div>
      {answer && <article className="prose whitespace-pre-wrap border rounded p-4">{answer}</article>}
      {sources?.length > 0 && (
        <ul className="list-disc pl-6">
          {sources.map((s, i) => <li key={i}><a className="underline" href={s} target="_blank">{s}</a></li>)}
        </ul>
      )}
    </main>
  );
}
