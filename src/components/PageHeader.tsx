export default function PageHeader({ title, subtitle }: { title:string; subtitle?:string }) {
  return (
    <div className="mb-4">
      <h1 className="text-4xl font-extrabold">{title}</h1>
      {subtitle ? <p className="mt-2">{subtitle}</p> : null}
    </div>
  );
}
