import React from 'react'
import styles from './NavigationContent.module.scss'
import { Button } from '@/components/Button/Button';
import imgGallery from '@/public/images/images-search.svg';
import imgBreeds from '@/public/images/pet-breeds.svg';
import imgVote from '@/public/images/vote-table.svg';
import Image from 'next/image';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

export default function NavigationContent () {
  return (
    <div className={cn('navigationLinks')}>
    <div className={cn('galleryLinkContainer')}>
      <Image
        className={cn('image', 'voteImage')}
        src={imgVote}
        width={100}
        height={124}
        alt="Vote Table"
      />
      <Button link="/voting" text="Voting" btnType="nav"/>
    </div>

    <div className={cn('galleryLinkContainer')}>
      <Image
        className={cn('image', 'breedImage')}
        src={imgBreeds}
        width={117}
        height={163}
        alt="Cat"
      />
      <Button link="/breeds" text="Breeds" btnType="nav"/>
    </div>

    <div className={cn('galleryLinkContainer')}>
      <Image
        className={cn('image', 'galleryImage')}
        src={imgGallery}
        width={112}
        height={190}
        alt="Phone"
      />
      <Button link="/gallery" text="Gallery" btnType="nav"/>
    </div>
  </div>
  );
}