"use client";
export default function GlobalError({ error, reset }:{ error:Error & { digest?:string }, reset:()=>void }){
  console.error(error);
  return(<div className="min-h-[60vh] flex flex-col items-center justify-center text-center"><h1 className="text-5xl font-extrabold">Something went wrong</h1><p className="mt-2 text-zinc-400">Please try again.</p><button onClick={()=>reset()} className="btn mt-4">Try again</button></div>);
}
