export const metadata = { title: "Integrity · Case" };

export default async function Page(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-serif text-3xl md:text-4xl font-extrabold">Integrity case</h1>
      <p className="mt-2 text-neutral-300">Case ID: <span className="font-mono">{id}</span></p>
      <p className="mt-6 text-neutral-400">Case details coming soon.</p>
    </section>
  );
}
