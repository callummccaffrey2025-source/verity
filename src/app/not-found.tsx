export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-2 text-sm text-zinc-400">The page you’re looking for doesn’t exist.</p>
      <div className="mt-6 grid gap-2 md:grid-cols-2">
        <a href="/news" className="card p-4 block">
          <div className="font-medium">Browse News</div>
          <div className="text-xs text-zinc-400">Clusters with stance signal</div>
        </a>
        <a href="/bills" className="card p-4 block">
          <div className="font-medium">Explore Bills</div>
          <div className="text-xs text-zinc-400">Stages, diffs & predicted passage</div>
        </a>
        <a href="/mps" className="card p-4 block">
          <div className="font-medium">Find your MPs</div>
          <div className="text-xs text-zinc-400">Attendance, alignment & reliability</div>
        </a>
        <a href="/search" className="card p-4 block">
          <div className="font-medium">Search Verity</div>
          <div className="text-xs text-zinc-400">Everything in one place</div>
        </a>
      </div>
    </main>
  );
}
