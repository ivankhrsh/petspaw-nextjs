'use client';

import classNames from 'classnames/bind';
import React, { type FC } from 'react'
import styles from './BurgerMenu.module.scss';
import { ActionButton } from '../Button/ActionButton';
import { Close } from '@/public/svg';
import NavigationContent from '../NavigationContent/NavigationContent';

const cn = classNames.bind(styles);

interface Props {
  onClick: () => void
}

export const BurgerMenu: FC<Props> = ({ onClick }) => {
  return (
    <div className={cn('burger')}>
      <div className={cn('burgerList')}>
        <div className={cn('burgerButton')}>
          <ActionButton onClick={onClick} btnType='nav' text={<Close/>}/>
        </div>
        <div className={cn('navigation')}>
          <NavigationContent/>
        </div>
      </div>
    </div>
  );
}
