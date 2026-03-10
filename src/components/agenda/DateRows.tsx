import { dateString } from "./tools";
import rowStyle from './DateRows.module.css'

export type DateRowProps = {
  date: string
  colSpan?: number
  variant?: "default" | "dark" | "light"
}

const styles = {
  default: rowStyle.default,
  dark: rowStyle.dark,
  light: rowStyle.light
}

export function MainDateRow({
  date,
  colSpan = 4,
  variant = "default"
}: DateRowProps) {
  return (
    <tr className={styles[variant]}>
      <th colSpan={colSpan}>
        {dateString(date)}
      </th>
    </tr>
  )
}

export const DarkDateRow = (props: DateRowProps) => MainDateRow({...props, variant:'dark'})
export const LightDateRow = (props: DateRowProps) => MainDateRow({...props, variant:'light'})

