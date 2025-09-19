export type Party = 'Liberal' | 'Labor' | 'Greens' | 'Independent' | 'National' | 'Other';

export interface MP {
  id: string;
  name: string;
  party: Party | string;
  electorate: string;
  state: string;
  headshot?: string;
  roles?: string[];
  committees?: string[];
  bio?: string;
  attendancePct?: number;
  trustIndex?: number;
  influenceScore?: number;
  donors?: { name: string; amountAUD: number; year: number }[];
  votes?: {
    billId: string;
    billTitle: string;
    vote: 'Aye' | 'No' | 'Abstain' | 'Absent';
    date: string;
  }[];
  statements?: { date: string; source: string; excerpt: string }[];

  /* ---- legacy/compat fields used by existing components ---- */
  since?: number;
  partyLinePct?: number;
  integrityGrade?: string;
  recentVotes?: { title: string; position: string }[];
}

export interface Bill {
  id: string;
  title: string;
  introducedBy: string;  // mp id (slug)
  stage: 'Introduced' | 'Second Reading' | 'Committee' | 'Passed' | 'Rejected';
  summary?: string;
  lapsed?: boolean;
  votes?: { mpId: string; mpName: string; vote: 'Aye' | 'No' | 'Abstain' | 'Absent' }[];
  sources?: { label: string; url: string }[];
  predictedPassPct?: number;
  yourMPPosition?: string;
}
