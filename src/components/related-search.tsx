"use client";
import { useEffect, useState } from "react";
type Hit = { url: string; title: string; snippet?: string; sourceId?: string };

export default function RelatedSearch({ q, limit = 5 }: { q: string; limit?: number }) {
  const [hits, setHits] = useState<Hit[]>([]);
  useEffect(() => {
    let alive = true;
    (async () => {
      if (!q) return;
      const r = await fetch("/api/search?q=" + encodeURIComponent(q));
      const j = await r.json();
      if (alive) setHits(((j?.hits ?? []) as Hit[]).slice(0, limit));
    })();
    return () => { alive = false; };
  }, [q, limit]);

  if (!hits.length) return null;
  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold">Recent mentions</h2>
      <ul className="mt-3 space-y-3">
        {hits.map((h, i) => (
          <li key={i} className="rounded-lg border border-neutral-800 p-3 bg-neutral-950/60">
            <a href={h.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-400">{h.title}</a>
            {h.snippet ? <p className="text-sm text-neutral-300 mt-1">{h.snippet}</p> : null}
            {h.sourceId ? <div className="text-xs text-neutral-500 mt-1">Source: {h.sourceId}</div> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
\TSX

# 2) /bills/[id] — server component + metadata
mkdir -p "src/app/(site)/bills/[id]"
cat > "src/app/(site)/bills/[id]/page.tsx" <<TSX
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import RelatedSearch from "@/components/related-search";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const bill = db.bills().find((b) => b.id === id);
  return {
    title: bill ?  : "Bill — Verity",
    description: bill ?  : "Bill details",
  };
}

export default async function Page(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const bill = db.bills().find((b) => b.id === id);
  if (!bill) notFound();

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/bills" className="text-sm underline text-neutral-400 hover:text-emerald-400">← Back to bills</Link>
      <h1 className="mt-2 font-serif text-3xl md:text-4xl font-extrabold">{bill.title}</h1>
      <div className="mt-3 text-neutral-400">
        <span className="rounded bg-emerald-900/30 px-2 py-0.5 text-emerald-300 text-xs">{bill.stage}</span>
        <span className="ml-3 text-sm">Updated: {bill.last_updated ? bill.last_updated.slice(0, 10) : "—"}</span>
      </div>

      <section className="mt-6 rounded-2xl border border-neutral-800 p-5 bg-neutral-950/60">
        <h2 className="text-lg font-semibold">What this means</h2>
        <p className="mt-2 text-neutral-300">
          Track the current stage and scan primary sources. “Recent mentions” shows this bill across
          Hansard, media, and official records so you can verify claims quickly.
        </p>
      </section>

      <RelatedSearch q={bill.title} />
    </main>
  );
}
\TSX

# 3) /mps/[id] — server component + metadata
mkdir -p "src/app/(site)/mps/[id]"
cat > "src/app/(site)/mps/[id]/page.tsx" <<TSX
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import RelatedSearch from "@/components/related-search";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const mp = db.mps().find((m) => m.id === id);
  return {
    title: mp ?  : "MP — Verity",
    description: mp ?  : "MP profile",
  };
}

export default async function Page(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const mp = db.mps().find((m) => m.id === id);
  if (!mp) notFound();

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/mps" className="text-sm underline text-neutral-400 hover:text-emerald-400">← Back to MPs</Link>
      <h1 className="mt-2 font-serif text-3xl md:text-4xl font-extrabold">{mp.name}</h1>
      <div className="mt-3 text-neutral-400">
        <span className="rounded bg-neutral-900 px-2 py-0.5 text-xs border border-neutral-800">{mp.party || "Independent"}</span>
        {mp.electorate ? <span className="ml-2 text-sm">{mp.electorate}</span> : null}
      </div>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-neutral-800 p-5 bg-neutral-950/60">
          <h2 className="text-lg font-semibold">About</h2>
          <p className="mt-2 text-neutral-300">
            Party and electorate at a glance. “Recent mentions” shows where this MP appears in the
            public record so you can validate positions and activity.
          </p>
        </div>
        <div className="rounded-2xl border border-neutral-800 p-5 bg-neutral-950/60">
          <h2 className="text-lg font-semibold">Useful links</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-neutral-300">
            <li><a className="underline" href={"/search?q=" + encodeURIComponent(mp.name)}>Search this MP in Verity</a></li>
            <li><a className="underline" href="/sources">Our sources</a></li>
          </ul>
        </div>
      </section>

      <RelatedSearch q={mp.name} />
    </main>
  );
}
\TSX

# 4) Build & start clean, then probe
rm -rf .next
pnpm -s build

# stop anything on :3000 safely
pids="67552
68738"; if [ -n "" ]; then kill -9  || true; fi
( PORT=3000 pnpm -s start & ) >/dev/null 2>&1
sleep 3

codes(){ curl -s -o /dev/null -w "%{http_code}" ""; }
BID="bill-1"
MID="mp-1"

echo "--- HTTP codes ---"
printf "/bills           -> %s\n"  ""
printf "/mps             -> %s\n"  ""
printf "/bills/%s     -> %s\n" "" ""
printf "/mps/%s       -> %s\n" "" ""
