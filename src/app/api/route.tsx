import { type NextRequest } from 'next/server'
import { AgendaQuery, getAgenda, RequestOptions } from "@/lib/supabase"

const instruction = {
  usage: "https://jazzin.amsterdam/api?calendar=jazzAmsterdam&page=1&archive=false",
  contact: {
    email: "jazzinmokum@gmail.com",
    phone: "+31655547262"
  },
  message: "Let me know if you are actually using this!"
}


export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const calendar = searchParams.get('calendar') || undefined
  const source = searchParams.get('source') || undefined
  const scope = searchParams.get('scope') || undefined
  const archive = scope === 'all' ? undefined : scope === 'archive'
  const offset = Number(searchParams.get('offset')) || 0
  const limit = Number(searchParams.get('limit')) || undefined

  const query: AgendaQuery = {
    calendar,
    source,
    archive
  }

  const options: Partial<RequestOptions> = {
    requestType: 'read-only',
    offset: offset,
    limit: limit
  }

  return Response.json(await getAgenda({ query, options }))
}