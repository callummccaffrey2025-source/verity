import Section from "../../../../components/section";
import Container from "../../../../components/container";

export const metadata = { title: "Privacy Policy", alternates: { canonical: "/legal/privacy" } , openGraph: { images: ["/og?title=Privacy%20Policy"] } };

export default function Privacy() {
  return (
    <Section className="pt-16 md:pt-24"><Container>
      <h1 className="text-4xl md:text-5xl font-extrabold font-serif">Privacy Policy</h1>
      <div className="prose prose-invert mt-6 max-w-none">
        <p>We do not sell personal data. Replace with full policy.</p>
      </div>
    </Container></Section>
  );
}
