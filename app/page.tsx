import styles from './page.module.scss'
import classNames from 'classnames/bind';
import React from 'react';
import imgMain from '@/public/images/girl-and-pet.svg';
import Image from 'next/image';
import NavigationContent from '@/components/NavigationContent/NavigationContent';
import { PetsPaw } from '@/public/svg';

const cn = classNames.bind(styles);

export default function Home () {
  return (
  <div className={cn('pageContent')}>
    <div className={cn('pageMobile')}>
    <div className={cn('logo')}>
          <PetsPaw/>
        </div>
        <h1 className={cn('title')}>Hi!👋</h1>
        <h2 className={cn('welcomeMessage')}>Welcome to MacPaw Bootcamp 2023</h2>
        <h2 className={cn('linksTitle')}>Lets start using The Cat API</h2>
        <div className={cn('navigationContent')}>
          <NavigationContent/>
        </div>
    </div>
    <div className={cn('imageContainer')}>
    <Image
      src={imgMain}
      width={775}
      height={900}
      alt="Girl with cat"
    />
    <div className={cn('imageBackground')}></div>
    </div>
  </div>
  )
}
