import { Search } from '@/public/svg';
import styles from './Button.module.scss'
import classNames from 'classnames/bind';
import React, { type FC } from 'react'

interface Props {
  onClick: () => void | Promise<void>
  btnType?: 'button' | 'nav' | 'active' | 'search'
}

const cn = classNames.bind(styles);

export const SearchButton: FC<Props> = ({ btnType, onClick }) => {
  const buttonClassNames = cn({
    pageLink: true,
    button: btnType === 'button',
    nav: btnType === 'nav',
    active: btnType === 'active',
    search: btnType === 'search'
  });

  return (
    <div
      onClick={onClick}
      className={cn(buttonClassNames)}
    >
      <Search/>
    </div>
  );
};
