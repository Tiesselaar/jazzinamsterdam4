import Agenda from '@/components/agenda'
import Link from 'next/link'
export const revalidate = 60

export default async function Home() {
  return (
    <>
      <nav>
        <Link href={'/cal/jazzAmsterdam'} style={{'fontWeight': 'bold'}}>Jazz</Link>
        {" · "}
        <Link href={'/cal/classicalAmsterdam'}>Classical music</Link>
      </nav>

      <nav>
        <Link href={'/cal/jazzAmsterdam/submit/submit'}>Submit a gig</Link>
        {" · "}
        <Link href={'/cal/jazzAmsterdam/archive'}>Archive</Link>
      </nav>
      <Agenda calendar={'jazzAmsterdam'} />
    </>
  )
}