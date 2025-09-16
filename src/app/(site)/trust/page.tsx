import Section from "../../../components/section";
import Container from "../../../components/container";

export const metadata = {
  title: "Trust",
  description: "Security, privacy, data sources, methodology, uptime.",
  alternates: { canonical: "/trust" },
  openGraph: { images: ["/og?title=Trust"] } };

export default function Trust() {
  return (
    <Section className="pt-16 md:pt-24">
      <Container>
        <h1 className="text-4xl md:text-5xl font-extrabold font-serif">Trust</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="card p-5">
            <div className="text-emerald-300 font-semibold">Security & privacy</div>
            <p className="mt-2 text-neutral-300">We minimise data collection, never sell personal data, and follow least-privilege access.</p>
          </div>
          <div className="card p-5">
            <div className="text-emerald-300 font-semibold">Data sources</div>
            <p className="mt-2 text-neutral-300">Bills, Hansard transcripts, press releases, registers and disclosures.</p>
          </div>
          <div className="card p-5">
            <div className="text-emerald-300 font-semibold">Methodology</div>
            <p className="mt-2 text-neutral-300">Every answer links to primary sources. Our audit trail shows how we got there.</p>
          </div>
          <div className="card p-5">
            <div className="text-emerald-300 font-semibold">Uptime</div>
            <p className="mt-2 text-neutral-300">We publish availability and incidents. See <a className="underline" href="/integrity">Integrity</a>.</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
