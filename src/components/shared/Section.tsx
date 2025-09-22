export default function Section({title,ctaHref,ctaText="See all",children}:{title:string;ctaHref?:string;ctaText?:string;children:React.ReactNode}){
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        {ctaHref && <a href={ctaHref} className="text-sm text-emerald hover:underline">{ctaText}</a>}
      </div>
      {children}
    </section>
  );
}
