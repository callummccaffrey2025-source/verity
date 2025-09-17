"use client";
import { useState } from "react"; import { Button } from "@/components/ui/Button"; import { Input } from "@/components/ui/Input";
export default function JoinForm(){
  const [status,setStatus]=useState<"idle"|"loading"|"ok"|"err">("idle"); const [email,setEmail]=useState("");
  async function onSubmit(e:React.FormEvent<HTMLFormElement>){e.preventDefault(); if(!email.includes("@")){setStatus("err");return;} setStatus("loading");
    try{const res=await fetch("/api/waitlist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email})}); if(!res.ok) throw new Error(); setStatus("ok");}
    catch{setStatus("err");}}
  return(<form onSubmit={onSubmit} className="mt-4 space-y-3 max-w-md"><Input value={email} onChange={e=>setEmail(e.target.value)} required type="email" placeholder="you@example.com"/><div className="flex items-center gap-2"><Button disabled={status==="loading"}>{status==="loading"?"Joining…":"Join waitlist"}</Button>{status==="ok"&&<span className="text-emerald-300 text-sm">You’re on the list.</span>}{status==="err"&&<span className="text-red-400 text-sm">Enter a valid email.</span>}</div></form>);
}
