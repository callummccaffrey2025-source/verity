import { notFound } from "next/navigation";
import { loadJSON } from "@/utils/load";
import PreviewCard from "@/components/PreviewCard";
type Item = { title:string; subtitle?:string; href:string; img?:string; meta?:Record<string,string|number> };
type Collection = { name:string; items: Item[] };
export const revalidate = 0;
export default async function Collection({ params }:{ params:{ collection:string }}) {
  let data: Collection | null = null;
  try { data = await loadJSON<Collection>(`/data/previews/${params.collection}.json`); } catch { notFound(); }
  if (!data) notFound();
  return (
    <div>
      <h1 className="text-2xl font-bold">{data.name}</h1>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((it, i) => <PreviewCard key={i} {...it} />)}
      </div>
    </div>
  );
}
