import { type NextRequest } from 'next/server'
import { supabase } from "@/lib/supabase"
import { notFound } from 'next/navigation'
import { Tables } from '@/types/supabase'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const legacyFields = searchParams.get('fields') || "id, title, shortTitle"
  const domain = searchParams.get('domain') || 'jazzin.amsterdam'

  const fields = (legacyFields
    .replace(/\bid\b/g, "calendar")
    .split(',')
    .map(x => x.trim() as keyof Tables<'metadata'>))

  const { error, data } = await supabase
    .from('metadata')
    .select(fields.join(','))
    .order('order')
    .eq('canonical', domain)
  if (error) notFound()

  const legacy = (entry: any) => {
    const { calendar: calendar, ...rest } = entry
    return { id: calendar, ...rest }
  }
  return Response.json(data.map(legacy))
}