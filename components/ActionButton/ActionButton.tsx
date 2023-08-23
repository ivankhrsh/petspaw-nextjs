import { Reload } from '@/public/svg';
import styles from './ActionButton.module.scss'
import classNames from 'classnames/bind';
import { FC } from "react"

interface Props {
  onClick: () => void;
  btnType?: "button" | "nav" | "active";
}

const cn = classNames.bind(styles);

export const ActionButton: FC<Props> = ({ btnType, onClick }) => {
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
      <Reload/>
    </div>
  );
};
