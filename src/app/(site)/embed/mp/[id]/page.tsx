export const metadata = { title: "MP widget" , openGraph: { images: ["/og?title=MP%20widget"] } };
export default function MpEmbed({ params }: { params: Promise<{ id: string }> }) {
  void params;
  return (
    <main className="p-4">
      <style dangerouslySetInnerHTML={{__html: "header,footer{display:none!important}"}} />
      <div className="card p-4 max-w-md">
        <div className="text-emerald-300 font-semibold">MP profile</div>
        <div className="mt-1 text-neutral-300">Anne Doe</div>
        <div className="mt-3 text-sm text-neutral-400">Attendance 96% • Alignment 88%</div>
      </div>
    </main>
  );
}
