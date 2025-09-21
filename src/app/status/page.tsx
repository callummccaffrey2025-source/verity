'use client';
import { useEffect, useState } from 'react';

type Health = { ok: boolean; service: string; time: string };

export default function StatusPage(){
  const [h,setH]=useState<Health|null>(null);
  const [err,setErr]=useState<string>('');
  useEffect(()=>{
    let cancelled=false;
    (async ()=>{
      try{
        const res = await fetch('/api/health', { cache: 'no-store' });
        const data = await res.json();
        if(!cancelled) setH(data);
      }catch(e){
        if(!cancelled) setErr(String(e));
      }
    })();
    return ()=>{ cancelled=true; };
  },[]);
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Status</h1>
      {!h && !err && <div className="mt-3 text-sm text-zinc-400">Checking…</div>}
      {err && <div className="mt-3 text-sm text-rose-400">Error: {err}</div>}
      {h && (
        <div className="mt-4 card p-4">
          <div className="text-sm"><span className="text-zinc-400">ok:</span> {String(h.ok)}</div>
          <div className="text-sm"><span className="text-zinc-400">service:</span> {h.service}</div>
          <div className="text-sm"><span className="text-zinc-400">time:</span> {new Date(h.time).toLocaleString()}</div>
          <div className="text-xs text-zinc-500 mt-3">From /api/health</div>
        </div>
      )}
      <div className="mt-6 grid gap-2 md:grid-cols-2">
        <a className="card p-4 block" href="/opengraph-image"><div className="font-medium">OpenGraph image</div><div className="text-xs text-zinc-400">/opengraph-image</div></a>
        <a className="card p-4 block" href="/twitter-image"><div className="font-medium">Twitter image</div><div className="text-xs text-zinc-400">/twitter-image</div></a>
      </div>
    </main>
  );
}
