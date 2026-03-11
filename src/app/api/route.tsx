import { type NextRequest } from 'next/server'
import { AgendaQuery, getAgenda, RequestOptions } from "@/lib/supabase"
import { Tables } from '@/types/supabase'

const instruction = {
  usage: "https://jazzin.amsterdam/api?calendar=jazzAmsterdam&page=1&archive=false",
  contact: {
    email: "jazzinmokum@gmail.com",
    phone: "+31655547262"
  },
  message: "Let me know if you are actually using this!"
}



const restrict = (gig: Tables<'view_gigs'>) => ({
  calendar: gig.calendar,
  title: gig.title,
  date: gig.date,
  time: gig.time,
  venue: gig.venue,
  site: gig.site,
  price: gig.price,
  address: gig.address,
  id: gig.id,
  source: gig.source,
  reviewed: gig.reviewed,
})

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const calendarString = searchParams.get('calendar') || undefined
  if (calendarString == undefined)
    return Response.json(instruction)

  const source = searchParams.get('source') || undefined
  const scope = searchParams.get('scope') || undefined
  const archive = scope === 'all' ? undefined : scope === 'archive'
  const offset = Number(searchParams.get('offset')) || 0
  const limit = Number(searchParams.get('limit')) || 600

  const calendars = calendarString.split(',').map(c => c.trim())

  const options: Partial<RequestOptions> = {
    ...(offset && { offset }),
    limit
  }

  const sbqueries = calendars.map(calendar => {
    const query: AgendaQuery = {
      calendar,
      ...(source !== undefined && { source }),
      ...(archive !== undefined && { archive }),
    }
    return getAgenda({ query, options })
  })

  const results = (await Promise.all(sbqueries)).flatMap(ad => ad.data)

  return Response.json(results.map(restrict))
}