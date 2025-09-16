import { cookies } from "next/headers";
export type Persona = "citizen" | "power" | "journalist";
export function getPersona(): Persona {
  const p = cookies().get("v_persona")?.value || "citizen";
  return (["citizen","power","journalist"].includes(p) ? p : "citizen") as Persona;
}
