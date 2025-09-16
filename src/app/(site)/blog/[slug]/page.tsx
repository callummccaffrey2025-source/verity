import Section from "../../../../components/section";
import Container from "../../../../components/container";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = `Blog: ${slug.replace(/-/g, " ")}`;
  return { title, description: "Verity blog article.", alternates: { canonical: `/blog/${slug}` } };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ");
  return (
    <Section className="pt-16 md:pt-24">
      <Container>
        <h1 className="text-4xl md:text-5xl font-extrabold font-serif">{title}</h1>
        <div className="prose prose-invert mt-6 max-w-none">
          <p>Draft article content for <strong>{title}</strong>. Replace with your post body.</p>
        </div>
      </Container>
    </Section>
  );
}
