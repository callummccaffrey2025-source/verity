import Section from "../../../components/section";
import Container from "../../../components/container";
import Script from "next/script";

export const metadata = {
  title: "Pricing",
  description: "Fair, simple plans.",
  alternates: { canonical: "/pricing" },
  openGraph: { images: ["/og?title=Pricing"] } };

const tiers = [
  { name: "Entry", price: "$1/mo", cta: { href: "/join-waitlist", label: "Start for $1" },
    features: ["Ask with citations (fair use)", "Weekly briefing", "Basic MP view"], highlight: true },
  { name: "Pro", price: "$15/mo", cta: { href: "/join-waitlist", label: "Upgrade to Pro" },
    features: ["Real-time alerts", "CSV export", "Advanced filters", "Priority processing"] },
  { name: "Org", price: "Custom", cta: { href: "/contact", label: "Talk to sales" },
    features: ["SSO & SLA", "API access", "Shared workspace", "Support"] },
];

const faqs = [
  { q: "Is $1/month real?", a: "Yes. Entry provides core features for everyone." },
  { q: "Can I cancel anytime?", a: "Yes, there are no lock-ins." },
  { q: "How do you cite sources?", a: "Every answer links to original documents and transcripts." },
  { q: "Do you sell personal data?", a: "No. See our Privacy Policy for details." },
  { q: "Do you offer invoices?", a: "Yes—contact us for Org billing." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a }
  }))
};

export default function PricingPage() {
  return (
    <>
      <Script id="faq-jsonld" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Section className="pt-16 md:pt-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold font-serif">Pricing</h1>
            <p className="mt-4 text-neutral-300">Start for A$1. Upgrade when you need more.</p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map(t => (
              <div key={t.name} className={`card p-6 ${t.highlight ? "card-ring" : ""}`}>
                <div className="text-emerald-300 font-semibold">{t.name}</div>
                <div className="mt-2 text-3xl font-bold">{t.price}</div>
                <ul className="mt-4 space-y-2 text-neutral-300">
                  {t.features.map(f => <li key={f}>• {f}</li>)}
                </ul>
                <a href={t.cta.href} className="btn-primary mt-5 inline-block">{t.cta.label}</a>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {faqs.map((f, i) => (
              <div key={i} className="card p-5">
                <div className="font-semibold text-emerald-300">{f.q}</div>
                <p className="mt-2 text-neutral-300">{f.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
