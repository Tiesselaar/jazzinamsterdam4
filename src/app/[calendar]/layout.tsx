import type { Metadata } from 'next'

// import { SpeedInsights } from '@vercel/speed-insights/next'
// import { Analytics } from '@vercel/analytics/react';

import '@/app/globals.css'

import Menu from '@/components/header/Menu'
import ModButton from '@/components/header/ModButton'
import metaPages from '@/components/header/metadata'
import TopMenu from '@/components/header/TopMenu';
import Header from '@/components/header/Header';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { canonical, metaData } from '@/lib/supabase'
import { getHostName } from '@/lib/paths'

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
  const host = getHostName(await headers())

  if (metaData.get(calendar)?.canonical !== canonical.get(host)) notFound()

  return (
    <>
      <html lang="en">
        <body>
          <ModButton />
          <TopMenu />
          <Header calendar={calendar} />
          <Menu host={host} calendar={calendar} />
          {/* {children} */}
          {/* <Analytics /> */}
          {/* <SpeedInsights /> */}
        </body>
      </html >
    </>
  )
}