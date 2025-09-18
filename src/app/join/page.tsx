export default function Join() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-semibold text-zinc-100">Join Verity — $1/month</h1>
      <p className="mt-3 text-zinc-400">Receipts instead of spin. Cancel anytime.</p>
      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <ul className="list-disc pl-6 text-sm text-zinc-300 space-y-2">
          <li>Personalised briefings on news, bills, and MPs</li>
          <li>Bias bars, ownership context, and citations</li>
          <li>Bill diff viewer + stage tracker</li>
          <li>Export/share receipts in one click</li>
        </ul>
        <div className="mt-6 space-x-3">
          <a href="/features" className="rounded-lg border border-emerald-700/40 bg-emerald-600/10 px-4 py-2 text-emerald-400 hover:bg-emerald-600/20">See features</a>
          <a href="/" className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2">Back home</a>
        </div>
      </div>
    </main>
  );
}
