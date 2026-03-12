"use server"

import jinaLogo from '@/../public/jina.png'
import { venueLink } from '@/lib/paths'
import { metaData } from '@/lib/supabase'

import Image from "next/image"
import Link from "next/link"

export default async function Header(
  { calendar }: { calendar: string }
) {
  const meta = metaData.get(calendar)
  return (
    <h1 style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <Link href={venueLink(calendar)} prefetch={false} >
        <Image src={jinaLogo} height={28} width={28} alt='logo' priority />
        {
          meta?.title
        }
      </Link>
    </h1>
  )
}