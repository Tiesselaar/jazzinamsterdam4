import { createClient, PostgrestError } from '@supabase/supabase-js'
import { Database, Tables } from '@/types/supabase'
import { unstable_cache } from 'next/cache'

// === CREATE CLIENT ===

export const createSupabaseClient = () => createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
)

export const supabase = createSupabaseClient()

// SOME LOGGING

type logHook = { name: string, end: number }

export function log(hook: string | logHook): logHook {
  const end = performance.now()
  if (typeof (hook) === "string")
    return { name: hook, end }

  const start = hook.end

  const duration = (end - start).toFixed(0).padStart(5)
  const startString = (start).toFixed(0).slice(-5)
  const banner = `=== GOT ${hook.name.padEnd(8).toUpperCase()} ===`
  console.log(`${banner}  ${duration} ms  start: ${startString} ms`)
  return { ...hook, end }
}

// === GET AGENDA METADATA ===

async function getAllMetadata() {
  const logHook = log('metadata')
  let { data, error } = await supabase
    .from('metadata')
    .select()
    .order('order')
  log(logHook)
  if (error) throw error
  return data || []
}

export const metaDataList = await getAllMetadata()
export const metaData = new Map(metaDataList.map(m => [m.calendar, m]))

async function hostLookup() {
  const logHook = log('hosts')
  let { data, error } = await supabase
    .from('hosts')
    .select()
  log(logHook)
  if (error) throw error
  return data || []
}

export const canonical = new Map((await hostLookup()).map(m => [m.host, m.canonical]))


// === GET AGENDA DATA ===

export const PAGINATION = 200
export const MAX_LINES = 20000

export type AgendaQuery = Partial<Tables<'view_gigs'>>

export type RequestOptions = {
  requestType: "read-only" | "authorized"
  offset: number
  limit: number
  lastRow?: number
}

const defaultRequestOptions: RequestOptions = {
  requestType: "read-only",
  offset: 0,
  limit: PAGINATION,
  lastRow: undefined
}

const normaliseRequestOptions = (
  opts?: Partial<RequestOptions>
): RequestOptions => ({
  ...defaultRequestOptions,
  ...opts
})

export type AgendaRequest = {
  query: AgendaQuery
  options?: Partial<RequestOptions>
}

export type AgendaData = {
  request: AgendaRequest
  data: Tables<'view_gigs'>[]
  error?: PostgrestError | null
  nextRequest?: AgendaRequest
}

export const getAgendaNoCache = async (
  request: AgendaRequest
): Promise<AgendaData> => {

  const options = normaliseRequestOptions(request.options)
  const query = request.query

  const { requestType, offset, limit } = options

  let sbquery = supabase
  .from('view_gigs')
  .select()
  .match(query)
  .range(offset, offset + limit - 1)
  .order('order_key', { ascending: query.archive !== true })
  .setHeader('x-request-type', requestType)
  
  if (options.lastRow)
    sbquery = query.archive
      ? sbquery.lt('order_key', options.lastRow)
      : sbquery.gt('order_key', options.lastRow)

  const logHook = log('agenda')
  const { data, error } = await sbquery
  log(logHook)
  return {
    request: { query, options },
    data: data || [],
    error: error,
    nextRequest: data?.length
      ? {
        query,
        options: {
          ...options,
          lastRow: data[data.length - 1].order_key
        }
      }
      : undefined
  }
}

export const getAgenda = unstable_cache(getAgendaNoCache, [], { revalidate: 60 })