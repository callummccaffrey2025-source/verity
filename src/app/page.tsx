import PageHeader from "@/components/PageHeader";
export const dynamic = "force-static";
export default function Home() {
  return (
    <div>
      <PageHeader title="Home" subtitle="Truth-first briefings, bills, MPs, ownership." />
    </div>
  );
}
