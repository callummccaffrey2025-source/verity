import { search, type BillHit, type MPHit, type ArticleHit } from "@/lib/search";
import ClusterCard from "@/components/ClusterCard";
import BillListItem from "@/components/BillListItem";

export const metadata = { title: "Search — Verity" };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const q = typeof sp?.q === "string" ? sp.q : "";
  const results = await search(q);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Search</h1>
      <p className="mt-1 text-sm text-white/60">
        Showing results for <span className="font-medium text-white">“{q || "all"}”</span>
      </p>

      {/* MPs */}
      <section className="mt-8">
        <h2 className="text-sm font-medium text-zinc-300">
          MPs <span className="text-zinc-500 tabular ml-1">({results.mps.length})</span>
        </h2>
        {results.mps.length ? (
          <ul className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(results.mps as MPHit[]).map((m) => (
              <li key={m.id} className="card p-4">
                <div className="font-medium">{m.name}</div>
                <div className="text-sm text-white/70">
                  {m.party} — {m.electorate}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-2 card p-4 text-sm text-zinc-400">No MPs found.</div>
        )}
      </section>

      {/* Bills */}
      <section className="mt-10">
        <h2 className="text-sm font-medium text-zinc-300">
          Bills <span className="text-zinc-500 tabular ml-1">({results.bills.length})</span>
        </h2>
        {results.bills.length ? (
          <ul className="mt-2 space-y-3">
            {(results.bills as BillHit[]).map((b) => (
              <li key={b.id} className="card p-4">
                <BillListItem
                  bill={{
                    id: b.id,
                    title: b.title,
                    predictedPass: b.predictedPass ?? 0,
                    youFollow: false,
                  }}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-2 card p-4 text-sm text-zinc-400">No bills found.</div>
        )}
      </section>

      {/* Articles / Clusters */}
      <section className="mt-10">
        <h2 className="text-sm font-medium text-zinc-300">
          News <span className="text-zinc-500 tabular ml-1">({results.articles.length})</span>
        </h2>
        {results.articles.length ? (
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(results.articles as ArticleHit[]).map((a) => (
              <ClusterCard
                key={a.id}
                cluster={{
                  id: a.id,
                  title: a.title,
                  outlet: a.outlet,
                  url: a.url,
                } as any}
              />
            ))}
          </div>
        ) : (
          <div className="mt-2 card p-4 text-sm text-zinc-400">No news found.</div>
        )}
      </section>
    </div>
  );
}
