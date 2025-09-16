import JoinForm from "@/components/JoinForm";
export const dynamic = "force-static";
export default function JoinWaitlist(){
  return (
    <div>
      <h1 className="text-3xl font-bold">Join the waitlist</h1>
      <p className="text-zinc-400 mt-2">Be first to get Verity updates and early access.</p>
      <JoinForm />
      <p className="text-xs text-zinc-500 mt-4">We respect your inbox. Unsubscribe anytime.</p>
    </div>
  );
}
