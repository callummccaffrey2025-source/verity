import type { Metadata } from "next";
import Section from "../../../components/section";
import Container from "../../../components/container";
import AlertsClient from "../../../components/alerts-client";
export const metadata: Metadata = { title:"Alerts & briefings", description:"Follow topics, bills, or MPs and get daily updates.", alternates:{ canonical:"/alerts" }, openGraph:{ images:["/og?title=Alerts&tag=Module"] } };
export default function AlertsPage(){
  return (<Section className="pt-16 md:pt-24"><Container>
    <h1 className="text-4xl md:text-5xl font-serif font-extrabold">Alerts & briefings</h1>
    <p className="mt-2 text-neutral-400">Pick topics and where to send them.</p>
    <div className="mt-6"><AlertsClient/></div>
  </Container></Section>);
}
