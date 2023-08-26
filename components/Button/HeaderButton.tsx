'use client'

import { BackArrow } from '@/public/svg';
import styles from './Button.module.scss'
import classNames from 'classnames/bind';
import Link from 'next/link'
import React, { type FC, type ReactNode, useState } from 'react'
import { type ButtonType } from '@/types/button';

interface Props extends ButtonType {
  link: string
  text?: string | ReactNode
  backBtn?: boolean
}

const cn = classNames.bind(styles);

export const HeaderButton: FC<Props> = ({ link, text, type, backBtn }) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonClassNames = cn({
    pageLink: true,
    button: type === 'button',
    nav: type === 'nav',
    active: type === 'active'
  });

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      {backBtn
        ? (
        <Link
          href={`${link}`}
          className={cn(buttonClassNames)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <BackArrow fill={isHovered ? '#FFF' : '#FF868E'} />
        </Link>
          )
        : (
        <Link href={`${link}`} className={cn(buttonClassNames)}>
          {text}
        </Link>
          )}
    </>
  );
};
