import Section from "../../../../components/section";
import Container from "../../../../components/container";

export const metadata = { title: "Cookies", alternates: { canonical: "/legal/cookies" } , openGraph: { images: ["/og?title=Cookies"] } };

export default function Cookies() {
  return (
    <Section className="pt-16 md:pt-24"><Container>
      <h1 className="text-4xl md:text-5xl font-extrabold font-serif">Cookies</h1>
      <div className="prose prose-invert mt-6 max-w-none">
        <p>We use minimal cookies necessary for functionality. See Privacy for details.</p>
      </div>
    </Container></Section>
  );
}
