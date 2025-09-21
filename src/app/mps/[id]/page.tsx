 
import type { Metadata } from "next";
export async function generateMetadata({ params }:{ params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const title = "MP · " + id;
  const description = "MP profile: attendance, alignment & reliability.";
  return {
    title,
    description,
    alternates: { canonical: "/mps/" + id },
    openGraph: { title, description },
    twitter: { title, description },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }){
  
  const { id } = await params;
  return (
    <div className="p-6 space-y-2">
      <h1 className="text-2xl font-semibold">MP Profile</h1>
      <p className="text-neutral-100 text-sm">
        Profile for: <span className="font-medium">{id}</span>
      </p>
      <p className="text-neutral-100 text-sm">
        (Temporary safe placeholder to unblock builds. Original backed up at .bak/mps_id_page.tsx.bak)
      </p>
    </div>
  );
}
