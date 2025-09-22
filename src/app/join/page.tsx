import Section from "@/components/shared/Section";
import Button from "@/components/ui/button";
export default function Page(){
  return (
    <Section title="Join Verity">
      <form className="max-w-md space-y-4">
        <input className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none placeholder:text-white/50" placeholder="Email" />
        <Button className="w-full">Get started</Button>
      </form>
      <p className="mt-3 text-sm text-white/60">We will never sell your data. Unsubscribe anytime.</p>
    </Section>
  );
}
