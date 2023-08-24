/* eslint-disable @next/next/no-img-element */
'use client'

import { Header } from '@/components/Header/Header';
import React, { useEffect, useState } from 'react';
import styles from './page.module.scss';
import classNames from 'classnames/bind';
import { type CatFavourite } from '@/types/favourites';
import { getFav } from '@/utils/favourites';

const cn = classNames.bind(styles)

export default function Favourites () {
  const [favourites, setFavourites] = useState<CatFavourite[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getFav<CatFavourite[]>('favourites').then((data) => { setFavourites(data) }).catch((error) => { setError(error) });
  }, [])

  return (
    <div>
      <Header/>
      <div className={cn('contentContainer')}>
      {error && (<div className={cn('error')}>{error}</div>)}
      {favourites.length > 0 && favourites.map((favourite) => (
        <div className={cn('favouriteContainer')} key={favourite.id}>
          <img src={favourite.image.url} alt={'cat'} className={cn('favouriteImage')}/>
        </div>
      )
      )}
      </div>
    </div>
  )
}
