export const dynamic = "force-dynamic";
export async function GET(_req: Request, ctx: { params: { id: string } }) {
  return new Response(JSON.stringify({ ok:true, id: ctx.params.id }), {
    headers: { "content-type":"application/json" }
  });
}
