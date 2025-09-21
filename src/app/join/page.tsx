export default function Page(){
  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-4 text-2xl font-semibold">Join Verity</h1>
      <form className="space-y-3">
        <input className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none" placeholder="Email" />
        <button className="w-full rounded-lg bg-brand px-4 py-2 text-ink hover:shadow-soft">Continue</button>
      </form>
      <p className="mt-3 text-sm text-white/60">We’ll enable paid plans once your account is created.</p>
    </div>
  );
}
