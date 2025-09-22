import Section from "@/components/shared/Section";
import NewsCard from "@/components/news/NewsCard";
import { News } from "@/lib/sample-data";
export default function Page(){
  return (
    <Section title="News">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {News.map((n)=> (<NewsCard key={n.id} item={n} />))}
      </div>
    </Section>
  );
}
