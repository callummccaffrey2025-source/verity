export async function getSupabaseServer(){
  return { auth: { async getUser(){ return { data: { user: null }, error: null } as any; } } } as any;
}
