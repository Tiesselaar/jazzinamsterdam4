import { AgendaQuery, getAgenda, getAgendaNoCache } from '@/lib/supabase'
import { ModAgenda } from '@/components/agenda/Variants';

export const revalidate = 60

export default async function Home(props: {
  params: Promise<{ calendar: string }>
}) {
  const { calendar } = await props.params;

  const query: AgendaQuery = {
    calendar: calendar,
    archive: false
  }

  const agendaData = await getAgendaNoCache({query})

  return <ModAgenda agendaData={agendaData} />
}