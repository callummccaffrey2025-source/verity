import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
export const metadata = { title: "News", alternates: { canonical: "/news" } };
import EmptyState from "@/components/EmptyState";
import StanceLegend from "@/components/news/StanceLegend";
import ClusterCard from "@/components/ClusterCard";

export default function Page(){
  const clusters = [
    { id:"c1", title:"Migration bill backlash", stance:"Critical",  storyCount:8, summary:"Editors note...", tags:["Immigration","Parliament"] },
    { id:"c2", title:"Cost of living relief",   stance:"Supportive", storyCount:5, summary:"Editors note...", tags:["Economy","Budget"] },
    { id:"c3", title:"TikTok ban debate",       stance:"Neutral",    storyCount:6, summary:"Editors note...", tags:["Tech","Security"] },
  ];
  return (
    <main className="mx-auto max-w-6xl px-4 md:px-5 py-8">
  <PageHeader title="News" subtitle="Curated clusters with stance signal" />
<div className="mb-6 flex items-end justify-between">
        
        <StanceLegend />
      </div>
      {clusters.length ? (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {clusters.map(c => (<ClusterCard key={c.id} cluster={c} />))}
  </div>
) : (
  <EmptyState>
    No news clusters yet. Try following a topic to see summaries here.
  </EmptyState>
)}
    </main>
  );
}
