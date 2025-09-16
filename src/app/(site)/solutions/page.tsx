import Section from "../../../components/section";
import Container from "../../../components/container";

export const metadata = {
  title: "Solutions",
  description: "Tailored workflows for different audiences.",
  alternates: { canonical: "/solutions" },
  openGraph: { images: ["/og?title=Solutions"] } };

const items = [
  { href: "/solutions/citizens", title: "Citizens", body: "Understand what’s changing and why." },
  { href: "/solutions/journalists", title: "Journalists", body: "Verify faster; cite with confidence." },
  { href: "/solutions/advocacy", title: "Advocacy", body: "Track bills; brief your members." },
  { href: "/solutions/educators", title: "Educators", body: "Teach policy with primary sources." },
];

export default function Solutions() {
  return (
    <Section className="pt-16 md:pt-24">
      <Container>
        <h1 className="text-5xl md:text-6xl font-extrabold font-serif">Solutions</h1>
        <p className="mt-4 text-neutral-300">Pick your path.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {items.map((i) => (
            <a key={i.href} href={i.href} className="card card-hover p-5 block">
              <div className="text-emerald-300 font-semibold">{i.title}</div>
              <p className="mt-2 text-sm text-neutral-300">{i.body}</p>
            </a>
          ))}
        </div>
      </Container>
    </Section>
  );
}
