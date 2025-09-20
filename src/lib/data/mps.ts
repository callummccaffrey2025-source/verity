import type { MP } from '@/lib/types';
export const MPS: MP[] = [
  {
    id: 'andrew-hastie',
    name: 'Andrew Hastie',
    party: 'Liberal',
    electorate: 'Canning',
    state: 'WA',
    headshot: '/icon.svg',
    roles: ['Shadow Minister for Defence'],
    committees: ['Joint Committee on Intelligence and Security'],
    bio: 'Member for Canning since 2015. Former ADF officer. (Bio text placeholder)',
    attendancePct: 94,
    trustIndex: 0,
    influenceScore: 0,
    donors: [
      { name: 'AEC Public Disclosure (example)', amount: 15000, amountAUD: 15000, year: 2023 },
    ],
    votes: [
      { billId: 'digital-id-2024', billTitle: 'Digital ID Bill 2024', title: 'Digital ID Bill 2024', position: 'Aye', vote: 'Aye', date: '2024-06-18' },
      { billId: 'housing-aus-2025', billTitle: 'Housing Affordability Bill 2025', title: 'Housing Affordability Bill 2025', position: 'No', vote: 'No', date: '2025-03-22' },
    ],
    statements: [
      {
        date: '2025-02-10',
        source: 'Hansard (placeholder)',
        excerpt: 'We should ensure national security while safeguarding civil liberties.',
      },
    ],
  },
];

export const getAllMPIds = () => MPS.map(m => m.id);
export const getMPById = (id: string) => MPS.find(m => m.id === id);
