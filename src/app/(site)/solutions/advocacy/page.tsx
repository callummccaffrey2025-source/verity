import Section from "../../../../components/section";
import Container from "../../../../components/container";

export const metadata = {
  title: "Solution",
  description: "How Verity helps.",
  openGraph: { images: ["/og?title=Solution"] } };

export default function Solution() {
  return (
    <Section className="pt-16 md:pt-24">
      <Container>
        <h1 className="text-4xl md:text-5xl font-extrabold font-serif">Solution</h1>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <div className="card p-6"><div className="font-semibold text-emerald-300">Plain-English answers</div><p className="mt-2 text-neutral-300">Ask how a bill affects you; see citations.</p></div>
          <div className="card p-6"><div className="font-semibold text-emerald-300">Track topics</div><p className="mt-2 text-neutral-300">Watchlists and alerts for issues you care about.</p></div>
          <div className="card p-6"><div className="font-semibold text-emerald-300">Shareable</div><p className="mt-2 text-neutral-300">Export summaries with sources intact.</p></div>
        </div>
      </Container>
    </Section>
  );
}
