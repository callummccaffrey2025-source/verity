import { Check } from "lucide-react";
function Li({children}:{children:React.ReactNode}){return(<li className="flex items-start gap-2"><Check size={16} className="mt-0.5 text-emerald-400"/><span className="text-sm text-zinc-300">{children}</span></li>);}
function Plan({name,price,cta,features}:{name:string;price:string;cta:string;features:string[]}){return(<div className="card p-6 flex flex-col"><div className="text-lg font-semibold">{name}</div><div className="mt-2 text-3xl font-extrabold">{price}</div><ul className="mt-4 space-y-2">{features.map((f,i)=><Li key={i}>{f}</Li>)}</ul><a href="/join-waitlist" className="btn mt-6 text-center">{cta}</a></div>);}
export default function Pricing(){
  return(<div><h1 className="font-extrabold">Pricing</h1><p className="mt-2 text-zinc-400">Radically affordable. $1/month for everyone.</p>
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
      <Plan name="Citizen" price="$1/mo" cta="Join $1" features={["Personalised feed","News clusters with receipts","Follow MPs & bills (core)"]}/>
      <Plan name="Annual" price="$10/yr" cta="Pay yearly" features={["All Citizen features","Save 17%","Referral: 3 months free each"]}/>
      <Plan name="Supporter" price="$5/mo" cta="Support Verity" features={["Everything in Annual","Helps fund coverage expansion"]}/>
    </div></div>);
}
