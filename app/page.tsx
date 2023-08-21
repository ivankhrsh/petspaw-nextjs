import { Paw, PetsPaw } from "@/public/svg";
import styles from './page.module.scss'
import { NavigationButton } from "@/components/NavigationButton/NavigationButton";
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

export default function Home() {
  return (
    <main>
      <div className={cn('logo')}>
        <Paw/>
        <PetsPaw/>
      </div>

    <div>
      <h1 className={cn('title')}>Hi!👋</h1>
      <h2 className={cn('welcomeMessage')}>Welcome to MacPaw Bootcamp 2023</h2>
    </div>

      <div className={cn('navigationLinks')}>
        <h2 className={cn('linksTitle')}>Lets start using The Cat API</h2>
        <NavigationButton link="/voting" text="Voting"/>
        <NavigationButton link="/breeds" text="Breeds"/>
        <NavigationButton link="/gallery" text="Gallery"/>
      </div>
    </main>
  )
}
