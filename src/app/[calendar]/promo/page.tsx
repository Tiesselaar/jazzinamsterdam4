import { AgendaQuery, createSupabaseClient, getAgenda } from '@/lib/supabase'
import { PromoPickerAgenda } from '@/components/agenda/Variants';

export const revalidate = 60

export default async function Home(props: {
  params: Promise<{ calendar: string }>
}) {
  const { calendar } = await props.params;

  const query: AgendaQuery = {
    calendar: calendar,
    archive: false
  }

  const agendaData = await getAgenda({query})

  return <PromoPickerAgenda agendaData={agendaData} />
}