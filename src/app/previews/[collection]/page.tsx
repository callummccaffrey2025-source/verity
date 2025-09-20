import { loadJSON } from "@/utils/load";
import PreviewCard from "@/components/PreviewCard";
import { notFound } from "next/navigation";
type Item = { title:string; subtitle?:string; href:string; img?:string; meta?:Record<string,string|number> };
type Collection = { name:string; items: Item[] };
export const revalidate = 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page(props: any) {
  const { params, searchParams } = props as any;
  try{
    const data = await loadJSON<Collection>(`/data/previews/${params.collection}.json`);
    return (
      <div>
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((it,i)=> <PreviewCard key={i} {...it} />)}
        </div>
      </div>
    );
  }catch{ notFound(); }
}
