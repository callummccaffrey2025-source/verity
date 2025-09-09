export default function Landing() {
  return (
    <main className="min-h-screen">
      <div className="h-2 w-full bg-red-500" />  {/* ← should be a red bar if Tailwind works */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-4xl font-semibold">
          Watch the politicians <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-blue-400">so you don’t have to</span>
        </h1>
        <p className="mt-3 text-neutral-300 max-w-2xl">
          Unified Hansard, bills, media releases, agencies and courts. AI briefings with citations.
        </p>
      </section>
    </main>
  );
}
