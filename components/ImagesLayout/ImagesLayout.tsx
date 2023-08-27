/* eslint-disable @next/next/no-img-element */
import classNames from 'classnames/bind';
import React, { type FC } from 'react';
import styles from './ImagesLayout.module.scss';
import { ActionButton } from '../Button';
import { Heart } from '@/public/svg';
import { type CatFavourite } from '@/types/favourites';
import { deleteFav } from '@/utils/favourites';

const cn = classNames.bind(styles)

interface Props {
  cats: CatFavourite[]
  filter: (id: number) => any
}

export const ImagesLayout: FC<Props> = ({ cats, filter }) => {
  const removeLike = async (id: number) => {
    await deleteFav(`favourites/${id}`);
    filter(id);
  }

  return (
    <div className={cn(
      'photosContainer', `photosContainer${cats.length}`)}
    >
    {(cats.length > 0) && (cats.map((item, index) => (
      <div className={cn('imageContainer', `img${index + 1}`)} key={item.id}>
        <img
          className={cn('catImage')}
          src={item.image.url}
          alt='cat'
        />
        <div className={cn('customOverlay')}></div>

        <div className={cn('likeContainer')}>
          <ActionButton
          text={<Heart/>}
          onClick={async () => { await removeLike(item.id); }}
          type='nav'/>
        </div>
      </div>
    )))}
    </div>
  );
}
