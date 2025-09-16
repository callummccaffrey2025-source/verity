import Section from "../../../components/section";
import Container from "../../../components/container";

export const metadata = {
  title: "Blog",
  description: "Product notes and research.",
  alternates: { canonical: "/blog" },
  openGraph: { images: ["/og?title=Blog"] } };

const posts = [
  { href: "/blog/launch-notes", title: "Launch notes", body: "Why Verity and what’s next." },
  { href: "/blog/reading-bills", title: "How we read bills", body: "Methodology and sources." },
];

export default function BlogIndex() {
  return (
    <Section className="pt-16 md:pt-24">
      <Container>
        <h1 className="text-5xl md:text-6xl font-extrabold font-serif">Blog</h1>
        <p className="mt-4 text-neutral-300">Notes from product and research.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {posts.map(p => (
            <a key={p.href} href={p.href} className="card card-hover p-5 block">
              <div className="text-emerald-300 font-semibold">{p.title}</div>
              <p className="mt-2 text-sm text-neutral-300">{p.body}</p>
            </a>
          ))}
        </div>
      </Container>
    </Section>
  );
}
