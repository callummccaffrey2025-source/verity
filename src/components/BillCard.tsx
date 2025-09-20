import Link from 'next/link'
import type { Bill } from '@/lib/types-compat'
import { Badge } from '@/components/ui/badge'

const stageTone = (s:Bill['stage']) => (s==='Passed'?'success':s==='Rejected'?'warning':'muted')

export default function BillCard({ bill }: { bill: Bill }) {
  const pass = bill.predictedPassPct ?? 62
  const mpPos = bill.yourMPPosition ?? '—'
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href={`/bills/${bill.id}`} className="font-semibold hover:underline">{bill.title}</Link>
          <p className="mt-1 text-sm text-neutral-300">{bill.summary ?? 'Plain-language summary coming soon.'}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="success">Predicted pass {pass}%</Badge>
            <Badge>Your MP: {mpPos}</Badge>
          </div>
        </div>
        <Badge variant={stageTone(bill.stage)} className="whitespace-nowrap">Stage: {bill.stage}</Badge>
      </div>
    </div>
  )
}
