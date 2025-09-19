import Link from 'next/link';
import { MP } from '@/lib/types';

export default function VoteTable({ mp }: { mp: MP }) {
  const votes = mp.votes || [];
  if (!votes.length) return <p className="text-sm text-neutral-500">No votes recorded.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2 pr-4">Date</th>
            <th className="py-2 pr-4">Bill</th>
            <th className="py-2 pr-4">Vote</th>
          </tr>
        </thead>
        <tbody>
          {votes.map(v => (
            <tr key={`${v.billId}-${v.date}`} className="border-b last:border-b-0">
              <td className="py-2 pr-4 whitespace-nowrap">{new Date(v.date).toLocaleDateString()}</td>
              <td className="py-2 pr-4">
                <Link href={`/bills/${v.billId}`} className="underline underline-offset-2">{v.billTitle}</Link>
              </td>
              <td className="py-2 pr-4">{v.vote}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
