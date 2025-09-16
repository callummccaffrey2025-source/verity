import Section from "../../../components/section";
import Container from "../../../components/container";

export const metadata = {
  title: "Developers",
  description: "Lightweight API stubs for demos and integration.",
  alternates: { canonical: "/developers" },
  openGraph: { images: ["/og?title=Developers"] } };

const curl = `# Status
curl -sS $BASE/api/status | jq .

# Diff mock
curl -sS $BASE/api/diff/mock | jq .

# Watchlist
curl -sS $BASE/api/watchlist
curl -sS -X POST $BASE/api/watchlist -H 'content-type: application/json' -d '{"topic":"privacy"}'

# CSV export
curl -sS -L "$BASE/api/export/csv?type=mps" -o mps.csv
curl -sS -L "$BASE/api/export/csv?type=watchlist" -o watchlist.csv`;

export default function Developers() {
  return (
    <Section className="pt-16 md:pt-24">
      <Container>
        <h1 className="text-4xl md:text-5xl font-serif font-extrabold">Developers</h1>
        <p className="mt-2 text-neutral-400">Simple endpoints for demos. Replace with production API later.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="card p-5">
            <div className="text-emerald-300 font-semibold">Endpoints</div>
            <ul className="mt-2 list-disc pl-6 text-neutral-300 space-y-1">
              <li>GET <code className="text-xs">/api/status</code> — uptime & freshness</li>
              <li>GET <code className="text-xs">/api/diff/mock</code> — sample before/after</li>
              <li>POST <code className="text-xs">/api/diff/subscribe</code> — subscribe (email, topic)</li>
              <li>GET/POST/DELETE <code className="text-xs">/api/watchlist</code> — topics</li>
              <li>GET <code className="text-xs">/api/export/csv?type=mps|watchlist</code> — CSV export</li>
            </ul>
          </div>
          <div className="card p-5">
            <div className="text-emerald-300 font-semibold">Quickstart (curl)</div>
            <p className="text-sm text-neutral-400">Set <code>$BASE</code> to your site (e.g. https://verity.run).</p>
            <pre className="mt-3 whitespace-pre-wrap text-xs text-neutral-300">{curl}</pre>
          </div>
        </div>

        <div className="mt-6 text-xs text-neutral-500">
          <p>Notes: Rate-limited; no auth; Edge runtime; responses are demo-only.</p>
        </div>
      </Container>
    </Section>
  );
}
