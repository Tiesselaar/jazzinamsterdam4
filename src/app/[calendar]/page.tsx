import { AgendaQuery, getAgenda } from '@/lib/supabase'
import { MainAgenda } from '@/components/agenda/Variants'

export default async function Home(props: {
  params: Promise<{ calendar: string }>
}) {
  const { calendar } = await props.params

  const query: AgendaQuery = {
    calendar: calendar,
    archive: false
  }
  // const agendaData = await getAgenda({query})

  // return <MainAgenda agendaData={agendaData} />
}