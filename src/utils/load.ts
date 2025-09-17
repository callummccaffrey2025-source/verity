import { headers } from "next/headers";
async function fsFallback<T>(path:string):Promise<T>{
  const { readFile } = await import("fs/promises"); const { join } = await import("path");
  const file = join(process.cwd(),"public",path.replace(/^\/+/,"")); const raw = await readFile(file,"utf-8"); return JSON.parse(raw) as T;
}
export async function loadJSON<T=unknown>(path:string):Promise<T>{
  if(!path) throw new Error("loadJSON: path required");
  if(!path.startsWith("/")){ const r=await fetch(path,{cache:"no-store"}); if(!r.ok) throw new Error(`${path}: ${r.status}`); return r.json(); }
  if(typeof window==="undefined"){
    const h=headers(); const host=h.get("x-forwarded-host")??h.get("host")??"localhost:3000";
    const proto=h.get("x-forwarded-proto")??(host.includes("localhost")?"http":"https");
    const url=`${proto}://${host}${path}`;
    try{ const r=await fetch(url,{cache:"no-store"}); if(!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); }
    catch{ return fsFallback<T>(path); }
  }
  const r=await fetch(path,{cache:"no-store"}); if(!r.ok) throw new Error(`${path}: ${r.status}`); return r.json();
}
