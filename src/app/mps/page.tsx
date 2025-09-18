import type { MP } from '../../lib/types/mp';
import { searchMPs } from '../../lib/data/mps-all';
import MPList from './parts/MPList';

export const metadata = {
  title: 'MPs — Verity',
  description: 'All Australian MPs. Search, filter, and compare — with receipts.',
};

export default async function MPsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[]>> }) {
  const qs = await searchParams;
  const data = await searchMPs({
    q: typeof qs.q === 'string' ? qs.q : undefined,
    party: Array.isArray(qs.party) ? (qs.party as string[]) : (qs.party ? [qs.party as string] : []),
    chamber: Array.isArray(qs.chamber) ? (qs.chamber as any) : (qs.chamber ? [qs.chamber as any] : []),
    minAttendance: qs.minAttendance ? Number(qs.minAttendance) : undefined,
    page: qs.page ? Number(qs.page) : 1,
    pageSize: qs.pageSize ? Number(qs.pageSize) : 24,
    sort: (qs.sort as any) || 'alpha',
  });

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <header className="sticky top-0 z-30 border-b border-zinc-900/60 bg-black/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <h1 className="text-xl font-semibold">MPs</h1>
          <div className="text-sm text-zinc-400">Australia · {data.total} MPs</div>
        </div>
      </header>
      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-6 md:grid-cols-[300px_1fr]">
        {/* @ts-expect-error Server/Client boundary */}
        <MPList initial={data.items as MP[]} total={data.total} page={data.page} pageSize={data.pageSize} />
      </main>
    </div>
  );
}
