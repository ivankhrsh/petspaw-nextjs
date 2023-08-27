import React, { type FC } from 'react'
import classNames from 'classnames/bind'
import styles from './BreadCrumbs.module.scss'
import { Button } from '../Button'
const cn = classNames.bind(styles)

interface Props {
  text: string
}

export const BreadCrumbs: FC<Props> = ({ text }) => {
  return (
    <div className={cn('breadCrumbs')}>
    <div className={cn('backButton')}>
      <Button link='/' type='button' backBtn={true}/>
    </div>

    <div className={cn('currentPageButton')}>
      <Button link='/' text={text} type='active'/>
    </div>
    </div>
  )
}
