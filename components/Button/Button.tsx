'use client'

import { BackArrow } from '@/public/svg';
import styles from './Button.module.scss'
import classNames from 'classnames/bind';
import Link from "next/link"
import { FC, ReactNode } from "react"
import { useRouter } from 'next/navigation';

interface Props {
  link: string;
  text?: string | ReactNode;
  btnType?: "button" | "nav" | "active";
  backBtn?: boolean;
}

const cn = classNames.bind(styles);

export const Button: FC<Props> = ({ link, text, btnType, backBtn }) => {
  const router = useRouter();

  const buttonClassNames = cn({
    pageLink: true,
    button: btnType === "button",
    nav: btnType === "nav",
    active: btnType === "active",
  });

  if (backBtn) {
    return (
        <div
          className={cn(buttonClassNames)}
          onClick={() => router.back()}
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
