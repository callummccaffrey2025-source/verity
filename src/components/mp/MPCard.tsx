import type { MP } from "@/types";
import Card from "@/components/ui/card";
export default function MPCard({ mp }: { mp: MP }){
  return (
    <Card className="p-5 transition hover:scale-[1.01]">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 shrink-0 rounded-full bg-emerald/20" />
        <div>
          <div className="font-medium">{mp.name}</div>
          <div className="text-xs text-white/60">{mp.party} — {mp.electorate}</div>
        </div>
      </div>
    </Card>
  );
}
