import type { ReactNode } from 'react';
export default function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h1 className="page-title">{title}</h1>
      {children}
    </section>
  );
}
