'use client'

import React, { type FC } from 'react'
import classNames from 'classnames/bind';
import styles from './Header.module.scss'
import { Button } from '../Button/Button';
import { Burger, Dislike, Heart, Like } from '@/public/svg';
import { Search } from '../SearchInput/SearchInput';
import { ActionButton } from '../Button/ActionButton';

const cn = classNames.bind(styles);

interface Props {
  onClick: () => void
}

export const Header: FC<Props> = ({ onClick }) => {
  return (
    <div className={cn('headerContent')}>
      <div className={cn('headerBurger')}>
        <ActionButton onClick={onClick} text={<Burger/>} type='nav'/>
      </div>
        <div className={cn('headerLikes')}>
          <Button link="/likes" text={<Like/>} type='nav' />
        </div>
        <div className={cn('headerFav')}>
          <Button link="/favourites" text={<Heart/>} type='nav' />
        </div>
        <div className={cn('headerDislikes')}>
          <Button link="/dislikes" text={<Dislike/>} type='nav' />
      </div>
      <div className={cn('headerSearch')}>
        <Search/>
      </div>
    </div>
  )
}
