"use client"

import { AgendaData } from "@/lib/supabase";
import { Tables } from "@/types/supabase";

import tableStyle from './Agenda.module.css'

import { MainDateRow } from "./DateRows";
import { MainGigRow } from "./GigRows";

type Gig = Tables<'view_gigs'>
type DayGroups = [string, Gig[]][]

type DateRowComponent = React.ComponentType<{ date: string }>
type GigRowComponent = React.ComponentType<{ gig: Gig }>

type Variants = 'default' | 'dashed' | 'submit' | 'promo'

const styles: Record<Variants, string> = {
  'default': tableStyle.default,
  'dashed': `${tableStyle.default} ${tableStyle.dashed}`,
  'submit': tableStyle.submit,
  'promo': tableStyle.promo
}

export type AgendaProps = {
  agendaData: AgendaData
  caption?: string
  DateRow?: DateRowComponent | null
  GigRow?: GigRowComponent
  Footer?: React.ComponentType
  variant?: Variants
}

// function groupGigs(rows: Gig[]) {
//   const days = Object.groupBy(rows, gig => gig.display_date)
//   return Object.entries(days) as DayGroups
// }


function groupGigs(rows: Gig[]): DayGroups {
  const days = rows.reduce<Record<string, Gig[]>>((groups, gig) => {
    const date = gig.display_date

    if (!groups[date]) {
      groups[date] = []
    }

    groups[date].push(gig)

    return groups
  }, {})

  return Object.entries(days) as DayGroups
}


export default function Agenda({
  agendaData,
  caption = undefined,
  DateRow = MainDateRow,
  GigRow = MainGigRow,
  variant = "default",
  Footer = undefined
}: AgendaProps) {

  const groups = DateRow
    ? groupGigs(agendaData.data)
    : [["all gigs", agendaData.data]] as DayGroups

  return <>
    <table className={styles[variant]}>
      {caption && <caption><b>{caption}</b></caption>}
      {
        groups.map(([date, gigs]) => (
          <tbody key={date}>
            {DateRow && <DateRow date={date} />}
            {gigs.map(gig => <GigRow key={gig.id} gig={gig} />)}
          </tbody>
        ))
      }
      {Footer && <tfoot><Footer /></tfoot>}
    </table>
  </>
}