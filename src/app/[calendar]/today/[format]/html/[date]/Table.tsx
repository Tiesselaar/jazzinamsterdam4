"use client"
import { Tables } from '@/types/supabase'
import styles from './today.module.css'
import React, { useState, useEffect, useRef } from 'react'
import { Cutive_Mono, Courier_Prime } from 'next/font/google'

const mono = Cutive_Mono({
  subsets: ['latin'],
  weight: ["400"]
})

const courier = Courier_Prime({
  subsets: ['latin'],
  weight: ["400"]
})


function storyRow(gig: Tables<'view_gigs'>, time: string | undefined, fontSize: number) {
  return (
    [
      <tr key={gig.id + " time"}>
        <td style={{paddingTop: fontSize / 2}}>
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

function postRow(gig: Tables<'view_gigs'>, time: string | undefined, fontSize: number) {
  return (
    <tr key={gig.id}>
      <td className={styles.timeTag} style={{paddingTop: fontSize / 2}}>
        {time != gig.time && gig.time.slice(0, 5)}
      </td>
      <td style={{paddingTop: fontSize / 2}}>
        <strong className={courier.className}>
          {gig.venue}
        </strong>
        {" "}
        {gig.title}
      </td>
    </tr>
  )
}


const tableBody = function (agenda: Tables<'view_gigs'>[], story: boolean, fontSize: number) {
  const table_body = []
  var time
  for (const gig of agenda) {
    if (story) {
      table_body.push(
        storyRow(gig, time, fontSize)
      )
    } else {
      table_body.push(
        postRow(gig, time, fontSize)
      )
    }
    time = gig.time
  }
  return table_body;
}


export default function Table(
  { title, agenda, date, story }: { title: string, agenda: Tables<'view_gigs'>[], date: string, story: boolean }
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [fontSize, setFontSize] = useState(story ? 18 : 16);
  useEffect(() => {
    document.fonts.ready.then(() => {
      if (containerRef.current) {
        if (containerRef.current.offsetWidth < containerRef.current.offsetHeight * (story ? 9 / 16 : 4 / 5)) {
          setFontSize(fontSize - 1)
          console.log(fontSize)
        }
      }
    })
  })

  return (
    <>
      <style jsx global>{`
        body {
          background-color: #eeeeee;
        }
      `}</style>
      <div
        id='container'
        ref={containerRef}
        className={[
          styles.container,
          mono.className,
          story ? styles.story : styles.post
        ].join(" ")}
        style={{
          fontSize: String(fontSize) + 'px',
        }}>
        <h1>
          {title}
        </h1>
        <h2 className={styles.date}>
          {(new Date(date)).toLocaleDateString("nl-NL", { dateStyle: 'full' }).slice(0, -5)}
        </h2>
        <table className={styles.table}>
          <tbody>
            {tableBody(agenda, story, fontSize)}
          </tbody>
        </table>
      </div>
    </>
  )
}