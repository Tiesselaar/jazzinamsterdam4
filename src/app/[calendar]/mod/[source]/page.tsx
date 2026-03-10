import { AgendaQuery, getAgenda } from '@/lib/supabase'
import { ModAgenda } from '@/components/agenda/Variants';

export const revalidate = 60

export default async function Home(props: {
  params: Promise<{ calendar: string, source: string }>
}) {
  const { calendar, source } = await props.params;

  const query: AgendaQuery = {
    calendar: calendar,
    source: source,
    archive: false
  }

  const agendaData = await getAgenda({query})

  return <ModAgenda agendaData={agendaData} />
}