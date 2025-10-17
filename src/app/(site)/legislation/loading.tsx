export default function Loading(){
  return (
    <div className="p-6 space-y-3 animate-pulse">
      {Array.from({length:2}).map((_,i)=>(
        <div key={i} className="h-16 rounded-2xl bg-zinc-900/50 border border-zinc-800" />
      ))}
    </div>
  );
}
