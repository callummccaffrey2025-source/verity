export function Tag({ active=false, children }:{ active?:boolean; children:React.ReactNode }){
  return <span className={active?"px-3 py-1.5 rounded-full text-sm border border-emerald-600 bg-emerald-900/20 text-emerald-300":"px-3 py-1.5 rounded-full text-sm border border-zinc-800 bg-zinc-900/30 text-zinc-300"}>{children}</span>;
}
