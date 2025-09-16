import Section from "../../../components/section";
import Container from "../../../components/container";
export const metadata = { title: "Press kit", description: "Brand assets and screenshots.", alternates: { canonical: "/download" }, openGraph: { title: "Press kit", description: "Verity brand assets.", url: "/download" } };
export default function Download() {
  return <Section className="pt-20"><Container><h1 className="text-3xl font-bold">Press kit</h1><p className="mt-2 text-neutral-300">Download logos, screenshots, and boilerplate copy.</p></Container></Section>;
}
