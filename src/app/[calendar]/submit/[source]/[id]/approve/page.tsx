"use client"

import { login } from "@/components/submitForm/Login";
import { supabase } from "@/lib/supabase"
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Approve() {
  const params = useParams()
  const calendar = params.calendar
  const source = params.source
  const id = Number(params.id)

  const router = useRouter()

  useEffect(() => {
    async function approve() {
      await login()
      await supabase
        .from('gigs')
        .update({ reviewed: true })
        .match({ calendar, source, id })
    }
    approve()
    router.refresh()
  }, [])

  return null
}
