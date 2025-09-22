import type { Bill } from "@/types";
import Card from "@/components/ui/card";
import Badge from "@/components/ui/Badge";
export default function BillCard({ bill }: { bill: Bill }){
  return (
    <Card className="p-5">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-semibold">{bill.title}</h3>
        <Badge>{bill.status}</Badge>
      </div>
      <p className="text-sm text-white/70">{bill.summary}</p>
      <div className="mt-3 text-xs text-white/50">
        Introduced {bill.introduced}{bill.sponsor && <> · Sponsor: {bill.sponsor}</>}
      </div>
    </Card>
  );
}
