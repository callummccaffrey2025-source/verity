export const metadata = { title: "Bill widget" , openGraph: { images: ["/og?title=Bill%20widget"] } };
export default function BillEmbed({ params }: { params: Promise<{ slug: string }> }) {
  void params; // not used in mock
  return (
    <main className="p-4">
      <style dangerouslySetInnerHTML={{__html: "header,footer{display:none!important}"}} />
      <div className="card p-4 max-w-md">
        <div className="text-emerald-300 font-semibold">Bill status</div>
        <div className="mt-1 text-neutral-300">privacy-amendment-2025</div>
        <div className="mt-3 flex gap-2 text-sm">
          <span className="rounded bg-white/10 px-2 py-1">Introduced</span>
          <span className="rounded bg-white/10 px-2 py-1">Committee</span>
        </div>
      </div>
    </main>
  );
}
