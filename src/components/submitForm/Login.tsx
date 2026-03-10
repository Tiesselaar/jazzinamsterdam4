'use client'

import styles from './SystemMessage.module.css'
import rowStyles from '../agenda/GigRows.module.css'
import { metaData, supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

// LOGOUT

const logout = async () => {
  await supabase.auth.signOut()
  const user = await supabase.auth.getUser()
  const userID = user.data.user?.id
  // this should just always return undefined
  return userID
}

export const login = async () => {
  let { data: { session } } = await supabase.auth.getSession()

  if (!session)
    ({ data: { session } } = await supabase.auth.signInAnonymously())

  return session?.user.id
}

export async function isModerator() {
  const { data } = await supabase.rpc("is_moderator")
  return data ?? false
}


// VERY CUTE BUTTON

function IOButton(
  {
    value,
    onClick,
  }: {
    value: string
    onClick: () => void
  }
) {
  return <>
    [<button
      className={rowStyles.linklike}
      onClick={onClick}
    >
      {value}
    </button>]
  </>
}

// INTERFACE

export default function Login(
  { refresh,
    calendar,
    source
  }: {
    refresh: () => void
    calendar: string,
    source: string,
  }) {
  
  const [userID, setUserID] = useState<string | undefined>("")

  const loginUpdate = () => { login().then(setUserID)}
  const logoutUpdate = () => { logout().then(setUserID) }

  useEffect(loginUpdate, [])
  useEffect(refresh, [userID])

  return <div className={styles.systemMessage}>
    <p>
      calendar: <strong>{metaData.get(calendar)?.title ?? calendar} // {source}</strong>
    <br/>
      {userID !== undefined && <>user: <strong>{userID}</strong></>}
    <br/>
      {userID !== undefined
        ? <IOButton value={'forget this device'} onClick={logoutUpdate} />
        : <IOButton value={'login to submit a gig'} onClick={loginUpdate} />
      }
    </p>
  </div>
}

