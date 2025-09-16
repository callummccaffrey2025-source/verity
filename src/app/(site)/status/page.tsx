import Section from "../../../components/section";
import Container from "../../../components/container";

export const metadata = { title: "Status", description: "Uptime and data freshness.", alternates: { canonical: "/status" } , openGraph: { images: ["/og?title=Status"] } };

async function getStatus() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "";
  const res = await fetch(`${base}/api/status`, { cache: "no-store" }).catch(() => null);
  return res?.ok ? res.json() : null;
}

export default async function Status() {
  const data = await getStatus();
  return (
    <Section className="pt-16 md:pt-24">
      <Container>
        <h1 className="text-4xl md:text-5xl font-serif font-extrabold">Status</h1>
        <p className="mt-2 text-neutral-400">Availability & last ingest times.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="card p-5"><div className="text-emerald-300 font-semibold">Uptime (30d)</div><p className="mt-1">{data?.uptime_30d ?? "—"}</p></div>
          <div className="card p-5"><div className="text-emerald-300 font-semibold">Bills</div><p className="mt-1">{data?.last_ingest?.bills ?? "—"}</p></div>
          <div className="card p-5"><div className="text-emerald-300 font-semibold">Hansard</div><p className="mt-1">{data?.last_ingest?.hansard ?? "—"}</p></div>
          <div className="card p-5 md:col-span-3"><div className="text-emerald-300 font-semibold">Media</div><p className="mt-1">{data?.last_ingest?.media ?? "—"}</p></div>
        </div>
      </Container>
    </Section>
  );
}
