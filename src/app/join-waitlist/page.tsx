export default function JoinWaitlist(){
  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold">Join the waitlist</h1>
      <p className="text-zinc-400 mt-2">Be first to get Verity updates and early access.</p>
      <form action="https://example.com/form" className="mt-4 space-y-3" onSubmit={(e)=>{e.preventDefault(); alert("Thanks! (wire to your form backend)");}}>
        <input required type="email" placeholder="you@example.com" className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2" />
        <button className="brand-bg rounded px-4 py-2 font-medium">Join</button>
      </form>
    </div>
  );
}
