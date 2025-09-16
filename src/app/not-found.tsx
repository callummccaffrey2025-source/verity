import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-5xl md:text-6xl font-serif font-extrabold">Can’t find that page</h1>
      <p className="mt-3 text-neutral-400">Try searching or jump to a popular section.</p>

      <form action="/search" className="mx-auto mt-6 flex max-w-md gap-2">
        <input name="q" placeholder="Search Verity…" className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2" />
        <button className="btn-primary">Search</button>
      </form>

      <div className="mt-8 flex items-center justify-center gap-3">
        <Link className="btn-ghost" href="/product">See product</Link>
        <Link className="btn-ghost" href="/pricing">Pricing</Link>
        <Link className="btn-ghost" href="/explainer/privacy-amendment-2025">Explainers</Link>
      </div>
    </main>
  );
}
