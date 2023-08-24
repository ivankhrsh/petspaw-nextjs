import styles from './ActionButton.module.scss'
import classNames from 'classnames/bind';
import React, { type ReactNode, type FC } from 'react'

interface Props {
  text?: string | ReactNode
  onClick: () => void
  btnType?: 'button' | 'nav' | 'active'
}

const cn = classNames.bind(styles);

export const ActionButton: FC<Props> = ({ btnType, onClick, text }) => {
  const buttonClassNames = cn({
    pageLink: true,
    button: btnType === 'button',
    nav: btnType === 'nav',
    active: btnType === 'active'
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
