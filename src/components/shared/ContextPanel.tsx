'use client';
import { useState } from 'react';

export default function ContextPanel({ text }:{ text:string }){
  const [loading,setLoading]=useState(false);
  const [summary,setSummary]=useState<string|undefined>();
  const ask = async ()=>{
    try{
      setLoading(true); setSummary(undefined);
      const r=await fetch('/api/context',{ method:'POST', body:JSON.stringify({ text }) ,
        headers:{ 'Content-Type':'application/json' }});
      const j=await r.json(); setSummary(j.summary);
    } finally { setLoading(false); }
  };
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="mb-2 text-sm text-white/70">Context</div>
      {!summary ? (
        <button onClick={ask} className="rounded-lg bg-brand px-3 py-1.5 text-ink hover:shadow-soft disabled:opacity-50" disabled={loading}>
          {loading? 'Summarizing…':'Explain in plain English'}
        </button>
      ) : (
        <p className="text-white/80 leading-relaxed">{summary}</p>
      )}
    </div>
  );
}
