'use client';

import { useEffect, useMemo, useState } from 'react';

// If you have shadcn/ui installed:
import { Card } from '@/components/ui/card';
// If not, uncomment this tiny fallback:
// const Card = (p: any) => <div {...p} className={(p.className ?? '') + ' rounded-xl border border-zinc-800 bg-zinc-900/40'} />;

type Preferences = {
  persona: 'Citizen' | 'Power User' | 'Journalist' | 'Educator';
  electorate: string;
  postcode: string;
  issues: string[];
  media: { balance: number; reduceOpinion: boolean; avoidPaywalled: boolean; exclude: string[]; };
  mps: string[];
  cadence: { mode: 'Email' | 'Push'; time: string; weekdays: string[] };
  consent?: { telemetry: boolean; personalisedEmail: boolean };
};

const defaultPrefs: Preferences = {
  persona: 'Citizen',
  electorate: 'Sydney',
  postcode: '2000',
  issues: ['Housing', 'Climate', 'Economy'],
  media: { balance: 50, reduceOpinion: true, avoidPaywalled: false, exclude: [] },
  mps: ['Alex Smith'],
  cadence: { mode: 'Email', time: '07:30', weekdays: ['Mon','Tue','Wed','Thu','Fri'] },
  consent: { telemetry: false, personalisedEmail: true },
};

function coerceLocal(input: any): Preferences {
  const p = { ...defaultPrefs, ...(input ?? {}) } as Preferences;
  p.persona = (['Citizen','Power User','Journalist','Educator'] as const).includes(p.persona) ? p.persona : 'Citizen';
  p.postcode = String(p.postcode ?? '').slice(0, 8);
  p.electorate = String(p.electorate ?? '').slice(0, 64);
  p.issues = Array.isArray(p.issues) ? [...new Set(p.issues.map(String))].slice(0, 12) : defaultPrefs.issues;
  p.media = {
    balance: Math.min(100, Math.max(0, Number(p.media?.balance ?? 50))),
    reduceOpinion: !!p.media?.reduceOpinion,
    avoidPaywalled: !!p.media?.avoidPaywalled,
    exclude: Array.isArray(p.media?.exclude) ? [...new Set(p.media.exclude.map(String))].slice(0, 16) : [],
  };
  p.mps = Array.isArray(p.mps) ? [...new Set(p.mps.map(String))].slice(0, 10) : [];
  const wd = Array.isArray(p.cadence?.weekdays) ? p.cadence.weekdays : defaultPrefs.cadence.weekdays;
  p.cadence = {
    mode: p.cadence?.mode === 'Push' ? 'Push' : 'Email',
    time: String(p.cadence?.time ?? '07:30'),
    weekdays: wd.filter((d) => ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].includes(d)),
  };
  p.consent = { telemetry: !!p.consent?.telemetry, personalisedEmail: !!p.consent?.personalisedEmail };
  return p;
}

