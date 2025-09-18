import type { MP } from '../types/mp';

export const MPS: MP[] = [
  {
    id: 'alex-smith',
    slug: 'alex-smith',
    name: 'Alex Smith',
    party: 'Independent',
    chamber: 'House',
    electorate: 'Sydney',
    portraitUrl: 'https://placehold.co/200x240',
    attendance: { overallPct: 94, last12mPct: 96, series: [['2025-01-01',92],['2025-02-01',93],['2025-03-01',94],['2025-04-01',96],['2025-05-01',96],['2025-06-01',95],['2025-07-01',96]] },
    rebellions12m: 2,
    committees: [{ name: 'Economics', role: 'Member', attendancePct: 92 }],
    roles: ['Member for Sydney'],
    votes: [
      { date: '2025-08-20', billId: 'housing-bill-2025', billTitle: 'Housing Affordability Bill 2025', position: 'Aye', division: 'Passed', topics: ['Housing','Economy'], receipts: [{ label: 'Division list', url: '#', source: 'APH' }] },
      { date: '2025-07-02', billId: 'energy-bill', billTitle: 'Energy Reliability Amendment', position: 'No', division: 'Failed', topics: ['Energy'], receipts: [{ label: 'Hansard', url: '#', source: 'Hansard' }] },
    ],
    speeches: [{ date: '2025-08-19', title: 'Second reading speech — Housing Bill', url: '#', receipts: [{ label: 'Hansard', url: '#', source: 'Hansard' }] }],
    interestsUrl: '#',
    donations: [{ amount: 1500, source: 'Local Association', date: '2025-05-11', receipts: [{ label: 'Disclosure', url: '#', source: 'AEC' }] }],
    signals: [{ kind: 'FloorCross', summary: 'Crossed floor on energy bill', date: '2025-07-02', receipts: [{ label: 'Division list', url: '#', source: 'APH' }] }],
    receipts: [{ label: 'Attendance CSV', url: '#', source: 'APH' }],
  },
  {
    id: 'jamie-lee',
    slug: 'jamie-lee',
    name: 'Jamie Lee',
    party: 'Labor',
    chamber: 'House',
    electorate: 'Grayndler',
    portraitUrl: 'https://placehold.co/200x240',
    attendance: { overallPct: 98, last12mPct: 99, series: [['2025-01-01',97],['2025-06-01',99]] },
    rebellions12m: 0,
    committees: [{ name: 'Health', role: 'Chair', attendancePct: 97 }],
    roles: ['Minister for Health'],
    votes: [],
    speeches: [],
    signals: [],
    receipts: [],
  },
];

export async function listMPs() { return MPS; }
export async function getMP(slug: string) { return MPS.find(m => m.slug === slug) || null; }
