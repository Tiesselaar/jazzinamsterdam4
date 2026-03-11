import type { Metadata } from 'next'

// import { SpeedInsights } from '@vercel/speed-insights/next'
// import { Analytics } from '@vercel/analytics/react';

import '@/app/globals.css'

import { metaData } from '@/lib/supabase';

import Menu from '@/components/header/Menu'
import ModButton from '@/components/header/ModButton'
import metaPages from '@/components/header/metadata'
import TopMenu from '@/components/header/TopMenu';
import Header from '@/components/header/Header';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';

export async function generateMetadata(
  { params }: { params: Promise<{ calendar: string }> }
): Promise<Metadata> {
  const { calendar } = await params
  const metaPage = await metaPages(calendar)
  return metaPage
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: Promise<{ calendar: string }>
}) {

  const calendar = (await params).calendar

  const h = await headers()
  const fullhost = h.get("x-forwarded-host") ?? h.get("host")
  const host = new URL(`http://${fullhost}`).hostname

  // if (metaData.get(calendar)?.host !== host) notFound()

  return (
    <>
      <html lang="en">
        <body>
          <ModButton />
          <TopMenu />
          <Header calendar={calendar} />
          <Menu host={host} calendar={calendar} />
          {children}
          {/* <Analytics /> */}
          {/* <SpeedInsights /> */}
        </body>
      </html >
    </>
  )
}