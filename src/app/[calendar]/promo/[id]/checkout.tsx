"use client"

import { useState } from 'react'
import styles from './checkout.module.css'
import { BASE_PRICE, MAX_DAYS } from '../BASEPRICE'
import { Tables } from '@/types/supabase'


function range(n: number) {
  return Array.from({ length: n }, (_, i) => i)
}

export default function Checkout({
  gig,
  max_days
}: {
  gig: Tables<'view_gigs'>,
  max_days: number
}) {
  const [days, setDays] = useState(Math.max(Math.min(7, max_days - 1), 1))
  const totalPrice = (BASE_PRICE * days).toFixed(2)
  return (
    <form action="./mollie" method="POST" className={styles.form}>
      <input type="hidden" name="calendar" value={gig.calendar} />
      <input type="hidden" name="id" value={gig.id} />
      <input type="hidden" name="title" value={gig.title} />
      <input type="hidden" name="venue" value={gig.venue} />
      <input type="hidden" name="date" value={gig.date} />
      <input type="hidden" name="days" value={days} />

      <p>
        Number of days:
        <select value={days} onChange={e => setDays(Number(e.target.value))}>
          {range(max_days).map(i =>
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          )}
        </select>
        {max_days < MAX_DAYS && days == max_days &&
          'The ad will disappear after 24:00h on day of the gig. Last day might not be complete.'}
        <br />
      </p>
      <p>
        <button type="submit" className={styles.button}>
          Checkout: €{totalPrice.replace('.00', '')}
        </button>
      </p>
    </form>
  )
}