export default function PersonalisePage() {
  const [cfg, setCfg] = useState<Preferences>(defaultPrefs);
  const [mpInput, setMpInput] = useState('');
  const [issueInput, setIssueInput] = useState('');
  const [saving, setSaving] = useState<'idle'|'saving'|'saved'|'error'>('idle');

  // Load existing cookie (if you set one previously)
  useEffect(() => {
    try {
      const raw = document.cookie.split('; ').find(s => s.startsWith('v_prefs='))?.split('=')[1];
      if (raw) {
        const parsed = JSON.parse(atob(raw.replace(/-/g,'+').replace(/_/g,'/')));
        setCfg(coerceLocal(parsed));
      }
    } catch {}
  }, []);

  const coverage = useMemo(() => {
    const left = Math.max(0, 50 - cfg.media.balance / 2);
    const right = Math.max(0, cfg.media.balance / 2);
    const center = Math.max(0, 100 - left - right);
    return { left, center, right };
  }, [cfg.media.balance]);

  async function save() {
    setSaving('saving');
    try {
      const res = await fetch('/api/preferences', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(cfg),
      });
      if (!res.ok) throw new Error('Bad status');
      setSaving('saved');
      setTimeout(() => setSaving('idle'), 1200);
    } catch {
      setSaving('error');
      setTimeout(() => setSaving('idle'), 1500);
    }
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <header className="sticky top-0 z-20 border-b border-zinc-900/60 bg-black/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="text-lg font-semibold">Verity · Personalise</div>
          <button
            onClick={save}
            className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm hover:bg-zinc-800"
            disabled={saving==='saving'}
          >
            {saving==='saving' ? 'Saving…' : saving==='saved' ? 'Saved ✓' : saving==='error' ? 'Error — retry' : 'Save preferences'}
          </button>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-2">
        {/* Controls */}
        <div className="space-y-4">
          <Card className="p-5">
            <div className="text-sm font-semibold">Who are you?</div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {(['Citizen','Power User','Journalist','Educator'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setCfg(c => ({ ...c, persona: p }))}
                  className={`rounded-xl border px-3 py-2 text-sm ${cfg.persona===p ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900'}`}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <input
                className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-sm outline-none"
                placeholder="Electorate"
                value={cfg.electorate}
                onChange={(e)=>setCfg(c=>({...c, electorate: e.target.value.slice(0,64)}))}
              />
              <input
                className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-sm outline-none"
                placeholder="Postcode"
                value={cfg.postcode}
                onChange={(e)=>setCfg(c=>({...c, postcode: e.target.value.slice(0,8)}))}
              />
              <select
                className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-sm"
                value={cfg.cadence.mode}
                onChange={(e)=>setCfg(c=>({...c, cadence: {...c.cadence, mode: e.target.value as 'Email'|'Push'}}))}
              >
                <option>Email</option>
                <option>Push</option>
              </select>
            </div>
          </Card>

          <Card className="p-5">
            <div className="text-sm font-semibold">Issues you care about</div>
            <div className="mt-3 flex gap-2">
              <input
                className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-sm outline-none"
                placeholder="Add an issue (e.g., Housing)"
                value={issueInput}
                onChange={(e)=>setIssueInput(e.target.value)}
                onKeyDown={(e)=>{ if(e.key==='Enter' && issueInput.trim()){ setCfg(c=>({...c, issues: [...new Set([...c.issues, issueInput.trim()])].slice(0,12)})); setIssueInput(''); } }}
              />
              <button
                className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm"
                onClick={()=>{ if(issueInput.trim()){ setCfg(c=>({...c, issues: [...new Set([...c.issues, issueInput.trim()])].slice(0,12)})); setIssueInput(''); }}}
              >Add</button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {cfg.issues.map(it => (
                <span key={it} className="rounded-xl border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs">
                  {it}
                  <button className="ml-2 text-zinc-400" onClick={()=>setCfg(c=>({...c, issues: c.issues.filter(x=>x!==it)}))}>×</button>
                </span>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <div className="text-sm font-semibold">Media balance</div>
            <div className="mt-3 text-xs text-zinc-400">0 = more left sources · 100 = more right sources</div>
            <input
              type="range" min={0} max={100} value={cfg.media.balance}
              onChange={(e)=>setCfg(c=>({...c, media: {...c.media, balance: Number(e.target.value)}}))}
              className="mt-2 w-full"
            />
            <div className="mt-2 grid grid-cols-3 gap-3 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={cfg.media.reduceOpinion}
                  onChange={e=>setCfg(c=>({...c, media: {...c.media, reduceOpinion: e.target.checked}}))}/>
                Reduce opinion
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={cfg.media.avoidPaywalled}
                  onChange={e=>setCfg(c=>({...c, media: {...c.media, avoidPaywalled: e.target.checked}}))}/>
                Avoid paywalled
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={!!cfg.consent?.personalisedEmail}
                  onChange={e=>setCfg(c=>({...c, consent: {...(c.consent ?? {}), personalisedEmail: e.target.checked}}))}/>
                Personalised email
              </label>
            </div>
          </Card>

          <Card className="p-5">
            <div className="text-sm font-semibold">Follow MPs</div>
            <div className="mt-3 flex gap-2">
              <input
                className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-sm outline-none"
                placeholder="Add MP name"
                value={mpInput}
                onChange={(e)=>setMpInput(e.target.value)}
                onKeyDown={(e)=>{ if(e.key==='Enter' && mpInput.trim()){ setCfg(c=>({...c, mps: [...new Set([...c.mps, mpInput.trim()])].slice(0,10)})); setMpInput(''); } }}
              />
              <button
                className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm"
                onClick={()=>{ if(mpInput.trim()){ setCfg(c=>({...c, mps: [...new Set([...c.mps, mpInput.trim()])].slice(0,10)})); setMpInput(''); }}}
              >Add</button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {cfg.mps.map(m => (
                <span key={m} className="rounded-xl border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs">
                  {m}
                  <button className="ml-2 text-zinc-400" onClick={()=>setCfg(c=>({...c, mps: c.mps.filter(x=>x!==m)}))}>×</button>
                </span>
              ))}
            </div>
          </Card>
        </div>

        {/* Live preview */}
        <div className="space-y-4">
          <Card className="p-5">
            <div className="text-sm text-zinc-400">Preview</div>
            <h3 className="mt-1 text-xl font-semibold">Your daily brief</h3>
            <p className="text-sm text-zinc-300">
              {cfg.persona} · {cfg.electorate || 'Electorate'} ({cfg.postcode || 'Postcode'}) · Issues: {cfg.issues.join(', ') || 'Pick a few'}
            </p>
          </Card>

          <Card className="p-5">
            <div className="text-sm font-semibold">Your news</div>
            <div className="mt-2 text-xs text-zinc-400">
              Coverage mix · Left {coverage.left.toFixed(0)}% · Centre {coverage.center.toFixed(0)}% · Right {coverage.right.toFixed(0)}%
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {[1,2].map(i => (
                <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3">
                  <div className="text-xs text-zinc-400">{cfg.issues[0] || 'Topic'} · Today</div>
                  <div className="mt-0.5 text-sm font-semibold">Sample headline {i}</div>
                  <div className="mt-2 h-2 overflow-hidden rounded-md border border-zinc-700 flex">
                    <div className="h-full" style={{ width: `${coverage.left}%`, background: 'rgba(96,165,250,1)' }} />
                    <div className="h-full" style={{ width: `${coverage.center}%`, background: 'rgba(113,113,122,1)' }} />
                    <div className="h-full" style={{ width: `${coverage.right}%`, background: 'rgba(248,113,113,1)' }} />
                  </div>
                  <div className="mt-1 text-xs text-zinc-500">
                    Receipts shown • Ownership context • Opinion {cfg.media.reduceOpinion ? 'reduced' : 'normal'}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <div className="text-sm font-semibold">Your MPs</div>
            <ul className="mt-2 space-y-2 text-sm text-zinc-300">
              {cfg.mps.length ? cfg.mps.map(m => <li key={m}>• {m} — votes & signals tracked</li>) : <li>Follow at least one MP for voting alerts.</li>}
            </ul>
          </Card>

          <Card className="p-5">
            <div className="text-sm font-semibold">Cadence</div>
            <div className="text-sm text-zinc-300">
              {cfg.cadence.mode} brief at {cfg.cadence.time} on {cfg.cadence.weekdays.join(' ')}
            </div>
          </Card>
        </div>
      </main>

      <footer className="border-t border-zinc-900/60 bg-black/60 py-6 text-sm text-zinc-400">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
          <div>© 2025 Verity</div>
          <div>Receipts. Ownership. Bias surfaced. Personalised.</div>
        </div>
      </footer>
    </div>
  );
}
