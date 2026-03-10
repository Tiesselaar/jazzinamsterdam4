"use client"
import { Tables } from '@/types/supabase'
import styles from './today.module.css'
import React, { useState, useEffect, useRef } from 'react'
import { Roboto } from 'next/font/google'
import { Cutive_Mono, Courier_Prime } from 'next/font/google'

const mono = Cutive_Mono({
  subsets: ['latin'],
  weight: ["400"]
})

const courier = Courier_Prime({
  subsets: ['latin'],
  weight: ["400"]
})


const roboto = Roboto({
  subsets: ['latin'],
  weight: ["300", "500"]
})

function getIndices(length: number) {
  return new Array(length).fill(undefined).map((_: any, index: number) => index)
}

function sum(numbers: number[]) {
  return numbers.reduce((a, b) => a + b, 0)
}

function makeRow(gig: Tables<'view_gigs'>) {
  return (
    [
      <tr key={gig.id + " time"}>
        <td className={styles.gigHead}>
          {gig.time.slice(0, 5)}
          {" "}
          <strong className={courier.className}>
            {gig.venue}
          </strong>
        </td>
      </tr>,
      <tr key={gig.id + " title"}>
        <td colSpan={2}>
          {gig.title}
        </td>
      </tr >
    ]
  )
}

const tableBody = function (agenda: Tables<'view_gigs'>[], story: boolean) {
  const table_body = []
  for (const gig of agenda) {
    table_body.push(
      makeRow(gig)
    )
  }
  return table_body;
}

export default function Table(
  { title, agenda, date, story }: { title: string, agenda: Tables<'view_gigs'>[], date: string, story: boolean }
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [agendaSplit, setSplit] = useState([agenda.length]);
  useEffect(() => {
    document.fonts.ready.then(() => {
      if (containerRef.current) {
        const sections = containerRef.current.querySelectorAll('section')
        const indices = getIndices(sections.length)
        indices.map(i => {
          if (sections[i].offsetWidth < sections[i].offsetHeight * (story ? 9 / 16 : 4 / 5)) {
            if (i == sections.length - 1) {
              setSplit(agendaSplit => [...agendaSplit.slice(0, i), agendaSplit[i] - 1, 1])
            } else {
              setSplit(agendaSplit => [...agendaSplit.slice(0, i), agendaSplit[i] - 1, agendaSplit[i + 1] + 1, ...agendaSplit.slice(i + 2)])
            }
          }
        })
        if (agendaSplit.length > 1) {
          setSplit(agendaSplit => {
            if (agendaSplit[agendaSplit.length-1] < 3 && agendaSplit[agendaSplit.length - 2] > 5) {
              return [...agendaSplit.slice(0, -2), agendaSplit[agendaSplit.length - 2] - 1, agendaSplit[agendaSplit.length - 1] + 1]
            }
            else
              return agendaSplit
          })
        }
      } 
    })
  })

  return <div id='container' ref={containerRef}>
    {getIndices(agendaSplit.length).map(index =>
      <section
        key={index}
        className={[
          styles.page,
          mono.className,
          story ? styles.story : styles.post
        ].join(" ")}
      >
        <h1>
          {title}
        </h1>
        {story || <h3 className={styles.date}>
          {(new Date(date)).toLocaleDateString("nl-NL", { dateStyle: 'full' }).slice(0, -5)} - {index + 1}/{agendaSplit.length}
        </h3>}
        <table className={styles.table}>
          <tbody>
            {tableBody(
              agenda.slice(sum(agendaSplit.slice(0, index)), sum(agendaSplit.slice(0, index + 1))),
              story)}
          </tbody>
        </table>
      </section>)}
  </div>
}