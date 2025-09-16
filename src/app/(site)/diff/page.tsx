import Section from "../../../components/section";
import Container from "../../../components/container";
import { diffWords } from "@/lib/diff";

export const metadata = {
  title: "Change & Diff",
  description: "See what changed with sources.",
  alternates: { canonical: "/diff" },
  openGraph: { images: ["/og?title=Change%20%26%20Diff&tag=Diff&tag2=Policy"] },
};

async function getMock() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "";
  const res = await fetch(`${base}/api/diff/mock`, { cache: "no-store" }).catch(() => null);
  return res?.ok ? res.json() as Promise<{ before: string; after: string }> : null;
}

export default async function DiffPage() {
  const data = await getMock();
  const tokens = diffWords(data?.before || "", data?.after || "");
  return (
    <Section className="pt-16 md:pt-24">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-extrabold">Change & Diff</h1>
            <p className="mt-2 text-neutral-400">Highlight additions and removals between versions.</p>
          </div>
          <a href="/api/export/csv?type=diff" className="btn-ghost">Download CSV</a>
        </div>

        <div className="mt-6 card p-5 leading-8">
          {tokens.map((t, i) => t.type === "same" ? (
            <span key={i}> {t.text}</span>
          ) : t.type === "add" ? (
            <mark key={i} className="rounded-sm bg-emerald-500/20 px-1"> {t.text}</mark>
          ) : (
            <del key={i} className="rounded-sm bg-red-500/20 px-1 decoration-2"> {t.text}</del>
          ))}
        </div>

        <form className="mt-6 flex gap-2 max-w-xl" action="/api/diff/subscribe" method="post">
          <input name="email" placeholder="you@example.com" className="flex-1 rounded-md border border-white/10 bg-white/5 px-3 py-2" />
          <input type="hidden" name="topic" value="privacy" />
          <button className="btn-primary">Get alerts</button>
        </form>
      </Container>
    </Section>
  );
}
