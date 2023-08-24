'use client';

import classNames from 'classnames/bind';
import React, { type FC } from 'react'
import styles from './BurgerMenu.module.scss';
import { Button } from '../Button/Button';
import { ActionButton } from '../ActionButton/ActionButton';

const cn = classNames.bind(styles);

interface Props {
  onClick: () => void
}

export const BurgerMenu: FC<Props> = ({ onClick }) => {
  return (
    <div className={cn('burger')}>
      <ActionButton onClick={onClick} btnType="nav"/>
      <div className={cn('burgerList')}>
        <Button link="/voting" text="Voting" btnType="nav"/>
        <Button link="/breeds" text="Breeds" btnType="nav"/>
        <Button link="/gallery" text="Gallery" btnType="nav"/>
      </div>
    </div>
  );
}
