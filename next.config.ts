import type { NextConfig } from 'next'
import { Rewrite } from 'next/dist/lib/load-custom-routes'

type RewriteData = {
  host: string,
  slug: string,
  calendar: string,
  order: number
}

const calendarRewrite = (rewrite: RewriteData): Rewrite => ({
  source: `/${rewrite.slug}/:path*`,
  has: [{ type: 'host', value: rewrite.host }],
  destination: `/${rewrite.calendar}/:path*`,
})

const customPages = [
  '',
  'submit',
  'about',
  'thank-you'
]

const pageRewrite = (
  root: RewriteData,
  page: string

): Rewrite => ({
  source: `/${page}`,
  has: [{ type: 'host', value: root.host },],
  destination: `/${root.calendar}/${page}`,
})

const nextConfig: NextConfig = {
  async rewrites() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/redirects?select=*`,
      {
        method: "GET",
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_KEY!,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const calendars: RewriteData[] = await res.json()
    const roots = calendars.filter(c => c.order == 1)

    const calendarRewrites: Rewrite[] = calendars.map(calendarRewrite)
    const rootRewrites = roots.flatMap(r => customPages.map(p => pageRewrite(r!, p)))

    // console.log(JSON.stringify(calendarRewrites, (key, value) => (value), 3))

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