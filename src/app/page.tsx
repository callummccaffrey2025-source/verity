import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verity — See the Whole Picture",
  description: "AI-powered public data transparency platform.",
};

type Category = {
  name: string;
  description: string;
  icon: string;
};

type Sentiment = "Positive" | "Neutral" | "Negative";

type NewsItem = {
  id: number;
  title: string;
  source: string;
  sentiment: Sentiment;
  category: string;
};

const categories: Category[] = [
  {
    name: "Politics",
    description: "Votes, speeches, and policy shifts across parliament.",
    icon: "🏛️",
  },
  {
    name: "Economy",
    description: "Markets, inflation, and the fiscal outlook in real time.",
    icon: "📊",
  },
  {
    name: "World",
    description: "Global stories shaping diplomacy and security.",
    icon: "🌍",
  },
  {
    name: "Society",
    description: "Community sentiment, public services, and culture.",
    icon: "🤝",
  },
];

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Commons committee advances clean energy incentives package",
    source: "Parliamentary Ledger",
    sentiment: "Positive",
    category: "Politics",
  },
  {
    id: 2,
    title: "Inflation cools to 2.1% as energy prices stabilise nationwide",
    source: "National Economic Review",
    sentiment: "Positive",
    category: "Economy",
  },
  {
    id: 3,
    title: "Regional councils flag funding gaps for social care this winter",
    source: "Civic Monitor",
    sentiment: "Negative",
    category: "Society",
  },
  {
    id: 4,
    title: "Eastern trade bloc signals unified stance on data governance",
    source: "World Dispatch",
    sentiment: "Neutral",
    category: "World",
  },
  {
    id: 5,
    title: "Community-owned solar projects double participation year-on-year",
    source: "Civic Monitor",
    sentiment: "Positive",
    category: "Society",
  },
  {
    id: 6,
    title: "Currency volatility eases after central bank forward guidance",
    source: "National Economic Review",
    sentiment: "Neutral",
    category: "Economy",
  },
];

const sentimentClasses = {
  Positive:
    "border-emerald-400/40 bg-emerald-400/10 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
  Neutral:
    "border-slate-400/40 bg-slate-400/10 text-slate-200 shadow-[0_0_15px_rgba(148,163,184,0.15)]",
  Negative:
    "border-rose-400/40 bg-rose-400/10 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.12)]",
} satisfies Record<Sentiment, string>;

function CategoryButton({ category }: { category: Category }) {
  return (
    <button
      className="group flex w-full flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-emerald-400/50 hover:bg-emerald-400/10 sm:w-[calc(50%-0.5rem)] lg:w-auto lg:max-w-xs"
      type="button"
    >
      <span className="flex items-center gap-2 text-sm font-semibold text-white/90">
        <span className="text-lg" aria-hidden>
          {category.icon}
        </span>
        {category.name}
      </span>
      <span className="text-sm text-white/60">
        {category.description}
      </span>
    </button>
  );
}

function SentimentTag({ sentiment }: { sentiment: Sentiment }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${sentimentClasses[sentiment]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      {sentiment}
    </span>
  );
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.9)] transition hover:border-emerald-400/40 hover:bg-white/[0.06]">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-emerald-300/80">
          <span className="rounded-md bg-emerald-400/10 px-2 py-1 text-emerald-200/90">
            {item.category}
          </span>
          <SentimentTag sentiment={item.sentiment} />
        </div>
        <h3 className="text-lg font-semibold leading-snug text-white sm:text-xl">
          {item.title}
        </h3>
      </div>
      <div className="flex items-center justify-between text-sm text-white/60">
        <span>{item.source}</span>
        <span className="text-xs uppercase tracking-wide text-white/40">
          Verified
        </span>
      </div>
    </article>
  );
}

export default function VerityCitizenEdition() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <section className="space-y-6 md:grid md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-end md:gap-10">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
              Citizen Edition
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                See the whole picture.
              </h1>
              <p className="max-w-xl text-base text-white/70 sm:text-lg">
                Verity brings AI clarity to complex public data so every citizen can navigate politics, the economy, and global events with confidence.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_20px_45px_-20px_rgba(16,185,129,0.9)] transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300">
                Explore platform
              </button>
              <button className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-emerald-400/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300">
                Watch demo
              </button>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-emerald-400/10 to-transparent p-6 shadow-[0_35px_90px_-50px_rgba(16,185,129,0.9)]">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
              Live monitoring
            </p>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between text-sm text-white/70">
                <span>Data sources synced</span>
                <span className="font-semibold text-emerald-300">1,248</span>
              </div>
              <div className="flex items-center justify-between text-sm text-white/70">
                <span>Signals analysed</span>
                <span className="font-semibold text-emerald-300">87,320</span>
              </div>
              <div className="flex items-center justify-between text-sm text-white/70">
                <span>Updates this hour</span>
                <span className="font-semibold text-emerald-300">312</span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
            Focus areas
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            {categories.map((category) => (
              <CategoryButton key={category.name} category={category} />
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                Today's signals
              </h2>
              <p className="text-sm text-white/60 sm:text-base">
                A curated briefing of the stories shaping public discourse.
              </p>
            </div>
            <button className="inline-flex items-center justify-center self-start rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/70 transition hover:border-emerald-400/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300">
              View full briefing
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {newsItems.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <footer className="border-t border-white/10 pt-8 text-center text-sm text-white/50">
          Powered by Verity — $1/month to keep truth alive.
        </footer>
      </div>
    </main>
  );
}
