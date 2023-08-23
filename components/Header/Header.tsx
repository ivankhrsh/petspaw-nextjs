import { FC } from "react"
import classNames from 'classnames/bind';
import styles from './Header.module.scss'
import { Button } from "../Button/Button";
import { Burger, Dislike, Favourites, Like } from "@/public/svg";
import { HeaderButton } from "../HeaderButton/HeaderButton";
import { Search } from "../SearchInput/SearchInput";

const cn = classNames.bind(styles);

export const Header: FC = () => {
  return (
    <div className={cn('headerContent')}>
      <div className={cn('headerBurger')}>
        <HeaderButton link="/" text={<Burger fill={'#FF868E'}/>} btnType='nav'/>
      </div>
        <div className={cn('headerLikes')}>
          <Button link="/likes" text={<Like fill={'#FF868E'} />} btnType='nav' />
        </div>
        <div className={cn('headerFav')}>
          <Button link="/favourites" text={<Favourites fill={'#FF868E'} />} btnType='nav' />
        </div>
        <div className={cn('headerDislikes')}>
          <Button link="/dislikes" text={<Dislike fill={'#FF868E'} />} btnType='nav' />
      </div>
      <div className={cn('headerSearch')}>
        <Search/>
      </div>
    </div>
  )
}
