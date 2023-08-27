'use client'

import { BackArrow } from '@/public/svg';
import styles from './Button.module.scss'
import classNames from 'classnames/bind';
import Link from 'next/link'
import React, { type FC, type ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation';
import { type ButtonType } from '@/types/button';

interface Props extends ButtonType {
  link: string
  text?: string | ReactNode
  backBtn?: boolean
}

const cn = classNames.bind(styles);

export const Button: FC<Props> = ({ link, text, type, backBtn }) => {
  const router = useRouter();
  const pathname = usePathname();

  const buttonClassNames = cn({
    pageLink: true,
    button: type === 'button',
    nav: type === 'nav',
    active: type === 'active' || pathname === link,
    search: type === 'search'
  });

  if (backBtn) {
    return (
        <div
          className={cn(buttonClassNames)}
          onClick={() => { router.back(); }}
        >
          <BackArrow/>
        </div>
    )
  }

  return (
    <Link href={`${link}`} className={cn(buttonClassNames)}>
      {text}
    </Link>
  );
};
