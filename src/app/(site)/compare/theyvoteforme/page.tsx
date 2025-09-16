import Section from "../../../../components/section";
import Container from "../../../../components/container";

export const metadata = { title: "Compare: TheyVoteForYou", alternates: { canonical: "/compare/theyvoteforme" }, description: "Objective comparison." , openGraph: { images: ["/og?title=Compare%3A%20TheyVoteForYou"] } };

const rows = [
  { k: "Focus", ours: "Bills, Hansard, media, alerts, explainers", theirs: "Voting records summarised" },
  { k: "Citations", ours: "Always shown", theirs: "Varies by entry" },
  { k: "Freshness", ours: "Near-real-time ingests (status page)", theirs: "Periodic updates" },
  { k: "Pricing", ours: "From $1/mo", theirs: "Free" },
  { k: "Use-cases", ours: "Journalism, advocacy, public", theirs: "Civic overview" },
];

export default function Compare() {
  return (
    <Section className="pt-16 md:pt-24">
      <Container>
        <h1 className="text-4xl md:text-5xl font-serif font-extrabold">Compare</h1>
        <p className="mt-2 text-neutral-400">How Verity differs from TheyVoteForYou.</p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-2">
            <thead className="text-left text-neutral-300">
              <tr><th className="px-3 py-2">Criteria</th><th className="px-3 py-2">Verity</th><th className="px-3 py-2">TheyVoteForYou</th></tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.k} className="card">
                  <td className="px-3 py-3 font-semibold text-emerald-300">{r.k}</td>
                  <td className="px-3 py-3">{r.ours}</td>
                  <td className="px-3 py-3">{r.theirs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8">
          <a className="btn-primary" href="/pricing">Start for $1</a>
        </div>
      </Container>
    </Section>
  );
}
