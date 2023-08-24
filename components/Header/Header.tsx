'use client'

import React, { type FC } from 'react'
import classNames from 'classnames/bind';
import styles from './Header.module.scss'
import { Button } from '../Button/Button';
import { Burger, Dislike, Heart, Like } from '@/public/svg';
import { Search } from '../SearchInput/SearchInput';
import { ActionButton } from '../ActionButton/ActionButton';

const cn = classNames.bind(styles);

interface Props {
  onClick: () => void
}

export const Header: FC<Props> = ({ onClick }) => {
  return (
    <div className={cn('headerContent')}>
      <div className={cn('headerBurger')}>
        <ActionButton onClick={onClick} text={<Burger/>} btnType='nav'/>
      </div>
        <div className={cn('headerLikes')}>
          <Button link="/likes" text={<Like/>} btnType='nav' />
        </div>
        <div className={cn('headerFav')}>
          <Button link="/favourites" text={<Heart/>} btnType='nav' />
        </div>
        <div className={cn('headerDislikes')}>
          <Button link="/dislikes" text={<Dislike/>} btnType='nav' />
      </div>
      <div className={cn('headerSearch')}>
        <Search/>
      </div>
    </div>
  )
}
