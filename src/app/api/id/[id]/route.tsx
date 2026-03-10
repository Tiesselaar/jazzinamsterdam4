import { createSupabaseClient } from "@/lib/supabase"

export async function GET(request: Request, props: { params: Promise<{ id: string }> }){
  const { id } = await props.params;
  return createSupabaseClient()
    .from('view_gigs')
    .select('calendar, title, date, time, venue, site, price, address, id, source, reviewed')
    .eq('id', +id)
    .eq('reviewed', true)
    .then(({ error, data }) => error ? { error: error.message } : data)
    .then(data => Response.json(data))
}