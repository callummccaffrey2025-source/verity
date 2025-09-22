import Hero from "@/components/hero/Hero";
import Section from "@/components/shared/Section";
import MPCard from "@/components/mp/MPCard";
import BillCard from "@/components/bill/BillCard";
import NewsCard from "@/components/news/NewsCard";
import { MPs, Bills, News } from "@/lib/sample-data";

export default function Page(){
  return (
    <div className="space-y-12">
      <Hero />

      <Section title="Your MPs" ctaHref="/mps">
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {MPs.map((m)=> (<MPCard key={m.id} mp={m} />))}
        </div>
      </Section>

      <Section title="Active Bills" ctaHref="/bills">
        <div className="grid gap-5 md:grid-cols-2">
          {Bills.map((b)=> (<BillCard key={b.id} bill={b} />))}
        </div>
      </Section>

      <Section title="Latest News" ctaHref="/news">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {News.map((n)=> (<NewsCard key={n.id} item={n} />))}
        </div>
      </Section>
    </div>
  );
}
