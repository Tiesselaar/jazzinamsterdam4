import Link from "next/link";
import styles from './Menu.module.css'

export default function TopMenu() {
    return <>
        <nav className={`${styles.calendars} ${styles.topmenu}`}>
            <a href='https://instagram.com/jazzinamsterdam'>instagram</a>
            <a href='https://docs.google.com/forms/d/e/1FAIpQLSeI7WDFRL_d9NlAqCq4OFs-FBUVPVJ6ZbRoT3aN7K9ZdZkDdQ/viewform?usp=header'>
                mailing
            </a>
            <a href='https://play.google.com/store/apps/details?id=amsterdam.jazzin'>android</a>
            <a href='https://apps.apple.com/nl/app/jazz-in-amsterdam/id6747498509'>iOS</a>
            <Link href={'/about'}>about</Link>
            <a href={'https://www.mokumlivemusic.com/'}>book a band</a>
        </nav>
    </>
}