import { Tables } from "@/types/supabase"
import { dateString, dateTimeString, mapsLink } from "./tools"

import rowStyles from './GigRows.module.css'
import Link from "next/link"
import { editLink, modLink, promoLink } from "@/lib/paths"
import { useParams } from "next/navigation"

const Time = ({ gig }: { gig: Tables<'view_gigs'> }) =>
  <time itemProp='startDate' dateTime={dateTimeString(gig)}>
    {gig.time.slice(0, 5)}
  </time>

const Price = ({ gig }: { gig: Tables<'view_gigs'> }) =>
  <>
    {
      gig.price
        .replaceAll('€', '')
        .replaceAll('EUR', '')
        .trim()
    }
  </>

export function MainGigRow({ gig }: { gig: Tables<'view_gigs'> }) {
  const downloadICS = () => window.location.href = `/ics/${gig.id}`
  return (
    <tr className={rowStyles.default} itemScope itemType="https://schema.org/Event">
      <td className={rowStyles.time}>
        <button className={rowStyles.linklike} onClick={downloadICS}>
          <Time gig={gig} />
        </button>
      </td>
      <td className={rowStyles.title}>
        <a itemProp='url' href={gig.site}>
          <span itemProp='name'>
            {gig.title}
          </span>
        </a>
      </td>
      <td className={rowStyles.venue} itemProp="location" itemScope itemType="https://schema.org/Place">
        <a href={mapsLink(gig)}>
          <span itemProp='name'>
            {gig.venue}
          </span>
        </a>
      </td>
      <td className={rowStyles.price}>
        <Price gig={gig} />
      </td>
    </tr>
  )
}

export function ArchiveRow({ gig }: { gig: Tables<'view_gigs'> }) {
  return (
    <tr className={rowStyles.default}>
      <td className={rowStyles.time}>
        <Time gig={gig} />
      </td>
      <td className={rowStyles.title}>{gig.title}</td>
      <td className={rowStyles.venue}>{gig.venue}</td>
      <td className={rowStyles.price}>
        <Price gig={gig} />
      </td>
    </tr >
  )
}

export function ModRow({ gig }: { gig: Tables<'view_gigs'> }) {
  return (
    <tr className={rowStyles.default}>
      <td className={rowStyles.time}>
        <Time gig={gig} />
      </td>
      <td className={rowStyles.title}>
        <Link href={editLink(gig.calendar, gig.source, gig.id)}>
          {gig.title}
        </Link>
      </td>
      <td className={rowStyles.venue}>
        <Link href={modLink(gig.calendar, gig.source)}>
          {gig.venue}
        </Link>
      </td>
      <td className={rowStyles.price}>
        <Price gig={gig} />
      </td>
    </tr >
  )
}

export function PromoPickerRow({ gig }: { gig: Tables<'view_gigs'> }) {
  return (
    <tr className={rowStyles.default}>
      <td className={rowStyles.time}>
        <Time gig={gig} />
      </td>
      <td className={rowStyles.title}>{gig.title}</td>
      <td className={rowStyles.venue}>{gig.venue}</td>
      <td className={rowStyles.price}>
        <Link href={promoLink(gig.calendar, gig.id)}>
          select
        </Link>
      </td>
    </tr >
  )
}

export function PromoRow({ gig }: { gig: Tables<'view_gigs'> }) {
  const currentYear = (new Date).getFullYear().toString()
  // const localDate = (new Date(gig.date)).toLocaleDateString("en-GB", { dateStyle: 'full' })
  // const formattedDate = localDate.replace(',', '').replace(currentYear, '').trim()

  return (
    <tr className={rowStyles.promo}>
      <td>
        <a href={gig.site}>
          <strong>{gig.venue}</strong>{" - "}{gig.title}
          <br />
          {dateString(gig.date)}, <Time gig={gig} />
        </a>
      </td>
    </tr >
  )
}

export function SubmitRow({ gig }: { gig: Tables<'view_gigs'> }) {
  const id = Number(useParams().id)

  const formattedDate = gig.date.split('-')[2] + '/' + gig.date.split('-')[1]
  const formattedDay = new Date(gig.date).toUTCString().slice(0, 2)
  const link = editLink(gig.calendar, gig.source, gig.id)

  const selected = gig.id === id
  const pending = !gig.reviewed

  const linkStyle = [
    selected ? rowStyles.selected : undefined,
    pending ? rowStyles.pending : undefined,
  ].join(' ')

  return (
    <tr className={rowStyles.submit}>
      <td className={rowStyles.day}>{formattedDay}</td>
      <td className={rowStyles.date}>{formattedDate}</td>
      <td className={rowStyles.title}>
        {!gig.reviewed && "(pending) "}
        <Link
          href={link}
          scroll={false}
          replace
          className={linkStyle}
        >
          {gig.title}
        </Link>
      </td>
      <td className={rowStyles.venue}>{gig.venue}</td>
    </tr>
  )
}
