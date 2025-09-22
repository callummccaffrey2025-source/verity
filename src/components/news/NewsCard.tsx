import type { NewsItem } from "@/types";
import Card from "@/components/ui/card";
export default function NewsCard({ item }: { item: NewsItem }){
  return (
    <a href={item.url} target="_blank" rel="noreferrer" className="block">
      <Card className="p-5 transition hover:translate-y-[-1px]">
        <div className="mb-1 text-xs text-white/60">{item.source} · {new Date(item.published).toLocaleDateString()}</div>
        <div className="font-medium text-emerald hover:underline">{item.title}</div>
        {item.topic && <div className="mt-1 text-xs text-white/50">{item.topic}</div>}
      </Card>
    </a>
  );
}
