import { loadJSON } from "@/utils/load"; import NewsCard,{Story} from "@/components/ground/NewsCard";
export const revalidate = 0;
type GroundData={topics:string[]; stories:Story[]};
export default async function Ground({ searchParams }:{searchParams:{topic?:string}}){
  const data=await loadJSON<GroundData>("/data/ground-pro.json");
  const topic=searchParams.topic&&data.topics.includes(searchParams.topic)?searchParams.topic:"For you";
  const stories=data.stories.filter(s=>topic==="For you"||s.topic===topic);
  return(<div>
    <div className="mb-4"><h1>Today’s coverage, without the spin</h1><div className="text-zinc-400 mt-2">Side-by-side receipts. Ownership context. Bias at a glance.</div></div>
    <div className="mb-6 flex flex-wrap gap-2">
      {data.topics.map(t=>{const active=t===topic;return(<a key={t} href={`/ground?topic=${encodeURIComponent(t)}`} className={active?"px-3 py-1.5 rounded-full text-sm border border-emerald-600 bg-emerald-900/20 text-emerald-300":"px-3 py-1.5 rounded-full text-sm border border-zinc-800 bg-zinc-900/30 text-zinc-300 hover:border-emerald-700/60"}>{t}</a>);})}
    </div>
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">{stories.map((s,i)=><NewsCard key={i} story={s} />)}</section>
  </div>);
}
