import { loadJSON } from "@/utils/load";
import NewsCard, { Story } from "@/components/news/NewsCard";
export const revalidate=0;
export default async function News(){
  const data = await loadJSON<{clusters:string[];stories:Story[]}>("/data/news.json");
  return (<div>
    <h1 className="font-extrabold">Today’s coverage, without the spin</h1>
    <p className="mt-2 text-zinc-400">Side-by-side receipts. Ownership context. Bias at a glance.</p>
    <div className="mt-4 flex flex-wrap gap-2">
      {data.clusters.map(c=><a key={c} href={`/news/${encodeURIComponent(c)}`} className="px-3 py-1.5 rounded-full text-sm border border-zinc-800 bg-zinc-900/30 text-zinc-300 hover:border-emerald-700/60">{c}</a>)}
    </div>
    <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
      {data.stories.map((s,i)=><NewsCard key={i} s={s}/>)}
    </section>
  </div>);
}
