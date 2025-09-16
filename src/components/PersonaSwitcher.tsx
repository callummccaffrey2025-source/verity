"use client";
import { useState } from "react";
type Persona = "citizen" | "power" | "journalist";
export default function PersonaSwitcher({ value }: { value: Persona }) {
  const [v, setV] = useState<Persona>(value);
  return (
    <select
      value={v}
      onChange={async (e) => {
        const persona = e.currentTarget.value as Persona;
        setV(persona);
        await fetch("/api/personalize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ persona }),
        });
        location.reload();
      }}
      className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm"
    >
      <option value="citizen">Citizen</option>
      <option value="power">Power User</option>
      <option value="journalist">Journalist</option>
    </select>
  );
}
