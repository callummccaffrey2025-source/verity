export interface NewsItem {
  id: string;
  title: string;
  source: string;
  published: string; // ISO
  url: string;
  related?: { mpIds?: string[]; billIds?: string[] };
  bias?: 'Left' | 'Center' | 'Right' | 'Unknown';
}

export const NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'Digital ID framework clears second reading',
    source: 'Example News',
    published: '2025-03-20T08:00:00Z',
    url: '#',
    related: { billIds: ['digital-id-2024'], mpIds: ['andrew-hastie'] },
    bias: 'Center',
  },
];
