import Section from "../../../../components/section";
import Container from "../../../../components/container";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = `Case study: ${slug.replace(/-/g, " ")}`;
  return { title, description: "Verity case study.", alternates: { canonical: `/case-studies/${slug}` } };
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const name = slug.replace(/-/g, " ");
  return (
    <Section className="pt-16 md:pt-24">
      <Container>
        <h1 className="text-4xl md:text-5xl font-extrabold font-serif">{name}</h1>
        <p className="mt-2 text-neutral-300">Outcome overview and metrics.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="card p-5"><div className="text-emerald-300 font-semibold">-45%</div><p className="text-neutral-300">Research time</p></div>
          <div className="card p-5"><div className="text-emerald-300 font-semibold">2×</div><p className="text-neutral-300">Stories shipped</p></div>
          <div className="card p-5"><div className="text-emerald-300 font-semibold">98%</div><p className="text-neutral-300">Citation acceptance</p></div>
        </div>
      </Container>
    </Section>
  );
}
