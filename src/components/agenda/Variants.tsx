"use client"

import { AgendaData } from "@/lib/supabase";
import Agenda from "./Agenda";
import { DarkDateRow, LightDateRow } from "./DateRows";
import { MainGigRow, ArchiveRow, SubmitRow, ModRow, PromoPickerRow, PromoRow } from "./GigRows";
import LoadMoreAgenda from "./LoadMore";

export function MainAgenda({ agendaData }: { agendaData: AgendaData }) {
  return (
    <LoadMoreAgenda
      agendaData={agendaData}
      GigRow={MainGigRow}
    />
  )
}

export function ArchiveAgenda({ agendaData }: { agendaData: AgendaData }) {
  return (
    <LoadMoreAgenda
      agendaData={agendaData}
      DateRow={DarkDateRow}
      GigRow={ArchiveRow}
    />
  )
}

export function Submissions({ agendaData }: { agendaData: AgendaData }) {
  return (
    <Agenda
      agendaData={agendaData}
      caption={agendaData.data.length ? 'Submissions' : undefined}
      DateRow={null}
      GigRow={SubmitRow}
      variant={'submit'}
    />
  )
}

export function ModAgenda({ agendaData }: { agendaData: AgendaData }) {
  return (
    <LoadMoreAgenda
      agendaData={agendaData}
      DateRow={DarkDateRow}
      GigRow={ModRow}
    />
  )
}

export function PromoPickerAgenda({ agendaData }: { agendaData: AgendaData }) {
  return (
    <LoadMoreAgenda
      agendaData={agendaData}
      DateRow={LightDateRow}
      GigRow={PromoPickerRow}
      variant={'dashed'}
    />
  )
}

export function PromoAgenda({ agendaData }: { agendaData: AgendaData }) {
  return (
    <Agenda
      agendaData={agendaData}
      DateRow={null}
      GigRow={PromoRow}
      variant={'promo'}
    />
  )
}