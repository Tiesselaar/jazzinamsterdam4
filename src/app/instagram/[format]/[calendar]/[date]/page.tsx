import Table from "./Table";
import { AgendaQuery, getAgendaNoCache, metaData } from "@/lib/supabase";
import { notFound } from "next/navigation";
import '@/app/globals.css'


export default async function Post(props: { params: Promise<{ calendar: string, format: string, date: string }> }) {
  const params = await props.params;
  const { calendar, format, date } = params;

  if (!['post', 'story'].includes(format))
    notFound()

  const query: AgendaQuery = {
    calendar: calendar,
    display_date: date
  }
  const agenda = (await getAgendaNoCache({ query })).data

  const title = metaData.get(calendar)?.title
  if (title == undefined) notFound()

  return <Table title={title} agenda={agenda} date={date} story={format == "story"} />
}