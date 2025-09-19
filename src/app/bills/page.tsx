import { BILLS } from "@/data/bills";
import BillCard from "@/components/BillCard";

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-bold">Bills</h1>
      <p className="text-neutral-100 mt-1">Live bill tracker.</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {BILLS.map((b) => <BillCard key={b.id} bill={b} />)}
      </div>
    </main>
  );
}
