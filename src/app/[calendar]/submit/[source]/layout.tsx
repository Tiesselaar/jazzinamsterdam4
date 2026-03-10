"use client"

import React, { useState } from 'react';
import styles from './layout.module.css'

import { AgendaData, type AgendaQuery, getAgendaNoCache } from '@/lib/supabase'
import HotKeys from '@/components/submitForm/HotKeys';
import { editLink } from "@/lib/paths";
import Login from '@/components/submitForm/Login';
import SubmitForm from '@/components/submitForm/SubmitForm';
import { Submissions } from '@/components/agenda/Variants';
import { useParams, useRouter } from 'next/navigation';

export default function SubmitPage({ children }: { children: React.ReactNode, }) {
  const { calendar, source, id }: { calendar: string, source: string, id?: string } = useParams()

  const query: AgendaQuery = { calendar, source }
  const [agendaData, setAgendaData] = useState<AgendaData>({request: {query}, data: [], error: null})

  const router = useRouter()

  const refresh = () => {
    getAgendaNoCache(
      {
        query,
        options: { requestType: "authorized" }
      }
    ).then(newAgendaData => {
      setAgendaData(newAgendaData)

      if (id && !newAgendaData.data.some(gig => gig.id === Number(id)))
        router.replace(editLink(calendar, source))
    })
  }

  return (
    <>
      <main className={styles.mainContainer}>
        <h3>Submission form</h3>
        <Login refresh={refresh} calendar={calendar} source={source} />
        <Submissions agendaData={agendaData} />
        <SubmitForm calendar={calendar} source={source} submissions={agendaData.data} refresh={refresh} />
        <HotKeys submissions={agendaData.data} />
        {children}
      </main>
    </>
  )
}