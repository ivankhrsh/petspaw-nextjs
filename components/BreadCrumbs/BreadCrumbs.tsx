'use client'

import React, { type FC } from 'react'
import classNames from 'classnames/bind'
import styles from './BreadCrumbs.module.scss'
import { Button } from '../Button'
import { usePathname } from 'next/navigation'

const cn = classNames.bind(styles)

export const BreadCrumbs: FC = () => {
  const pathname = usePathname().split('/').slice(1);

  return (
    <div className={cn('breadCrumbs')}>
      <div className={cn('backButton')}>
        <Button link='/' type='button' backBtn={true}/>
      </div>

      {pathname.map((path) => (
        <div
          key={path}
          className={cn('currentPageButton')}
        >
          <Button link='/' text= {path} type='active'/>
        </div>
      ))}
    </div>
  )
}
