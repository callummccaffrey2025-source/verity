export type Preferences = {
  persona: 'Citizen' | 'Power User' | 'Journalist' | 'Educator';
  electorate: string;
  postcode: string;
  issues: string[];
  media: {
    balance: number;           // 0 left..100 right (50=center)
    reduceOpinion: boolean;
    avoidPaywalled: boolean;
    exclude: string[];         // outlets to avoid
  };
  mps: string[];               // names/ids
  cadence: { mode: 'Email' | 'Push'; time: string; weekdays: string[] };
  consent?: { telemetry: boolean; personalisedEmail: boolean };
};

export const defaultPrefs: Preferences = {
  persona: 'Citizen',
  electorate: 'Sydney',
  postcode: '2000',
  issues: ['Housing', 'Climate', 'Economy'],
  media: { balance: 50, reduceOpinion: true, avoidPaywalled: false, exclude: [] },
  mps: ['Alex Smith'],
  cadence: { mode: 'Email', time: '07:30', weekdays: ['Mon','Tue','Wed','Thu','Fri'] },
  consent: { telemetry: false, personalisedEmail: true },
};

// ultra-light validation without adding deps
export function coercePrefs(input: any): Preferences | null {
  try {
    const p = { ...defaultPrefs, ...(input ?? {}) } as Preferences;
    p.persona = ['Citizen','Power User','Journalist','Educator'].includes(p.persona) ? p.persona : 'Citizen';
    p.postcode = String(p.postcode ?? '').slice(0, 8);
    p.electorate = String(p.electorate ?? '').slice(0, 64);
    p.issues = Array.isArray(p.issues) ? [...new Set(p.issues.map(String))].slice(0, 12) : defaultPrefs.issues;
    p.media = {
      balance: Math.min(100, Math.max(0, Number(p.media?.balance ?? 50))),
      reduceOpinion: !!p.media?.reduceOpinion,
      avoidPaywalled: !!p.media?.avoidPaywalled,
      exclude: Array.isArray(p.media?.exclude) ? [...new Set(p.media.exclude.map(String))].slice(0, 16) : [],
    };
    p.mps = Array.isArray(p.mps) ? [...new Set(p.mps.map(String))].slice(0, 10) : [];
    const wd = Array.isArray(p.cadence?.weekdays) ? p.cadence.weekdays : defaultPrefs.cadence.weekdays;
    p.cadence = {
      mode: p.cadence?.mode === 'Push' ? 'Push' : 'Email',
      time: String(p.cadence?.time ?? '07:30'),
      weekdays: wd.filter((d) => ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].includes(d)),
    };
    p.consent = {
      telemetry: !!p.consent?.telemetry,
      personalisedEmail: !!p.consent?.personalisedEmail,
    };
    return p;
  } catch {
    return null;
  }
}

// cookie helpers (1 year)
export function encodeCookie(p: Preferences) {
  return Buffer.from(JSON.stringify(p)).toString('base64url');
}
export function decodeCookie(raw?: string): Preferences | null {
  try { return raw ? JSON.parse(Buffer.from(raw, 'base64url').toString('utf8')) : null; }
  catch { return null; }
}
