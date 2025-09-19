import { cookies } from "next/headers";
export type Persona = "citizen"|"power"|"journalist";
export function getPersona(): Persona{
  const v = (cookies() as any).get?.("v_persona")?.value ?? "citizen";
  return (["citizen","power","journalist"].includes(v)?v:"citizen") as Persona;
}
