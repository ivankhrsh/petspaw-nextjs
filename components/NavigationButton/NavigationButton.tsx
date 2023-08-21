import styles from './NavigationButton.module.scss'
import classNames from 'classnames/bind';
import Link from "next/link"
import { FC } from "react"

interface Props {
  link: string,
  text: string,
}

const cn = classNames.bind(styles);

export const NavigationButton: FC<Props> = ({link, text}) => {
  return (
    <Link href={`${link}`} className={cn('pageLink')}>{text}</Link>
  )
}