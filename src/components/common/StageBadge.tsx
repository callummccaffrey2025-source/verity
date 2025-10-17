import fmt from "@/lib/format";
const { formatStage, formatIsoDate, fmtDate, formatDateAU } = fmt;
export default function StageBadge({value}:{value?:string}){
  const label = value ? fmt.formatStage(value) : "—";
  return <span className="inline-block rounded-full px-2 py-0.5 text-xs bg-white/10">{label}</span>;
}
