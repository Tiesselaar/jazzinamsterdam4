import { metaData } from "./supabase"

export function calendarRoot(calendar: string) {
  const meta = metaData.get(calendar)
  return meta ? `/${meta.slug}` : `/${calendar}`
}

export function editLink(calendar: string, source?: string, id?: number) {
  const root = calendarRoot(calendar)
  if (id)
    return `${root}/submit/${source}/${id}`
  if (source)
    return `${root}/submit/${source}`
  else
    return `${root}/submit`
}

export function modLink(calendar: string, source?: string) {
  const root = calendarRoot(calendar)
  return `${root}/mod/${source ?? ''}`
}

export function venueLink(calendar: string, source?: string) {
  const root = calendarRoot(calendar)
  if (source)
    return `${root}/venue/${source}`
  else
    return `${root}`
}