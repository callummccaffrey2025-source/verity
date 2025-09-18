export default function RootLoading() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-24">
      <div className="h-8 w-1/2 rounded bg-zinc-800 animate-pulse" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({length:4}).map((_,i)=>(
          <div key={i} className="h-28 rounded-xl border border-zinc-800 bg-zinc-900 animate-pulse" />
        ))}
      </div>
    </main>
  );
}
