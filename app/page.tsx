import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verity — See the Whole Picture',
  description: 'AI-powered public data transparency platform.',
};

type Sentiment = 'positive' | 'neutral' | 'negative';

type NewsArticle = {
  id: number;
  category: 'Politics' | 'Economy' | 'World' | 'Society';
  title: string;
  source: string;
  sentiment: Sentiment;
};

const categories: Array<NewsArticle['category']> = [
  'Politics',
  'Economy',
  'World',
  'Society',
];

const newsArticles: NewsArticle[] = [
  {
    id: 1,
    category: 'Politics',
    title: 'Senate unveils bipartisan ethics reform package',
    source: 'Capitol Ledger',
    sentiment: 'positive',
  },
  {
    id: 2,
    category: 'Economy',
    title: 'Inflation cools as wage growth steadies for third month',
    source: 'Market Signal',
    sentiment: 'neutral',
  },
  {
    id: 3,
    category: 'World',
    title: 'Global climate summit advances cross-border energy pact',
    source: 'Terra Network',
    sentiment: 'positive',
  },
  {
    id: 4,
    category: 'Society',
    title: 'Community-led schools initiative expands nationwide',
    source: 'Civic Pulse',
    sentiment: 'positive',
  },
  {
    id: 5,
    category: 'World',
    title: 'Humanitarian corridor opens amid regional ceasefire',
    source: 'Global Dispatch',
    sentiment: 'neutral',
  },
  {
    id: 6,
    category: 'Economy',
    title: 'Small business index dips as supply chain jitters return',
    source: 'LedgerLine',
    sentiment: 'negative',
  },
];

const sentimentStyles: Record<Sentiment, string> = {
  positive: 'bg-emerald-500/10 text-emerald-600',
  neutral: 'bg-slate-500/10 text-slate-600',
  negative: 'bg-rose-500/10 text-rose-600',
};

const sentimentLabels: Record<Sentiment, string> = {
  positive: 'Upbeat',
  neutral: 'Balanced',
  negative: 'Caution',
};

const VerityCitizenEdition = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b from-emerald-500/20 via-slate-900 to-slate-950 blur-3xl" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-16 pt-20 sm:px-8 lg:px-12 lg:pt-24">
        <header className="flex flex-col gap-6 text-center sm:items-center sm:text-left">
          <span className="inline-flex items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Verity Citizen Edition
          </span>
          <div className="flex flex-col gap-4 sm:max-w-2xl">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              See the whole picture.
            </h1>
            <p className="text-lg text-slate-300 sm:text-xl">
              Real-time civic intelligence that highlights what matters across politics, the economy, and global society — no blind spots, no spin.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className="rounded-full border border-slate-700/60 bg-slate-900/70 px-5 py-2 text-sm font-medium tracking-wide text-slate-200 transition hover:border-emerald-400/60 hover:bg-slate-900/90 hover:text-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
              >
                {category}
              </button>
            ))}
          </div>
        </header>

        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {newsArticles.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-emerald-400/60 hover:bg-slate-900/80"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  {article.category}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${sentimentStyles[article.sentiment]}`}
                >
                  {sentimentLabels[article.sentiment]}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-slate-50 transition group-hover:text-emerald-200">
                {article.title}
              </h2>
              <p className="text-sm text-slate-400">{article.source}</p>
              <div className="mt-auto flex items-center justify-between pt-2 text-xs text-slate-500">
                <span>Signal clarity 92%</span>
                <span className="text-slate-600">AI brief · 3 min</span>
              </div>
            </article>
          ))}
        </section>

        <footer className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 text-sm text-slate-400 sm:flex-row sm:text-base">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="font-semibold text-slate-200">Powered by Verity</span>
            <span className="text-slate-400">Supabase · Pinecone · GDELT integrations coming soon</span>
          </div>
          <div className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400">
            $1/month to keep truth alive
          </div>
        </footer>
      </div>
    </main>
  );
};

export default VerityCitizenEdition;
