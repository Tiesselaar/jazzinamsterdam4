import { Tables } from "@/types/supabase";
import { DateTime } from "luxon";


export function dateTimeString(gig: Tables<'view_gigs'>): string {
  const date_time = `${gig.date}T${gig.time}`;
  return DateTime
    .fromISO(date_time, { zone: gig.time_zone })
    .toISO() as string
}

export function dateString(date: string): string {
  return DateTime
    .fromISO(date)
    .setLocale("en-GB")
    .toFormat("cccc d LLLL")
}

export function mapsLink(gig: Tables<'view_gigs'>) {
  const linkBase = 'https://www.google.com/maps/search/?api=1&query='
  const mapsQuery = encodeURIComponent(gig.venue + ', ' + (gig.address || ""))
  return linkBase + mapsQuery
}