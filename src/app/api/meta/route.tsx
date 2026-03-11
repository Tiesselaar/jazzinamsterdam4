import { type NextRequest } from 'next/server'
import { createSupabaseClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const fields = searchParams.get('fields') || "id, title, shortTitle"
  

  return createSupabaseClient()
    .from('metadata')
    .select(fields)
    .order('order')
    .then(({ error, data }) => error ? { error: error.message } : data)
    .then(data => Response.json(data))
}