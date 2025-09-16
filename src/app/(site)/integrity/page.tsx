import Section from "../../../components/section";
import Container from "../../../components/container";

export const metadata = {
  title: "Integrity",
  description: "Ethics, conflicts, transparency, correction policy.",
  alternates: { canonical: "/integrity" },
  openGraph: { images: ["/og?title=Integrity"] } };

export default function Integrity() {
  return (
    <Section className="pt-16 md:pt-24">
      <Container>
        <h1 className="text-4xl md:text-5xl font-extrabold font-serif">Integrity</h1>
        <div className="mt-6 space-y-4">
          <div className="card p-5">
            <div className="text-emerald-300 font-semibold">Editorial standards</div>
            <p className="mt-2 text-neutral-300">Non-partisan, source-first reporting. Claims are traceable to original documents.</p>
          </div>
          <div className="card p-5">
            <div className="text-emerald-300 font-semibold">Conflicts</div>
            <p className="mt-2 text-neutral-300">We disclose material conflicts or affiliations on relevant pages.</p>
          </div>
          <div className="card p-5">
            <div className="text-emerald-300 font-semibold">Corrections</div>
            <p className="mt-2 text-neutral-300">We correct material errors within 24h. Email <a href="/contact" className="underline">Contact</a> with details.</p>
          </div>
          <div className="card p-5">
            <div className="text-emerald-300 font-semibold">Changelog</div>
            <p className="mt-2 text-neutral-300">We maintain a public log of data and product changes on <a className="underline" href="/changelog">/changelog</a>.</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
