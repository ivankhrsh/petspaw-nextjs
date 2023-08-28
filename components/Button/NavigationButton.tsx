'use client'

import styles from './Button.module.scss';
import classNames from 'classnames/bind';
import Link from 'next/link';
import React, { type FC, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { type ButtonType } from '@/types/button';
import Image from 'next/image';

import imgGallery from '@/public/images/images-search.svg';
import imgBreeds from '@/public/images/pet-breeds.svg';
import imgVote from '@/public/images/vote-table.svg';

interface Props extends ButtonType {
  link: string
  text?: string | ReactNode
  imgType: 'vote' | 'breed' | 'gallery'
}

const cn = classNames.bind(styles);

export const NavigationButton: FC<Props> = ({ link, text, type, imgType }) => {
  const pathname = usePathname();

  const buttonClassNames = cn({
    pageLink: true,
    nav: type === 'nav',
    active: type === 'active' || pathname === link,
    search: type === 'search'
  });

  let imgSrc;
  let imgAlt = '';
  let imgWidth;
  let imgHeight;

  if (imgType === 'vote') {
    imgSrc = imgVote;
    imgAlt = 'Vote Table';
    imgWidth = 100;
    imgHeight = 124;
  }

  if (imgType === 'breed') {
    imgSrc = imgBreeds;
    imgAlt = 'Cat';
    imgWidth = 117;
    imgHeight = 163;
  }

  if (imgType === 'gallery') {
    imgSrc = imgGallery;
    imgAlt = 'Phone';
    imgWidth = 112;
    imgHeight = 190;
  }

  const imageClassNames = cn('image', {
    activeImage: pathname === link,
    voteImage: imgType === 'vote',
    breedImage: imgType === 'breed',
    galleryImage: imgType === 'gallery'
  });

  return (
    <Link href={`${link}`} className={cn('link')}>
      <div className={cn('navWithImage')}>
        <Image
          className={imageClassNames}
          src={imgSrc}
          width={imgWidth}
          height={imgHeight}
          alt={imgAlt}
        />
        <div className={cn(buttonClassNames)}>{text}</div>
      </div>
    </Link>
  );
};
