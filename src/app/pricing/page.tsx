import Section from "@/components/shared/Section";
import Card from "@/components/ui/card";
export default function Page(){
  const tiers = [
    { name: "Citizen",     price: "$1/mo",  desc: "Personalized daily brief + dashboards." },
    { name: "Analyst",     price: "$15/mo", desc: "Advanced filters, exports, alerts." },
    { name: "Institution", price: "Talk to us", desc: "API, bulk seats, governance tools." },
  ];
  return (
    <Section title="Pricing">
      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map(t => (
          <Card key={t.name} className="p-6">
            <div className="mb-2 text-lg font-semibold">{t.name}</div>
            <div className="mb-2 text-2xl font-bold text-emerald">{t.price}</div>
            <div className="text-sm text-white/70">{t.desc}</div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
