import { Paw, PetsPaw } from '@/public/svg';
import styles from './page.module.scss'
import { Button } from '@/components/Button/Button';
import classNames from 'classnames/bind';
import React from 'react';

const cn = classNames.bind(styles);

export default function Home () {
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
        <Button link="/voting" text="Voting" btnType="nav"/>
        <Button link="/breeds" text="Breeds" btnType="nav"/>
        <Button link="/gallery" text="Gallery" btnType="nav"/>
      </div>
    </main>
  )
}
