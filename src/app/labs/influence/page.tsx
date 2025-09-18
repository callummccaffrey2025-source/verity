import SourceGuard from '../../../components/verity/SourceGuard';
const scores = [{ mp:'MP Example', score:71, receipts:[{url:'https://parlinfo.aph.gov.au',label:'Bills passed'}] }];
export default function Page(){
  const receipts = scores.flatMap(s=>s.receipts);
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">MP Influence Score</h1>
      <p className="text-zinc-300 text-sm">Transparent formula combining objective metrics. Click receipts for underlying records.</p>
      <SourceGuard receipts={receipts}>
        <div className="space-y-2">{scores.map((s,i)=>(
          <div key={i} className="rounded-xl border border-zinc-800 p-4 flex justify-between">
            <span>{s.mp}</span><span className="text-zinc-400">{s.score}</span>
          </div>
        ))}</div>
      </SourceGuard>
    </div>
  );
}
