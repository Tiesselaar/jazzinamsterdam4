import { useState } from 'react'
import { getAgendaNoCache } from '@/lib/supabase'
import styles from './LoadMore.module.css'
import Agenda, { AgendaProps } from './Agenda'


// SOME CHATGPT SHIT
import { useEffect, useRef } from "react"

export function useInfiniteScroll(callback: () => void) {
  const ref = useRef<HTMLTableRowElement | null>(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        observer.unobserve(entries[0].target)
        callback()
      }
    },
      {
        rootMargin: "0px 0px 3000px 0px"
      }

    )
    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [callback])

  return ref
}

function InfiniteFooter({ loadMore }: { loadMore: () => void }) {
  const ref = useInfiniteScroll(loadMore)

  return (
    <tr ref={ref}>
      <td colSpan={4} >
        loading...
      </td>
    </tr>
  )
}

// END UNCHECKED CHATGPT SHIT


export function Footer({ loadMore }: { loadMore: () => void }
) {
  return (
    <tr>
      <td colSpan={4} style={{ padding: 0 }}>
        <button className={styles.loadMore} onClick={loadMore}>
          load more
        </button>
      </td>
    </tr>
  )
}

export default function LoadMoreAgenda(agendaProps: AgendaProps) {
  const [agendaData, setAgendaData] = useState(agendaProps.agendaData)

  const LoadMoreHandler = async () => {
    const nextRequest = agendaData.nextRequest
    if (!nextRequest) return

    const next = await getAgendaNoCache(nextRequest)

    setAgendaData(prev => ({
      ...next,
      data: [...prev.data, ...next.data]
    }))
  }

  return (
    <Agenda
      {...agendaProps}
      agendaData={agendaData}
      Footer={
        agendaData.nextRequest
          ? (() => <InfiniteFooter loadMore={LoadMoreHandler} />)
          : undefined
      }
    />
  )
}