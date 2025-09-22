export type MP = { id: string; name: string; party: string; electorate: string; image?: string; };
export type Bill = { id: string; title: string; status: "Introduced"|"Committee"|"House"|"Senate"|"Assented"; summary: string; introduced: string; sponsor?: string; };
export type NewsItem = { id: string; title: string; source: string; url: string; published: string; topic?: string; };
