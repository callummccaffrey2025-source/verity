import { MPS } from "@/data/mps";
import MPCard from "@/components/MPCard";

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-bold">MPs</h1>
      <p className="text-neutral-100 mt-1">Directory & intelligence cards.</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {MPS.map((mp) => <MPCard key={mp.id} mp={mp} />)}
      </div>
    </main>
  );
}
