import Section from "@/components/Section";
import PageHeader from "@/components/PageHeader";
export const metadata = { title: "MPs", alternates: { canonical: "/mps" } };
import MPFilters from "@/components/MPFilters";
import MPCard from '@/components/mp/MPCard';
const demo = [
  { name:'Example MP', party:'Independent', seat:'Example', state:'NSW' },
  { name:'Jane Citizen', party:'Liberal', seat:'North Shore', state:'NSW' },
];
export default function Page(){
  return (
    <div>
      
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {demo.map((m,i)=>(<MPCard key={i} {...m}/>))}
      </div>
    </div>
  );
}
