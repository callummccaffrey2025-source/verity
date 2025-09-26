'use client';
import useSWR from 'swr';
import Empty from '@/components/shared/Empty';
import Section from '@/components/shared/Section';

const fetcher = (u:string)=>fetch(u).then(r=>r.json());
export default function Page(){
  const { data, isLoading, error } = useSWR('/api/news', fetcher);
  const items = data?.items || [];
  return (
    <Section title="News">
      {isLoading && (
        <div className="grid gap-6 md:grid-cols-2">
          {[...Array(4)].map((_,i)=>(
            <div key={i} className="card p-6">
              <div className="h-4 w-40 skeleton mb-3"></div>
              <div className="h-3 w-72 skeleton mb-2"></div>
              <div className="h-3 w-56 skeleton"></div>
            </div>
          ))}
        </div>
      )}
      {error && <Empty title="Could not load news" hint="Check API or Supabase env." />}
      {!isLoading && !error && items.length === 0 && (
        <Empty title="No articles yet" hint="Connect Supabase or ingestion first." />
      )}
      {!isLoading && items.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((n:any)=>(
            <article key={n.id} className="card p-6">
              <h3 className="text-lg font-semibold mb-2">{n.title}</h3>
              <p className="subtle">{n.source ?? n.publisher ?? ''}</p>
            </article>
          ))}
        </div>
      )}
    </Section>
  );
}
