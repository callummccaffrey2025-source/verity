'use client';
import useSWR from 'swr';
import Empty from '@/components/shared/Empty';
import Section from '@/components/shared/Section';

const fetcher = (u:string)=>fetch(u).then(r=>r.json());
export default function Page(){
  const { data, isLoading, error } = useSWR('/api/bills', fetcher);
  const items = data?.items || [];
  return (
    <Section title="Bills">
      {isLoading && (
        <div className="grid gap-6 md:grid-cols-2">
          {[...Array(6)].map((_,i)=>(
            <div key={i} className="card p-6">
              <div className="h-4 w-60 skeleton mb-4"></div>
              <div className="grid grid-cols-3 gap-3">
                <div className="h-3 skeleton"></div>
                <div className="h-3 skeleton"></div>
                <div className="h-3 skeleton"></div>
              </div>
            </div>
          ))}
        </div>
      )}
      {error && <Empty title="Could not load bills" hint="Check API or Supabase env." />}
      {!isLoading && !error && items.length === 0 && (
        <Empty title="No bills yet" hint="Connect Supabase or crawler first." />
      )}
      {!isLoading && items.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((b:any)=>(
            <div key={b.id} className="card p-6">
              <div className="text-lg font-semibold">{b.title}</div>
              <div className="subtle mt-1">{b.status ?? '—'}</div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
