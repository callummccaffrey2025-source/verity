import { Search, Gavel, Users, Share2 } from "lucide-react";
export const dynamic="force-static";
function Step({icon:Icon,title,desc}:{icon:any;title:string;desc:string}){return(<div className="card p-5"><div className="flex items-center gap-3"><div className="rounded-xl bg-emerald-900/10 border border-emerald-700/40 p-2 text-emerald-300"><Icon size={18}/></div><div className="font-semibold">{title}</div></div><p className="mt-3 text-sm text-zinc-400">{desc}</p></div>);}
export default function Home(){
  return(<div>
    <section>
      <h1 className="text-[40px] md:text-[56px] leading-[1.05] font-extrabold">Transparency for Australia</h1>
      <p className="mt-3 text-lg text-zinc-300 max-w-2xl">Receipts instead of spin. Personalised briefings on your news, bills, and MPs — for <span className="text-emerald-300 font-semibold">$1/month</span>.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href="/news" className="btn px-4 py-3"><Search size={18}/> See today’s coverage</a>
        <a href="/pricing" className="btn px-4 py-3">Join now</a>
      </div>
    </section>
    <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <Step icon={Search} title="Collect" desc="Ingest from major outlets and registers with provenance."/>
      <Step icon={Share2} title="Compare" desc="Side-by-side receipts with bias bars and ownership context."/>
      <Step icon={Gavel} title="Brief" desc="Bill diffs, stage trackers, MP signals — all cited."/>
      <Step icon={Users} title="Share" desc="Export and share receipts anywhere in one click."/>
    </section>
  </div>);
}
