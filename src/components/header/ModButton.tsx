"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useParams } from "next/navigation"
import styles from "./ModButton.module.css"
import { useEffect, useState } from "react"
import { modLink, venueLink } from "@/lib/paths"
import { isModerator } from "../submitForm/Login"

export default function ModButton() {
  const [visible, setVisible] = useState(true)
  const { calendar, source }: { calendar: string, source: string } = useParams()
  const pathname = usePathname()
  const page = pathname.split('/')[2]

  const newPath = (page == 'mod')
    ? venueLink(calendar, source)
    : modLink(calendar, source)

  const [mod, setMod] = useState(false)
  useEffect(() => { isModerator().then(setMod).then(() => console.log(mod)) }, [])

  return mod && (
    <Link
      href={newPath}
      onContextMenu={(e) => { e.preventDefault(); setVisible(false) }}
      style={{ display: visible ? 'block' : 'none' }}
      className={styles.modbutton}
      scroll={false}
      prefetch={false}>
      {newPath}
    </Link>
  )
}