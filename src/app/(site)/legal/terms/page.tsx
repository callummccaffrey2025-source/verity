import Section from "../../../../components/section";
import Container from "../../../../components/container";

export const metadata = { title: "Terms", alternates: { canonical: "/legal/terms" } , openGraph: { images: ["/og?title=Terms"] } };

export default function Terms() {
  return (
    <Section className="pt-16 md:pt-24"><Container>
      <h1 className="text-4xl md:text-5xl font-extrabold font-serif">Terms of Service</h1>
      <div className="prose prose-invert mt-6 max-w-none">
        <p>By using Verity you agree to these terms. Replace this with your final legal text.</p>
      </div>
    </Container></Section>
  );
}
