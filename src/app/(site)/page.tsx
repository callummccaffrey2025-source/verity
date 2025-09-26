export default function Page() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="page-title mb-4">Know what your government is doing — instantly.</h1>
        <p className="subtle max-w-2xl mx-auto">
          Verity tracks bills, MP votes, and news in one clean feed. Search once, see everything that matters.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a className="btn" href="/join">Get started for $1/month</a>
          <a className="btn-outline" href="/pricing">See pricing</a>
        </div>
      </section>
      <section className="grid gap-6 md:grid-cols-3">
        {[
          {title:'Live Bill Tracking', desc:'Follow every stage of a bill with plain-language summaries.'},
          {title:'MP Voting Records', desc:'See how your MP voted, historically and today.'},
          {title:'Bias-Checked News', desc:'Aggregate coverage with bias context at a glance.'},
        ].map((f,i)=>(
          <div key={i} className="card p-6">
            <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
            <p className="subtle">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
