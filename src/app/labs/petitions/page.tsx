'use client';
import { useState } from 'react';

export default function Page(){
  const [title,setTitle]=useState(''); const [body,setBody]=useState(''); const [msg,setMsg]=useState<string|null>(null);

  async function createPetition(e:React.FormEvent){ e.preventDefault();
    setMsg(null);
    const r = await fetch('/api/petitions',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({title, body}) });
    const j = await r.json();
    if(r.ok){ setMsg('Created (dev echo).'); setTitle(''); setBody(''); } else { setMsg(j?.error ?? 'Error'); }
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Citizen Petition Engine</h1>
      <p className="text-sm text-zinc-400">User content is the author’s responsibility. Verity provides the platform, not endorsements.</p>
      <form onSubmit={createPetition} className="space-y-2 max-w-xl">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Petition title" className="w-full rounded-lg border border-zinc-700 bg-zinc-900/40 p-2"/>
        <textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="Describe your request..." className="w-full rounded-lg border border-zinc-700 bg-zinc-900/40 p-2 h-32"/>
        <button className="rounded-xl border border-zinc-700 px-4 py-2">Create</button>
      </form>
      {msg && <div className="text-sm text-zinc-300">{msg}</div>}
    </div>
  );
}
