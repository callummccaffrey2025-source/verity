import Section from "@/components/shared/Section";
import MPCard from "@/components/mp/MPCard";
import { MPs } from "@/lib/sample-data";
export default function Page(){
  return (
    <Section title="Members of Parliament">
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
        {MPs.map((m)=> (<MPCard key={m.id} mp={m} />))}
      </div>
    </Section>
  );
}
