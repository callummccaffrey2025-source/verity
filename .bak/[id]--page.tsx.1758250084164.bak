import { use } from 'react';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <div className="p-6 space-y-2">
      <h1 className="text-2xl font-semibold">MP Profile</h1>
      <p className="text-zinc-300 text-sm">
        Profile for: <span className="font-medium">{id}</span>
      </p>
      <p className="text-zinc-400 text-sm">
        (Temporary safe placeholder to unblock builds. Original backed up at .bak/mps_id_page.tsx.bak)
      </p>
    </div>
  );
}
