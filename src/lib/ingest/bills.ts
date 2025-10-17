import { supabaseServer } from "@/lib/supabase-server";

type Bill = { id:string; title:string; stage?:string; introduced?:string; sponsor?:string; summary?:string; progress?:string; };

function decodeDataUrl(u:string){ const m=u.match(/^data:([^,]*),(.*)$/); if(!m) return null; return { mime:m[1]||"text/plain", body:decodeURIComponent(m[2]) }; }
async function fetchText(url:string){ const d=decodeDataUrl(url); if(d) return { mime:d.mime, text:d.body }; const r=await fetch(url); if(!r.ok) throw new Error(`Fetch failed: ${r.status}`); return { mime:r.headers.get("content-type")||"text/plain", text:await r.text() }; }
function parseCSV(text:string):Bill[]{ const lines=text.trim().split(/\r?\n/); if(!lines.length) return []; const header=lines.shift()!.split(",").map(s=>s.trim()); const idx=(k:string)=>header.indexOf(k); const out:Bill[]=[]; for(const line of lines){ if(!line.trim()) continue; const c=line.split(","); const b:Bill={ id:c[idx("id")]?.trim(), title:c[idx("title")]?.trim(), stage:c[idx("stage")]?.trim(), introduced:c[idx("introduced")]?.trim(), sponsor:c[idx("sponsor")]?.trim(), summary:c[idx("summary")]?.trim(), progress:c[idx("progress")]?.trim() }; if(b.id && b.title) out.push(b); } return out; }
function parseJSON(text:string):Bill[]{ const v=JSON.parse(text); if(Array.isArray(v)) return v as Bill[]; if(Array.isArray(v?.items)) return v.items as Bill[]; throw new Error("JSON must be an array of bills"); }

export async function runIngestBills(url:string){
  if(!url) throw new Error("No url provided");
  const { mime, text } = await fetchText(url);
  const rows = (/json/i.test(mime) || /^\s*\[/.test(text)) ? parseJSON(text) : parseCSV(text);
  if(!rows.length) return { ok:true, count:0, source:url };

  const sb = supabaseServer();

  // Dev convenience: try to create table if missing (ignore on failure)
  await sb.rpc("exec_sql", { sql: `
    create table if not exists public.bills (
      id text primary key,
      title text not null,
      stage text,
      introduced date,
      sponsor text,
      summary text,
      progress text
    );
  `}).catch(()=>{});

  const { error } = await sb.from("bills").upsert(
    rows.map(r=>({ id:r.id, title:r.title, stage:r.stage??null, introduced:r.introduced??null,
                   sponsor:r.sponsor??null, summary:r.summary??null, progress:r.progress??null })),
    { onConflict:"id" }
  );
  if(error) throw new Error(error.message);
  return { ok:true, count:rows.length, source:url };
}
