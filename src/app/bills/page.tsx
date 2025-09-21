import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
export const metadata = { title: "Bills", alternates: { canonical: "/bills" } };
import BillListItem from "@/components/BillListItem";
import ContextPanel from '@/components/shared/ContextPanel';
import Row from '@/components/list/Row';
const items = [
  { title:'Housing Affordability Bill 2025', meta:'Status: Second Reading • Source: gov' },
  { title:'Digital Safety Amendment', meta:'Status: Committee • Source: verifiedNews' },
];
function StageTracker(){ return (
  <div className="mt-1 flex gap-2 text-xs text-zinc-400">
    <span className="px-2 py-0.5 rounded-full border border-zinc-700">Introduced</span>
    <span className="px-2 py-0.5 rounded-full border border-zinc-700">House</span>
    <span className="px-2 py-0.5 rounded-full border border-zinc-700">Senate</span>
    <span className="px-2 py-0.5 rounded-full border border-zinc-700">Royal Assent</span>
  </div>
);}

export default function Page(){
  return (
    <div>
      
      <div className="space-y-3">{items.map((x,i)=><Row key={i} {...x}/>)}</div>
    </div>
  );
}
