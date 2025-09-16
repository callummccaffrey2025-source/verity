import Link from "next/link";
import Section from "../../components/section";
import Container from "../../components/container";
import CtaBar from "./_components/cta-bar";
import ConsentBanner from "./_components/consent-banner";
import Bg from "../../components/bg";
import NavCard from "../../components/nav-card";
import SectionTitle from "../../components/section-title";
import LogoCloud from "../../components/logo-cloud";
import Testimonials from "../../components/testimonial";
import Stats from "../../components/stats";

export const metadata = {
  title: "Transparency for Australia",
  description:
    "Ask questions about bills, Hansard, and media releases — with sources. Plus MP ratings, briefings, and alerts.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Verity — Transparency for Australia",
    description: "Sourced answers and briefings.",
    url: "/",
  },
};

export default function HomePage() {
  const modules = [
    { href: "/product#ask", title: "Ask (AI explainer)", body: "Type a question and get a clear answer with citations." },
    { href: "/product#search", title: "Search", body: "Bills, Hansard, press releases in one place." },
    { href: "/product#alerts", title: "Watchlist", body: "Follow topics, MPs, and terms. Daily briefings." },
  ];
  const core = [
    { href: "/product", title: "Product", body: "Modules and how Verity works." },
    { href: "/pricing", title: "Pricing", body: "From $1/month. Compare tiers." },
    { href: "/join-waitlist", title: "Join waitlist", body: "Early access and updates." },
  ];
  const solutions = [
    { href: "/solutions/citizens", title: "Citizens" },
    { href: "/solutions/journalists", title: "Journalists" },
    { href: "/solutions/advocacy", title: "Advocacy" },
    { href: "/solutions/educators", title: "Educators" },
  ];
  const resources = [
    { href: "/blog", title: "Blog", body: "Product notes and research." },
    { href: "/case-studies", title: "Case studies", body: "Proof in practice." },
    { href: "/changelog", title: "Changelog", body: "What’s new in Verity." },
    { href: "/compare/theyvoteforme", title: "Compare", body: "How Verity differs." },
    { href: "/download", title: "Press kit", body: "Brand assets and screenshots." },
    { href: "/roadmap", title: "Roadmap", body: "What we’re building next." },
  ];
  const company = [
    { href: "/trust", title: "Trust", body: "Security, privacy, methodology, uptime." },
    { href: "/integrity", title: "Integrity", body: "Ethics, conflicts, transparency." },
    { href: "/contact", title: "Contact", body: "Talk to the team." },
  ];
  const legal = [
    { href: "/legal/privacy", title: "Privacy", body: "" },
    { href: "/legal/terms", title: "Terms", body: "" },
    { href: "/legal/cookies", title: "Cookies", body: "" },
  ];

  return (
    <>
      <Bg />
      <ConsentBanner />

      {/* HERO */}
      <Section className="pt-16 md:pt-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="title-balance text-5xl/tight md:text-7xl/tight font-extrabold tracking-tight">
              Transparency for Australia
            </h1>
            <p className="mt-4 text-neutral-300">
              Ask questions about bills, Hansard, and media releases — with sources.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/product" className="btn-primary">Open app</Link>
              <Link href="/pricing" className="btn-ghost">Join waitlist — $1/mo</Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* TRUST / SOCIAL PROOF */}
      <Section>
        <Container>
          <LogoCloud />
        </Container>
      </Section>

      {/* QUICK MODULES */}
      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {modules.map((m) => <NavCard key={m.title} {...m} />)}
          </div>
        </Container>
      </Section>

      {/* HOW IT WORKS */}
      <Section>
        <Container>
          <SectionTitle>How Verity works</SectionTitle>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="card p-6">
              <div className="text-emerald-300 font-semibold">1 · Collect</div>
              <p className="mt-2 text-neutral-300">
                We ingest bills, Hansard, press releases and registers into a unified corpus.
              </p>
            </div>
            <div className="card p-6">
              <div className="text-emerald-300 font-semibold">2 · Explain</div>
              <p className="mt-2 text-neutral-300">
                Ask questions; get concise answers with inline citations and traceability.
              </p>
            </div>
            <div className="card p-6">
              <div className="text-emerald-300 font-semibold">3 · Brief</div>
              <p className="mt-2 text-neutral-300">
                Daily briefings and alerts keep you ahead of changes and votes.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* CORE */}
      <Section>
        <Container>
          <SectionTitle>Core</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {core.map((x) => <NavCard key={x.title} {...x} />)}
          </div>
        </Container>
      </Section>

      {/* DIRECTORY */}
      <Section>
        <Container>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <SectionTitle>Solutions</SectionTitle>
              <div className="grid gap-3">{solutions.map((x) => <NavCard key={x.title} {...x} />)}</div>
            </div>
            <div>
              <SectionTitle>Resources</SectionTitle>
              <div className="grid gap-3">{resources.map((x) => <NavCard key={x.title} {...x} />)}</div>
            </div>
            <div>
              <SectionTitle>Company & Legal</SectionTitle>
              <div className="grid gap-3">{company.concat(legal).map((x) => <NavCard key={x.title} {...x} />)}</div>
            </div>
          </div>
        </Container>
      </Section>

      {/* SOCIAL PROOF */}
      <Section>
        <Container>
          <Stats items={[
            { label: "Documents indexed", value: "1M+" },
            { label: "Citations surfaced", value: "10M+" },
            { label: "Avg. answer time", value: "~1.2s" },
          ]} />
          <div className="mt-8">
            <Testimonials
              items={[
                { quote: "Explains a bill better than a press release.", author: "Investigative Journalist" },
                { quote: "Finally, citations I can trust.", author: "Policy Analyst" },
                { quote: "The daily brief keeps our newsroom aligned.", author: "Editor" },
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* BOTTOM CTA */}
      <Section>
        <Container>
          <div className="card p-10 text-center">
            <h2 className="text-2xl font-semibold">From $1/month</h2>
            <p className="mt-2 text-neutral-400">Radically affordable civic intelligence.</p>
            <div className="mt-6">
              <Link href="/pricing" className="btn-primary">View pricing</Link>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBar />
    </>
  );
}
