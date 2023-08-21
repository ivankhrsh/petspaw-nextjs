import './Button.scss'
import Link from "next/link"
import { FC } from "react"

interface Props {
  link: string,
  text: string,
}

export const Button: FC<Props> = ({link, text}) => {
  return (
    <Link href={`${link}`} className="pageLink">{text}</Link>
  )
}