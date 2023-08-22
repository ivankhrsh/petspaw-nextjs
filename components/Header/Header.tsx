import { FC } from "react"
import classNames from 'classnames/bind';
import styles from './Header.module.scss'
import { Button } from "../Button/Button";
import { Burger } from "@/public/svg";
import { HeaderButton } from "../HeaderButton/HeaderButton";

const cn = classNames.bind(styles);

export const Header: FC = () => {
  return (
    <div className={cn('headerContent')}>
      <div className={cn('headerBurger')}>
        <HeaderButton link="/" text={<Burger fill={'#FF868E'}/>} btnType='nav'/>
      </div>
      <Button link="/likes" text='L' btnType='nav'/>
      <Button link="/favourites" text='F' btnType='nav'/>
      <Button link="/dislikes" text='D' btnType='nav'/>
      <div className={cn('headerSearch')}>
        <Button link="/" text='searchbar' btnType='nav'/>
      </div>
    </div>
  )
}
