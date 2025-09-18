async function getHealth() {
  const res = await fetch("/api/health", { cache: "no-store" });
  if (!res.ok) return { ok: false };
  return res.json();
}
export default async function Status() {
  const health = await getHealth();
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-semibold text-zinc-100">Status</h1>
      <p className="mt-2 text-zinc-400">Operational overview.</p>
      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <div className="text-sm">
          <div>App: <span className={health.ok ? "text-emerald-400" : "text-red-400"}>{health.ok ? "Operational" : "Degraded"}</span></div>
          <div className="text-zinc-400 mt-1">Probe: <code className="text-zinc-300">/api/health</code></div>
        </div>
      </div>
    </main>
  );
}
