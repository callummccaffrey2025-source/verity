"use client";
import { usePathname } from "next/navigation";
const links=[
  {href:"/news",label:"News"},
  {href:"/bills/housing-bill-2025",label:"Bills"},
  {href:"/mps",label:"MPs"},
  {href:"/ownership",label:"Ownership"},
  {href:"/trust",label:"Trust"},
  {href:"/pricing",label:"Pricing"}
];
export default function Nav(){
  const path=usePathname()||"/";
  return(
    <nav aria-label="Primary" className="hidden md:flex gap-6 text-sm">
      {links.map(l=>{
        const active = path===l.href || path.startsWith(l.href+"/");
        return (
          <a key={l.href} href={l.href}
             className={active?"text-emerald-300":"text-zinc-300 hover:text-white"}
             aria-current={active?"page":undefined}>{l.label}</a>
        );
      })}
    </nav>
  );
}
