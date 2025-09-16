"use client";
import { useEffect, useState } from "react";

type Hit = { title?: string; url?: string; snippet?: string };

export default function RelatedSearch({ q }: { q: string }) {
  const [hits, setHits] = useState<Hit[]>([]);
  useEffect(() => {
    let off = false;
    (async () => {
      try {
        const r = await fetch("/api/search?q=" + encodeURIComponent(q));
        const j = await r.json();
        if (!off) setHits(Array.isArray(j.hits) ? j.hits.slice(0, 5) : []);
      } catch {
        if (!off) setHits([]);
      }
    })();
    return () => { off = true; };
  }, [q]);

  if (!hits.length) return null;
  return (
    <section className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-950/60 p-5">
      <h2 className="text-lg font-semibold">Recent mentions</h2>
      <ul className="mt-3 space-y-2">
        {hits.map((h, i) => {
          const link = h.url || ("/search?q=" + encodeURIComponent(q));
          const title = h.title || h.url || "Result";
          return (
            <li key={i} className="text-sm">
              <a className="underline" href={link}>{title}</a>
              {h.snippet ? <span className="text-neutral-400"> — {h.snippet}</span> : null}
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-sm"><a className="underline" href={"/search?q=" + encodeURIComponent(q)}>Open in Search →</a></p>
    </section>
  );
}
\TSX

###############################################################################
# Product page – chips + “Open full page →” links
###############################################################################
mkdir -p "src/app/(site)/product"
cat > "src/app/(site)/product/page.tsx" <<TSX
import type { ReactNode } from "react";
import AskSection from "@/components/product/AskSection";
import SearchSection from "@/components/product/SearchSection";
import BillsSection from "@/components/product/BillsSection";
import MPsSection from "@/components/product/MPsSection";
import AlertsBriefingsSection from "@/components/product/AlertsBriefingsSection";

export const metadata = {
  title: "Product — Verity",
  description: "Ask with citations, search sources, track bills, browse MPs, build alerts.",
  alternates: { canonical: "/product" },
  openGraph: { images: ["/og?title=Product"] },
};

function Card({ id, title, subtitle, children }:{
  id: string; title: string; subtitle: string; children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={id + "-h"} className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-5">
      <h3 id={id + "-h"} className="text-emerald-400 font-semibold">{title}</h3>
      <p className="text-sm text-neutral-400 mb-3">{subtitle}</p>
      <div className="rounded-lg bg-neutral-900/40 border border-neutral-800 p-3">{children}</div>
    </section>
  );
}

const chip = "rounded border border-neutral-800 px-2 py-1 text-sm hover:border-emerald-600";

export default function ProductPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card id="ask" title="Ask" subtitle="Clear answers with citations.">
          <AskSection />
          <div className="mt-3 flex flex-wrap gap-2">
            <a className={chip} href="/ask?q=What%20changed%20in%20the%20budget%3F">Budget update</a>
            <a className={chip} href="/ask?q=What%E2%80%99s%20in%20the%20whistleblower%20bill%3F">Whistleblower bill</a>
          </div>
          <p className="mt-2 text-sm"><a className="underline" href="/ask">Open full Ask page →</a></p>
        </Card>

        <Card id="search" title="Search" subtitle="Bills, Hansard, press releases in one place.">
          <SearchSection />
          <div className="mt-3 flex flex-wrap gap-2">
            <a className={chip} href="/search?q=housing">housing</a>
            <a className={chip} href="/search?q=whistleblower">whistleblower</a>
            <a className={chip} href="/search?q=integrity%20commission">integrity commission</a>
          </div>
          <p className="mt-2 text-sm"><a className="underline" href="/search">Open full Search page →</a></p>
        </Card>

        <Card id="bills" title="Bill tracker" subtitle="Follow changes over time with diffs.">
          <BillsSection />
          <div className="mt-3 flex flex-wrap gap-2">
            <a className={chip} href="/bills?sort=updated">Updated</a>
            <a className={chip} href="/bills?stage=Third%20reading">Third reading</a>
          </div>
          <p className="mt-2 text-sm"><a className="underline" href="/bills">Open full Bills page →</a></p>
        </Card>

        <Card id="mps" title="MP profiles" subtitle="Positions, voting, integrity signals.">
          <MPsSection />
          <div className="mt-3 flex flex-wrap gap-2">
            <a className={chip} href="/mps?party=Greens">Greens</a>
            <a className={chip} href="/mps?party=Labor">Labor</a>
            <a className={chip} href="/mps?party=Liberal">Liberal</a>
          </div>
          <p className="mt-2 text-sm"><a className="underline" href="/mps">Open full MPs page →</a></p>
        </Card>

        <Card id="alerts" title="Alerts & briefings" subtitle="Daily updates on topics, bills, or MPs.">
          <AlertsBriefingsSection />
          <div className="mt-3 flex flex-wrap gap-2">
            <a className={chip} href="/alerts?add=housing">Add “housing”</a>
            <a className={chip} href="/alerts?add=whistleblower">Add “whistleblower”</a>
          </div>
          <p className="mt-2 text-sm"><a className="underline" href="/alerts">Open full Alerts page →</a></p>
        </Card>
      </div>
    </main>
  );
}
\TSX

###############################################################################
# Bill & MP detail pages (server components)
###############################################################################
mkdir -p "src/app/(site)/bills/[id]" "src/app/(site)/mps/[id]"

cat > "src/app/(site)/bills/[id]/page.tsx" <<TSX
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import RelatedSearch from "@/components/RelatedSearch";

export async function generateMetadata({ params }:{ params: { id: string } }) {
  const { id } = params;
  const bill = db.bills().find(b => b.id === id);
  return {
    title: bill ? (bill.title + " — Verity") : "Bill — Verity",
    description: bill ? ("Stage: " + (bill.stage || "—")) : "Bill details"
  };
}

export default async function Page({ params }:{ params: { id: string } }) {
  const { id } = params;
  const bill = db.bills().find(b => b.id === id);
  if (!bill) notFound();

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/bills" className="text-sm underline text-neutral-400 hover:text-emerald-400">← Back to Bills</Link>
      <h1 className="mt-2 font-serif text-3xl md:text-4xl font-extrabold">{bill.title}</h1>
      <div className="mt-3 text-neutral-400">
        <span className="rounded bg-neutral-900 px-2 py-0.5 text-xs border border-neutral-800">{bill.stage || "—"}</span>
        {bill.last_updated ? <span className="ml-2 text-sm">Updated {bill.last_updated.slice(0,10)}</span> : null}
      </div>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-neutral-800 p-5 bg-neutral-950/60">
          <h2 className="text-lg font-semibold">About</h2>
          <p className="mt-2 text-neutral-300">
            Summary and latest stage at a glance. “Recent mentions” links to Hansard and media so you can verify context.
          </p>
        </div>
        <div className="rounded-2xl border border-neutral-800 p-5 bg-neutral-950/60">
          <h2 className="text-lg font-semibold">Useful links</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-neutral-300">
            <li><a className="underline" href={"/search?q=" + encodeURIComponent(bill.title)}>Search this Bill in Verity</a></li>
            <li><a className="underline" href="/sources">Our sources</a></li>
          </ul>
        </div>
      </section>

      <RelatedSearch q={bill.title} />
    </main>
  );
}
\TSX

cat > "src/app/(site)/mps/[id]/page.tsx" <<TSX
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import RelatedSearch from "@/components/RelatedSearch";

export async function generateMetadata({ params }:{ params: { id: string } }) {
  const { id } = params;
  const mp = db.mps().find(m => m.id === id);
  return {
    title: mp ? (mp.name + " — Verity") : "MP — Verity",
    description: mp ? ((mp.party || "Independent") + (mp.electorate ? " · " + mp.electorate : "")) : "MP profile"
  };
}

export default async function Page({ params }:{ params: { id: string } }) {
  const { id } = params;
  const mp = db.mps().find(m => m.id === id);
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
            Party and electorate at a glance. “Recent mentions” shows where this MP appears in the public record.
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

###############################################################################
# Build + boot dev + quick checks
###############################################################################
rm -rf .next
pnpm exec tsc --noEmit
pnpm -s build

# restart dev on :3000
pids=""; [ -n "" ] && kill -9  || true
(pnpm -s dev &>/dev/null &) && sleep 2

# quick probes
codes() { curl -s -o /dev/null -w "%{http_code}" ""; }
BID=""
MID=""

echo "--- HTTP ---"
printf "/product       -> %s\n"  ""
printf "/bills         -> %s\n"  ""
printf "/mps           -> %s\n"  ""
if [ -n "" ] && [ "" != "null" ]; then printf "/bills/%s   -> %s\n" "" ""; fi
if [ -n "" ] && [ "" != "null" ]; then printf "/mps/%s     -> %s\n" "" ""; fi
