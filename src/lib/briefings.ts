import { db } from "./db";
export type Alerts = { topics?: string[]; mpIds?: string[]; billIds?: string[] };
export type BriefItem =
  | { kind:"topic"; topic:string; title:string; url:string; date?:string }
  | { kind:"bill";  id:string; title:string; stage:string; last_updated?:string }
  | { kind:"mp";    id:string; name:string; party?:string; electorate?:string };
export function buildBriefing(alerts: Alerts): BriefItem[] {
  const out: BriefItem[] = []; const seen = new Set<string>();
  const topics = (alerts.topics ?? []).map(t => t.toLowerCase());
  for (const s of db.sources()) {
    const match = topics.find(t => s.title.toLowerCase().includes(t) || s.text.toLowerCase().includes(t));
    if (match) { const k=`topic:${match}:${s.id}`; if(!seen.has(k)){ seen.add(k); out.push({kind:"topic",topic:match,title:s.title,url:s.url,date:s.date}); } }
  }
  for (const id of alerts.billIds ?? []) { const b = db.bill(id); if (b) { const k=`bill:${b.id}`; if(!seen.has(k)){ seen.add(k); out.push({kind:"bill",id:b.id,title:b.title,stage:b.stage,last_updated:b.last_updated}); } } }
  for (const id of alerts.mpIds ?? [])   { const m = db.mp(id);   if (m) { const k=`mp:${m.id}`;   if(!seen.has(k)){ seen.add(k); out.push({kind:"mp",id:m.id,name:m.name,party:m.party,electorate:m.electorate}); } } }
  out.sort((a,b)=>{ const da=("date" in a && a.date)?Date.parse(a.date):0; const dbv=("date" in b && b.date)?Date.parse(b.date):0; return dbv-da; });
  return out.slice(0,50);
}
export type { Alerts as AlertsType };
