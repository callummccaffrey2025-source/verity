export default function JoinPage() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-white">Join Verity</h1>
      <p className="text-zinc-400 max-w-xl">
        We&apos;re opening the platform to early access partners. Share your email
        and we&apos;ll invite you as soon as the next cohort opens.
      </p>
      <form className="flex flex-col gap-3 max-w-sm">
        <input
          className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-500"
          type="email"
          placeholder="you@example.com"
          aria-label="Email address"
          disabled
        />
        <button
          type="button"
          disabled
          className="rounded bg-emerald-500 px-4 py-2 text-sm font-medium text-white opacity-60"
        >
          Coming soon
        </button>
      </form>
    </main>
  );
}
