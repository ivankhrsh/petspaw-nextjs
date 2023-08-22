'use client'

import styles from './ReloadButton.module.scss'
import classNames from 'classnames/bind';
import { FC, ReactNode, useState } from "react"

interface Props {
  onClick: () => void;
  text?: string | ReactNode;
  btnType?: "button" | "nav" | "active" | "back" | "reload";
}

const cn = classNames.bind(styles);

export const ReloadButton: FC<Props> = ({text, btnType, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonClassNames = cn({
    pageLink: true,
    button: btnType === "button",
    nav: btnType === "nav",
    active: btnType === "active",
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
