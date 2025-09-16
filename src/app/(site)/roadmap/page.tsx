import Section from "../../../components/section";
import Container from "../../../components/container";

export const metadata = {
  title: "Roadmap",
  description: "What’s now, next, and later.",
  alternates: { canonical: "/roadmap" },
  openGraph: { images: ["/og?title=Roadmap"] } };

export default function Roadmap() {
  const now = ["Explainers SEO template", "Alerts beta", "Contact + waitlist forms"];
  const next = ["Newsroom embed", "Slack alerts", "WordPress citation plugin"];
  const later = ["Public API", "Org workspace"];
  return (
    <Section className="pt-16 md:pt-24">
      <Container>
        <h1 className="text-4xl md:text-5xl font-extrabold font-serif">Roadmap</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="card p-5"><div className="text-emerald-300 font-semibold">Now</div><ul className="mt-2 text-neutral-300 space-y-1">{now.map(x => <li key={x}>• {x}</li>)}</ul></div>
          <div className="card p-5"><div className="text-emerald-300 font-semibold">Next</div><ul className="mt-2 text-neutral-300 space-y-1">{next.map(x => <li key={x}>• {x}</li>)}</ul></div>
          <div className="card p-5"><div className="text-emerald-300 font-semibold">Later</div><ul className="mt-2 text-neutral-300 space-y-1">{later.map(x => <li key={x}>• {x}</li>)}</ul></div>
        </div>
      </Container>
    </Section>
  );
}
