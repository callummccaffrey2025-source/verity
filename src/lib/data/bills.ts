import type { Bill } from '@/lib/types-compat';
export const BILLS: Bill[] = [
  {
    id: 'digital-id-2024',
    title: 'Digital ID Bill 2024',
    introducedBy: 'andrew-hastie',
    stage: 'Second Reading',
    summary: 'Creates a national framework for digital identity. (Plain-language summary placeholder.)',
    votes: [
      { mpId: 'andrew-hastie', mpName: 'Andrew Hastie', vote: 'Aye' },
    ],
    sources: [
      { label: 'Explanatory Memorandum (placeholder)', url: '#' },
    ],
  },
];

export const getBillIds = () => BILLS.map(b => b.id);
export const getBillById = (id: string) => BILLS.find(b => b.id === id);
