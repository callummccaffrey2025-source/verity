import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import RelatedSearch from "@/components/related-search";

export async function generateMetadata({ params }:{ params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bill = db.bills().find(b => b.id === id);
  return {
    title: bill ?  : "Bill — Verity",
    description: bill ?  : "Bill details"
  };
}

export default async function Page({ params }:{ params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bill = db.bills().find(b => b.id === id);
  if (!bill) notFound();

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/bills" className="text-sm underline text-neutral-400 hover:text-emerald-400">← Back to bills</Link>
      <h1 className="mt-2 font-serif text-3xl md:text-4xl font-extrabold">{bill.title}</h1>
      <div className="mt-3 text-neutral-400">
        <span className="rounded bg-emerald-900/30 px-2 py-0.5 text-emerald-300 text-xs">{bill.stage}</span>
        <span className="ml-3 text-sm">Updated: {(bill.last_updated ? bill.last_updated.slice(0,10) : "—")}</span>
      </div>

      <section className="mt-6 rounded-2xl border border-neutral-800 p-5 bg-neutral-950/60">
        <h2 className="text-lg font-semibold">What this means</h2>
        <p className="mt-2 text-neutral-300">
          This page tracks the bill’s current stage and links out to primary sources.
          Use the “Recent mentions” below to see it in Hansard, media, and official docs.
        </p>
      </section>

      <RelatedSearch q={bill.title} />
    </main>
  );
}
