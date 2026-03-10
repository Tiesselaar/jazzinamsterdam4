"use client"
import { Tables } from "@/types/supabase"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { editLink } from "@/lib/paths"


function nextSubmission(
  step: number,
  currentId: number | undefined,
  submissions: Tables<'view_gigs'>[]
) {
  const nextIndex = submissions.findIndex(x => x.id == currentId) + step
  if (nextIndex == -2) return submissions[submissions.length - 1]?.id
  return submissions[nextIndex]?.id
}

function goToSubmission(
  router: AppRouterInstance,
  calendar: string,
  source: string,
  currentId: number | undefined,
  submissions: Tables<'view_gigs'>[],
  step: number
) {
  const nextId = nextSubmission(step, currentId, submissions)
  router.replace(
    editLink(calendar, source, nextId),
    { scroll: false }
  )
}

export default function HotKeys(
  { submissions }: { submissions: Tables<'view_gigs'>[], }
) {
  const { calendar, source, id }: { calendar: string, source: string, id?: string } = useParams()

  const currentId: number | undefined = Number(id) || undefined
  const router = useRouter()

  function step(step: number) {
    goToSubmission(router, calendar, source, currentId, submissions, step)
  }

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.code == 'KeyN') step(1)
      if (e.ctrlKey && e.code == 'KeyP') step(-1)
    }
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [calendar, source, currentId, submissions]);

  return null
}