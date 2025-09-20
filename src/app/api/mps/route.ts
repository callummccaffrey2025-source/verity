import { NextResponse } from 'next/server';
import type { MP } from '@/lib/types';
import fs from 'node:fs/promises';
import path from 'node:path';

function slugify(s: string) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const sort = url.searchParams.get('sort') ?? 'alpha';
    const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
    const pageSize = Math.min(96, Math.max(1, parseInt(url.searchParams.get('pageSize') || '24', 10)));
    const q = (url.searchParams.get('q') || '').trim().toLowerCase();
    const chamber = (url.searchParams.get('chamber') || '').trim().toLowerCase();
    const party = (url.searchParams.get('party') || '').trim().toLowerCase();

    const file = path.join(process.cwd(), 'public', 'data', 'mps-au.json');
    const raw = await fs.readFile(file, 'utf8');
    const all: MP[] = JSON.parse(raw);

    // Normalize missing slugs defensively
    for (const m of (all as MP[])) { if (!m.slug && m.name) m.slug = slugify(m.name); }

    let rows: MP[] = all as MP[];

    if (q) {
      rows = rows.filter((m: MP) =>
        [m.name, m.electorate, m.state, m.party]
          .some(v => String(v || '').toLowerCase().includes(q)));
    }
    if (chamber) rows = rows.filter((m: MP) => String(m.chamber || '').toLowerCase() === chamber);
    if (party)   rows = rows.filter((m: MP) => String(m.party   || '').toLowerCase().includes(party));

    if (sort === 'alpha') {
      rows = rows.slice().sort((a: MP, b: MP) => String(a.name || '').localeCompare(String(b.name || '')));
    }

    const total = rows.length;
    const start = (page - 1) * pageSize;
    const items = rows.slice(start, start + pageSize);

    return NextResponse.json({ items, total }, { status: 200 });
  } catch (e: unknown) {

    // Never 500 the UI—return an empty, well-formed payload
      const msg = e instanceof Error ? e.message : 'failed';
  return NextResponse.json({ items: [], total: 0, error: msg }, { status: 200 });
}
}
