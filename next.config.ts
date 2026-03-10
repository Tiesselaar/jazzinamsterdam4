import { Tables } from '@/types/supabase'
import type { NextConfig } from 'next'
import { Rewrite } from 'next/dist/lib/load-custom-routes'

const calendarRewrite = (calendar: Tables<'view_hosts'>): Rewrite => ({
  source: `/${calendar.slug}/:path*`,
  has: [
    { type: 'host', value: calendar.host },
    // { type: 'host', value: 'localhost' }
  ],
  destination: `/${calendar.id}/:path*`,
})

const customPages = [
  '',
  'submit',
  'about',
  'thank-you'
]

const pageRewrite = (
  root: Tables<'view_hosts'>,
  page: string
  
): Rewrite => ({
  source: `/${page}`,
  has: [
    { type: 'host', value: root.host },
    // { type: 'host', value: 'localhost' }
  ],
  destination: `/${root.id}/${page}`,
})


const nextConfig: NextConfig = {
  async rewrites() {
    // const res = await fetch("https://jazzinamsterdam4.vercel.app/api/meta?fields=id,host,slug")
    // const calendars: Tables<'view_hosts'>[] = await res.json()
    const calendars: Tables<'view_hosts'>[] = []
    const hosts = Array.from(new Set(calendars.map(c => c.host)))
    const roots = hosts.map(host => calendars.find(c => c.host === host))

    const calendarRewrites: Rewrite[] = calendars.map(calendarRewrite)
    const rootRewrites = roots.flatMap(r => customPages.map(p => pageRewrite(r!, p)))

    return [
      ...calendarRewrites,
      ...rootRewrites,
      
      {
        source: '/:calendar/submit',
        destination: '/:calendar/submit/submit'
      },
    ]
  }
}

export default nextConfig