import Section from "../../../components/section";
import Container from "../../../components/container";
import ContactForm from "./contact-form";

export const metadata = {
  title: "Contact",
  description: "Talk to the team.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact", description: "Get in touch.", url: "/contact" },
};

export default function Contact() {
  return (
    <Section className="pt-16 md:pt-24">
      <Container>
        <h1 className="text-4xl md:text-5xl font-extrabold font-serif">Contact</h1>
        <p className="mt-2 text-neutral-400">We usually respond within one business day.</p>
        <div className="mt-6 max-w-xl">
          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}
