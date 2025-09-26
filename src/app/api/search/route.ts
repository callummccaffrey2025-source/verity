import { NextRequest } from 'next/server';
import { getSupabase } from '@/lib/supabase';
export async function GET(req: NextRequest) {
  try {
    const q = (new URL(req.url)).searchParams.get('q')?.trim() || '';
    const sb = getSupabase();
    if (!sb || !q) return Response.json({ q, results: [] });
    const [bills, mps] = await Promise.all([
      sb.from('bills').select('id,title').ilike('title', `%${q}%`).limit(10),
      sb.from('mps').select('id,name').ilike('name', `%${q}%`).limit(10),
    ]);
    if (bills.error) { console.error('search bills error:', bills.error.message); return Response.json({ q, results: [] }); }
    if (mps.error)   { console.error('search mps error:',   mps.error.message);   return Response.json({ q, results: [] }); }
    return Response.json({ q, results: [{ type:'bill', items: bills.data ?? [] }, { type:'mp', items: mps.data ?? [] }]});
  } catch (e:any) {
    console.error('search route crash:', e?.message || e);
    return Response.json({ q: '', results: [] });
  }
}
