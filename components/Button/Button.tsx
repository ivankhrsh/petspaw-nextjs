'use client'

import { BackArrow } from '@/public/svg';
import styles from './Button.module.scss'
import classNames from 'classnames/bind';
import Link from "next/link"
import { FC, ReactNode, useState } from "react"

interface Props {
  link: string;
  text?: string | ReactNode;
  btnType?: "button" | "nav" | "active" | "back";
  backBtn?: boolean;
}

const cn = classNames.bind(styles);

export const Button: FC<Props> = ({ link, text, btnType, backBtn }) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonClassNames = cn({
    pageLink: true,
    button: btnType === "button",
    nav: btnType === "nav",
    active: btnType === "active",
  });

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      {backBtn ? (
        <Link
          href={`${link}`}
          className={cn(buttonClassNames)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <BackArrow fill={isHovered ? '#FFF' : '#FF868E'} />
        </Link>
      ) : (
        <Link href={`${link}`} className={cn(buttonClassNames)}>
          {text}
        </Link>
      )}
    </>
  );
};
