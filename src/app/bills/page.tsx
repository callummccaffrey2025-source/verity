import Section from "@/components/shared/Section";
import BillCard from "@/components/bill/BillCard";
import { Bills } from "@/lib/sample-data";
export default function Page(){
  return (
    <Section title="Bills">
      <div className="grid gap-5 md:grid-cols-2">
        {Bills.map((b)=> (<BillCard key={b.id} bill={b} />))}
      </div>
    </Section>
  );
}
