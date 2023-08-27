/* eslint-disable @next/next/no-img-element */
import classNames from 'classnames/bind';
import React, { type FC } from 'react';
import styles from './ImagesLayout.module.scss';
import { ActionButton } from '../Button';
import { type CatVote } from '@/types/votes';
import { Close } from '@/public/svg';
import { deleteVote } from '@/utils/votes';

const cn = classNames.bind(styles)

interface Props {
  breeds: CatVote[]
  filter: (id: number) => any
}

export const VotesLayout: FC<Props> = ({ breeds, filter }) => {
  const deleteItem = async (id: number) => {
    await deleteVote(id.toString());
    filter(id);
  }

  return (
    <div className={cn(
      'photosContainer', `photosContainer${breeds.length}`)}
    >
    {(breeds.length > 0) && (breeds.map((item, index) => (
      <div className={cn('imageContainer', `img${index + 1}`)} key={item.id}>
          <img
          className={cn('catImage')}
          src={item.image.url}
          alt='cat'
        />
        <div className={cn('customOverlay')}></div>

        <div className={cn('likeContainer')}>
          <ActionButton
            text={<Close/>}
            type='nav'
            onClick={async () => { await deleteItem(item.id); }} />
        </div>
      </div>
    )))}
    </div>
  );
}
