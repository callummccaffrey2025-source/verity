import Link from "next/link";
import { CLUSTERS } from "@/lib/data/news";

export default function NewsIndex() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-semibold">News</h1>
    <p className="mt-2 text-sm text-neutral-300">Top clusters across outlets. Click through for linked coverage.</p>
    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-neutral-300">
      <span className="opacity-70">Stance legend:</span>
      <span className="rounded-full bg-emerald-600/20 px-2 py-0.5 text-emerald-300">Supportive</span>
      <span className="rounded-full bg-red-600/20 px-2 py-0.5 text-red-300">Critical</span>
      <span className="rounded-full ring-1 ring-zinc-600 px-2 py-0.5 text-neutral-200">Neutral</span>
    </div>
      <p className="mt-2 text-sm text-neutral-300">
        Explore curated clusters with bias-aware summaries (demo).
      </p>

      <ul className="mt-6 space-y-3">
        {CLUSTERS.map((c) => (
          <li key={c.id}>
            <Link href={`/news/${c.id}`} className="text-base font-medium hover:underline">
              {c.title}
            </Link>
            <div className="text-sm text-neutral-400">{c.summary}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
