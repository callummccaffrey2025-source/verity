import SourceGuard from '../../../components/verity/SourceGuard';
import { Receipts } from '../../../components/verity/Receipts';

const mock = [
  { outlet: 'Example News',   score: -0.3, receipts: [{ url: 'https://oecd.org',         label: 'Method note' }] },
  { outlet: 'Centrist Daily', score:  0.0, receipts: [{ url: 'https://abs.gov.au',       label: 'ABS metadata' }] },
  { outlet: 'Market Herald',  score:  0.4, receipts: [{ url: 'https://australia.gov.au', label: 'Gov source' }] },
];

export default function Page() {
  const receipts = mock.flatMap(m => m.receipts);
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Bias Compass™</h1>
      <p className="text-zinc-300">Analytic spectrum of outlet framing. Click receipts to review methods.</p>
      <SourceGuard receipts={receipts}>
        <div className="rounded-2xl border border-zinc-800 p-4">
          <ul className="space-y-2">
            {mock.map((m, i) => (
              <li key={i} className="flex items-center justify-between">
                <span>{m.outlet}</span>
                <span className="text-zinc-400">{m.score.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
        <Receipts items={receipts} />
      </SourceGuard>
    </div>
  );
}
