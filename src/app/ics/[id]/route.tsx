import { createEvent, EventAttributes } from 'ics';

import { Tables } from '@/types/supabase';
import { getAgenda } from '@/lib/supabase'

function dateArray(date: string): [number, number, number, number, number] {
  const dt = date.split(/[-T:]/).slice(0, 5).map(x => Number(x))
  return [dt[0], dt[1], dt[2], dt[3], dt[4]]
}

function gigEvent(gig: Tables<'view_gigs'>) {
  const event: EventAttributes = {
    start: dateArray(gig.date_time),
    startInputType: 'utc',
    duration: { hours: 2, minutes: 0 },
    title: gig.title,
    description: gig.site + "\nhttps://jazzin.amsterdam\n\n(ignore event end time)",
    location: gig.venue,
    status: 'CONFIRMED',
    organizer: { name: gig.calendar, email: "jazzinmokum@gmail.com" },
  };
  if (gig.address) {
    event['location'] += ', ' + gig.address;
  }
  return String(createEvent(event, (error, value) => value))
}

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const id = Number(params.id)
  const { data, error } = await getAgenda({ query: { id } })

  if (error || !data || data.length === 0) {
    return new Response("Not found", { status: 404 });
  }

  const icsData = gigEvent(data[0]);

  return new Response(icsData, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar',
      // Cache indefinitely at CDN / edge
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}