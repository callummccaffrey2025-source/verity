
import fs from "fs";

import path from "path";



export type Source = {

  id: string;

  type: "bill" | "hansard" | "media";

  title: string;

  date: string;

  url: string;

  snippet: string;

  text: string;

};

export type Bill = {

  id: string;

  title: string;

  stage: string;

  summary: string;

  sponsors: string[];

  last_updated: string;

  sources: string[]; // source ids

};

export type Vote = { billId: string; position: "aye" | "no" | "abstain"; date: string };

export type MP = {

  id: string;

  name: string;

  party: string;

  electorate: string;

  roles: string[];

  integrity: { conflicts: string[]; gifts: string[] };

  votes: Vote[];

};

export type Alerts = {

  topics?: string[];

  mpIds?: string[];

  billIds?: string[];

};



const DATA_DIR = path.join(process.cwd(), "src", "data");

const file = (name: string) => path.join(DATA_DIR, name);



function readJSON<T>(name: string, fallback: T): T {

  try {

    const p = file(name);

    if (!fs.existsSync(p)) return fallback;

    return JSON.parse(fs.readFileSync(p, "utf8")) as T;

  } catch {

    return fallback;

  }

}

function writeJSON(name: string, value: unknown) {

  fs.mkdirSync(DATA_DIR, { recursive: true });

  fs.writeFileSync(file(name), JSON.stringify(value, null, 2));

}



// Public helpers

export const db = {

  status(): unknown {

    // Keep it simple; route code derives docCounts separately

    return readJSON<unknown>("status.json", {});

  },

  sources(): Source[] { return readJSON<Source[]>("sources.json", []); },

  bills(): Bill[] { return readJSON<Bill[]>("bills.json", []); },

  mps(): MP[] { return readJSON<MP[]>("mps.json", []); },

  topics(): string[] { return readJSON<string[]>("topics.json", []); },

  appendWaitlist(email: string, optedOut: boolean) {

    const arr = readJSON<unknown[]>("waitlist.json", []);

    arr.push({ email, optedOut, ts: new Date().toISOString() });

    writeJSON("waitlist.json", arr);

  },

  bill(id: string) {

    return this.bills().find((b) => b.id === id);

  },

  mp(id: string) {

    return this.mps().find((m) => m.id === id);

  },

};

