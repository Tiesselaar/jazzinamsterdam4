import { metaData, supabase, getAgenda } from "@/lib/supabase";

import Checkout from "./checkout"

import { MAX_DAYS } from "../BASEPRICE";
import { PromoAgenda } from "@/components/agenda/Variants";
import { notFound } from "next/navigation";


export default async function Page(props: {
  params: Promise<{ calendar: string, id: string }>
}) {

  const params = await props.params
  const calendar = params.calendar
  const id = +params.id


  // const { data: gig } = await supabase.from('view_gigs').select().eq('id', +id).single()
  const agendaMetaData = metaData.get(calendar)
  const agendaData = await getAgenda({query: {id}})
  const [gig] = agendaData.data
  
  if (!gig) notFound()

  const { data: calendarMetaData } = await supabase.from('metadata').select().match({ calendar }).single()

  const max_days = Math.min(
    Math.ceil((new Date(gig.date).getTime() - new Date().getTime()) / 24 / 60 / 60 / 1000 + 1),
    MAX_DAYS
  )

  return <>
    <h3 style={{ marginTop: "30px" }}>
      Promote your event
    </h3>
    <p>
      You can use this form to place a small ad on top of the subcalendar <b>{calendarMetaData?.title ?? calendar}</b>.
    </p>
    <p>
      <i>Preview:</i>
    </p>
    <PromoAgenda agendaData={agendaData} />
    <br />
    <Checkout gig={gig} max_days={max_days} />
  </>
}