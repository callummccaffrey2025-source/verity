'use client';
import useSWR from 'swr';
import Empty from '@/components/shared/Empty';
import Section from '@/components/shared/Section';

const fetcher = (u:string)=>fetch(u).then(r=>r.json());
export default function Page(){
  const { data, isLoading, error } = useSWR('/api/mps', fetcher);
  const items = data?.items || [];
  return (
    <Section title="MPs">
      {isLoading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(9)].map((_,i)=>(
            <div key={i} className="card p-5">
              <div className="h-14 w-14 rounded-full skeleton mb-3"></div>
              <div className="h-4 w-40 skeleton mb-2"></div>
              <div className="h-3 w-24 skeleton"></div>
            </div>
          ))}
        </div>
      )}
      {error && <Empty title="Could not load MPs" hint="Check API or Supabase env." />}
      {!isLoading && !error && items.length === 0 && (
        <Empty title="No MPs yet" hint="Connect Supabase or import roll first." />
      )}
      {!isLoading && items.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((m:any)=>(
            <div key={m.id} className="card p-5">
              <div className="text-lg font-semibold">{m.name}</div>
              <div className="subtle">{m.party} · {m.electorate}</div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
