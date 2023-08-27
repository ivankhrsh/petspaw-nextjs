'use client';

import { type CatImage } from '@/types/CatData';
import classNames from 'classnames/bind';
import React, { type FC } from 'react';
import styles from './ImagesLayout.module.scss';
import Image from 'next/image';
import { ActionButton } from '../Button';
import { Heart } from '@/public/svg';
import { type CatFavourite } from '@/types/favourites';
import { addFav, deleteFav, getFav } from '@/utils/favourites';

const cn = classNames.bind(styles)

interface Props {
  cats: CatImage[]
}

export const GalleryLayout: FC<Props> = ({ cats }) => {
  const toggleLike = async (id: string) => {
    const data: CatFavourite[] = await getFav('favourites');
    const currentItem = data.find((item) => item.image_id === id);
    if (currentItem) {
      await deleteFav(`favourites/${currentItem.id}`);
      return;
    }

    await addFav('favourites', { image_id: id });
  }

  return (
    <div className={cn(
      'photosContainer', `photosContainer${cats.length}`)}
    >
    {(cats.length > 0) && (cats.map((item, index) => (
      <div className={cn('imageContainer', `img${index + 1}`)} key={item.id}>
        <Image
          className={cn('catImage')}
          src={item.url}
          alt='cat'
          width={item.width}
          height={item.height}
        />
        <div className={cn('customOverlay')}></div>

        <div className={cn('likeContainer')}>
          <ActionButton
          text={<Heart/>}
          onClick={async () => { await toggleLike(item.id); }}
          type='nav'/>
        </div>
      </div>
    )))}
    </div>
  );
}
