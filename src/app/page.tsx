'use client';

export default function Landing() {
  return (
    <main className="min-h-screen p-8 max-w-5xl mx-auto">
      <header className="flex items-center justify-between mb-12">
        <a href="/" className="text-xl font-semibold">Verity</a>
        <nav className="flex gap-6 text-sm">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <a href="/join-waitlist" className="underline">Join waitlist</a>
        </nav>
      </header>

      <section className="text-center space-y-6 py-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Transparency for Australia
        </h1>
        <p className="text-lg text-neutral-600">
          Ask questions about bills, Hansard, and media releases — with sources.
        </p>
        <div className="flex items-center justify-center gap-3">
          <a href="/app" className="px-5 py-3 rounded border">Open app</a>
          <a href="/join-waitlist" className="px-5 py-3 rounded bg-black text-white">Join waitlist — $1/mo</a>
        </div>
      </section>

      <section id="features" className="grid md:grid-cols-3 gap-6 mt-16">
        <Feature title="Ask (AI explainer)" desc="Type a question and get a clear answer with citations."/>
        <Feature title="Search" desc="Bills, Hansard, press releases in one place."/>
        <Feature title="Watchlist" desc="Follow topics, MPs, and terms. Daily briefings."/>
      </section>

      <footer className="mt-24 text-sm text-neutral-500">
        Verity · Transparency for Australia © 2025 · <a href="/privacy" className="underline">Privacy</a>
      </footer>
    </main>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded border p-5">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-neutral-600">{desc}</p>
    </div>
  );
}
