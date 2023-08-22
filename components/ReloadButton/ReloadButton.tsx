import { Reload } from '@/public/svg';
import styles from './ReloadButton.module.scss'
import classNames from 'classnames/bind';
import { FC, useState } from "react"

interface Props {
  onClick: () => void;
  btnType?: "button" | "nav" | "active" | "back" | "reload";
}

const cn = classNames.bind(styles);

export const ReloadButton: FC<Props> = ({ btnType, onClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const buttonClassNames = cn({
    pageLink: true,
    button: btnType === "button",
    nav: btnType === "nav",
    active: btnType === "active",
  });

  const handleMouseEnter = () => {
    setIsClicked(true);
  };

  const handleMouseLeave = () => {
    setIsClicked(false);
  };

  return (
    <div
      onClick={onClick}
      className={cn(buttonClassNames)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Reload fill={isClicked ? '#FFF' : '#FF868E'} />
    </div>
  );
};
