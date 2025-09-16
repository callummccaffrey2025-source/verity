export default function NotFound(){
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold brand">Can’t find that page</h1>
      <p className="text-zinc-400 mt-3">Try searching or jump to a popular section.</p>
      <form action="/search" className="mt-6 flex items-center gap-2">
        <input name="q" placeholder="Search Verity..." className="bg-zinc-900 border border-zinc-700 rounded px-3 py-2 w-72" />
        <button className="brand-bg rounded px-4 py-2 text-sm font-medium hover:opacity-90">Search</button>
      </form>
      <div className="mt-6 text-sm">
        <a href="/" className="mr-4">See product</a>
        <a href="/pricing" className="mr-4">Pricing</a>
        <a href="/ground">Explainers</a>
      </div>
    </div>
  );
}
