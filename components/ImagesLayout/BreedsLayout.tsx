import { type CatData } from '@/types/CatData';
import classNames from 'classnames/bind';
import React, { type FC } from 'react';
import styles from './ImagesLayout.module.scss';
import Image from 'next/image';
import { Button } from '../Button';

const cn = classNames.bind(styles)

interface Props {
  breeds: CatData[]
}

export const BreedsLayout: FC<Props> = ({ breeds }) => {
  return (
    <div className={cn(
      'photosContainer', `photosContainer${breeds.length}`)}
    >
    {(breeds.length > 0) && (breeds.map((item, index) => (
      <div className={cn('imageContainer', `img${index + 1}`)} key={item.id}>
          <Image
          className={cn('catImage')}
          src={item.image.url}
          alt='cat'
          width={item.image.width}
          height={item.image.height}
        />
        <div className={cn('customOverlay')}></div>

        <div className={cn('likeContainer')}>
          <Button
          text={item.name}
          link={`/breeds/${item.id}`}
          type='nav'/>
        </div>
      </div>
    )))}
    </div>
  );
}
