export type Party = "Liberal" | "Labor" | "Greens" | "Independent" | "Nationals" | "Other";
export interface MP { id:string; name:string; electorate:string; party:Party; since:number; attendancePct:number; partyLinePct:number; integrityGrade:"A+"|"A"|"A-"|"B+"|"B"|"B-"|"C"; recentVotes: Array<{ title:string; position:"For"|"Against"|"Abstain" }>; }
export interface Bill { id:string; title:string; stage:string; summary:string; predictedPassPct:number; yourMPPosition:"For"|"Against"|"Abstain"; }
