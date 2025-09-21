import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
export const metadata = { title: "Search", alternates: { canonical: "/search" } };
import EmptyState from "@/components/EmptyState";
type PageProps = { searchParams?: Record<string, string | string[] | undefined> };
import MPList from "@/app/mps/parts/MPList";
import ClusterCard from "@/components/ClusterCard";
import BillListItem from "@/components/BillListItem";
import { demoSearch, type BillHit, type MPHit, type ArticleHit } from "@/lib/search";
export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }){
  const sp = await searchParams;
const q = typeof sp?.q === 'string' ? sp.q : '';
  const results = demoSearch(q);
  
  
  return (
    <main className="mx-auto max-w-6xl px-4 md:px-5 py-8">
  <PageHeader title="Search" subtitle="Everything in one place" />
<p className="mt-1 text-sm text-zinc-400">Query: <kbd className="rounded border border-zinc-700 px-1.5 py-0.5">{q || '—'}</kbd></p>

      
      
      {/* Bills */}
      <section className="mt-6">
        <h2 className="text-sm font-medium text-zinc-300">Bills <span className="text-zinc-500 tabular ml-1">({results.bills.length})</span></h2>
        {results.bills.length ? (
          <ul className="mt-2 space-y-3">
            {results.bills.map(b => (
              <li key={b.id} className="card p-4">
                <BillListItem bill={{ id: b.id, title: b.title, predictedPass: b.predictedPass ?? 0, youFollow: false }} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-2 card p-4 text-sm text-zinc-400">No bills found.</div>
        )}
      </section>

      {/* MPs */}
      <section className="mt-8">
        <h2 className="text-sm font-medium text-zinc-300">MPs <span className="text-zinc-500 tabular ml-1">({results.mps.length})</span></h2>
        {results.mps.length ? (
          <div className="mt-2">
            <MPList items={results.mps.map(m => ({ id: m.id, name: m.name, party: m.party ?? "" }))} />
          </div>
        ) : (
          <div className="mt-2 card p-4 text-sm text-zinc-400">No MPs found.</div>
        )}
      </section>

      {/* News */}
      <section className="mt-8">
        <h2 className="text-sm font-medium text-zinc-300">News <span className="text-zinc-500 tabular ml-1">({results.articles.length})</span></h2>
        {results.articles.length ? (
          <div className="mt-2 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.articles.map(a => (
              <ClusterCard
                key={a.id}
                cluster={{
                  id: a.id,
                  title: a.title,
                  stance: a.stance || "Neutral",
                  storyCount: 1,
                  summary: "",
                  tags: []
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyState>No news yet.</EmptyState>
        )}
      </section>

    </main>
  );
}
