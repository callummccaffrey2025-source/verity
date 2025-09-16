import Section from "../../../components/section";
import Container from "../../../components/container";

export const metadata = {
  title: "Case studies",
  description: "Proof in practice.",
  alternates: { canonical: "/case-studies" },
  openGraph: { images: ["/og?title=Case%20studies"] } };

const cases = [
  { href: "/case-studies/newsroom", title: "Newsroom", body: "Faster briefings for daily coverage." },
  { href: "/case-studies/civic-group", title: "Civic group", body: "Track bills and mobilise members." },
];

export default function Cases() {
  return (
    <Section className="pt-16 md:pt-24">
      <Container>
        <h1 className="text-5xl md:text-6xl font-extrabold font-serif">Case studies</h1>
        <p className="mt-4 text-neutral-300">Real outcomes with Verity.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {cases.map((c) => (
            <a key={c.href} href={c.href} className="card card-hover p-5 block">
              <div className="text-emerald-300 font-semibold">{c.title}</div>
              <p className="mt-2 text-sm text-neutral-300">{c.body}</p>
            </a>
          ))}
        </div>
      </Container>
    </Section>
  );
}
