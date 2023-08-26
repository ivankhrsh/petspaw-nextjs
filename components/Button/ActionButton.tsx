import { type ButtonType } from '@/types/button';
import styles from './Button.module.scss'
import classNames from 'classnames/bind';
import React, { type ReactNode, type FC } from 'react'

interface Props extends ButtonType {
  text?: string | ReactNode
  onClick: () => void | Promise<void>
}

const cn = classNames.bind(styles);

export const ActionButton: FC<Props> = ({ type, onClick, text }) => {
  const buttonClassNames = cn({
    pageLink: true,
    button: type === 'button',
    nav: type === 'nav',
    active: type === 'active'
  });

  return (
    <div
      onClick={onClick}
      className={cn(buttonClassNames)}
    >
      {text}
    </div>
  );
};
