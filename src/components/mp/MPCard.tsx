'use client';

import Link from 'next/link';
import Image from 'next/image'

type MP = {
  slug?: string;
  name?: string;
  party?: string;
  chamber?: string;
  electorate?: string;
  state?: string;
  portrait_url?: string;
  attendance?: { last12mPct?: number | string; overallPct?: number | string };
  attendance_12m?: number | string;
  attendance_overall?: number | string;
  rebellions12m?: number | string;
  committees?: unknown[];
  committeesCount?: number;
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function slugFor(m:any){
  const n = m?.slug ?? (m?.name ? m.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'') : '');
  return (n || '').trim();
}
export default function MPCard({ mp }: { mp: MP }) {
  const m: any = mp || {};
  const name = m.name ?? '';
  const slug = m.slug ?? (name ? slugify(name) : '');
  const href = slug ? `/mps/${slug}` : '/mps';
  const portraitUrl = m.portrait_url || null;

  const att12 = m?.attendance?.last12mPct ?? m?.attendance_12m ?? null;
  const attOverall = m?.attendance?.overallPct ?? m?.attendance_overall ?? null;
  const committeesCount = Array.isArray(m?.committees)
    ? m.committees.length
    : (m?.committeesCount ?? 0);

  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex items-center gap-3">
        {portraitUrl && (<img src={portraitUrl} alt={`${name} portrait`}
            className="h-12 w-10 rounded-md object-cover"
          />) }
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{name}</h3>
          <div className="truncate text-xs text-zinc-400">
            {(m.party || '—') +
              ' · ' +
              (m.chamber || (m.state ? 'Senate' : 'House')) +
              (m.electorate ? ` · ${m.electorate}` : m.state ? ` · ${m.state}` : '')}
          </div>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-zinc-300 md:grid-cols-4">
        <div>
          Attendance (12m){' '}
          <span className="text-zinc-100 font-medium">
            {att12 == null || att12 === '' ? '—' : `${att12}%`}
          </span>
        </div>
        <div>
          Overall attendance{' '}
          <span className="text-zinc-100 font-medium">
            {attOverall == null || attOverall === '' ? '—' : `${attOverall}%`}
          </span>
        </div>
        <div>
          Rebellions (12m){' '}
          <span className="text-zinc-100 font-medium">{m.rebellions12m ?? 0}</span>
        </div>
        <div>
          Committees{' '}
          <span className="text-zinc-100 font-medium">{committeesCount}</span>
        </div>
      </div>

      <div className="mt-3">
        <Link href={href} aria-label={`Open profile for ${name}`} className="text-emerald-300 text-sm hover:underline">Open profile →</Link>
      </div>
    </article>
  );
}

export { MPCard };
