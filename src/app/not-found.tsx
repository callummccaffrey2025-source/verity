import Link from "next/link";
export default function NotFound(){
  return (
    <div className="p-6 space-y-3">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-zinc-400">We couldn’t find that page. Try the links below.</p>
      <div className="space-x-3">
        <Link className="underline" href="/">Home</Link>
        <Link className="underline" href="/news">News</Link>
        <Link className="underline" href="/bills">Bills</Link>
        <Link className="underline" href="/mps">MPs</Link>
      </div>
    </div>
  );
}
