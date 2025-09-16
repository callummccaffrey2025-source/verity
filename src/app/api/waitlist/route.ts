export const runtime = "edge";
import { rateLimit } from "@/lib/limiter";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "local";
  if (!rateLimit(`waitlist:${ip}`).ok) return new Response("rate_limited", { status: 429 });

  const { email = "", consent = false, website = "" } = await req.json().catch(() => ({}));
  if (website) return new Response("ok", { status: 202 }); // honeypot
  if (!email || !email.includes("@")) return new Response(JSON.stringify({ error: "invalid_email" }), { status: 400 });

  console.log("[WAITLIST]", email, consent);
  return new Response(null, { status: 202 });
}
