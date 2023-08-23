import { Search } from '@/public/svg';
import styles from './SearchButton.module.scss'
import classNames from 'classnames/bind';
import { FC } from "react"

interface Props {
  onClick: () => void | Promise<void>;
  btnType?: "button" | "nav" | "active";
}

const cn = classNames.bind(styles);

export const SearchButton: FC<Props> = ({ btnType, onClick }) => {
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
      <Search/>
    </div>
  );
};
