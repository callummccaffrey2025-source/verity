import { supabaseServer } from "@/lib/supabase/server";
export const revalidate = 3600;

type Bill = { id: string; title: string | null; chamber: string | null; stage: string | null; source_url: string | null; };
type Section = { id: string; bill_id: string; heading: string | null; text: string | null; };

async function getBill(id: string) {
  const sb = supabaseServer();
  const [{ data: bill, error: e1 }, { data: sections, error: e2 }] = await Promise.all([
    sb.from("bills_v1").select("id,title,chamber,stage,source_url").eq("id", id).maybeSingle(),
    sb.from("bill_sections_v1").select("id,bill_id,heading,text,ord").eq("bill_id", id).order("ord", { ascending: true }),
  ]);
  if (e1) console.error("bills_v1 error", e1);
  if (e2) console.error("bill_sections_v1 error", e2);
  return { bill: (bill as Bill | null) ?? null, sections: ((sections as any[])?.map(({ord, ...r})=>r) as Section[] | null) ?? [] };
}

export default async function BillPage({ params }: { params: { id: string } }) {
  const { bill, sections } = await getBill(params.id);
  if (!bill) return <div className="p-6 text-white/70">Bill not found.</div>;

  return (
    <main className="p-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">{bill.title ?? "Untitled Bill"}</h1>
        <div className="text-white/70">
          {(bill.chamber ?? "Chamber")} · {(bill.stage ?? "Stage")}
          {bill.source_url ? <> {" "}|{" "}
            <a className="underline" href={bill.source_url} target="_blank" rel="noreferrer">Source</a>
          </> : null}
        </div>
      </header>
      <section className="space-y-4">
        {sections?.length ? sections.map((s) => (
          <article key={s.id} className="rounded-xl border border-white/10 p-4 space-y-2">
            {s.heading ? <h2 className="text-xl font-medium">{s.heading}</h2> : null}
            {s.text ? <p className="whitespace-pre-wrap leading-relaxed opacity-90">{s.text}</p> : null}
          </article>
        )) : <div className="text-white/70">No sections.</div>}
      </section>
    </main>
  );
}
