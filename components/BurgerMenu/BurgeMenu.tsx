'use client';

import classNames from 'classnames/bind';
import React, { type FC, useEffect, useState } from 'react'
import styles from './BurgerMenu.module.scss';
import { ActionButton } from '../Button/ActionButton';
import { Close } from '@/public/svg';
import NavigationContent from '../NavigationContent/NavigationContent';
import { usePathname } from 'next/navigation';

const cn = classNames.bind(styles);

interface Props {
  handleBurger: () => void
}

export const BurgerMenu: FC<Props> = ({ handleBurger }) => {
  const pathname = usePathname();
  const [prevPath, setPrevPath] = useState(pathname);
  useEffect(() => {
    if (prevPath !== pathname) {
      handleBurger()
    }
    setPrevPath(pathname);
  }, [pathname])

  return (
    <div className={cn('burger')}>
      <div className={cn('burgerList')}>
        <div className={cn('burgerButton')}>
          <ActionButton onClick={handleBurger} type='nav' text={<Close/>}/>
        </div>
        <div className={cn('navigation')}>
          <NavigationContent/>
        </div>
      </div>
    </div>
  );
}
