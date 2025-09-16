import Section from "../../../../components/section";
import Container from "../../../../components/container";
import type { Metadata } from "next";
import { getBill } from "@/lib/bills";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const bill = getBill(slug);
  const title = bill ? bill.title : "Explainer";
  const img = `/og?title=${encodeURIComponent(title)}&tag=Explainer`;
  return { title, description: bill?.summary, alternates: { canonical: `/explainer/${slug}` }, openGraph: { images: [img] } };
}

export default async function Explainer({ params }: Props) {
  const { slug } = await params;
  const bill = getBill(slug);
  if (!bill) return <div className="p-10">Not found.</div>;
  return (
    <Section className="pt-16 md:pt-24">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-extrabold">{bill.title}</h1>
            <p className="mt-2 text-neutral-300">{bill.summary}</p>
          </div>
          <a href={`/api/export/csv?type=explainer&slug=${encodeURIComponent(bill.slug)}`} className="btn-ghost">Download CSV</a>
        </div>

        <h2 className="mt-8 text-xl font-semibold text-emerald-300">Stages</h2>
        <ol className="mt-2 list-decimal pl-6 space-y-1 text-neutral-300">{bill.stages.map(s => <li key={s}>{s}</li>)}</ol>

        <h2 className="mt-8 text-xl font-semibold text-emerald-300">Top Q&As</h2>
        <div className="mt-2 space-y-3">
          {bill.qas.map(x => (<div key={x.q} className="card p-4"><div className="font-medium">{x.q}</div><p className="text-neutral-300 mt-1">{x.a}</p></div>))}
        </div>

        <h2 className="mt-8 text-xl font-semibold text-emerald-300">Sources</h2>
        <ul className="mt-2 list-disc pl-6">{bill.sources.map(s => <li key={s.url}><a className="underline" href={s.url}>{s.title}</a></li>)}</ul>

        <div className="mt-8 flex items-center gap-3">
          <a href="/pricing" className="btn-primary">Follow this bill</a>
          <a href={`/api/export/csv?type=explainer&slug=${encodeURIComponent(bill.slug)}`} className="btn-ghost">Download CSV</a>
        </div>
      </Container>
    </Section>
  );
}
