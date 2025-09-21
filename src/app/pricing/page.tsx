export default function Page(){
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Pricing</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {name:'Basic', price:'$1/mo', blurb:'Core transparency features'},
          {name:'Supporter', price:'$3/mo', blurb:'Early features + reports'},
          {name:'Patron', price:'$5/mo', blurb:'Everything + thank-you wall'},
        ].map((t)=>(
          <div key={t.name} className="rounded-2xl border border-white/10 p-6">
            <div className="text-lg font-medium">{t.name}</div>
            <div className="my-2 text-3xl text-brand">{t.price}</div>
            <div className="text-sm text-white/70">{t.blurb}</div>
            <a href="/join" className="mt-4 inline-block rounded-lg bg-brand px-4 py-2 text-ink hover:shadow-soft">Get started</a>
          </div>
        ))}
      </div>
    </div>
  );
}
