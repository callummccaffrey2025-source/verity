import Link from 'next/link';
import { NEWS } from '@/lib/data/news';

export const metadata = {
  title: 'News | Verity',
  description: 'Recent political coverage linked to MPs and Bills.',
};

export default function NewsPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-8 space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-semibold">News</h1>
        <p className="text-neutral-600">Clusters and bias signals coming soon — everything links back to MPs & bills.</p>
      </header>

      <section aria-labelledby="latest">
        <h2 id="latest" className="text-xl font-semibold mb-3">Latest</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {NEWS.map(n => (
            <li key={n.id} className="rounded-xl border p-4">
              <div className="text-xs text-neutral-500">
                {new Date(n.published).toLocaleDateString()} • {n.source} • Bias: {n.bias ?? 'Unknown'}
              </div>
              <a href={n.url} className="block mt-1 text-base font-medium underline underline-offset-2">
                {n.title}
              </a>
              <div className="text-sm text-neutral-600 mt-2">
                {(n.related?.billIds || []).map(b => (
                  <span key={b} className="mr-2">
                    Bill: <Link href={`/bills/${b}`} className="underline">#{b}</Link>
                  </span>
                ))}
                {(n.related?.mpIds || []).map(m => (
                  <span key={m} className="mr-2">
                    MP: <Link href={`/mps/${m}`} className="underline">#{m}</Link>
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
