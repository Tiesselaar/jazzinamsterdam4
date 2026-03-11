"use client"
import React, { SubmitEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { Form } from '@/lib/formdata'

import { SupabaseClient } from '@supabase/supabase-js'
import { Tables } from '@/types/supabase'
import { supabase } from '@/lib/supabase'
import { tableToForm } from '@/lib/formdata'
import { editLink } from "@/lib/paths"

import styles from './SubmitForm.module.css'
import { isModerator } from './Login'

// === API ===

async function submitEvent(
  supabase: SupabaseClient,
  formData: Form,
  calendar: string,
  source: string,
  reviewed: boolean,
  id?: number,
) {
  const json = {
    ...formData,
    end_date: formData.date,
    reviewed,
    calendar,
    source,
  }
  const query = (id === undefined)
    ? supabase
      .from('gigs')
      .insert(json)
      .select()
      .single()
      .setHeader('x-request-type', 'authorized')
    : supabase
      .from('gigs')
      .update({ ...json, id: id })
      .match({ id })
      .select()
      .single()
      .setHeader('x-request-type', 'authorized')
  return query
}

async function deleteEvent(
  supabase: SupabaseClient,
  calendar: string,
  source: string,
  id: number,
) {
  const query = supabase
    .from('gigs')
    .delete()
    .match({ calendar, source, id })
    .select()
    .single()
    .setHeader('x-request-type', 'authorized')
  return await query
}

// === LOGGING ===

function formatData(gig: Tables<'gigs'>): string {
  const values = Object.values(tableToForm(gig))
  return values.join('<br/>\n')
}

async function sendReviewMail(data: Tables<'gigs'>) {
  if (data.reviewed) return
  const dataString = formatData(data)
  const editHref = 'https://jazzin.amsterdam' + editLink(data.calendar, data.source, data.id)
  const edit = `<a href=${editHref}>=== EDIT ===</a>`
  const approve = `<a href=${editHref}/approve>=== ACCEPT ===</a>`
  const emailBody = [dataString, edit, approve].join('<br/><br/>')

  await fetch('/mailjet', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      subject: data.title,
      body: emailBody,
    })
  })
}

// === THE FORM COMPONENT ===

export default function SubmitForm(
  {
    calendar,
    source,
    submissions,
    refresh,
  }: {
    calendar: string,
    source: string,
    submissions: Tables<'view_gigs'>[],
    refresh: () => void
  }
) {
  const idParam = useParams().id;
  const id: number | undefined = idParam ? Number(idParam) : undefined;

  const submission = submissions.find(gig => gig.id === id)
  const initialFormData = submission ? tableToForm(submission) : new Form

  const [form, setForm] = useState(initialFormData)
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const [mod, setMod] = useState(false)
  useEffect(() => { isModerator().then(setMod) }, [])

  // === FORM HANDLERS ===

  useEffect(() => {
    if (id) setForm(initialFormData)
    setButtonDisabled(false)
  }, [id])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(curr => ({ ...curr, [e.target.name]: e.target.value }))
    setButtonDisabled(false)
  }

  async function handleSubmit() {
    setButtonDisabled(true)
    const { error, data } = await submitEvent(supabase, form, calendar, source, mod, id)
    if (error) alert('Not authorized')
    if (data && !mod) sendReviewMail(data)
    refresh()
  }

  async function handleFormSubmit(e: SubmitEvent) {
    e.preventDefault()
    handleSubmit()
  }

  async function handleDelete() {
    if (id === undefined) return
    const { data } = await deleteEvent(supabase, calendar, source, id)
    if (!data) alert('Not authorized')
    refresh()
  }

  // === KEYBOARD DELETE SHORTCUT ===

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.code == 'Backspace') {
        e.preventDefault()
        handleDelete()
      }
    }
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [form, calendar, source, id]);


  // === THE ACTUAL TABLE ===

  const today = new Date().toISOString().slice(0, 10)

  return (
    <>
      <form
        id="myForm"
        className={styles.theForm}
        onSubmit={handleFormSubmit}
      >
        <div className={styles.formMenu}>
          <Link
            href={editLink(calendar, source)}
            scroll={false}
            replace
            style={!submission ? { fontWeight: "bold" } : undefined}
          >
            Create new event
          </Link>
          {" · "}
          <Link
            href={""}
            scroll={false}
            replace
            onClick={() => setForm(new Form)}
          >
            Clear form
          </Link>
        </div>

        <input
          name='title'
          type='text'
          onChange={handleChange}
          placeholder='Band, event, or concert series'
          value={form.title}
          required
        />
        <input
          name='date'
          type='date'
          min={today}
          onChange={handleChange}
          placeholder='Date'
          value={form.date}
          required
        />
        <input
          name='time'
          type='time'
          onChange={handleChange}
          placeholder='Time'
          value={form.time}
          required
        />

        <input
          name='venue'
          type='text'
          onChange={handleChange}
          placeholder='Venue'
          value={form.venue}
          required
        />

        <input
          name='price'
          type='number'
          step='any'
          min={0}
          onChange={handleChange}
          value={form.price}
          placeholder='Entrance fee'
          required
        />

        <input
          name='site'
          type='text'
          onChange={handleChange}
          value={form.site}
          placeholder='Website'
          onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Use full URL: https://... or http://...')}
          onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
          pattern="https?:\/\/(?:www\.)?[\-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9\(\)]{1,63}\b(?:[\-a-zA-Z0-9\(\)@:%_\+.~#?&\/=]*)$"
          title='Use full URL: https://... or http://...'
          required
        />

        <input
          name='address'
          type='text'
          onChange={handleChange}
          value={form.address}
          placeholder='Address'
          required
        />

        <input
          type="submit"
          name="submit"
          className={styles.button}
          disabled={buttonDisabled}
          value={submission ? "Submit changes" : "Submit new event"}
        />

        {submission &&
          <input
            type="button"
            name="delete"
            className={styles.button}
            value="Delete event"
            onClick={handleDelete}
          />
        }
      </form>
    </>
  )
}