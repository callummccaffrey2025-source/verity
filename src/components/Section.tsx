export default function Section({ title, children }:{ title:string; children: React.ReactNode }){
  return (
    <section className="mt-8">
      <h2 className="text-sm font-medium text-zinc-300">{title}</h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}
