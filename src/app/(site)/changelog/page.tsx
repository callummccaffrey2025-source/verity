import Section from "../../../components/section";
import Container from "../../../components/container";

export const metadata = {
  title: "Changelog",
  description: "Product updates.",
  alternates: { canonical: "/changelog" },
  openGraph: { images: ["/og?title=Changelog"] } };

const items = [
  { date: "2025-09-10", title: "UI polish", body: "Hero, cards, trust, pricing cleanups." },
  { date: "2025-09-08", title: "Command palette", body: "⌘K to navigate anywhere." },
  { date: "2025-09-05", title: "Initial routes", body: "Home, Product, Pricing, Trust, and more." },
];

export default function Changelog() {
  return (
    <Section className="pt-16 md:pt-24">
      <Container>
        <h1 className="text-4xl md:text-5xl font-extrabold font-serif">Changelog</h1>
        <div className="mt-6 space-y-4">
          {items.map(i => (
            <div key={i.title} className="card p-5">
              <div className="text-sm text-neutral-400">{i.date}</div>
              <div className="text-emerald-300 font-semibold">{i.title}</div>
              <p className="mt-1 text-neutral-300">{i.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
