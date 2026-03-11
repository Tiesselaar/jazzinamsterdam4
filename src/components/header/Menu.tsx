"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import styles from './Menu.module.css'
import { canonical, metaDataList } from "@/lib/supabase"
import { calendarRoot, editLink } from "@/lib/paths"

export default function Menu({ host, calendar }: { host: string, calendar: string }) {
  const root = calendarRoot(calendar)
  const page = usePathname().split(('/'))[1]
  const subpage = usePathname().split(('/'))[2]

  const internalLinks = metaDataList.filter(cal => cal.canonical === canonical.get(host))

  return <>
    {(internalLinks.length > 1) && <nav className={styles.calendars}>
      {
        internalLinks.map(cal =>
          <span key={cal.calendar}>
            <Link
              href={'/' + cal.slug}
              style={cal.calendar == calendar ? { 'fontWeight': 'bold' } : {}}
              prefetch={false}
            >
              {cal.shortTitle.toLowerCase()}
            </Link>
          </span>
        )
      }
    </nav>}

    {page == 'about' || page == 'thank-you' ||
      <nav className={styles.calendars}>
        <Link
          href={editLink(calendar)}
          style={subpage == 'submit' ? { 'fontWeight': 'bold' } : {}}
          prefetch={false}
        >
          submit a gig
        </Link>
        <Link
          href={subpage == 'archive' ? root : root + '/archive'}
          style={subpage == 'archive' ? { 'fontWeight': 'bold' } : {}}
          prefetch={false}
        >
          archive
        </Link>
      </nav>}
  </>
}