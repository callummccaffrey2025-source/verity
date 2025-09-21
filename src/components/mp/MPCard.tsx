type Props = {
  name: string; party?: string; seat?: string; photoUrl?: string; state?: string;
  onClick?: () => void;
};
export default function MPCard({ name, party='—', seat='—', photoUrl, state='—', onClick }: Props){
  return (
    <button onClick={onClick} className="group w-full rounded-2xl border border-white/10 bg-ink/60 p-4 text-left transition hover:border-brand/50 hover:shadow-soft">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 overflow-hidden rounded-xl bg-white/5">
          {photoUrl ? <img src={photoUrl} alt={name} className="h-full w-full object-cover" /> : <div className="h-full w-full" />}
        </div>
        <div className="flex-1">
          <div className="font-medium">{name}</div>
          <div className="text-xs text-white/60">{party} • {seat} • {state}</div>
        </div>
        <div className="text-brand opacity-0 transition group-hover:opacity-100">View →</div>
      </div>
    </button>
  );
}
