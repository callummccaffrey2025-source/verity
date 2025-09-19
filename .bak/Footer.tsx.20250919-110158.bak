import { loadJSON } from "@/utils/load";
type Item={date:string;title:string;href:string};
export default async function Footer(){
  const data = await loadJSON<{items:Item[]}>("/data/blog.json").catch(()=>({items:[] as Item[]}));
  return (
    <footer className="site-footer mt-16">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>© {new Date().getFullYear()} Verity</div>
        <nav className="flex gap-5">
          <a href="/news">News</a><a href="/bills/housing-bill-2025">Bills</a><a href="/mps">MPs</a><a href="/ownership">Ownership</a><a href="/trust">Trust</a>
        </nav>
        <div>
          <div className="text-zinc-400 mb-2">Changelog</div>
          <ul className="space-y-1">
            {data.items.slice(0,3).map((it,i)=>(<li key={i}><a className="text-zinc-300 hover:text-white" href={it.href}>{it.title}</a> <span className="text-zinc-500">· {it.date}</span></li>))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
