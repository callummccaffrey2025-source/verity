'use client';

import React from 'react';
import MPCard from '../../../components/mp/MPCard';

type MPListData = {
  items: any[];
  total: number;
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function MPList({ data }: { data: MPListData }) {
  const serverItems = data?.items ?? [];

  const [clientData, setClientData] = React.useState<MPListData>(
    data || { items: [], total: 0 }
  );

  React.useEffect(() => {
    if (!clientData?.items?.length) {
      const q = new URLSearchParams({ sort: 'alpha', page: '1', pageSize: '24' });
      fetch('/api/mps?' + q)
        .then((r) => r.json())
        .then((json) =>
          setClientData({ items: json?.items ?? [], total: json?.total ?? 0 })
        )
        .catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clientItems = (clientData?.items || []);
  const items = (Array.isArray(serverItems) && serverItems.length ? serverItems : clientItems);

  const showSkel = items.length === 0;

  return (
    <div>
      <ul role="list" role="list" className="grid grid-cols-1 gap-3 sm:grid-cols-1 lg:grid-cols-1">
        {items.map((m: any, i: number) => {
          const slug = m?.slug ?? (m?.name ? slugify(m.name) : '');
          const key = slug || m?.id || `${m?.name || 'mp'}-${i}`;
          return (
            <li key={key}>
              <MPCard mp={m} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
