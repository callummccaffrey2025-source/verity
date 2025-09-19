import CoverageBar from "@/components/ground/CoverageBar";
import { timeAgo } from "@/utils/datetime";
type Src={name:string;owner?:string;url:string;stance?:"left"|"center"|"right"|"neutral"};
export type Story={cluster:string;title:string;excerpt?:string;published_at:string;coverageMix:{left:number;center:number;right:number};primary:Src;others?:Src[]};
function Dot({ stance }:{stance?:Src["stance"]}){const m={left:"var(--left)",center:"var(--center)",right:"var(--right)",neutral:"var(--brand)"} as const;return <span style={{background: stance?m[stance]:"var(--center)"}} className="inline-block w-2 h-2 rounded-full align-middle mr-1" />;}
export default function NewsCard({ s }:{ s:Story }){
  return(<article className="card rounded-2xl p-4">
    <div className="text-xs text-neutral-100">{s.cluster} · {new Date(s.published_at).toLocaleDateString("en-AU",{weekday:"short",hour:"2-digit",minute:"2-digit"})}</div>
    <h3 className="mt-2 text-[18px] font-semibold leading-snug">{s.title}</h3>
    {s.excerpt && <p className="mt-1 text-sm text-neutral-100">{s.excerpt}</p>}
    <div className="mt-3"><CoverageBar mix={s.coverageMix}/></div>
    <div className="mt-3 flex items-center justify-between gap-3">
      <div className="text-sm text-neutral-100"><Dot stance={s.primary.stance}/><span className="font-medium">{s.primary.name}</span>{s.primary.owner && <span className="text-zinc-500"> · {s.primary.owner}</span>}<span className="text-zinc-500"> · {timeAgo(s.published_at)}</span></div>
      <a href={s.primary.url} className="btn">Open source →</a>
    </div>
  </article>);
}
